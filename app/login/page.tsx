'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Eye, EyeOff, Mail, Lock } from 'lucide-react';
import { useAuthStore } from '@/store/auth';

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isRedirecting, setIsRedirecting] = useState(false);
  
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams.get('redirect') || '/bookings';
  
  const { login, isLoading, isAuthenticated } = useAuthStore();

  // Check if user is already authenticated - DISABLED FOR TESTING
  // useEffect(() => {
  //   if (isAuthenticated && !isRedirecting) {
  //     console.log('User already authenticated, redirecting...');
  //     router.push(redirect);
  //   }
  // }, [isAuthenticated, router, redirect, isRedirecting]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Por favor completa todos los campos');
      return;
    }

    const result = await login(email, password);
    console.log('Login result:', result);
    console.log('Redirect URL:', redirect);
    
    if (result.success) {
      console.log('Login successful, redirecting to:', redirect);
      setIsRedirecting(true);
      // Force immediate redirect
      window.location.href = redirect;
    } else {
      console.log('Login failed:', result.error);
      setError(result.error || 'Error al iniciar sesión');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl text-center">Iniciar Sesión</CardTitle>
          <CardDescription className="text-center">
            Ingresa tus credenciales para acceder a tu cuenta
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-sm text-red-600">{error}</p>
              </div>
            )}
            
            <div className="space-y-2">
              <Input
                type="email"
                placeholder="correo@ejemplo.com"
                label="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                icon={<Mail className="w-4 h-4" />}
              />
            </div>
            <div className="space-y-2">
              <div className="relative">
                <Input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  label="Contraseña"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  icon={<Lock className="w-4 h-4" />}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-8 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>
            <Button type="submit" className="w-full" disabled={isLoading || isRedirecting}>
              {isRedirecting ? 'Redirigiendo...' : isLoading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
            </Button>
          </form>
          
          <div className="mt-6 space-y-4">
            <div className="text-center">
              <p className="text-sm text-gray-600">
                ¿No tienes una cuenta?{' '}
                <Link href="/register" className="text-green-600 hover:text-green-700 font-medium">
                  Regístrate aquí
                </Link>
              </p>
            </div>
            
            <div className="text-center">
              <p className="text-xs text-gray-500">
                <strong>Credenciales de prueba:</strong><br />
                Admin: admin@tennispadelclub.com / password123<br />
                Usuario: user@tennispadelclub.com / password123
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
