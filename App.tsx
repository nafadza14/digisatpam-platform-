
import React, { useState } from 'react';
import LandingPage from './components/LandingPage.tsx';
import PWASatpam from './components/PWASatpam';
import ManagementDashboard from './components/ManagementDashboard';
import KawasanDashboard from './components/KawasanDashboard';
import { UserRole, UserProfile } from './types';

const App: React.FC = () => {
  const [user, setUser] = useState<UserProfile | null>(null);

  const handleLogin = (role: UserRole) => {
    const mockProfiles: Record<string, UserProfile> = {
      [UserRole.KOMANDAN_SATPAM]: { 
        id: 'CHIEF-001', name: 'H. Sutrisno', role: UserRole.KOMANDAN_SATPAM, 
        specialization: 'KEAMANAN', companyId: 'COMP_A', companyName: 'PT. Manufaktur Jaya',
        phone: '+628123456780', kawasanId: 'KAW_01' 
      },
      [UserRole.DANRU]: { 
        id: 'DANRU-001', name: 'Agus Prayitno', role: UserRole.DANRU, 
        specialization: 'KEBAKARAN', companyId: 'COMP_A', companyName: 'PT. Manufaktur Jaya',
        phone: '+628129999888', kawasanId: 'KAW_01' 
      },
      [UserRole.ANGGOTA_SATPAM]: { 
        id: 'SAT-001', name: 'Bambang Setyo', role: UserRole.ANGGOTA_SATPAM, 
        specialization: 'MEDIS', companyId: 'COMP_A', companyName: 'PT. Manufaktur Jaya',
        phone: '+628112233445', kawasanId: 'KAW_01' 
      },
      [UserRole.MANAGEMENT]: { 
        id: 'M001', name: 'Siti Aminah', role: UserRole.MANAGEMENT, 
        companyId: 'COMP_A', companyName: 'PT. Manufaktur Jaya',
        phone: '+6281333444555', kawasanId: 'KAW_01' 
      },
      [UserRole.KAWASAN_ADMIN]: { 
        id: 'K001', name: 'Aditya Mahendra', role: UserRole.KAWASAN_ADMIN, 
        companyId: 'KAWASAN_HQ', companyName: 'Kawasan Industri Sentolo',
        phone: '+62899000111', kawasanId: 'KAW_01' 
      },
      [UserRole.PLATFORM_ADMIN]: { 
        id: 'P001', name: 'Admin Pusat', role: UserRole.PLATFORM_ADMIN, 
        companyId: 'DIGISATPAM_HQ', companyName: 'Digisatpam Global Indonesia',
        phone: '+6221555666', kawasanId: 'GLOBAL' 
      },
    };

    setUser(mockProfiles[role]);
  };

  const handleLogout = () => setUser(null);

  const renderContent = () => {
    if (!user) return <LandingPage onNavigate={handleLogin} />;

    switch (user.role) {
      case UserRole.KOMANDAN_SATPAM:
      case UserRole.DANRU:
      case UserRole.ANGGOTA_SATPAM:
        return <PWASatpam user={user} onLogout={handleLogout} />;
      case UserRole.MANAGEMENT:
        return <ManagementDashboard user={user} onLogout={handleLogout} />;
      case UserRole.KAWASAN_ADMIN:
        return <KawasanDashboard user={user} onLogout={handleLogout} />;
      case UserRole.PLATFORM_ADMIN:
        return <ManagementDashboard user={user} onLogout={handleLogout} />; // Sementara menggunakan Dashboard yang sama
      default:
        return <LandingPage onNavigate={handleLogin} />;
    }
  };

  return (
    <div className="min-h-screen">
      {renderContent()}
    </div>
  );
};

export default App;
