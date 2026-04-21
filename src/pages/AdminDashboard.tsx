import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { RefreshCw, Play, List, Users, Download, Shield, DollarSign, TrendingUp, BookOpen, Calendar, ChevronRight } from 'lucide-react';
import { getDatabase, ref, get } from 'firebase/database';
import { app } from '../firebase';
import { storage, ExamSubmission } from '../utils/storage';
import { TrackManagement } from '../components/TrackManagement';
import { ExamControlPage } from './admin/ExamControlPage';
import { RoleManagement } from '../components/RoleManagement';
import { ExpenseManager } from '../components/admin/ExpenseManager';
import { exportToExcel } from '../utils/exportExcel';
import { useAuth } from '../contexts/AuthContext';
import { MigrationUtility } from '../components/MigrationUtility';
import { AppLayout } from '../components/layout/AppLayout';

type TabType = 'tracks' | 'exam-control' | 'role-management' | 'expense-manager';

export function AdminDashboard() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [submissions, setSubmissions] = useState<ExamSubmission[]>([]);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [activeTab, setActiveTab] = useState<TabType>('tracks');
  const [currentExamName, setCurrentExamName] = useState<string>('No exam running');

  useEffect(() => {
    loadSubmissions();
    loadExamStatus();
    
    const unsubscribe = storage.subscribeToSubmissions((realTimeSubmissions) => {
      console.log('Admin Dashboard: Real-time update received', realTimeSubmissions.length);
      setSubmissions(realTimeSubmissions);
    });
    
    const interval = setInterval(() => {
      loadExamStatus();
    }, 30000);
    
    return () => {
      clearInterval(interval);
      unsubscribe();
    };
  }, []);
  
  const loadSubmissions = async () => {
    const data = await storage.getSubmissions();
    setSubmissions(data);
  };
  
  const loadExamStatus = async () => {
    try {
      const db = getDatabase(app);
      const snapshot = await get(ref(db, 'exam/status'));
      if (snapshot.exists()) {
        const data = snapshot.val();
        if (data.isStarted && data.trackName) {
          setCurrentExamName(data.trackName);
        } else {
          setCurrentExamName('No exam running');
        }
      }
    } catch (error) {
      console.error('Error loading exam status:', error);
    }
  };
  
  const handleRefresh = async () => {
    setIsRefreshing(true);
    await loadSubmissions();
    setTimeout(() => setIsRefreshing(false), 500);
  };

  // KPI Data
  const todaySubmissions = submissions.filter(s => {
    const today = new Date().toDateString();
    return new Date(s.submittedAt).toDateString() === today;
  }).length;

  const pendingGrading = submissions.filter(s => !s.marks || Object.keys(s.marks).length === 0).length;
  const publishedResults = submissions.filter(s => s.resultPublished).length;

  return (
    <AppLayout
      role="admin"
      title="Admin Dashboard"
      subtitle={currentExamName}
      activeTab={activeTab}
      onTabChange={(tab) => setActiveTab(tab as TabType)}
    >
      {/* Action Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse2" />
          <span className="text-xs font-medium text-slate-500">Live · Auto-refresh: 30s</span>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => exportToExcel(submissions, { type: 'all' })}
            className="btn-ghost text-sm !px-4 !py-2"
          >
            <Download className="w-4 h-4" />
            <span className="hidden sm:inline">Export All</span>
          </button>
          <button
            onClick={handleRefresh}
            className="btn-ghost text-sm !px-4 !py-2"
          >
            <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin' : ''}`} />
            <span className="hidden sm:inline">Refresh</span>
          </button>
        </div>
      </div>

      {/* KPI Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-8">
        <div className="kpi-card animate-fadeInUp stagger-1" style={{ animationFillMode: 'both' }}>
          <div className="kpi-icon bg-blue-50">
            <Users className="w-6 h-6 text-blue-600" />
          </div>
          <div>
            <p className="kpi-label">Total Submissions</p>
            <p className="kpi-value">{submissions.length}</p>
          </div>
        </div>

        <div className="kpi-card animate-fadeInUp stagger-2" style={{ animationFillMode: 'both' }}>
          <div className="kpi-icon bg-emerald-50">
            <TrendingUp className="w-6 h-6 text-emerald-600" />
          </div>
          <div>
            <p className="kpi-label">Today's Submissions</p>
            <p className="kpi-value">{todaySubmissions}</p>
          </div>
        </div>

        <div className="kpi-card animate-fadeInUp stagger-3" style={{ animationFillMode: 'both' }}>
          <div className="kpi-icon bg-orange-50">
            <BookOpen className="w-6 h-6 text-orange-600" />
          </div>
          <div>
            <p className="kpi-label">Pending Grading</p>
            <p className="kpi-value">{pendingGrading}</p>
          </div>
        </div>

        <div className="kpi-card animate-fadeInUp stagger-4" style={{ animationFillMode: 'both' }}>
          <div className="kpi-icon bg-purple-50">
            <Calendar className="w-6 h-6 text-purple-600" />
          </div>
          <div>
            <p className="kpi-label">Published Results</p>
            <p className="kpi-value">{publishedResults}</p>
          </div>
        </div>
      </div>

      {/* Quick Navigation Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <button
          onClick={() => navigate('/admin/students')}
          className="zen-card zen-card-hover text-left group"
          data-testid="students-management-tab"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-blue-50 flex items-center justify-center">
                <Users className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="font-bold text-midnight-800 text-sm">Students</p>
                <p className="text-xs text-slate-500">Manage directory</p>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-forest-600 transition-colors" />
          </div>
        </button>

        <button
          onClick={() => navigate('/admin/batches')}
          className="zen-card zen-card-hover text-left group"
          data-testid="batches-management-tab"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-emerald-50 flex items-center justify-center">
                <List className="w-5 h-5 text-emerald-600" />
              </div>
              <div>
                <p className="font-bold text-midnight-800 text-sm">Batches</p>
                <p className="text-xs text-slate-500">Manage groups</p>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-forest-600 transition-colors" />
          </div>
        </button>

        <button
          onClick={() => navigate('/admin/submissions')}
          className="zen-card zen-card-hover text-left group"
          data-testid="submissions-tab"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-purple-50 flex items-center justify-center">
                <Play className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <p className="font-bold text-midnight-800 text-sm">Submissions</p>
                <p className="text-xs text-slate-500">Grade & review</p>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-forest-600 transition-colors" />
          </div>
        </button>
      </div>

      {/* Active Tab Content */}
      <div className="zen-card !p-0 overflow-hidden">
        {/* Tab Header */}
        <div className="border-b border-slate-100 px-6 md:px-8 pt-6 pb-0">
          <div className="flex gap-1 overflow-x-auto scrollbar-thin -mb-px">
            {[
              { id: 'tracks', label: 'Track Management', icon: List },
              { id: 'exam-control', label: 'Exam Control', icon: Play },
              { id: 'role-management', label: 'Roles', icon: Shield },
              { id: 'expense-manager', label: 'Expenses', icon: DollarSign },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as TabType)}
                className={`flex items-center gap-2 px-4 py-3 text-sm font-semibold border-b-2 transition-colors whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'text-forest-600 border-forest-600'
                    : 'text-slate-500 border-transparent hover:text-midnight-800 hover:border-slate-300'
                }`}
                data-testid={`tab-${tab.id}`}
              >
                <tab.icon className="w-4 h-4" />
                <span className="hidden sm:inline">{tab.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        <div className="p-4 md:p-6 lg:p-8">
          {activeTab === 'tracks' ? (
            <TrackManagement />
          ) : activeTab === 'exam-control' ? (
            <ExamControlPage />
          ) : activeTab === 'role-management' ? (
            <RoleManagement currentUserEmail={user?.email || ''} />
          ) : activeTab === 'expense-manager' ? (
            <ExpenseManager />
          ) : null}
        </div>
      </div>
      
      {/* Migration Utility - Fixed position button */}
      <MigrationUtility />
    </AppLayout>
  );
}