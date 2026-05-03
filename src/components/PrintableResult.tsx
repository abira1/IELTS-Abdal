import React from 'react';
import { ExamSubmission } from '../utils/storage';
import { allTracks } from '../data/tracks';
import { convertListeningToBand, convertReadingToBand } from '../utils/bandScoreConversion';

interface PrintableResultProps {
  submission: ExamSubmission;
  onClose: () => void;
}

export const PrintableResult: React.FC<PrintableResultProps> = ({ submission, onClose }) => {
  const track = allTracks.find(t => t.id === submission.trackId);
  const isMockTest = submission.testType === 'mock' && submission.overallBand !== undefined;
  
  // Calculate section-wise scores
  const calculateSectionStats = () => {
    let section1 = 0, section2 = 0, section3 = 0, section4 = 0;
    let correct = 0;
    const totalQs = submission.totalQuestions || 40;
    const isWriting = submission.trackType === 'writing' && totalQs === 2;

    if (submission.marks) {
      if (isWriting) {
        // For writing (both partial and mock), marks are BAND SCORES (numbers 0-9)
        // Find task keys (may include track prefix like "track-w-1-task1")
        const markKeys = Object.keys(submission.marks);
        const task1Key = markKeys.find(key => key.includes('task1')) || 'task1';
        const task2Key = markKeys.find(key => key.includes('task2')) || 'task2';
        
        // Count marked tasks (non-null band scores)
        const task1Mark = submission.marks[task1Key];
        const task2Mark = submission.marks[task2Key];
        if (task1Mark !== null && task1Mark !== undefined && typeof task1Mark === 'number') correct++;
        if (task2Mark !== null && task2Mark !== undefined && typeof task2Mark === 'number') correct++;
      } else {
        // For reading/listening tracks with numbered questions
        for (let i = 1; i <= totalQs; i++) {
          if (submission.marks[i] === 'correct') {
            correct++;
            if (i <= 10) section1++;
            else if (i <= 20) section2++;
            else if (i <= 30) section3++;
            else section4++;
          }
        }
      }
    }

    return { section1, section2, section3, section4, correct };
  };

  const stats = calculateSectionStats();
  const totalQs = submission.totalQuestions || 40;
  const percentage = submission.manualScore || Math.round((stats.correct / totalQs) * 100);

  // Helper function for band score interpretation
  const getBandInterpretation = (band: number): string => {
    if (band >= 8.5) return "Excellent! Very good command of English with effective handling of complex language.";
    if (band >= 7.5) return "Very Good! High level of operational command with occasional errors.";
    if (band >= 6.5) return "Good! Generally effective command of the language despite some inaccuracies.";
    if (band >= 5.5) return "Competent! Partial command of the language, handles overall meaning in most situations.";
    if (band >= 4.5) return "Basic! Limited ability with potential communication breakdowns.";
    return "Keep practicing! There's room for improvement in English language skills.";
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Non-printable controls */}
        <div className="print:hidden bg-[#F5F3EF] p-4 flex justify-between items-center border-b border-[#0F3D2E]/20 sticky top-0 z-10">
          <h2 className="text-lg font-bold text-[#1F2A44]">Print Preview</h2>
          <div className="flex gap-3">
            <button
              onClick={handlePrint}
              className="px-6 py-2 bg-[#0F3D2E] text-white rounded-xl hover:bg-[#0a2a1f] transition-colors font-semibold"
            >
              🖨️ Print Result
            </button>
            <button
              onClick={onClose}
              className="px-6 py-2 bg-slate-500 text-white rounded-xl hover:bg-slate-600 transition-colors font-semibold"
            >
              Close
            </button>
          </div>
        </div>

        {/* Printable content */}
        <div className="p-8 bg-[#F5F3EF]" id="printable-result">
          {/* Header with Logo */}
          <div className="flex items-start justify-between mb-6 pb-6 border-b-4 border-[#0F3D2E]">
            <div className="flex items-center gap-4">
              <img
                src="/abdal-ielts-academy-logo.png"
                alt="IELTS Abdal"
                className="h-20 w-20 object-contain print-logo"
              />
              <div>
                <h1 className="text-3xl font-bold text-[#1F2A44] uppercase tracking-wide print-title">IELTS Abdal</h1>
                <p className="text-lg text-[#0F3D2E] font-bold print-subtitle">Student Performance Report</p>
                <p className="text-sm text-slate-600 mt-1 uppercase tracking-wider">Official Exam Results</p>
              </div>
            </div>
            <div className="text-right">
              <div className="bg-white px-4 py-3 rounded-xl border-2 border-[#0F3D2E]">
                <p className="text-xs text-slate-700 mb-2 uppercase tracking-wider font-bold">Report Date</p>
                <p className="text-sm font-bold text-[#1F2A44]">
                  {new Date().toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </p>
              </div>
            </div>
          </div>

          {/* Student Information */}
          <div className="grid grid-cols-2 gap-4 mb-6 info-section">
            <div className="bg-white p-4 rounded-xl border-2 border-[#0F3D2E]">
              <h3 className="text-sm font-bold text-[#1F2A44] mb-3 uppercase tracking-wider border-b-2 border-[#0F3D2E] pb-2">Student Information</h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-slate-700 font-semibold">Student ID:</span>
                  <span className="text-sm font-bold text-[#1F2A44]">{submission.studentId}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-slate-700 font-semibold">Name:</span>
                  <span className="text-sm font-bold text-[#1F2A44]">{submission.studentName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-slate-700 font-semibold">Batch:</span>
                  <span className="text-sm font-bold text-[#1F2A44]">{submission.batchId || 'N/A'}</span>
                </div>
              </div>
            </div>

            <div className="bg-white p-4 rounded-xl border-2 border-[#0F3D2E]">
              <h3 className="text-sm font-bold text-[#1F2A44] mb-3 uppercase tracking-wider border-b-2 border-[#0F3D2E] pb-2">Exam Information</h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-slate-700 font-semibold">Exam Code:</span>
                  <span className="text-sm font-bold text-[#1F2A44]">{submission.examCode || 'N/A'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-slate-700 font-semibold">Track:</span>
                  <span className="text-sm font-bold text-[#1F2A44]">{track?.name || submission.trackName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-slate-700 font-semibold">Date:</span>
                  <span className="text-sm font-bold text-[#1F2A44]">
                    {new Date(submission.submittedAt).toLocaleDateString()}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Overall Score - Mock Test vs Partial Test */}
          {isMockTest ? (
            <>
              {/* Mock Test Band Score Display */}
              <div className="bg-white p-6 rounded-2xl border-4 border-[#0F3D2E] mb-6 overall-band-section">
                <div className="text-center">
                  <h3 className="text-xl font-bold mb-4 text-[#1F2A44] uppercase tracking-wide">IELTS Mock Test Result</h3>
                  <div className="mb-4 py-6 border-y-2 border-[#0F3D2E]/20">
                    <p className="text-sm text-slate-700 mb-3 uppercase tracking-wider font-semibold">Overall Band Score</p>
                    <div className="text-9xl font-bold mb-2 text-[#0F3D2E] overall-band-score">
                      {submission.overallBand!.toFixed(1)}
                    </div>
                  </div>
                  <div className="mt-4">
                    <p className="text-sm text-slate-700 italic">
                      {getBandInterpretation(submission.overallBand!)}
                    </p>
                  </div>
                </div>
              </div>

              {/* Section Band Scores */}
              <div className="mb-6 section-bands">
                <h3 className="text-lg font-semibold text-[#1F2A44] mb-4 pb-2 border-b-2 border-[#0F3D2E] uppercase tracking-wide">
                  Section Band Scores
                </h3>
                <div className="grid grid-cols-4 gap-3">
                  <div className="bg-white border-2 border-[#0F3D2E] rounded-xl p-4 text-center">
                    <h4 className="text-xs font-bold text-slate-700 mb-3 uppercase tracking-wider">Listening</h4>
                    <div className="text-5xl font-bold text-[#0F3D2E] py-2 section-band-value">
                      {submission.sectionScores?.listening?.toFixed(1) || '--'}
                    </div>
                    <p className="text-xs text-slate-600 uppercase tracking-wider">Band Score</p>
                  </div>

                  <div className="bg-white border-2 border-[#0F3D2E] rounded-xl p-4 text-center">
                    <h4 className="text-xs font-bold text-slate-700 mb-3 uppercase tracking-wider">Reading</h4>
                    <div className="text-5xl font-bold text-[#0F3D2E] py-2 section-band-value">
                      {submission.sectionScores?.reading?.toFixed(1) || '--'}
                    </div>
                    <p className="text-xs text-slate-600 uppercase tracking-wider">Band Score</p>
                  </div>

                  <div className="bg-white border-2 border-[#0F3D2E] rounded-xl p-4 text-center">
                    <h4 className="text-xs font-bold text-slate-700 mb-3 uppercase tracking-wider">Writing</h4>
                    <div className="text-5xl font-bold text-[#0F3D2E] py-2 section-band-value">
                      {submission.sectionScores?.writing?.toFixed(1) || '--'}
                    </div>
                    <p className="text-xs text-slate-600 uppercase tracking-wider">Band Score</p>
                  </div>

                  <div className="bg-white border-2 border-[#0F3D2E] rounded-xl p-4 text-center">
                    <h4 className="text-xs font-bold text-slate-700 mb-3 uppercase tracking-wider">Speaking</h4>
                    <div className="text-5xl font-bold text-[#0F3D2E] py-2 section-band-value">
                      {submission.sectionScores?.speaking?.toFixed(1) || '--'}
                    </div>
                    <p className="text-xs text-slate-600 uppercase tracking-wider">Band Score</p>
                  </div>
                </div>
              </div>

              {/* Performance Indicator - Simplified */}
              <div className="bg-white p-4 rounded-xl border-2 border-[#0F3D2E] mb-6 performance-section">
                <h4 className="text-sm font-bold text-[#1F2A44] mb-3 uppercase tracking-wider">
                  Performance Level
                </h4>
                <div className="bg-[#F5F3EF] rounded-lg h-4 overflow-hidden border-2 border-[#0F3D2E]">
                  <div
                    className="h-full bg-[#0F3D2E]"
                    style={{ width: `${(submission.overallBand! / 9) * 100}%` }}
                  ></div>
                </div>
                <div className="flex justify-between text-xs text-slate-700 mt-2 font-semibold">
                  <span>0.0</span>
                  <span className="text-base text-[#0F3D2E] font-bold">Band {submission.overallBand!.toFixed(1)}</span>
                  <span>9.0</span>
                </div>
              </div>
            </>
          ) : (
            <>
              {/* Partial Test Score Display */}
              {(() => {
                const trackType = submission.trackType;
                const totalQs = submission.totalQuestions || 40;
                const isWriting = trackType === 'writing' && totalQs === 2;
                let bandScore: number | null = null;
                let testLabel = 'Overall Score';
                let displayType: 'band' | 'percentage' = 'percentage';

                if (isWriting) {
                  // For writing tests, show band score calculated from tasks
                  bandScore = submission.writingBandScore || null;
                  // Calculate band score from task marks if not available
                  if (bandScore === null && submission.marks) {
                    const task1 = typeof submission.marks['task1'] === 'number' ? submission.marks['task1'] : null;
                    const task2 = typeof submission.marks['task2'] === 'number' ? submission.marks['task2'] : null;
                    if (task1 !== null && task2 !== null) {
                      bandScore = Math.round(((task1 + task2 * 2) / 3) * 2) / 2;
                    }
                  }
                  testLabel = 'Writing Test - Student Performance Report';
                  displayType = 'band';
                } else if (trackType === 'listening') {
                  bandScore = convertListeningToBand(stats.correct);
                  testLabel = 'Listening Test Result';
                  displayType = 'band';
                } else if (trackType === 'reading') {
                  bandScore = convertReadingToBand(stats.correct);
                  testLabel = 'Reading Test Result';
                  displayType = 'band';
                }

                return (
                  <div className="bg-white p-6 rounded-2xl border-4 border-[#0F3D2E] mb-6 partial-test-section">
                    <div className="text-center">
                      <h3 className="text-lg font-bold text-[#1F2A44] mb-4 uppercase tracking-wide">{testLabel}</h3>

                      {displayType === 'band' && bandScore !== null ? (
                        <>
                          {/* For Writing: Show Final Band Score and Grading Info */}
                          {isWriting && (
                            <>
                              {/* Final Band Score */}
                              <div className="mb-6 pb-6 border-b border-[#0F3D2E]/20">
                                <p className="text-sm text-slate-700 mb-4 uppercase tracking-wider font-bold">Final IELTS Band Score</p>
                                <div className="text-8xl font-bold text-[#0F3D2E] mb-2">
                                  {bandScore!.toFixed(1)}
                                </div>
                              </div>

                              {/* Grading Information */}
                              <div>
                                <p className="text-sm text-slate-700 mb-3 uppercase tracking-wider font-bold">Grading Information</p>
                                <div className="space-y-2">
                                  <div className="flex justify-between items-center bg-[#F5F3EF] p-3 rounded-lg border border-[#0F3D2E]/20">
                                    <span className="text-sm text-slate-700 font-semibold">Graded By:</span>
                                    <span className="text-sm font-bold text-[#1F2A44]">N/A</span>
                                  </div>
                                  <div className="flex justify-between items-center bg-[#F5F3EF] p-3 rounded-lg border border-[#0F3D2E]/20">
                                    <span className="text-sm text-slate-700 font-semibold">Total Questions:</span>
                                    <span className="text-sm font-bold text-[#1F2A44]">{totalQs}</span>
                                  </div>
                                  <div className="flex justify-between items-center bg-[#F5F3EF] p-3 rounded-lg border border-[#0F3D2E]/20">
                                    <span className="text-sm text-slate-700 font-semibold">Correct Answers:</span>
                                    <span className="text-sm font-bold text-[#1F2A44]">{stats.correct}</span>
                                  </div>
                                </div>
                              </div>
                            </>
                          )}

                          {/* For Listening/Reading: Show Raw Score and Band */}
                          {!isWriting && (
                            <>
                              <div className="flex items-center justify-center gap-6 mb-4">
                                <div>
                                  <div className="text-6xl font-bold text-[#0F3D2E] mb-1 raw-score">
                                    {stats.correct}<span className="text-3xl text-slate-600">/{totalQs}</span>
                                  </div>
                                  <p className="text-sm text-slate-700 uppercase tracking-wider">
                                    Correct Answers
                                  </p>
                                </div>
                                <div className="h-16 w-px bg-[#0F3D2E]/30"></div>
                                <div>
                                  <div className="text-6xl font-bold text-[#0F3D2E] mb-1 percentage-score">
                                    {percentage}<span className="text-3xl text-slate-600">%</span>
                                  </div>
                                  <p className="text-sm text-slate-700 uppercase tracking-wider">Percentage</p>
                                </div>
                              </div>

                              <div className="border-t-4 border-[#0F3D2E] pt-4 mb-4">
                                <p className="text-sm text-slate-700 mb-2 uppercase tracking-wider font-bold">IELTS Band Score</p>
                                <div className="text-8xl font-bold text-[#0F3D2E] mb-1 partial-band-score">
                                  {bandScore!.toFixed(1)}
                                </div>
                                <p className="text-sm text-slate-700 uppercase tracking-wider">
                                  Official IELTS Band Score
                                </p>
                              </div>
                            </>
                          )}
                        </>
                      ) : (
                        <>
                          {isWriting ? (
                            <>
                              {/* Writing test with no band scores - show message */}
                              <p className="text-lg text-slate-700 mb-4">Pending grading from instructor...</p>
                              <div className="mb-4 pb-4 border-b border-[#0F3D2E]/20">
                                <p className="text-sm text-slate-600 mb-3 uppercase tracking-wider font-semibold">Task Submissions</p>
                                <div className="flex items-center justify-center gap-6">
                                  <div>
                                    <div className="text-2xl font-bold text-[#0F3D2E]">✓</div>
                                    <p className="text-xs text-slate-600 uppercase mt-1">Task 1 Submitted</p>
                                  </div>
                                  <div className="text-[#0F3D2E]/40">+</div>
                                  <div>
                                    <div className="text-2xl font-bold text-[#0F3D2E]">✓</div>
                                    <p className="text-xs text-slate-600 uppercase mt-1">Task 2 Submitted</p>
                                  </div>
                                </div>
                              </div>
                            </>
                          ) : (
                            <>
                              {/* Fallback: Show Raw Score and Percentage for L/R tests */}
                              <div className="flex items-center justify-center gap-6 mb-4">
                                <div>
                                  <div className="text-6xl font-bold text-[#0F3D2E] mb-1 raw-score">
                                    {stats.correct}<span className="text-3xl text-slate-600">/{totalQs}</span>
                                  </div>
                                  <p className="text-sm text-slate-700 uppercase tracking-wider">
                                    Correct Answers
                                  </p>
                                </div>
                                <div className="h-16 w-px bg-[#0F3D2E]/30"></div>
                                <div>
                                  <div className="text-6xl font-bold text-[#0F3D2E] mb-1 percentage-score">
                                    {percentage}<span className="text-3xl text-slate-600">%</span>
                                  </div>
                                  <p className="text-sm text-slate-700 uppercase tracking-wider">Percentage</p>
                                </div>
                              </div>
                            </>
                          )}
                        </>
                      )}

                      {/* Performance Band */}
                      <div className="mt-4">
                        <div className="bg-[#F5F3EF] rounded-lg h-3 overflow-hidden border-2 border-[#0F3D2E]">
                          <div
                            className="h-full bg-[#0F3D2E]"
                            style={{ width: `${displayType === 'band' && bandScore !== null ? (bandScore / 9) * 100 : percentage}%` }}
                          ></div>
                        </div>
                        <p className="text-sm text-[#1F2A44] mt-2 font-semibold">
                          Performance: {
                            displayType === 'band' && bandScore !== null
                              ? bandScore >= 8.5 ? 'Excellent' :
                                bandScore >= 7.5 ? 'Very Good' :
                                bandScore >= 6.5 ? 'Good' :
                                bandScore >= 5.5 ? 'Competent' :
                                bandScore >= 4.5 ? 'Basic' : 'Needs Improvement'
                              : percentage >= 90 ? 'Excellent' :
                                percentage >= 75 ? 'Very Good' :
                                percentage >= 60 ? 'Good' :
                                percentage >= 50 ? 'Satisfactory' :
                                'Needs Improvement'
                          }
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })()}
            </>
          )}

          {/* Section-wise Breakdown - Only for Partial Listening/Reading Tests */}
          {!isMockTest && submission.trackType !== 'writing' && (
            <div className="mb-6 section-breakdown">
              <h3 className="text-base font-bold text-[#1F2A44] mb-4 pb-2 border-b-2 border-[#0F3D2E] uppercase tracking-wide">
                Section-wise Performance
              </h3>
              <div className="grid grid-cols-4 gap-3">
                {[
                  { title: 'Section 1', range: 'Q1-10', score: stats.section1 },
                  { title: 'Section 2', range: 'Q11-20', score: stats.section2 },
                  { title: 'Section 3', range: 'Q21-30', score: stats.section3 },
                  { title: 'Section 4', range: 'Q31-40', score: stats.section4 }
                ].map((section, idx) => (
                  <div key={idx} className="bg-white border-2 border-[#0F3D2E] rounded-xl p-3 text-center">
                    <h4 className="text-xs font-bold text-[#1F2A44] mb-1 uppercase tracking-wider">{section.title}</h4>
                    <p className="text-xs text-slate-600 mb-2">{section.range}</p>
                    <div className="text-2xl font-bold text-[#0F3D2E] section-score">
                      {section.score}<span className="text-sm text-slate-600">/10</span>
                    </div>
                    <div className="mt-2 bg-[#F5F3EF] rounded-full h-1.5 overflow-hidden border border-[#0F3D2E]">
                      <div
                        className="bg-[#0F3D2E] h-full"
                        style={{ width: `${(section.score / 10) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Task-wise Breakdown - Only for Writing Tests */}
          {!isMockTest && submission.trackType === 'writing' && (
            <div className="mb-6 section-breakdown">
              <h3 className="text-base font-bold text-[#1F2A44] mb-4 pb-2 border-b-2 border-[#0F3D2E] uppercase tracking-wide">
                Task-wise Performance
              </h3>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { 
                    title: 'Task 1', 
                    description: 'Letter / Description',
                    band: typeof submission.marks?.['task1'] === 'number' ? submission.marks['task1'].toFixed(1) : '--'
                  },
                  { 
                    title: 'Task 2', 
                    description: 'Essay / Argument',
                    band: typeof submission.marks?.['task2'] === 'number' ? submission.marks['task2'].toFixed(1) : '--'
                  }
                ].map((task, idx) => (
                  <div key={idx} className="bg-white border-2 border-[#0F3D2E] rounded-xl p-4 text-center">
                    <h4 className="text-xs font-bold text-[#1F2A44] mb-1 uppercase tracking-wider">{task.title}</h4>
                    <p className="text-xs text-slate-600 mb-3">{task.description}</p>
                    <div className="text-3xl font-bold text-[#0F3D2E] section-score">
                      {task.band}
                    </div>
                    <p className="text-xs text-slate-600 mt-1">Band Score</p>
                    <div className="mt-2 bg-[#F5F3EF] rounded-lg h-2 overflow-hidden border border-[#0F3D2E]">
                      <div
                        className="bg-[#0F3D2E] h-full"
                        style={{ width: task.band !== '--' ? `${(parseFloat(task.band) / 9) * 100}%` : '0%' }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Additional Information */}
          <div className="grid grid-cols-2 gap-4 mb-6 additional-info">
            <div className="bg-white p-4 rounded-xl border-2 border-[#0F3D2E]">
              <h4 className="text-sm font-bold text-[#1F2A44] mb-3 uppercase tracking-wider border-b-2 border-[#0F3D2E] pb-2">Submission Details</h4>
              <div className="space-y-2 text-sm">
                <p className="text-slate-700">
                  <span className="font-semibold">Time Spent:</span> <span className="font-bold text-[#1F2A44]">{submission.timeSpent || 'N/A'}</span>
                </p>
                <p className="text-slate-700">
                  <span className="font-semibold">Status:</span> <span className="font-bold text-[#1F2A44]">
                    {submission.resultPublished ? 'Published' : 'Pending'}
                  </span>
                </p>
                {submission.publishedAt && (
                  <p className="text-slate-700">
                    <span className="font-semibold">Published:</span> <span className="font-bold text-[#1F2A44]">
                      {new Date(submission.publishedAt).toLocaleDateString()}
                    </span>
                  </p>
                )}
              </div>
            </div>

            <div className="bg-white p-4 rounded-xl border-2 border-[#0F3D2E]">
              <h4 className="text-sm font-bold text-[#1F2A44] mb-3 uppercase tracking-wider border-b-2 border-[#0F3D2E] pb-2">Grading Information</h4>
              <div className="space-y-2 text-sm">
                <p className="text-slate-700">
                  <span className="font-semibold">Graded By:</span> <span className="font-bold text-[#1F2A44]">{submission.markedBy || 'N/A'}</span>
                </p>
                {isMockTest ? (
                  <>
                    <p className="text-slate-700">
                      <span className="font-semibold">Test Type:</span> <span className="font-bold text-[#1F2A44]">IELTS Mock Test</span>
                    </p>
                    <p className="text-slate-700">
                      <span className="font-semibold">Overall Band:</span> <span className="font-bold text-[#1F2A44]">{submission.overallBand?.toFixed(1)}</span>
                    </p>
                  </>
                ) : (
                  <>
                    <p className="text-slate-700">
                      <span className="font-semibold">Total Questions:</span> <span className="font-bold text-[#1F2A44]">40</span>
                    </p>
                    <p className="text-slate-700">
                      <span className="font-semibold">Correct Answers:</span> <span className="font-bold text-[#1F2A44]">{stats.correct}</span>
                    </p>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Signature Section */}
          <div className="mt-8 pt-6 border-t-4 border-[#0F3D2E] signature-section">
            <div className="grid grid-cols-3 gap-8 text-center">
              <div>
                <div className="border-t-2 border-[#0F3D2E] pt-3 mt-12">
                  <p className="text-sm font-bold text-[#1F2A44] uppercase tracking-wider">Teacher Signature</p>
                  <p className="text-xs text-slate-700 mt-1 font-semibold">
                    {submission.markedBy || 'Examiner'}
                  </p>
                </div>
              </div>
              <div>
                <div className="border-t-2 border-[#0F3D2E] pt-3 mt-12">
                  <p className="text-sm font-bold text-[#1F2A44] uppercase tracking-wider">Date</p>
                  <p className="text-xs text-slate-700 mt-1 font-semibold">
                    {new Date().toLocaleDateString()}
                  </p>
                </div>
              </div>
              <div>
                <div className="border-t-2 border-[#0F3D2E] pt-3 mt-12">
                  <p className="text-sm font-bold text-[#1F2A44] uppercase tracking-wider">Administrator</p>
                  <p className="text-xs text-slate-700 mt-1 font-semibold">IELTS Abdal</p>
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="mt-6 text-center text-xs text-slate-700 border-t-2 border-[#0F3D2E] pt-4 footer-section">
            <p className="mb-1 font-semibold uppercase tracking-wider">This is an official result document from IELTS Abdal</p>
            <p className="text-slate-600">Generated on {new Date().toLocaleString()}</p>
          </div>
        </div>
      </div>

      {/* Print-specific styles */}
      <style>{`
        @media print {
          body * {
            visibility: hidden;
          }
          #printable-result,
          #printable-result * {
            visibility: visible;
          }
          #printable-result {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            padding: 10mm !important;
          }
          .print\\:hidden {
            display: none !important;
          }
          @page {
            size: A4;
            margin: 10mm;
          }

          /* Reduce font sizes for print - BALANCED */
          #printable-result .text-9xl,
          #printable-result .overall-band-score {
            font-size: 4.5rem !important;
            line-height: 1.1 !important;
          }
          #printable-result .text-8xl,
          #printable-result .partial-band-score {
            font-size: 3.5rem !important;
            line-height: 1.1 !important;
          }
          #printable-result .text-6xl,
          #printable-result .raw-score,
          #printable-result .percentage-score {
            font-size: 2.25rem !important;
            line-height: 1.1 !important;
          }
          #printable-result .text-5xl,
          #printable-result .section-band-value {
            font-size: 1.75rem !important;
            line-height: 1.1 !important;
          }
          #printable-result .text-3xl {
            font-size: 1.375rem !important;
            line-height: 1.2 !important;
          }
          #printable-result .text-2xl,
          #printable-result .section-score {
            font-size: 1.125rem !important;
            line-height: 1.2 !important;
          }
          #printable-result .text-xl {
            font-size: 1rem !important;
            line-height: 1.2 !important;
          }
          #printable-result .text-lg {
            font-size: 0.875rem !important;
            line-height: 1.2 !important;
          }
          #printable-result .print-title {
            font-size: 1.375rem !important;
          }
          #printable-result .print-subtitle {
            font-size: 1rem !important;
          }

          /* Reduce padding and margins - BALANCED for readability */
          #printable-result .p-8 {
            padding: 0.75rem !important;
          }
          #printable-result .p-6 {
            padding: 0.625rem !important;
          }
          #printable-result .p-5 {
            padding: 0.5rem !important;
          }
          #printable-result .p-4 {
            padding: 0.5rem !important;
          }
          #printable-result .p-3 {
            padding: 0.375rem !important;
          }
          #printable-result .p-2 {
            padding: 0.25rem !important;
          }
          #printable-result .py-6 {
            padding-top: 0.625rem !important;
            padding-bottom: 0.625rem !important;
          }
          #printable-result .py-4 {
            padding-top: 0.5rem !important;
            padding-bottom: 0.5rem !important;
          }
          #printable-result .py-2 {
            padding-top: 0.375rem !important;
            padding-bottom: 0.375rem !important;
          }
          #printable-result .mb-6 {
            margin-bottom: 0.625rem !important;
          }
          #printable-result .mb-4 {
            margin-bottom: 0.5rem !important;
          }
          #printable-result .mb-3 {
            margin-bottom: 0.375rem !important;
          }
          #printable-result .mb-2 {
            margin-bottom: 0.25rem !important;
          }
          #printable-result .mb-1 {
            margin-bottom: 0.125rem !important;
          }
          #printable-result .mt-12 {
            margin-top: 1.25rem !important;
          }
          #printable-result .mt-8 {
            margin-top: 1rem !important;
          }
          #printable-result .mt-6 {
            margin-top: 0.625rem !important;
          }
          #printable-result .mt-4 {
            margin-top: 0.5rem !important;
          }
          #printable-result .mt-3 {
            margin-top: 0.375rem !important;
          }
          #printable-result .mt-2 {
            margin-top: 0.25rem !important;
          }
          #printable-result .mt-1 {
            margin-top: 0.125rem !important;
          }
          #printable-result .gap-8 {
            gap: 0.625rem !important;
          }
          #printable-result .gap-6 {
            gap: 0.5rem !important;
          }
          #printable-result .gap-4 {
            gap: 0.5rem !important;
          }
          #printable-result .gap-3 {
            gap: 0.375rem !important;
          }
          #printable-result .pb-6 {
            padding-bottom: 0.625rem !important;
          }
          #printable-result .pb-4 {
            padding-bottom: 0.5rem !important;
          }
          #printable-result .pb-2 {
            padding-bottom: 0.25rem !important;
          }
          #printable-result .pb-1 {
            padding-bottom: 0.125rem !important;
          }
          #printable-result .pt-6 {
            padding-top: 0.625rem !important;
          }
          #printable-result .pt-4 {
            padding-top: 0.5rem !important;
          }
          #printable-result .pt-3 {
            padding-top: 0.375rem !important;
          }
          #printable-result .pt-2 {
            padding-top: 0.25rem !important;
          }

          /* Reduce header logo size */
          #printable-result .h-20,
          #printable-result .print-logo {
            height: 2.5rem !important;
          }
          #printable-result .w-20 {
            width: 2.5rem !important;
          }

          /* Optimize section heights */
          #printable-result .h-6 {
            height: 0.75rem !important;
          }
          #printable-result .h-4 {
            height: 0.5rem !important;
          }
          #printable-result .h-3 {
            height: 0.375rem !important;
          }
          #printable-result .h-2 {
            height: 0.25rem !important;
          }
          #printable-result .h-16 {
            height: 3rem !important;
          }
          #printable-result .h-20 {
            height: 3rem !important;
          }

          /* Specific section optimizations - IMPROVED SPACING */
          #printable-result .overall-band-section {
            padding: 0.75rem !important;
            margin-bottom: 0.625rem !important;
          }
          #printable-result .section-bands {
            margin-bottom: 0.625rem !important;
          }
          #printable-result .performance-section {
            padding: 0.5rem !important;
            margin-bottom: 0.625rem !important;
          }
          #printable-result .partial-test-section {
            padding: 0.75rem !important;
            margin-bottom: 0.625rem !important;
          }
          #printable-result .section-breakdown {
            margin-bottom: 0.625rem !important;
          }
          #printable-result .additional-info {
            margin-bottom: 0.625rem !important;
          }
          #printable-result .info-section {
            margin-bottom: 0.625rem !important;
          }
          #printable-result .signature-section {
            margin-top: 1.5rem !important;
            padding-top: 1rem !important;
            margin-bottom: 1rem !important;
          }
          #printable-result .signature-section .mt-12 {
            margin-top: 1.5rem !important;
          }
          #printable-result .signature-section .pt-3 {
            padding-top: 0.5rem !important;
          }
          #printable-result .signature-section .gap-8 {
            gap: 1rem !important;
          }
          #printable-result .footer-section {
            margin-top: 1rem !important;
            padding-top: 0.75rem !important;
          }

          /* Ensure content fits on one page - ADJUSTED */
          #printable-result {
            max-height: 277mm !important;
            overflow: hidden !important;
            font-size: 92% !important;
          }

          /* Reduce border widths for print */
          #printable-result .border-4 {
            border-width: 2px !important;
          }
          #printable-result .border-2 {
            border-width: 1px !important;
          }

          /* Update colors for print compatibility */
          #printable-result {
            background-color: #F5F3EF !important;
          }
          #printable-result .bg-white {
            background-color: #FFFFFF !important;
          }
          #printable-result .border-\[\#0F3D2E\],
          #printable-result [class*="border-\[#0F3D2E\]"] {
            border-color: #0F3D2E !important;
          }
          #printable-result .text-\[\#1F2A44\],
          #printable-result .text-\[\#0F3D2E\],
          #printable-result [class*="text-\[#1F2A44\]"],
          #printable-result [class*="text-\[#0F3D2E\]"] {
            color: inherit !important;
          }
          #printable-result .bg-\[\#F5F3EF\],
          #printable-result [class*="bg-\[#F5F3EF\]"] {
            background-color: #F5F3EF !important;
          }
        }
      `}</style>
    </div>
  );
};
