import { NextRequest, NextResponse } from 'next/server';
import { verifyToken } from '@/lib/auth';
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
    password: '$2b$12$M4I87LJAxsu.GU4trQUVi.Qz8/DuiST5ZDfTXvSEBXJFFbkbPBt0u',
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
    password: '$2b$12$M4I87LJAxsu.GU4trQUVi.Qz8/DuiST5ZDfTXvSEBXJFFbkbPBt0u',
  },
];

export async function GET(request: NextRequest) {
  try {
    // Get token from cookie
    const token = request.cookies.get('auth-token')?.value;
    
    if (!token) {
      return NextResponse.json(
        { error: 'No autorizado' },
        { status: 401 }
      );
    }

    // Verify token
    const decoded = verifyToken(token);
    if (!decoded) {
      return NextResponse.json(
        { error: 'Token inválido' },
        { status: 401 }
      );
    }

    // Find user
    const user = mockUsers.find(u => u.id === decoded.userId);
    if (!user) {
      return NextResponse.json(
        { error: 'Usuario no encontrado' },
        { status: 404 }
      );
    }

    // Return user data (without password)
    return NextResponse.json({
      success: true,
      user: {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        phone: user.phone,
        role: user.role,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      },
    });
  } catch (error) {
    console.error('Get user error:', error);
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    );
  }
}
