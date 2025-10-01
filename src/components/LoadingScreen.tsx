'use client';

import React, { useState, useEffect } from 'react';
import { CheckCircle, Lightbulb, Target, TrendingUp, Brain, Sparkles } from 'lucide-react';

interface LoadingStep {
  id: number;
  title: string;
  description: string;
  duration: number;
}

interface LoadingScreenProps {
  title?: string;
  subtitle?: string;
  steps?: LoadingStep[];
  onComplete?: () => void;
}

const defaultSteps: LoadingStep[] = [
  { id: 1, title: 'Skills Analysis Complete', description: 'Your assessment results have been processed', duration: 0 },
  { id: 2, title: 'AI Career Matching', description: 'Analyzing thousands of career paths to find your perfect matches', duration: 2000 },
  { id: 3, title: 'Personalization', description: 'Customizing recommendations based on your preferences', duration: 1500 },
  { id: 4, title: 'Final Report', description: 'Generating detailed career insights and pathways', duration: 1000 }
];

const funFacts = [
  {
    icon: Target,
    text: "The average person changes careers 5-7 times during their working life"
  },
  {
    icon: TrendingUp,
    text: "India's job market is expected to create 350 million new jobs by 2030"
  },
  {
    icon: Brain,
    text: "75% of career success comes from soft skills like communication and teamwork"
  },
  {
    icon: Sparkles,
    text: "AI-powered career matching increases job satisfaction by 40%"
  }
];

export const LoadingScreen: React.FC<LoadingScreenProps> = ({
  title = "Generating Your Personalized Recommendations",
  subtitle = "Our AI is analyzing your skills and preferences to create the perfect career matches",
  steps = defaultSteps,
  onComplete
}) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [loadingMessage, setLoadingMessage] = useState(steps[0]?.description || 'Processing...');
  const [currentFactIndex, setCurrentFactIndex] = useState(0);

  useEffect(() => {
    const stepTimers: NodeJS.Timeout[] = [];
    
    steps.slice(1).forEach((step, index) => {
      const timer = setTimeout(() => {
        setCurrentStep(step.id);
        setLoadingMessage(step.description);
      }, steps.slice(1, index + 1).reduce((acc, s) => acc + s.duration, 0));
      stepTimers.push(timer);
    });

    // Cycle through fun facts every 3 seconds
    const factTimer = setInterval(() => {
      setCurrentFactIndex(prev => (prev + 1) % funFacts.length);
    }, 3000);

    return () => {
      stepTimers.forEach(timer => clearTimeout(timer));
      clearInterval(factTimer);
    };
  }, [steps]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-800 px-4 py-2 rounded-full mb-6">
            <CheckCircle size={20} />
            Assessment Complete
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            {title}
          </h1>
          <p className="text-gray-600 text-xl mb-4">
            {subtitle}
          </p>
          <p className="text-blue-600 font-medium animate-pulse">
            {loadingMessage}
          </p>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div 
              className="bg-gradient-to-r from-blue-500 to-purple-600 h-3 rounded-full transition-all duration-1000 ease-out"
              style={{ width: `${(currentStep / steps.length) * 100}%` }}
            />
          </div>
          <div className="flex justify-between text-sm text-gray-600 mt-2">
            <span>Step {currentStep} of {steps.length}</span>
            <span>{Math.round((currentStep / steps.length) * 100)}% Complete</span>
          </div>
        </div>

        {/* Animated Loading Spinner */}
        <div className="flex justify-center mb-12">
          <div className="relative">
            <div className="w-24 h-24 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <Lightbulb className="text-blue-600" size={28} />
            </div>
          </div>
        </div>

        {/* Progress Steps */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <h3 className="text-xl font-semibold text-gray-900 mb-6 text-center">
            What's Happening Behind the Scenes
          </h3>
          <div className="space-y-6">
            {steps.map((step) => {
              const isCompleted = currentStep > step.id;
              const isActive = currentStep === step.id;
              
              return (
                <div key={step.id} className="flex items-start gap-4">
                  <div className={`rounded-full p-2 flex-shrink-0 transition-all duration-500 ${
                    isCompleted 
                      ? 'bg-green-100' 
                      : isActive 
                      ? 'bg-blue-100 animate-pulse' 
                      : 'bg-gray-100'
                  }`}>
                    {isCompleted ? (
                      <CheckCircle className="text-green-600" size={20} />
                    ) : isActive ? (
                      <div className="w-5 h-5 bg-blue-600 rounded-full animate-pulse"></div>
                    ) : (
                      <div className="w-5 h-5 bg-gray-400 rounded-full"></div>
                    )}
                  </div>
                  <div className={`transition-all duration-300 ${
                    isCompleted || isActive ? '' : 'opacity-50'
                  }`}>
                    <h4 className={`font-semibold ${
                      isCompleted || isActive ? 'text-gray-900' : 'text-gray-400'
                    }`}>
                      {step.title}
                    </h4>
                    <p className={`text-sm ${
                      isCompleted || isActive ? 'text-gray-600' : 'text-gray-400'
                    }`}>
                      {step.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Fun Facts */}
        <div className="bg-gradient-to-r from-purple-500 to-blue-600 rounded-xl p-8 text-white">
          <h3 className="text-xl font-semibold mb-4">Did You Know?</h3>
          <div className="min-h-[80px] flex items-center">
            <div className="flex items-start gap-3 w-full">
              {React.createElement(funFacts[currentFactIndex].icon, {
                className: "flex-shrink-0 mt-1",
                size: 24
              })}
              <div className="flex-1">
                <p className="text-sm opacity-90 leading-relaxed">
                  {funFacts[currentFactIndex].text}
                </p>
              </div>
            </div>
          </div>
          
          {/* Dots indicator */}
          <div className="flex justify-center gap-2 mt-4">
            {funFacts.map((_, index) => (
              <div
                key={index}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === currentFactIndex ? 'bg-white' : 'bg-white bg-opacity-40'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};