
import { PatrolRoute, IncidentReport, Announcement, GuestLog } from './types';

export const COLORS = {
  primary: '#0B0B0B',
  secondary: '#FFFFFF',
  accent: '#F5C400',
  gray: '#71717A',
  lightGray: '#F4F4F5',
  bg: '#F8F9FA',
  red: '#D92D20',
  green: '#16A34A'
};

export const PERSONNEL_PHOTOS = [
  'https://www.smpnegeri1kesamben.sch.id/wp-content/uploads/2022/02/Bagus-Setiawan-768x1167.jpg',
  'https://cdn.rri.co.id/berita/Mamuju/o/1735471096126-WhatsApp_Image_2024-12-29_at_18.04.35/7n2jl6u70ea1pxi.jpeg',
  'https://asset.kompas.com/crops/nmXCZMFkQXDqFAiDj9uD9i5yh1M=/0x0:0x0/1200x800/data/photo/2022/02/02/61fa0e7c807e6.jpg',
  'https://nawakara.com/wp-content/uploads/2024/11/Untitled-design-1.jpg',
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS9tZ_OWLfpR9i4MEGFCJOlgogPAXfAIIWGIw&s',
];

export const MOCK_TENANTS = [
  { id: 'COMP_A', name: 'PT. Manufaktur Jaya', industry: 'Otomotif', personnelCount: 12, status: 'Active' },
  { id: 'COMP_B', name: 'PT. Tekstil Sejahtera', industry: 'Tekstil', personnelCount: 8, status: 'Active' },
  { id: 'COMP_C', name: 'PT. Elektronik Maju', industry: 'Elektronik', personnelCount: 15, status: 'Active' },
  { id: 'COMP_D', name: 'PT. Logistik Aman', industry: 'Logistik', personnelCount: 6, status: 'Warning' },
];

export const MOCK_SHIFT_SCHEDULE = [
  { day: 'Sen', date: 28, shift: 'Pagi', time: '08:00 - 20:00', type: 'Duty' },
  { day: 'Sel', date: 29, shift: 'Pagi', time: '08:00 - 20:00', type: 'Duty' },
  { day: 'Rab', date: 30, shift: 'Latihan', time: '09:00 - 12:00', type: 'Joint Exercise', highlight: true },
  { day: 'Kam', date: 31, shift: 'Malam', time: '20:00 - 08:00', type: 'Duty' },
  { day: 'Jum', date: 1, shift: 'Malam', time: '20:00 - 08:00', type: 'Duty' },
  { day: 'Sab', date: 2, shift: '-', time: 'OFF', type: 'Rest' },
  { day: 'Min', date: 3, shift: '-', time: 'OFF', type: 'Rest' },
];

export const MOCK_GUESTS: GuestLog[] = [
  { id: 'G-001', name: 'Rian Hidayat', vehiclePlate: 'B 1234 ABC', purpose: 'Vendor IT', timeIn: '09:00', timeOut: '11:00' },
  { id: 'G-002', name: 'Siska Putri', vehiclePlate: 'B 9988 XYZ', purpose: 'Interview HR', timeIn: '10:15', timeOut: undefined },
  { id: 'G-003', name: 'Kurir Paket', vehiclePlate: 'D 4455 MK', purpose: 'Pengiriman Barang', timeIn: '14:20', timeOut: '14:35' },
];

export const MOCK_ACTIVITIES = [
  { id: 1, personnel: 'Bagus Setiawan', activity: 'Melakukan pengecekan kunci gudang utama.', time: '10:20', status: 'Selesai' },
  { id: 2, personnel: 'Agus Prayitno', activity: 'Mengawal truk logistik keluar kawasan.', time: '11:45', status: 'Selesai' },
  { id: 3, personnel: 'Sutrisno H.', activity: 'Briefing pergantian shift sore.', time: '15:30', status: 'Berlangsung' },
];

export const MOCK_INTERNAL_TEAM = [
  { id: 'SAT-001', name: 'Bagus Setiawan', photo: PERSONNEL_PHOTOS[0], role: 'Danru Sektor A', status: 'Online', phone: '+628123456789' },
  { id: 'SAT-002', name: 'Agus Prayitno', photo: PERSONNEL_PHOTOS[1], role: 'Anggota Patroli', status: 'Online', phone: '+628129999888' },
  { id: 'SAT-003', name: 'Sutrisno H.', photo: PERSONNEL_PHOTOS[2], role: 'Komandan Regu', status: 'Online', phone: '+628112233445' },
];

export const MOCK_KAWASAN_TEAM = [
  { id: '1', name: 'Bagus Setiawan', photo: PERSONNEL_PHOTOS[0], company: 'PT. Manufaktur Jaya' },
  { id: '2', name: 'Agus Prayitno', photo: PERSONNEL_PHOTOS[1], company: 'PT. Manufaktur Jaya' },
  { id: '3', name: 'Sutrisno H.', photo: PERSONNEL_PHOTOS[2], company: 'PT. Manufaktur Jaya' },
  { id: '4', name: 'Dedi Kurniawan', photo: PERSONNEL_PHOTOS[3], company: 'PT. Logistik Cepat' },
  { id: '5', name: 'Rahmat Hidayat', photo: PERSONNEL_PHOTOS[4], company: 'PT. Baja Utama' },
];

export const MOCK_INCIDENTS: IncidentReport[] = [
  {
    id: 'INC-001',
    timestamp: '2024-10-28T09:15:00Z',
    type: 'Pengecekan Perimeter',
    description: 'Pintu pagar Sektor C ditemukan tidak terkunci.',
    location: 'Gudang Sektor C',
    status: 'RESOLVED',
    reporter: 'Bambang Setyo',
  },
  {
    id: 'INC-002',
    timestamp: '2024-10-28T14:30:00Z',
    type: 'Temuan Anomali',
    description: 'Lampu penerangan jalan padam di area Gerbang 2.',
    location: 'Area Parkir Timur',
    status: 'URGENT',
    reporter: 'Bambang Setyo',
  }
];

export const MOCK_ROUTES: PatrolRoute[] = [
  {
    id: 'ROUTE-001',
    name: 'Patroli Sektor Barat',
    isCompleted: false,
    checkpoints: [
      { id: 'CP-1', name: 'Gerbang Utama', latitude: -6.28, longitude: 107.17, order: 1, status: 'PENDING' },
      { id: 'CP-2', name: 'Gudang Kimia', latitude: -6.29, longitude: 107.18, order: 2, status: 'PENDING' },
      { id: 'CP-3', name: 'Workshop Sektor 2', latitude: -6.30, longitude: 107.19, order: 3, status: 'PENDING' },
      { id: 'CP-4', name: 'Pos Pantau Belakang', latitude: -6.31, longitude: 107.20, order: 4, status: 'PENDING' },
    ]
  }
];

export const MOCK_CHART_DATA = [
  { name: 'Sen', nilai: 82 },
  { name: 'Sel', nilai: 94 },
  { name: 'Rab', nilai: 88 },
  { name: 'Kam', nilai: 91 },
  { name: 'Jum', nilai: 96 },
  { name: 'Sab', nilai: 85 },
  { name: 'Min', nilai: 98 },
];
