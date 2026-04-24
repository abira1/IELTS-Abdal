import React from 'react';
import { AlertCircle, ArrowLeft, LogIn, Clock, Calendar } from 'lucide-react';

interface LateEntryModalProps {
  examName: string;
  examCode: string;
  startTime: string;
  originalDuration: number;
  remainingMinutes: number;
  onGoBack: () => void;
  onEnterExam: () => void;
}

export function LateEntryModal({
  examName,
  examCode,
  startTime,
  originalDuration,
  remainingMinutes,
  onGoBack,
  onEnterExam
}: LateEntryModalProps) {
  const formatTime = (isoString: string) => {
    const date = new Date(isoString);
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
  };

  const formatDate = (isoString: string) => {
    const date = new Date(isoString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const timePercentage = Math.max(0, (remainingMinutes / originalDuration) * 100);

  return (
    <div 
      className="fixed inset-0 bg-midnight-900/60 backdrop-blur-sm z-[10000] flex items-center justify-center p-4"
      data-testid="late-entry-modal"
    >
      <div className="bg-white rounded-zen shadow-zen-xl max-w-lg w-full overflow-hidden animate-fadeIn max-h-[95vh] flex flex-col border border-slate-100">
        {/* Header with Warning */}
        <div className="bg-amber-50 p-6 border-b border-amber-100">
          <div className="flex items-center gap-4">
            <div className="bg-amber-100 rounded-2xl p-3 flex-shrink-0">
              <AlertCircle className="w-6 h-6 text-amber-600" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-amber-900">Exam In Progress</h2>
              <p className="text-amber-700 text-sm mt-0.5 font-medium">This exam has already started</p>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 md:p-8 overflow-y-auto">
          {/* Exam Information */}
          <div className="mb-6">
            <h3 className="text-xl font-bold text-midnight-900 mb-1">{examName}</h3>
            <p className="text-sm text-slate-500 font-medium">Exam Code: <span className="font-mono text-midnight-600 bg-slate-50 px-2 py-0.5 rounded ml-1">{examCode}</span></p>
          </div>

          {/* Time Information Grid */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            {/* Started At */}
            <div className="bg-slate-50 border border-slate-100 rounded-2xl p-4">
              <div className="flex items-center gap-2 mb-2">
                <Calendar className="w-4 h-4 text-midnight-400" />
                <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Started At</h4>
              </div>
              <p className="text-xs text-slate-600 font-medium mb-0.5">{formatDate(startTime)}</p>
              <p className="text-lg font-bold text-midnight-900">{formatTime(startTime)}</p>
            </div>

            {/* Duration Info */}
            <div className="bg-slate-50 border border-slate-100 rounded-2xl p-4">
              <div className="flex items-center gap-2 mb-2">
                <Clock className="w-4 h-4 text-midnight-400" />
                <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Duration</h4>
              </div>
              <p className="text-lg font-bold text-midnight-900">
                {originalDuration} min
              </p>
              <p className="text-xs text-slate-600 font-medium">Original Length</p>
            </div>
          </div>

          {/* Remaining Time Warning */}
          <div className="bg-amber-50/50 border border-amber-200 rounded-2xl p-5 mb-6 text-center">
            <h3 className="text-lg font-bold text-amber-900 mb-1">
              Time Remaining
            </h3>
            <div className="text-4xl font-black text-amber-600 mb-1">
              {remainingMinutes} <span className="text-lg font-bold">min</span>
            </div>
            <p className="text-xs text-amber-700/80 font-medium mb-4">
              ({Math.floor(timePercentage)}% of original time)
            </p>

            {/* Progress Bar */}
            <div className="w-full bg-amber-100 rounded-full h-2.5 overflow-hidden">
              <div
                className={`h-full rounded-full transition-all duration-500 ${
                  timePercentage > 50
                    ? 'bg-emerald-500'
                    : timePercentage > 25
                    ? 'bg-amber-500'
                    : 'bg-red-500'
                }`}
                style={{ width: `${timePercentage}%` }}
              />
            </div>
          </div>

          {/* Important Notice */}
          <div className="bg-amber-50 border-l-4 border-amber-400 p-4 mb-8 rounded-r-2xl">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
              <div className="text-sm text-amber-900 font-medium space-y-2">
                <p className="font-bold">Important Notice:</p>
                <ul className="list-disc list-inside text-amber-800 space-y-1 ml-1 opacity-90">
                  <li>You will only receive the <strong>remaining {remainingMinutes} minutes</strong></li>
                  <li>All students must finish at the same time</li>
                  <li>Auto-submitted when time expires</li>
                  <li>You cannot pause or extend your time</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={onGoBack}
              className="flex-1 btn-ghost justify-center py-3.5"
              data-testid="late-entry-go-back-button"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Go Back</span>
            </button>

            <button
              onClick={onEnterExam}
              className="flex-1 bg-amber-500 text-white font-semibold px-6 py-3.5 rounded-2xl hover:bg-amber-600 active:bg-amber-700 transition-all duration-200 shadow-zen flex items-center justify-center gap-2"
              data-testid="late-entry-enter-exam-button"
            >
              <LogIn className="w-4 h-4" />
              <span>Enter Exam</span>
            </button>
          </div>

          {/* Bottom Note */}
          <p className="text-center text-xs font-medium text-slate-400 mt-5">
            By clicking "Enter Exam", you acknowledge the time limitations.
          </p>
        </div>
      </div>
    </div>
  );
}
