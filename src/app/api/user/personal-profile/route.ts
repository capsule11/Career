import { NextRequest, NextResponse } from 'next/server';
import { getUserFromRequest, updateUserProgress } from '@/lib/auth';
import { PersonalProfile } from '@/types';

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
    const personalProfile: PersonalProfile = body;

    // Validate required fields
    if (!personalProfile || typeof personalProfile !== 'object') {
      return NextResponse.json(
        { error: 'Invalid personal profile data' },
        { status: 400 }
      );
    }

    // Update user progress
    const updatedUser = await updateUserProgress(user._id, 'profile', { personalProfile });

    if (!updatedUser) {
      return NextResponse.json(
        { error: 'Failed to save personal profile' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      message: 'Personal profile saved successfully',
      personalProfile: updatedUser.personalProfile,
      progressPercentage: updatedUser.progressPercentage
    });

  } catch (error: any) {
    console.error('Personal profile save error:', error);
    return NextResponse.json(
      { error: 'Failed to save personal profile' },
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
      personalProfile: user.personalProfile || {},
      profileCompleted: user.profileCompleted
    });

  } catch (error: any) {
    console.error('Personal profile fetch error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch personal profile' },
      { status: 500 }
    );
  }
}