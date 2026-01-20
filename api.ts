
import { MOCK_INCIDENTS, MOCK_ROUTES } from './constants';
import { IncidentReport, PatrolRoute, AttendanceLog } from './types';

const KAWASAN_CENTER = { lat: -6.28, lng: 107.17 };
const GEOFENCE_RADIUS = 2000; // 2km

function getDistance(lat1: number, lon1: number, lat2: number, lon2: number) {
  const R = 6371e3; 
  const φ1 = lat1 * Math.PI/180;
  const φ2 = lat2 * Math.PI/180;
  const Δφ = (lat2-lat1) * Math.PI/180;
  const Δλ = (lon2-lon1) * Math.PI/180;
  const a = Math.sin(Δφ/2) * Math.sin(Δφ/2) +
          Math.cos(φ1) * Math.cos(φ2) *
          Math.sin(Δλ/2) * Math.sin(Δλ/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  return R * c;
}

export const api = {
  getIncidents: async (): Promise<IncidentReport[]> => {
    await new Promise(r => setTimeout(r, 400));
    return MOCK_INCIDENTS;
  },

  getPatrolRoutes: async (): Promise<PatrolRoute[]> => {
    await new Promise(r => setTimeout(r, 300));
    return MOCK_ROUTES;
  },

  submitAttendance: async (coords: { lat: number; lng: number }, type: 'IN' | 'OUT'): Promise<AttendanceLog> => {
    const dist = getDistance(coords.lat, coords.lng, KAWASAN_CENTER.lat, KAWASAN_CENTER.lng);
    const status = dist <= GEOFENCE_RADIUS ? 'VALID' : 'INVALID';
    
    return {
      id: Math.random().toString(36).substr(2, 9),
      userId: 'current-user',
      type,
      timestamp: new Date().toISOString(),
      lat: coords.lat,
      lng: coords.lng,
      status
    };
  },

  submitIncident: async (report: Partial<IncidentReport>) => {
    console.log("Backend: Menyimpan insiden dengan bukti digital", report);
    return { success: true, id: 'INC-' + Date.now() };
  },

  updateCheckpoint: async (routeId: string, checkpointId: string) => {
    console.log(`Backend: Checkpoint ${checkpointId} di rute ${routeId} terverifikasi via GPS.`);
    return { success: true };
  }
};
