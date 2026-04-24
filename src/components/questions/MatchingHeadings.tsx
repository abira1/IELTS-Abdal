import React, { useState } from 'react';

interface MatchingHeadingsProps {
  instruction: string;
  items: Array<{
    questionNumber: number;
    label: string;
  }>;
  headingOptions: Array<{
    label: string;
    value: string;
    content?: string;
  }>;
  answers: Record<number, string>;
  onAnswerChange: (questionNumber: number, value: string) => void;
  disabled?: boolean;
}

export function MatchingHeadings({
  instruction,
  items,
  headingOptions,
  answers,
  onAnswerChange,
  disabled = false
}: MatchingHeadingsProps) {
  const [hoveredQuestion, setHoveredQuestion] = useState<number | null>(null);

  const handleDragOver = (e: React.DragEvent, questionNumber: number) => {
    if (disabled) return;
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    setHoveredQuestion(questionNumber);
  };

  const handleDragLeave = () => {
    setHoveredQuestion(null);
  };

  const handleDrop = (e: React.DragEvent, questionNumber: number) => {
    if (disabled) return;
    e.preventDefault();
    const headingValue = e.dataTransfer.getData('text/plain');
    if (headingValue) {
      onAnswerChange(questionNumber, headingValue);
    }
    setHoveredQuestion(null);
  };

  const handleRemove = (questionNumber: number) => {
    if (disabled) return;
    onAnswerChange(questionNumber, '');
  };

  const isHeadingUsed = (headingValue: string) => {
    return items.some(item => answers[item.questionNumber] === headingValue);
  };

  return (
    <div className="space-y-4">
      <div className="bg-purple-50 border-l-4 border-purple-500 p-3 rounded-r">
        <p className="text-sm text-gray-700 font-medium">{instruction}</p>
      </div>

      <div className="space-y-5">
        {items.map((item) => (
          <div key={item.questionNumber} className="space-y-2">
            {/* Question Number and Label */}
            <div className="flex items-start gap-3">
              <span className="text-gray-700 font-bold text-lg flex-shrink-0 pt-1">
                ({item.questionNumber})
              </span>
              <span className="text-gray-800 font-medium text-sm pt-1">{item.label}</span>
            </div>
            
            {/* Drop Zone Placeholder */}
            <div
              onDragOver={(e) => handleDragOver(e, item.questionNumber)}
              onDragLeave={handleDragLeave}
              onDrop={(e) => handleDrop(e, item.questionNumber)}
              className={`min-h-[50px] border-2 border-dashed rounded-lg p-3 transition-all ml-0 ${
                hoveredQuestion === item.questionNumber
                  ? 'border-orange-500 bg-orange-100'
                  : 'border-gray-400 bg-white'
              } ${disabled ? 'cursor-not-allowed opacity-60' : 'cursor-pointer'}`}
              data-testid={`drop-zone-${item.questionNumber}`}
            >
              {answers[item.questionNumber] ? (
                <div className="flex items-center justify-between bg-orange-200 border border-orange-400 rounded px-3 py-2">
                  <span className="text-lg font-bold text-orange-900 w-12 text-center">
                    {answers[item.questionNumber]}
                  </span>
                  {!disabled && (
                    <button
                      onClick={() => handleRemove(item.questionNumber)}
                      className="text-red-600 hover:text-red-800 font-bold text-lg ml-2"
                      data-testid={`remove-answer-${item.questionNumber}`}
                    >
                      ×
                    </button>
                  )}
                </div>
              ) : (
                <p className="text-gray-400 text-sm text-center py-2">
                  {disabled ? 'No answer' : 'Drop letter here'}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
