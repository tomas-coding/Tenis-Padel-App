import { create } from 'zustand';
import { Tournament, TournamentRegistration } from '@/types';

interface TournamentsState {
  tournaments: Tournament[];
  registrations: TournamentRegistration[];
  isLoading: boolean;
  getTournaments: () => Promise<void>;
  registerForTournament: (tournamentId: string, userId: string) => Promise<void>;
  createTournament: (tournamentData: Omit<Tournament, 'id' | 'createdAt' | 'updatedAt'>) => Promise<void>;
}

const mockTournaments: Tournament[] = [
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
    description: 'Torneo individual de tenis con premios para los ganadores. Categorías: principiante, intermedio y avanzado.',
    createdAt: new Date(),
    updatedAt: new Date(),
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
    description: 'Liga por equipos de pádel. Formato de dobles con sistema de eliminación directa.',
    createdAt: new Date(),
    updatedAt: new Date(),
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
    description: 'Torneo rápido de tenis en formato de tie-break. Duración aproximada: 2 horas.',
    createdAt: new Date(),
    updatedAt: new Date(),
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
    description: 'Gran campeonato anual de pádel con premios especiales y categorías por nivel.',
    createdAt: new Date(),
    updatedAt: new Date(),
  }
];

const mockRegistrations: TournamentRegistration[] = [
  {
    id: '1',
    tournamentId: '1',
    userId: '1',
    status: 'confirmed',
    registrationDate: new Date(),
  },
  {
    id: '2',
    tournamentId: '3',
    userId: '1',
    status: 'registered',
    registrationDate: new Date(),
  },
];

export const useTournamentsStore = create<TournamentsState>((set, get) => ({
  tournaments: [],
  registrations: [],
  isLoading: false,

  getTournaments: async () => {
    set({ isLoading: true });
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      set({ tournaments: mockTournaments, registrations: mockRegistrations, isLoading: false });
    } catch (error) {
      set({ isLoading: false });
      throw error;
    }
  },

  registerForTournament: async (tournamentId: string, userId: string) => {
    set({ isLoading: true });
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const newRegistration: TournamentRegistration = {
        id: Date.now().toString(),
        tournamentId,
        userId,
        status: 'registered',
        registrationDate: new Date(),
      };

      // Update tournament participants count
      set(state => ({
        tournaments: state.tournaments.map(tournament =>
          tournament.id === tournamentId
            ? { ...tournament, currentParticipants: tournament.currentParticipants + 1 }
            : tournament
        ),
        registrations: [...state.registrations, newRegistration],
        isLoading: false,
      }));
    } catch (error) {
      set({ isLoading: false });
      throw error;
    }
  },

  createTournament: async (tournamentData) => {
    set({ isLoading: true });
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const newTournament: Tournament = {
        id: Date.now().toString(),
        ...tournamentData,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      set(state => ({
        tournaments: [...state.tournaments, newTournament],
        isLoading: false,
      }));
    } catch (error) {
      set({ isLoading: false });
      throw error;
    }
  },
}));
