import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { GraduationCap, Loader, AlertCircle, ArrowLeft } from 'lucide-react';

export function StudentLogin() {
  const [studentId, setStudentId] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (!studentId.trim() || !password.trim()) {
      setError('Please enter both Student ID and password');
      return;
    }

    setIsLoading(true);

    try {
      const result = await login({ studentId: studentId.trim(), password }, 'student');
      
      if (result.success) {
        navigate('/student/dashboard');
      } else {
        setError(result.error || 'Login failed');
      }
    } catch (err) {
      setError('Login failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-porcelain flex items-center justify-center p-4 md:p-6 relative overflow-hidden">
      {/* Decorative */}
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-gradient-to-bl from-forest-100/40 to-transparent rounded-full translate-x-1/3 -translate-y-1/3" />
      <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-gradient-to-tr from-emerald-50/60 to-transparent rounded-full -translate-x-1/3 translate-y-1/3" />

      <div className="max-w-md w-full relative z-10 animate-fadeInUp">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-br from-forest-500 to-emerald-600 rounded-zen flex items-center justify-center mx-auto mb-5 shadow-lg">
            <GraduationCap className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-2xl md:text-3xl font-bold text-midnight-800 mb-2">
            Student Login
          </h1>
          <p className="text-slate-500 text-sm">
            Enter your credentials to access your dashboard
          </p>
        </div>

        {/* Form Card */}
        <div className="zen-card">
          <form onSubmit={handleSubmit} className="space-y-5">
            {error && (
              <div className="p-4 bg-red-50 border border-red-100 rounded-2xl flex items-start gap-3 animate-fadeIn">
                <AlertCircle className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" />
                <p className="text-red-800 text-sm font-medium">{error}</p>
              </div>
            )}

            <div>
              <label htmlFor="studentId" className="zen-label">
                Student ID
              </label>
              <input
                id="studentId"
                type="text"
                value={studentId}
                onChange={(e) => setStudentId(e.target.value)}
                placeholder="e.g., STU2025001"
                className="zen-input"
                required
                autoFocus
                disabled={isLoading}
                data-testid="student-id-input"
              />
            </div>

            <div>
              <label htmlFor="password" className="zen-label">
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="zen-input"
                required
                disabled={isLoading}
                data-testid="password-input"
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full btn-forest !py-3.5 text-base disabled:opacity-50 disabled:cursor-not-allowed"
              data-testid="login-button"
            >
              {isLoading ? (
                <>
                  <Loader className="w-5 h-5 animate-spin" />
                  Logging in...
                </>
              ) : (
                'Login'
              )}
            </button>
          </form>

          <div className="mt-6 pt-6 border-t border-slate-100">
            <button
              onClick={() => navigate('/')}
              className="text-sm text-forest-600 hover:text-forest-500 font-semibold flex items-center gap-1.5 transition-colors mb-4"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Home
            </button>
            
            <div className="text-center">
              <p className="text-xs text-slate-600">
                Are you a staff member?{' '}
                <button
                  onClick={() => navigate('/staff-login')}
                  className="text-forest-600 hover:text-forest-700 font-semibold transition-colors underline"
                >
                  Click here
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
