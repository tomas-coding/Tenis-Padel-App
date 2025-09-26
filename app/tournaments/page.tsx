'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Trophy, Calendar, Users, MapPin, Clock, Award } from 'lucide-react';

interface Tournament {
  id: string;
  name: string;
  type: 'tennis' | 'padel';
  date: string;
  time: string;
  location: string;
  maxParticipants: number;
  currentParticipants: number;
  price: number;
  status: 'upcoming' | 'ongoing' | 'completed';
  description: string;
}

const tournaments: Tournament[] = [
  {
    id: '1',
    name: 'Torneo de Verano - Tenis',
    type: 'tennis',
    date: '2024-07-15',
    time: '09:00',
    location: 'Pistas 1 y 2',
    maxParticipants: 32,
    currentParticipants: 24,
    price: 50,
    status: 'upcoming',
    description: 'Torneo individual de tenis con premios para los ganadores. Categorías: principiante, intermedio y avanzado.'
  },
  {
    id: '2',
    name: 'Liga de Pádel',
    type: 'padel',
    date: '2024-07-20',
    time: '18:00',
    location: 'Pistas 3 y 4',
    maxParticipants: 16,
    currentParticipants: 16,
    price: 40,
    status: 'upcoming',
    description: 'Liga por equipos de pádel. Formato de dobles con sistema de eliminación directa.'
  },
  {
    id: '3',
    name: 'Torneo Express - Tenis',
    type: 'tennis',
    date: '2024-07-10',
    time: '14:00',
    location: 'Pista 1',
    maxParticipants: 8,
    currentParticipants: 6,
    price: 25,
    status: 'upcoming',
    description: 'Torneo rápido de tenis en formato de tie-break. Duración aproximada: 2 horas.'
  },
  {
    id: '4',
    name: 'Campeonato de Pádel',
    type: 'padel',
    date: '2024-06-30',
    time: '10:00',
    location: 'Todas las pistas',
    maxParticipants: 24,
    currentParticipants: 24,
    price: 60,
    status: 'completed',
    description: 'Gran campeonato anual de pádel con premios especiales y categorías por nivel.'
  }
];

export default function TournamentsPage() {
  const [selectedType, setSelectedType] = useState<'all' | 'tennis' | 'padel'>('all');
  const [isRegistering, setIsRegistering] = useState<string | null>(null);

  const filteredTournaments = tournaments.filter(tournament => 
    selectedType === 'all' || tournament.type === selectedType
  );

  const handleRegister = async (tournamentId: string) => {
    setIsRegistering(tournamentId);
    // Simulate registration process
    setTimeout(() => {
      setIsRegistering(null);
      alert('¡Inscripción exitosa!');
    }, 1000);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'upcoming': return 'text-blue-600 bg-blue-100';
      case 'ongoing': return 'text-green-600 bg-green-100';
      case 'completed': return 'text-gray-600 bg-gray-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'upcoming': return 'Próximo';
      case 'ongoing': return 'En curso';
      case 'completed': return 'Completado';
      default: return 'Desconocido';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 p-4">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Torneos</h1>
          <p className="text-gray-600">Participa en nuestros torneos de tenis y pádel</p>
        </div>

        {/* Filter Tabs */}
        <div className="flex space-x-2 mb-6">
          <Button
            variant={selectedType === 'all' ? 'primary' : 'outline'}
            onClick={() => setSelectedType('all')}
          >
            Todos
          </Button>
          <Button
            variant={selectedType === 'tennis' ? 'primary' : 'outline'}
            onClick={() => setSelectedType('tennis')}
          >
            Tenis
          </Button>
          <Button
            variant={selectedType === 'padel' ? 'primary' : 'outline'}
            onClick={() => setSelectedType('padel')}
          >
            Pádel
          </Button>
        </div>

        {/* Tournaments Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTournaments.map((tournament) => (
            <Card key={tournament.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2">
                    <Trophy className="w-5 h-5 text-yellow-500" />
                    <CardTitle className="text-lg">{tournament.name}</CardTitle>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(tournament.status)}`}>
                    {getStatusText(tournament.status)}
                  </span>
                </div>
                <CardDescription className="text-sm">
                  {tournament.description}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-gray-500" />
                    <span>{new Date(tournament.date).toLocaleDateString('es-ES')}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-gray-500" />
                    <span>{tournament.time}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-gray-500" />
                    <span>{tournament.location}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-gray-500" />
                    <span>{tournament.currentParticipants}/{tournament.maxParticipants}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="text-2xl font-bold text-green-600">
                    €{tournament.price}
                  </div>
                  {tournament.status === 'upcoming' && tournament.currentParticipants < tournament.maxParticipants ? (
                    <Button
                      onClick={() => handleRegister(tournament.id)}
                      disabled={isRegistering === tournament.id}
                      size="sm"
                    >
                      {isRegistering === tournament.id ? 'Inscribiendo...' : 'Inscribirse'}
                    </Button>
                  ) : tournament.status === 'completed' ? (
                    <div className="flex items-center gap-1 text-gray-500">
                      <Award className="w-4 h-4" />
                      <span className="text-sm">Finalizado</span>
                    </div>
                  ) : (
                    <span className="text-sm text-gray-500">Completo</span>
                  )}
                </div>

                {/* Progress bar for participants */}
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-green-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${(tournament.currentParticipants / tournament.maxParticipants) * 100}%` }}
                  ></div>
                </div>
                <p className="text-xs text-gray-500 text-center">
                  {tournament.maxParticipants - tournament.currentParticipants} plazas disponibles
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredTournaments.length === 0 && (
          <div className="text-center py-12">
            <Trophy className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-600 mb-2">No hay torneos disponibles</h3>
            <p className="text-gray-500">No hay torneos programados para el tipo seleccionado.</p>
          </div>
        )}
      </div>
    </div>
  );
}
