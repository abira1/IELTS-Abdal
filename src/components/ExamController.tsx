import { useEffect, useState } from 'react';
import { Play, Square, AlertCircle, CheckCircle, Loader, Clock, List } from 'lucide-react';
import { getDatabase, ref, set, get } from 'firebase/database';
import { app } from '../firebase';

interface TrackOption {
  id: string;
  name: string;
  duration: number;
  totalQuestions: number;
}

export function ExamController() {
  const [isExamRunning, setIsExamRunning] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [durationMinutes, setDurationMinutes] = useState<string>('60');
  const [currentExamTimes, setCurrentExamTimes] = useState<{startTime?: string, endTime?: string, trackName?: string}>({});
  const [selectedTrackId, setSelectedTrackId] = useState<string>('track-1');
  const [availableTracks, setAvailableTracks] = useState<TrackOption[]>([]);
  const [isLoadingTracks, setIsLoadingTracks] = useState(true);

  const db = getDatabase(app);

  // Load hardcoded tracks
  useEffect(() => {
    loadHardcodedTracks();
  }, []);

  // Check exam status on mount
  useEffect(() => {
    checkExamStatus();
    const interval = setInterval(checkExamStatus, 2000);
    return () => clearInterval(interval);
  }, []);

  const loadHardcodedTracks = async () => {
    try {
      setIsLoadingTracks(true);
      // Load hardcoded tracks directly
      const { getTrackOptions } = await import('../data/tracks');
      const tracks = getTrackOptions();
      setAvailableTracks(tracks);
      if (tracks.length > 0 && !selectedTrackId) {
        setSelectedTrackId(tracks[0].id);
      }
    } catch (error) {
      console.error('Error loading tracks:', error);
      setError('Failed to load tracks');
    } finally {
      setIsLoadingTracks(false);
    }
  };

  const checkExamStatus = async () => {
    try {
      const snapshot = await get(ref(db, 'exam/status'));
      if (snapshot.exists()) {
        const data = snapshot.val();
        setIsExamRunning(data.isStarted === true);
        if (data.startTime && data.endTime) {
          setCurrentExamTimes({ 
            startTime: data.startTime, 
            endTime: data.endTime,
            trackName: data.trackName || 'Unknown Exam'
          });
        }
      }
    } catch (err) {
      console.error('Error checking exam status:', err);
    }
  };

  const startExam = async () => {
    // Validation
    if (!selectedTrackId) {
      setError('Please select an exam track.');
      return;
    }

    const minutes = Number(durationMinutes);
    if (!minutes || isNaN(minutes) || minutes <= 0) {
      setError('Please enter a valid duration in minutes.');
      return;
    }

    setIsLoading(true);
    setError(null);
    try {
      const selectedTrack = availableTracks.find(t => t.id === selectedTrackId);
      const startDate = new Date();
      const endDate = new Date(startDate.getTime() + minutes * 60000);

      const examData = {
        isStarted: true,
        activeTrackId: selectedTrackId,
        trackName: selectedTrack?.name || 'Unknown Exam',
        startedAt: startDate.toISOString(),
        startTime: startDate.toISOString(),
        endTime: endDate.toISOString(),
        durationMinutes: minutes
      };

      console.log('Starting exam with data:', examData);
      await set(ref(db, 'exam/status'), examData);
      console.log('Exam data written to Firebase successfully');
      
      setIsExamRunning(true);
      setCurrentExamTimes({ 
        startTime: startDate.toISOString(), 
        endTime: endDate.toISOString(),
        trackName: selectedTrack?.name
      });
      setSuccess(`Exam "${selectedTrack?.name}" started for ${minutes} minute${minutes > 1 ? 's' : ''}. Students can begin now.`);
      setTimeout(() => setSuccess(null), 3000);
    } catch (err) {
      setError('Failed to start exam. Please try again.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const stopExam = async () => {
    if (!confirm('Are you sure you want to stop the exam? Students will be unable to continue.')) {
      return;
    }

    setIsLoading(true);
    setError(null);
    try {
      await set(ref(db, 'exam/status'), {
        isStarted: false,
        stoppedAt: new Date().toISOString(),
        activeTrackId: null,
        trackName: null
      });
      setIsExamRunning(false);
      setCurrentExamTimes({});
      setSuccess('Exam stopped successfully!');
      setTimeout(() => setSuccess(null), 3000);
    } catch (err) {
      setError('Failed to stop exam. Please try again.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const calculateDuration = () => {
    // Prefer explicit duration value set by admin before starting
    const mins = Number(durationMinutes);
    if (mins && !isNaN(mins) && mins > 0) {
      return `${mins} minute${mins > 1 ? 's' : ''}`;
    }

    // Fallback to computing from current exam times
    if (!currentExamTimes.startTime || !currentExamTimes.endTime) return '';
    const start = new Date(currentExamTimes.startTime);
    const end = new Date(currentExamTimes.endTime);
    const diffMs = end.getTime() - start.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const hours = Math.floor(diffMins / 60);
    const minsRemaining = diffMins % 60;
    if (hours > 0) {
      return `${hours}h ${minsRemaining}m`;
    }
    return `${diffMins} minutes`;
  };

  const formatDateTime = (isoString: string) => {
    return new Date(isoString).toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="bg-[#F5F3EF] rounded-2xl shadow-lg border border-[#0F3D2E]/10 p-8">
      {/* Header */}
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-[#1F2A44] mb-2">Exam Control</h2>
        <p className="text-slate-600 text-lg">Manage exam start/stop for all waiting students</p>
      </div>

      {/* Exam Info Status Card */}
      <div className="bg-white rounded-2xl shadow-md border-2 border-[#0F3D2E] p-8 mb-8">
        <div className="space-y-5">
          <div>
            <p className="text-sm text-slate-600 font-semibold uppercase tracking-wider mb-2">
              {isExamRunning ? '🟢 Currently Running Exam' : '⚪ Exam Status'}
            </p>
            <p className="text-3xl font-bold text-[#1F2A44]">
              {isExamRunning && currentExamTimes.trackName 
                ? currentExamTimes.trackName 
                : 'No exam running'}
            </p>
          </div>
          <div className="flex items-center gap-3">
            <div className={`w-4 h-4 rounded-full ${isExamRunning ? 'bg-emerald-500 animate-pulse' : 'bg-slate-400'}`}></div>
            <p className="text-sm font-semibold text-slate-700">
              <span className={isExamRunning ? 'text-emerald-600' : 'text-slate-600'}>
                {isExamRunning ? '✓ RUNNING - Students taking exam' : '○ NOT STARTED - Select and start exam'}
              </span>
            </p>
          </div>
          {isExamRunning && currentExamTimes.startTime && currentExamTimes.endTime && (
            <div className="mt-6 pt-6 border-t-2 border-[#0F3D2E]/10">
              <div className="grid grid-cols-2 gap-6">
                <div className="bg-[#F5F3EF] rounded-xl p-4 border border-[#0F3D2E]/10">
                  <p className="text-xs text-slate-600 font-semibold uppercase tracking-wider mb-2">Start Time</p>
                  <p className="font-bold text-[#1F2A44] text-lg">{formatDateTime(currentExamTimes.startTime)}</p>
                </div>
                <div className="bg-[#F5F3EF] rounded-xl p-4 border border-[#0F3D2E]/10">
                  <p className="text-xs text-slate-600 font-semibold uppercase tracking-wider mb-2">End Time</p>
                  <p className="font-bold text-[#1F2A44] text-lg">{formatDateTime(currentExamTimes.endTime)}</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Messages */}
      {error && (
        <div className="mb-8 p-5 bg-red-50 border-l-4 border-red-600 rounded-xl flex items-start gap-4">
          <AlertCircle className="w-6 h-6 text-red-600 mt-0.5 flex-shrink-0" />
          <p className="text-red-800 font-semibold">{error}</p>
        </div>
      )}

      {success && (
        <div className="mb-8 p-5 bg-emerald-50 border-l-4 border-emerald-600 rounded-xl flex items-start gap-4">
          <CheckCircle className="w-6 h-6 text-emerald-600 mt-0.5 flex-shrink-0" />
          <p className="text-emerald-800 font-semibold">{success}</p>
        </div>
      )}

      {/* Track Selection and Duration */}
      {!isExamRunning && (
        <div className="bg-white rounded-2xl border-2 border-[#0F3D2E]/20 p-8 mb-8 space-y-8">
          {/* Track Selection */}
          <div>
            <h3 className="text-xl font-bold text-[#1F2A44] mb-5 flex items-center gap-3">
              <List className="w-6 h-6 text-[#0F3D2E]" />
              Select Exam Track
            </h3>
            
            <label className="block text-sm font-semibold text-slate-700 mb-3 uppercase tracking-wider">
              Choose which exam students will take
            </label>
            <select
              value={selectedTrackId}
              onChange={(e) => {
                setSelectedTrackId(e.target.value);
                const track = availableTracks.find(t => t.id === e.target.value);
                if (track) {
                  setDurationMinutes(String(track.duration));
                }
              }}
              className="w-full px-5 py-3 border-2 border-[#0F3D2E]/30 rounded-xl focus:ring-2 focus:ring-[#0F3D2E] focus:border-[#0F3D2E] bg-white text-[#1F2A44] font-medium"
              data-testid="track-selector"
            >
              {availableTracks.map((track) => (
                <option key={track.id} value={track.id}>
                  {track.name} ({track.duration} mins, {track.totalQuestions} questions)
                </option>
              ))}
            </select>
          </div>

          {/* Duration Selection */}
          <div className="border-t-2 border-[#0F3D2E]/10 pt-8">
            <h3 className="text-xl font-bold text-[#1F2A44] mb-5 flex items-center gap-3">
              <Clock className="w-6 h-6 text-[#0F3D2E]" />
              Set Exam Duration
            </h3>

            <div className="mb-6">
              <label className="block text-sm font-semibold text-slate-700 mb-4 uppercase tracking-wider">Quick Select (minutes)</label>
              <div className="flex flex-wrap gap-3 mb-6">
                {[30, 40, 45, 60].map((m) => (
                  <button
                    key={m}
                    type="button"
                    onClick={() => setDurationMinutes(String(m))}
                    className={`px-4 py-2 rounded-lg text-sm font-bold uppercase tracking-wider transition-all ${String(m) === durationMinutes ? 'bg-[#0F3D2E] text-white shadow-lg border-2 border-[#0F3D2E]' : 'bg-[#F5F3EF] text-[#1F2A44] border-2 border-[#0F3D2E]/30 hover:border-[#0F3D2E]'}`}
                  >
                    {m}m
                  </button>
                ))}
              </div>

              <div className="flex gap-4 items-center mb-6">
                <div className="flex-1">
                  <label className="block text-sm font-semibold text-slate-700 mb-2 uppercase tracking-wider">Custom Duration</label>
                  <input
                    type="number"
                    min={1}
                    step={1}
                    value={durationMinutes}
                    onChange={(e) => setDurationMinutes(e.target.value)}
                    className="w-full px-4 py-3 border-2 border-[#0F3D2E]/30 rounded-xl focus:ring-2 focus:ring-[#0F3D2E] focus:border-[#0F3D2E] text-[#1F2A44] font-semibold"
                    data-testid="exam-duration-input"
                  />
                </div>
                <div className="text-sm font-bold text-[#1F2A44] mt-7">minutes</div>
              </div>
            </div>

            {durationMinutes && (
              <div className="bg-gradient-to-r from-[#0F3D2E]/5 to-emerald-50 rounded-xl p-5 border-2 border-[#0F3D2E]/30">
                <p className="text-sm font-bold text-[#1F2A44]">
                  <span className="text-[#0F3D2E]">⏱️ Exam Duration:</span> {calculateDuration()}
                </p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Controls */}
      <div className="space-y-4 mb-8">
        {!isExamRunning ? (
          <button
            onClick={startExam}
            disabled={isLoading}
            className="w-full bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold py-4 rounded-xl transition-all transform hover:scale-105 flex items-center justify-center gap-3 shadow-lg uppercase tracking-wider"
            data-testid="start-exam-button"
          >
            {isLoading ? (
              <Loader className="w-6 h-6 animate-spin" />
            ) : (
              <Play className="w-6 h-6" />
            )}
            {isLoading ? 'Starting...' : 'Start Exam for All Students'}
          </button>
        ) : (
          <button
            onClick={stopExam}
            disabled={isLoading}
            className="w-full bg-red-600 hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold py-4 rounded-xl transition-all transform hover:scale-105 flex items-center justify-center gap-3 shadow-lg uppercase tracking-wider"
            data-testid="stop-exam-button"
          >
            {isLoading ? (
              <Loader className="w-6 h-6 animate-spin" />
            ) : (
              <Square className="w-6 h-6" />
            )}
            {isLoading ? 'Stopping...' : 'Stop Exam'}
          </button>
        )}
      </div>

      {/* Info Tip */}
      <div className="p-6 bg-gradient-to-r from-[#0F3D2E]/10 to-emerald-50 border-2 border-[#0F3D2E]/30 rounded-xl">
        <p className="text-sm text-[#1F2A44] font-semibold leading-relaxed">
          <span className="text-lg mr-2">💡</span>
          <span className="font-bold text-[#0F3D2E]">How it works:</span> Students can only start the exam at or after the scheduled start time. The exam will automatically end at the specified end time. In the last 5 minutes, the countdown timer will turn red.
        </p>
      </div>
    </div>
  );
}
