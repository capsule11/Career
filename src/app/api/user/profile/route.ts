import { NextRequest, NextResponse } from 'next/server';
import { getUserFromRequest } from '@/lib/auth';

export async function GET(request: NextRequest) {
  try {
    const user = await getUserFromRequest(request);
    
    if (!user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Prepare user response
    const userResponse = {
      id: user._id,
      name: user.name,
      email: user.email,
      image: user.image,
      progressPercentage: user.progressPercentage,
      assessmentCompleted: user.assessmentCompleted,
      profileCompleted: user.profileCompleted,
      recommendationsGenerated: user.recommendationsGenerated,
      skillResults: user.skillResults,
      personalProfile: user.personalProfile,
      careerRecommendations: user.careerRecommendations,
      guidanceViewed: user.guidanceViewed || {
        careerExploration: false,
        skillDevelopment: false,
        educationPlanning: false,
        industryInsights: false
      },
      assessmentHistory: user.assessmentHistory || [],
      createdAt: user.createdAt,
      lastLoginAt: user.lastLoginAt
    };

    return NextResponse.json({
      user: userResponse
    });

  } catch (error: any) {
    console.error('Profile fetch error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch profile' },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const user = await getUserFromRequest(request);
    
    if (!user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { name, image } = body;

    // Update user fields
    if (name && name.trim()) {
      user.name = name.trim();
    }
    
    if (image) {
      user.image = image;
    }

    await user.save();

    // Prepare user response
    const userResponse = {
      id: user._id,
      name: user.name,
      email: user.email,
      image: user.image,
      progressPercentage: user.progressPercentage,
      assessmentCompleted: user.assessmentCompleted,
      profileCompleted: user.profileCompleted,
      recommendationsGenerated: user.recommendationsGenerated
    };

    return NextResponse.json({
      message: 'Profile updated successfully',
      user: userResponse
    });

  } catch (error: any) {
    console.error('Profile update error:', error);
    return NextResponse.json(
      { error: 'Failed to update profile' },
      { status: 500 }
    );
  }
}