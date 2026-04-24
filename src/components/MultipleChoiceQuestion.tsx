import React from 'react';
interface MultipleChoiceQuestionProps {
  questionNumber: number;
  question: string;
  options: Array<{
    label: string;
    value: string;
    imageUrl?: string;
  }>;
  selectedAnswer: string;
  onAnswerChange: (questionNumber: number, value: string) => void;
  disabled?: boolean;
}
export function MultipleChoiceQuestion({
  questionNumber,
  question,
  options,
  selectedAnswer,
  onAnswerChange,
  disabled = false
}: MultipleChoiceQuestionProps) {
  const hasImages = options.some(opt => opt.imageUrl);

  return <div className="space-y-4">
      <div className="flex gap-3">
        <span className="font-semibold text-gray-900">({questionNumber})</span>
        <p className="text-gray-900">{question}</p>
      </div>

      <div className={hasImages ? "grid grid-cols-2 gap-4 ml-8" : "space-y-3 ml-8"}>
        {options.map(option => <label key={option.value} className={hasImages ? "flex flex-col items-center gap-2 cursor-pointer group" : "flex items-start gap-3 cursor-pointer group"}>
            <input type="radio" name={`question-${questionNumber}`} value={option.value} checked={selectedAnswer === option.value} onChange={e => onAnswerChange(questionNumber, e.target.value)} className={hasImages ? "w-5 h-5 text-blue-600 border-gray-300 focus:ring-2 focus:ring-blue-500" : "mt-1 w-4 h-4 text-blue-600 border-gray-300 focus:ring-2 focus:ring-blue-500"} />
            {option.imageUrl ? (
              <div className="flex flex-col gap-2 items-center">
                <img src={option.imageUrl} alt={`Option ${option.value}`} className="w-32 h-32 object-cover border-2 border-gray-300 rounded hover:border-blue-500" />
                <span className="text-gray-700 group-hover:text-gray-900 font-bold text-lg">
                  {option.value}
                </span>
              </div>
            ) : (
              <span className="text-gray-700 group-hover:text-gray-900">
                <strong>{option.value}.</strong> {option.label}
              </span>
            )}
          </label>)}
      </div>
    </div>;
}