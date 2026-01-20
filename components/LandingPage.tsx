
import React, { useState } from 'react';
import { UserRole } from '../types';
import { PERSONNEL_PHOTOS } from '../constants';

// --- Specialized SVG Icons with Custom Sizes & Glow Effects ---
const IconShield = ({ className = "w-8 h-8" }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
  </svg>
);

const IconFactory = ({ className = "w-10 h-10", glowClass = "bg-green-400" }) => (
  <div className={`relative ${className} flex items-center justify-center`}>
    <div className={`absolute inset-0 ${glowClass} opacity-30 blur-2xl rounded-full scale-150`}></div>
    <svg className="relative z-10 w-full h-full" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
    </svg>
  </div>
);

const IconWarehouse = ({ className = "w-12 h-12", glowClass = "bg-blue-400" }) => (
  <div className={`relative ${className} flex items-center justify-center`}>
    <div className={`absolute inset-0 ${glowClass} opacity-30 blur-2xl rounded-full scale-150`}></div>
    <svg className="relative z-10 w-full h-full" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
    </svg>
  </div>
);

const IconEnergy = ({ className = "w-8 h-8", glowClass = "bg-yellow-400" }) => (
  <div className={`relative ${className} flex items-center justify-center`}>
    <div className={`absolute inset-0 ${glowClass} opacity-40 blur-2xl rounded-full scale-150`}></div>
    <svg className="relative z-10 w-full h-full" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
    </svg>
  </div>
);

const IconPhone = ({ className = "w-6 h-6" }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" /></svg>
);
const IconSearch = ({ className = "w-6 h-6" }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
);
const IconCloud = ({ className = "w-10 h-10" }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" /></svg>
);
const IconChart = ({ className = "w-6 h-6" }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>
);
const IconCheck = ({ className = "w-6 h-6" }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" /></svg>
);
const IconBroadcast = ({ className = "w-8 h-8" }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" /></svg>
);
const IconBuilding = ({ className = "w-8 h-8" }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>
);
const IconStore = ({ className = "w-8 h-8" }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h18v2H3V3zm16 14v4H5v-4H3v-2h18v2h-2zM5 5v10h14V5H5zm2 2h2v2H7V7zm6 0h2v2h-2V7z" /></svg>
);
const IconGroup = ({ className = "w-8 h-8" }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
);

// Added IconAlert component to fix the 'Cannot find name IconAlert' error
const IconAlert = ({ className = "w-6 h-6" }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
  </svg>
);

interface LandingPageProps {
  onNavigate: (role: UserRole) => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onNavigate }) => {
  const [showRoleSelector, setShowRoleSelector] = useState(false);

  return (
    <div className="bg-white min-h-screen flex flex-col items-center">
      {/* Navbar */}
      <nav className="w-full max-w-7xl px-8 py-8 flex justify-between items-center bg-white sticky top-0 z-[100] border-b border-gray-100">
        <div className="flex items-center gap-12">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 bg-[#0B0B0B] rounded-xl flex items-center justify-center text-white font-black text-2xl">D</div>
            <span className="text-xl font-black tracking-tight text-[#0B0B0B]">Digisatpam</span>
          </div>
          <div className="hidden lg:flex gap-10 text-[11px] font-extrabold text-[#0B0B0B] uppercase tracking-[0.2em]">
            <a href="#why-join" className="hover:text-gray-400 transition">Manfaat Gabung</a>
            <a href="#how-it-works" className="hover:text-gray-400 transition">Teknologi</a>
            <a href="#statistik" className="hover:text-gray-400 transition">Efisiensi</a>
            <a href="#slb" className="hover:text-gray-400 transition">Kawasan</a>
          </div>
        </div>
        <div className="flex gap-4">
          <button onClick={() => setShowRoleSelector(true)} className="px-7 py-3 text-[11px] font-black text-[#0B0B0B] border border-gray-200 rounded-full hover:bg-gray-50 transition uppercase tracking-widest">Masuk</button>
          <button onClick={() => setShowRoleSelector(true)} className="px-7 py-3 text-[11px] font-black bg-[#0B0B0B] text-white rounded-full hover:bg-gray-800 transition shadow-xl uppercase tracking-widest">Akses Platform</button>
        </div>
      </nav>

      {/* Hero Section with Unified Orbit System */}
      <section className="relative w-full max-w-7xl px-8 pt-24 pb-48 grid lg:grid-cols-2 items-center gap-24 overflow-hidden">
        <div className="z-10 space-y-12 animate-in fade-in slide-in-from-left duration-1000">
          <div className="inline-flex items-center gap-3 px-5 py-2 bg-gray-50 rounded-full text-[10px] font-extrabold text-[#0B0B0B] uppercase tracking-[0.3em]">
            <span className="w-2 h-2 bg-[#F5C400] rounded-full pulse-yellow"></span> Enterprise Industrial Security
          </div>
          <div className="space-y-6">
            <h1 className="text-5xl lg:text-[72px] font-black leading-[1.1] tracking-tighter text-[#0B0B0B]">
              Digitalisasi <br />
              Pengamanan <br />
              <span className="text-gray-300">Kawasan Industri.</span>
            </h1>
            <p className="text-xl text-gray-500 font-medium leading-relaxed max-w-lg">
              Monitoring real time, patroli satpam digital, dan pelaporan keamanan terpusat untuk seluruh kawasan industri.
            </p>
          </div>
          <div className="flex items-center gap-6">
            <button onClick={() => setShowRoleSelector(true)} className="px-12 py-6 bg-[#0B0B0B] text-white rounded-full font-black text-[15px] shadow-2xl hover:scale-105 transition-all uppercase tracking-widest">Mulai Monitoring</button>
            <button className="px-10 py-6 border border-gray-200 rounded-full font-black text-[15px] hover:bg-gray-50 transition-all uppercase tracking-widest">Lihat Demo</button>
          </div>
        </div>

        {/* Orbit Visualization: 3-Layer Infrastructure & Personnel */}
        <div className="relative flex items-center justify-center min-h-[650px]">
          
          {/* Ring 3 (Outer): Industry Infrastructure with Glowing Nodes */}
          <div className="orbit-path w-[580px] h-[580px] orbit-ring-reverse" style={{ animationDuration: '60s' }}>
             {/* Factory - Green Glow */}
             <div className="absolute top-0 left-1/4 fixed-head-reverse">
                <IconFactory className="w-16 h-16" glowClass="bg-green-400" />
             </div>
             {/* Warehouse - Blue Glow */}
             <div className="absolute bottom-1/4 right-0 fixed-head-reverse">
                <IconWarehouse className="w-20 h-20" glowClass="bg-blue-400" />
             </div>
             {/* Energy - Yellow Glow */}
             <div className="absolute bottom-1/4 left-0 fixed-head-reverse">
                <IconEnergy className="w-12 h-12" glowClass="bg-yellow-400" />
             </div>
          </div>

          {/* Ring 2 (Mid): Personnel Orbit (5 Photos) */}
          <div className="orbit-path w-[400px] h-[400px] orbit-ring" style={{ animationDuration: '45s' }}>
             {/* Photo 1 */}
             <div className="absolute top-0 left-1/2 -ml-8 fixed-head">
                <img src={PERSONNEL_PHOTOS[0]} className="w-16 h-16 rounded-full border-4 border-white soft-shadow object-cover" />
             </div>
             {/* Photo 2 */}
             <div className="absolute top-[30%] right-0 -mr-8 fixed-head">
                <img src={PERSONNEL_PHOTOS[1]} className="w-16 h-16 rounded-full border-4 border-white soft-shadow object-cover" />
             </div>
             {/* Photo 3 */}
             <div className="absolute bottom-0 right-1/4 fixed-head">
                <img src={PERSONNEL_PHOTOS[2]} className="w-16 h-16 rounded-full border-4 border-white soft-shadow object-cover" />
             </div>
             {/* Photo 4 */}
             <div className="absolute bottom-0 left-1/4 fixed-head">
                <img src={PERSONNEL_PHOTOS[3]} className="w-16 h-16 rounded-full border-4 border-white soft-shadow object-cover" />
             </div>
             {/* Photo 5 */}
             <div className="absolute top-[30%] left-0 -ml-8 fixed-head">
                <img src={PERSONNEL_PHOTOS[4]} className="w-16 h-16 rounded-full border-4 border-white soft-shadow object-cover" />
             </div>
          </div>

          {/* Core Hub: Unified Center */}
          <div className="relative z-20 w-44 h-44 bg-[#0B0B0B] rounded-[56px] flex flex-col items-center justify-center text-center p-6 border-4 border-[#F5C400] shadow-[0_30px_60px_-15px_rgba(0,0,0,0.5)]">
             <div className="absolute inset-0 bg-[#F5C400] opacity-5 blur-3xl animate-pulse"></div>
             <IconShield className="w-12 h-12 text-[#F5C400] mb-2" />
             <p className="text-[10px] font-black text-white leading-tight uppercase tracking-tighter">Sistem Keamanan<br/>Satpam</p>
             <div className="w-8 h-1 bg-[#F5C400] rounded-full mt-3"></div>
          </div>
          
          {/* Decorative Pulse Nodes */}
          <div className="absolute top-10 right-20 w-2 h-2 bg-green-400 rounded-full pulse-yellow" style={{ animationDelay: '0.5s' }}></div>
          <div className="absolute bottom-20 left-10 w-2 h-2 bg-blue-400 rounded-full pulse-yellow" style={{ animationDelay: '1.2s' }}></div>
        </div>
      </section>

      {/* Why Join Section */}
      <section id="why-join" className="w-full py-48 bg-white overflow-hidden border-t border-gray-50">
        <div className="max-w-7xl mx-auto px-8 grid lg:grid-cols-2 gap-32 items-center">
          <div className="relative">
             <div className="absolute -left-20 -top-20 w-80 h-80 bg-gray-50 rounded-full -z-10"></div>
             <div className="bg-[#0B0B0B] p-16 rounded-[64px] text-white space-y-12 relative shadow-2xl">
                <div className="space-y-4">
                   <h3 className="text-4xl font-black tracking-tighter leading-tight">Transformasi Keamanan Industri.</h3>
                   <p className="text-gray-400 font-medium text-lg leading-relaxed">Keamanan bukan lagi sekadar kehadiran fisik, melainkan tata kelola data yang presisi.</p>
                </div>
                <div className="space-y-6">
                   {[
                      "Akuntabilitas Mutlak dengan Validasi GPS.",
                      "Respon Darurat Kolektif Lintas Tenant.",
                      "Eliminasi Laporan Manual & Human Error.",
                      "Data Audit yang Selalu Siap 24/7."
                   ].map((item, i) => (
                      <div key={i} className="flex gap-4 items-center">
                         <div className="w-6 h-6 bg-[#F5C400] rounded-full flex items-center justify-center text-black">
                            <IconCheck className="w-4 h-4" />
                         </div>
                         <span className="font-black text-sm uppercase tracking-wide">{item}</span>
                      </div>
                   ))}
                </div>
             </div>
          </div>
          
          <div className="space-y-10">
             <div className="space-y-4">
                <p className="text-[#F5C400] font-black text-[12px] uppercase tracking-[0.4em]">Strategic Value</p>
                <h2 className="text-6xl font-black tracking-tighter text-[#0B0B0B]">Mengapa Perusahaan Anda Harus Bergabung?</h2>
             </div>
             <div className="space-y-10">
                <div className="space-y-2">
                   <h4 className="font-black text-xl text-[#0B0B0B]">Integritas Operasional Tanpa Kompromi</h4>
                   <p className="text-gray-500 leading-relaxed font-medium">Sistem Digisatpam memastikan setiap personel benar-benar berada di titik patroli melalui sinkronisasi GPS Geofencing. Kami menghilangkan celah kelalaian yang biasanya tidak terpantau oleh manajemen.</p>
                </div>
                <div className="space-y-2">
                   <h4 className="font-black text-xl text-[#0B0B0B]">Mitigasi Risiko Real-Time 24/7</h4>
                   <p className="text-gray-500 leading-relaxed font-medium">Setiap insiden yang dilaporkan melalui PWA Satpam terkirim secara instan ke Cloud Hub pusat. Ini memungkinkan alur komando yang cepat untuk mencegah eskalasi bahaya di seluruh kawasan industri.</p>
                </div>
                <div className="space-y-2">
                   <h4 className="font-black text-xl text-[#0B0B0B]">Standar Kepatuhan Audit Internasional</h4>
                   <p className="text-gray-500 leading-relaxed font-medium">Laporan digital kami dirancang untuk memenuhi standar kepatuhan HSE dan ISO industri. Seluruh log aktivitas tersimpan dengan enkripsi militer, siap diekspor kapan saja untuk keperluan verifikasi audit.</p>
                </div>
             </div>
             <button onClick={() => setShowRoleSelector(true)} className="px-10 py-5 bg-[#0B0B0B] text-[#F5C400] rounded-full font-black text-sm uppercase tracking-widest shadow-xl hover:scale-105 transition-all">Daftarkan Perusahaan</button>
          </div>
        </div>
      </section>

      {/* Narrative Section: Joint Exercise Coordination */}
      <section id="slb" className="w-full py-48 bg-[#0B0B0B] text-white overflow-hidden relative">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-white/5 rounded-full blur-[120px] -mr-[400px] -mt-[400px]"></div>
        <div className="max-w-7xl mx-auto px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-24 items-center">
            <div className="space-y-12">
              <div className="space-y-4">
                 <p className="text-[#F5C400] font-black text-[12px] uppercase tracking-[0.4em]">Kordinasi Strategis</p>
                 <h2 className="text-5xl lg:text-6xl font-black tracking-tighter leading-none">Narasi Latihan <br/>Bersama <span className="text-[#F5C400]">(SLB)</span></h2>
              </div>
              <p className="text-xl text-gray-400 font-medium leading-relaxed">
                Di kawasan industri modern, ancaman terhadap satu perusahaan adalah ancaman bagi seluruh ekosistem. Digisatpam menjembatani komunikasi antar-tenant melalui protokol <span className="text-white font-black underline decoration-[#F5C400]">Sistem Latihan Bersama</span>.
              </p>
              
              <div className="space-y-8">
                <div className="flex gap-6 items-start">
                  <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center shrink-0 border border-white/5">
                    <IconGroup className="text-[#F5C400] w-7 h-7" />
                  </div>
                  <div>
                    <h4 className="font-black text-xl mb-1">Mobilisasi Kolektif</h4>
                    <p className="text-sm text-gray-500 leading-relaxed font-medium">Saat simulasi aktif, Danru dari berbagai tenant menerima instruksi kordinasi yang sama dari Monitoring Center Kawasan, memastikan pergerakan tim satpam yang sinkron dan terarah.</p>
                  </div>
                </div>
                <div className="flex gap-6 items-start">
                  <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center shrink-0 border border-white/5">
                    <IconBroadcast className="text-[#F5C400] w-7 h-7" />
                  </div>
                  <div>
                    <h4 className="font-black text-xl mb-1">Visualisasi Real-Time</h4>
                    <p className="text-sm text-gray-500 leading-relaxed font-medium">Monitoring Center dapat memantau posisi seluruh unit satpam dari berbagai perusahaan di satu peta operasional yang sama, mengeliminasi kebingungan kordinasi di lapangan.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white/5 p-16 rounded-[64px] border border-white/10 space-y-8 backdrop-blur-sm">
              <div className="p-8 bg-white/5 rounded-[32px] border border-white/5 relative">
                 <div className="absolute top-6 right-6">
                    <div className="w-3 h-3 bg-[#F5C400] rounded-full pulse-yellow"></div>
                 </div>
                 <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-4">Simulasi Aktif: Kebakaran Sektor B</p>
                 <div className="space-y-4">
                    <div className="flex justify-between items-center text-xs font-bold border-b border-white/5 pb-2">
                       <span>Tenant A (Petugas 01)</span>
                       <span className="text-[#F5C400]">MENGAMANKAN PERIMETER</span>
                    </div>
                    <div className="flex justify-between items-center text-xs font-bold border-b border-white/5 pb-2">
                       <span>Tenant B (Petugas 14)</span>
                       <span className="text-[#F5C400]">MENYISIR AREA EVAKUASI</span>
                    </div>
                    <div className="flex justify-between items-center text-xs font-bold border-b border-white/5 pb-2 opacity-50">
                       <span>Tenant C (Petugas 03)</span>
                       <span>STANDBY DI TITIK KUMPUL</span>
                    </div>
                 </div>
              </div>
              <div className="text-center py-6">
                 <p className="text-sm text-gray-400 font-medium leading-relaxed">
                   "Melalui SLB, perusahaan tidak lagi berjuang sendirian. Digisatpam menyatukan kekuatan keamanan seluruh kawasan menjadi satu unit pertahanan yang solid."
                 </p>
              </div>
              <button className="w-full py-5 bg-[#F5C400] text-black rounded-full font-black text-sm uppercase tracking-[0.2em] shadow-2xl hover:bg-yellow-400 transition-all">Lihat Jadwal Simulasi</button>
            </div>
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section id="how-it-works" className="w-full py-40 bg-gray-50 border-y border-gray-100">
        <div className="max-w-7xl mx-auto px-8">
           <div className="text-center space-y-5 mb-24">
              <p className="text-[#F5C400] font-black text-[12px] uppercase tracking-[0.4em]">How It Works</p>
              <h2 className="text-5xl font-black tracking-tighter text-[#0B0B0B]">Alur Data Terintegrasi</h2>
              <p className="text-gray-400 font-medium max-w-2xl mx-auto italic text-sm">Transmisi data dari lapangan ke pusat monitoring with validasi geofencing otomatis.</p>
           </div>
           <div className="grid lg:grid-cols-3 gap-16 items-center">
              <div className="space-y-8">
                 <div className="bg-white p-10 rounded-[40px] soft-shadow border border-gray-100 group hover:border-[#F5C400] transition-all">
                    <div className="w-16 h-16 bg-[#0B0B0B] text-white rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                      <IconPhone />
                    </div>
                    <h4 className="font-black text-xl mb-3">PWA Satpam (Edge)</h4>
                    <p className="text-sm text-gray-400 font-medium leading-relaxed mb-4">Aplikasi khusus petugas untuk input patroli, absensi biometrik, and pelaporan insiden darurat.</p>
                 </div>
                 <div className="bg-white p-10 rounded-[40px] soft-shadow border border-gray-100 group hover:border-[#F5C400] transition-all">
                    <div className="w-16 h-16 bg-[#0B0B0B] text-white rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                      <IconSearch />
                    </div>
                    <h4 className="font-black text-xl mb-3">Smart Checkpoint</h4>
                    <p className="text-sm text-gray-400 font-medium leading-relaxed mb-4">Validasi rute patroli menggunakan QR-Code and triangulasi satelit secara presisi.</p>
                 </div>
              </div>
              <div className="relative flex flex-col items-center justify-center h-[500px]">
                 <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-20" viewBox="0 0 400 500">
                    <path d="M 50,150 L 200,250" fill="none" stroke="#0B0B0B" strokeWidth="2" className="pulse-line" />
                    <path d="M 50,350 L 200,250" fill="none" stroke="#0B0B0B" strokeWidth="2" className="pulse-line" />
                    <path d="M 350,150 L 200,250" fill="none" stroke="#0B0B0B" strokeWidth="2" className="pulse-line" />
                    <path d="M 350,350 L 200,250" fill="none" stroke="#0B0B0B" strokeWidth="2" className="pulse-line" />
                 </svg>
                 <div className="w-52 h-52 bg-white rounded-[64px] soft-shadow border-2 border-gray-50 flex flex-col items-center justify-center gap-3 z-10 animate-pulse">
                    <IconCloud className="w-12 h-12 text-[#0B0B0B]" />
                    <p className="text-[10px] font-black uppercase tracking-widest text-[#0B0B0B]">Digisatpam Cloud</p>
                 </div>
              </div>
              <div className="space-y-8">
                 <div className="bg-white p-10 rounded-[40px] soft-shadow border border-gray-100 group hover:border-[#F5C400] transition-all">
                    <div className="w-16 h-16 bg-[#0B0B0B] text-white rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                      <IconChart />
                    </div>
                    <h4 className="font-black text-xl mb-3">Manajemen Riset</h4>
                    <p className="text-sm text-gray-400 font-medium leading-relaxed mb-4">Analitik dashboard untuk mengevaluasi efisiensi tim keamanan and pola anomali.</p>
                 </div>
                 <div className="bg-white p-10 rounded-[40px] soft-shadow border border-gray-100 group hover:border-[#F5C400] transition-all">
                    <div className="w-16 h-16 bg-[#0B0B0B] text-white rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                      <IconAlert />
                    </div>
                    <h4 className="font-black text-xl mb-3">Alarm Kawasan</h4>
                    <p className="text-sm text-gray-400 font-medium leading-relaxed mb-4">Peringatan otomatis yang memicu kordinasi lintas perusahaan dalam keadaan bahaya.</p>
                 </div>
              </div>
           </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full py-24 bg-white border-t border-gray-100">
         <div className="max-w-7xl mx-auto px-8">
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-16 mb-20">
               <div className="space-y-6">
                  <div className="flex items-center gap-2.5">
                     <div className="w-10 h-10 bg-[#0B0B0B] rounded-xl flex items-center justify-center text-white font-black text-2xl">D</div>
                     <span className="font-black text-2xl tracking-tight text-[#0B0B0B]">Digisatpam</span>
                  </div>
                  <p className="text-gray-400 font-medium max-w-sm">Solusi digital terintegrasi untuk keamanan kawasan industri modern di Indonesia.</p>
               </div>
               <div className="grid grid-cols-2 lg:grid-cols-3 gap-16">
                  <div className="space-y-6">
                     <p className="text-[11px] font-black uppercase tracking-[0.2em] text-[#0B0B0B]">Layanan</p>
                     <div className="flex flex-col gap-4 text-sm font-bold text-gray-400">
                        <a href="#" className="hover:text-black">Patroli Digital</a>
                        <a href="#" className="hover:text-black">Absensi GPS</a>
                        <a href="#" className="hover:text-black">Laporan Real-time</a>
                     </div>
                  </div>
                  <div className="space-y-6">
                     <p className="text-[11px] font-black uppercase tracking-[0.2em] text-[#0B0B0B]">Bantuan</p>
                     <div className="flex flex-col gap-4 text-sm font-bold text-gray-400">
                        <a href="#" className="hover:text-black">Pusat Bantuan</a>
                        <a href="#" className="hover:text-black">Hubungi Sales</a>
                        <a href="#" className="hover:text-black">Demo Gratis</a>
                     </div>
                  </div>
                  <div className="space-y-6 hidden lg:block">
                     <p className="text-[11px] font-black uppercase tracking-[0.2em] text-[#0B0B0B]">Legal</p>
                     <div className="flex flex-col gap-4 text-sm font-bold text-gray-400">
                        <a href="#" className="hover:text-black">Ketentuan Layanan</a>
                        <a href="#" className="hover:text-black">Privasi</a>
                     </div>
                  </div>
               </div>
            </div>
            <div className="pt-12 border-t border-gray-100 flex flex-col lg:flex-row justify-between items-center gap-8">
               <p className="text-[11px] font-extrabold text-gray-300 uppercase tracking-widest text-center">
                  © 2026 Digisatpam, PT. Bantu Indonesia Technology
               </p>
            </div>
         </div>
      </footer>

      {/* Role Selector Modal */}
      {showRoleSelector && (
        <div className="fixed inset-0 z-[300] flex items-center justify-center p-8 bg-[#0B0B0B]/90 backdrop-blur-md animate-in fade-in">
           <div className="bg-white w-full max-w-sm rounded-[48px] p-12 relative animate-in zoom-in duration-300">
              <div className="text-center mb-10">
                 <h3 className="text-2xl font-black tracking-tighter">Login Akses</h3>
                 <p className="text-gray-400 text-[10px] font-black uppercase tracking-widest mt-2">Pilih Role User</p>
              </div>
              <div className="space-y-3">
                 {[
                   { role: UserRole.KAWASAN_ADMIN, label: 'Admin Kawasan', icon: <IconBuilding /> },
                   { role: UserRole.MANAGEMENT, label: 'Manajemen Tenant', icon: <IconStore /> },
                   { role: UserRole.ANGGOTA_SATPAM, label: 'Aplikasi Petugas', icon: <IconPhone /> },
                 ].map((item) => (
                   <button key={item.role} onClick={() => onNavigate(item.role)} className="w-full p-5 text-left bg-gray-50 border border-transparent hover:border-[#0B0B0B] hover:bg-white rounded-[24px] transition-all group flex items-center gap-5">
                      <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-white soft-shadow group-hover:scale-105 transition-transform text-[#0B0B0B]">
                        {item.icon}
                      </div>
                      <span className="font-extrabold text-[14px] text-[#0B0B0B] uppercase tracking-tighter">{item.label}</span>
                   </button>
                 ))}
              </div>
              <button onClick={() => setShowRoleSelector(false)} className="w-full py-4 text-gray-300 font-black text-[10px] uppercase tracking-[0.2em] mt-8 hover:text-black transition">Batal</button>
           </div>
        </div>
      )}
    </div>
  );
};

export default LandingPage;
