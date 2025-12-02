'use client';

import { UserProfile } from "@/components/UserProfile";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export default function UserProfilePage() {
  const { user, loading, updateUser } = useAuth();
  const router = useRouter();
  const [recommendations, setRecommendations] = useState([]);

  useEffect(() => {
    if (!loading && !user) {
      router.push('/');
    }
  }, [user, loading, router]);

  useEffect(() => {
    const fetchRecommendations = async () => {
      try {
        const response = await fetch('/api/user/recommendations', {
          credentials: 'include',
        });
        if (response.ok) {
          const data = await response.json();
          setRecommendations(data.recommendations);
        }
      } catch (error) {
        console.error('Error fetching recommendations:', error);
      }
    };

    if (user) {
      fetchRecommendations();
    }
  }, [user]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading profile...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  const handleUpdateProfile = async (updatedData: any) => {
    try {
      const response = await fetch('/api/user/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(updatedData),
      });

      if (response.ok) {
        const data = await response.json();
        updateUser(data.user);
      } else {
        console.error('Failed to update profile');
      }
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  const userProfileData = {
    name: user.name,
    email: user.email,
    phone: '', // Add phone field if needed
    location: '', // Add location field if needed
    joinDate: new Date().toLocaleDateString(), // You can format the createdAt date here
    avatar: user.image
  };

  return (
    <div>
      <Navbar />
      <UserProfile 
        onBack={() => router.push('/')} 
        onUpdateProfile={handleUpdateProfile} 
        userProfile={userProfileData}
        skillResults={user.skillResults}
        recommendations={recommendations}
        assessmentHistory={user.assessmentHistory || []}
        onRetakeAssessment={() => router.push('/skills-test')}
      />
      <Footer />
    </div>
  );
}
