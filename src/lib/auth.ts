import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { NextRequest } from 'next/server';
import { connectToMongoDB } from './mongodb';
import { User, IUser } from '@/models/User';

if (!process.env.JWT_SECRET) {
  throw new Error('JWT_SECRET environment variable is not set');
}

const JWT_SECRET = process.env.JWT_SECRET;

export const hashPassword = async (password: string): Promise<string> => {
  const saltRounds = 12;
  return await bcrypt.hash(password, saltRounds);
};

export const verifyPassword = async (password: string, hashedPassword: string): Promise<boolean> => {
  return await bcrypt.compare(password, hashedPassword);
};

export const generateToken = (userId: string): string => {
  return jwt.sign(
    { userId },
    JWT_SECRET,
    { expiresIn: '7d' } // Token expires in 7 days
  );
};

export const verifyToken = (token: string): { userId: string } | null => {
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as { userId: string };
    return decoded;
  } catch (error) {
    return null;
  }
};

export const getUserFromRequest = async (request: NextRequest): Promise<IUser | null> => {
  try {
    // Try to get token from Authorization header
    const authHeader = request.headers.get('authorization');
    let token = authHeader?.replace('Bearer ', '');

    // If no Authorization header, try to get from cookies
    if (!token) {
      token = request.cookies.get('token')?.value;
    }

    if (!token) {
      return null;
    }

    const decoded = verifyToken(token);
    if (!decoded) {
      return null;
    }

    await connectToMongoDB();
    const user = await User.findById(decoded.userId);
    return user;
  } catch (error) {
    console.error('Error getting user from request:', error);
    return null;
  }
};

export const createUser = async (userData: {
  name: string;
  email: string;
  password?: string;
  provider?: string;
  providerId?: string;
  image?: string;
}): Promise<IUser> => {
  await connectToMongoDB();

  // Check if user already exists
  const existingUser = await User.findOne({ email: userData.email.toLowerCase() });
  if (existingUser) {
    throw new Error('User with this email already exists');
  }

  // Hash password if provided
  let hashedPassword;
  if (userData.password) {
    hashedPassword = await hashPassword(userData.password);
  }

  // Create new user
  const user = new User({
    name: userData.name,
    email: userData.email.toLowerCase(),
    password: hashedPassword,
    provider: userData.provider || 'credentials',
    providerId: userData.providerId,
    image: userData.image
  });

  await user.save();
  return user;
};

export const authenticateUser = async (email: string, password: string): Promise<IUser | null> => {
  await connectToMongoDB();

  const user = await User.findOne({ email: email.toLowerCase() });
  if (!user || !user.password) {
    return null;
  }

  const isValidPassword = await verifyPassword(password, user.password);
  if (!isValidPassword) {
    return null;
  }

  // Update last login time
  user.lastLoginAt = new Date();
  await user.save();

  return user;
};

export const updateUserProgress = async (
  userId: string, 
  progressType: 'assessment' | 'profile' | 'recommendations',
  data?: any
): Promise<IUser | null> => {
  await connectToMongoDB();

  const user = await User.findById(userId);
  if (!user) return null;

  switch (progressType) {
    case 'assessment':
      user.skillResults = data.skillResults;
      user.assessmentCompleted = true;
      user.assessmentCompletedAt = new Date();
      break;
    case 'profile':
      user.personalProfile = data.personalProfile;
      user.profileCompleted = true;
      break;
    case 'recommendations':
      user.careerRecommendations = data.recommendations;
      user.recommendationsGenerated = true;
      break;
  }

  await user.save();
  return user;
};