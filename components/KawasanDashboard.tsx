
import React, { useState } from 'react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { UserProfile } from '../types';
import { 
  MOCK_CHART_DATA, 
  MOCK_INCIDENTS, 
  MOCK_TENANTS,
  MOCK_SHIFT_SCHEDULE, 
  MOCK_GUESTS, 
  PERSONNEL_PHOTOS,
} from '../constants';

interface KawasanDashboardProps {
  user: UserProfile;
  onLogout: () => void;
}

// --- Icons (Industrial Style) ---
const IconOverview = () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" /></svg>;
const IconTenants = () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>;
const IconEmergency = () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>;
const IconTraining = () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>;
const IconGuests = () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>;
const IconBroadcast = () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" /></svg>;

const KawasanDashboard: React.FC<KawasanDashboardProps> = ({ user, onLogout }) => {
  const [activeTab, setActiveTab] = useState('Ringkasan');

  const menuItems = [
    { id: 'Ringkasan', label: 'Ringkasan', icon: <IconOverview /> },
    { id: 'Data', label: 'Manajemen Data', icon: <IconTenants /> },
    { id: 'Kedaruratan', label: 'Kedaruratan', icon: <IconEmergency />, color: 'text-red-500' },
    { id: 'Jadwal', label: 'Sistem Latihan Bersama', icon: <IconTraining /> },
    { id: 'Tamu', label: 'Monitoring Tamu', icon: <IconGuests /> },
    { id: 'Broadcast', label: 'Broadcast Global', icon: <IconBroadcast /> },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'Ringkasan':
        return (
          <div className="space-y-12 animate-in fade-in duration-500">
            <div className="grid grid-cols-4 gap-8">
               {[
                 { label: 'Total Perusahaan', val: MOCK_TENANTS.length.toString().padStart(2, '0'), color: 'text-[#0B0B0B]' },
                 { label: 'Total Satpam', val: MOCK_TENANTS.reduce((acc, t) => acc + t.personnelCount, 0).toString().padStart(2, '0'), color: 'text-[#0B0B0B]' },
                 { label: 'Kedaruratan Aktif', val: MOCK_INCIDENTS.filter(i => i.status === 'URGENT').length.toString().padStart(2, '0'), color: 'text-red-600' },
                 { label: 'Tamu Kawasan', val: MOCK_GUESTS.length.toString().padStart(2, '0'), color: 'text-blue-500' },
               ].map((s, i) => (
                 <div key={i} className="bg-white p-10 rounded-[48px] border border-gray-100 soft-shadow space-y-4">
                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.3em]">{s.label}</p>
                    <h3 className={`text-4xl font-black tracking-tight ${s.color}`}>{s.val}</h3>
                 </div>
               ))}
            </div>
            
            <div className="grid lg:grid-cols-2 gap-8">
               <div className="bg-white p-12 rounded-[64px] border border-gray-100 soft-shadow">
                  <h3 className="text-xl font-black tracking-tight mb-8">Statistik Keamanan Kawasan</h3>
                  <div className="h-[300px]">
                     <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={MOCK_CHART_DATA}>
                           <defs>
                              <linearGradient id="colorArea" x1="0" y1="0" x2="0" y2="1">
                                 <stop offset="5%" stopColor="#F5C400" stopOpacity={0.2}/>
                                 <stop offset="95%" stopColor="#F5C400" stopOpacity={0}/>
                              </linearGradient>
                           </defs>
                           <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 11, fontWeight: '900'}} />
                           <Tooltip contentStyle={{borderRadius: '24px', border: 'none', boxShadow: '0 20px 50px rgba(0,0,0,0.1)'}} />
                           <Area type="monotone" dataKey="nilai" stroke="#F5C400" strokeWidth={5} fill="url(#colorArea)" />
                        </AreaChart>
                     </ResponsiveContainer>
                  </div>
               </div>
               
               <div className="bg-white p-12 rounded-[64px] border border-gray-100 soft-shadow">
                  <h3 className="text-xl font-black tracking-tight mb-8">Status Tenant Terbaru</h3>
                  <div className="space-y-4">
                     {MOCK_TENANTS.map(tenant => (
                        <div key={tenant.id} className="flex items-center justify-between p-6 bg-gray-50 rounded-[32px]">
                           <div>
                              <p className="font-black text-sm">{tenant.name}</p>
                              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{tenant.industry} • {tenant.personnelCount} Personel</p>
                           </div>
                           <span className={`text-[9px] font-black px-4 py-2 rounded-full uppercase ${tenant.status === 'Active' ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'}`}>{tenant.status}</span>
                        </div>
                     ))}
                  </div>
               </div>
            </div>
          </div>
        );

      case 'Data':
        return (
          <div className="bg-white p-10 rounded-[48px] border border-gray-100 soft-shadow animate-in slide-in-from-bottom duration-500">
             <div className="flex justify-between items-center mb-10">
                <h3 className="text-xl font-black tracking-tight">Manajemen Tenant Kawasan</h3>
                <button className="px-6 py-3 bg-[#0B0B0B] text-white rounded-full font-black text-[10px] uppercase tracking-widest">+ Tambah Perusahaan</button>
             </div>
             <table className="w-full text-left">
                <thead>
                   <tr className="text-[10px] font-black text-gray-400 uppercase tracking-widest border-b border-gray-50">
                      <th className="pb-6 px-4">Nama Perusahaan</th>
                      <th className="pb-6 px-4">Bidang Industri</th>
                      <th className="pb-6 px-4 text-center">Jumlah Satpam</th>
                      <th className="pb-6 px-4">Status Akun</th>
                      <th className="pb-6 px-4 text-right">Aksi</th>
                   </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                   {MOCK_TENANTS.map(t => (
                      <tr key={t.id} className="text-sm font-medium hover:bg-gray-50 transition-colors">
                         <td className="py-6 px-4 font-black">{t.name}</td>
                         <td className="py-6 px-4 text-gray-500">{t.industry}</td>
                         <td className="py-6 px-4 text-center">{t.personnelCount} Orang</td>
                         <td className="py-6 px-4">
                            <span className={`text-[10px] font-black px-3 py-1 rounded-full uppercase ${t.status === 'Active' ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'}`}>{t.status}</span>
                         </td>
                         <td className="py-6 px-4 text-right">
                            <button className="text-[10px] font-black uppercase text-[#F5C400]">Kelola</button>
                         </td>
                      </tr>
                   ))}
                </tbody>
             </table>
          </div>
        );

      case 'Kedaruratan':
        return (
          <div className="space-y-8 animate-in slide-in-from-bottom duration-500">
             <div className="bg-red-600 p-12 rounded-[64px] text-white flex justify-between items-center shadow-2xl shadow-red-200">
                <div className="space-y-4">
                   <h3 className="text-3xl font-black tracking-tighter">Pusat Krisis Lintas Perusahaan</h3>
                   <p className="text-red-100 font-medium max-w-lg">Monitoring sinyal SOS dan laporan darurat di seluruh tenant Kawasan Industri Sentolo.</p>
                </div>
                <div className="w-24 h-24 bg-white/10 rounded-full flex items-center justify-center animate-pulse">
                   <IconEmergency />
                </div>
             </div>
             
             <div className="bg-white p-10 rounded-[48px] border border-gray-100 soft-shadow">
                <h3 className="text-xl font-black tracking-tight mb-8">Daftar Insiden Darurat Aktif</h3>
                <div className="space-y-4">
                   {MOCK_INCIDENTS.filter(i => i.status === 'URGENT').map(inc => (
                      <div key={inc.id} className="p-8 bg-red-50/50 border border-red-100 rounded-[40px] flex justify-between items-center">
                         <div className="flex gap-6">
                            <div className="w-12 h-12 bg-red-600 text-white rounded-2xl flex items-center justify-center"><IconEmergency /></div>
                            <div>
                               <h4 className="font-black text-sm uppercase text-red-900">{inc.type} - {inc.location}</h4>
                               <p className="text-xs text-red-700 font-medium mt-1">{inc.description}</p>
                               <p className="text-[10px] font-black text-red-400 uppercase tracking-widest mt-2">DILAPORKAN OLEH: {inc.reporter} (ANGGOTA TENANT)</p>
                            </div>
                         </div>
                         <div className="flex gap-4">
                            <button className="px-6 py-3 bg-red-600 text-white rounded-full font-black text-[10px] uppercase tracking-widest shadow-lg">RESPONS CEPAT</button>
                            <button className="px-6 py-3 bg-white border border-red-200 text-red-600 rounded-full font-black text-[10px] uppercase tracking-widest">DIREKTORI KONTAK</button>
                         </div>
                      </div>
                   ))}
                </div>
             </div>
          </div>
        );

      case 'Jadwal':
        return (
          <div className="bg-white p-12 rounded-[64px] border border-gray-100 soft-shadow animate-in slide-in-from-bottom duration-500">
             <div className="flex justify-between items-center mb-10">
                <h3 className="text-xl font-black tracking-tight">Manajemen Sistem Latihan Bersama (SLB)</h3>
                <button className="px-6 py-3 bg-[#0B0B0B] text-white rounded-full font-black text-[10px] uppercase tracking-widest">+ Jadwalkan Latihan</button>
             </div>
             <div className="grid grid-cols-7 gap-6">
                {MOCK_SHIFT_SCHEDULE.map((s, i) => (
                   <div key={i} className={`p-8 rounded-[40px] border flex flex-col items-center gap-4 transition-all ${s.highlight ? 'bg-[#F5C400] text-black border-transparent shadow-xl scale-105' : 'bg-gray-50 border-transparent hover:border-gray-200'}`}>
                      <span className={`text-[10px] font-black uppercase tracking-widest ${s.highlight ? 'text-black/60' : 'text-gray-400'}`}>{s.day}</span>
                      <span className="text-3xl font-black">{s.date}</span>
                      <div className="flex flex-col items-center text-center gap-1">
                         <p className="text-[9px] font-black uppercase tracking-tighter leading-none">{s.type}</p>
                         <p className="text-[9px] font-bold opacity-60 leading-none">{s.time}</p>
                      </div>
                   </div>
                ))}
             </div>
             <div className="mt-12 p-10 bg-gray-50 rounded-[48px] border border-gray-100">
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.3em] mb-4">Deskripsi Latihan Mendatang</p>
                <h4 className="text-xl font-black text-gray-900 mb-2">Simulasi Penanganan Bencana Alam (Sektor B)</h4>
                <p className="text-sm text-gray-500 font-medium leading-relaxed">Melibatkan seluruh regu satpam dari Sektor 1 dan Sektor 2. Fokus pada kordinasi evakuasi dan pengamanan gerbang logistik saat darurat.</p>
             </div>
          </div>
        );

      case 'Tamu':
        return (
          <div className="bg-white p-10 rounded-[48px] border border-gray-100 soft-shadow animate-in slide-in-from-bottom duration-500">
             <h3 className="text-xl font-black tracking-tight mb-8">Monitoring Gerbang Utama Kawasan</h3>
             <table className="w-full text-left">
                <thead>
                   <tr className="text-[10px] font-black text-gray-400 uppercase tracking-widest border-b border-gray-50">
                      <th className="pb-6 px-4">Nama Pengunjung</th>
                      <th className="pb-6 px-4">No. Kendaraan</th>
                      <th className="pb-6 px-4">Tujuan Perusahaan</th>
                      <th className="pb-6 px-4">Waktu Masuk</th>
                      <th className="pb-6 px-4 text-right">Status Area</th>
                   </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                   {MOCK_GUESTS.map(g => (
                      <tr key={g.id} className="text-sm font-medium hover:bg-gray-50 transition-colors">
                         <td className="py-6 px-4 font-black">{g.name}</td>
                         <td className="py-6 px-4 font-mono text-gray-500">{g.vehiclePlate}</td>
                         <td className="py-6 px-4 font-bold text-[#F5C400]">PT. Manufaktur Jaya</td>
                         <td className="py-6 px-4">{g.timeIn} WIB</td>
                         <td className="py-6 px-4 text-right">
                            <span className="text-[9px] font-black bg-blue-50 text-blue-600 px-3 py-1 rounded-full uppercase">Di Dalam Area</span>
                         </td>
                      </tr>
                   ))}
                </tbody>
             </table>
          </div>
        );

      case 'Broadcast':
        return (
          <div className="bg-white p-12 rounded-[64px] border border-gray-100 soft-shadow animate-in slide-in-from-bottom duration-500">
             <div className="flex items-center gap-4 mb-10">
                <div className="w-12 h-12 bg-black text-white rounded-2xl flex items-center justify-center"><IconBroadcast /></div>
                <h3 className="text-xl font-black tracking-tight">Broadcast Pengumuman Kawasan</h3>
             </div>
             <div className="space-y-8">
                <div className="grid lg:grid-cols-2 gap-8">
                   <div className="space-y-3">
                      <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Judul Pesan</label>
                      <input type="text" className="w-full bg-gray-50 border-none p-5 rounded-3xl text-sm font-bold" placeholder="Contoh: Pemberitahuan Latihan Gabungan" />
                   </div>
                   <div className="space-y-3">
                      <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Target Penerima</label>
                      <select className="w-full bg-gray-50 border-none p-5 rounded-3xl text-sm font-bold">
                         <option>Semua Tenant & Satpam</option>
                         <option>Hanya Manajemen Tenant</option>
                         <option>Hanya Anggota Satpam</option>
                      </select>
                   </div>
                </div>
                <div className="space-y-3">
                   <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Isi Pengumuman</label>
                   <textarea className="w-full bg-gray-50 border-none p-6 rounded-[32px] text-sm font-medium min-h-[200px]" placeholder="Tuliskan pesan yang ingin disampaikan ke seluruh ekosistem kawasan..." />
                </div>
                <button className="w-full py-6 bg-black text-white rounded-[32px] font-black text-xs uppercase tracking-[0.2em] shadow-2xl active:scale-95 transition-all">Kirim Broadcast Global</button>
             </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="flex h-screen bg-[#F8F9FA] overflow-hidden font-sans">
      {/* Sidebar - Kawasan Admin Style */}
      <aside className="w-80 bg-[#0B0B0B] flex flex-col p-10 z-50">
        <div className="flex items-center gap-3 mb-16">
          <div className="w-10 h-10 bg-[#F5C400] rounded-xl flex items-center justify-center text-black font-black text-2xl shadow-lg shadow-yellow-500/20">S</div>
          <div>
            <h2 className="text-lg font-black tracking-tighter leading-none text-white">Sentolo</h2>
            <p className="text-[9px] font-bold text-[#F5C400] uppercase tracking-widest">Indus-Admin</p>
          </div>
        </div>

        <nav className="flex-1 space-y-3">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-4 px-6 py-5 rounded-[28px] transition-all group ${activeTab === item.id ? 'bg-[#F5C400] text-black shadow-xl translate-x-2' : 'text-gray-500 hover:text-white hover:bg-white/5'}`}
            >
              <div className="transition-colors">
                {item.icon}
              </div>
              <span className="text-[11px] font-black uppercase tracking-tight">{item.label}</span>
            </button>
          ))}
        </nav>

        <button onClick={onLogout} className="mt-auto w-full py-5 border border-white/10 rounded-[24px] text-[10px] font-black text-gray-500 uppercase tracking-widest hover:bg-red-600 hover:text-white hover:border-transparent transition-all">Logout Sesi Kawasan</button>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto p-16">
        <header className="flex justify-between items-center mb-16">
          <div className="animate-in slide-in-from-left duration-700">
            <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.4em] mb-2">Pusat Monitoring Kawasan</p>
            <h1 className="text-4xl font-black tracking-tighter text-[#0B0B0B]">{activeTab}</h1>
          </div>
          <div className="flex items-center gap-8 animate-in slide-in-from-right duration-700">
            <div className="text-right">
               <p className="text-sm font-black text-[#0B0B0B] leading-none">{user.name}</p>
               <p className="text-[10px] font-bold text-[#F5C400] uppercase tracking-widest mt-1">Kawasan Industri Sentolo</p>
            </div>
            <div className="w-14 h-14 rounded-2xl border-4 border-white shadow-xl overflow-hidden">
               <img src={PERSONNEL_PHOTOS[4]} className="w-full h-full object-cover" alt="Profile" />
            </div>
          </div>
        </header>

        {renderContent()}
      </main>
    </div>
  );
};

export default KawasanDashboard;
