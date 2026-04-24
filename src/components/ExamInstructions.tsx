import React from 'react';
import { Headphones, BookOpen, PenTool, Clock, FileText, CheckSquare, ChevronRight } from 'lucide-react';

interface ExamInstructionsProps {
  examType: 'listening' | 'reading' | 'writing';
  onStart: () => void;
}

export function ExamInstructions({ examType, onStart }: ExamInstructionsProps) {
  const getConfig = () => {
    switch (examType) {
      case 'listening':
        return {
          icon: <Headphones className="w-8 h-8 text-indigo-600" />,
          title: 'Listening',
          duration: '40 minutes',
          color: 'indigo',
          bgLight: 'bg-indigo-50',
          borderLight: 'border-indigo-100',
          textDark: 'text-indigo-900',
          textMain: 'text-indigo-600',
        };
      case 'reading':
        return {
          icon: <BookOpen className="w-8 h-8 text-forest-600" />,
          title: 'Reading',
          duration: '1 hour',
          color: 'forest',
          bgLight: 'bg-forest-50',
          borderLight: 'border-forest-100',
          textDark: 'text-forest-900',
          textMain: 'text-forest-600',
        };
      case 'writing':
        return {
          icon: <PenTool className="w-8 h-8 text-amber-600" />,
          title: 'Writing',
          duration: '1 hour',
          color: 'amber',
          bgLight: 'bg-amber-50',
          borderLight: 'border-amber-100',
          textDark: 'text-amber-900',
          textMain: 'text-amber-600',
        };
    }
  };

  const config = getConfig();

  const renderListeningInstructions = () => (
    <>
      <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm">
        <h3 className="text-lg font-bold text-midnight-900 mb-4 flex items-center gap-2">
          <FileText className={`w-5 h-5 ${config.textMain}`} />
          Official Instructions to Candidates
        </h3>
        <ul className="space-y-3 text-slate-700 text-sm">
          {[
            'Do not open this question paper until you are told to do so.',
            'Write your name and candidate number in the spaces at the top of this page.',
            'Listen carefully to the instructions for each part of the test.',
            'Answer all the questions.',
            'While you are listening, write your answers on the question paper.',
            'You will have 10 minutes at the end of the test to transfer your answers to the answer sheet.',
            'Use a pencil.',
            'At the end of the test, hand in this question paper.'
          ].map((text, i) => (
            <li key={i} className="flex items-start gap-3">
              <span className={`${config.textMain} font-bold mt-0.5`}>•</span>
              <span>{text}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className={`${config.bgLight} rounded-2xl p-6 border ${config.borderLight}`}>
        <h3 className={`text-lg font-bold ${config.textDark} mb-4 flex items-center gap-2`}>
          <CheckSquare className={`w-5 h-5 ${config.textMain}`} />
          Information for Candidates
        </h3>
        <ul className={`space-y-3 ${config.textDark} text-sm opacity-90`}>
          {[
            'The test consists of four parts.',
            'You will hear each part once only.',
            'There are 40 questions in total.',
            'Each question carries one mark.',
            'Before each part, you will have time to read the questions.',
            'After each part, you will have time to check your answers.'
          ].map((text, i) => (
            <li key={i} className="flex items-start gap-3">
              <span className={`${config.textMain} font-bold mt-0.5`}>•</span>
              <span>{text}</span>
            </li>
          ))}
        </ul>
      </div>
    </>
  );

  const renderReadingInstructions = () => (
    <>
      <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm">
        <h3 className="text-lg font-bold text-midnight-900 mb-4 flex items-center gap-2">
          <FileText className={`w-5 h-5 ${config.textMain}`} />
          Official Instructions to Candidates
        </h3>
        <ul className="space-y-3 text-slate-700 text-sm">
          {[
            'Do not open this question paper until you are told to do so.',
            'Write your name and candidate number in the spaces at the top of this page.',
            'Read the instructions for each section carefully.',
            'Answer all the questions.',
            'Write your answers on the answer sheet.',
            'Use a pencil.',
            'You must complete the test within the given time limit.',
            'At the end of the test, hand in both the question paper and the answer sheet.'
          ].map((text, i) => (
            <li key={i} className="flex items-start gap-3">
              <span className={`${config.textMain} font-bold mt-0.5`}>•</span>
              <span>{text}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className={`${config.bgLight} rounded-2xl p-6 border ${config.borderLight}`}>
        <h3 className={`text-lg font-bold ${config.textDark} mb-4 flex items-center gap-2`}>
          <CheckSquare className={`w-5 h-5 ${config.textMain}`} />
          Information for Candidates
        </h3>
        <ul className={`space-y-3 ${config.textDark} text-sm opacity-90`}>
          {[
            'There are 40 questions in total.',
            'Each question carries one mark.',
            'You must fill in the answer sheet.',
            <React.Fragment key="rs">To view the answer sheet, click <span className={`font-semibold bg-white px-2 py-0.5 rounded shadow-sm border ${config.borderLight}`}>VIEW ANSWER SHEET</span> at the bottom of the screen.</React.Fragment>
          ].map((text, i) => (
            <li key={i} className="flex items-start gap-3">
              <span className={`${config.textMain} font-bold mt-0.5`}>•</span>
              <span>{text}</span>
            </li>
          ))}
        </ul>
      </div>
    </>
  );

  const renderWritingInstructions = () => (
    <>
      <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm">
        <h3 className="text-lg font-bold text-midnight-900 mb-4 flex items-center gap-2">
          <FileText className={`w-5 h-5 ${config.textMain}`} />
          Official Instructions to Candidates
        </h3>
        <ul className="space-y-3 text-slate-700 text-sm">
          {[
            'Do not open this question paper until you are told to do so.',
            'Write your name and candidate number in the spaces at the top of this page.',
            'Read the instructions for each task carefully.',
            'Answer both tasks.',
            'Write at least 150 words for Task 1.',
            'Write at least 250 words for Task 2.',
            'Write your answers in the answer booklet.',
            'Write clearly using pen or pencil.',
            'You may make corrections, but ensure your writing remains clear and readable.',
            'At the end of the test, hand in both the question paper and the answer booklet.'
          ].map((text, i) => (
            <li key={i} className="flex items-start gap-3">
              <span className={`${config.textMain} font-bold mt-0.5`}>•</span>
              <span>{text}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className={`${config.bgLight} rounded-2xl p-6 border ${config.borderLight}`}>
        <h3 className={`text-lg font-bold ${config.textDark} mb-4 flex items-center gap-2`}>
          <CheckSquare className={`w-5 h-5 ${config.textMain}`} />
          Information for Candidates
        </h3>
        <ul className={`space-y-3 ${config.textDark} text-sm opacity-90`}>
          {[
            'There are two tasks on this paper.',
            'Task 2 contributes twice as much to the Writing score as Task 1.',
            <React.Fragment key="ws">Click <span className={`font-semibold bg-white px-2 py-0.5 rounded shadow-sm border ${config.borderLight}`}>SUBMIT ESSAYS</span> after completing both tasks.</React.Fragment>
          ].map((text, i) => (
            <li key={i} className="flex items-start gap-3">
              <span className={`${config.textMain} font-bold mt-0.5`}>•</span>
              <span>{text}</span>
            </li>
          ))}
        </ul>
      </div>
    </>
  );

  return (
    <div className="min-h-screen bg-slate-50 py-8 px-4 sm:px-6">
      <div className="max-w-3xl mx-auto space-y-6">
        {/* Header */}
        <div className="bg-white rounded-zen shadow-sm border border-slate-100 p-6 md:p-8 flex flex-col sm:flex-row items-center gap-6 text-center sm:text-left">
          <div className={`w-16 h-16 ${config.bgLight} rounded-2xl flex items-center justify-center flex-shrink-0 border ${config.borderLight}`}>
            {config.icon}
          </div>
          <div className="flex-1">
            <h1 className="text-2xl md:text-3xl font-bold text-midnight-900 mb-2">
              {config.title} Instructions
            </h1>
            <div className="flex items-center justify-center sm:justify-start gap-2 text-slate-600 font-medium bg-slate-50 w-max mx-auto sm:mx-0 px-3 py-1.5 rounded-lg border border-slate-200">
              <Clock className="w-4 h-4 text-slate-500" />
              <span>Time: {config.duration}</span>
            </div>
          </div>
        </div>

        {/* Instructions Content */}
        <div className="space-y-6">
          {examType === 'listening' && renderListeningInstructions()}
          {examType === 'reading' && renderReadingInstructions()}
          {examType === 'writing' && renderWritingInstructions()}
          
          <div className="bg-slate-50 rounded-xl p-4 border border-slate-200 text-center">
            <p className="text-xs text-slate-500 font-medium">
              Source: British Council {config.title} Test Format
            </p>
          </div>
        </div>

        {/* Start Button */}
        <div className="pt-4 pb-8 sticky bottom-0 bg-gradient-to-t from-slate-50 via-slate-50 to-transparent">
          <button
            onClick={onStart}
            data-testid={`start-${examType}-test-button`}
            className="btn-forest w-full py-4 text-lg shadow-xl shadow-forest-900/10"
          >
            <span>Start {config.title} Test</span>
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
