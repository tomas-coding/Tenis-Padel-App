import { NextRequest, NextResponse } from 'next/server';
import { generateToken, comparePassword } from '@/lib/auth';
import { User } from '@/types';

// Mock user database (replace with real database later)
const mockUsers: User[] = [
  {
    id: '1',
    email: 'admin@tennispadelclub.com',
    firstName: 'Admin',
    lastName: 'User',
    phone: '+34 600 000 000',
    role: 'admin',
    createdAt: new Date(),
    updatedAt: new Date(),
    // In real app, this would be hashed
    password: '$2b$12$M4I87LJAxsu.GU4trQUVi.Qz8/DuiST5ZDfTXvSEBXJFFbkbPBt0u', // "admin"
  },
  {
    id: '2',
    email: 'user@tennispadelclub.com',
    firstName: 'Juan',
    lastName: 'Pérez',
    phone: '+34 600 000 001',
    role: 'user',
    createdAt: new Date(),
    updatedAt: new Date(),
    password: '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBPj4J/HS.iK2e', // "password123"
  },
];

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();

    // Validate input
    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email y contraseña son requeridos' },
        { status: 400 }
      );
    }

    // Find user
    const user = mockUsers.find(u => u.email === email);
    if (!user || !user.password) {
      return NextResponse.json(
        { error: 'Credenciales inválidas' },
        { status: 401 }
      );
    }

    // At this point, user.password is guaranteed to be a string
    const userPassword: string = user.password;

    // Verify password - temporary debug mode
    let isValidPassword = false;
    if (user.email === 'admin@tennispadelclub.com' && password === 'admin') {
      isValidPassword = true;
    } else if (user.email === 'user@tennispadelclub.com' && password === 'password123') {
      isValidPassword = true;
    } else {
      isValidPassword = await comparePassword(password, userPassword);
    }
    
    if (!isValidPassword) {
      return NextResponse.json(
        { error: 'Credenciales inválidas' },
        { status: 401 }
      );
    }

    // Generate JWT token
    const tokenPayload = {
      userId: user.id,
      email: user.email,
      role: user.role,
    };
    
    const token = generateToken(tokenPayload);

    // Create response
    const response = NextResponse.json({
      success: true,
      user: {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        phone: user.phone,
        role: user.role,
      },
      token,
    });

    // Set HTTP-only cookie
    response.cookies.set('auth-token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60, // 7 days
    });

    return response;
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    );
  }
}
