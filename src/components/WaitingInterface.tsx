import { useEffect, useState } from 'react';
import { Loader, Volume2, BookOpen, FileText, CheckSquare, Edit3, Clock } from 'lucide-react';
import { getDatabase, ref, get } from 'firebase/database';
import { app } from '../firebase';

interface WaitingInterfaceProps {
  studentName: string;
  studentId: string;
  examName: string;
  onCountdownComplete: () => void;
}

export function WaitingInterface({
  studentName,
  studentId,
  examName,
  onCountdownComplete
}: WaitingInterfaceProps) {
  const [countdown, setCountdown] = useState<number | null>(null);
  const [isWaiting, setIsWaiting] = useState(true);
  const [hasStartedCountdown, setHasStartedCountdown] = useState(false);
  const [waitMessage, setWaitMessage] = useState('Waiting for the instructor to start...');
  const [examEndTime, setExamEndTime] = useState<number | null>(null);
  const [remainingSeconds, setRemainingSeconds] = useState<number | null>(null);
  const [examDurationMinutes, setExamDurationMinutes] = useState<number | null>(null);
  const [currentExamName, setCurrentExamName] = useState<string>(examName);

  // Listen for exam start signal from Firebase
  useEffect(() => {
    // Only check once if we haven't started counting down
    if (hasStartedCountdown) return;

    const db = getDatabase(app);
    const checkExamStart = setInterval(async () => {
      try {
        const snapshot = await get(ref(db, 'exam/status'));
        
        if (snapshot.exists()) {
          const data = snapshot.val();
          console.log('WaitingInterface - Firebase exam status:', data);
          
          // Update exam name if available
          if (data.trackName) {
            setCurrentExamName(data.trackName);
          }
          
          if (data.isStarted === true) {
            console.log('WaitingInterface - Exam started detected!');
            const now = Date.now();

            // If a startTime is provided, respect it (may be in future)
            if (data.startTime) {
              const startTime = new Date(data.startTime).getTime();
              if (now < startTime) {
                // Too early - show waiting message with time and duration (if available)
                const startLabel = new Date(data.startTime).toLocaleTimeString();
                if (data.durationMinutes) setExamDurationMinutes(Number(data.durationMinutes));
                setWaitMessage(`Exam will start at ${startLabel}. Please wait...`);
                return;
              }
            }

            // If endTime provided, compute remaining seconds and duration
            if (data.endTime) {
              const endTime = new Date(data.endTime).getTime();
              setExamEndTime(endTime);
              const remaining = Math.max(0, Math.floor((endTime - now) / 1000));
              setRemainingSeconds(remaining);
              if (data.durationMinutes) setExamDurationMinutes(Number(data.durationMinutes));
              else if (data.startTime) {
                const start = new Date(data.startTime).getTime();
                setExamDurationMinutes(Math.max(0, Math.round((endTime - start) / 60000)));
              }

              if (now >= endTime) {
                setWaitMessage('Exam has ended. You can no longer take this exam.');
                return;
              }
            }

            // Exam is ready to start immediately
            setIsWaiting(false);
            setHasStartedCountdown(true);
            setCountdown(5); // Start at 5
          }
        }
      } catch (error) {
        console.error('Error checking exam status:', error);
      }
    }, 500);

    return () => clearInterval(checkExamStart);
  }, [hasStartedCountdown]);

  // Handle countdown - separate from the exam start check
  useEffect(() => {
    if (countdown === null || !hasStartedCountdown) return;

    if (countdown === 0) {
      // Countdown complete, start exam
      onCountdownComplete();
      return;
    }

    const timer = setTimeout(() => {
      setCountdown(countdown - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [countdown, hasStartedCountdown, onCountdownComplete]);

  // Tick remaining exam seconds while waiting / during countdown
  useEffect(() => {
    if (remainingSeconds === null) return;

    if (remainingSeconds <= 0) {
      setRemainingSeconds(0);
      setWaitMessage('Exam has ended. You can no longer take this exam.');
      return;
    }

    const interval = setInterval(() => {
      setRemainingSeconds((s) => {
        if (s === null) return null;
        if (s <= 1) {
          clearInterval(interval);
          return 0;
        }
        return s - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [remainingSeconds]);

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Floating Books */}
        <div className="absolute top-20 left-10 animate-float" style={{ animationDelay: '0s', animationDuration: '6s' }}>
          <BookOpen className="w-12 h-12 text-forest-200 opacity-20" />
        </div>
        <div className="absolute top-40 right-20 animate-float" style={{ animationDelay: '2s', animationDuration: '7s' }}>
          <FileText className="w-16 h-16 text-midnight-200 opacity-10" />
        </div>
        <div className="absolute bottom-32 left-1/4 animate-float" style={{ animationDelay: '1s', animationDuration: '8s' }}>
          <Edit3 className="w-10 h-10 text-forest-300 opacity-20" />
        </div>
        <div className="absolute bottom-20 right-1/3 animate-float" style={{ animationDelay: '3s', animationDuration: '9s' }}>
          <CheckSquare className="w-8 h-8 text-midnight-300 opacity-15" />
        </div>
      </div>

      <div className="max-w-md w-full relative z-10">
        <div className="bg-white rounded-zen shadow-zen p-6 md:p-8 border border-slate-100">
          {isWaiting ? (
            <>
              {/* Waiting State */}
              <div className="text-center space-y-6">
                {/* Animated Illustration Area */}
                <div className="flex justify-center relative">
                  <div className="relative w-32 h-32">
                    {/* Outer rotating circle */}
                    <div className="absolute inset-0 border-4 border-transparent border-t-forest-400 border-r-forest-300 rounded-full animate-spin" style={{ animationDuration: '3s' }}></div>
                    <div
                      className="absolute inset-2 border-4 border-transparent border-b-midnight-400 border-l-midnight-300 rounded-full animate-spin"
                      style={{ animationDirection: 'reverse', animationDuration: '4s' }}
                    ></div>
                    
                    {/* Center animated illustration */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="relative">
                        {/* Pulsing background */}
                        <div className="absolute inset-0 bg-forest-50 rounded-full animate-pulse blur-xl"></div>
                        {/* Main icon */}
                        <div className="relative bg-forest-600 p-4 rounded-2xl shadow-sm transform hover:scale-105 transition-transform">
                          <FileText className="w-8 h-8 text-white animate-pulse" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="inline-flex items-center justify-center gap-1.5 px-3 py-1 bg-slate-50 rounded-full border border-slate-200">
                    <Clock className="w-3.5 h-3.5 text-forest-600 animate-pulse" />
                    <span className="text-xs font-semibold text-midnight-800">Please Wait</span>
                  </div>
                  
                  <h1 className="text-2xl font-bold text-midnight-900 mb-1">
                    Ready for Your Exam?
                  </h1>
                  
                  <p className="text-slate-600 text-sm font-medium">
                    {waitMessage}
                  </p>
                </div>

                {/* Student Info Card */}
                <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200">
                  <div className="text-left space-y-3">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-midnight-100 rounded-lg flex items-center justify-center">
                        <span className="text-midnight-600 font-bold text-sm">👤</span>
                      </div>
                      <div className="flex-1">
                        <div className="text-[10px] uppercase tracking-wider text-slate-500 mb-0.5">Student Name</div>
                        <div className="font-bold text-midnight-900 text-sm">{studentName}</div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-forest-50 rounded-lg flex items-center justify-center">
                        <span className="text-forest-600 font-bold text-sm">🎫</span>
                      </div>
                      <div className="flex-1">
                        <div className="text-[10px] uppercase tracking-wider text-slate-500 mb-0.5">Student ID</div>
                        <div className="font-bold text-midnight-900 font-mono text-sm">{studentId}</div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-slate-200 rounded-lg flex items-center justify-center">
                        <FileText className="w-4 h-4 text-midnight-600" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-[10px] uppercase tracking-wider text-slate-500 mb-0.5">Exam</div>
                        <div className="font-bold text-midnight-900 text-sm truncate" title={currentExamName}>{currentExamName}</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Show duration if available */}
                {examDurationMinutes !== null && (
                  <div className="inline-flex items-center gap-2 px-4 py-2 bg-amber-50 rounded-xl border border-amber-200">
                    <Clock className="w-4 h-4 text-amber-600" />
                    <span className="text-xs text-amber-900 font-medium">
                      Duration: {examDurationMinutes} min
                    </span>
                  </div>
                )}

                {/* Enhanced Waiting Animation */}
                <div className="flex justify-center items-center gap-1.5 pt-2">
                  <div className="w-2 h-2 bg-forest-400 rounded-full animate-bounce" style={{ animationDelay: '0s' }}></div>
                  <div className="w-2 h-2 bg-midnight-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                </div>
              </div>
            </>
          ) : (
            <>
              {/* Enhanced Countdown State */}
              <div className="text-center space-y-6">
                {/* Countdown Circle Animation */}
                <div className="flex justify-center">
                  <div className="relative w-40 h-40">
                    {/* Animated rings */}
                    <div className="absolute inset-0 border-4 border-slate-100 rounded-full"></div>
                    <div 
                      className="absolute inset-0 border-4 border-transparent border-t-forest-500 rounded-full animate-spin" 
                      style={{ animationDuration: '1s' }}
                    ></div>
                    <div 
                      className="absolute inset-2 border-4 border-transparent border-t-midnight-500 rounded-full animate-spin" 
                      style={{ animationDirection: 'reverse', animationDuration: '1.5s' }}
                    ></div>
                    
                    {/* Countdown number */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center">
                        <div className="text-6xl font-black text-midnight-900 animate-pulse">
                          {countdown}
                        </div>
                        <div className="text-xs font-bold text-slate-500 mt-1 uppercase tracking-wider">
                          seconds
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="inline-flex items-center justify-center gap-1.5 px-4 py-1.5 bg-forest-600 rounded-full shadow-sm animate-pulse">
                    <CheckSquare className="w-4 h-4 text-white" />
                    <span className="text-white text-xs font-bold uppercase tracking-wider">Get Ready</span>
                  </div>
                  
                  <h2 className="text-2xl font-bold text-midnight-900 mb-1">
                    Starting Soon!
                  </h2>
                  
                  <p className="text-slate-600 text-sm">
                    Exam begins in <span className="font-bold text-forest-600">{countdown}</span> s
                  </p>
                  
                  {remainingSeconds !== null && (
                    <div className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-50 rounded-lg border border-slate-200 mt-2">
                      <Clock className="w-3.5 h-3.5 text-midnight-600" />
                      <span className="text-xs text-midnight-800 font-medium">
                        Time: {String(Math.floor(remainingSeconds / 60)).padStart(2, '0')}:{String(remainingSeconds % 60).padStart(2, '0')}
                      </span>
                    </div>
                  )}
                </div>

                {/* Audio notification */}
                <div className="bg-slate-50 rounded-xl p-3 border border-slate-200 flex items-center justify-center gap-2">
                  <Volume2 className="w-4 h-4 text-forest-600 animate-pulse" />
                  <span className="text-xs font-medium text-midnight-800">
                    Audio plays automatically
                  </span>
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Add custom animation styles */}
      <style>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0px) rotate(0deg);
          }
          50% {
            transform: translateY(-10px) rotate(5deg);
          }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}
