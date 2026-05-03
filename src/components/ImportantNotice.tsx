import { AlertCircle, ChevronRight } from 'lucide-react';

interface ImportantNoticeProps {
  onAccept: () => void;
}

export function ImportantNotice({ onAccept }: ImportantNoticeProps) {
  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full bg-white rounded-zen shadow-zen border border-slate-100 overflow-hidden">
        {/* Header */}
        <div className="bg-amber-50 px-6 py-6 md:px-8 md:py-8 border-b border-amber-100">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-amber-100 rounded-2xl flex items-center justify-center flex-shrink-0">
              <AlertCircle className="w-6 h-6 text-amber-600" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-amber-900">Important Notice</h1>
              <p className="text-amber-700 text-sm mt-1 font-medium">Please read carefully before continuing</p>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 md:p-8 space-y-6">
          <div className="bg-amber-50/50 border-l-4 border-amber-400 rounded-r-2xl p-5">
            <p className="text-slate-700 text-sm md:text-base leading-relaxed">
              This is a <span className="font-semibold text-amber-700">simulated IELTS practice test</span> and not an official IELTS examination.
            </p>
          </div>

          <div className="bg-blue-50 border-l-4 border-blue-400 rounded-r-2xl p-5">
            <p className="text-slate-700 text-sm md:text-base leading-relaxed">
              The band score provided at the end of this test is an <span className="font-semibold text-blue-700">estimated score only</span> and does not guarantee the same result in the official IELTS exam.
            </p>
          </div>

          <div className="bg-slate-50 rounded-2xl p-5 border border-slate-100">
            <p className="text-slate-600 text-sm font-medium">
              By continuing, you acknowledge and accept these conditions.
            </p>
          </div>

          {/* Accept Button */}
          <div className="pt-4">
            <button
              onClick={onAccept}
              data-testid="accept-continue-button"
              className="btn-forest w-full py-4 text-lg"
            >
              <span>Accept & Continue</span>
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-slate-50 px-6 py-4 border-t border-slate-100">
          <p className="text-center text-xs font-medium text-slate-500">
            IELTS Abdal - Practice Test Platform
          </p>
        </div>
      </div>
    </div>
  );
}
