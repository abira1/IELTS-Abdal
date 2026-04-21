import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { studentService, Student } from '../../services/studentService';
import { batchService, Batch } from '../../services/batchService';
import { AddStudentModal } from '../../components/admin/AddStudentModal';
import { EditStudentModal } from '../../components/admin/EditStudentModal';
import { AppLayout } from '../../components/layout/AppLayout';
import { 
  Users, 
  Search, 
  Plus, 
  Edit2, 
  Trash2, 
  UserX, 
  Eye,
  RefreshCw,
  UserCheck
} from 'lucide-react';

type StatusFilter = 'all' | 'active' | 'inactive';
type PaymentFilter = 'all' | 'complete' | 'due';

export function StudentsPage() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [students, setStudents] = useState<Student[]>([]);
  const [batches, setBatches] = useState<Batch[]>([]);
  const [filteredStudents, setFilteredStudents] = useState<Student[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('all');
  const [paymentFilter, setPaymentFilter] = useState<PaymentFilter>('all');
  const [batchFilter, setBatchFilter] = useState<string>('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const studentsPerPage = 20;

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    filterStudents();
  }, [students, searchQuery, statusFilter, paymentFilter, batchFilter]);

  const loadData = async () => {
    setIsLoading(true);
    try {
      const [studentsData, batchesData] = await Promise.all([
        studentService.getAllStudents(),
        batchService.getAllBatches()
      ]);
      setStudents(studentsData);
      setBatches(batchesData);
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await loadData();
    setTimeout(() => setIsRefreshing(false), 500);
  };

  const filterStudents = () => {
    let filtered = [...students];

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        s =>
          s.name.toLowerCase().includes(query) ||
          s.studentId.toLowerCase().includes(query) ||
          s.email.toLowerCase().includes(query)
      );
    }

    if (statusFilter !== 'all') {
      filtered = filtered.filter(s => s.status === statusFilter);
    }

    if (paymentFilter !== 'all') {
      if (paymentFilter === 'complete') {
        filtered = filtered.filter(s => (s.due || 0) <= 0);
      } else if (paymentFilter === 'due') {
        filtered = filtered.filter(s => (s.due || 0) > 0);
      }
    }

    if (batchFilter !== 'all') {
      filtered = filtered.filter(s => s.batchId === batchFilter);
    }

    setFilteredStudents(filtered);
    setCurrentPage(1);
  };

  const handleAddStudent = () => {
    setShowAddModal(true);
  };

  const handleEditStudent = (student: Student) => {
    setSelectedStudent(student);
    setShowEditModal(true);
  };

  const handleViewProfile = (studentId: string) => {
    navigate(`/admin/students/${studentId}`);
  };

  const handleDeactivateStudent = async (studentId: string) => {
    if (!confirm('Are you sure you want to deactivate this student?')) return;

    const success = await studentService.updateStudent(studentId, {
      status: 'inactive'
    });

    if (success) {
      alert('Student deactivated successfully');
      loadData();
    } else {
      alert('Failed to deactivate student');
    }
  };

  const handleActivateStudent = async (studentId: string) => {
    const success = await studentService.updateStudent(studentId, {
      status: 'active'
    });

    if (success) {
      alert('Student activated successfully');
      loadData();
    } else {
      alert('Failed to activate student');
    }
  };

  const handleDeleteStudent = async (studentId: string) => {
    if (
      !confirm(
        'Are you sure you want to delete this student? This action cannot be undone.'
      )
    )
      return;

    const success = await studentService.deleteStudent(studentId);

    if (success) {
      alert('Student deleted successfully');
      loadData();
    } else {
      alert('Failed to delete student');
    }
  };

  // Pagination
  const indexOfLastStudent = currentPage * studentsPerPage;
  const indexOfFirstStudent = indexOfLastStudent - studentsPerPage;
  const currentStudents = filteredStudents.slice(
    indexOfFirstStudent,
    indexOfLastStudent
  );
  const totalPages = Math.ceil(filteredStudents.length / studentsPerPage);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <AppLayout role="admin" title="Students Management" subtitle={`${students.length} total students`}>
      {/* KPI Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 md:gap-4 mb-6">
        <div className="zen-card !p-4 md:!p-5 animate-fadeInUp stagger-1" style={{ animationFillMode: 'both' }}>
          <p className="text-xs font-medium text-slate-500 mb-1">Total</p>
          <p className="text-2xl font-bold text-midnight-800">{students.length}</p>
        </div>
        <div className="zen-card !p-4 md:!p-5 animate-fadeInUp stagger-2" style={{ animationFillMode: 'both' }}>
          <p className="text-xs font-medium text-slate-500 mb-1">Active</p>
          <p className="text-2xl font-bold text-emerald-600">{students.filter(s => s.status === 'active').length}</p>
        </div>
        <div className="zen-card !p-4 md:!p-5 animate-fadeInUp stagger-3" style={{ animationFillMode: 'both' }}>
          <p className="text-xs font-medium text-slate-500 mb-1">Inactive</p>
          <p className="text-2xl font-bold text-orange-600">{students.filter(s => s.status === 'inactive').length}</p>
        </div>
        <div className="zen-card !p-4 md:!p-5 animate-fadeInUp stagger-4" style={{ animationFillMode: 'both' }}>
          <p className="text-xs font-medium text-slate-500 mb-1">Paid</p>
          <p className="text-2xl font-bold text-emerald-600">{students.filter(s => (s.due || 0) <= 0).length}</p>
        </div>
        <div className="zen-card !p-4 md:!p-5 animate-fadeInUp stagger-5" style={{ animationFillMode: 'both' }}>
          <p className="text-xs font-medium text-slate-500 mb-1">Batches</p>
          <p className="text-2xl font-bold text-blue-600">{batches.length}</p>
        </div>
      </div>

      {/* Search & Filters + Action Buttons */}
      <div className="zen-card !p-4 md:!p-6 mb-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
          <h2 className="text-lg font-bold text-midnight-800">Student Directory</h2>
          <div className="flex items-center gap-2">
            <button
              onClick={handleRefresh}
              disabled={isRefreshing}
              className="btn-ghost text-sm !px-3 !py-2"
            >
              <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin' : ''}`} />
              <span className="hidden sm:inline">Refresh</span>
            </button>
            <button
              onClick={handleAddStudent}
              className="btn-forest text-sm !px-4 !py-2.5"
              data-testid="add-student-btn"
            >
              <Plus className="w-4 h-4" />
              <span>Add Student</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Search name, ID, email..."
              className="zen-input !pl-11 !min-h-[44px]"
              data-testid="search-students-input"
            />
          </div>

          {/* Status Filter */}
          <select
            value={statusFilter}
            onChange={e => setStatusFilter(e.target.value as StatusFilter)}
            className="zen-select !min-h-[44px]"
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>

          {/* Payment Filter */}
          <select
            value={paymentFilter}
            onChange={e => setPaymentFilter(e.target.value as PaymentFilter)}
            className="zen-select !min-h-[44px]"
          >
            <option value="all">All Payments</option>
            <option value="complete">Payment Complete</option>
            <option value="due">Payment Due</option>
          </select>

          {/* Batch Filter */}
          <select
            value={batchFilter}
            onChange={e => setBatchFilter(e.target.value)}
            className="zen-select !min-h-[44px]"
          >
            <option value="all">All Batches</option>
            {batches.map(batch => (
              <option key={batch.batchId} value={batch.batchId}>
                {batch.batchName}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Students Table */}
      <div className="zen-card !p-0 overflow-hidden">
        {isLoading ? (
          <div className="p-12 text-center">
            <RefreshCw className="w-8 h-8 text-slate-400 animate-spin mx-auto mb-4" />
            <p className="text-slate-500 font-medium">Loading students...</p>
          </div>
        ) : currentStudents.length === 0 ? (
          <div className="p-12 text-center">
            <div className="w-16 h-16 bg-slate-50 rounded-zen flex items-center justify-center mx-auto mb-4">
              <Users className="w-8 h-8 text-slate-400" />
            </div>
            <p className="text-midnight-800 font-semibold mb-2">
              {searchQuery || statusFilter !== 'all' || batchFilter !== 'all'
                ? 'No students found'
                : 'No students yet'}
            </p>
            <p className="text-sm text-slate-500">
              {searchQuery || statusFilter !== 'all' || batchFilter !== 'all'
                ? 'Try adjusting your filters'
                : 'Add your first student to get started'}
            </p>
          </div>
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="zen-table">
                <thead>
                  <tr>
                    <th>Student ID</th>
                    <th>Name</th>
                    <th className="hidden md:table-cell">Email</th>
                    <th className="hidden lg:table-cell">Mobile</th>
                    <th className="hidden sm:table-cell">Batch</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {currentStudents.map(student => (
                    <tr key={student.studentId}>
                      <td>
                        <span className="font-mono text-sm font-semibold text-midnight-800">
                          {student.studentId}
                        </span>
                      </td>
                      <td>
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-forest-50 flex items-center justify-center text-forest-600 font-bold text-xs flex-shrink-0">
                            {student.name?.charAt(0)?.toUpperCase()}
                          </div>
                          <span className="font-semibold text-midnight-800">{student.name}</span>
                        </div>
                      </td>
                      <td className="hidden md:table-cell">
                        <span className="text-slate-500">{student.email}</span>
                      </td>
                      <td className="hidden lg:table-cell">
                        <span className="text-slate-500">{student.mobile}</span>
                      </td>
                      <td className="hidden sm:table-cell">
                        <span className="text-midnight-800 font-medium">{student.batch}</span>
                      </td>
                      <td>
                        {(student.due || 0) <= 0 ? (
                          <span className="pill-emerald">Paid</span>
                        ) : (
                          <span className="pill-red">Due</span>
                        )}
                      </td>
                      <td>
                        <div className="flex items-center gap-1">
                          <button
                            onClick={() => handleViewProfile(student.studentId)}
                            className="p-2 text-blue-600 hover:bg-blue-50 rounded-xl transition-colors"
                            title="View Profile"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleEditStudent(student)}
                            className="p-2 text-slate-500 hover:bg-slate-50 rounded-xl transition-colors"
                            title="Edit"
                          >
                            <Edit2 className="w-4 h-4" />
                          </button>
                          {student.status === 'active' ? (
                            <button
                              onClick={() => handleDeactivateStudent(student.studentId)}
                              className="p-2 text-orange-500 hover:bg-orange-50 rounded-xl transition-colors"
                              title="Deactivate"
                            >
                              <UserX className="w-4 h-4" />
                            </button>
                          ) : (
                            <button
                              onClick={() => handleActivateStudent(student.studentId)}
                              className="p-2 text-emerald-500 hover:bg-emerald-50 rounded-xl transition-colors"
                              title="Activate"
                            >
                              <UserCheck className="w-4 h-4" />
                            </button>
                          )}
                          <button
                            onClick={() => handleDeleteStudent(student.studentId)}
                            className="p-2 text-red-500 hover:bg-red-50 rounded-xl transition-colors"
                            title="Delete"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="px-5 py-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3">
                <p className="text-sm text-slate-500">
                  Showing {indexOfFirstStudent + 1} to{' '}
                  {Math.min(indexOfLastStudent, filteredStudents.length)} of{' '}
                  {filteredStudents.length} students
                </p>
                <div className="flex gap-1.5">
                  <button
                    onClick={() => paginate(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="px-3 py-1.5 text-sm font-medium border border-slate-200 rounded-xl hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                  >
                    Previous
                  </button>
                  {[...Array(totalPages)].map((_, index) => (
                    <button
                      key={index + 1}
                      onClick={() => paginate(index + 1)}
                      className={`px-3 py-1.5 text-sm font-medium rounded-xl transition-colors ${
                        currentPage === index + 1
                          ? 'bg-forest-600 text-white'
                          : 'border border-slate-200 hover:bg-slate-50'
                      }`}
                    >
                      {index + 1}
                    </button>
                  ))}
                  <button
                    onClick={() => paginate(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="px-3 py-1.5 text-sm font-medium border border-slate-200 rounded-xl hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                  >
                    Next
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </div>

      {/* Modals */}
      {showAddModal && (
        <AddStudentModal
          onClose={() => {
            setShowAddModal(false);
            loadData();
          }}
          batches={batches}
          createdBy={user?.userId || 'admin'}
        />
      )}

      {showEditModal && selectedStudent && (
        <EditStudentModal
          student={selectedStudent}
          batches={batches}
          onClose={() => {
            setShowEditModal(false);
            setSelectedStudent(null);
            loadData();
          }}
        />
      )}
    </AppLayout>
  );
}
