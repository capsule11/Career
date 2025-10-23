'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { GuidanceSection } from '@/components/GuidanceSection';
import { Brain, Target, Users, GraduationCap, BookOpen, ChevronRight } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useGuidanceStore, useUserProgress } from '@/store/guidance';

export default function Home() {
  const router = useRouter();
  const { user, loading } = useAuth();
  const [showGuidance, setShowGuidance] = useState(false);
  
  const { fetchGuidanceStatus, needsGuidance } = useGuidanceStore();
  const { assessmentCompleted, profileCompleted, recommendationsGenerated, isFullyCompleted } = useUserProgress();

  useEffect(() => {
    if (user?.email) {
      fetchGuidanceStatus();
    }
  }, [user, fetchGuidanceStatus]);


  const handleStartAssessment = () => {
    if (assessmentCompleted && !isFullyCompleted) {
      // If assessment is completed but profile or recommendations aren't, continue the flow
      if (!profileCompleted) {
        router.push('/personal-profile');
      } else if (!recommendationsGenerated) {
        router.push('/recommendations');
      }
    } else {
      // Start fresh assessment
      router.push('/skills-test');
    }
  };

  const handleViewGuidance = () => {
    setShowGuidance(true);
  };

  const handleBackFromGuidance = () => {
    setShowGuidance(false);
  };


  const getActionButtonText = () => {
    if (!user) return 'Start Your Career Assessment';
    if (assessmentCompleted && !profileCompleted) return 'Continue Personal Profile';
    if (profileCompleted && !recommendationsGenerated) return 'Get Career Recommendations';
    if (isFullyCompleted) return 'Retake Assessment';
    return 'Start Your Career Assessment';
  };

  const getHeroText = () => {
    if (!user) {
      return {
        title: 'Discover Your Perfect Career Path',
        subtitle: 'Take our comprehensive assessment to uncover your strengths, understand your personality, and receive personalized career recommendations tailored for the Indian job market.'
      };
    }
    if (assessmentCompleted && !isFullyCompleted) {
      return {
        title: 'Continue Your Career Journey',
        subtitle: 'You\'ve made great progress! Complete the remaining steps to get your personalized career recommendations.'
      };
    }
    if (isFullyCompleted) {
      return {
        title: 'Welcome Back!',
        subtitle: 'You\'ve completed your career assessment. View your results or retake the assessment to explore new possibilities.'
      };
    }
    return {
      title: 'Discover Your Perfect Career Path',
      subtitle: 'Take our comprehensive assessment to uncover your strengths, understand your personality, and receive personalized career recommendations.'
    };
  };

  const heroContent = getHeroText();

  return (
    <div>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <div className="container mx-auto px-4 py-12 max-w-6xl">

          {/* Hero Section */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-800 px-4 py-2 rounded-full mb-6">
              <GraduationCap size={20} />
              Comprehensive Career Assessment
            </div>
            <h1 className="text-5xl font-bold text-gray-900 mb-6">
              {heroContent.title}
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              {heroContent.subtitle}
            </p>

            <div className="flex items-center justify-center gap-4">
              <button
                onClick={handleStartAssessment}
                className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-semibold text-lg hover:shadow-lg transform hover:-translate-y-0.5 transition-all"
              >
                {getActionButtonText()}
              </button>
              
              {user && assessmentCompleted && (
                <button
                  onClick={handleViewGuidance}
                  className="flex items-center gap-2 px-6 py-4 bg-white text-gray-700 border border-gray-300 rounded-lg font-medium hover:bg-gray-50 transition-colors"
                >
                  <BookOpen size={20} />
                  Career Guidance
                  <ChevronRight size={16} />
                </button>
              )}
            </div>
          </div>

          {/* Assessment Process */}
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <div className="bg-white rounded-xl p-8 shadow-lg text-center">
              <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Brain className="text-blue-600" size={32} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Skills Assessment</h3>
              <p className="text-gray-600">
                Test your abilities across 7 key areas including mathematics, language,
                scientific reasoning, creativity, technical skills, social intelligence, and leadership.
              </p>
            </div>

            <div className="bg-white rounded-xl p-8 shadow-lg text-center">
              <div className="bg-purple-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Users className="text-purple-600" size={32} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Personal Profile</h3>
              <p className="text-gray-600">
                Share your interests, personality traits, work preferences, values,
                and career aspirations to create a complete picture of your ideal career.
              </p>
            </div>

            <div className="bg-white rounded-xl p-8 shadow-lg text-center">
              <div className="bg-green-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Target className="text-green-600" size={32} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Career Recommendations</h3>
              <p className="text-gray-600">
                Receive 5-7 personalized career suggestions with detailed information about
                education paths, salary ranges, and growth prospects in India.
              </p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}