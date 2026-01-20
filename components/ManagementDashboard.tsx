
import React, { useState } from 'react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { UserRole, UserProfile } from '../types';
import { 
  MOCK_CHART_DATA, 
  MOCK_INCIDENTS, 
  MOCK_INTERNAL_TEAM, 
  MOCK_SHIFT_SCHEDULE, 
  MOCK_ROUTES, 
  MOCK_GUESTS, 
  MOCK_ACTIVITIES,
  PERSONNEL_PHOTOS,
  COLORS
} from '../constants';

interface ManagementDashboardProps {
  user: UserProfile;
  onLogout: () => void;
}

// --- Icons (Industrial Monochrome Style) ---
const IconUsers = () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" /></svg>;
const IconCalendar = () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>;
const IconMap = () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" /></svg>;
const IconFile = () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>;
const IconActivity = () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>;
const IconGuest = () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>;
const IconAlert = () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>;
const IconMegaphone = () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" /></svg>;
const IconHome = () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3" /></svg>;

const ManagementDashboard: React.FC<ManagementDashboardProps> = ({ user, onLogout }) => {
  const [activeTab, setActiveTab] = useState('Overview');

  const menuItems = [
    { id: 'Overview', label: 'Ringkasan', icon: <IconHome /> },
    { id: 'Data', label: 'Manajemen Data', icon: <IconUsers /> },
    { id: 'Jadwal', label: 'Jadwal', icon: <IconCalendar /> },
    { id: 'Rute', label: 'Rute', icon: <IconMap /> },
    { id: 'Laporan', label: 'Laporan', icon: <IconFile /> },
    { id: 'Aktivitas', label: 'Aktivitas', icon: <IconActivity /> },
    { id: 'Tamu', label: 'Tamu', icon: <IconGuest /> },
    { id: 'Kedaruratan', label: 'Kedaruratan', icon: <IconAlert />, color: 'text-red-500' },
    { id: 'Broadcast', label: 'Broadcast', icon: <IconMegaphone /> },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'Overview':
        return (
          <div className="space-y-12 animate-in fade-in duration-500">
            <div className="grid grid-cols-4 gap-8">
               {[
                 { label: 'Personil Online', val: MOCK_INTERNAL_TEAM.filter(t => t.status === 'Online').length.toString().padStart(2, '0'), color: 'text-[#0B0B0B]' },
                 { label: 'Kepatuhan Rute', val: '98.2%', color: 'text-[#0B0B0B]' },
                 { label: 'Insiden Terbuka', val: MOCK_INCIDENTS.filter(i => i.status !== 'RESOLVED').length.toString().padStart(2, '0'), color: 'text-[#F5C400]' },
                 { label: 'Tamu Aktif', val: MOCK_GUESTS.filter(g => !g.timeOut).length.toString().padStart(2, '0'), color: 'text-blue-500' },
               ].map((s, i) => (
                 <div key={i} className="bg-white p-10 rounded-[48px] border border-gray-100 soft-shadow space-y-4">
                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.3em]">{s.label}</p>
                    <h3 className={`text-4xl font-black tracking-tight ${s.color}`}>{s.val}</h3>
                 </div>
               ))}
            </div>
            <div className="bg-white p-12 rounded-[64px] border border-gray-100 soft-shadow">
               <h3 className="text-xl font-black tracking-tight mb-8">Matriks Performa Keamanan (Mingguan)</h3>
               <div className="h-[350px]">
                  <ResponsiveContainer width="100%" height="100%">
                     <AreaChart data={MOCK_CHART_DATA}>
                        <defs>
                           <linearGradient id="colorMono" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="5%" stopColor="#0B0B0B" stopOpacity={0.05}/>
                              <stop offset="95%" stopColor="#0B0B0B" stopOpacity={0}/>
                           </linearGradient>
                        </defs>
                        <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 11, fontWeight: '900', fill: '#D1D5DB'}} />
                        <Tooltip contentStyle={{borderRadius: '24px', border: 'none', boxShadow: '0 20px 50px rgba(0,0,0,0.1)', fontWeight: '900'}} />
                        <Area type="monotone" dataKey="nilai" stroke="#0B0B0B" strokeWidth={5} fill="url(#colorMono)" />
                     </AreaChart>
                  </ResponsiveContainer>
               </div>
            </div>
          </div>
        );
      
      case 'Data':
        return (
          <div className="bg-white p-10 rounded-[48px] border border-gray-100 soft-shadow animate-in slide-in-from-bottom duration-500">
            <h3 className="text-xl font-black tracking-tight mb-8">Manajemen Data Anggota</h3>
            <div className="overflow-hidden">
              <table className="w-full text-left">
                <thead>
                  <tr className="text-[10px] font-black text-gray-400 uppercase tracking-widest border-b border-gray-50">
                    <th className="pb-6 px-4">Nama Personil</th>
                    <th className="pb-6 px-4">Role</th>
                    <th className="pb-6 px-4">No. WhatsApp</th>
                    <th className="pb-6 px-4">Status</th>
                    <th className="pb-6 px-4 text-right">Aksi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {MOCK_INTERNAL_TEAM.map((p) => (
                    <tr key={p.id} className="group hover:bg-gray-50 transition-colors">
                      <td className="py-6 px-4 flex items-center gap-4">
                        <img src={p.photo} className="w-10 h-10 rounded-xl object-cover" />
                        <span className="font-bold text-sm">{p.name}</span>
                      </td>
                      <td className="py-6 px-4 text-sm font-medium">{p.role}</td>
                      <td className="py-6 px-4 text-sm font-mono text-gray-500">{p.phone}</td>
                      <td className="py-6 px-4">
                        <span className={`text-[10px] font-black px-3 py-1 rounded-full uppercase ${p.status === 'Online' ? 'bg-green-50 text-green-600' : 'bg-gray-100 text-gray-500'}`}>{p.status}</span>
                      </td>
                      <td className="py-6 px-4 text-right">
                        <button className="text-[10px] font-black uppercase text-[#F5C400] hover:text-black transition">Kelola</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        );

      case 'Jadwal':
        return (
          <div className="bg-white p-10 rounded-[48px] border border-gray-100 soft-shadow animate-in slide-in-from-bottom duration-500">
             <div className="flex justify-between items-center mb-8">
                <h3 className="text-xl font-black tracking-tight">Jadwal Shift Anggota</h3>
                <button className="px-6 py-3 bg-[#0B0B0B] text-white rounded-full font-black text-[10px] uppercase tracking-widest">Edit Jadwal</button>
             </div>
             <div className="grid grid-cols-7 gap-4">
                {MOCK_SHIFT_SCHEDULE.map((s, i) => (
                  <div key={i} className={`p-6 rounded-3xl border flex flex-col items-center gap-2 ${s.highlight ? 'bg-[#F5C400]/10 border-[#F5C400]' : 'bg-gray-50 border-transparent'}`}>
                     <span className="text-[10px] font-black text-gray-400 uppercase">{s.day}</span>
                     <span className="text-xl font-black">{s.date}</span>
                     <div className={`px-2 py-0.5 rounded-full text-[8px] font-black uppercase ${s.type === 'Rest' ? 'bg-gray-200 text-gray-500' : 'bg-black text-white'}`}>{s.shift}</div>
                  </div>
                ))}
             </div>
          </div>
        );

      case 'Rute':
        return (
          <div className="bg-white p-10 rounded-[48px] border border-gray-100 soft-shadow animate-in slide-in-from-bottom duration-500">
             <div className="flex justify-between items-center mb-10">
                <h3 className="text-xl font-black tracking-tight">Setting Rute Patroli Anggota</h3>
                <button className="px-6 py-3 bg-[#0B0B0B] text-white rounded-full font-black text-[10px] uppercase tracking-widest">+ Tambah Checkpoint</button>
             </div>
             <div className="space-y-4">
                {MOCK_ROUTES[0].checkpoints.map((cp, idx) => (
                  <div key={cp.id} className="flex items-center justify-between p-6 bg-gray-50 rounded-[32px] group hover:bg-white border border-transparent hover:border-gray-100 transition-all">
                     <div className="flex items-center gap-6">
                        <div className="w-10 h-10 bg-black text-white rounded-xl flex items-center justify-center font-black text-xs">{idx + 1}</div>
                        <div>
                           <p className="font-black text-sm">{cp.name}</p>
                           <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Validasi GPS Geofence Aktif • {cp.latitude}, {cp.longitude}</p>
                        </div>
                     </div>
                     <button className="text-[10px] font-black uppercase text-gray-400 hover:text-black opacity-0 group-hover:opacity-100 transition-all">Setting</button>
                  </div>
                ))}
             </div>
          </div>
        );

      case 'Laporan':
        return (
          <div className="bg-white p-10 rounded-[48px] border border-gray-100 soft-shadow animate-in slide-in-from-bottom duration-500">
            <h3 className="text-xl font-black tracking-tight mb-8">Laporan Insiden dari Anggota</h3>
            <div className="space-y-4">
               {MOCK_INCIDENTS.map(inc => (
                 <div key={inc.id} className="p-8 border border-gray-50 rounded-[40px] flex justify-between items-center">
                    <div className="flex gap-6">
                       <div className="w-12 h-12 bg-gray-50 rounded-xl flex items-center justify-center text-gray-400"><IconFile /></div>
                       <div>
                          <h4 className="font-black text-sm uppercase tracking-tight">{inc.type}</h4>
                          <p className="text-xs text-gray-500 mt-1">{inc.description}</p>
                          <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest mt-2">{inc.location} • Reporter: {inc.reporter}</p>
                       </div>
                    </div>
                    <span className={`text-[9px] font-black px-4 py-2 rounded-full uppercase ${inc.status === 'RESOLVED' ? 'bg-green-50 text-green-600' : 'bg-yellow-50 text-yellow-600'}`}>{inc.status}</span>
                 </div>
               ))}
            </div>
          </div>
        );

      case 'Aktivitas':
        return (
          <div className="bg-white p-10 rounded-[48px] border border-gray-100 soft-shadow animate-in slide-in-from-bottom duration-500">
            <h3 className="text-xl font-black tracking-tight mb-8">Aktivitas Harian Anggota</h3>
            <div className="space-y-4">
               {MOCK_ACTIVITIES.map(act => (
                 <div key={act.id} className="p-6 border-b border-gray-50 last:border-none flex justify-between items-center">
                    <div className="flex items-center gap-4">
                       <div className="w-2 h-2 bg-[#F5C400] rounded-full"></div>
                       <div>
                          <p className="text-sm font-bold">{act.activity}</p>
                          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-1">Petugas: {act.personnel} • {act.time} WIB</p>
                       </div>
                    </div>
                    <span className="text-[9px] font-black text-gray-300 uppercase">{act.status}</span>
                 </div>
               ))}
            </div>
          </div>
        );

      case 'Tamu':
        return (
          <div className="bg-white p-10 rounded-[48px] border border-gray-100 soft-shadow animate-in slide-in-from-bottom duration-500">
            <h3 className="text-xl font-black tracking-tight mb-8">Detail Log Tamu</h3>
            <table className="w-full text-left">
              <thead>
                <tr className="text-[10px] font-black text-gray-400 uppercase tracking-widest border-b border-gray-50">
                  <th className="pb-6 px-4">Nama Tamu</th>
                  <th className="pb-6 px-4">Kendaraan</th>
                  <th className="pb-6 px-4">Keperluan</th>
                  <th className="pb-6 px-4">Waktu Masuk</th>
                  <th className="pb-6 px-4">Waktu Keluar</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {MOCK_GUESTS.map(g => (
                  <tr key={g.id} className="text-sm font-medium">
                    <td className="py-6 px-4">{g.name}</td>
                    <td className="py-6 px-4 font-mono">{g.vehiclePlate}</td>
                    <td className="py-6 px-4">{g.purpose}</td>
                    <td className="py-6 px-4">{g.timeIn}</td>
                    <td className="py-6 px-4 text-gray-400">{g.timeOut || '-'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );

      case 'Kedaruratan':
        return (
          <div className="bg-red-50/30 p-10 rounded-[48px] border border-red-100 soft-shadow animate-in zoom-in duration-500">
            <div className="flex items-center gap-4 mb-8">
               <div className="w-12 h-12 bg-red-600 text-white rounded-2xl flex items-center justify-center shadow-lg shadow-red-200"><IconAlert /></div>
               <h3 className="text-xl font-black tracking-tight text-red-900">Pusat Respons Kedaruratan (SOS)</h3>
            </div>
            <div className="bg-white p-8 rounded-[40px] border border-red-100 flex flex-col items-center justify-center text-center gap-4">
               <div className="w-20 h-20 bg-green-50 text-green-600 rounded-full flex items-center justify-center">
                  <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" /></svg>
               </div>
               <h4 className="text-2xl font-black tracking-tighter">Seluruh Area Kondusif</h4>
               <p className="text-sm text-gray-400 font-medium">Tidak ada sinyal darurat aktif dari anggota satpam saat ini.</p>
            </div>
          </div>
        );

      case 'Broadcast':
        return (
          <div className="bg-white p-12 rounded-[64px] border border-gray-100 soft-shadow animate-in slide-in-from-bottom duration-500">
             <h3 className="text-xl font-black tracking-tight mb-8">Kirim Broadcast ke Seluruh Anggota</h3>
             <div className="space-y-6">
                <div className="space-y-2">
                   <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Judul Pesan</label>
                   <input type="text" className="w-full bg-gray-50 border-none p-5 rounded-2xl text-sm font-bold" placeholder="Contoh: Pengumuman Latihan Gabungan" />
                </div>
                <div className="space-y-2">
                   <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Isi Pesan</label>
                   <textarea className="w-full bg-gray-50 border-none p-5 rounded-2xl text-sm min-h-[150px]" placeholder="Tuliskan instruksi atau pengumuman..." />
                </div>
                <button className="w-full py-6 bg-black text-white rounded-[32px] font-black text-xs uppercase tracking-[0.2em] shadow-2xl active:scale-95 transition-all">Broadcast Sekarang</button>
             </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="flex h-screen bg-[#F8F9FA] overflow-hidden">
      
      {/* Sidebar - Company Rebranding */}
      <aside className="w-80 bg-white border-r border-gray-100 flex flex-col p-10 z-50">
        <div className="flex items-center gap-3 mb-16">
          <div className="w-10 h-10 bg-[#0B0B0B] rounded-xl flex items-center justify-center text-white font-black text-2xl">D</div>
          <div>
            <h2 className="text-lg font-black tracking-tighter leading-none text-[#0B0B0B]">Digisatpam</h2>
            <p className="text-[9px] font-bold text-[#F5C400] uppercase tracking-widest">Dash Perusahaan</p>
          </div>
        </div>

        <nav className="flex-1 space-y-2">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-4 px-6 py-4 rounded-[24px] transition-all group ${activeTab === item.id ? 'bg-[#0B0B0B] text-white shadow-xl translate-x-2' : 'text-gray-400 hover:bg-gray-50 hover:text-black'}`}
            >
              <div className={`${activeTab === item.id ? 'text-[#F5C400]' : 'text-current'} transition-colors`}>
                {item.icon}
              </div>
              <span className={`text-[11px] font-black uppercase tracking-tight ${item.color || ''}`}>{item.label}</span>
            </button>
          ))}
        </nav>

        <button onClick={onLogout} className="mt-auto w-full py-4 border border-gray-100 rounded-[20px] text-[10px] font-black text-gray-400 uppercase tracking-widest hover:bg-red-50 hover:text-red-600 transition-all">Logout</button>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto p-16">
        <header className="flex justify-between items-center mb-16">
          <div>
            <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.4em] mb-2">Manajemen Keamanan Tenant</p>
            <h1 className="text-4xl font-black tracking-tighter text-[#0B0B0B]">{activeTab}</h1>
          </div>
          <div className="flex items-center gap-8">
            <div className="text-right">
               <p className="text-sm font-black text-[#0B0B0B] leading-none">{user.name}</p>
               <p className="text-[10px] font-bold text-[#F5C400] uppercase tracking-widest mt-1">{user.companyName}</p>
            </div>
            <img src={PERSONNEL_PHOTOS[2]} className="w-14 h-14 rounded-2xl border-4 border-white soft-shadow object-cover" />
          </div>
        </header>

        {renderContent()}
      </main>
    </div>
  );
};

export default ManagementDashboard;
