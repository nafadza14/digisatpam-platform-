
import React, { useState, useEffect, useRef } from 'react';
import { PatrolRoute, UserProfile, IncidentReport } from '../types';
import { 
  PERSONNEL_PHOTOS, 
  MOCK_ROUTES, 
  MOCK_INTERNAL_TEAM, 
  MOCK_KAWASAN_TEAM, 
  MOCK_INCIDENTS, 
  MOCK_SHIFT_SCHEDULE 
} from '../constants';

interface PWASatpamProps {
  user: UserProfile;
  onLogout: () => void;
}

// --- Icons (Stroke 2, Optimized for PWA) ---
const IconHome = ({ className = "w-6 h-6" }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3" /></svg>
);
const IconMap = ({ className = "w-6 h-6" }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" /></svg>
);
const IconBell = ({ className = "w-6 h-6" }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6 6 0 10-12 0v3a2.032 2.032 0 01-.595 1.405L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg>
);
const IconUser = ({ className = "w-6 h-6" }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
);
const IconCalendar = ({ className = "w-6 h-6" }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
);
const IconActivity = ({ className = "w-6 h-6" }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
);
const IconGroup = ({ className = "w-6 h-6" }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
);
const IconAlert = ({ className = "w-6 h-6" }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
);
const IconCamera = ({ className = "w-6 h-6" }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" /><circle cx="12" cy="13" r="3" strokeWidth="2" /></svg>
);
const IconInfo = ({ className = "w-6 h-6" }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
);

// Added IconCheck component to fix the 'Cannot find name IconCheck' error
const IconCheck = ({ className = "w-6 h-6" }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" /></svg>
);

const PWASatpam: React.FC<PWASatpamProps> = ({ user, onLogout }) => {
  const [activeTab, setActiveTab] = useState<'home' | 'patrol' | 'update' | 'account'>('home');
  const [activeOverlay, setActiveOverlay] = useState<'none' | 'shift' | 'incident' | 'activity' | 'guest' | 'emergency' | 'presence'>('none');
  const [time, setTime] = useState(new Date());
  const [isDuty, setIsDuty] = useState(false);
  const [presenceStep, setPresenceStep] = useState<'camera' | 'verifying' | 'success'>('camera');
  const [locationStatus, setLocationStatus] = useState<string>('Mencari lokasi...');

  const route = MOCK_ROUTES[0];
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const startPresenceCamera = async () => {
    setActiveOverlay('presence');
    setPresenceStep('camera');
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'user' } });
      if (videoRef.current) videoRef.current.srcObject = stream;
    } catch (err) {
      alert("Izin kamera diperlukan untuk presensi.");
      setActiveOverlay('none');
    }
  };

  const takeSelfie = () => {
    if (videoRef.current && canvasRef.current) {
      const context = canvasRef.current.getContext('2d');
      canvasRef.current.width = videoRef.current.videoWidth;
      canvasRef.current.height = videoRef.current.videoHeight;
      context?.drawImage(videoRef.current, 0, 0);
      
      const stream = videoRef.current.srcObject as MediaStream;
      stream.getTracks().forEach(track => track.stop());

      setPresenceStep('verifying');
      setLocationStatus('Memverifikasi GPS...');
      
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          () => {
            setTimeout(() => {
              setLocationStatus('Lokasi Terverifikasi: Kawasan Industri Sektor A');
              setPresenceStep('success');
              setTimeout(() => {
                setIsDuty(!isDuty);
                setActiveOverlay('none');
              }, 1500);
            }, 1200);
          },
          () => {
            setLocationStatus('Gagal verifikasi lokasi. Pastikan GPS aktif.');
            setTimeout(() => setActiveOverlay('none'), 2000);
          }
        );
      }
    }
  };

  const handleCameraOverlay = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } });
      if (videoRef.current) videoRef.current.srcObject = stream;
    } catch (err) {
      alert("Izin kamera diperlukan.");
    }
  };

  const renderOverlay = () => {
    if (activeOverlay === 'none') return null;
    
    const content = {
      presence: (
        <div className="fixed inset-0 z-[1000] bg-black flex flex-col items-center justify-center p-6 animate-in fade-in">
          <div className="w-full max-w-sm flex flex-col items-center gap-8">
            <h2 className="text-white text-xl font-bold tracking-tight">Presensi Selfie</h2>
            <div className="w-full aspect-[3/4] rounded-[56px] overflow-hidden border-2 border-white/20 relative bg-gray-900 flex items-center justify-center">
              {presenceStep === 'camera' && (
                <>
                  <video ref={videoRef} autoPlay playsInline className="w-full h-full object-cover scale-x-[-1]" />
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                     <div className="w-60 h-80 border-2 border-dashed border-white/40 rounded-[70px]"></div>
                  </div>
                </>
              )}
              {presenceStep === 'verifying' && (
                <div className="flex flex-col items-center gap-4 text-white p-10 text-center">
                  <div className="w-12 h-12 border-4 border-t-transparent border-white rounded-full animate-spin"></div>
                  <p className="text-sm font-bold animate-pulse">{locationStatus}</p>
                </div>
              )}
              {presenceStep === 'success' && (
                <div className="flex flex-col items-center gap-4 text-green-400 p-10 text-center animate-in zoom-in">
                  <div className="w-24 h-24 bg-green-500/20 rounded-full flex items-center justify-center">
                    <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" /></svg>
                  </div>
                  <p className="text-2xl font-black text-white">Berhasil!</p>
                  <p className="text-xs text-white/60">Data presensi telah tersimpan di sistem pusat.</p>
                </div>
              )}
            </div>
            {presenceStep === 'camera' && (
              <div className="flex gap-6 items-center">
                <button onClick={() => setActiveOverlay('none')} className="w-14 h-14 bg-white/10 rounded-full flex items-center justify-center text-white"><svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" /></svg></button>
                <button onClick={takeSelfie} className="w-20 h-20 rounded-full border-4 border-white/20 p-1"><div className="w-full h-full bg-white rounded-full"></div></button>
              </div>
            )}
          </div>
          <canvas ref={canvasRef} className="hidden" />
        </div>
      ),
      shift: (
        <div className="space-y-6 animate-in slide-in-from-bottom duration-300 text-left">
          <h2 className="text-xl font-bold tracking-tight px-2">Jadwal shift minggu ini</h2>
          <div className="grid grid-cols-7 gap-2">
            {MOCK_SHIFT_SCHEDULE.map((s, i) => (
              <div key={i} className={`flex flex-col items-center p-2.5 rounded-2xl border ${s.highlight ? 'bg-[#F5C400]/10 border-[#F5C400]' : 'bg-white border-gray-100'}`}>
                <span className="text-[9px] font-bold text-gray-400 uppercase">{s.day}</span>
                <span className="text-sm font-black mt-1">{s.date}</span>
                <div className={`w-1.5 h-1.5 rounded-full mt-2 ${s.type === 'Rest' ? 'bg-gray-100' : s.highlight ? 'bg-[#F5C400]' : 'bg-black'}`}></div>
              </div>
            ))}
          </div>
          <div className="bg-white p-6 rounded-[32px] border border-gray-100 shadow-sm">
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Piket Mendatang</p>
            <p className="font-bold text-black mt-1">Latihan Bersama Kawasan</p>
            <p className="text-xs text-gray-500 mt-2">Rabu, 30 Okt • 09:00 WIB • Lapangan Sektor C</p>
          </div>
        </div>
      ),
      incident: (
        <div className="space-y-6 animate-in slide-in-from-bottom duration-300 text-left">
          <h2 className="text-xl font-bold tracking-tight px-2">Laporan insiden</h2>
          <div className="bg-white p-6 rounded-[32px] border border-gray-100 space-y-4 shadow-sm">
            <select className="w-full bg-gray-50 p-4 rounded-2xl text-sm border-none">
              <option>Pengecekan Perimeter</option>
              <option>Temuan Anomali</option>
              <option>Kebakaran / Asap</option>
            </select>
            <textarea className="w-full bg-gray-50 p-4 rounded-2xl text-sm border-none min-h-[120px]" placeholder="Detail kejadian..." />
            <button onClick={() => setActiveOverlay('none')} className="w-full py-5 bg-black text-white rounded-[24px] font-bold text-xs uppercase tracking-widest">Kirim</button>
          </div>
        </div>
      ),
      activity: (
        <div className="space-y-6 animate-in slide-in-from-bottom duration-300 text-left">
           <h2 className="text-xl font-bold tracking-tight px-2">Catat aktivitas</h2>
           <div className="bg-white p-6 rounded-[32px] border border-gray-100 space-y-4 shadow-sm">
              <textarea className="w-full bg-gray-50 p-4 rounded-2xl text-sm border-none min-h-[150px]" placeholder="Apa yang Anda kerjakan saat ini?" />
              <button onClick={() => setActiveOverlay('none')} className="w-full py-5 bg-black text-white rounded-[24px] font-bold text-xs uppercase tracking-widest">Simpan Log</button>
           </div>
        </div>
      ),
      guest: (
        <div className="space-y-6 animate-in slide-in-from-bottom duration-300 text-left">
           <h2 className="text-xl font-bold tracking-tight px-2">Registrasi Tamu</h2>
           <div className="bg-white p-6 rounded-[32px] border border-gray-100 space-y-4 shadow-sm">
              <button onClick={handleCameraOverlay} className="w-full aspect-video bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200 flex flex-col items-center justify-center gap-2 text-gray-400">
                 <IconCamera className="w-8 h-8" />
                 <span className="text-[10px] font-bold uppercase tracking-widest">Ambil Foto Kendaraan/ID</span>
              </button>
              <input type="text" className="w-full bg-gray-50 p-4 rounded-2xl text-sm border-none" placeholder="Nama Lengkap Tamu" />
              <input type="text" className="w-full bg-gray-50 p-4 rounded-2xl text-sm border-none" placeholder="Plat Nomor Kendaraan" />
              <button onClick={() => setActiveOverlay('none')} className="w-full py-5 bg-black text-white rounded-[24px] font-bold text-xs uppercase tracking-widest">Proses Masuk</button>
           </div>
        </div>
      ),
      emergency: (
        <div className="space-y-6 animate-in slide-in-from-bottom duration-300 text-left">
          <h2 className="text-xl font-bold tracking-tight px-2 text-red-600">Kedaruratan (SOS)</h2>
          <div className="bg-red-50 p-6 rounded-[40px] border border-red-100 space-y-6">
            <p className="text-sm font-medium text-red-800 leading-relaxed">Pusat monitoring dan unit patroli kawasan terdekat akan segera merespons lokasi Anda.</p>
            <div className="space-y-2">
              <label className="text-[10px] font-bold text-red-400 uppercase tracking-widest">Kategori Darurat</label>
              <textarea className="w-full bg-white/50 border-red-200 p-4 rounded-2xl text-sm min-h-[100px]" placeholder="Jelaskan situasi singkat..." />
            </div>
            <button onClick={() => { alert("SOS AKTIF!"); setActiveOverlay('none'); }} className="w-full py-6 bg-red-600 text-white rounded-[28px] font-black text-xs uppercase tracking-[0.2em] shadow-2xl shadow-red-200">AKTIFKAN SOS</button>
          </div>
        </div>
      )
    };

    return (
      <div className="fixed inset-0 z-[600] bg-[#F8F9FA] overflow-y-auto px-6 py-20">
        <div className="max-w-lg mx-auto">
          <button onClick={() => setActiveOverlay('none')} className="mb-8 w-12 h-12 bg-white rounded-2xl shadow-sm border border-gray-100 flex items-center justify-center active:scale-90 transition-transform"><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 19l-7-7 7-7" /></svg></button>
          {content[activeOverlay as keyof typeof content]}
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-[#F8F9FA] flex flex-col items-center pb-32 font-sans overflow-x-hidden">
      
      {/* --- App Header (Swift UI Header) --- */}
      <header className="w-full max-w-lg px-6 pt-12 pb-5 flex justify-between items-center bg-white/80 backdrop-blur-2xl sticky top-0 z-50 border-b border-gray-100">
        <div className="flex flex-col text-left">
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Digisatpam App</p>
          <h1 className="text-xl font-extrabold tracking-tight text-gray-900">{activeTab.toUpperCase()}</h1>
        </div>
        <div className="flex items-center gap-3">
           <div className={`w-2.5 h-2.5 rounded-full ${isDuty ? 'bg-green-500 animate-pulse' : 'bg-gray-300'}`}></div>
           <button onClick={() => setActiveTab('account')} className="w-10 h-10 rounded-full shadow-sm border border-gray-100 overflow-hidden active:scale-95 transition-transform">
             <img src={PERSONNEL_PHOTOS[2]} className="w-full h-full object-cover" alt="Profile" />
           </button>
        </div>
      </header>

      <div className="w-full max-w-lg px-6 mt-6 flex-1">
        
        {/* --- Home View --- */}
        {activeTab === 'home' && (
          <div className="space-y-10 animate-in fade-in slide-in-from-bottom duration-500 pb-10">
            {/* Presence Card (Swift UI Style: Black + White Accent) */}
            <section className="bg-black p-8 rounded-[48px] text-white text-left relative overflow-hidden shadow-[0_30px_60px_-15px_rgba(0,0,0,0.3)] border border-white/5">
              <div className="absolute -top-12 -right-12 w-48 h-48 bg-white/5 rounded-full blur-3xl"></div>
              
              <div className="z-10 relative flex justify-between items-start mb-10">
                <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-black shadow-xl">
                  <IconCamera className="w-7 h-7" />
                </div>
                <span className={`px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest border transition-colors ${isDuty ? 'bg-green-500/10 text-green-400 border-green-500/20' : 'bg-red-500/10 text-red-400 border-red-500/20'}`}>
                  {isDuty ? 'Aktif Bertugas' : 'Tidak Aktif'}
                </span>
              </div>

              <div className="relative z-10 mb-8">
                <p className="text-[11px] font-bold text-gray-500 uppercase tracking-[0.25em] mb-1">Presensi Hari Ini</p>
                <h4 className="text-5xl font-black tracking-tighter">{time.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</h4>
              </div>

              <button onClick={startPresenceCamera} className="relative z-10 w-full py-5 bg-[#F5C400] text-black rounded-[28px] font-black text-xs uppercase tracking-[0.2em] shadow-lg active:scale-95 transition-all">
                {isDuty ? 'Selesaikan Shift' : 'Mulai Presensi Selfie'}
              </button>
            </section>

            {/* Menu Grid (Swift UI Aesthetic) */}
            <section className="space-y-4">
              <h3 className="text-[13px] font-bold text-gray-400 uppercase tracking-widest px-2 text-left">Layanan Cepat</h3>
              <div className="grid grid-cols-3 gap-4">
                {[
                  { id: 'patrol', label: 'Rute', icon: <IconMap />, action: () => setActiveTab('patrol') },
                  { id: 'shift', label: 'Jadwal', icon: <IconCalendar />, action: () => setActiveOverlay('shift') },
                  { id: 'incident', label: 'Laporan', icon: <IconBell />, action: () => setActiveOverlay('incident') },
                  { id: 'activity', label: 'Aktivitas', icon: <IconActivity />, action: () => setActiveOverlay('activity') },
                  { id: 'guest', label: 'Tamu', icon: <IconGroup />, action: () => setActiveOverlay('guest') },
                  { id: 'emergency', label: 'Kedaruratan', icon: <IconAlert className="text-red-600" />, action: () => setActiveOverlay('emergency'), labelClass: "text-red-600" },
                ].map((item) => (
                  <button key={item.id} onClick={item.action} className="bg-white p-5 rounded-[32px] flex flex-col items-center justify-center gap-3 shadow-sm border border-gray-100 active:scale-90 transition-all aspect-square">
                    <div className="w-12 h-12 bg-gray-50 rounded-2xl flex items-center justify-center text-black">{item.icon}</div>
                    <span className={`text-[10px] font-bold uppercase tracking-tight text-center ${item.labelClass || 'text-gray-800'}`}>{item.label}</span>
                  </button>
                ))}
              </div>
            </section>

            {/* Petugas Aktif Section (Circular Avatars with Rings) */}
            <section className="space-y-5">
               <h3 className="text-[13px] font-bold text-gray-400 uppercase tracking-widest px-2 text-left">Petugas Aktif</h3>
               
               {/* Team Internal Card */}
               <div className="bg-white p-7 rounded-[40px] border border-gray-100 shadow-sm text-left">
                  <div className="flex justify-between items-center mb-6">
                     <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Internal PT. Manufaktur</p>
                     <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                  </div>
                  <div className="flex gap-4 overflow-x-auto no-scrollbar pb-1">
                     {MOCK_INTERNAL_TEAM.map(person => (
                        <div key={person.id} className="flex flex-col items-center gap-2 shrink-0">
                           <div className="w-16 h-16 rounded-full border-[3px] border-white shadow-md overflow-hidden ring-2 ring-green-500/20">
                              <img src={person.photo} className="w-full h-full object-cover" />
                           </div>
                           <span className="text-[10px] font-black text-gray-800 truncate w-16 text-center">{person.name.split(' ')[0]}</span>
                        </div>
                     ))}
                  </div>
               </div>

               {/* Team Kawasan Card */}
               <div className="bg-white p-7 rounded-[40px] border border-gray-100 shadow-sm text-left">
                  <div className="flex justify-between items-center mb-6">
                     <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Sektor Kawasan</p>
                     <span className="text-[9px] font-bold text-blue-600 bg-blue-50 px-3 py-1 rounded-full uppercase tracking-tighter">{MOCK_KAWASAN_TEAM.length} Online</span>
                  </div>
                  <div className="flex gap-4 overflow-x-auto no-scrollbar pb-1">
                     {MOCK_KAWASAN_TEAM.map(person => (
                        <div key={person.id} className="flex flex-col items-center gap-2 shrink-0">
                           <div className="w-16 h-16 rounded-full border-[3px] border-white shadow-sm overflow-hidden ring-2 ring-gray-100 grayscale-[0.2]">
                              <img src={person.photo} className="w-full h-full object-cover" />
                           </div>
                           <span className="text-[9px] font-bold text-gray-500 truncate w-16 text-center">{person.company.split(' ')[1]}</span>
                        </div>
                     ))}
                  </div>
               </div>
            </section>
          </div>
        )}

        {/* --- Patrol View --- */}
        {activeTab === 'patrol' && (
          <div className="space-y-6 animate-in slide-in-from-right duration-400 pb-10">
            <h2 className="text-xl font-bold px-2 text-left tracking-tight">Detail rute aktif</h2>
            <div className="bg-white p-6 rounded-[44px] border border-gray-100 shadow-sm space-y-6">
              {route.checkpoints.map((cp, idx) => (
                <div key={cp.id} className="flex gap-4 items-start relative text-left">
                  {idx !== route.checkpoints.length - 1 && <div className="absolute left-[15px] top-10 bottom-0 w-0.5 bg-gray-100"></div>}
                  <div className={`w-8 h-8 rounded-xl flex items-center justify-center font-bold text-[10px] shrink-0 ${cp.status === 'COMPLETED' ? 'bg-black text-white' : 'bg-gray-100 text-gray-300'}`}>
                    {idx + 1}
                  </div>
                  <div className="flex-1">
                    <p className={`font-bold text-[15px] ${cp.status === 'COMPLETED' ? 'text-black' : 'text-gray-400'}`}>{cp.name}</p>
                    <p className="text-[10px] text-gray-400 uppercase tracking-widest mt-1">Status: {cp.status}</p>
                  </div>
                  {cp.status === 'PENDING' && <button className="bg-black text-white px-4 py-2 rounded-2xl text-[9px] font-black uppercase tracking-widest active:scale-95 transition-transform">Verifikasi</button>}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* --- Update View (Riwayat & Notifikasi) --- */}
        {activeTab === 'update' && (
          <div className="space-y-8 animate-in slide-in-from-right duration-400 pb-10 text-left">
            <section className="space-y-4">
               <h3 className="text-[13px] font-bold text-gray-400 uppercase tracking-widest px-2">Notifikasi Kawasan</h3>
               <div className="space-y-3">
                  {[
                    { title: "Latihan Gabungan Sektor B", body: "Diharapkan seluruh Danru hadir di Sektor B.", time: "10:00" },
                    { title: "Update SOP Patroli Malam", body: "Penambahan checkpoint di area parkir timur.", time: "Kemarin" }
                  ].map((notif, i) => (
                    <div key={i} className="bg-white p-6 rounded-[32px] border border-gray-100 flex gap-4 shadow-sm">
                       <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center shrink-0"><IconInfo className="w-6 h-6" /></div>
                       <div>
                          <p className="font-bold text-[14px] leading-tight">{notif.title}</p>
                          <p className="text-xs text-gray-400 mt-1">{notif.body}</p>
                          <p className="text-[9px] font-black text-gray-300 mt-2 uppercase tracking-tighter">{notif.time}</p>
                       </div>
                    </div>
                  ))}
               </div>
            </section>

            <section className="space-y-4">
               <h3 className="text-[13px] font-bold text-gray-400 uppercase tracking-widest px-2">Riwayat Kejadian</h3>
               <div className="space-y-3">
                  {MOCK_INCIDENTS.map((inc, i) => (
                    <div key={i} className="bg-white p-6 rounded-[32px] border border-gray-100 flex justify-between items-center shadow-sm">
                       <div>
                          <p className="font-bold text-[14px]">{inc.type}</p>
                          <p className="text-xs text-gray-400">{inc.location} • {new Date(inc.timestamp).toLocaleDateString()}</p>
                       </div>
                       <span className={`text-[9px] font-black px-4 py-2 rounded-full ${inc.status === 'RESOLVED' ? 'bg-green-50 text-green-600' : 'bg-gray-100 text-gray-500'}`}>{inc.status}</span>
                    </div>
                  ))}
               </div>
            </section>
          </div>
        )}

        {/* --- Akun View --- */}
        {activeTab === 'account' && (
          <div className="space-y-8 animate-in slide-in-from-bottom duration-400 pb-10 text-left">
            <div className="flex flex-col items-center gap-4 py-8">
              <div className="relative">
                <img src={PERSONNEL_PHOTOS[2]} className="w-28 h-28 rounded-[44px] border-4 border-white shadow-2xl object-cover" />
                <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-[#F5C400] rounded-2xl border-4 border-white flex items-center justify-center text-black">
                  <IconCheck className="w-4 h-4" />
                </div>
              </div>
              <div className="text-center">
                <h3 className="text-2xl font-black tracking-tight">{user.name}</h3>
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.3em] mt-1">ID: {user.id}</p>
              </div>
            </div>

            <section className="space-y-4">
               <h3 className="text-[13px] font-bold text-gray-400 uppercase tracking-widest px-2">Profil Keamanan</h3>
               <div className="bg-white rounded-[44px] border border-gray-100 overflow-hidden shadow-sm">
                  {[
                    { label: "WhatsApp", value: user.phone },
                    { label: "Surel", value: user.email || "personel@digisatpam.id" },
                    { label: "Unit Kerja", value: user.companyName },
                    { label: "Domisili Kawasan", value: "Jababeka Industrial Estate" },
                    { label: "Level Otoritas", value: user.role.replace('_', ' ') },
                  ].map((info, i) => (
                    <div key={i} className="p-7 flex justify-between items-center border-b last:border-none border-gray-50">
                       <span className="text-[11px] font-bold text-gray-400 uppercase tracking-tight">{info.label}</span>
                       <span className="text-sm font-black text-black">{info.value}</span>
                    </div>
                  ))}
               </div>
            </section>

            <button onClick={onLogout} className="w-full py-6 bg-red-50 text-red-600 rounded-[32px] font-black text-xs uppercase tracking-[0.2em] active:scale-95 transition-all">Keluar dari Sesi</button>
          </div>
        )}
      </div>

      {renderOverlay()}

      {/* --- Bottom Navigation (Swift UI Tab Bar) --- */}
      <nav className="fixed bottom-8 left-1/2 -translate-x-1/2 w-[90%] max-w-[420px] bg-white/70 backdrop-blur-3xl p-3 rounded-[44px] shadow-[0_40px_80px_-20px_rgba(0,0,0,0.2)] flex justify-between items-center z-[500] border border-white/40">
        {[
          { id: 'home', label: 'Home', icon: <IconHome /> },
          { id: 'patrol', label: 'Patroli', icon: <IconMap /> },
          { id: 'update', label: 'Update', icon: <IconBell /> },
          { id: 'account', label: 'Profil', icon: <IconUser /> },
        ].map((item) => (
          <button key={item.id} onClick={() => setActiveTab(item.id as any)} className={`flex-1 flex flex-col items-center justify-center py-4 rounded-[32px] transition-all gap-1.5 ${activeTab === item.id ? 'bg-black text-white shadow-2xl scale-105' : 'text-gray-400 hover:text-gray-600'}`}>
            {item.icon}
            <span className="text-[9px] font-black uppercase tracking-[0.15em]">{item.label}</span>
          </button>
        ))}
      </nav>
    </div>
  );
};

export default PWASatpam;
