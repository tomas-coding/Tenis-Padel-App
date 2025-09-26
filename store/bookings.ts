import { create } from 'zustand';
import { Booking, Court } from '@/types';

interface BookingsState {
  bookings: Booking[];
  courts: Court[];
  isLoading: boolean;
  createBooking: (bookingData: Omit<Booking, 'id' | 'createdAt' | 'updatedAt'>) => Promise<void>;
  cancelBooking: (bookingId: string) => Promise<void>;
  getBookings: () => Promise<void>;
  getCourts: () => Promise<void>;
}

const mockCourts: Court[] = [
  { id: '1', name: 'Pista 1', type: 'tennis', price: 25, available: true },
  { id: '2', name: 'Pista 2', type: 'tennis', price: 25, available: true },
  { id: '3', name: 'Pista 3', type: 'padel', price: 20, available: true },
  { id: '4', name: 'Pista 4', type: 'padel', price: 20, available: false },
];

const mockBookings: Booking[] = [
  {
    id: '1',
    userId: '1',
    courtId: '1',
    date: '2024-07-15',
    time: '15:00',
    duration: 1,
    totalPrice: 25,
    status: 'confirmed',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: '2',
    userId: '1',
    courtId: '3',
    date: '2024-07-16',
    time: '18:00',
    duration: 2,
    totalPrice: 40,
    status: 'confirmed',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

export const useBookingsStore = create<BookingsState>((set, get) => ({
  bookings: [],
  courts: [],
  isLoading: false,

  createBooking: async (bookingData) => {
    set({ isLoading: true });
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const newBooking: Booking = {
        id: Date.now().toString(),
        ...bookingData,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      set(state => ({
        bookings: [...state.bookings, newBooking],
        isLoading: false,
      }));
    } catch (error) {
      set({ isLoading: false });
      throw error;
    }
  },

  cancelBooking: async (bookingId: string) => {
    set({ isLoading: true });
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      set(state => ({
        bookings: state.bookings.map(booking =>
          booking.id === bookingId
            ? { ...booking, status: 'cancelled' as const, updatedAt: new Date() }
            : booking
        ),
        isLoading: false,
      }));
    } catch (error) {
      set({ isLoading: false });
      throw error;
    }
  },

  getBookings: async () => {
    set({ isLoading: true });
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      set({ bookings: mockBookings, isLoading: false });
    } catch (error) {
      set({ isLoading: false });
      throw error;
    }
  },

  getCourts: async () => {
    set({ isLoading: true });
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 300));
      set({ courts: mockCourts, isLoading: false });
    } catch (error) {
      set({ isLoading: false });
      throw error;
    }
  },
}));
