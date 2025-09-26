'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, Calendar, DollarSign, TrendingUp, Settings, BarChart3, Plus } from 'lucide-react';

interface StatCard {
  title: string;
  value: string;
  change: string;
  icon: React.ReactNode;
  color: string;
}

const stats: StatCard[] = [
  {
    title: 'Usuarios Activos',
    value: '1,234',
    change: '+12%',
    icon: <Users className="w-6 h-6" />,
    color: 'text-blue-600 bg-blue-100'
  },
  {
    title: 'Reservas Hoy',
    value: '45',
    change: '+8%',
    icon: <Calendar className="w-6 h-6" />,
    color: 'text-green-600 bg-green-100'
  },
  {
    title: 'Ingresos Mensuales',
    value: '€12,450',
    change: '+15%',
    icon: <DollarSign className="w-6 h-6" />,
    color: 'text-yellow-600 bg-yellow-100'
  },
  {
    title: 'Torneos Activos',
    value: '3',
    change: '+1',
    icon: <TrendingUp className="w-6 h-6" />,
    color: 'text-purple-600 bg-purple-100'
  }
];

interface RecentActivity {
  id: string;
  type: 'booking' | 'tournament' | 'user';
  message: string;
  time: string;
}

const recentActivities: RecentActivity[] = [
  {
    id: '1',
    type: 'booking',
    message: 'Nueva reserva en Pista 1 - 15:00',
    time: '2 min'
  },
  {
    id: '2',
    type: 'tournament',
    message: 'Inscripción al Torneo de Verano',
    time: '5 min'
  },
  {
    id: '3',
    type: 'user',
    message: 'Nuevo usuario registrado',
    time: '10 min'
  },
  {
    id: '4',
    type: 'booking',
    message: 'Reserva cancelada en Pista 3',
    time: '15 min'
  }
];

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState('dashboard');

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'booking': return <Calendar className="w-4 h-4 text-blue-500" />;
      case 'tournament': return <TrendingUp className="w-4 h-4 text-green-500" />;
      case 'user': return <Users className="w-4 h-4 text-purple-500" />;
      default: return <Settings className="w-4 h-4 text-gray-500" />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Panel de Administración</h1>
          <p className="text-gray-600">Gestiona tu club de tenis y pádel</p>
        </div>

        {/* Navigation Tabs */}
        <div className="flex space-x-2 mb-6">
          <Button
            variant={activeTab === 'dashboard' ? 'primary' : 'outline'}
            onClick={() => setActiveTab('dashboard')}
          >
            Dashboard
          </Button>
          <Button
            variant={activeTab === 'bookings' ? 'primary' : 'outline'}
            onClick={() => setActiveTab('bookings')}
          >
            Reservas
          </Button>
          <Button
            variant={activeTab === 'tournaments' ? 'primary' : 'outline'}
            onClick={() => setActiveTab('tournaments')}
          >
            Torneos
          </Button>
          <Button
            variant={activeTab === 'users' ? 'primary' : 'outline'}
            onClick={() => setActiveTab('users')}
          >
            Usuarios
          </Button>
        </div>

        {activeTab === 'dashboard' && (
          <>
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {stats.map((stat, index) => (
                <Card key={index}>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                        <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                        <p className="text-sm text-green-600">{stat.change} vs mes anterior</p>
                      </div>
                      <div className={`p-3 rounded-full ${stat.color}`}>
                        {stat.icon}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Charts and Activity */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Chart Placeholder */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="w-5 h-5" />
                    Reservas por Mes
                  </CardTitle>
                  <CardDescription>
                    Estadísticas de reservas de los últimos 6 meses
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
                    <div className="text-center">
                      <BarChart3 className="w-12 h-12 text-gray-300 mx-auto mb-2" />
                      <p className="text-gray-500">Gráfico de reservas</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Recent Activity */}
              <Card>
                <CardHeader>
                  <CardTitle>Actividad Reciente</CardTitle>
                  <CardDescription>
                    Últimas actividades del sistema
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentActivities.map((activity) => (
                      <div key={activity.id} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                        {getActivityIcon(activity.type)}
                        <div className="flex-1">
                          <p className="text-sm font-medium text-gray-900">{activity.message}</p>
                          <p className="text-xs text-gray-500">{activity.time} atrás</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Quick Actions */}
            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Acciones Rápidas</CardTitle>
                <CardDescription>
                  Acciones comunes para gestionar el club
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Button className="h-20 flex flex-col items-center justify-center gap-2">
                    <Plus className="w-6 h-6" />
                    <span>Crear Torneo</span>
                  </Button>
                  <Button variant="outline" className="h-20 flex flex-col items-center justify-center gap-2">
                    <Calendar className="w-6 h-6" />
                    <span>Gestionar Reservas</span>
                  </Button>
                  <Button variant="outline" className="h-20 flex flex-col items-center justify-center gap-2">
                    <Users className="w-6 h-6" />
                    <span>Ver Usuarios</span>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </>
        )}

        {activeTab === 'bookings' && (
          <Card>
            <CardHeader>
              <CardTitle>Gestión de Reservas</CardTitle>
              <CardDescription>
                Administra todas las reservas del club
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12">
                <Calendar className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-600 mb-2">Gestión de Reservas</h3>
                <p className="text-gray-500">Aquí podrás ver y gestionar todas las reservas.</p>
              </div>
            </CardContent>
          </Card>
        )}

        {activeTab === 'tournaments' && (
          <Card>
            <CardHeader>
              <CardTitle>Gestión de Torneos</CardTitle>
              <CardDescription>
                Crea y administra torneos
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12">
                <TrendingUp className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-600 mb-2">Gestión de Torneos</h3>
                <p className="text-gray-500">Aquí podrás crear y gestionar torneos.</p>
              </div>
            </CardContent>
          </Card>
        )}

        {activeTab === 'users' && (
          <Card>
            <CardHeader>
              <CardTitle>Gestión de Usuarios</CardTitle>
              <CardDescription>
                Administra usuarios del club
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12">
                <Users className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-600 mb-2">Gestión de Usuarios</h3>
                <p className="text-gray-500">Aquí podrás gestionar todos los usuarios registrados.</p>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
