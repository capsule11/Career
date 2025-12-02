'use client';

import React, { useState, useEffect } from 'react';
import { User, Heart, MapPin, Target, Star, CheckCircle, Lightbulb, Users, Sparkles } from 'lucide-react';

interface PersonalProfileLoadingScreenProps {
  title?: string;
  subtitle?: string;
}

const profileSteps = [
  { icon: Heart, name: 'Interests & Hobbies', color: 'text-red-600', bgColor: 'bg-red-100', description: 'Discover what truly excites you' },
  { icon: User, name: 'Personality Traits', color: 'text-blue-600', bgColor: 'bg-blue-100', description: 'Understand your unique qualities' },
  { icon: MapPin, name: 'Work Environment', color: 'text-green-600', bgColor: 'bg-green-100', description: 'Find your ideal workplace' },
  { icon: Star, name: 'Values & Motivations', color: 'text-yellow-600', bgColor: 'bg-yellow-100', description: 'Identify what drives you' },
  { icon: Target, name: 'Career Goals', color: 'text-purple-600', bgColor: 'bg-purple-100', description: 'Define your aspirations' }
];

const loadingSteps = [
  { id: 1, title: 'Analyzing Career Preferences', description: 'Setting up your personal profile questions', duration: 1500 },
  { id: 2, title: 'Generating Options', description: 'Creating personalized choices based on your test results', duration: 2500 },
  { id: 3, title: 'Customizing Experience', description: 'Tailoring the interface to your preferences', duration: 1000 }
];

const insights = [
  {
    icon: Users,
    text: "Research shows that career satisfaction increases by 60% when personal values align with work"
  },
  {
    icon: Lightbulb,
    text: "People who understand their personality type are 3x more likely to find fulfilling careers"
  },
  {
    icon: Sparkles,
    text: "Taking time to reflect on your interests can lead to discovering hidden career opportunities"
  }
];

export const PersonalProfileLoadingScreen: React.FC<PersonalProfileLoadingScreenProps> = ({
  title = "Creating Your Personal Profile",
  subtitle = "We're preparing personalized questions to understand you better"
}) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [animatedStepIndex, setAnimatedStepIndex] = useState(0);
  const [currentInsightIndex, setCurrentInsightIndex] = useState(0);

  useEffect(() => {
    // Progress through loading steps
    const stepTimers: NodeJS.Timeout[] = [];
    let totalDuration = 0;

    loadingSteps.forEach((step, index) => {
      totalDuration += step.duration;
      const timer = setTimeout(() => {
        setCurrentStep(step.id);
      }, totalDuration);
      stepTimers.push(timer);
    });

    // Animate profile steps every 800ms
    const profileStepTimer = setInterval(() => {
      setAnimatedStepIndex(prev => (prev + 1) % profileSteps.length);
    }, 800);

    // Cycle through insights every 3 seconds
    const insightTimer = setInterval(() => {
      setCurrentInsightIndex(prev => (prev + 1) % insights.length);
    }, 3000);

    return () => {
      stepTimers.forEach(timer => clearTimeout(timer));
      clearInterval(profileStepTimer);
      clearInterval(insightTimer);
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50">
      <div className="container mx-auto px-4 py-8 max-w-5xl">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-purple-100 text-purple-800 px-4 py-2 rounded-full mb-6">
            <User size={20} />
            Personal Profile
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            {title}
          </h1>
          <p className="text-gray-600 text-xl mb-6">
            {subtitle}
          </p>
          
          {/* Current step indicator */}
          <div className="inline-flex items-center gap-2 bg-pink-50 text-pink-700 px-4 py-2 rounded-lg">
            <Sparkles size={16} />
            <span className="text-sm font-medium">
              {loadingSteps.find(step => step.id === currentStep)?.description}
            </span>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-purple-500 to-pink-600 h-2 rounded-full transition-all duration-1000 ease-out"
              style={{ width: `${(currentStep / loadingSteps.length) * 100}%` }}
            />
          </div>
          <div className="flex justify-between text-xs text-gray-500 mt-1">
            <span>Setting up...</span>
            <span>{Math.round((currentStep / loadingSteps.length) * 100)}% Complete</span>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-2 gap-8 mb-8">
          {/* Left Column - Profile Steps Preview */}
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <Target className="text-purple-600" size={24} />
              Your Profile Journey
            </h3>
            <div className="space-y-4">
              {profileSteps.map((step, index) => {
                const isActive = animatedStepIndex === index;
                const isCompleted = currentStep > 2; // Show as completed when setup is done
                
                return (
                  <div 
                    key={index} 
                    className={`flex items-center gap-4 p-4 rounded-lg transition-all duration-500 ${
                      isActive ? 'bg-purple-50 border-2 border-purple-200 scale-105 shadow-md' : 'bg-gray-50 border-2 border-transparent'
                    }`}
                  >
                    <div className={`rounded-full p-3 ${step.bgColor} ${isActive ? 'animate-pulse' : ''}`}>
                      <step.icon className={step.color} size={24} />
                    </div>
                    <div className="flex-1">
                      <h4 className={`font-semibold ${isActive ? 'text-purple-900' : 'text-gray-800'}`}>
                        {step.name}
                      </h4>
                      <p className={`text-sm ${isActive ? 'text-purple-600' : 'text-gray-600'}`}>
                        {step.description}
                      </p>
                    </div>
                    {isCompleted && (
                      <CheckCircle className="text-green-500" size={20} />
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Column - Progress & Insights */}
          <div className="space-y-6">
            {/* Loading Progress */}
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <Sparkles className="text-pink-600" size={24} />
                Setup Progress
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
                          ? 'bg-purple-100 animate-pulse' 
                          : 'bg-gray-100'
                      }`}>
                        {isCompleted ? (
                          <CheckCircle className="text-green-600" size={16} />
                        ) : isActive ? (
                          <div className="w-4 h-4 bg-purple-600 rounded-full animate-pulse"></div>
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

            {/* Insights */}
            <div className="bg-gradient-to-r from-purple-500 to-pink-600 rounded-xl p-8 text-white">
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                <Lightbulb size={24} />
                Profile Insights
              </h3>
              <div className="min-h-[80px] flex items-center">
                <div className="bg-white bg-opacity-10 rounded-lg p-4 w-full">
                  <div className="flex items-start gap-3">
                    {React.createElement(insights[currentInsightIndex].icon, {
                      className: "flex-shrink-0 mt-1",
                      size: 20
                    })}
                    <p className="text-sm leading-relaxed transition-all duration-500">
                      {insights[currentInsightIndex].text}
                    </p>
                  </div>
                </div>
              </div>
              
              {/* Dots indicator */}
              <div className="flex justify-center gap-2 mt-4">
                {insights.map((_, index) => (
                  <div
                    key={index}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      index === currentInsightIndex ? 'bg-white' : 'bg-white bg-opacity-40'
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
            <div className="w-20 h-20 border-4 border-purple-200 border-t-purple-600 rounded-full animate-spin"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <User className="text-purple-600" size={24} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};