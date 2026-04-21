import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { storage, ExamSubmission } from '../../utils/storage';
import { ArrowLeft, Printer, CheckCircle, XCircle, Clock, Calendar, Award, BarChart3, Activity } from 'lucide-react';
import { format } from 'date-fns';
import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, ResponsiveContainer } from 'recharts';
import { PrintableResult } from '../../components/PrintableResult';
import { convertListeningToBand, convertReadingToBand } from '../../utils/bandScoreConversion';

// Helper function for band score interpretation
function getBandInterpretation(band: number): string {
  if (band >= 8.5) return "Excellent! You have a very good command of English and can handle complex language effectively.";
  if (band >= 7.5) return "Very Good! You show a high level of operational command with occasional errors.";
  if (band >= 6.5) return "Good! You have generally effective command of the language despite some inaccuracies.";
  if (band >= 5.5) return "Competent! You have partial command of the language and can handle overall meaning in most situations.";
  if (band >= 4.5) return "Basic! You have limited ability and may face communication breakdowns.";
  return "Keep practicing! There's room for improvement in your English language skills.";
}

export function ResultDetailPage() {
  const { submissionId } = useParams<{ submissionId: string }>();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [submission, setSubmission] = useState<ExamSubmission | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showPrintPreview, setShowPrintPreview] = useState(false);

  useEffect(() => {
    let isMounted = true;
    let loadInProgress = false;

    const loadSubmission = async () => {
      // Prevent multiple simultaneous loads (race condition fix)
      if (loadInProgress) return;
      loadInProgress = true;
      
      setIsLoading(true);
      try {
        const allSubmissions = await storage.getSubmissions();
        
        // Only update state if component is still mounted
        if (!isMounted) return;
        
        const found = allSubmissions.find(s => s.id === submissionId);
        
        // Verify this submission belongs to the logged-in student
        if (found && found.studentId === user?.studentId) {
          setSubmission(found);
        } else {
          // Unauthorized or not found - only navigate if still mounted
          if (isMounted) {
            navigate('/student/dashboard');
          }
        }
      } catch (error) {
        console.error('Error loading submission:', error);
        // Still set loading to false even on error
        if (isMounted) {
          setIsLoading(false);
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
        loadInProgress = false;
      }
    };

    loadSubmission();

    // Cleanup: prevent state updates on unmount
    return () => {
      isMounted = false;
    };
  }, [submissionId, user?.studentId, navigate]);

  const calculateSectionStats = () => {
    if (!submission || !submission.marks) return [];
    
    const isWriting = submission.trackType === 'writing' && (submission.totalQuestions || 40) === 2;
    
    if (isWriting) {
      // For writing tests, show task-wise breakdown
      return [
        {
          section: 'Task 1',
          correct: typeof submission.marks['task1'] === 'number' ? 1 : 0,
          incorrect: typeof submission.marks['task1'] === 'number' ? 0 : 1,
          unanswered: 0,
          total: 1,
          percentage: typeof submission.marks['task1'] === 'number' ? 100 : 0,
          band: typeof submission.marks['task1'] === 'number' ? submission.marks['task1'] : null
        },
        {
          section: 'Task 2',
          correct: typeof submission.marks['task2'] === 'number' ? 1 : 0,
          incorrect: typeof submission.marks['task2'] === 'number' ? 0 : 1,
          unanswered: 0,
          total: 1,
          percentage: typeof submission.marks['task2'] === 'number' ? 100 : 0,
          band: typeof submission.marks['task2'] === 'number' ? submission.marks['task2'] : null
        }
      ];
    }
    
    // For L/R tests, show 4 question sections
    const sections = [
      { name: 'Section 1', questions: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10] },
      { name: 'Section 2', questions: [11, 12, 13, 14, 15, 16, 17, 18, 19, 20] },
      { name: 'Section 3', questions: [21, 22, 23, 24, 25, 26, 27, 28, 29, 30] },
      { name: 'Section 4', questions: [31, 32, 33, 34, 35, 36, 37, 38, 39, 40] }
    ];

    return sections.map(section => {
      const correct = section.questions.filter(
        q => submission.marks![q] === 'correct'
      ).length;
      const incorrect = section.questions.filter(
        q => submission.marks![q] === 'incorrect'
      ).length;
      const unanswered = section.questions.filter(
        q => !submission.marks![q]
      ).length;
      
      return {
        section: section.name,
        correct,
        incorrect,
        unanswered,
        total: section.questions.length,
        percentage: Math.round((correct / section.questions.length) * 100)
      };
    });
  };

  const handlePrint = () => {
    window.print();
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-porcelain flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-forest-500 mx-auto mb-4"></div>
          <p className="text-midnight-600 font-medium">Loading result...</p>
        </div>
      </div>
    );
  }

  if (!submission) {
    return (
      <div className="min-h-screen bg-porcelain flex items-center justify-center">
        <div className="zen-card text-center max-w-sm mx-auto">
          <p className="text-midnight-600 font-medium mb-4">Result not found</p>
          <button
            onClick={() => navigate('/student/dashboard')}
            className="btn-forest w-full"
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    );
  }

  // If result is not published yet
  if (!submission.resultPublished) {
    return (
      <div className="min-h-screen bg-porcelain">
        <div className="max-w-4xl mx-auto px-6 py-12">
          <div className="zen-card p-12 text-center">
            <div className="w-20 h-20 bg-amber-50 rounded-full flex items-center justify-center mx-auto mb-6">
              <Clock className="w-10 h-10 text-amber-500" />
            </div>
            <h2 className="text-2xl font-bold text-midnight-800 mb-4">Result Pending</h2>
            <p className="text-slate-500 mb-8 max-w-lg mx-auto">
              Your submission is being reviewed. Results will be published soon.
              You will be able to view your detailed results once they are published.
            </p>
            <button
              onClick={() => navigate('/student/dashboard')}
              className="btn-forest inline-flex items-center justify-center mx-auto"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Dashboard
            </button>
          </div>
        </div>
      </div>
    );
  }

  const sectionStats = calculateSectionStats();
  const isWriting = submission && submission.trackType === 'writing' && (submission.totalQuestions || 40) === 2;
  const radarData = sectionStats.map(s => ({
    subject: s.section.replace('Section ', 'Sec '),
    score: isWriting && s.band !== null && typeof s.band === 'number' ? (s.band / 9) * 100 : s.percentage,
    fullMark: 100
  }));

  return (
    <div className="min-h-screen bg-porcelain">
      {/* Header */}
      <div className="glass border-b border-slate-100 print:hidden sticky top-0 z-30">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <button
            onClick={() => navigate('/student/dashboard')}
            className="flex items-center gap-2 text-midnight-600 hover:text-midnight-900 font-semibold transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Dashboard</span>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
        {/* Title Section */}
        <div className="zen-card mb-6 animate-fadeInUp">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-midnight-800 mb-1">Exam Result Details</h1>
              <p className="text-slate-500 text-sm font-medium">Published on {format(new Date(submission.publishedAt!), 'MMMM dd, yyyy')}</p>
            </div>
            <div className="flex gap-2 print:hidden">
              <button
                onClick={() => setShowPrintPreview(true)}
                className="btn-forest !px-4 !py-2.5"
              >
                <Printer className="w-4 h-4 mr-2" />
                <span>Print Result</span>
              </button>
            </div>
          </div>

          {/* Exam Info Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 border-t border-slate-100 pt-6">
            <div>
              <p className="text-xs font-medium text-slate-500 mb-1 uppercase tracking-wider">Exam Code</p>
              <p className="text-base font-bold text-midnight-800 font-mono">{submission.examCode || 'N/A'}</p>
            </div>
            <div>
              <p className="text-xs font-medium text-slate-500 mb-1 uppercase tracking-wider">Track</p>
              <p className="text-base font-bold text-midnight-800">{submission.trackName}</p>
            </div>
            <div>
              <p className="text-xs font-medium text-slate-500 mb-1 uppercase tracking-wider">Date</p>
              <p className="text-base font-bold text-midnight-800 flex items-center gap-1.5">
                <Calendar className="w-4 h-4 text-slate-400" />
                {format(new Date(submission.submittedAt), 'MMM dd, yyyy')}
              </p>
            </div>
            <div>
              <p className="text-xs font-medium text-slate-500 mb-1 uppercase tracking-wider">Time Spent</p>
              <p className="text-base font-bold text-midnight-800 flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-slate-400" />
                {submission.timeSpent}
              </p>
            </div>
          </div>
        </div>

        {/* Score Section - Mock Test */}
        {submission.testType === 'mock' && submission.overallBand !== undefined ? (
          <>
            {/* Overall Band Score Card */}
            <div className="bg-gradient-to-br from-midnight-800 to-midnight-900 rounded-zen shadow-zen-xl p-6 sm:p-8 mb-6 text-white relative overflow-hidden animate-fadeInUp stagger-1" style={{ animationFillMode: 'both' }}>
              <div className="absolute top-0 right-0 w-64 h-64 bg-forest-500/20 rounded-full blur-3xl translate-x-1/3 -translate-y-1/3" />
              <div className="absolute bottom-0 left-0 w-48 h-48 bg-blue-500/20 rounded-full blur-3xl -translate-x-1/3 translate-y-1/3" />
              
              <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="text-center md:text-left">
                  <div className="flex items-center justify-center md:justify-start gap-3 mb-3">
                    <div className="p-2 bg-white/10 backdrop-blur rounded-xl">
                      <Award className="w-6 h-6 text-emerald-400" />
                    </div>
                    <h2 className="text-2xl font-bold">IELTS Mock Test Result</h2>
                  </div>
                  <p className="text-slate-300 font-medium">Exam Code: {submission.examCode}</p>
                  <p className="text-slate-400 text-sm mt-1">Submitted: {format(new Date(submission.submittedAt), 'MMMM dd, yyyy')}</p>
                </div>
                <div className="text-center bg-white/5 backdrop-blur border border-white/10 rounded-2xl p-6 min-w-[200px]">
                  <div className="text-sm font-medium text-slate-300 uppercase tracking-wider mb-2">Overall Band Score</div>
                  <div className="text-7xl font-bold text-white tracking-tighter">{submission.overallBand.toFixed(1)}</div>
                </div>
              </div>
            </div>

            {/* Section Scores Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 mb-6 animate-fadeInUp stagger-2" style={{ animationFillMode: 'both' }}>
              <div className="zen-card border-t-4 border-t-blue-500 !p-5">
                <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-3">Listening</h3>
                <div className="text-4xl font-bold text-midnight-800 mb-1">
                  {submission.sectionScores?.listening?.toFixed(1) || '--'}
                </div>
                <p className="text-xs font-semibold text-blue-600">Band Score</p>
              </div>

              <div className="zen-card border-t-4 border-t-emerald-500 !p-5">
                <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-3">Reading</h3>
                <div className="text-4xl font-bold text-midnight-800 mb-1">
                  {submission.sectionScores?.reading?.toFixed(1) || '--'}
                </div>
                <p className="text-xs font-semibold text-emerald-600">Band Score</p>
              </div>

              <div className="zen-card border-t-4 border-t-amber-500 !p-5">
                <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-3">Writing</h3>
                <div className="text-4xl font-bold text-midnight-800 mb-1">
                  {submission.sectionScores?.writing?.toFixed(1) || '--'}
                </div>
                <p className="text-xs font-semibold text-amber-600">Band Score</p>
              </div>

              <div className="zen-card border-t-4 border-t-purple-500 !p-5">
                <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-3">Speaking</h3>
                <div className="text-4xl font-bold text-midnight-800 mb-1">
                  {submission.sectionScores?.speaking?.toFixed(1) || '--'}
                </div>
                <p className="text-xs font-semibold text-purple-600">Band Score</p>
              </div>
            </div>

            {/* Band Interpretation */}
            <div className="bg-emerald-50/50 rounded-2xl p-6 border border-emerald-100 mb-6 animate-fadeInUp stagger-3" style={{ animationFillMode: 'both' }}>
              <h3 className="text-base font-bold text-midnight-800 mb-2 flex items-center gap-2">
                <Award className="w-5 h-5 text-emerald-600" />
                Band Score Interpretation
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                {getBandInterpretation(submission.overallBand)}
              </p>
            </div>
          </>
        ) : (
          /* Score Section - Partial Test */
          (() => {
            const correctAnswers = Object.values(submission.marks || {}).filter(m => m === 'correct').length;
            const totalQuestions = submission.totalQuestions || 40;
            const trackType = submission.trackType;

            // Check if this is a partial writing test
            const isPartialWriting = trackType === 'writing' && totalQuestions === 2;

            // Calculate band score for Listening or Reading tests
            let bandScore: number | null = null;
            let testLabel = 'Test Result';

            if (isPartialWriting) {
              // For writing tests, use the calculated final band score
              bandScore = submission.writingBandScore || null;
              testLabel = '✍️ Writing Test Result';
            } else if (trackType === 'listening') {
              bandScore = convertListeningToBand(correctAnswers);
              testLabel = '🎧 Listening Test Result';
            } else if (trackType === 'reading') {
              bandScore = convertReadingToBand(correctAnswers);
              testLabel = '📖 Reading Test Result';
            }

            return (
              <div className="bg-gradient-to-br from-forest-600 to-emerald-700 rounded-zen shadow-zen-xl p-8 mb-6 text-white relative overflow-hidden animate-fadeInUp stagger-1" style={{ animationFillMode: 'both' }}>
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl translate-x-1/3 -translate-y-1/3" />
                <div className="absolute bottom-0 left-0 w-48 h-48 bg-black/10 rounded-full blur-3xl -translate-x-1/3 translate-y-1/3" />
                
                <div className="relative z-10 text-center">
                  <div className="inline-flex p-3 bg-white/10 backdrop-blur rounded-2xl mb-4">
                    <Award className="w-10 h-10 text-emerald-100" />
                  </div>
                  <h2 className="text-2xl font-bold mb-6">{testLabel}</h2>

                  {isPartialWriting && bandScore !== null ? (
                    <>
                      {/* Writing Test: Show Task Scores and Final Band */}
                      <div className="mb-6 flex flex-col items-center">
                        <p className="text-emerald-100 text-xs font-bold uppercase tracking-widest mb-4">Task Band Scores</p>
                        <div className="flex items-center justify-center gap-6 bg-white/10 backdrop-blur rounded-2xl p-6 border border-white/10">
                          <div className="text-center">
                            <div className="text-4xl font-bold text-white mb-1">
                              {typeof submission.marks?.['task1'] === 'number' ? submission.marks['task1'].toFixed(1) : '--'}
                            </div>
                            <p className="text-emerald-200 text-xs font-medium uppercase">Task 1</p>
                          </div>
                          <div className="text-emerald-300 text-2xl font-light">+</div>
                          <div className="text-center">
                            <div className="text-4xl font-bold text-white mb-1">
                              {typeof submission.marks?.['task2'] === 'number' ? submission.marks['task2'].toFixed(1) : '--'}
                            </div>
                            <p className="text-emerald-200 text-xs font-medium uppercase">Task 2</p>
                          </div>
                        </div>
                      </div>

                      <div className="border-t border-white/20 pt-6 mt-2 max-w-md mx-auto">
                        <p className="text-emerald-100 text-xs font-bold uppercase tracking-widest mb-2">Final IELTS Band Score</p>
                        <div className="text-7xl font-bold text-white mb-2 tracking-tighter">
                          {bandScore.toFixed(1)}
                        </div>
                        <p className="text-emerald-200/80 text-xs font-medium bg-black/10 inline-block px-3 py-1 rounded-full mt-2">
                          Formula: (Task 1 + Task 2 × 2) ÷ 3
                        </p>
                      </div>
                    </>
                  ) : (
                    <>
                      {/* Listening/Reading Test: Show Raw Score and Band */}
                      <div className="mb-8">
                        <p className="text-emerald-100 text-xs font-bold uppercase tracking-widest mb-3">Raw Score</p>
                        <div className="text-6xl font-bold text-white mb-2 tracking-tighter">
                          {correctAnswers}<span className="text-3xl text-emerald-200/70 ml-1">/{totalQuestions}</span>
                        </div>
                        <p className="text-emerald-100 text-sm font-medium">
                          {correctAnswers} out of {totalQuestions} correct answers
                        </p>
                      </div>

                      {/* Band Score Display - Only for Listening/Reading */}
                      {bandScore !== null && (
                        <div className="border-t border-white/20 pt-6 max-w-md mx-auto">
                          <p className="text-emerald-100 text-xs font-bold uppercase tracking-widest mb-3">IELTS Band Score</p>
                          <div className="text-7xl font-bold text-white tracking-tighter">
                            {bandScore.toFixed(1)}
                          </div>
                        </div>
                      )}

                      {/* Percentage Display - For non-band score tests */}
                      {bandScore === null && (
                        <div className="border-t border-white/20 pt-6 max-w-md mx-auto">
                          <p className="text-emerald-100 text-xs font-bold uppercase tracking-widest mb-3">Percentage</p>
                          <div className="text-7xl font-bold text-white tracking-tighter">
                            {submission.manualScore}%
                          </div>
                        </div>
                      )}
                    </>
                  )}
                </div>
              </div>
            );
          })()
        )}

        {/* Section-wise Performance - Only for Partial Tests */}
        {submission.testType !== 'mock' && (
          <>
            <div className="zen-card mb-6 animate-fadeInUp stagger-2" style={{ animationFillMode: 'both' }}>
              <div className="flex items-center gap-2 mb-6">
                <BarChart3 className="w-5 h-5 text-forest-600" />
                <h3 className="text-lg font-bold text-midnight-800">Task-wise Performance</h3>
              </div>
              <div className="space-y-6">
                {sectionStats.map((section, idx) => (
                  <div key={idx}>
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-3">
                        <span className="font-semibold text-midnight-800">{section.section}</span>
                        {submission.trackType === 'writing' ? (
                          <span className="text-xs text-slate-500 font-medium bg-slate-50 px-2 py-0.5 rounded-md">
                            {section.section === 'Task 1' ? 'Letter or Description' : 'Essay or Argument'}
                          </span>
                        ) : (
                          <span className="text-xs text-slate-500 font-medium bg-slate-50 px-2 py-0.5 rounded-md">
                            Questions {idx * 10 + 1}-{idx * 10 + 10}
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-4">
                        {submission.trackType === 'writing' ? (
                          <>
                            <span className="text-sm font-bold text-forest-600">
                              {section.band !== null && typeof section.band === 'number' ? (
                                section.band.toFixed(1)
                              ) : (
                                '--'
                              )}
                            </span>
                            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Band Score</span>
                          </>
                        ) : (
                          <>
                            <span className="text-sm font-semibold text-midnight-800">
                              {section.correct}/{section.total}
                            </span>
                            <span className="text-sm font-bold text-forest-600">
                              {section.percentage}%
                            </span>
                          </>
                        )}
                      </div>
                    </div>
                    <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden">
                      <div
                        className="bg-forest-500 h-2.5 rounded-full transition-all"
                        style={{ width: `${submission.trackType === 'writing' ? (section.band && typeof section.band === 'number' ? (section.band / 9) * 100 : 0) : section.percentage}%` }}
                      ></div>
                    </div>
                    {submission.trackType !== 'writing' && (
                      <div className="flex items-center gap-4 mt-2.5 text-xs font-medium text-slate-500">
                        <span className="flex items-center gap-1.5">
                          <CheckCircle className="w-3.5 h-3.5 text-emerald-500" />
                          {section.correct} Correct
                        </span>
                        <span className="flex items-center gap-1.5">
                          <XCircle className="w-3.5 h-3.5 text-red-500" />
                          {section.incorrect} Incorrect
                        </span>
                        {section.unanswered > 0 && (
                          <span className="flex items-center gap-1.5">
                            <Clock className="w-3.5 h-3.5 text-slate-400" />
                            {section.unanswered} Unanswered
                          </span>
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Performance Radar Chart */}
            <div className="zen-card mb-6 animate-fadeInUp stagger-3" style={{ animationFillMode: 'both' }}>
              <div className="flex items-center gap-2 mb-6">
                <Activity className="w-5 h-5 text-forest-600" />
                <h3 className="text-lg font-bold text-midnight-800">Performance Overview</h3>
              </div>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart data={radarData}>
                    <PolarGrid stroke="#e2e8f0" />
                    <PolarAngleAxis dataKey="subject" tick={{ fill: '#64748b', fontSize: 12, fontWeight: 500 }} />
                    <PolarRadiusAxis angle={90} domain={[0, 100]} tick={{ fill: '#94a3b8' }} />
                    <Radar
                      name="Score"
                      dataKey="score"
                      stroke="#1A7D52"
                      fill="#1A7D52"
                      fillOpacity={0.4}
                    />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
              <p className="text-sm font-medium text-slate-500 mt-4 text-center">
                Radar chart showing your performance across all four sections
              </p>
            </div>
          </>
        )}

        {/* Print Footer */}
        <div className="hidden print:block mt-12 pt-6 border-t border-gray-300 text-center text-sm text-gray-600">
          <p>Generated on {format(new Date(), 'MMMM dd, yyyy HH:mm')}</p>
          <p className="mt-2">Student: {submission.studentName} ({submission.studentId})</p>
        </div>
      </main>

      {/* Printable Result Modal */}
      {showPrintPreview && (
        <PrintableResult
          submission={submission}
          onClose={() => setShowPrintPreview(false)}
        />
      )}
    </div>
  );
}
