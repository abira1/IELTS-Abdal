import { useNavigate } from 'react-router-dom';
import { GraduationCap, ShieldCheck, ArrowRight, Mail } from 'lucide-react';

const LOGO_URL = 'https://i.postimg.cc/KjT16m5R/logo.png';

export function NewHomePage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-porcelain flex items-center justify-center p-2 sm:p-3 md:p-6 relative overflow-hidden">
      {/* Decorative Background Elements - Responsive */}
      <div className="absolute top-0 left-0 w-[350px] h-[350px] sm:w-[500px] sm:h-[500px] bg-gradient-to-br from-forest-100/40 to-transparent rounded-full -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-[280px] h-[280px] sm:w-[400px] sm:h-[400px] bg-gradient-to-tl from-midnight-100/30 to-transparent rounded-full translate-x-1/3 translate-y-1/3" />
      <div className="absolute top-1/2 right-1/4 w-44 h-44 sm:w-64 sm:h-64 bg-emerald-50/50 rounded-full blur-3xl" />

      <div className="max-w-4xl w-full relative z-10">
        {/* Logo & Title */}
        <div className="text-center mb-5 sm:mb-7 md:mb-10 animate-fadeInUp">
          <div className="flex items-center justify-center mb-3 sm:mb-4 md:mb-6">
            <img 
              src={LOGO_URL}
              alt="IELTS Abdal" 
              className="h-16 sm:h-20 md:h-32 w-auto object-contain drop-shadow-lg"
            />
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-5xl font-bold text-midnight-800 mb-2 sm:mb-3 tracking-tight">
            IELTS Abdal
          </h1>
          <div className="inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1 sm:py-1.5 bg-forest-50 rounded-full mb-2 sm:mb-4">
            <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-forest-500 rounded-full animate-pulse2" />
            <span className="text-forest-700 text-xs sm:text-sm font-semibold">Examination System</span>
          </div>
          <p className="text-slate-500 text-xs sm:text-base md:text-lg max-w-md mx-auto px-2">
            Select your login portal to continue
          </p>
        </div>

        {/* Portal Cards */}
        <div className="grid md:grid-cols-2 gap-3 sm:gap-4 md:gap-6 mb-4 sm:mb-6 md:mb-8">
          {/* Student Portal */}
          <button
            onClick={() => navigate('/student/login')}
            className="zen-card zen-card-hover text-left group animate-fadeInUp stagger-1 md:col-span-2 md:max-w-md md:mx-auto !p-4 sm:!p-6"
            style={{ animationFillMode: 'both' }}
            data-testid="student-portal-card"
          >
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-forest-500 to-emerald-600 rounded-zen flex items-center justify-center mb-3 sm:mb-4 md:mb-5 shadow-lg group-hover:shadow-xl transition-shadow">
                <GraduationCap className="w-8 sm:w-10 h-8 sm:h-10 text-white" />
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-midnight-800 mb-1.5 sm:mb-2">
                Student Portal
              </h3>
              <p className="text-slate-500 text-xs sm:text-sm mb-4 sm:mb-6 max-w-[280px] px-1">
                Access your dashboard, take exams, and view your results
              </p>
              <div
                className="w-full btn-forest group-hover:shadow-lg transition-all text-sm sm:text-base"
                data-testid="student-login-button"
              >
                Student Login
                <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </button>

          {/* Staff Portal - Compact Version */}
          <button
            onClick={() => navigate('/staff/login')}
            className="zen-card zen-card-hover text-left group animate-fadeInUp stagger-2 hidden"
            style={{ animationFillMode: 'both' }}
            data-testid="staff-portal-card"
          >
            <div className="flex flex-col items-center text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-midnight-700 to-midnight-900 rounded-zen flex items-center justify-center mb-5 shadow-lg group-hover:shadow-xl transition-shadow">
                <ShieldCheck className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-xl font-bold text-midnight-800 mb-2">
                Staff Portal
              </h3>
              <p className="text-slate-500 text-sm mb-6 max-w-[240px]">
                Admin & Teacher access for exam management
              </p>
              <div
                className="w-full btn-midnight group-hover:shadow-lg transition-all"
                data-testid="staff-login-button"
              >
                Staff Login
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </button>
        </div>

        {/* Staff Login Link - Subtle Option */}
        <div className="text-center mb-4 sm:mb-6 md:mb-8 animate-fadeInUp stagger-3" style={{ animationFillMode: 'both' }}>
          <p className="text-xs md:text-sm text-slate-600 px-2">
            Are you a staff member?{' '}
            <button
              onClick={() => navigate('/staff/login')}
              className="text-forest-600 hover:text-forest-700 font-semibold transition-colors underline whitespace-nowrap"
            >
              Click here
            </button>
          </p>
        </div>

        {/* Help Box */}
        <div className="zen-card !p-3 sm:!p-4 md:!p-5 animate-fadeInUp stagger-4" style={{ animationFillMode: 'both' }}>
          <div className="flex items-start gap-2 sm:gap-3">
            <div className="w-7 h-7 sm:w-9 sm:h-9 rounded-lg sm:rounded-xl bg-blue-50 flex items-center justify-center flex-shrink-0">
              <Mail className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-blue-600" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-midnight-800 text-xs sm:text-sm mb-0.5 sm:mb-1">Need help?</p>
              <p className="text-slate-500 text-xs sm:text-sm break-words">
                For support or account issues, contact: <span className="font-bold text-midnight-800 block sm:inline">abdal.ieltsacademy@gmail.com</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
