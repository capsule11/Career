import { NextRequest, NextResponse } from 'next/server';
import { getUserFromRequest } from '@/lib/auth';
import { connectToMongoDB } from '@/lib/mongodb';
import { User } from '@/models/User';

// GET - Retrieve user's guidance viewing status
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
      guidanceViewed: user.guidanceViewed || {
        careerExploration: false,
        skillDevelopment: false,
        educationPlanning: false,
        industryInsights: false
      },
      needsGuidance: user.needsGuidance(),
      assessmentCompleted: user.assessmentCompleted,
      profileCompleted: user.profileCompleted,
      recommendationsGenerated: user.recommendationsGenerated
    });
  } catch (error) {
    console.error('Error fetching guidance status:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// PATCH - Mark guidance section as viewed
export async function PATCH(request: NextRequest) {
  try {
    const { section } = await request.json();
    
    if (!section || !['careerExploration', 'skillDevelopment', 'educationPlanning', 'industryInsights'].includes(section)) {
      return NextResponse.json(
        { error: 'Invalid section' },
        { status: 400 }
      );
    }

    const user = await getUserFromRequest(request);
    
    if (!user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Initialize guidanceViewed if it doesn't exist
    if (!user.guidanceViewed) {
      user.guidanceViewed = {
        careerExploration: false,
        skillDevelopment: false,
        educationPlanning: false,
        industryInsights: false
      };
    }

    user.markGuidanceViewed(section);
    await user.save();

    return NextResponse.json({
      success: true,
      guidanceViewed: user.guidanceViewed
    });
  } catch (error) {
    console.error('Error updating guidance status:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// POST - Save current assessment to history (called when user completes assessment)
export async function POST(request: NextRequest) {
  try {
    const { sessionId } = await request.json();
    
    if (!sessionId) {
      return NextResponse.json(
        { error: 'Session ID is required' },
        { status: 400 }
      );
    }

    const user = await getUserFromRequest(request);
    
    if (!user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    user.saveAssessmentToHistory(sessionId);
    await user.save();

    return NextResponse.json({
      success: true,
      message: 'Assessment saved to history'
    });
  } catch (error) {
    console.error('Error saving assessment to history:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}