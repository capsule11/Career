'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { SkillsTest } from '@/components/SkillsTest';
import { SkillsTestLoadingScreen } from '@/components/SkillsTestLoadingScreen';
import { useAuth } from '@/contexts/AuthContext';
import { SkillArea } from '../types';
import { formQuestions } from '../actions/generate-questions';

export default function SkillsTestPage() {
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();
  const [skillAreas, setSkillAreas] = useState<SkillArea[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Check if user is authenticated
    if (!authLoading && !user) {
      router.push('/');
      return;
    }

    // If user is authenticated, load skill areas
    if (user) {
      const fetchSkillAreas = async () => {
        try {
          const areas = await formQuestions();
          setSkillAreas(areas);
          setLoading(false);
        } catch (err) {
          console.error('Failed to load skills test:', err);
          setError('Failed to load the assessment. Please refresh the page to try again.');
          setLoading(false);
        }
      };
      fetchSkillAreas();
    }
  }, [user, authLoading, router]);

  // Show loading screen while checking auth or loading skill areas
  if (authLoading || loading) {
    return <SkillsTestLoadingScreen />;
  }

  // Redirect to home if not authenticated
  if (!user) {
    return null;
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-orange-50 flex items-center justify-center">
        <div className="text-center p-8">
          <div className="bg-red-100 text-red-800 px-4 py-2 rounded-full mb-4 inline-block">
            Error
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Something went wrong</h1>
          <p className="text-gray-600 mb-6">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return <SkillsTest skillAreas={skillAreas} />;
}
