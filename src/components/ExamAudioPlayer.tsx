import React, { useState, useEffect } from 'react';
import { Music, Volume2, VolumeX } from 'lucide-react';
import { audioService } from '../services/audioService';

interface AudioPlayerProps {
  autoPlay?: boolean;
}

export function ExamAudioPlayer({ autoPlay = true }: AudioPlayerProps) {
  const [blobUrl, setBlobUrl] = useState<string | null>(null);
  const [isMuted, setIsMuted] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const [downloadProgress, setDownloadProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [audioRef, setAudioRef] = React.useState<HTMLAudioElement | null>(null);

  useEffect(() => {
    loadAudio();
  }, []);

  const loadAudio = async () => {
    try {
      const audioUrl = await audioService.getAudioURL();
      if (!audioUrl) {
        setIsReady(false);
        return;
      }

      // Download and cache audio (this creates a blob URL)
      const url = await audioService.downloadAndCacheAudio(
        audioUrl,
        (percent) => setDownloadProgress(percent),
      );

      setBlobUrl(url);
      setDownloadProgress(100);
      setIsReady(true);
      setError(null);
    } catch (err) {
      console.error("Failed to load exam audio:", err);
      setError("Failed to load audio");
      setIsReady(false);
    }
  };

  useEffect(() => {
    if (audioRef && autoPlay && isReady && !isMuted) {
      audioRef.play().catch(err => console.log("Auto-play failed:", err));
    }
  }, [audioRef, isReady, autoPlay, isMuted]);

  const handleToggleMute = () => {
    if (audioRef) {
      if (isMuted) {
        audioRef.muted = false;
        audioRef.play().catch(err => console.log("Play failed:", err));
      } else {
        audioRef.muted = true;
        audioRef.pause();
      }
      setIsMuted(!isMuted);
    }
  };

  // Show loading UI while downloading
  if (!isReady) {
    return (
      <div className="fixed bottom-6 right-6 z-50">
        <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-4 max-w-xs">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
              <Music className="w-5 h-5 text-blue-600" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-medium text-gray-500 uppercase">Exam Audio</p>
              {error ? (
                <p className="text-sm font-semibold text-red-600">Error loading audio</p>
              ) : (
                <>
                  <p className="text-sm font-semibold text-gray-900">Loading Track...</p>
                  <div className="mt-2 w-full bg-gray-200 rounded-full h-1.5">
                    <div
                      className="bg-blue-600 h-1.5 rounded-full transition-all duration-300"
                      style={{ width: `${downloadProgress}%` }}
                    />
                  </div>
                  <p className="text-xs text-gray-500 mt-1">{downloadProgress}%</p>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !blobUrl) {
    return null;
  }

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-4 max-w-xs">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
            <Music className="w-5 h-5 text-blue-600" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-medium text-gray-500 uppercase">Exam Audio</p>
            <p className="text-sm font-semibold text-gray-900 truncate">Listening Track</p>
          </div>
          <button
            onClick={handleToggleMute}
            className={`p-2 rounded-lg transition-colors flex-shrink-0 ${
              isMuted
                ? 'bg-red-100 text-red-600 hover:bg-red-200'
                : 'bg-green-100 text-green-600 hover:bg-green-200'
            }`}
            title={isMuted ? 'Unmute audio' : 'Mute audio'}
          >
            {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
          </button>
        </div>
        
        <audio
          ref={setAudioRef}
          src={blobUrl}
          controls
          className="w-full mt-3"
          style={{
            outline: 'none',
          }}
        />
      </div>
    </div>
  );
}
