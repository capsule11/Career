'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { Brain, Target, Users, GraduationCap } from 'lucide-react';

export default function Home() {
  const router = useRouter();

  // Dummy data for Navbar, as the original component expects it.
  // In a real app, this would come from an authentication context or store.
  const [isLoggedIn, setIsLoggedIn] = React.useState(true);
  const [userProfile, setUserProfile] = React.useState({
    name: 'Rahul Sharma',
    email: 'rahul.sharma@email.com',
  });

  const handleStartAssessment = () => {
    router.push('/skills-test');
  };

  return (
    <div>
      <Navbar
        isLoggedIn={isLoggedIn}
        userProfile={isLoggedIn ? userProfile : undefined}
        onLogin={() => setIsLoggedIn(true)}
        onLogout={() => setIsLoggedIn(false)}
        onProfileClick={() => router.push('/user-profile')}
      />
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <div className="container mx-auto px-4 py-12 max-w-6xl">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-800 px-4 py-2 rounded-full mb-6">
              <GraduationCap size={20} />
              Comprehensive Career Assessment
            </div>
            <h1 className="text-5xl font-bold text-gray-900 mb-6">
              Discover Your Perfect Career Path
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Take our comprehensive assessment to uncover your strengths, understand your personality,
              and receive personalized career recommendations tailored for the Indian job market.
            </p>

            <button
              onClick={handleStartAssessment}
              className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-semibold text-lg hover:shadow-lg transform hover:-translate-y-0.5 transition-all"
            >
              Start Your Career Assessment
            </button>
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