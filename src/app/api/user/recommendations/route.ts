import { NextRequest, NextResponse } from 'next/server';
import { getUserFromRequest } from '@/lib/auth';
import { connectToMongoDB } from '@/lib/mongodb';
import Recommendation from '@/models/Recommendation';

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

    const recommendations = await Recommendation.findOne({ userId: user._id }).sort({ createdAt: -1 });

    return NextResponse.json({
      recommendations: recommendations ? recommendations.recommendations : [],
    });

  } catch (error: any) {
    console.error('Recommendation fetch error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch recommendations' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const user = await getUserFromRequest(request);
    
    if (!user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const { recommendations } = await request.json();

    await connectToMongoDB();

    const newRecommendation = new Recommendation({
      userId: user._id,
      recommendations,
    });

    await newRecommendation.save();

    return NextResponse.json({
      message: 'Recommendations saved successfully',
    });

  } catch (error: any) {
    console.error('Recommendation save error:', error);
    return NextResponse.json(
      { error: 'Failed to save recommendations' },
      { status: 500 }
    );
  }
}