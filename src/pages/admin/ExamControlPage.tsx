import { useState, useEffect } from 'react';
import {
  Play,
  Square,
  Calendar,
  Clock,
  Users,
  FileText,
  CheckCircle,
  AlertCircle,
  Loader,
  Edit,
  Trash2,
  Eye,
  Headphones,
  BookOpen,
  PenTool,
  Layers
} from 'lucide-react';
import { examSessionService, ExamSession } from '../../services/examSessionService';
import { batchService } from '../../services/batchService';
import { allTracks, getTracksByType } from '../../data/tracks';
import { format } from 'date-fns';
import { getDatabase, ref, set } from 'firebase/database';
import { app } from '../../firebase';
import { useNavigate } from 'react-router-dom';

type TestType = 'partial' | 'mock';
type TrackType = 'listening' | 'reading' | 'writing';

export function ExamControlPage() {
  const navigate = useNavigate();
  
  // NEW: Test type and track selection states
  const [testType, setTestType] = useState<TestType>('partial');
  const [partialTrackType, setPartialTrackType] = useState<TrackType>('listening');
  const [partialSelectedTrack, setPartialSelectedTrack] = useState<string>('');
  const [mockTracks, setMockTracks] = useState<{
    listening: string;
    reading: string;
    writing: string;
  }>({
    listening: '',
    reading: '',
    writing: ''
  });
  
  // Individual durations for mock test sections
  const [mockDurations, setMockDurations] = useState<{
    listening: number;
    reading: number;
    writing: number;
  }>({
    listening: 40,
    reading: 60,
    writing: 60
  });
  
  // Track if durations have been manually customized
  const [mockDurationsCustomized, setMockDurationsCustomized] = useState<{
    listening: boolean;
    reading: boolean;
    writing: boolean;
  }>({
    listening: false,
    reading: false,
    writing: false
  });
  
  // Legacy state for backward compatibility
  const [selectedTrackId, setSelectedTrackId] = useState<string>('');
  const [examDate, setExamDate] = useState<string>(format(new Date(), 'yyyy-MM-dd'));
  const [startTime, setStartTime] = useState<string>('10:00');
  const [duration, setDuration] = useState<number>(60);
  const [isDurationManuallySet, setIsDurationManuallySet] = useState(false);
  const [selectedBatches, setSelectedBatches] = useState<string[]>([]);
  const [generatedExamCode, setGeneratedExamCode] = useState<string>('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  
  // PHASE 1: Countdown configuration
  const [useCountdown, setUseCountdown] = useState(false);
  const [countdownSeconds, setCountdownSeconds] = useState(120); // Default 2 minutes

  // Sessions state
  const [activeExams, setActiveExams] = useState<ExamSession[]>([]);
  const [scheduledExams, setScheduledExams] = useState<ExamSession[]>([]);
  const [completedExams, setCompletedExams] = useState<ExamSession[]>([]);
  const [batches, setBatches] = useState<any[]>([]);
  const [isLoadingSessions, setIsLoadingSessions] = useState(true);

  useEffect(() => {
    loadBatches();
    loadExamSessions();

    // Refresh sessions every 10 seconds
    const interval = setInterval(loadExamSessions, 10000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    // Generate exam code when relevant fields change
    if (testType === 'partial' && partialSelectedTrack) {
      generateExamCode();
    } else if (testType === 'mock' && mockTracks.listening && mockTracks.reading && mockTracks.writing) {
      generateExamCode();
    }
  }, [testType, partialSelectedTrack, mockTracks, mockDurations, examDate]);

  const loadBatches = async () => {
    const allBatches = await batchService.getAllBatches();
    setBatches(allBatches);
  };

  const loadExamSessions = async () => {
    setIsLoadingSessions(true);
    try {
      // Auto-stop any expired exams first
      await examSessionService.autoStopExpiredExams();

      const [active, scheduled] = await Promise.all([
        examSessionService.getActiveExams(),
        examSessionService.getScheduledExams()
      ]);

      setActiveExams(active);
      setScheduledExams(scheduled);

      // Get last 10 completed exams
      const allSessions = await examSessionService.getAllExamSessions();
      const completed = allSessions
        .filter(s => s.status === 'completed')
        .sort((a, b) => new Date(b.completedAt || b.createdAt).getTime() - new Date(a.completedAt || a.createdAt).getTime())
        .slice(0, 10);
      setCompletedExams(completed);
    } catch (err) {
      console.error('Error loading exam sessions:', err);
    } finally {
      setIsLoadingSessions(false);
    }
  };

  const generateExamCode = async () => {
    setIsGenerating(true);
    try {
      if (testType === 'partial') {
        if (!partialSelectedTrack) return;
        
        const track = allTracks.find(t => t.id === partialSelectedTrack);
        if (!track) return;

        const code = await examSessionService.generateExamCode(
          partialSelectedTrack,
          track.shortName,
          new Date(examDate),
          'partial'
        );
        setGeneratedExamCode(code);
        // Only set duration from track if it hasn't been manually set by admin
        if (!isDurationManuallySet) {
          setDuration(track.duration);
        }
      } else {
        // Mock test
        if (!mockTracks.listening || !mockTracks.reading || !mockTracks.writing) return;

        const code = await examSessionService.generateExamCode(
          null,
          null,
          new Date(examDate),
          'mock',
          mockTracks
        );
        setGeneratedExamCode(code);
        
        // Calculate total duration from individual mock durations
        const totalDuration = mockDurations.listening + mockDurations.reading + mockDurations.writing;
        setDuration(totalDuration);
      }
    } catch (err) {
      console.error('Error generating exam code:', err);
      setError('Failed to generate exam code');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleCreateSession = async (startImmediately: boolean = false, withCountdown: boolean = false) => {
    // Validation
    if (testType === 'partial') {
      if (!partialSelectedTrack) {
        setError('Please select a track');
        return;
      }
    } else {
      // Mock test validation
      if (!mockTracks.listening || !mockTracks.reading || !mockTracks.writing) {
        setError('Please select one track from each type (Listening, Reading, Writing)');
        return;
      }
    }

    if (selectedBatches.length === 0) {
      setError('Please select at least one batch');
      return;
    }

    if (!duration || duration <= 0) {
      setError('Please enter a valid duration');
      return;
    }

    // Check if there's already an active exam
    if (startImmediately && activeExams.length > 0) {
      setError('Cannot start new exam. Another exam is currently active. Please stop it first.');
      return;
    }

    setIsCreating(true);
    setError(null);

    try {
      let trackId = '';
      let trackName = '';
      let audioURL: string | null = null;
      let selectedTracks = {};

      if (testType === 'partial') {
        const track = allTracks.find(t => t.id === partialSelectedTrack);
        if (!track) {
          setError('Selected track not found');
          return;
        }
        trackId = track.id;
        trackName = track.name;
        audioURL = track.audioURL || null;
        
        // Store in selectedTracks for consistency
        selectedTracks = {
          [partialTrackType]: partialSelectedTrack
        };
      } else {
        // Mock test
        trackId = 'mock'; // Use 'mock' as trackId for mock tests
        trackName = 'Mock Test (Listening + Reading + Writing)';
        
        // Get audio URL from listening track
        const listeningTrack = allTracks.find(t => t.id === mockTracks.listening);
        audioURL = listeningTrack?.audioURL || null;
        
        selectedTracks = {
          listening: mockTracks.listening,
          reading: mockTracks.reading,
          writing: mockTracks.writing
        };
      }

      // Calculate start and end times
      const sessionDate = new Date(`${examDate}T${startTime}`);
      const endDate = new Date(sessionDate.getTime() + duration * 60000);

      const sessionData: any = {
        examCode: generatedExamCode,
        trackId: trackId,
        trackName: trackName,
        testType: testType,
        selectedTracks: selectedTracks,
        date: examDate,
        startTime: startTime,
        endTime: format(endDate, 'HH:mm'),
        duration: duration,
        status: startImmediately ? 'active' : 'scheduled',
        allowedBatches: selectedBatches,
        audioURL: audioURL,
        createdBy: 'admin', // TODO: Get from auth context
        // PHASE 1: Store countdown settings
        countdownEnabled: useCountdown && withCountdown,
        countdownSeconds: useCountdown && withCountdown ? countdownSeconds : undefined
      };

      // Only include trackDurations for mock tests
      if (testType === 'mock') {
        sessionData.trackDurations = mockDurations;
      }

      const result = await examSessionService.createExamSession(sessionData);

      if (result.success) {
        // PHASE 2: If starting with countdown, trigger countdown flow
        if (withCountdown && result.examCode) {
          console.log('🕐 Starting exam with countdown...');
          
          // Trigger countdown flow in background
          examSessionService.startExamWithCountdown(result.examCode).then(success => {
            if (success) {
              console.log('✅ Exam started successfully after countdown');
              loadExamSessions();
            } else {
              console.error('❌ Failed to start exam after countdown');
              setError('Failed to start exam after countdown');
            }
          });

          setSuccess(`Exam ${result.examCode} countdown started! Students will see countdown popup.`);
        } 
        // If starting immediately without countdown, update global exam status
        else if (startImmediately && result.examCode) {
          const db = getDatabase(app);
          // Calculate end time from NOW when starting immediately
          const now = new Date();
          const immediateEndDate = new Date(now.getTime() + duration * 60000);
          
          const examStatusData: any = {
            isStarted: true,
            activeTrackId: trackId,
            trackName: trackName,
            testType: testType,
            selectedTracks: selectedTracks,
            examCode: result.examCode,
            startTime: now.toISOString(),
            endTime: immediateEndDate.toISOString(),
            duration: duration,
            startedBy: 'admin'
          };

          // Only include trackDurations for mock tests
          if (testType === 'mock') {
            examStatusData.trackDurations = mockDurations;
          }

          await set(ref(db, 'exam/status'), examStatusData);
          setSuccess(`Exam ${result.examCode} started successfully!`);
        } else {
          setSuccess(`Exam ${result.examCode} scheduled successfully!`);
        }

        // Reset form
        setPartialSelectedTrack('');
        setMockTracks({ listening: '', reading: '', writing: '' });
        setMockDurationsCustomized({ listening: false, reading: false, writing: false });
        setSelectedBatches([]);
        setGeneratedExamCode('');

        // Reload sessions
        await loadExamSessions();

        setTimeout(() => setSuccess(null), 5000);
      } else {
        setError(result.error || 'Failed to create exam session');
      }
    } catch (err) {
      console.error('Error creating exam session:', err);
      setError('Failed to create exam session');
    } finally {
      setIsCreating(false);
    }
  };

  const handleStartExam = async (examCode: string) => {
    // Check if another exam is active
    if (activeExams.length > 0) {
      setError('Cannot start exam. Another exam is currently active.');
      return;
    }

    try {
      const success = await examSessionService.startExam(examCode);
      if (success) {
        setSuccess(`Exam ${examCode} started!`);
        await loadExamSessions();
        setTimeout(() => setSuccess(null), 3000);
      } else {
        setError('Failed to start exam');
      }
    } catch (err) {
      console.error('Error starting exam:', err);
      setError('Failed to start exam');
    }
  };

  const handleStopExam = async (examCode: string) => {
    if (!confirm('Are you sure you want to stop this exam? Students will no longer be able to submit.')) {
      return;
    }

    try {
      const success = await examSessionService.stopExam(examCode);
      if (success) {
        setSuccess(`Exam ${examCode} stopped!`);
        await loadExamSessions();
        setTimeout(() => setSuccess(null), 3000);
      } else {
        setError('Failed to stop exam');
      }
    } catch (err) {
      console.error('Error stopping exam:', err);
      setError('Failed to stop exam');
    }
  };

  const handleDeleteSession = async (examCode: string) => {
    if (!confirm(`Are you sure you want to delete exam ${examCode}? This action cannot be undone.`)) {
      return;
    }

    try {
      const success = await examSessionService.deleteExamSession(examCode);
      if (success) {
        setSuccess(`Exam ${examCode} deleted!`);
        await loadExamSessions();
        setTimeout(() => setSuccess(null), 3000);
      } else {
        setError('Failed to delete exam');
      }
    } catch (err) {
      console.error('Error deleting exam:', err);
      setError('Failed to delete exam');
    }
  };

  const toggleBatchSelection = (batchId: string) => {
    setSelectedBatches(prev =>
      prev.includes(batchId)
        ? prev.filter(id => id !== batchId)
        : [...prev, batchId]
    );
  };

  return (
    <div className="space-y-8">
      {/* Messages */}
      {error && (
        <div className="p-5 bg-red-50 border-l-4 border-red-600 rounded-xl flex items-start gap-4">
          <AlertCircle className="w-6 h-6 text-red-600 mt-0.5 flex-shrink-0" />
          <p className="text-red-800 font-semibold">{error}</p>
        </div>
      )}

      {success && (
        <div className="p-5 bg-emerald-50 border-l-4 border-emerald-600 rounded-xl flex items-start gap-4">
          <CheckCircle className="w-6 h-6 text-emerald-600 mt-0.5 flex-shrink-0" />
          <p className="text-emerald-800 font-semibold">{success}</p>
        </div>
      )}

      {/* Create New Exam Session */}
      <div className="bg-white rounded-2xl shadow-lg border-2 border-[#0F3D2E]/20 p-8">
        <h2 className="text-2xl font-bold text-[#1F2A44] mb-8">📝 Create New Exam Session</h2>

        <div className="space-y-8">
          {/* Test Type Selection */}
          <div>
            <label className="block text-sm font-bold text-[#1F2A44] mb-4 uppercase tracking-wider">
              Test Type <span className="text-red-500">*</span>
            </label>
            <div className="flex gap-4">
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="radio"
                  name="testType"
                  value="partial"
                  checked={testType === 'partial'}
                  onChange={(e) => {
                    setTestType('partial');
                    setGeneratedExamCode('');
                    setIsDurationManuallySet(false);
                  }}
                  className="w-4 h-4 text-[#0F3D2E] focus:ring-2 focus:ring-[#0F3D2E]"
                />
                <span className="text-sm font-semibold text-slate-700">Partial Test (Single Track)</span>
              </label>
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="radio"
                  name="testType"
                  value="mock"
                  checked={testType === 'mock'}
                  onChange={(e) => {
                    setTestType('mock');
                    setGeneratedExamCode('');
                    setIsDurationManuallySet(false);
                    // Reset customization flags when switching to mock test
                    setMockDurationsCustomized({ listening: false, reading: false, writing: false });
                  }}
                  className="w-4 h-4 text-[#0F3D2E] focus:ring-2 focus:ring-[#0F3D2E]"
                />
                <span className="text-sm font-semibold text-slate-700">Mock Test (Full Test)</span>
              </label>
            </div>
            <p className="text-xs text-slate-600 mt-3 font-medium">
              {testType === 'partial' 
                ? 'Select one track from any type (Listening, Reading, or Writing)'
                : 'Select one track from each type (Listening + Reading + Writing)'}
            </p>
          </div>

          {/* Partial Test: Track Type Selection + Track Dropdown */}
          {testType === 'partial' && (
            <div className="space-y-6 border-t-2 border-[#0F3D2E]/20 pt-8">
              {/* Track Type Selection */}
              <div>
                <label className="block text-sm font-bold text-[#1F2A44] mb-4 uppercase tracking-wider">
                  Track Type <span className="text-red-500">*</span>
                </label>
                <div className="grid grid-cols-3 gap-4">
                  <button
                    type="button"
                    onClick={() => {
                      setPartialTrackType('listening');
                      setPartialSelectedTrack('');
                      setGeneratedExamCode('');
                    }}
                    className={`flex items-center justify-center gap-2 px-5 py-3 rounded-xl border-2 font-bold transition-all uppercase tracking-wider ${
                      partialTrackType === 'listening'
                        ? 'border-[#0F3D2E] bg-[#0F3D2E]/10 text-[#0F3D2E]'
                        : 'border-[#0F3D2E]/30 bg-white text-slate-700 hover:border-[#0F3D2E]'
                    }`}
                  >
                    <Headphones className="w-5 h-5" />
                    <span>Listening</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setPartialTrackType('reading');
                      setPartialSelectedTrack('');
                      setGeneratedExamCode('');
                    }}
                    className={`flex items-center justify-center gap-2 px-5 py-3 rounded-xl border-2 font-bold transition-all uppercase tracking-wider ${
                      partialTrackType === 'reading'
                        ? 'border-[#0F3D2E] bg-[#0F3D2E]/10 text-[#0F3D2E]'
                        : 'border-[#0F3D2E]/30 bg-white text-slate-700 hover:border-[#0F3D2E]'
                    }`}
                  >
                    <BookOpen className="w-5 h-5" />
                    <span>Reading</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setPartialTrackType('writing');
                      setPartialSelectedTrack('');
                      setGeneratedExamCode('');
                    }}
                    className={`flex items-center justify-center gap-2 px-5 py-3 rounded-xl border-2 font-bold transition-all uppercase tracking-wider ${
                      partialTrackType === 'writing'
                        ? 'border-[#0F3D2E] bg-[#0F3D2E]/10 text-[#0F3D2E]'
                        : 'border-[#0F3D2E]/30 bg-white text-slate-700 hover:border-[#0F3D2E]'
                    }`}
                  >
                    <PenTool className="w-5 h-5" />
                    <span>Writing</span>
                  </button>
                </div>
              </div>

              {/* Track Selection Dropdown */}
              <div>
                <label className="block text-sm font-bold text-[#1F2A44] mb-3 uppercase tracking-wider">
                  Select {partialTrackType.charAt(0).toUpperCase() + partialTrackType.slice(1)} Track <span className="text-red-500">*</span>
                </label>
                <select
                  value={partialSelectedTrack}
                  onChange={(e) => {
                    setPartialSelectedTrack(e.target.value);
                    setIsDurationManuallySet(false); // Reset flag when track changes
                  }}
                  className="w-full px-5 py-3 border-2 border-[#0F3D2E]/30 rounded-xl focus:ring-2 focus:ring-[#0F3D2E] focus:border-[#0F3D2E] bg-white text-[#1F2A44] font-medium"
                  data-testid="partial-track-selector"
                >
                  <option value="">-- Select a track --</option>
                  {getTracksByType(partialTrackType).map((track) => (
                    <option key={track.id} value={track.id}>
                      {track.name} ({track.duration} mins, {track.totalQuestions} {track.trackType === 'writing' ? 'tasks' : 'questions'})
                    </option>
                  ))}
                </select>
                {partialSelectedTrack && (
                  <p className="text-xs text-slate-600 mt-2 font-medium">
                    ℹ️ Default duration: {allTracks.find(t => t.id === partialSelectedTrack)?.duration} minutes (You can customize it below)
                  </p>
                )}
              </div>
            </div>
          )}

          {/* Mock Test: Three Separate Dropdowns */}
          {testType === 'mock' && (
            <div className="space-y-6 border-t-2 border-[#0F3D2E]/20 pt-8">
              {/* Listening Track */}
              <div>
                <label className="block text-sm font-bold text-[#1F2A44] mb-3 uppercase tracking-wider flex items-center gap-2">
                  <Headphones className="w-5 h-5 text-[#0F3D2E]" />
                  Listening Track <span className="text-red-500">*</span>
                </label>
                <select
                  value={mockTracks.listening}
                  onChange={(e) => {
                    setMockTracks(prev => ({ ...prev, listening: e.target.value }));
                    const track = getTracksByType('listening').find(t => t.id === e.target.value);
                    if (track) {
                      setMockDurations(prev => ({ ...prev, listening: track.duration }));
                      // Reset customization flag when track changes
                      setMockDurationsCustomized(prev => ({ ...prev, listening: false }));
                    }
                  }}
                  className="w-full px-5 py-3 border-2 border-[#0F3D2E]/30 rounded-xl focus:ring-2 focus:ring-[#0F3D2E] focus:border-[#0F3D2E] bg-white text-[#1F2A44] font-medium"
                  data-testid="mock-listening-selector"
                >
                  <option value="">-- Select listening track --</option>
                  {getTracksByType('listening').map((track) => (
                    <option key={track.id} value={track.id}>
                      {track.name} ({track.duration} mins, {track.totalQuestions} questions)
                    </option>
                  ))}
                </select>
                {mockTracks.listening && (
                  <div className="mt-3">
                    <label className="block text-xs font-bold text-slate-700 mb-2 uppercase tracking-wider">Duration (minutes)</label>
                    <input
                      type="number"
                      min={1}
                      value={mockDurations.listening}
                      onChange={(e) => {
                        setMockDurations(prev => ({ ...prev, listening: Number(e.target.value) }));
                        setMockDurationsCustomized(prev => ({ ...prev, listening: true }));
                      }}
                      className="w-full px-4 py-2 border-2 border-[#0F3D2E]/30 rounded-lg focus:ring-2 focus:ring-[#0F3D2E] focus:border-[#0F3D2E] text-[#1F2A44] font-medium"
                      data-testid="mock-listening-duration"
                    />
                  </div>
                )}
              </div>

              {/* Reading Track */}
              <div>
                <label className="block text-sm font-bold text-[#1F2A44] mb-3 uppercase tracking-wider flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-[#0F3D2E]" />
                  Reading Track <span className="text-red-500">*</span>
                </label>
                <select
                  value={mockTracks.reading}
                  onChange={(e) => {
                    setMockTracks(prev => ({ ...prev, reading: e.target.value }));
                    const track = getTracksByType('reading').find(t => t.id === e.target.value);
                    if (track) {
                      setMockDurations(prev => ({ ...prev, reading: track.duration }));
                      // Reset customization flag when track changes
                      setMockDurationsCustomized(prev => ({ ...prev, reading: false }));
                    }
                  }}
                  className="w-full px-5 py-3 border-2 border-[#0F3D2E]/30 rounded-xl focus:ring-2 focus:ring-[#0F3D2E] focus:border-[#0F3D2E] bg-white text-[#1F2A44] font-medium"
                  data-testid="mock-reading-selector"
                >
                  <option value="">-- Select reading track --</option>
                  {getTracksByType('reading').map((track) => (
                    <option key={track.id} value={track.id}>
                      {track.name} ({track.duration} mins, {track.totalQuestions} questions)
                    </option>
                  ))}
                </select>
                {mockTracks.reading && (
                  <div className="mt-3">
                    <label className="block text-xs font-bold text-slate-700 mb-2 uppercase tracking-wider">Duration (minutes)</label>
                    <input
                      type="number"
                      min={1}
                      value={mockDurations.reading}
                      onChange={(e) => {
                        setMockDurations(prev => ({ ...prev, reading: Number(e.target.value) }));
                        setMockDurationsCustomized(prev => ({ ...prev, reading: true }));
                      }}
                      className="w-full px-4 py-2 border-2 border-[#0F3D2E]/30 rounded-lg focus:ring-2 focus:ring-[#0F3D2E] focus:border-[#0F3D2E] text-[#1F2A44] font-medium"
                      data-testid="mock-reading-duration"
                    />
                  </div>
                )}
              </div>

              {/* Writing Track */}
              <div>
                <label className="block text-sm font-bold text-[#1F2A44] mb-3 uppercase tracking-wider flex items-center gap-2">
                  <PenTool className="w-5 h-5 text-[#0F3D2E]" />
                  Writing Track <span className="text-red-500">*</span>
                </label>
                <select
                  value={mockTracks.writing}
                  onChange={(e) => {
                    setMockTracks(prev => ({ ...prev, writing: e.target.value }));
                    const track = getTracksByType('writing').find(t => t.id === e.target.value);
                    if (track) {
                      setMockDurations(prev => ({ ...prev, writing: track.duration }));
                      // Reset customization flag when track changes
                      setMockDurationsCustomized(prev => ({ ...prev, writing: false }));
                    }
                  }}
                  className="w-full px-5 py-3 border-2 border-[#0F3D2E]/30 rounded-xl focus:ring-2 focus:ring-[#0F3D2E] focus:border-[#0F3D2E] bg-white text-[#1F2A44] font-medium"
                  data-testid="mock-writing-selector"
                >
                  <option value="">-- Select writing track --</option>
                  {getTracksByType('writing').map((track) => (
                    <option key={track.id} value={track.id}>
                      {track.name} ({track.duration} mins, {track.totalQuestions} tasks)
                    </option>
                  ))}
                </select>
                {mockTracks.writing && (
                  <div className="mt-3">
                    <label className="block text-xs font-bold text-slate-700 mb-2 uppercase tracking-wider">Duration (minutes)</label>
                    <input
                      type="number"
                      min={1}
                      value={mockDurations.writing}
                      onChange={(e) => {
                        setMockDurations(prev => ({ ...prev, writing: Number(e.target.value) }));
                        setMockDurationsCustomized(prev => ({ ...prev, writing: true }));
                      }}
                      className="w-full px-4 py-2 border-2 border-[#0F3D2E]/30 rounded-lg focus:ring-2 focus:ring-[#0F3D2E] focus:border-[#0F3D2E] text-[#1F2A44] font-medium"
                      data-testid="mock-writing-duration"
                    />
                  </div>
                )}
              </div>

              {/* Duration Info for Mock Test */}
              {mockTracks.listening && mockTracks.reading && mockTracks.writing && (
                <div className="bg-gradient-to-r from-[#0F3D2E]/5 to-emerald-50 p-5 rounded-xl border-2 border-[#0F3D2E]/30">
                  <p className="text-sm text-[#1F2A44] font-bold mb-3">
                    <span className="text-[#0F3D2E]">📊 Total Duration:</span> {duration} minutes
                    {(mockDurationsCustomized.listening || mockDurationsCustomized.reading || mockDurationsCustomized.writing) && (
                      <span className="ml-3 text-xs bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full font-bold">CUSTOM DURATIONS</span>
                    )}
                  </p>
                  <div className="text-sm text-slate-700 space-y-2 font-medium">
                    <div className="flex justify-between">
                      <span>🎧 Listening:</span>
                      <span className="font-bold text-[#0F3D2E]">
                        {mockDurations.listening} min
                        {mockDurationsCustomized.listening && <span className="ml-2 text-xs text-emerald-600">(custom)</span>}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>📖 Reading:</span>
                      <span className="font-bold text-[#0F3D2E]">
                        {mockDurations.reading} min
                        {mockDurationsCustomized.reading && <span className="ml-2 text-xs text-emerald-600">(custom)</span>}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>✍️ Writing:</span>
                      <span className="font-bold text-[#0F3D2E]">
                        {mockDurations.writing} min
                        {mockDurationsCustomized.writing && <span className="ml-2 text-xs text-emerald-600">(custom)</span>}
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Exam Code Display */}
          {generatedExamCode && (
            <div className="bg-gradient-to-r from-[#0F3D2E]/5 to-emerald-50 p-6 rounded-xl border-2 border-[#0F3D2E]/30">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-slate-600 font-bold uppercase tracking-wider mb-2">Generated Exam Code</p>
                  <p className="text-3xl font-bold text-[#0F3D2E]">{generatedExamCode}</p>
                </div>
                <button
                  onClick={generateExamCode}
                  disabled={isGenerating}
                  className="px-5 py-2 text-sm font-bold bg-white border-2 border-[#0F3D2E] rounded-lg hover:bg-[#F5F3EF] disabled:opacity-50 text-[#0F3D2E] uppercase tracking-wider transition-colors"
                >
                  {isGenerating ? 'Generating...' : 'Regenerate'}
                </button>
              </div>
            </div>
          )}

          {/* Date and Time */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 border-t-2 border-[#0F3D2E]/20 pt-8">
            <div>
              <label className="block text-sm font-bold text-[#1F2A44] mb-3 uppercase tracking-wider flex items-center gap-2">
                <Calendar className="w-5 h-5 text-[#0F3D2E]" />
                Date <span className="text-red-500">*</span>
              </label>
              <input
                type="date"
                value={examDate}
                onChange={(e) => setExamDate(e.target.value)}
                className="w-full px-5 py-3 border-2 border-[#0F3D2E]/30 rounded-xl focus:ring-2 focus:ring-[#0F3D2E] focus:border-[#0F3D2E] bg-white text-[#1F2A44] font-medium"
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-[#1F2A44] mb-3 uppercase tracking-wider flex items-center gap-2">
                <Clock className="w-5 h-5 text-[#0F3D2E]" />
                Start Time <span className="text-red-500">*</span>
              </label>
              <input
                type="time"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
                className="w-full px-5 py-3 border-2 border-[#0F3D2E]/30 rounded-xl focus:ring-2 focus:ring-[#0F3D2E] focus:border-[#0F3D2E] bg-white text-[#1F2A44] font-medium"
              />
            </div>
          </div>

          {/* Duration */}
          <div className="border-t-2 border-[#0F3D2E]/20 pt-8">
            <label className="block text-sm font-bold text-[#1F2A44] mb-4 uppercase tracking-wider">
              Duration (minutes) <span className="text-red-500">*</span>
            </label>
            {testType === 'mock' ? (
              <div className="bg-gradient-to-r from-[#0F3D2E]/5 to-emerald-50 p-5 rounded-xl border-2 border-[#0F3D2E]/30">
                {(mockDurationsCustomized.listening || mockDurationsCustomized.reading || mockDurationsCustomized.writing) ? (
                  <p className="text-sm text-emerald-700 mb-2 font-bold">
                    ⚙️ Custom durations are set for this mock test
                  </p>
                ) : (
                  <p className="text-sm text-slate-700 mb-2 font-medium">
                    Duration is automatically calculated based on selected tracks
                  </p>
                )}
                <p className="text-3xl font-bold text-[#0F3D2E]">{duration} minutes</p>
              </div>
            ) : (
              <>
                <div className="flex flex-wrap gap-3 mb-4">
                  {[30, 45, 60, 90].map((m) => (
                    <button
                      key={m}
                      type="button"
                      onClick={() => {
                        setDuration(m);
                        setIsDurationManuallySet(true);
                      }}
                      className={`px-5 py-2 rounded-lg text-sm font-bold border-2 uppercase tracking-wider transition-all ${
                        duration === m
                          ? 'bg-[#0F3D2E] text-white border-[#0F3D2E]'
                          : 'bg-white text-[#1F2A44] border-[#0F3D2E]/30 hover:border-[#0F3D2E]'
                      }`}
                    >
                      {m}m
                    </button>
                  ))}
                </div>
                <input
                  type="number"
                  min={1}
                  value={duration}
                  onChange={(e) => {
                    setDuration(Number(e.target.value));
                    setIsDurationManuallySet(true);
                  }}
                  className="w-full px-5 py-3 border-2 border-[#0F3D2E]/30 rounded-xl focus:ring-2 focus:ring-[#0F3D2E] focus:border-[#0F3D2E] bg-white text-[#1F2A44] font-medium"
                  placeholder="Enter custom duration in minutes"
                />
                <p className="text-xs text-slate-600 mt-3 font-medium">
                  💡 You can customize the duration for this exam session
                </p>
              </>
            )}
          </div>

          {/* Allowed Batches */}
          <div className="border-t-2 border-[#0F3D2E]/20 pt-8">
            <label className="block text-sm font-bold text-[#1F2A44] mb-4 uppercase tracking-wider flex items-center gap-2">
              <Users className="w-5 h-5 text-[#0F3D2E]" />
              Allowed Batches <span className="text-red-500">*</span>
            </label>
            <div className="border-2 border-[#0F3D2E]/30 rounded-xl p-5 space-y-3 max-h-64 overflow-y-auto bg-white">
              {batches.length === 0 ? (
                <p className="text-sm text-slate-600 font-medium">No batches available</p>
              ) : (
                batches.map((batch) => (
                  <label key={batch.batchId} className="flex items-center gap-3 cursor-pointer hover:bg-[#F5F3EF] p-3 rounded-lg transition-colors">
                    <input
                      type="checkbox"
                      checked={selectedBatches.includes(batch.batchId)}
                      onChange={() => toggleBatchSelection(batch.batchId)}
                      className="w-5 h-5 text-[#0F3D2E] rounded focus:ring-2 focus:ring-[#0F3D2E]"
                    />
                    <span className="text-sm font-medium text-slate-700">
                      {batch.batchName} <span className="text-xs text-slate-600">({batch.totalStudents || 0} students)</span>
                    </span>
                  </label>
                ))
              )}
            </div>
            {selectedBatches.length > 0 && (
              <p className="text-sm font-semibold text-[#0F3D2E] mt-3">
                ✓ {selectedBatches.length} batch{selectedBatches.length > 1 ? 'es' : ''} selected
              </p>
            )}
          </div>

          {/* PHASE 1: Countdown Configuration */}
          <div className="border-t pt-6">
            <label className="flex items-center gap-3 cursor-pointer group">
              <input
                type="checkbox"
                checked={useCountdown}
                onChange={(e) => setUseCountdown(e.target.checked)}
                className="w-5 h-5 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
                data-testid="countdown-toggle"
              />
              <div className="flex-1">
                <span className="text-sm font-bold text-[#1F2A44] group-hover:text-[#0F3D2E] transition-colors">
                  ⏱️ Start with Countdown Delay
                </span>
                <p className="text-xs text-slate-600 mt-1 font-medium">
                  Show a full-screen countdown to all students before exam starts
                </p>
              </div>
            </label>

            {useCountdown && (
              <div className="mt-6 ml-8 space-y-5 bg-[#F5F3EF] p-5 rounded-xl border-2 border-[#0F3D2E]/20">
                <div>
                  <label className="block text-sm font-bold text-[#1F2A44] mb-4 uppercase tracking-wider">
                    Countdown Duration
                  </label>
                  
                  {/* Quick Select Buttons */}
                  <div className="flex flex-wrap gap-3 mb-5">
                    {[30, 60, 120, 180].map((seconds) => (
                      <button
                        key={seconds}
                        type="button"
                        onClick={() => setCountdownSeconds(seconds)}
                        className={`px-5 py-2 rounded-lg text-sm font-bold border-2 uppercase tracking-wider transition-all ${
                          countdownSeconds === seconds
                            ? 'bg-[#0F3D2E] text-white border-[#0F3D2E]'
                            : 'bg-white text-[#1F2A44] border-[#0F3D2E]/30 hover:border-[#0F3D2E]'
                        }`}
                        data-testid={`countdown-preset-${seconds}`}
                      >
                        {seconds < 60 ? `${seconds}s` : `${seconds / 60}m`}
                      </button>
                    ))}
                  </div>

                  {/* Custom Input */}
                  <div className="flex items-center gap-4">
                    <input
                      type="number"
                      min={10}
                      max={300}
                      step={10}
                      value={countdownSeconds}
                      onChange={(e) => setCountdownSeconds(Math.max(10, Math.min(300, Number(e.target.value))))}
                      className="flex-1 px-4 py-2 border-2 border-[#0F3D2E]/30 rounded-lg focus:ring-2 focus:ring-[#0F3D2E] focus:border-[#0F3D2E] bg-white text-[#1F2A44] font-medium"
                      data-testid="countdown-custom-input"
                    />
                    <span className="text-sm font-semibold text-slate-700">seconds</span>
                    <span className="text-sm text-slate-600 font-medium">
                      ({Math.floor(countdownSeconds / 60)}m {countdownSeconds % 60}s)
                    </span>
                  </div>
                </div>

                {/* Info Box */}
                <div className="bg-white p-4 rounded-lg border-2 border-[#0F3D2E]/20">
                  <p className="text-xs text-[#1F2A44] font-semibold leading-relaxed">
                    <span className="font-bold text-[#0F3D2E]">ℹ️ How it works:</span> When you click "Start with Countdown", 
                    all logged-in students in the selected batches will immediately see a 
                    full-screen countdown popup. The exam will automatically start when the 
                    countdown reaches zero.
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col md:flex-row gap-4 pt-8 border-t-2 border-[#0F3D2E]/20">
            <button
              onClick={() => handleCreateSession(false)}
              disabled={
                isCreating || 
                selectedBatches.length === 0 ||
                (testType === 'partial' && !partialSelectedTrack) ||
                (testType === 'mock' && (!mockTracks.listening || !mockTracks.reading || !mockTracks.writing))
              }
              className="flex-1 px-6 py-3 bg-[#0F3D2E] hover:bg-[#0F3D2E]/90 disabled:bg-slate-400 disabled:cursor-not-allowed text-white font-bold rounded-xl transition-all flex items-center justify-center gap-2 uppercase tracking-wider hover:scale-105 active:scale-95"
              data-testid="create-schedule-button"
            >
              {isCreating ? (
                <>
                  <Loader className="w-5 h-5 animate-spin" />
                  Creating...
                </>
              ) : (
                <>
                  <Calendar className="w-5 h-5" />
                  Create & Schedule
                </>
              )}
            </button>

            <button
              onClick={() => handleCreateSession(true, false)}
              disabled={
                isCreating || 
                selectedBatches.length === 0 ||
                activeExams.length > 0 ||
                useCountdown ||
                (testType === 'partial' && !partialSelectedTrack) ||
                (testType === 'mock' && (!mockTracks.listening || !mockTracks.reading || !mockTracks.writing))
              }
              className="flex-1 px-6 py-3 bg-emerald-600 hover:bg-emerald-700 disabled:bg-slate-400 disabled:cursor-not-allowed text-white font-bold rounded-xl transition-all flex items-center justify-center gap-2 uppercase tracking-wider hover:scale-105 active:scale-95"
              data-testid="create-start-button"
            >
              {isCreating ? (
                <>
                  <Loader className="w-5 h-5 animate-spin" />
                  Creating...
                </>
              ) : (
                <>
                  <Play className="w-5 h-5" />
                  Start Immediately
                </>
              )}
            </button>

            {/* PHASE 1: Start with Countdown Button */}
            {useCountdown && (
              <button
                onClick={() => handleCreateSession(true, true)}
                disabled={
                  isCreating || 
                  selectedBatches.length === 0 ||
                  activeExams.length > 0 ||
                  (testType === 'partial' && !partialSelectedTrack) ||
                  (testType === 'mock' && (!mockTracks.listening || !mockTracks.reading || !mockTracks.writing))
                }
                className="flex-1 px-6 py-3 bg-indigo-600 hover:bg-indigo-700 disabled:bg-slate-400 disabled:cursor-not-allowed text-white font-bold rounded-xl transition-all flex items-center justify-center gap-2 uppercase tracking-wider hover:scale-105 active:scale-95"
                data-testid="create-start-countdown-button"
              >
                {isCreating ? (
                  <>
                    <Loader className="w-5 h-5 animate-spin" />
                    Creating...
                  </>
                ) : (
                  <>
                    <Clock className="w-5 h-5" />
                    Start with Countdown ({Math.floor(countdownSeconds / 60)}:{(countdownSeconds % 60).toString().padStart(2, '0')})
                  </>
                )}
              </button>
            )}
          </div>

          {activeExams.length > 0 && (
            <div className="p-4 rounded-xl border-l-4 border-red-600 bg-red-50 text-red-700 font-semibold text-sm">
              ⚠️ Cannot start new exam - another exam is currently active
            </div>
          )}
        </div>
      </div>

      {/* Active Exam Sessions */}
      <div className="bg-white rounded-2xl shadow-lg border-2 border-[#0F3D2E]/20 p-8">
        <h2 className="text-2xl font-bold text-[#1F2A44] mb-6 flex items-center gap-2 uppercase tracking-wider">
          <div className="w-3 h-3 bg-emerald-500 rounded-full animate-pulse"></div>
          Active Exam Sessions
        </h2>

        {isLoadingSessions ? (
          <div className="text-center py-12">
            <Loader className="w-8 h-8 animate-spin mx-auto text-[#0F3D2E]" />
          </div>
        ) : activeExams.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-slate-600 font-medium">No active exams</p>
          </div>
        ) : (
          <div className="space-y-3">
            {activeExams.map((exam) => (
              <div
                key={exam.examCode}
                className="border border-green-200 bg-green-50 rounded-lg p-4 flex items-center justify-between"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3 flex-wrap">
                    <span className="font-mono font-bold text-emerald-700 text-lg">{exam.examCode}</span>
                    <span className="px-3 py-1 bg-emerald-100 text-emerald-700 text-xs font-bold rounded-full uppercase tracking-wider">ACTIVE</span>
                    {exam.testType && (
                      <span className={`px-3 py-1 text-xs font-bold rounded-full uppercase tracking-wider ${
                        exam.testType === 'mock' 
                          ? 'bg-indigo-100 text-indigo-700' 
                          : 'bg-blue-100 text-blue-700'
                      }`}>
                        {exam.testType === 'mock' ? 'MOCK TEST' : 'PARTIAL TEST'}
                      </span>
                    )}
                  </div>
                  <div className="space-y-2 text-sm text-slate-700 font-medium">
                    <p>
                      <FileText className="w-4 h-4 inline mr-2 text-[#0F3D2E]" />
                      {exam.trackName}
                    </p>
                    <p>
                      <Clock className="w-4 h-4 inline mr-2 text-[#0F3D2E]" />
                      Started: {format(new Date(exam.startedAt || exam.createdAt), 'MMM d, h:mm a')} • {exam.duration} mins
                    </p>
                    <p>
                      <Users className="w-4 h-4 inline mr-2 text-[#0F3D2E]" />
                      Batches: {exam.allowedBatches.join(', ')}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => handleStopExam(exam.examCode)}
                  className="px-5 py-2 bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl transition-all flex items-center gap-2 uppercase tracking-wider hover:scale-105 active:scale-95"
                >
                  <Square className="w-4 h-4" />
                  Stop Exam
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Scheduled Exams */}
      <div className="bg-white rounded-2xl shadow-lg border-2 border-[#0F3D2E]/20 p-8">
        <h2 className="text-2xl font-bold text-[#1F2A44] mb-6 flex items-center gap-2 uppercase tracking-wider">
          📅 Scheduled Exams
        </h2>

        {isLoadingSessions ? (
          <div className="text-center py-12">
            <Loader className="w-8 h-8 animate-spin mx-auto text-[#0F3D2E]" />
          </div>
        ) : scheduledExams.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-slate-600 font-medium">No scheduled exams</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-[#F5F3EF] border-b-2 border-[#0F3D2E]/20">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-bold text-[#1F2A44] uppercase tracking-wider">Exam Code</th>
                  <th className="px-4 py-3 text-left text-xs font-bold text-[#1F2A44] uppercase tracking-wider">Track</th>
                  <th className="px-4 py-3 text-left text-xs font-bold text-[#1F2A44] uppercase tracking-wider">Date & Time</th>
                  <th className="px-4 py-3 text-left text-xs font-bold text-[#1F2A44] uppercase tracking-wider">Batches</th>
                  <th className="px-4 py-3 text-left text-xs font-bold text-[#1F2A44] uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#0F3D2E]/10">
                {scheduledExams.map((exam) => (
                  <tr key={exam.examCode} className="hover:bg-[#F5F3EF] transition-colors">
                    <td className="px-4 py-3">
                      <div className="flex flex-col gap-2">
                        <span className="font-mono font-bold text-[#0F3D2E]">{exam.examCode}</span>
                        {exam.testType && (
                          <span className={`inline-block px-2 py-0.5 text-xs font-bold rounded-full w-fit uppercase tracking-wider ${
                            exam.testType === 'mock' 
                              ? 'bg-indigo-100 text-indigo-700' 
                              : 'bg-blue-100 text-blue-700'
                          }`}>
                            {exam.testType === 'mock' ? 'Mock' : 'Partial'}
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-4 py-3 text-sm font-semibold text-slate-700">{exam.trackName}</td>
                    <td className="px-4 py-3 text-sm text-slate-700 font-medium">
                      {format(new Date(exam.date), 'MMM d, yyyy')} • {exam.startTime}
                    </td>
                    <td className="px-4 py-3 text-sm text-slate-700 font-medium">
                      {exam.allowedBatches.length} batch{exam.allowedBatches.length > 1 ? 'es' : ''}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleStartExam(exam.examCode)}
                          disabled={activeExams.length > 0}
                          className="px-3 py-1 bg-emerald-600 hover:bg-emerald-700 disabled:bg-slate-400 disabled:cursor-not-allowed text-white text-xs font-bold rounded-lg transition-colors uppercase tracking-wider"
                          title={activeExams.length > 0 ? 'Another exam is active' : 'Start exam'}
                        >
                          Start
                        </button>
                        <button
                          onClick={() => handleDeleteSession(exam.examCode)}
                          className="px-3 py-1 bg-red-600 hover:bg-red-700 text-white text-xs font-bold rounded-lg transition-colors uppercase tracking-wider"
                          title="Delete exam"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Completed Exams */}
      <div className="bg-white rounded-2xl shadow-lg border-2 border-[#0F3D2E]/20 p-8">
        <h2 className="text-2xl font-bold text-[#1F2A44] mb-6 flex items-center gap-2 uppercase tracking-wider">
          ✅ Recently Completed Exams
        </h2>

        {isLoadingSessions ? (
          <div className="text-center py-12">
            <Loader className="w-8 h-8 animate-spin mx-auto text-[#0F3D2E]" />
          </div>
        ) : completedExams.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-slate-600 font-medium">No completed exams</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-[#F5F3EF] border-b-2 border-[#0F3D2E]/20">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-bold text-[#1F2A44] uppercase tracking-wider">Exam Code</th>
                  <th className="px-4 py-3 text-left text-xs font-bold text-[#1F2A44] uppercase tracking-wider">Track</th>
                  <th className="px-4 py-3 text-left text-xs font-bold text-[#1F2A44] uppercase tracking-wider">Date</th>
                  <th className="px-4 py-3 text-left text-xs font-bold text-[#1F2A44] uppercase tracking-wider">Submissions</th>
                  <th className="px-4 py-3 text-left text-xs font-bold text-[#1F2A44] uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#0F3D2E]/10">
                {completedExams.map((exam) => (
                  <tr key={exam.examCode} className="hover:bg-[#F5F3EF] transition-colors">
                    <td className="px-4 py-3">
                      <div className="flex flex-col gap-2">
                        <span className="font-mono font-bold text-[#0F3D2E]">{exam.examCode}</span>
                        {exam.testType && (
                          <span className={`inline-block px-2 py-0.5 text-xs font-bold rounded-full w-fit uppercase tracking-wider ${
                            exam.testType === 'mock' 
                              ? 'bg-indigo-100 text-indigo-700' 
                              : 'bg-blue-100 text-blue-700'
                          }`}>
                            {exam.testType === 'mock' ? 'Mock' : 'Partial'}
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-4 py-3 text-sm font-semibold text-slate-700">{exam.trackName}</td>
                    <td className="px-4 py-3 text-sm text-slate-700 font-medium">
                      {format(new Date(exam.date), 'MMM d, yyyy')}
                    </td>
                    <td className="px-4 py-3 text-sm text-slate-700 font-medium">
                      {exam.totalSubmissions} total • {exam.gradedResults} graded
                    </td>
                    <td className="px-4 py-3">
                      <button
                        onClick={() => {
                          navigate(`/admin/submissions?examCode=${exam.examCode}`);
                        }}
                        className="px-3 py-1 bg-[#0F3D2E] hover:bg-[#0F3D2E]/90 text-white text-xs font-bold rounded-lg transition-colors flex items-center gap-1 uppercase tracking-wider"
                        data-testid={`view-submissions-${exam.examCode}`}
                      >
                        <Eye className="w-4 h-4" />
                        View
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
