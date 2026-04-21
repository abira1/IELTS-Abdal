import { useNavigate } from 'react-router-dom';
import { GraduationCap, ShieldCheck, ArrowRight, Mail } from 'lucide-react';

const LOGO_URL = 'https://i.postimg.cc/G3Gjq60p/IELTS-ABDAL-LOGO-PNG.png';

export function NewHomePage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-porcelain flex items-center justify-center p-4 md:p-6 relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-gradient-to-br from-forest-100/40 to-transparent rounded-full -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-gradient-to-tl from-midnight-100/30 to-transparent rounded-full translate-x-1/3 translate-y-1/3" />
      <div className="absolute top-1/2 right-1/4 w-64 h-64 bg-emerald-50/50 rounded-full blur-3xl" />

      <div className="max-w-4xl w-full relative z-10">
        {/* Logo & Title */}
        <div className="text-center mb-10 animate-fadeInUp">
          <div className="flex items-center justify-center mb-6">
            <img 
              src={LOGO_URL}
              alt="Abdal IELTS Academy" 
              className="h-24 md:h-32 w-auto object-contain drop-shadow-lg"
            />
          </div>
          <h1 className="text-3xl md:text-5xl font-bold text-midnight-800 mb-3 tracking-tight">
            Abdal IELTS Academy
          </h1>
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-forest-50 rounded-full mb-4">
            <div className="w-2 h-2 bg-forest-500 rounded-full animate-pulse2" />
            <span className="text-forest-700 text-sm font-semibold">Examination System</span>
          </div>
          <p className="text-slate-500 text-base md:text-lg max-w-md mx-auto">
            Select your login portal to continue
          </p>
        </div>

        {/* Portal Cards */}
        <div className="grid md:grid-cols-2 gap-5 md:gap-6 mb-6">
          {/* Student Portal */}
          <button
            onClick={() => navigate('/student/login')}
            className="zen-card zen-card-hover text-left group animate-fadeInUp stagger-1"
            style={{ animationFillMode: 'both' }}
            data-testid="student-portal-card"
          >
            <div className="flex flex-col items-center text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-forest-500 to-emerald-600 rounded-zen flex items-center justify-center mb-5 shadow-lg group-hover:shadow-xl transition-shadow">
                <GraduationCap className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-xl font-bold text-midnight-800 mb-2">
                Student Portal
              </h3>
              <p className="text-slate-500 text-sm mb-6 max-w-[240px]">
                Access your dashboard, take exams, and view your results
              </p>
              <div
                className="w-full btn-forest group-hover:shadow-lg transition-all"
                data-testid="student-login-button"
              >
                Student Login
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </button>

          {/* Staff Portal */}
          <button
            onClick={() => navigate('/staff/login')}
            className="zen-card zen-card-hover text-left group animate-fadeInUp stagger-2"
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

        {/* Help Box */}
        <div className="zen-card !p-5 animate-fadeInUp stagger-3" style={{ animationFillMode: 'both' }}>
          <div className="flex items-start gap-3">
            <div className="w-9 h-9 rounded-xl bg-blue-50 flex items-center justify-center flex-shrink-0">
              <Mail className="w-4 h-4 text-blue-600" />
            </div>
            <div>
              <p className="font-semibold text-midnight-800 text-sm mb-1">Need help?</p>
              <p className="text-slate-500 text-sm">
                For support or account issues, contact: <span className="font-bold text-midnight-800">abdal.ieltsacademy@gmail.com</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
