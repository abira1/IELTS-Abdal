import React, { useState } from 'react';

interface DragDropSummaryProps {
  instruction: string;
  paragraph: string; // Text with (14), (15), (16), etc. placeholders
  questionNumbers: number[]; // [14, 15, 16, 17]
  optionsList: string[]; // List of draggable words
  answers: Record<number, string>;
  onAnswerChange: (questionNumber: number, value: string) => void;
  disabled?: boolean;
}

export function DragDropSummaryQuestion({
  instruction,
  paragraph,
  questionNumbers,
  optionsList,
  answers,
  onAnswerChange,
  disabled = false
}: DragDropSummaryProps) {
  const [draggedWord, setDraggedWord] = useState<string | null>(null);
  const [usedWords, setUsedWords] = useState<Set<string>>(new Set(Object.values(answers)));

  const handleDragStart = (e: React.DragEvent, word: string) => {
    if (disabled) {
      e.preventDefault();
      return;
    }
    setDraggedWord(word);
    e.dataTransfer!.effectAllowed = 'move';
    e.dataTransfer!.setData('text/plain', word);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer!.dropEffect = 'move';
  };

  const handleDropOnBlank = (e: React.DragEvent, questionNumber: number) => {
    e.preventDefault();
    if (disabled) return;

    const word = e.dataTransfer!.getData('text/plain');
    if (word) {
      // Update the answer
      onAnswerChange(questionNumber, word);
      
      // Update used words
      const newUsedWords = new Set(usedWords);
      newUsedWords.add(word);
      setUsedWords(newUsedWords);
      
      setDraggedWord(null);
    }
  };

  const handleClearAnswer = (questionNumber: number) => {
    if (disabled) return;
    
    const currentAnswer = answers[questionNumber];
    if (currentAnswer) {
      const newUsedWords = new Set(usedWords);
      newUsedWords.delete(currentAnswer);
      setUsedWords(newUsedWords);
      onAnswerChange(questionNumber, '');
    }
  };

  // Parse the paragraph and replace (14), (15), etc. with draggable blanks
  const renderParagraph = () => {
    let elements: React.ReactNode[] = [];
    let lastIndex = 0;

    // Find all placeholders like (14), (15), etc.
    const placeholderRegex = /\((\d+)\)/g;
    let match;

    while ((match = placeholderRegex.exec(paragraph)) !== null) {
      const questionNum = parseInt(match[1]);
      
      // Add text before this placeholder
      if (match.index > lastIndex) {
        elements.push(
          <span key={`text-${lastIndex}`}>
            {paragraph.substring(lastIndex, match.index)}
          </span>
        );
      }

      // Add the draggable blank
      const isAnswered = answers[questionNum];
      elements.push(
        <div
          key={`blank-${questionNum}`}
          onDragOver={handleDragOver}
          onDrop={(e) => handleDropOnBlank(e, questionNum)}
          className={`inline-block min-w-[120px] mx-1 px-3 py-2 border-2 border-dashed rounded cursor-move transition-colors ${
            isAnswered
              ? 'bg-green-50 border-green-400'
              : 'bg-yellow-50 border-yellow-400 hover:bg-yellow-100'
          } ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
          style={{ display: 'inline-block' }}
        >
          {isAnswered ? (
            <div className="flex items-center justify-between gap-2">
              <span className="font-semibold text-green-700">{isAnswered}</span>
              {!disabled && (
                <button
                  onClick={() => handleClearAnswer(questionNum)}
                  className="text-xs text-red-500 hover:text-red-700 font-bold"
                  title="Clear answer"
                >
                  ✕
                </button>
              )}
            </div>
          ) : (
            <span className="text-gray-400 text-sm">({questionNum})</span>
          )}
        </div>
      );

      lastIndex = match.index + match[0].length;
    }

    // Add remaining text
    if (lastIndex < paragraph.length) {
      elements.push(
        <span key={`text-${lastIndex}`}>
          {paragraph.substring(lastIndex)}
        </span>
      );
    }

    return elements;
  };

  return (
    <div className="space-y-6">
      {/* Instruction */}
      <div className="bg-gray-50 border border-gray-200 rounded p-4">
        <p className="text-sm text-gray-700 italic">{instruction}</p>
      </div>

      {/* Draggable words container */}
      <div className="bg-blue-50 border border-blue-200 rounded p-4">
        <p className="text-sm font-semibold text-gray-700 mb-3">Drag words from here:</p>
        <div className="flex flex-wrap gap-2">
          {optionsList.map((word) => (
            <div
              key={word}
              draggable={!disabled && !usedWords.has(word)}
              onDragStart={(e) => handleDragStart(e, word)}
              className={`px-4 py-2 rounded font-semibold cursor-move transition-all ${
                usedWords.has(word)
                  ? 'bg-gray-200 text-gray-500 opacity-50 cursor-not-allowed'
                  : 'bg-blue-400 text-white hover:bg-blue-500 shadow-md'
              } ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              {word}
            </div>
          ))}
        </div>
      </div>

      {/* Summary paragraph with blanks */}
      <div className="bg-white border border-gray-300 rounded p-6 leading-relaxed">
        <div className="text-base text-gray-800">
          {renderParagraph()}
        </div>
      </div>

      {/* Progress indicator */}
      <div className="text-sm text-gray-600">
        Progress: {Object.values(answers).filter((v) => v).length} of {questionNumbers.length} blanks filled
      </div>
    </div>
  );
}
