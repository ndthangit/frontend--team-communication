import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Hash, FolderOpen, Users, Phone, MessageSquare, Bell, ChevronLeft, MessageCircle } from 'lucide-react';
import { useApp } from '../context/AppContext';
import type {NavigationView} from '../types';

interface TeamLayoutProps {
  children: React.ReactNode;
}

export const TeamLayout: React.FC<TeamLayoutProps> = ({ children }) => {
  const navigate = useNavigate();
  const { currentTeam, currentView, setCurrentView, teams, currentUser } = useApp();

  const navigationItems: { view: NavigationView; icon: React.ReactNode; label: string }[] = [
    { view: 'channels', icon: <Hash className="w-5 h-5" />, label: 'Channels' },
    { view: 'chat', icon: <MessageCircle className="w-5 h-5" />, label: 'Chat' },
    { view: 'posts', icon: <MessageSquare className="w-5 h-5" />, label: 'Posts' },
    { view: 'files', icon: <FolderOpen className="w-5 h-5" />, label: 'Files' },
    { view: 'members', icon: <Users className="w-5 h-5" />, label: 'Members' },
    { view: 'calls', icon: <Phone className="w-5 h-5" />, label: 'Calls' },
  ];

  const [showMenu, setShowMenu] = React.useState(false);

  // Close menu on outside click
  React.useEffect(() => {
    if (!showMenu) return;
    function handle(e: MouseEvent) {
      if (!(e.target as HTMLElement).closest('#user-menu-button')) {
        setShowMenu(false);
      }
    }
    window.addEventListener('mousedown', handle);
    return () => window.removeEventListener('mousedown', handle);
  }, [showMenu]);

  const onProfile = () => {
    // TODO: Implement profile navigation
  };
  const onSetting = () => {
    // TODO: Implement setting navigation
  };
  const onLogout = () => {
    // TODO: Implement logout logic
  };

  if (!currentTeam) {
    return null;
  }

  return (
    <div className="flex h-screen bg-gradient-to-br from-blue-50 via-white to-purple-100">
      <div className="w-20 flex flex-col items-center py-4 glass-sidebar rounded-r-3xl shadow-xl mr-2">
        <button
          onClick={() => navigate('/')}
          className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-400 rounded-xl flex items-center justify-center text-white font-semibold text-lg mb-6 hover:scale-110 hover:shadow-lg transition"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        {teams.map((team) => (
          <button
            key={team.id}
            onClick={() => navigate(`/team/${team.id}`)}
            className={`w-12 h-12 rounded-xl flex items-center justify-center text-white font-semibold text-lg mb-3 transition-all shadow ${
              currentTeam.id === team.id ? 'bg-gradient-to-br from-blue-600 to-purple-500 scale-110 shadow-lg' : 'bg-blue-400 hover:bg-blue-500 hover:scale-105'
            }`}
          >
            {team.name.charAt(0).toUpperCase()}
          </button>
        ))}
      </div>

      <div className="w-64 glass-sidebar flex flex-col rounded-3xl shadow-xl my-4 ml-2">
        <div className="p-4 border-b border-blue-100">
          <h2 className="text-lg font-bold text-blue-900">{currentTeam.name}</h2>
          <p className="text-sm text-blue-700 truncate">{currentTeam.description}</p>
        </div>
        <nav className="flex-1 p-3">
          {navigationItems.map((item) => (
            <button
              key={item.view}
              onClick={() => setCurrentView(item.view)}
              className={`w-full flex items-center px-3 py-2 rounded-xl mb-2 font-medium transition-all shadow-sm ${
                currentView === item.view
                  ? 'bg-gradient-to-r from-blue-500 to-purple-400 text-white shadow-lg scale-105' : 'text-blue-700 hover:bg-blue-50 hover:scale-105'
              }`}
            >
              {item.icon}
              <span className="ml-3">{item.label}</span>
            </button>
          ))}
        </nav>
      </div>

      <div className="flex-1 flex flex-col">
        <header className="h-16 bg-white bg-opacity-80 border-b border-blue-100 flex items-center justify-between px-8 rounded-b-2xl shadow-md mt-4 mx-4">
          <h1 className="text-xl font-bold text-blue-900 capitalize tracking-wide">{currentView}</h1>
          <div className="flex items-center gap-4 relative">
            <button className="p-2 hover:bg-blue-50 rounded-lg transition-colors relative">
              <Bell className="w-5 h-5 text-blue-700" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>
            {/* User menu dropdown */}
            <div className="relative">
              <button
                className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-semibold text-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                onClick={() => setShowMenu((v) => !v)}
                aria-haspopup="true"
                aria-expanded={showMenu}
                id="user-menu-button"
              >
                {currentUser.name.charAt(0).toUpperCase()}
              </button>
              {showMenu && (
                <div
                  className="absolute right-0 mt-2 w-44 bg-white rounded-xl shadow-lg ring-1 ring-black ring-opacity-5 z-50 animate-fade-in"
                  tabIndex={-1}
                  role="menu"
                  aria-labelledby="user-menu-button"
                >
                  <button
                    className="block w-full text-left px-4 py-3 text-gray-800 hover:bg-blue-50 rounded-t-xl"
                    onClick={() => { setShowMenu(false); onProfile(); }}
                    role="menuitem"
                  >
                    Profile
                  </button>
                  <button
                    className="block w-full text-left px-4 py-3 text-gray-800 hover:bg-blue-50"
                    onClick={() => { setShowMenu(false); onSetting(); }}
                    role="menuitem"
                  >
                    Setting
                  </button>
                  <button
                    className="block w-full text-left px-4 py-3 text-red-600 hover:bg-red-50 rounded-b-xl"
                    onClick={() => { setShowMenu(false); onLogout(); }}
                    role="menuitem"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-auto">{children}</main>
      </div>
    </div>
  );
};
