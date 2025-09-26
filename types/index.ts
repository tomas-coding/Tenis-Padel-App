// User types
export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phone: string;
  role: 'user' | 'admin';
  password?: string; // Optional for API responses, required for database
  createdAt: Date;
  updatedAt: Date;
}

// Court types
export interface Court {
  id: string;
  name: string;
  type: 'tennis' | 'padel';
  price: number;
  available: boolean;
  description?: string;
}

// Booking types
export interface Booking {
  id: string;
  userId: string;
  courtId: string;
  date: string;
  time: string;
  duration: number; // in hours
  totalPrice: number;
  status: 'confirmed' | 'cancelled' | 'completed';
  createdAt: Date;
  updatedAt: Date;
}

// Tournament types
export interface Tournament {
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
  rules?: string;
  prizes?: string;
  createdAt: Date;
  updatedAt: Date;
}

// Tournament registration
export interface TournamentRegistration {
  id: string;
  tournamentId: string;
  userId: string;
  status: 'registered' | 'confirmed' | 'cancelled';
  registrationDate: Date;
}

// API Response types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

// Form types
export interface LoginForm {
  email: string;
  password: string;
}

export interface RegisterForm {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
}

export interface BookingForm {
  courtId: string;
  date: string;
  time: string;
  duration: number;
}

// Statistics types
export interface DashboardStats {
  totalUsers: number;
  totalBookings: number;
  totalRevenue: number;
  activeTournaments: number;
  bookingsToday: number;
  revenueThisMonth: number;
}

// Activity types
export interface Activity {
  id: string;
  type: 'booking' | 'tournament' | 'user';
  message: string;
  timestamp: Date;
  userId?: string;
}
