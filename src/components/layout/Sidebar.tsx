import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import {
  LayoutDashboard,
  Users,
  Layers,
  Play,
  Shield,
  DollarSign,
  FileText,
  LogOut,
  ChevronRight,
  X,
  BookOpen,
  BarChart3,
  Calendar,
  CheckCircle
} from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  role: 'admin' | 'student' | 'teacher';
  activeTab?: string;
  onTabChange?: (tab: string) => void;
}

const LOGO_URL = 'https://i.postimg.cc/G3Gjq60p/IELTS-ABDAL-LOGO-PNG.png';

const adminLinks = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, path: '/admin/dashboard' },
  { id: 'students', label: 'Students', icon: Users, path: '/admin/students' },
  { id: 'batches', label: 'Batches', icon: Layers, path: '/admin/batches' },
  { id: 'submissions', label: 'Submissions', icon: CheckCircle, path: '/admin/submissions' },
  { id: 'tracks', label: 'Track Management', icon: FileText, tab: 'tracks' },
  { id: 'exam-control', label: 'Exam Control', icon: Play, tab: 'exam-control' },
  { id: 'role-management', label: 'Role Management', icon: Shield, tab: 'role-management' },
  { id: 'expense-manager', label: 'Expenses', icon: DollarSign, tab: 'expense-manager' },
];

const studentLinks = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, path: '/student/dashboard' },
  { id: 'exams', label: 'My Exams', icon: BookOpen, section: 'exams' },
  { id: 'results', label: 'My Results', icon: BarChart3, section: 'results' },
  { id: 'performance', label: 'Performance', icon: Calendar, section: 'performance' },
];

const teacherLinks = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, path: '/teacher/dashboard' },
  { id: 'submissions', label: 'Submissions', icon: CheckCircle, path: '/teacher/submissions' },
];

export function Sidebar({ isOpen, onClose, role, activeTab, onTabChange }: SidebarProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout } = useAuth();

  const links = role === 'admin' ? adminLinks : role === 'student' ? studentLinks : teacherLinks;

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleLinkClick = (link: any) => {
    if (link.path) {
      navigate(link.path);
    }
    if (link.tab && onTabChange) {
      // Navigate to admin dashboard first if not there
      if (location.pathname !== '/admin/dashboard') {
        navigate('/admin/dashboard');
      }
      onTabChange(link.tab);
    }
    if (link.section) {
      // Scroll to section
      const el = document.getElementById(link.section);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
    // Close mobile drawer
    onClose();
  };

  const isActive = (link: any): boolean => {
    if (link.path && location.pathname === link.path) return true;
    if (link.tab && activeTab === link.tab && location.pathname === '/admin/dashboard') return true;
    return false;
  };

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-midnight-900/50 backdrop-blur-sm z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed top-0 left-0 z-50 h-full w-[280px] bg-midnight-800
          flex flex-col transition-transform duration-300 ease-out
          lg:translate-x-0
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        `}
      >
        {/* Logo Area */}
        <div className="px-6 pt-6 pb-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img
              src={LOGO_URL}
              alt="Abdal IELTS Academy"
              className="h-10 w-auto object-contain"
            />
          </div>
          <button
            onClick={onClose}
            className="lg:hidden p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* User Info */}
        <div className="px-6 pb-6 mb-2">
          <div className="flex items-center gap-3 p-3 rounded-2xl bg-white/5">
            <div className="w-10 h-10 rounded-full bg-forest-600 flex items-center justify-center text-white font-bold text-sm">
              {user?.name?.charAt(0)?.toUpperCase() || 'U'}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-white font-semibold text-sm truncate">{user?.name || 'User'}</p>
              <p className="text-slate-400 text-xs capitalize truncate">{role}</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 space-y-1 overflow-y-auto scrollbar-thin">
          <p className="px-4 py-2 text-[10px] font-bold uppercase tracking-widest text-slate-500">
            Navigation
          </p>
          {links.map((link) => (
            <button
              key={link.id}
              onClick={() => handleLinkClick(link)}
              className={`sidebar-link w-full ${isActive(link) ? 'active' : ''}`}
              data-testid={`sidebar-${link.id}`}
            >
              <link.icon className="w-5 h-5 flex-shrink-0" />
              <span className="flex-1 text-left">{link.label}</span>
              {isActive(link) && (
                <ChevronRight className="w-4 h-4 opacity-60 hidden lg:block" />
              )}
            </button>
          ))}
        </nav>

        {/* Bottom Section */}
        <div className="p-4 mt-auto border-t border-white/10">
          <button
            onClick={handleLogout}
            className="sidebar-link w-full text-red-400 hover:text-red-300 hover:bg-red-500/10"
            data-testid="sidebar-logout"
          >
            <LogOut className="w-5 h-5" />
            <span>Logout</span>
          </button>
        </div>
      </aside>
    </>
  );
}
