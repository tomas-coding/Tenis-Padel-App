'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar, Clock, Users, MapPin, CheckCircle } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import Navigation from '@/components/Navigation';

interface Court {
  id: string;
  name: string;
  type: 'tennis' | 'padel';
  price: number;
  available: boolean;
}

interface TimeSlot {
  time: string;
  available: boolean;
}

const courts: Court[] = [
  { id: '1', name: 'Pista 1', type: 'tennis', price: 25, available: true },
  { id: '2', name: 'Pista 2', type: 'tennis', price: 25, available: true },
  { id: '3', name: 'Pista 3', type: 'padel', price: 20, available: true },
  { id: '4', name: 'Pista 4', type: 'padel', price: 20, available: false },
];

const timeSlots: TimeSlot[] = [
  { time: '09:00', available: true },
  { time: '10:00', available: true },
  { time: '11:00', available: false },
  { time: '12:00', available: true },
  { time: '13:00', available: true },
  { time: '14:00', available: true },
  { time: '15:00', available: false },
  { time: '16:00', available: true },
  { time: '17:00', available: true },
  { time: '18:00', available: true },
  { time: '19:00', available: true },
  { time: '20:00', available: true },
];

export default function BookingsPage() {
  const { user, isLoading } = useAuth(false); // Temporarily disable auth requirement
  const [selectedCourt, setSelectedCourt] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [isBooking, setIsBooking] = useState(false);

  const handleBooking = async () => {
    if (!selectedCourt || !selectedDate || !selectedTime) return;
    
    setIsBooking(true);
    // Simulate booking process
    setTimeout(() => {
      setIsBooking(false);
      alert('¡Reserva confirmada!');
      setSelectedCourt(null);
      setSelectedDate('');
      setSelectedTime(null);
    }, 1000);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Cargando...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      <Navigation />
      
      <div className="p-4">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Reservar Pista</h1>
            <p className="text-gray-600">
              Bienvenido, {user?.firstName}! Selecciona tu pista, fecha y horario preferido
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Court Selection */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="w-5 h-5" />
                  Seleccionar Pista
                </CardTitle>
                <CardDescription>
                  Elige entre nuestras pistas de tenis y pádel
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {courts.map((court) => (
                  <div
                    key={court.id}
                    className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                      selectedCourt === court.id
                        ? 'border-green-500 bg-green-50'
                        : 'border-gray-200 hover:border-gray-300'
                    } ${!court.available ? 'opacity-50 cursor-not-allowed' : ''}`}
                    onClick={() => court.available && setSelectedCourt(court.id)}
                  >
                    <div className="flex justify-between items-center">
                      <div>
                        <h3 className="font-semibold">{court.name}</h3>
                        <p className="text-sm text-gray-600 capitalize">{court.type}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-green-600">€{court.price}/h</p>
                        <p className="text-xs text-gray-500">
                          {court.available ? 'Disponible' : 'Ocupada'}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Date Selection */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="w-5 h-5" />
                  Seleccionar Fecha
                </CardTitle>
                <CardDescription>
                  Elige el día para tu reserva
                </CardDescription>
              </CardHeader>
              <CardContent>
                <input
                  type="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  min={new Date().toISOString().split('T')[0]}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </CardContent>
            </Card>

            {/* Time Selection */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="w-5 h-5" />
                  Seleccionar Horario
                </CardTitle>
                <CardDescription>
                  Elige el horario disponible
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-3 gap-2">
                  {timeSlots.map((slot) => (
                    <button
                      key={slot.time}
                      className={`p-2 text-sm rounded border transition-colors ${
                        selectedTime === slot.time
                          ? 'border-green-500 bg-green-50 text-green-700'
                          : slot.available
                          ? 'border-gray-200 hover:border-gray-300'
                          : 'border-gray-200 bg-gray-100 text-gray-400 cursor-not-allowed'
                      }`}
                      onClick={() => slot.available && setSelectedTime(slot.time)}
                      disabled={!slot.available}
                    >
                      {slot.time}
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Booking Summary */}
          {(selectedCourt || selectedDate || selectedTime) && (
            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Resumen de la Reserva</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  <div>
                    <p className="text-sm text-gray-600">Pista</p>
                    <p className="font-semibold">
                      {courts.find(c => c.id === selectedCourt)?.name || 'No seleccionada'}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Fecha</p>
                    <p className="font-semibold">{selectedDate || 'No seleccionada'}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Horario</p>
                    <p className="font-semibold">{selectedTime || 'No seleccionado'}</p>
                  </div>
                </div>
                
                {selectedCourt && selectedDate && selectedTime && (
                  <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
                    <div>
                      <p className="font-semibold text-green-800">Precio total</p>
                      <p className="text-2xl font-bold text-green-600">
                        €{courts.find(c => c.id === selectedCourt)?.price}
                      </p>
                    </div>
                    <Button
                      onClick={handleBooking}
                      disabled={isBooking}
                      className="bg-green-600 hover:bg-green-700"
                    >
                      {isBooking ? 'Confirmando...' : 'Confirmar Reserva'}
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
