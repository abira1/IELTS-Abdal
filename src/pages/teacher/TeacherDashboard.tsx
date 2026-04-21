import { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { BookOpen, CheckCircle, Clock, ArrowRight, FileText, Download, Sparkles } from 'lucide-react';
import { storage, ExamSubmission } from '../../utils/storage';
import { allTracks } from '../../data/tracks';
import { exportToExcel } from '../../utils/exportExcel';
import { AppLayout } from '../../components/layout/AppLayout';

export function TeacherDashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [submissions, setSubmissions] = useState<ExamSubmission[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadSubmissions();
  }, []);

  const loadSubmissions = async () => {
    setIsLoading(true);
    const allSubmissions = await storage.getSubmissions();
    
    if (user?.assignedTracks && user.assignedTracks.length > 0) {
      const filtered = allSubmissions.filter(s => 
        user.assignedTracks!.includes(s.trackId)
      );
      setSubmissions(filtered);
    } else {
      setSubmissions([]);
    }
    setIsLoading(false);
  };

  const getPendingCount = () => {
    return submissions.filter(s => !s.marks || Object.keys(s.marks).length === 0).length;
  };

  const getGradedTodayCount = () => {
    const today = new Date().toDateString();
    return submissions.filter(s => {
      if (!s.marks || Object.keys(s.marks).length === 0 || s.resultPublished) return false;
      return s.publishedAt && new Date(s.publishedAt).toDateString() === today;
    }).length;
  };

  const getTotalThisMonthCount = () => {
    const now = new Date();
    const firstDayOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    return submissions.filter(s => {
      const submittedDate = new Date(s.submittedAt);
      return submittedDate >= firstDayOfMonth;
    }).length;
  };

  const getAssignedTracks = () => {
    if (!user?.assignedTracks || user.assignedTracks.length === 0) {
      return [];
    }
    
    return user.assignedTracks.map(trackId => {
      const track = allTracks.find(t => t.id === trackId);
      if (!track) return null;
      
      const trackSubmissions = submissions.filter(s => s.trackId === trackId);
      const pending = trackSubmissions.filter(s => !s.marks || Object.keys(s.marks).length === 0).length;
      const graded = trackSubmissions.filter(s => s.marks && Object.keys(s.marks).length > 0).length;
      
      return {
        ...track,
        totalSubmissions: trackSubmissions.length,
        pending,
        graded
      };
    }).filter(Boolean);
  };

  const getRecentPendingSubmissions = () => {
    return submissions
      .filter(s => !s.marks || Object.keys(s.marks).length === 0)
      .sort((a, b) => new Date(b.submittedAt).getTime() - new Date(a.submittedAt).getTime())
      .slice(0, 5);
  };

  const assignedTracks = getAssignedTracks();
  const recentPending = getRecentPendingSubmissions();

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <AppLayout role="teacher" title="Teacher Dashboard" subtitle={user?.name}>
      {/* Welcome Banner */}
      <div className="zen-card !p-6 md:!p-8 mb-6 bg-gradient-to-br from-midnight-800 via-midnight-700 to-midnight-800 !text-white relative overflow-hidden animate-fadeInUp">
        <div className="absolute top-0 right-0 w-40 h-40 bg-white/5 rounded-bl-[100px]" />
        <div className="relative flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Sparkles className="w-5 h-5 text-blue-300" />
              <span className="text-blue-200 text-sm font-medium">Welcome back</span>
            </div>
            <h2 className="text-2xl md:text-3xl font-bold mb-1">{user?.name}</h2>
            <p className="text-slate-300 text-sm">Manage your assigned tracks and grade submissions</p>
          </div>
          <button
            onClick={() => exportToExcel(submissions, { type: 'all', filename: `Abdal_${user?.name}_Submissions` })}
            className="flex items-center gap-2 px-5 py-2.5 bg-white/10 hover:bg-white/20 text-white text-sm font-semibold rounded-2xl transition-colors self-start"
            data-testid="export-button"
          >
            <Download className="w-4 h-4" />
            Export Submissions
          </button>
        </div>
      </div>

      {isLoading ? (
        <div className="text-center py-16">
          <div className="w-10 h-10 border-2 border-forest-200 border-t-forest-600 rounded-full animate-spin mx-auto" />
          <p className="text-slate-500 mt-4 font-medium">Loading dashboard...</p>
        </div>
      ) : (
        <>
          {/* KPI Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6 mb-8">
            <div className="kpi-card animate-fadeInUp stagger-1" style={{ animationFillMode: 'both' }}>
              <div className="kpi-icon bg-orange-50">
                <Clock className="w-6 h-6 text-orange-600" />
              </div>
              <div>
                <p className="kpi-label">Pending Submissions</p>
                <p className="kpi-value" data-testid="pending-count">{getPendingCount()}</p>
              </div>
            </div>

            <div className="kpi-card animate-fadeInUp stagger-2" style={{ animationFillMode: 'both' }}>
              <div className="kpi-icon bg-emerald-50">
                <CheckCircle className="w-6 h-6 text-emerald-600" />
              </div>
              <div>
                <p className="kpi-label">Graded Today</p>
                <p className="kpi-value" data-testid="graded-today-count">{getGradedTodayCount()}</p>
              </div>
            </div>

            <div className="kpi-card animate-fadeInUp stagger-3" style={{ animationFillMode: 'both' }}>
              <div className="kpi-icon bg-blue-50">
                <BookOpen className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <p className="kpi-label">Total This Month</p>
                <p className="kpi-value" data-testid="total-month-count">{getTotalThisMonthCount()}</p>
              </div>
            </div>
          </div>

          {/* Assigned Tracks */}
          <div className="zen-card mb-6">
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-base font-bold text-midnight-800">My Assigned Tracks</h3>
              {assignedTracks.length > 0 && (
                <button
                  onClick={() => navigate('/teacher/submissions')}
                  className="text-sm text-forest-600 hover:text-forest-500 font-semibold flex items-center gap-1 transition-colors"
                  data-testid="view-all-submissions-button"
                >
                  View All
                  <ArrowRight className="w-4 h-4" />
                </button>
              )}
            </div>
            
            {assignedTracks.length === 0 ? (
              <div className="text-center py-10">
                <div className="w-16 h-16 bg-slate-50 rounded-zen flex items-center justify-center mx-auto mb-4">
                  <FileText className="w-8 h-8 text-slate-400" />
                </div>
                <p className="text-midnight-800 font-semibold mb-1">No tracks assigned</p>
                <p className="text-sm text-slate-500">Contact admin to assign tracks to you</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {assignedTracks.map((track: any) => (
                  <button
                    key={track.id}
                    onClick={() => navigate('/teacher/submissions')}
                    className="p-4 border border-slate-100 rounded-2xl hover:border-forest-200 hover:bg-forest-50/50 transition-all text-left group"
                    data-testid={`track-card-${track.id}`}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <span className="font-mono font-bold text-forest-600 text-sm">{track.shortName}</span>
                        <span className="text-sm font-semibold text-midnight-800">{track.name}</span>
                      </div>
                      <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-forest-600 transition-colors" />
                    </div>
                    <div className="flex items-center gap-4 text-sm">
                      <div className="flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5 text-orange-500" />
                        <span className="font-bold text-orange-600">{track.pending}</span>
                        <span className="text-slate-500 text-xs">Pending</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <CheckCircle className="w-3.5 h-3.5 text-emerald-500" />
                        <span className="font-bold text-emerald-600">{track.graded}</span>
                        <span className="text-slate-500 text-xs">Graded</span>
                      </div>
                    </div>
                    <p className="text-[10px] text-slate-400 mt-2 font-medium">
                      {track.totalSubmissions} total submissions
                    </p>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Recent Pending */}
          <div className="zen-card !p-0 overflow-hidden">
            <div className="px-6 md:px-8 py-5 border-b border-slate-100">
              <h3 className="text-base font-bold text-midnight-800">Recent Submissions (Pending)</h3>
            </div>
            
            {recentPending.length === 0 ? (
              <div className="text-center py-12">
                <div className="w-14 h-14 bg-slate-50 rounded-zen flex items-center justify-center mx-auto mb-3">
                  <CheckCircle className="w-7 h-7 text-slate-400" />
                </div>
                <p className="text-midnight-800 font-semibold mb-1">All caught up!</p>
                <p className="text-sm text-slate-500">No pending submissions</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="zen-table">
                  <thead>
                    <tr>
                      <th className="hidden sm:table-cell">Exam Code</th>
                      <th>Student</th>
                      <th className="hidden md:table-cell">Track</th>
                      <th className="hidden lg:table-cell">Date</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentPending.map((submission) => {
                      const track = allTracks.find(t => t.id === submission.trackId);
                      return (
                        <tr key={submission.id}>
                          <td className="hidden sm:table-cell">
                            <span className="font-mono text-sm text-blue-600">{submission.examCode || 'N/A'}</span>
                          </td>
                          <td>
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 rounded-full bg-midnight-50 flex items-center justify-center text-midnight-600 font-bold text-xs flex-shrink-0">
                                {submission.studentName?.charAt(0)?.toUpperCase()}
                              </div>
                              <div>
                                <p className="font-semibold text-midnight-800 text-sm">{submission.studentName}</p>
                                <p className="text-xs text-slate-500">{submission.studentId}</p>
                              </div>
                            </div>
                          </td>
                          <td className="hidden md:table-cell text-slate-600">
                            {track?.shortName} – {submission.trackName}
                          </td>
                          <td className="hidden lg:table-cell text-slate-500 text-sm">
                            {formatDate(submission.submittedAt)}
                          </td>
                          <td>
                            <button
                              onClick={() => navigate('/teacher/submissions')}
                              className="text-forest-600 hover:text-forest-500 font-semibold text-sm flex items-center gap-1 transition-colors"
                              data-testid={`grade-submission-${submission.id}`}
                            >
                              Grade
                              <ArrowRight className="w-3.5 h-3.5" />
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          {/* Tip Box */}
          <div className="zen-card !bg-midnight-50 !border !border-midnight-100 mt-6">
            <p className="text-midnight-700 text-sm font-medium">
              <span className="font-bold">💡 Tip:</span> You can only grade submissions for your assigned tracks. Contact the administrator for additional track access.
            </p>
          </div>
        </>
      )}
    </AppLayout>
  );
}
