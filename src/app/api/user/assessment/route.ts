import { NextRequest, NextResponse } from 'next/server';
import { getUserFromRequest, updateUserProgress } from '@/lib/auth';
import { connectToMongoDB } from '@/lib/mongodb';
import { Assessment } from '@/models/Assessment';
import { SkillResult } from '@/types';

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
    const { skillResults, answers, sessionId, totalTimeSpent } = body;

    if (!skillResults || !Array.isArray(skillResults)) {
      return NextResponse.json(
        { error: 'Invalid skill results data' },
        { status: 400 }
      );
    }

    await connectToMongoDB();

    // Save detailed assessment data
    if (answers && sessionId) {
      const assessment = new Assessment({
        userId: user._id,
        sessionId,
        answers,
        totalQuestionsAttempted: answers.length,
        totalCorrectAnswers: answers.filter((a: any) => a.isCorrect).length,
        totalTimeSpent: totalTimeSpent || 0,
        status: 'completed',
        completedAt: new Date(),
        ipAddress: request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown',
        userAgent: request.headers.get('user-agent') || 'unknown'
      });

      await assessment.save();
    }

    // Update user progress
    const updatedUser = await updateUserProgress(user._id, 'assessment', { skillResults });

    if (!updatedUser) {
      return NextResponse.json(
        { error: 'Failed to save assessment results' },
        { status: 500 }
      );
    }

    // Save to assessment history if we have a sessionId
    if (sessionId) {
      updatedUser.saveAssessmentToHistory(sessionId);
      await updatedUser.save();
    }

    return NextResponse.json({
      message: 'Assessment results saved successfully',
      skillResults: updatedUser.skillResults,
      progressPercentage: updatedUser.progressPercentage
    });

  } catch (error: any) {
    console.error('Assessment save error:', error);
    return NextResponse.json(
      { error: 'Failed to save assessment results' },
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

    await connectToMongoDB();

    // Get user's assessment history
    const assessments = await Assessment.find({ userId: user._id })
      .sort({ createdAt: -1 })
      .limit(10);

    return NextResponse.json({
      skillResults: user.skillResults || [],
      assessmentHistory: assessments,
      assessmentCompleted: user.assessmentCompleted
    });

  } catch (error: any) {
    console.error('Assessment fetch error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch assessment data' },
      { status: 500 }
    );
  }
}