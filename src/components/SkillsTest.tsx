'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ChevronRight, ChevronLeft, CheckCircle, XCircle, Clock } from 'lucide-react';
import { SkillArea, Question, SkillResult } from '@/types';
import { useTestResultStore } from '@/store/test-result';

interface SkillsTestProps {
  skillAreas: SkillArea[];
}

export const SkillsTest: React.FC<SkillsTestProps> = ({ skillAreas }) => {
  const router = useRouter();
  const setSkillResults = useTestResultStore((state) => state.setSkillResults);
  const [currentAreaIndex, setCurrentAreaIndex] = useState(0);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [showExplanation, setShowExplanation] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [timeLeft, setTimeLeft] = useState(30);
  const [timerActive, setTimerActive] = useState(true);

  const currentArea = skillAreas[currentAreaIndex];
  const currentQuestion = currentArea.questions[currentQuestionIndex];
  const totalQuestions = skillAreas.reduce((sum, area) => sum + area.questions.length, 0);
  const answeredQuestions = Object.keys(answers).length;

  React.useEffect(() => {
    if (timerActive && timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && !showExplanation) {
      handleAnswerSubmit();
    }
  }, [timeLeft, timerActive, showExplanation]);

  const handleAnswerSelect = (answerIndex: number) => {
    if (!showExplanation) {
      setSelectedAnswer(answerIndex);
    }
  };

  const handleAnswerSubmit = () => {
    if (selectedAnswer !== null || timeLeft === 0) {
      const finalAnswer = selectedAnswer !== null ? selectedAnswer : -1;
      setAnswers(prev => ({ ...prev, [currentQuestion.id]: finalAnswer }));
      setShowExplanation(true);
      setTimerActive(false);
    }
  };

  const handleNext = () => {
    if (currentQuestionIndex < currentArea.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else if (currentAreaIndex < skillAreas.length - 1) {
      setCurrentAreaIndex(currentAreaIndex + 1);
      setCurrentQuestionIndex(0);
    } else {
      // Test complete
      const results = calculateResults();
      setSkillResults(results);
      router.push('/skill-results');
      return;
    }

    setSelectedAnswer(null);
    setShowExplanation(false);
    setTimeLeft(30);
    setTimerActive(true);
  };

  const calculateResults = (): SkillResult[] => {
    return skillAreas.map(area => {
      const areaQuestions = area.questions;
      let correctAnswers = 0;

      areaQuestions.forEach(question => {
        if (answers[question.id] === question.correctAnswer) {
          correctAnswers++;
        }
      });

      const percentage = (correctAnswers / areaQuestions.length) * 100;
      let level: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert';

      if (percentage >= 90) level = 'Expert';
      else if (percentage >= 75) level = 'Advanced';
      else if (percentage >= 60) level = 'Intermediate';
      else level = 'Beginner';

      return {
        area: area.name,
        score: correctAnswers,
        maxScore: areaQuestions.length,
        percentage,
        level
      };
    });
  };

  const isCorrect = selectedAnswer === currentQuestion.correctAnswer;
  const hasAnswered = selectedAnswer !== null || timeLeft === 0;

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Progress Header */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-gray-900">{currentArea.name}</h2>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-orange-600">
              <Clock size={20} />
              <span className="font-mono text-lg">{timeLeft}s</span>
            </div>
            <span className="text-sm text-gray-500">
              Question {answeredQuestions + 1} of {totalQuestions}
            </span>
          </div>
        </div>

        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${(answeredQuestions / totalQuestions) * 100}%` }}
          />
        </div>

        <p className="text-gray-600 mt-2">{currentArea.description}</p>
      </div>

      {/* Question Card */}
      <div className="bg-white rounded-xl shadow-lg p-8 mb-6">
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-4">
            <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
              {currentQuestion.difficulty.charAt(0).toUpperCase() + currentQuestion.difficulty.slice(1)}
            </span>
            <span className="text-gray-500">
              Question {currentQuestionIndex + 1} of {currentArea.questions.length}
            </span>
          </div>

          <h3 className="text-xl font-semibold text-gray-900 mb-6">
            {currentQuestion.question}
          </h3>
        </div>

        {/* Answer Options */}
        <div className="space-y-3 mb-6">
          {currentQuestion.options.map((option, index) => {
            let buttonClass = "w-full p-4 text-left rounded-lg border-2 transition-all ";

            if (showExplanation) {
              if (index === currentQuestion.correctAnswer) {
                buttonClass += "border-green-500 bg-green-50 text-green-800";
              } else if (index === selectedAnswer && selectedAnswer !== currentQuestion.correctAnswer) {
                buttonClass += "border-red-500 bg-red-50 text-red-800";
              } else {
                buttonClass += "border-gray-200 bg-gray-50 text-gray-600";
              }
            } else {
              if (selectedAnswer === index) {
                buttonClass += "border-blue-500 bg-blue-50 text-blue-800";
              } else {
                buttonClass += "border-gray-200 hover:border-gray-300 hover:bg-gray-50";
              }
            }

            return (
              <button
                key={index}
                onClick={() => handleAnswerSelect(index)}
                disabled={showExplanation}
                className={buttonClass}
              >
                <div className="flex items-center justify-between">
                  <span>{option}</span>
                  {showExplanation && index === currentQuestion.correctAnswer && (
                    <CheckCircle className="text-green-600" size={20} />
                  )}
                  {showExplanation && index === selectedAnswer && selectedAnswer !== currentQuestion.correctAnswer && (
                    <XCircle className="text-red-600" size={20} />
                  )}
                </div>
              </button>
            );
          })}
        </div>

        {/* Explanation */}
        {showExplanation && (
          <div className={`p-4 rounded-lg mb-6 ${isCorrect ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'}`}>
            <div className="flex items-center gap-2 mb-2">
              {isCorrect ? (
                <CheckCircle className="text-green-600" size={20} />
              ) : (
                <XCircle className="text-red-600" size={20} />
              )}
              <span className={`font-semibold ${isCorrect ? 'text-green-800' : 'text-red-800'}`}>
                {isCorrect ? 'Correct!' : timeLeft === 0 ? 'Time\'s up!' : 'Incorrect'}
              </span>
            </div>
            <p className="text-gray-700">{currentQuestion.explanation}</p>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex justify-between">
          <button
            onClick={() => {/* Previous question logic if needed */ }}
            disabled={currentAreaIndex === 0 && currentQuestionIndex === 0}
            className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-800 disabled:opacity-50"
          >
            <ChevronLeft size={20} />
            Previous
          </button>

          {!showExplanation ? (
            <button
              onClick={handleAnswerSubmit}
              disabled={selectedAnswer === null}
              className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Submit Answer
            </button>
          ) : (
            <button
              onClick={handleNext}
              className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:shadow-lg transform hover:-translate-y-0.5 transition-all"
            >
              {currentAreaIndex === skillAreas.length - 1 && currentQuestionIndex === currentArea.questions.length - 1
                ? 'Complete Test'
                : 'Next Question'
              }
              <ChevronRight size={20} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};