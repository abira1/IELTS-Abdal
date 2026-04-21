import { Menu, Bell, Search } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

interface HeaderProps {
  onMenuClick: () => void;
  title: string;
  subtitle?: string;
}

export function Header({ onMenuClick, title, subtitle }: HeaderProps) {
  const { user } = useAuth();

  return (
    <header className="sticky top-0 z-30 glass border-b border-slate-100">
      <div className="h-16 px-4 md:px-8 flex items-center justify-between gap-4">
        {/* Left: Hamburger + Title */}
        <div className="flex items-center gap-3 min-w-0">
          <button
            onClick={onMenuClick}
            className="lg:hidden p-2 rounded-xl text-midnight-800 hover:bg-slate-75 transition-colors flex-shrink-0"
            aria-label="Open menu"
          >
            <Menu className="w-5 h-5" />
          </button>
          <div className="min-w-0">
            <h1 className="text-lg md:text-xl font-bold text-midnight-800 truncate">{title}</h1>
            {subtitle && (
              <p className="text-xs text-slate-500 font-medium truncate">{subtitle}</p>
            )}
          </div>
        </div>

        {/* Center: Search (Desktop only) */}
        <div className="hidden md:flex flex-1 max-w-md mx-4">
          <div className="relative w-full">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search..."
              className="w-full h-10 pl-10 pr-4 bg-slate-50 border border-slate-100 rounded-full 
                         text-sm text-midnight-800 placeholder:text-slate-400
                         focus:outline-none focus:ring-2 focus:ring-forest-200 focus:border-forest-400
                         focus:bg-white transition-all duration-200"
            />
          </div>
        </div>

        {/* Right: Notification + Profile */}
        <div className="flex items-center gap-3 flex-shrink-0">
          {/* Notification Bell */}
          <button className="relative p-2 rounded-xl text-midnight-400 hover:bg-slate-75 transition-colors">
            <Bell className="w-5 h-5" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full ring-2 ring-white" />
          </button>

          {/* User Profile */}
          <div className="hidden sm:flex items-center gap-3 pl-3 border-l border-slate-200">
            <div className="w-9 h-9 rounded-full bg-forest-600 flex items-center justify-center text-white font-bold text-sm">
              {user?.name?.charAt(0)?.toUpperCase() || 'U'}
            </div>
            <div className="hidden md:block">
              <p className="text-sm font-semibold text-midnight-800 leading-tight truncate max-w-[120px]">
                {user?.name || 'User'}
              </p>
              <p className="text-xs text-slate-500 capitalize">{user?.role || 'user'}</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
