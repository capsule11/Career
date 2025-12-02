'use client';

import React, { useState, useEffect } from 'react';
import { Brain, BookOpen, Lightbulb, Target, CheckCircle, Clock, Zap, Users, Calculator, MessageCircle, Microscope, Palette } from 'lucide-react';

interface SkillsTestLoadingScreenProps {
  title?: string;
  subtitle?: string;
}

const skillAreas = [
  { icon: Calculator, name: 'Mathematics & Analytical Reasoning', color: 'text-blue-600', bgColor: 'bg-blue-100' },
  { icon: MessageCircle, name: 'Language & Communication', color: 'text-green-600', bgColor: 'bg-green-100' },
  { icon: Microscope, name: 'Scientific Reasoning', color: 'text-purple-600', bgColor: 'bg-purple-100' },
  { icon: Palette, name: 'Creative & Artistic Abilities', color: 'text-pink-600', bgColor: 'bg-pink-100' },
  { icon: Brain, name: 'Technical Skills', color: 'text-indigo-600', bgColor: 'bg-indigo-100' },
  { icon: Users, name: 'Social Intelligence', color: 'text-orange-600', bgColor: 'bg-orange-100' },
  { icon: Target, name: 'Leadership Potential', color: 'text-red-600', bgColor: 'bg-red-100' }
];

const loadingSteps = [
  { id: 1, title: 'Initializing Assessment', description: 'Setting up your personalized skills test', duration: 1000 },
  { id: 2, title: 'Generating Questions', description: 'Creating unique questions tailored to your level', duration: 3000 },
  { id: 3, title: 'Calibrating Difficulty', description: 'Adjusting question difficulty based on latest standards', duration: 2000 },
  { id: 4, title: 'Finalizing Test', description: 'Preparing your assessment environment', duration: 1000 }
];

const testTips = [
  "Read each question carefully before selecting an answer",
  "You have 30 seconds per question - trust your instincts",
  "Don&apos;t worry if you don&apos;t know an answer - it&apos;s part of the learning process",
  "The test adapts to your skill level as you progress",
  "Take your time to understand the explanations after each question"
];

export const SkillsTestLoadingScreen: React.FC<SkillsTestLoadingScreenProps> = ({
  title = "Preparing Your Skills Assessment",
  subtitle = "We're creating a personalized test experience just for you"
}) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [currentTipIndex, setCurrentTipIndex] = useState(0);
  const [animatedSkillIndex, setAnimatedSkillIndex] = useState(0);

  useEffect(() => {
    // Progress through steps
    const stepTimers: NodeJS.Timeout[] = [];
    let totalDuration = 0;

    loadingSteps.forEach((step, index) => {
      totalDuration += step.duration;
      const timer = setTimeout(() => {
        setCurrentStep(step.id);
      }, totalDuration);
      stepTimers.push(timer);
    });

    // Cycle through tips every 2.5 seconds
    const tipTimer = setInterval(() => {
      setCurrentTipIndex(prev => (prev + 1) % testTips.length);
    }, 2500);

    // Animate skill areas every 800ms
    const skillTimer = setInterval(() => {
      setAnimatedSkillIndex(prev => (prev + 1) % skillAreas.length);
    }, 800);

    return () => {
      stepTimers.forEach(timer => clearTimeout(timer));
      clearInterval(tipTimer);
      clearInterval(skillTimer);
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-blue-50">
      <div className="container mx-auto px-4 py-8 max-w-5xl">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-indigo-100 text-indigo-800 px-4 py-2 rounded-full mb-6">
            <Brain size={20} />
            Skills Assessment
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            {title}
          </h1>
          <p className="text-gray-600 text-xl mb-6">
            {subtitle}
          </p>
          
          {/* Current step indicator */}
          <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 px-4 py-2 rounded-lg">
            <Clock size={16} />
            <span className="text-sm font-medium">
              {loadingSteps.find(step => step.id === currentStep)?.description}
            </span>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-indigo-500 to-blue-600 h-2 rounded-full transition-all duration-1000 ease-out"
              style={{ width: `${(currentStep / loadingSteps.length) * 100}%` }}
            />
          </div>
          <div className="flex justify-between text-xs text-gray-500 mt-1">
            <span>Preparing...</span>
            <span>{Math.round((currentStep / loadingSteps.length) * 100)}% Complete</span>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-2 gap-8 mb-8">
          {/* Left Column - Skills Preview */}
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <Target className="text-indigo-600" size={24} />
              Skills You&apos;ll Be Tested On
            </h3>
            <div className="space-y-4">
              {skillAreas.map((skill, index) => {
                const isActive = animatedSkillIndex === index;
                const isCompleted = currentStep > 2; // Show as completed when questions are generated
                
                return (
                  <div 
                    key={index} 
                    className={`flex items-center gap-4 p-3 rounded-lg transition-all duration-500 ${
                      isActive ? 'bg-indigo-50 border-2 border-indigo-200 scale-105' : 'bg-gray-50 border-2 border-transparent'
                    }`}
                  >
                    <div className={`rounded-full p-2 ${skill.bgColor} ${isActive ? 'animate-pulse' : ''}`}>
                      <skill.icon className={skill.color} size={20} />
                    </div>
                    <div className="flex-1">
                      <h4 className={`font-semibold ${isActive ? 'text-indigo-900' : 'text-gray-800'}`}>
                        {skill.name}
                      </h4>
                    </div>
                    {isCompleted && (
                      <CheckCircle className="text-green-500" size={20} />
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Column - Progress & Tips */}
          <div className="space-y-6">
            {/* Progress Steps */}
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <Zap className="text-yellow-600" size={24} />
                Preparation Progress
              </h3>
              <div className="space-y-4">
                {loadingSteps.map((step) => {
                  const isCompleted = currentStep > step.id;
                  const isActive = currentStep === step.id;
                  
                  return (
                    <div key={step.id} className="flex items-start gap-3">
                      <div className={`rounded-full p-1.5 flex-shrink-0 transition-all duration-500 ${
                        isCompleted 
                          ? 'bg-green-100' 
                          : isActive 
                          ? 'bg-blue-100 animate-pulse' 
                          : 'bg-gray-100'
                      }`}>
                        {isCompleted ? (
                          <CheckCircle className="text-green-600" size={16} />
                        ) : isActive ? (
                          <div className="w-4 h-4 bg-blue-600 rounded-full animate-pulse"></div>
                        ) : (
                          <div className="w-4 h-4 bg-gray-400 rounded-full"></div>
                        )}
                      </div>
                      <div className={`transition-all duration-300 ${
                        isCompleted || isActive ? '' : 'opacity-50'
                      }`}>
                        <h4 className={`font-medium text-sm ${
                          isCompleted || isActive ? 'text-gray-900' : 'text-gray-500'
                        }`}>
                          {step.title}
                        </h4>
                        <p className={`text-xs ${
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

            {/* Test Tips */}
            <div className="bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl p-8 text-gray-500">
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2 text-white">
                <Lightbulb size={24} />
                Assessment Tips
              </h3>
              <div className="min-h-[60px] flex items-center">
                <div className="bg-white bg-opacity-10 rounded-lg p-4 w-full">
                  <p className="text-sm leading-relaxed transition-all duration-500">
                    💡 {testTips[currentTipIndex]}
                  </p>
                </div>
              </div>
              
              {/* Dots indicator */}
              <div className="flex justify-center gap-2 mt-4">
                {testTips.map((_, index) => (
                  <div
                    key={index}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      index === currentTipIndex ? 'bg-white' : 'bg-white bg-opacity-40'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Central Loading Animation */}
        <div className="flex justify-center">
          <div className="relative">
            <div className="w-20 h-20 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <BookOpen className="text-indigo-600" size={24} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};