import { getStorage, ref, uploadBytes, getDownloadURL, deleteObject } from "firebase/storage";
import { getDatabase, ref as dbRef, set, get } from "firebase/database";
import { app } from "../firebase";

const storage = getStorage(app);
const database = getDatabase(app);

const AUDIO_DB_PATH = "exam/audio";
const AUDIO_CACHE_DB = "AudioCache";
const AUDIO_CACHE_STORE = "audios";

// IndexedDB Audio Cache Manager
class AudioCacheManager {
  private dbName = AUDIO_CACHE_DB;
  private storeName = AUDIO_CACHE_STORE;
  private db: IDBDatabase | null = null;

  async init(): Promise<void> {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(this.dbName, 1);

      request.onerror = () => reject(request.error);
      request.onsuccess = () => {
        this.db = request.result;
        resolve();
      };

      request.onupgradeneeded = (event) => {
        const db = (event.target as IDBOpenDBRequest).result;
        if (!db.objectStoreNames.contains(this.storeName)) {
          db.createObjectStore(this.storeName, { keyPath: "url" });
        }
      };
    });
  }

  async cacheAudio(url: string, blob: Blob, metadata: { fileName: string; size: number }): Promise<void> {
    if (!this.db) await this.init();

    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction([this.storeName], "readwrite");
      const store = transaction.objectStore(this.storeName);

      const data = {
        url,
        blob,
        metadata,
        cachedAt: Date.now(),
      };

      const request = store.put(data);
      request.onerror = () => reject(request.error);
      request.onsuccess = () => resolve();
    });
  }

  async getCachedAudio(url: string): Promise<{ blob: Blob; metadata: { fileName: string; size: number } } | null> {
    if (!this.db) await this.init();

    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction([this.storeName], "readonly");
      const store = transaction.objectStore(this.storeName);
      const request = store.get(url);

      request.onerror = () => reject(request.error);
      request.onsuccess = () => {
        const result = request.result;
        if (result) {
          resolve({ blob: result.blob, metadata: result.metadata });
        } else {
          resolve(null);
        }
      };
    });
  }

  async clearCache(): Promise<void> {
    if (!this.db) await this.init();

    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction([this.storeName], "readwrite");
      const store = transaction.objectStore(this.storeName);
      const request = store.clear();

      request.onerror = () => reject(request.error);
      request.onsuccess = () => resolve();
    });
  }
}

// Audio downloader with progress tracking
class AudioDownloader {
  private cacheManager = new AudioCacheManager();
  private retryCount = 0;
  private maxRetries = 3;

  async downloadAudio(
    url: string,
    onProgress?: (percent: number) => void,
    onStatusChange?: (status: string) => void
  ): Promise<Blob> {
    try {
      onStatusChange?.("Downloading audio...");

      const response = await fetch(url, { mode: "cors", credentials: "omit" });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const contentLength = response.headers.get("content-length");
      const total = parseInt(contentLength || "0", 10);

      if (total === 0) {
        // If content-length not available, download without progress
        const blob = await response.blob();
        onProgress?.(100);
        onStatusChange?.("Download complete");
        return blob;
      }

      const reader = response.body!.getReader();
      const chunks: Uint8Array[] = [];
      let loaded = 0;

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        chunks.push(value);
        loaded += value.length;
        const percent = Math.round((loaded / total) * 100);
        onProgress?.(percent);
      }

      const blob = new Blob(chunks);
      onProgress?.(100);
      onStatusChange?.("Download complete");
      return blob;
    } catch (error) {
      console.error("Audio download error:", error);

      if (this.retryCount < this.maxRetries) {
        this.retryCount++;
        const delay = 1000 * this.retryCount;
        onStatusChange?.(`Retrying... (${this.retryCount}/${this.maxRetries})`);

        await new Promise((resolve) => setTimeout(resolve, delay));
        return this.downloadAudio(url, onProgress, onStatusChange);
      }

      throw error;
    }
  }

  async getCachedOrDownload(
    url: string,
    metadata: { fileName: string; size: number },
    onProgress?: (percent: number) => void,
    onStatusChange?: (status: string) => void
  ): Promise<Blob> {
    // Check cache first
    const cached = await this.cacheManager.getCachedAudio(url);
    if (cached) {
      onStatusChange?.("Loading from cache...");
      onProgress?.(100);
      return cached.blob;
    }

    // Download if not in cache
    const blob = await this.downloadAudio(url, onProgress, onStatusChange);

    // Store in cache
    try {
      await this.cacheManager.cacheAudio(url, blob, metadata);
      onStatusChange?.("Cached successfully");
    } catch (err) {
      console.warn("Failed to cache audio:", err);
    }

    return blob;
  }

  resetRetries() {
    this.retryCount = 0;
  }
}

export const audioService = {
  downloader: new AudioDownloader(),
  
  // Upload audio file to Firebase Storage
  async uploadAudio(file: File): Promise<string> {
    try {
      const fileName = `exam-audio-${Date.now()}-${file.name}`;
      const storageRef = ref(storage, `audio/${fileName}`);
      
      await uploadBytes(storageRef, file);
      const downloadURL = await getDownloadURL(storageRef);
      
      // Save URL to Realtime Database
      await set(dbRef(database, AUDIO_DB_PATH), {
        url: downloadURL,
        fileName: file.name,
        uploadedAt: new Date().toISOString(),
        size: file.size,
        uploadType: 'file'
      });
      
      return downloadURL;
    } catch (error) {
      console.error("Error uploading audio:", error);
      throw error;
    }
  },

  // Upload audio via URL (no storage upload needed)
  async uploadAudioByURL(audioURL: string): Promise<string> {
    try {
      // Extract filename from URL or use a default
      const urlParts = audioURL.split('/');
      const fileName = urlParts[urlParts.length - 1].split('?')[0] || 'external-audio';
      
      // Save URL to Realtime Database
      await set(dbRef(database, AUDIO_DB_PATH), {
        url: audioURL,
        fileName: fileName,
        uploadedAt: new Date().toISOString(),
        size: 0, // Unknown size for external URLs
        uploadType: 'url'
      });
      
      return audioURL;
    } catch (error) {
      console.error("Error uploading audio by URL:", error);
      throw error;
    }
  },

  // Get current audio URL from database
  async getAudioURL(): Promise<string | null> {
    try {
      const snapshot = await get(dbRef(database, AUDIO_DB_PATH));
      if (snapshot.exists()) {
        return snapshot.val().url;
      }
      return null;
    } catch (error) {
      console.error("Error fetching audio URL:", error);
      return null;
    }
  },

  // Download and cache audio, returns blob URL for playback
  async downloadAndCacheAudio(
    url: string,
    onProgress?: (percent: number) => void,
    onStatusChange?: (status: string) => void
  ): Promise<string> {
    try {
      const metadata = await this.getAudioMetadata();
      const blob = await this.downloader.getCachedOrDownload(
        url,
        {
          fileName: metadata?.fileName || "audio",
          size: metadata?.size || 0,
        },
        onProgress,
        onStatusChange
      );

      // Create blob URL for playback (no streaming, no buffering)
      const blobUrl = URL.createObjectURL(blob);
      return blobUrl;
    } catch (error) {
      console.error("Error downloading and caching audio:", error);
      throw error;
    }
  },

  // Preload audio in background (downloads to cache)
  async preloadAudioInBackground(
    url: string,
    onProgress?: (percent: number) => void,
    onStatusChange?: (status: string) => void
  ): Promise<void> {
    try {
      this.downloader.resetRetries();
      await this.downloadAndCacheAudio(url, onProgress, onStatusChange);
    } catch (error) {
      console.error("Error preloading audio:", error);
      throw error;
    }
  },

  // Delete audio from storage and cache
  async deleteAudio(): Promise<void> {
    try {
      const snapshot = await get(dbRef(database, AUDIO_DB_PATH));
      if (snapshot.exists()) {
        const data = snapshot.val();
        const audioURL = data.url;
        const uploadType = data.uploadType || 'file';
        
        // Only delete from storage if it was uploaded as a file
        if (uploadType === 'file') {
          // Extract file path from URL for deletion
          const fileNameMatch = audioURL.match(/audio%2F([^?]+)/);
          if (fileNameMatch) {
            const fileName = decodeURIComponent(fileNameMatch[1]);
            const storageRef = ref(storage, `audio/${fileName}`);
            try {
              await deleteObject(storageRef);
            } catch (storageError) {
              console.warn("Could not delete from storage:", storageError);
              // Continue with database deletion even if storage deletion fails
            }
          }
        }
        // For URL uploads, just delete from database (no storage cleanup needed)
        
        // Delete from database
        await set(dbRef(database, AUDIO_DB_PATH), null);
      }

      // Clear cache
      const cacheManager = new AudioCacheManager();
      await cacheManager.clearCache();
    } catch (error) {
      console.error("Error deleting audio:", error);
      throw error;
    }
  },

  // Get audio metadata
  async getAudioMetadata(): Promise<{ fileName: string; uploadedAt: string; size: number; uploadType?: string } | null> {
    try {
      const snapshot = await get(dbRef(database, AUDIO_DB_PATH));
      if (snapshot.exists()) {
        const data = snapshot.val();
        return {
          fileName: data.fileName || "Unknown",
          uploadedAt: data.uploadedAt || "",
          size: data.size || 0,
          uploadType: data.uploadType || "file"
        };
      }
      return null;
    } catch (error) {
      console.error("Error fetching audio metadata:", error);
      return null;
    }
  }
};
