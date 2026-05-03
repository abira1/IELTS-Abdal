import { useEffect, useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { BookOpen, BarChart3, Calendar, TrendingUp, Clock, CheckCircle, AlertCircle, Sparkles } from 'lucide-react';
import { examSessionService, ExamSession } from '../../services/examSessionService';
import { storage, ExamSubmission } from '../../utils/storage';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { format } from 'date-fns';
import { convertListeningToBand, convertReadingToBand } from '../../utils/bandScoreConversion';
import { getDatabase, ref, onValue } from 'firebase/database';
import { app } from '../../firebase';
import { CountdownPopup } from '../../components/CountdownPopup';
import { AppLayout } from '../../components/layout/AppLayout';
import { DashboardFooter } from '../../components/DashboardFooter';

export function StudentDashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [upcomingExams, setUpcomingExams] = useState<ExamSession[]>([]);
  const [mySubmissions, setMySubmissions] = useState<ExamSubmission[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [stats, setStats] = useState({
    examsTaken: 0,
    averageScore: 0,
    bestScore: 0,
    upcomingCount: 0
  });

  // PHASE 2: Countdown state
  const [countdownData, setCountdownData] = useState<{
    isActive: boolean;
    examCode: string;
    trackName: string;
    countdownStartTime: string;
    countdownSeconds: number;
  } | null>(null);

  useEffect(() => {
    let isMounted = true;
    let loadInProgress = false;

    // PHASE 2: Real-time countdown listener
    const db = getDatabase(app);
    const countdownRef = ref(db, 'exam/countdown');
    
    const unsubscribe = onValue(countdownRef, (snapshot) => {
      const data = snapshot.val();
      
      if (data && data.isActive && user?.batchId) {
        if (data.allowedBatches && data.allowedBatches.includes(user.batchId)) {
          console.log('🕐 Countdown active for student:', data);
          if (isMounted) {
            setCountdownData({
              isActive: true,
              examCode: data.examCode,
              trackName: data.trackName,
              countdownStartTime: data.countdownStartTime,
              countdownSeconds: data.countdownSeconds
            });
          }
        }
      } else {
        if (isMounted) {
          setCountdownData(null);
        }
      }
    });

    const loadDashboardData = async () => {
      if (loadInProgress || !isMounted) return;
      loadInProgress = true;
      
      if (isMounted) setIsLoading(true);
      try {
        const allSessions = await examSessionService.getAllExamSessions();
        if (!isMounted) return;
        
        const allSubmissions = await storage.getSubmissions();
        if (!isMounted) return;
        
        const upcoming = allSessions.filter(session => {
          const isScheduledOrActive = session.status === 'scheduled' || session.status === 'active';
          const isBatchAllowed = user?.batchId && session.allowedBatches.includes(user.batchId);
          
          const hasSubmitted = allSubmissions.some(
            sub => sub.studentId === user?.studentId && sub.examCode === session.examCode
          );
          
          return isScheduledOrActive && isBatchAllowed && !hasSubmitted;
        });
        
        if (isMounted) setUpcomingExams(upcoming);

        const studentSubmissions = allSubmissions.filter(
          sub => sub.studentId === user?.studentId
        );
        
        if (isMounted) setMySubmissions(studentSubmissions);

        const publishedSubmissions = studentSubmissions.filter(sub => sub.resultPublished);
        
        const scores = publishedSubmissions
          .map(sub => {
            if (sub.testType === 'mock' && sub.overallBand !== undefined) {
              return Math.round((sub.overallBand / 9) * 100);
            }
            return sub.manualScore || 0;
          })
          .filter(score => score > 0);
        
        const avgScore = scores.length > 0 
          ? Math.round(scores.reduce((a, b) => a + b, 0) / scores.length)
          : 0;
        
        const bestScore = scores.length > 0 ? Math.max(...scores) : 0;

        if (isMounted) {
          setStats({
            examsTaken: studentSubmissions.length,
            averageScore: avgScore,
            bestScore: bestScore,
            upcomingCount: upcoming.length
          });
        }
      } catch (error) {
        console.error('Error loading dashboard data:', error);
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
        loadInProgress = false;
      }
    };

    loadDashboardData();

    return () => {
      isMounted = false;
      unsubscribe();
    };
  }, [user?.studentId, user?.batchId]);

  const handleStartExam = (examCode: string) => {
    navigate(`/student/exam/${examCode}`);
  };

  const handleViewResult = (submissionId: string) => {
    navigate(`/student/results/${submissionId}`);
  };

  // PHASE 2: Handle countdown complete
  const handleCountdownComplete = () => {
    if (countdownData) {
      console.log('⏰ Countdown complete, navigating to exam:', countdownData.examCode);
      navigate(`/student/exam/${countdownData.examCode}`);
    }
  };

  // Prepare chart data for bar chart
  const filteredSubmissions = mySubmissions
    .filter(sub => {
      if (!sub.resultPublished) return false;
      return sub.manualScore || (sub.testType === 'mock' && sub.overallBand !== undefined);
    })
    .sort((a, b) => new Date(a.submittedAt).getTime() - new Date(b.submittedAt).getTime());

  let mockTestCounter = 0;
  let partialTestCounter = 0;

  const chartData = filteredSubmissions.map((sub) => {
    let score = sub.manualScore || 0;
    let displayLabel = '';
    const testType = sub.testType || 'partial';
    
    if (sub.testType === 'mock' && sub.overallBand !== undefined) {
      score = Math.round((sub.overallBand / 9) * 100);
      mockTestCounter++;
      displayLabel = `Mock ${mockTestCounter}`;
    } else {
      partialTestCounter++;
      displayLabel = `Test ${partialTestCounter}`;
    }
    
    return {
      name: displayLabel,
      score,
      testType,
      trackName: sub.trackName,
      date: format(new Date(sub.submittedAt), 'MMM dd, yyyy'),
      examCode: sub.examCode || 'N/A'
    };
  });

  return (
    <AppLayout role="student" title="Student Dashboard" subtitle={user?.name}>
      {/* PHASE 2: Countdown Popup */}
      {countdownData && countdownData.isActive && (
        <CountdownPopup
          examCode={countdownData.examCode}
          trackName={countdownData.trackName}
          countdownStartTime={countdownData.countdownStartTime}
          countdownSeconds={countdownData.countdownSeconds}
          onComplete={handleCountdownComplete}
        />
      )}

      {/* Welcome Banner */}
      <div className="zen-card !p-6 md:!p-8 mb-6 bg-gradient-to-br from-forest-600 via-forest-600 to-emerald-700 !text-white relative overflow-hidden animate-fadeInUp">
        <div className="absolute top-0 right-0 w-40 h-40 bg-white/5 rounded-bl-[100px]" />
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-tr-[60px]" />
        <div className="relative">
          <div className="flex items-center gap-2 mb-2">
            <Sparkles className="w-5 h-5 text-emerald-200" />
            <span className="text-emerald-200 text-sm font-medium">Welcome back</span>
          </div>
          <h2 className="text-2xl md:text-3xl font-bold mb-1">{user?.name}</h2>
          <div className="flex flex-wrap items-center gap-3 text-sm text-emerald-100">
            <span>ID: {user?.studentId}</span>
            {user?.batch && (
              <>
                <span className="w-1 h-1 rounded-full bg-emerald-300" />
                <span>Batch: {user?.batch}</span>
              </>
            )}
          </div>
        </div>
      </div>

      {/* KPI Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 mb-6" id="exams">
        <div className="kpi-card animate-fadeInUp stagger-1" style={{ animationFillMode: 'both' }}>
          <div className="kpi-icon bg-blue-50">
            <BookOpen className="w-6 h-6 text-blue-600" />
          </div>
          <div>
            <p className="kpi-label">Exams Taken</p>
            <p className="kpi-value">{stats.examsTaken}</p>
          </div>
        </div>

        <div className="kpi-card animate-fadeInUp stagger-2" style={{ animationFillMode: 'both' }}>
          <div className="kpi-icon bg-emerald-50">
            <BarChart3 className="w-6 h-6 text-emerald-600" />
          </div>
          <div>
            <p className="kpi-label">Average Score</p>
            <p className="kpi-value">{stats.averageScore > 0 ? `${stats.averageScore}%` : '—'}</p>
          </div>
        </div>

        <div className="kpi-card animate-fadeInUp stagger-3" style={{ animationFillMode: 'both' }}>
          <div className="kpi-icon bg-purple-50">
            <TrendingUp className="w-6 h-6 text-purple-600" />
          </div>
          <div>
            <p className="kpi-label">Best Score</p>
            <p className="kpi-value">{stats.bestScore > 0 ? `${stats.bestScore}%` : '—'}</p>
          </div>
        </div>

        <div className="kpi-card animate-fadeInUp stagger-4" style={{ animationFillMode: 'both' }}>
          <div className="kpi-icon bg-orange-50">
            <Calendar className="w-6 h-6 text-orange-600" />
          </div>
          <div>
            <p className="kpi-label">Upcoming</p>
            <p className="kpi-value">{stats.upcomingCount}</p>
          </div>
        </div>
      </div>

      {/* Upcoming Exams */}
      <div className="zen-card !p-0 overflow-hidden mb-6">
        <div className="px-6 md:px-8 py-5 border-b border-slate-100 flex items-center gap-3">
          <div className="w-8 h-8 bg-blue-50 rounded-xl flex items-center justify-center">
            <Calendar className="w-4 h-4 text-blue-600" />
          </div>
          <h3 className="text-base font-bold text-midnight-800">Upcoming Exams</h3>
        </div>

        {isLoading ? (
          <div className="text-center py-12">
            <div className="w-8 h-8 border-2 border-forest-200 border-t-forest-600 rounded-full animate-spin mx-auto" />
            <p className="text-slate-500 mt-3 text-sm">Loading...</p>
          </div>
        ) : upcomingExams.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="zen-table">
              <thead>
                <tr>
                  <th>Track Name</th>
                  <th className="hidden sm:table-cell">Exam Code</th>
                  <th className="hidden md:table-cell">Date</th>
                  <th className="hidden lg:table-cell">Time</th>
                  <th className="hidden sm:table-cell">Duration</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {upcomingExams.map(exam => (
                  <tr key={exam.examCode}>
                    <td className="font-semibold text-midnight-800">{exam.trackName}</td>
                    <td className="hidden sm:table-cell">
                      <span className="font-mono text-sm text-slate-600">{exam.examCode}</span>
                    </td>
                    <td className="hidden md:table-cell text-slate-600">{exam.date}</td>
                    <td className="hidden lg:table-cell text-slate-600">{exam.startTime}</td>
                    <td className="hidden sm:table-cell">
                      <div className="flex items-center gap-1.5 text-slate-600">
                        <Clock className="w-3.5 h-3.5 text-slate-400" />
                        {exam.duration} min
                      </div>
                    </td>
                    <td>
                      {exam.status === 'active' ? (
                        <span className="pill-emerald">
                          <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
                          Active
                        </span>
                      ) : (
                        <span className="pill-orange">Scheduled</span>
                      )}
                    </td>
                    <td>
                      {exam.status === 'active' ? (
                        <button
                          onClick={() => handleStartExam(exam.examCode)}
                          className="px-4 py-2 bg-forest-600 text-white text-sm font-semibold rounded-2xl hover:bg-forest-500 transition-colors"
                        >
                          Start Exam
                        </button>
                      ) : (
                        <span className="text-xs text-slate-400">Not started</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="w-14 h-14 bg-slate-50 rounded-zen flex items-center justify-center mx-auto mb-3">
              <Calendar className="w-7 h-7 text-slate-400" />
            </div>
            <p className="text-midnight-800 font-semibold mb-1">No upcoming exams</p>
            <p className="text-sm text-slate-500">Check back later for new sessions</p>
          </div>
        )}
      </div>

      {/* My Results */}
      <div className="zen-card !p-0 overflow-hidden mb-6" id="results">
        <div className="px-6 md:px-8 py-5 border-b border-slate-100 flex items-center gap-3">
          <div className="w-8 h-8 bg-emerald-50 rounded-xl flex items-center justify-center">
            <BarChart3 className="w-4 h-4 text-emerald-600" />
          </div>
          <h3 className="text-base font-bold text-midnight-800">My Results</h3>
        </div>

        {isLoading ? (
          <div className="text-center py-12">
            <div className="w-8 h-8 border-2 border-forest-200 border-t-forest-600 rounded-full animate-spin mx-auto" />
            <p className="text-slate-500 mt-3 text-sm">Loading...</p>
          </div>
        ) : mySubmissions.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="zen-table">
              <thead>
                <tr>
                  <th className="hidden sm:table-cell">Exam Code</th>
                  <th>Track</th>
                  <th className="hidden md:table-cell">Date</th>
                  <th>Score</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {mySubmissions
                  .sort((a, b) => new Date(b.submittedAt).getTime() - new Date(a.submittedAt).getTime())
                  .map(submission => (
                  <tr key={submission.id}>
                    <td className="hidden sm:table-cell">
                      <span className="font-mono text-sm text-slate-600">{submission.examCode || 'N/A'}</span>
                    </td>
                    <td className="font-semibold text-midnight-800">{submission.trackName}</td>
                    <td className="hidden md:table-cell text-slate-600">
                      {format(new Date(submission.submittedAt), 'MMM dd, yyyy')}
                    </td>
                    <td>
                      {submission.resultPublished ? (
                        submission.testType === 'mock' && submission.overallBand !== undefined ? (
                          <div>
                            <div className="text-lg font-bold text-forest-600">{submission.overallBand.toFixed(1)}</div>
                            <div className="text-[10px] text-slate-500 leading-tight space-y-0.5">
                              <span>L:{submission.sectionScores?.listening?.toFixed(1) || '—'} </span>
                              <span>R:{submission.sectionScores?.reading?.toFixed(1) || '—'} </span>
                              <span>W:{submission.sectionScores?.writing?.toFixed(1) || '—'} </span>
                              <span>S:{submission.sectionScores?.speaking?.toFixed(1) || '—'}</span>
                            </div>
                          </div>
                        ) : submission.manualScore ? (
                          (() => {
                            const trackType = submission.trackType;
                            const totalQs = submission.totalQuestions || 40;
                            const isWriting = trackType === 'writing' && totalQs === 2;
                            let bandScore: number | null = null;

                            if (trackType === 'listening' || trackType === 'reading') {
                              const correctAnswers = Object.values(submission.marks || {})
                                .filter(m => m === 'correct').length;
                              if (trackType === 'listening') {
                                bandScore = convertListeningToBand(correctAnswers);
                              } else if (trackType === 'reading') {
                                bandScore = convertReadingToBand(correctAnswers);
                              }
                            } else if (isWriting) {
                              bandScore = submission.writingBandScore || null;
                              if (bandScore === null && submission.marks) {
                                const task1 = typeof submission.marks['task1'] === 'number' ? submission.marks['task1'] : null;
                                const task2 = typeof submission.marks['task2'] === 'number' ? submission.marks['task2'] : null;
                                if (task1 !== null && task2 !== null) {
                                  bandScore = Math.round(((task1 + task2 * 2) / 3) * 2) / 2;
                                }
                              }
                            }

                            return (
                              <div>
                                {bandScore !== null ? (
                                  <>
                                    <div className="text-lg font-bold text-forest-600">{bandScore.toFixed(1)}</div>
                                    <div className="text-[10px] text-slate-500">
                                      {isWriting ? '2 Tasks' : Object.values(submission.marks || {}).filter(m => m === 'correct').length + '/40'}
                                    </div>
                                  </>
                                ) : (
                                  <div className="text-lg font-bold text-forest-600">{submission.manualScore}%</div>
                                )}
                              </div>
                            );
                          })()
                        ) : (
                          <span className="text-slate-400">—</span>
                        )
                      ) : (
                        <span className="text-slate-400">—</span>
                      )}
                    </td>
                    <td>
                      {submission.resultPublished ? (
                        <span className="pill-emerald">
                          <CheckCircle className="w-3 h-3" />
                          Published
                        </span>
                      ) : (
                        <span className="pill-orange">
                          <AlertCircle className="w-3 h-3" />
                          Pending
                        </span>
                      )}
                    </td>
                    <td>
                      {submission.resultPublished ? (
                        <button
                          onClick={() => handleViewResult(submission.id)}
                          className="text-forest-600 hover:text-forest-500 font-semibold text-sm transition-colors"
                        >
                          View Result
                        </button>
                      ) : (
                        <span className="text-xs text-slate-400">Not available</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="w-14 h-14 bg-slate-50 rounded-zen flex items-center justify-center mx-auto mb-3">
              <BarChart3 className="w-7 h-7 text-slate-400" />
            </div>
            <p className="text-midnight-800 font-semibold mb-1">No results yet</p>
            <p className="text-sm text-slate-500">Complete exams to view your results</p>
          </div>
        )}
      </div>

      {/* Performance Chart */}
      {chartData.length > 0 && (
        <div className="zen-card mb-6" id="performance">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-8 bg-purple-50 rounded-xl flex items-center justify-center">
              <TrendingUp className="w-4 h-4 text-purple-600" />
            </div>
            <h3 className="text-base font-bold text-midnight-800">Performance Trend</h3>
          </div>
          
          {/* Legend */}
          <div className="flex items-center justify-center gap-6 mb-6">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-blue-500 rounded-lg" />
              <span className="text-xs font-semibold text-slate-600">Mock Tests</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-emerald-500 rounded-lg" />
              <span className="text-xs font-semibold text-slate-600">Partial Tests</span>
            </div>
          </div>

          <div className="h-72 md:h-96">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart 
                data={chartData}
                margin={{ top: 20, right: 20, left: 0, bottom: 60 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#F0EDE8" />
                <XAxis 
                  dataKey="name" 
                  angle={-45}
                  textAnchor="end"
                  height={80}
                  interval={0}
                  tick={{ fontSize: 11, fill: '#6D7896', fontWeight: 500 }}
                />
                <YAxis 
                  domain={[0, 100]} 
                  label={{ value: 'Score (%)', angle: -90, position: 'insideLeft', style: { fontSize: 12, fill: '#6D7896', fontWeight: 600 } }}
                  tick={{ fontSize: 11, fill: '#6D7896' }}
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#ffffff', 
                    border: '1px solid #F0EDE8', 
                    borderRadius: '16px',
                    boxShadow: '0 8px 40px -8px rgba(31, 42, 68, 0.12)',
                    padding: '12px 16px'
                  }}
                  formatter={(value: any, _name: any, props: any) => {
                    const data = props.payload;
                    return [
                      <div key="tooltip">
                        <div className="font-bold text-midnight-800 mb-2">{data.name}</div>
                        <div className="text-xs space-y-1">
                          <div className="flex justify-between gap-4">
                            <span className="text-slate-500">Score:</span>
                            <span className="font-bold text-forest-600">{value}%</span>
                          </div>
                          <div className="flex justify-between gap-4">
                            <span className="text-slate-500">Track:</span>
                            <span className="font-medium text-midnight-800">{data.trackName}</span>
                          </div>
                          <div className="flex justify-between gap-4">
                            <span className="text-slate-500">Date:</span>
                            <span className="text-midnight-800">{data.date}</span>
                          </div>
                        </div>
                      </div>,
                      ''
                    ];
                  }}
                  labelFormatter={() => ''}
                />
                <Bar 
                  dataKey="score" 
                  radius={[12, 12, 0, 0]}
                  maxBarSize={48}
                >
                  {chartData.map((entry, index) => (
                    <Cell 
                      key={`cell-${index}`} 
                      fill={entry.testType === 'mock' ? '#3b82f6' : '#10b981'}
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
          
          <div className="mt-4 text-center">
            <p className="text-xs text-slate-500">
              Showing performance across {chartData.length} published exam{chartData.length !== 1 ? 's' : ''}
            </p>
          </div>
        </div>
      )}

      {/* Tip Box */}
      <div className="zen-card !bg-forest-50 !border !border-forest-100">
        <p className="text-forest-800 text-sm font-medium">
          <span className="font-bold">💡 Tip:</span> Check this dashboard regularly for upcoming exams and published results.
        </p>
      </div>

      {/* Footer */}
      <DashboardFooter />
    </AppLayout>
  );
}
