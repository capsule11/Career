import { NextRequest, NextResponse } from 'next/server';
import { getUserFromRequest, updateUserProgress } from '@/lib/auth';
import { CareerRecommendation } from '@/types';

export async function POST(request: NextRequest) {
  try {
    const user = await getUserFromRequest(request);
    
    if (!user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { recommendations } = body;

    if (!recommendations || !Array.isArray(recommendations)) {
      return NextResponse.json(
        { error: 'Invalid recommendations data' },
        { status: 400 }
      );
    }

    // Update user progress
    const updatedUser = await updateUserProgress(user._id, 'recommendations', { recommendations });

    if (!updatedUser) {
      return NextResponse.json(
        { error: 'Failed to save recommendations' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      message: 'Career recommendations saved successfully',
      careerRecommendations: updatedUser.careerRecommendations,
      progressPercentage: updatedUser.progressPercentage
    });

  } catch (error: any) {
    console.error('Recommendations save error:', error);
    return NextResponse.json(
      { error: 'Failed to save career recommendations' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const user = await getUserFromRequest(request);
    
    if (!user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    return NextResponse.json({
      careerRecommendations: user.careerRecommendations || [],
      recommendationsGenerated: user.recommendationsGenerated,
      skillResults: user.skillResults || [],
      personalProfile: user.personalProfile || {}
    });

  } catch (error: any) {
    console.error('Recommendations fetch error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch career recommendations' },
      { status: 500 }
    );
  }
}