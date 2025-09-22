'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ChevronRight, ArrowLeft, User, Heart, MapPin, Target, Star } from 'lucide-react';
import { PersonalProfile as PersonalProfileType } from '@/types';
import { usePersonalProfileStore } from '@/store/personal-profile';
import { generateProfileOptions, ProfileOptions } from '../app/actions/generate-profile-options';

export const PersonalProfile: React.FC = () => {
  const router = useRouter();
  const { personalProfile, setPersonalProfile } = usePersonalProfileStore();
  const [currentStep, setCurrentStep] = useState(0);
  const [profileOptions, setProfileOptions] = useState<ProfileOptions | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOptions = async () => {
      const options = await generateProfileOptions();
      setProfileOptions(options);
      setLoading(false);
    };
    fetchOptions();
  }, []);

  const steps = [
    'Interests & Hobbies',
    'Personality Traits',
    'Work Environment',
    'Values & Motivations',
    'Career Goals'
  ];

  const handleSelection = (field: keyof PersonalProfileType, value: string) => {
    if (Array.isArray(personalProfile[field])) {
      const currentValues = personalProfile[field] as string[];
      const newValues = currentValues.includes(value)
        ? currentValues.filter(v => v !== value)
        : [...currentValues, value];

      setPersonalProfile({
        ...personalProfile,
        [field]: newValues
      });
    }
  };

  const handleTextInput = (field: keyof PersonalProfileType, value: string) => {
    setPersonalProfile({
        ...personalProfile,
        [field]: value
    });
  };

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      router.push('/recommendations');
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    } else {
      router.push('/skill-results');
    }
  };

  const renderStep = () => {
    if (loading || !profileOptions) {
      return <div>Loading...</div>;
    }

    switch (currentStep) {
      case 0:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <Heart className="mx-auto text-red-500 mb-4" size={48} />
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Interests & Hobbies</h2>
              <p className="text-gray-600">What activities and fields genuinely interest you? Select all that apply.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {profileOptions.interests.map(interest => (
                <button
                  key={interest}
                  onClick={() => handleSelection('interests', interest)}
                  className={`p-4 rounded-lg text-left transition-all ${personalProfile.interests.includes(interest)
                    ? 'bg-red-100 border-2 border-red-500 text-red-800'
                    : 'bg-gray-50 hover:bg-gray-100 border border-gray-200'
                    }`}
                >
                  {interest}
                </button>
              ))}
            </div>
          </div>
        );

      case 1:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <User className="mx-auto text-blue-500 mb-4" size={48} />
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Personality Traits</h2>
              <p className="text-gray-600">How would you describe yourself? Choose traits that resonate with you.</p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {profileOptions.personalityTraits.map(trait => (
                <button
                  key={trait}
                  onClick={() => handleSelection('personalityTraits', trait)}
                  className={`p-3 rounded-lg text-center transition-all ${personalProfile.personalityTraits.includes(trait)
                    ? 'bg-blue-100 border-2 border-blue-500 text-blue-800'
                    : 'bg-gray-50 hover:bg-gray-100 border border-gray-200'
                    }`}
                >
                  {trait}
                </button>
              ))}
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <MapPin className="mx-auto text-green-500 mb-4" size={48} />
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Preferred Work Environment</h2>
              <p className="text-gray-600">Where do you see yourself working? Select your preferences.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {profileOptions.workEnvironments.map(env => (
                <button
                  key={env}
                  onClick={() => handleSelection('workEnvironment', env)}
                  className={`p-4 rounded-lg text-left transition-all ${personalProfile.workEnvironment.includes(env)
                    ? 'bg-green-100 border-2 border-green-500 text-green-800'
                    : 'bg-gray-50 hover:bg-gray-100 border border-gray-200'
                    }`}
                >
                  {env}
                </button>
              ))}
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <Star className="mx-auto text-yellow-500 mb-4" size={48} />
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Values & Motivations</h2>
              <p className="text-gray-600">What matters most to you in your career? Select your priorities.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {profileOptions.values.map(value => (
                <button
                  key={value}
                  onClick={() => handleSelection('values', value)}
                  className={`p-4 rounded-lg text-left transition-all ${personalProfile.values.includes(value)
                    ? 'bg-yellow-100 border-2 border-yellow-500 text-yellow-800'
                    : 'bg-gray-50 hover:bg-gray-100 border border-gray-200'
                    }`}
                >
                  {value}
                </button>
              ))}
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <Target className="mx-auto text-purple-500 mb-4" size={48} />
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Career Goals & Aspirations</h2>
              <p className="text-gray-600">Tell us about your career dreams and any specific preferences.</p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  What are your career aspirations? Describe your ideal career path.
                </label>
                <textarea
                  value={personalProfile.careerGoals}
                  onChange={(e) => handleTextInput('careerGoals', e.target.value)}
                  className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  rows={4}
                  placeholder="e.g., I want to become a software engineer at a top tech company, or I dream of starting my own business..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Any additional information or constraints we should consider?
                </label>
                <textarea
                  value={personalProfile.additionalInfo}
                  onChange={(e) => handleTextInput('additionalInfo', e.target.value)}
                  className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  rows={3}
                  placeholder="e.g., prefer staying in home city, interested in government jobs, want work-life balance..."
                />
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Personal Profile Assessment</h1>
        <p className="text-xl text-gray-600">Help us understand your preferences and aspirations</p>
      </div>

      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-gray-700">Step {currentStep + 1} of {steps.length}</span>
          <span className="text-sm text-gray-500">{Math.round(((currentStep + 1) / steps.length) * 100)}% Complete</span>
        </div>

        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-gradient-to-r from-purple-500 to-pink-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
          />
        </div>

        <div className="flex justify-between mt-2">
          {steps.map((step, index) => (
            <span
              key={step}
              className={`text-xs ${index <= currentStep ? 'text-purple-600 font-medium' : 'text-gray-400'}`}
            >
              {step}
            </span>
          ))}
        </div>
      </div>

      {/* Assessment Form */}
      <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
        {renderStep()}
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-between">
        <button
          onClick={prevStep}
          className="flex items-center gap-2 px-6 py-3 bg-gray-200 text-gray-700 rounded-lg font-medium hover:bg-gray-300 transition-all"
        >
          <ArrowLeft size={20} />
          Back
        </button>

        <button
          onClick={nextStep}
          className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg font-medium hover:shadow-lg transform hover:-translate-y-0.5 transition-all"
        >
          {currentStep === steps.length - 1 ? 'Get Career Recommendations' : 'Next'}
          <ChevronRight size={20} />
        </button>
      </div>
    </div>
  );
};