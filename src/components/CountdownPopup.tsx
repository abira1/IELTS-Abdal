import { useEffect, useState } from 'react';
import { Clock, BookOpen, Loader } from 'lucide-react';
import { getDatabase, ref, onValue } from 'firebase/database';
import { app } from '../firebase';

interface CountdownPopupProps {
  examCode: string;
  trackName: string;
  countdownStartTime: string;
  countdownSeconds: number;
  onComplete: () => void;
}

export function CountdownPopup({ 
  examCode, 
  trackName, 
  countdownStartTime, 
  countdownSeconds,
  onComplete 
}: CountdownPopupProps) {
  const [timeRemaining, setTimeRemaining] = useState<number>(countdownSeconds);
  const [isComplete, setIsComplete] = useState(false);
  const [isWaitingForExam, setIsWaitingForExam] = useState(false);

  useEffect(() => {
    // Calculate actual remaining time based on server start time
    const startTime = new Date(countdownStartTime).getTime();
    const now = Date.now();
    const elapsed = Math.floor((now - startTime) / 1000);
    const remaining = Math.max(0, countdownSeconds - elapsed);
    
    setTimeRemaining(remaining);

    // If already complete, wait for exam to be active
    if (remaining <= 0) {
      setIsComplete(true);
      setIsWaitingForExam(true);
      // Don't call onComplete yet - wait for exam status
      return;
    }

    // Update countdown every second
    const interval = setInterval(() => {
      setTimeRemaining(prev => {
        const newValue = prev - 1;
        
        if (newValue <= 0) {
          clearInterval(interval);
          setIsComplete(true);
          setIsWaitingForExam(true);
          // Don't call onComplete yet - will be triggered by exam status listener
          return 0;
        }
        
        return newValue;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [countdownStartTime, countdownSeconds]);

  // NEW: Listen for exam status to become active before redirecting
  useEffect(() => {
    if (!isWaitingForExam) return;

    console.log('🔄 Countdown complete, awaiting exam activation with 3-second fallback...');
    const db = getDatabase(app);
    const examStatusRef = ref(db, 'exam/status');
    
    // ✅ START FALLBACK TIMER: Redirect after 3 seconds if real-time update is delayed
    let fallbackTimer: NodeJS.Timeout | null = null;
    fallbackTimer = setTimeout(() => {
      console.log('⏳ Real-time update delayed (>3s), using fallback redirect');
      fallbackTimer = null;
      onComplete();
    }, 3000);

    const unsubscribe = onValue(examStatusRef, (snapshot) => {
      if (snapshot.exists()) {
        const status = snapshot.val();
        console.log('📡 Exam status update:', status);
        
        // Check if exam is started and matches our exam code
        if (status.isStarted && status.examCode === examCode) {
          console.log('✅ Exam activated via real-time update (faster than fallback)');
          // Cancel fallback timer since we got the real-time update
          if (fallbackTimer) {
            clearTimeout(fallbackTimer);
            fallbackTimer = null;
          }
          // Give a brief moment for UI feedback, then redirect
          setTimeout(() => {
            onComplete();
          }, 500);
          unsubscribe(); // Stop listening
        }
      }
    }, (error) => {
      console.error('❌ Error listening to exam status:', error);
      // Cancel existing fallback timer and use immediate fallback
      if (fallbackTimer) {
        clearTimeout(fallbackTimer);
        fallbackTimer = null;
      }
      console.log('⚠️ Error occurred, using immediate fallback redirect...');
      onComplete();
    });

    // Cleanup: Clear timer and listener on unmount
    return () => {
      if (fallbackTimer) {
        clearTimeout(fallbackTimer);
      }
      unsubscribe();
    };
  }, [isWaitingForExam, examCode, onComplete]);

  // Format time as MM:SS
  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div 
      className="fixed inset-0 bg-midnight-900/95 backdrop-blur-md flex items-center justify-center z-[9999] p-4"
      data-testid="countdown-popup"
    >
      {/* Animated background pattern */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-forest-600 rounded-full filter blur-[100px] animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-midnight-500 rounded-full filter blur-[100px] animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center max-w-sm w-full bg-midnight-800 border border-midnight-700 rounded-zen shadow-2xl p-6 md:p-8">
        {/* Icon */}
        <div className="mb-6 flex justify-center">
          <div className="w-16 h-16 bg-midnight-700 rounded-2xl flex items-center justify-center border border-midnight-600 shadow-inner">
            <Clock className="w-8 h-8 text-forest-400 animate-pulse" />
          </div>
        </div>

        {/* Title */}
        <h1 className="text-xl md:text-2xl font-bold text-white mb-6 animate-fade-in">
          {isComplete ? 'Starting Now!' : 'Exam starting in'}
        </h1>

        {/* Countdown Timer */}
        <div className="mb-6">
          <div className={`inline-block bg-midnight-900 rounded-2xl px-6 py-4 border border-midnight-700 shadow-inner ${
            isComplete ? 'animate-bounce' : ''
          }`}>
            <div 
              className={`text-5xl md:text-6xl font-black text-white font-mono tracking-wider transition-all duration-300 ${
                timeRemaining <= 10 && !isComplete ? 'text-amber-400 animate-pulse' : ''
              }`}
              data-testid="countdown-timer"
            >
              {isComplete ? '🚀' : formatTime(timeRemaining)}
            </div>
          </div>
        </div>

        {/* Exam Details */}
        <div className="bg-midnight-700/50 rounded-xl p-4 border border-midnight-600 mb-6">
          <div className="flex items-center justify-center gap-2 mb-1">
            <BookOpen className="w-4 h-4 text-forest-400 flex-shrink-0" />
            <p className="text-base font-semibold text-white truncate max-w-[200px]" title={trackName}>{trackName}</p>
          </div>
          <p className="text-xs text-slate-400 font-mono truncate">{examCode}</p>
        </div>

        {/* Message */}
        {!isComplete ? (
          <div className="space-y-1.5 animate-fade-in">
            <p className="text-sm text-slate-300">
              Please wait for automatic redirect
            </p>
            <p className="text-xs text-slate-500">
              Ensure stable internet connection
            </p>
          </div>
        ) : isWaitingForExam ? (
          <div className="space-y-2 animate-fade-in">
            <div className="flex items-center justify-center gap-2">
              <Loader className="w-4 h-4 text-forest-400 animate-spin" />
              <p className="text-sm text-forest-400 font-semibold">
                Starting exam...
              </p>
            </div>
            <p className="text-xs text-slate-400">
              Preparing interface...
            </p>
          </div>
        ) : (
          <div className="space-y-2 animate-fade-in">
            <p className="text-sm text-forest-400 font-semibold">
              ✨ Redirecting...
            </p>
          </div>
        )}

        {/* Progress Bar */}
        {!isComplete && (
          <div className="mt-6">
            <div className="w-full bg-midnight-900 rounded-full h-1.5 overflow-hidden">
              <div 
                className="bg-forest-500 h-full transition-all duration-1000 ease-linear"
                style={{ 
                  width: `${((countdownSeconds - timeRemaining) / countdownSeconds) * 100}%` 
                }}
              ></div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
