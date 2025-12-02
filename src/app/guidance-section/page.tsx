'use client';

import { GuidanceSection } from "@/components/GuidanceSection";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { useRouter } from "next/navigation";
import { useAuth } from '@/contexts/AuthContext';
import { useEffect, useState } from 'react';
import { LoadingScreen } from '@/components/LoadingScreen';

export default function GuidanceSectionPage() {
  const router = useRouter();
  const { user, loading } = useAuth();
  const [userData, setUserData] = useState<any>(null);
  const [dataLoading, setDataLoading] = useState(true);

  useEffect(() => {
    if (!loading && !user) {
      router.push('/');
      return;
    }

    if (user) {
      fetchUserData();
    }
  }, [user, loading, router]);

  const fetchUserData = async () => {
    try {
      const response = await fetch('/api/user/profile', {
        credentials: 'include'
      });
      if (response.ok) {
        const data = await response.json();
        setUserData(data.user);
      }
    } catch (error) {
      console.error('Failed to fetch user data:', error);
    } finally {
      setDataLoading(false);
    }
  };

  if (loading || dataLoading) {
    return <LoadingScreen />;
  }

  if (!user) {
    return null;
  }

  return (
    <div>
      <Navbar />
      <GuidanceSection 
        onBack={() => router.push('/')} 
        skillResults={userData?.skillResults}
        personalProfile={userData?.personalProfile}
      />
      <Footer />
    </div>
  );
}
