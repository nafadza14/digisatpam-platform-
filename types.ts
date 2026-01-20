
export enum UserRole {
  KOMANDAN_SATPAM = 'KOMANDAN_SATPAM',
  DANRU = 'DANRU',
  ANGGOTA_SATPAM = 'ANGGOTA_SATPAM',
  MANAGEMENT = 'MANAGEMENT',
  KAWASAN_ADMIN = 'KAWASAN_ADMIN',
  PLATFORM_ADMIN = 'PLATFORM_ADMIN',
}

export type Specialization = 'MEDIS' | 'KEBAKARAN' | 'KEAMANAN';

export type IncidentStatus = 'PENDING' | 'RESOLVED' | 'URGENT';

export interface UserProfile {
  id: string;
  name: string;
  role: UserRole;
  specialization?: Specialization;
  avatar?: string;
  companyId: string;
  companyName: string;
  phone: string;
  email?: string;
  kawasanId: string;
}

export interface Checkpoint {
  id: string;
  name: string;
  latitude: number;
  longitude: number;
  order: number;
  status: 'PENDING' | 'COMPLETED' | 'MISSED';
  timeChecked?: string;
}

export interface PatrolRoute {
  id: string;
  name: string;
  checkpoints: Checkpoint[];
  isCompleted: boolean;
}

export interface IncidentReport {
  id: string;
  timestamp: string;
  type: string;
  description: string;
  location: string;
  status: IncidentStatus;
  reporter: string;
  photoUrl?: string;
}

export interface GuestLog {
  id: string;
  name: string;
  vehiclePlate: string;
  purpose: string;
  timeIn: string;
  timeOut?: string;
  photoUrl?: string;
}

export interface Announcement {
  id: string;
  title: string;
  content: string;
  sender: 'KAWASAN' | 'PERUSAHAAN';
  timestamp: string;
  isRead: boolean;
}

// Added AttendanceLog interface to fix import error in api.ts
export interface AttendanceLog {
  id: string;
  userId: string;
  type: 'IN' | 'OUT';
  timestamp: string;
  lat: number;
  lng: number;
  status: 'VALID' | 'INVALID';
}
