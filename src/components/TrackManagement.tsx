import { useState, useEffect } from 'react';
import { Music, FileText, Clock, List as ListIcon, Link, Save, CheckCircle, AlertCircle, Loader, Headphones, BookOpen, PenTool, Layers } from 'lucide-react';
import { getDatabase, ref, get, set } from 'firebase/database';
import { app } from '../firebase';
import { Track } from '../data/track1';
import { allTracks, getTracksByType } from '../data/tracks';

interface TrackWithAudio extends Track {
  loadedAudioURL?: string | null;
}

type TrackTypeTab = 'listening' | 'reading' | 'writing';

export function TrackManagement() {
  const [tracks, setTracks] = useState<TrackWithAudio[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTrackId, setActiveTrackId] = useState<string | null>(null);
  const [audioURLInputs, setAudioURLInputs] = useState<Record<string, string>>({});
  const [savingTrackId, setSavingTrackId] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<TrackTypeTab>('listening');

  const db = getDatabase(app);

  useEffect(() => {
    // Initialize tracks immediately from hardcoded data
    const initialTracks: TrackWithAudio[] = allTracks.map(track => ({
      ...track,
      loadedAudioURL: null
    }));
    setTracks(initialTracks);
    
    // Then load audio URLs asynchronously
    loadTracksWithAudio();
    checkActiveTrack();
  }, []);

  const loadTracksWithAudio = async () => {
    try {
      // Don't show loading state since tracks are already initialized
      
      // Load audio URLs from Firebase for each track
      const tracksWithAudio: TrackWithAudio[] = [];
      
      for (const track of allTracks) {
        try {
          const snapshot = await get(ref(db, `tracks/${track.id}/audioURL`));
          const audioURL = snapshot.exists() ? snapshot.val() : null;
          
          tracksWithAudio.push({
            ...track,
            loadedAudioURL: audioURL
          });
        } catch (trackError) {
          console.warn(`Could not load audio for track ${track.id}:`, trackError);
          // Still add track without audio URL
          tracksWithAudio.push({
            ...track,
            loadedAudioURL: null
          });
        }
      }
      
      setTracks(tracksWithAudio);
    } catch (error) {
      console.error('Error loading tracks with audio:', error);
      // Tracks are already initialized, so just log the error
      // Don't show error message to user as tracks are still usable
    } finally {
      setIsLoading(false);
    }
  };

  const checkActiveTrack = async () => {
    try {
      const snapshot = await get(ref(db, 'exam/status'));
      if (snapshot.exists()) {
        const status = snapshot.val();
        if (status.isStarted && status.activeTrackId) {
          setActiveTrackId(status.activeTrackId);
        }
      }
    } catch (error) {
      console.error('Error checking active track:', error);
    }
  };

  const handleAudioURLChange = (trackId: string, value: string) => {
    setAudioURLInputs(prev => ({
      ...prev,
      [trackId]: value
    }));
  };

  const handleSaveAudioURL = async (trackId: string) => {
    const audioURL = audioURLInputs[trackId]?.trim();
    
    if (!audioURL) {
      setErrorMessage('Please enter a valid audio URL');
      setTimeout(() => setErrorMessage(null), 3000);
      return;
    }

    // Basic URL validation
    try {
      new URL(audioURL);
    } catch (e) {
      setErrorMessage('Please enter a valid URL format');
      setTimeout(() => setErrorMessage(null), 3000);
      return;
    }

    setSavingTrackId(trackId);
    setErrorMessage(null);

    try {
      // Save audio URL to Firebase
      await set(ref(db, `tracks/${trackId}/audioURL`), audioURL);
      
      // Update local state
      setTracks(prev => prev.map(track => 
        track.id === trackId 
          ? { ...track, loadedAudioURL: audioURL }
          : track
      ));
      
      // Clear input
      setAudioURLInputs(prev => ({
        ...prev,
        [trackId]: ''
      }));
      
      setSuccessMessage(`Audio URL saved for ${tracks.find(t => t.id === trackId)?.name}`);
      setTimeout(() => setSuccessMessage(null), 3000);
    } catch (error) {
      console.error('Error saving audio URL:', error);
      setErrorMessage('Failed to save audio URL. Please try again.');
      setTimeout(() => setErrorMessage(null), 3000);
    } finally {
      setSavingTrackId(null);
    }
  };

  const handleDeleteAudioURL = async (trackId: string) => {
    if (!confirm('Are you sure you want to remove the audio URL for this track?')) {
      return;
    }

    setSavingTrackId(trackId);
    try {
      await set(ref(db, `tracks/${trackId}/audioURL`), null);
      
      setTracks(prev => prev.map(track => 
        track.id === trackId 
          ? { ...track, loadedAudioURL: null }
          : track
      ));
      
      setSuccessMessage('Audio URL removed successfully');
      setTimeout(() => setSuccessMessage(null), 3000);
    } catch (error) {
      console.error('Error deleting audio URL:', error);
      setErrorMessage('Failed to remove audio URL');
      setTimeout(() => setErrorMessage(null), 3000);
    } finally {
      setSavingTrackId(null);
    }
  };

  // Filter tracks by active tab
  const filteredTracks = tracks.filter(track => track.trackType === activeTab);
  
  // Get tab info
  const getTabInfo = (type: TrackTypeTab) => {
    switch (type) {
      case 'listening':
        return { icon: Headphones, color: 'blue', label: 'Listening' };
      case 'reading':
        return { icon: BookOpen, color: 'green', label: 'Reading' };
      case 'writing':
        return { icon: PenTool, color: 'orange', label: 'Writing' };
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-forest-200 border-t-forest-600 rounded-full animate-spin mx-auto mb-4" />
          <p className="text-slate-600 font-medium">Loading tracks...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="animate-fadeInUp">
        <h1 className="text-3xl font-bold text-midnight-800">Track Management</h1>
        <p className="text-slate-500 mt-1">Manage tracks across exam types and configure audio</p>
      </div>

      {/* Messages */}
      {successMessage && (
        <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-4 flex items-start gap-3 animate-fadeIn">
          <CheckCircle className="w-5 h-5 text-emerald-600 mt-0.5 flex-shrink-0" />
          <p className="text-emerald-900 text-sm font-medium">{successMessage}</p>
        </div>
      )}

      {errorMessage && (
        <div className="bg-red-50 border border-red-200 rounded-2xl p-4 flex items-start gap-3 animate-fadeIn">
          <AlertCircle className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
          <p className="text-red-900 text-sm font-medium">{errorMessage}</p>
        </div>
      )}

      {/* Tab Navigation */}
      <div className="zen-card !p-0 overflow-hidden border-b border-slate-100">
        <nav className="flex gap-1 px-6 md:px-8 overflow-x-auto scrollbar-thin" aria-label="Track types">
          {(['listening', 'reading', 'writing'] as TrackTypeTab[]).map((type) => {
            const tabInfo = getTabInfo(type);
            const Icon = tabInfo.icon;
            const isActive = activeTab === type;
            const trackCount = tracks.filter(t => t.trackType === type).length;
            
            const colorMap = {
              listening: { active: 'border-blue-600 text-blue-600 bg-blue-50', inactive: 'border-transparent text-slate-500 hover:text-blue-600 hover:bg-slate-50' },
              reading: { active: 'border-emerald-600 text-emerald-600 bg-emerald-50', inactive: 'border-transparent text-slate-500 hover:text-emerald-600 hover:bg-slate-50' },
              writing: { active: 'border-orange-600 text-orange-600 bg-orange-50', inactive: 'border-transparent text-slate-500 hover:text-orange-600 hover:bg-slate-50' }
            };
            
            return (
              <button
                key={type}
                onClick={() => setActiveTab(type)}
                className={`flex items-center gap-2 py-4 px-4 border-b-2 font-semibold text-sm transition-all whitespace-nowrap ${
                  isActive ? colorMap[type].active : colorMap[type].inactive
                }`}
                data-testid={`tab-${type}`}
              >
                <Icon className="w-5 h-5" />
                {tabInfo.label}
                <span className={`ml-1 px-2.5 py-0.5 rounded-full text-xs font-bold ${
                  isActive 
                    ? type === 'listening' ? 'bg-blue-200 text-blue-700' : type === 'reading' ? 'bg-emerald-200 text-emerald-700' : 'bg-orange-200 text-orange-700'
                    : 'bg-slate-100 text-slate-600'
                }`}>
                  {trackCount}
                </span>
              </button>
            );
          })}
        </nav>
      </div>

      {/* Stats KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className={`zen-card !p-5 animate-fadeInUp stagger-1 ${
          activeTab === 'listening' ? 'border-l-4 border-l-blue-600 bg-blue-50/50' :
          activeTab === 'reading' ? 'border-l-4 border-l-emerald-600 bg-emerald-50/50' :
          activeTab === 'writing' ? 'border-l-4 border-l-orange-600 bg-orange-50/50' :
          'border-l-4 border-l-slate-300'
        }`} style={{ animationFillMode: 'both' }}>
          <div className="flex items-center gap-3">
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
              activeTab === 'listening' ? 'bg-blue-100' :
              activeTab === 'reading' ? 'bg-emerald-100' :
              activeTab === 'writing' ? 'bg-orange-100' :
              'bg-slate-100'
            }`}>
              <ListIcon className={`w-6 h-6 ${
                activeTab === 'listening' ? 'text-blue-600' :
                activeTab === 'reading' ? 'text-emerald-600' :
                activeTab === 'writing' ? 'text-orange-600' :
                'text-slate-600'
              }`} />
            </div>
            <div>
              <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">{getTabInfo(activeTab).label} Tracks</p>
              <p className="text-2xl font-bold text-midnight-800">{filteredTracks.length}</p>
            </div>
          </div>
        </div>

        {activeTab === 'listening' && (
          <div className="zen-card !p-5 animate-fadeInUp stagger-2 border-l-4 border-l-green-600 bg-green-50/50" style={{ animationFillMode: 'both' }}>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-green-100">
                <Music className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">With Audio</p>
                <p className="text-2xl font-bold text-midnight-800">{filteredTracks.filter(t => t.loadedAudioURL).length}</p>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'reading' && (
          <div className="zen-card !p-5 animate-fadeInUp stagger-2 border-l-4 border-l-purple-600 bg-purple-50/50" style={{ animationFillMode: 'both' }}>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-purple-100">
                <FileText className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">Total Questions</p>
                <p className="text-2xl font-bold text-midnight-800">{filteredTracks.reduce((sum, t) => sum + t.totalQuestions, 0)}</p>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'writing' && (
          <div className="zen-card !p-5 animate-fadeInUp stagger-2 border-l-4 border-l-purple-600 bg-purple-50/50" style={{ animationFillMode: 'both' }}>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-purple-100">
                <Clock className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">Total Duration</p>
                <p className="text-2xl font-bold text-midnight-800">{filteredTracks.reduce((sum, t) => sum + t.duration, 0)} min</p>
              </div>
            </div>
          </div>
        )}

        <div className="zen-card !p-5 animate-fadeInUp stagger-3 border-l-4 border-l-forest-600 bg-forest-50/50" style={{ animationFillMode: 'both' }}>
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-forest-100">
              <CheckCircle className="w-6 h-6 text-forest-600" />
            </div>
            <div>
              <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">Active Track</p>
              <p className="text-sm font-bold text-midnight-800 truncate">
                {activeTrackId ? tracks.find(t => t.id === activeTrackId)?.name.substring(0, 18) + '...' : 'None'}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Track List */}
      <div className="space-y-4">
        {filteredTracks.length === 0 ? (
          <div className="zen-card p-12 text-center border-2 border-dashed border-slate-200">
            <div className={`w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4 ${
              activeTab === 'listening' ? 'bg-blue-100' :
              activeTab === 'reading' ? 'bg-emerald-100' :
              'bg-orange-100'
            }`}>
              {activeTab === 'listening' && <Headphones className="w-8 h-8 text-blue-600" />}
              {activeTab === 'reading' && <BookOpen className="w-8 h-8 text-emerald-600" />}
              {activeTab === 'writing' && <PenTool className="w-8 h-8 text-orange-600" />}
            </div>
            <p className="text-midnight-800 font-semibold mb-1">No {getTabInfo(activeTab).label} Tracks</p>
            <p className="text-slate-500 text-sm">
              {activeTab === 'listening' && 'No listening tracks are currently available.'}
              {activeTab === 'reading' && 'No reading tracks are currently available.'}
              {activeTab === 'writing' && 'No writing tracks are currently available.'}
            </p>
          </div>
        ) : (
          filteredTracks.map((track, idx) => {
            const tabInfo = getTabInfo(track.trackType);
            const Icon = tabInfo.icon;
            
            return (
              <div
                key={track.id}
                className={`zen-card animate-fadeInUp ${
                  track.id === activeTrackId
                    ? 'border-2 border-emerald-500 bg-emerald-50/30'
                    : 'border border-slate-200'
                }`}
                style={{ animationFillMode: 'both', animationDelay: `${idx * 50}ms` }}
                data-testid={`track-card-${track.id}`}
              >
                <div className={track.trackType === 'listening' ? 'grid lg:grid-cols-3 gap-6' : ''}>
                  {/* Left: Track Info */}
                  <div className={track.trackType !== 'listening' ? '' : 'lg:col-span-1'}>
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1 flex items-start gap-3">
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${
                          track.trackType === 'listening' ? 'bg-blue-100' :
                          track.trackType === 'reading' ? 'bg-emerald-100' :
                          track.trackType === 'writing' ? 'bg-orange-100' :
                          'bg-slate-100'
                        }`}>
                          <Icon className={`w-5 h-5 ${
                            track.trackType === 'listening' ? 'text-blue-600' :
                            track.trackType === 'reading' ? 'text-emerald-600' :
                            track.trackType === 'writing' ? 'text-orange-600' :
                            'text-slate-600'
                          }`} />
                        </div>
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="font-bold text-midnight-800">
                              {track.name}
                            </h3>
                            <span className="text-xs font-mono font-semibold text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                              {track.id.split('-').slice(1).join('-')}
                            </span>
                          </div>
                          {track.id === activeTrackId && (
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-emerald-600 text-white text-xs font-bold rounded-full">
                              ● Active
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    <p className="text-sm text-slate-600 mb-4 line-clamp-2">
                      {track.description}
                    </p>

                    <div className="flex flex-wrap gap-3 text-xs">
                      <div className="flex items-center gap-1.5 text-slate-600 bg-slate-50 px-2.5 py-1.5 rounded-lg">
                        <Clock className="w-3.5 h-3.5 text-slate-400" />
                        <span className="font-medium">{track.duration} min</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-slate-600 bg-slate-50 px-2.5 py-1.5 rounded-lg">
                        <FileText className="w-3.5 h-3.5 text-slate-400" />
                        <span className="font-medium">{track.totalQuestions} {track.trackType === 'writing' ? 'tasks' : 'Q'}</span>
                      </div>
                      {track.trackType === 'listening' && (
                        <div className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg ${track.loadedAudioURL ? 'bg-green-50 text-green-600' : 'bg-slate-50 text-slate-600'}`}>
                          <Music className={`w-3.5 h-3.5 ${track.loadedAudioURL ? 'text-green-500' : 'text-slate-400'}`} />
                          <span className="font-medium text-xs">{track.loadedAudioURL ? 'Has Audio' : 'No Audio'}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Right: Audio Management (Only for Listening tracks) */}
                  {track.trackType === 'listening' && (
                    <div className={`lg:col-span-2 border-t lg:border-t-0 lg:border-l border-slate-200 pt-4 lg:pt-0 lg:pl-6`}>
                      <h4 className="font-semibold text-midnight-800 mb-4 flex items-center gap-2">
                        <Link className="w-4 h-4 text-blue-600" />
                        Audio Configuration
                      </h4>

                      {/* Current Audio Display */}
                      {track.loadedAudioURL ? (
                        <div className="mb-4 bg-blue-50 border border-blue-200 rounded-xl p-4">
                          <p className="text-xs font-semibold text-slate-600 mb-2 uppercase tracking-wider">Current Audio URL</p>
                          <p className="text-xs text-blue-700 break-all mb-3 font-mono bg-white px-2 py-1.5 rounded border border-blue-100">
                            {track.loadedAudioURL}
                          </p>
                          <audio
                            controls
                            className="w-full mb-3"
                            src={track.loadedAudioURL}
                            style={{ height: '32px' }}
                          >
                            Your browser does not support the audio element.
                          </audio>
                          <button
                            onClick={() => handleDeleteAudioURL(track.id)}
                            disabled={savingTrackId === track.id}
                            className="w-full px-3 py-2 bg-red-50 text-red-600 hover:bg-red-100 rounded-lg transition-colors text-sm font-semibold disabled:opacity-50 border border-red-200"
                          >
                            {savingTrackId === track.id ? 'Removing...' : 'Remove Audio'}
                          </button>
                        </div>
                      ) : (
                        <p className="text-sm text-slate-500 mb-3 italic bg-slate-50 p-3 rounded-lg">No audio configured yet</p>
                      )}

                      {/* Audio URL Input */}
                      <div className="space-y-2.5">
                        <div>
                          <label className="block text-xs font-semibold text-slate-600 mb-2 uppercase tracking-wider">
                            {track.loadedAudioURL ? 'Update Audio URL' : 'Enter Audio URL'}
                          </label>
                          <input
                            type="url"
                            value={audioURLInputs[track.id] || ''}
                            onChange={(e) => handleAudioURLChange(track.id, e.target.value)}
                            placeholder="https://example.com/audio.mp3"
                            className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-forest-500 focus:border-transparent text-sm placeholder-slate-400"
                            disabled={savingTrackId === track.id}
                          />
                        </div>
                        <button
                          onClick={() => handleSaveAudioURL(track.id)}
                          disabled={savingTrackId === track.id || !audioURLInputs[track.id]?.trim()}
                          className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-forest-600 text-white rounded-lg hover:bg-forest-700 transition-colors text-sm font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          {savingTrackId === track.id ? (
                            <>
                              <Loader className="w-4 h-4 animate-spin" />
                              Saving...
                            </>
                          ) : (
                            <>
                              <Save className="w-4 h-4" />
                              {track.loadedAudioURL ? 'Update' : 'Save'} Audio
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Info Box */}
      <div className={`zen-card p-5 border-l-4 animate-fadeInUp ${
        activeTab === 'listening' ? 'border-l-blue-600 bg-blue-50/50' :
        activeTab === 'reading' ? 'border-l-emerald-600 bg-emerald-50/50' :
        activeTab === 'writing' ? 'border-l-orange-600 bg-orange-50/50' :
        'border-l-slate-300 bg-slate-50/50'
      }`} style={{ animationFillMode: 'both' }}>
        <p className={`text-sm font-medium ${
          activeTab === 'listening' ? 'text-blue-900' :
          activeTab === 'reading' ? 'text-emerald-900' :
          activeTab === 'writing' ? 'text-orange-900' :
          'text-slate-900'
        }`}>
          <span className="font-bold">💡 Info:</span>{' '}
          {activeTab === 'listening' && (
            'Listening tracks contain audio-based questions. Upload audio files by providing a direct URL to the audio file (MP3, WAV, etc.).'
          )}
          {activeTab === 'reading' && (
            'Reading tracks contain passages with various question types including True/False/Not Given, Yes/No/Not Given, Matching Headings, and more. No audio required.'
          )}
          {activeTab === 'writing' && (
            'Writing tracks contain Task 1 (report/description) and Task 2 (essay) with word count requirements. No audio required.'
          )}
        </p>
      </div>
    </div>
  );
}
