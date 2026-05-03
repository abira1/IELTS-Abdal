import { useState, useEffect, useMemo } from 'react';
import {
  Plus,
  DollarSign,
  TrendingUp,
  Download,
  Trash2,
  CheckCircle,
  Clock,
  AlertCircle,
  X,
  CreditCard,
  Wallet
} from 'lucide-react';
import { expenseService, Expense, ExpenseCategory } from '../../services/expenseService';
import { staffService } from '../../services/staffService';
import { studentService, Student } from '../../services/studentService';
import { useAuth } from '../../contexts/AuthContext';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { format } from 'date-fns';

const EXPENSE_CATEGORIES: ExpenseCategory[] = [
  'Office Rent',
  'Electricity Bill',
  'Staff Salaries',
  'Internet Bill',
  'Teaching Supplies',
  'Marketing Cost',
  'Other'
];

interface AddExpenseModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (expense: Omit<Expense, 'id' | 'createdAt' | 'updatedAt'>) => void;
  staffNames: string[];
  staffRoles: string[];
  onStaffDataChange: () => void;
}

function AddExpenseModal({ isOpen, onClose, onAdd, staffNames, staffRoles, onStaffDataChange }: AddExpenseModalProps) {
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    category: '' as ExpenseCategory | '',
    customCategory: '',
    staffName: '',
    role: '',
    amount: '',
    date: format(new Date(), 'yyyy-MM-dd'),
    status: 'Pending' as 'Paid' | 'Pending',
    type: 'One-Time Payment' as 'One-Time Payment' | 'Recurring',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.category || !formData.amount || !user?.email) return;

    try {
      const expense: any = {
        category: formData.category,
        amount: parseFloat(formData.amount),
        date: formData.date,
        status: formData.status,
        type: formData.type,
        createdBy: user.email,
      };

      // Only include customCategory if category is 'Other' and it's not empty
      if (formData.category === 'Other' && formData.customCategory.trim()) {
        expense.customCategory = formData.customCategory.trim();
      }

      // Only include staff data if category is 'Staff Salaries'
      if (formData.category === 'Staff Salaries') {
        if (formData.staffName.trim() && formData.role.trim()) {
          expense.staffName = formData.staffName.trim();
          expense.role = formData.role.trim();

          // Save new staff member to database
          await staffService.addStaff(formData.staffName.trim(), formData.role.trim());
        }
      }

      onAdd(expense);
      onClose();
      setFormData({
        category: '',
        customCategory: '',
        staffName: '',
        role: '',
        amount: '',
        date: format(new Date(), 'yyyy-MM-dd'),
        status: 'Pending',
        type: 'One-Time Payment',
      });
    } catch (error) {
      console.error('Error submitting expense:', error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl p-8 w-full max-w-md shadow-xl border-2 border-[#0F3D2E]/20">
        <h2 className="text-2xl font-bold text-[#1F2A44] mb-6 uppercase tracking-wider">📝 Add New Expense</h2>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-bold text-[#1F2A44] mb-2 uppercase tracking-wider">
              Category <span className="text-red-500">*</span>
            </label>
            <select
              value={formData.category}
              onChange={(e) => setFormData(prev => ({
                ...prev,
                category: e.target.value as ExpenseCategory
              }))}
              className="w-full px-4 py-3 border-2 border-[#0F3D2E]/30 rounded-xl focus:ring-2 focus:ring-[#0F3D2E] focus:border-[#0F3D2E] bg-white text-[#1F2A44] font-medium"
              required
            >
              <option value="">Select Category</option>
              {EXPENSE_CATEGORIES.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>

          {formData.category === 'Other' && (
            <div>
              <label className="block text-sm font-bold text-[#1F2A44] mb-2 uppercase tracking-wider">
                Custom Category <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={formData.customCategory}
                onChange={(e) => setFormData(prev => ({
                  ...prev,
                  customCategory: e.target.value
                }))}
                className="w-full px-4 py-3 border-2 border-[#0F3D2E]/30 rounded-xl focus:ring-2 focus:ring-[#0F3D2E] focus:border-[#0F3D2E] bg-white text-[#1F2A44] font-medium"
                placeholder="Enter custom category"
                required
              />
            </div>
          )}

          {formData.category === 'Staff Salaries' && (
            <>
              <div>
                <label className="block text-sm font-bold text-[#1F2A44] mb-2 uppercase tracking-wider">
                  Staff Name <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={formData.staffName}
                    onChange={(e) => setFormData(prev => ({
                      ...prev,
                      staffName: e.target.value
                    }))}
                    list="staff-names"
                    className="w-full px-4 py-3 border-2 border-[#0F3D2E]/30 rounded-xl focus:ring-2 focus:ring-[#0F3D2E] focus:border-[#0F3D2E] bg-white text-[#1F2A44] font-medium pr-10"
                    placeholder="Enter or select staff name"
                    required
                  />
                  <datalist id="staff-names">
                    {staffNames.map(name => (
                      <option key={name} value={name} />
                    ))}
                  </datalist>
                  {formData.staffName && staffNames.includes(formData.staffName) && (
                    <button
                      type="button"
                      onClick={async () => {
                        if (confirm(`Delete "${formData.staffName}" from staff list?`)) {
                          try {
                            await staffService.deleteStaffByName(formData.staffName);
                            setFormData(prev => ({ ...prev, staffName: '' }));
                            await onStaffDataChange();
                          } catch (error) {
                            console.error('Error deleting staff name:', error);
                          }
                        }
                      }}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-red-600 hover:text-red-800 transition-colors"
                      title="Delete this staff name"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-[#1F2A44] mb-2 uppercase tracking-wider">
                  Role <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={formData.role}
                    onChange={(e) => setFormData(prev => ({
                      ...prev,
                      role: e.target.value
                    }))}
                    list="staff-roles"
                    className="w-full px-4 py-3 border-2 border-[#0F3D2E]/30 rounded-xl focus:ring-2 focus:ring-[#0F3D2E] focus:border-[#0F3D2E] bg-white text-[#1F2A44] font-medium pr-10"
                    placeholder="Enter or select role"
                    required
                  />
                  <datalist id="staff-roles">
                    {staffRoles.map(role => (
                      <option key={role} value={role} />
                    ))}
                  </datalist>
                  {formData.role && staffRoles.includes(formData.role) && (
                    <button
                      type="button"
                      onClick={async () => {
                        if (confirm(`Delete "${formData.role}" from roles list?`)) {
                          try {
                            await staffService.deleteStaffByRole(formData.role);
                            setFormData(prev => ({ ...prev, role: '' }));
                            await onStaffDataChange();
                          } catch (error) {
                            console.error('Error deleting role:', error);
                          }
                        }
                      }}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-red-600 hover:text-red-800 transition-colors"
                      title="Delete this role"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>
            </>
          )}

          <div>
            <label className="block text-sm font-bold text-[#1F2A44] mb-2 uppercase tracking-wider">
              Amount <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              value={formData.amount}
              onChange={(e) => setFormData(prev => ({
                ...prev,
                amount: e.target.value
              }))}
              className="w-full px-4 py-3 border-2 border-[#0F3D2E]/30 rounded-xl focus:ring-2 focus:ring-[#0F3D2E] focus:border-[#0F3D2E] bg-white text-[#1F2A44] font-medium"
              placeholder="0.00"
              step="0.01"
              min="0"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-[#1F2A44] mb-2 uppercase tracking-wider">
              Date <span className="text-red-500">*</span>
            </label>
            <input
              type="date"
              value={formData.date}
              onChange={(e) => setFormData(prev => ({
                ...prev,
                date: e.target.value
              }))}
              className="w-full px-4 py-3 border-2 border-[#0F3D2E]/30 rounded-xl focus:ring-2 focus:ring-[#0F3D2E] focus:border-[#0F3D2E] bg-white text-[#1F2A44] font-medium"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-[#1F2A44] mb-2 uppercase tracking-wider">
              Status <span className="text-red-500">*</span>
            </label>
            <select
              value={formData.status}
              onChange={(e) => setFormData(prev => ({
                ...prev,
                status: e.target.value as 'Paid' | 'Pending'
              }))}
              className="w-full px-4 py-3 border-2 border-[#0F3D2E]/30 rounded-xl focus:ring-2 focus:ring-[#0F3D2E] focus:border-[#0F3D2E] bg-white text-[#1F2A44] font-medium"
            >
              <option value="Pending">Pending</option>
              <option value="Paid">Paid</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-bold text-[#1F2A44] mb-2 uppercase tracking-wider">
              Type <span className="text-red-500">*</span>
            </label>
            <select
              value={formData.type}
              onChange={(e) => setFormData(prev => ({
                ...prev,
                type: e.target.value as 'One-Time Payment' | 'Recurring'
              }))}
              className="w-full px-4 py-3 border-2 border-[#0F3D2E]/30 rounded-xl focus:ring-2 focus:ring-[#0F3D2E] focus:border-[#0F3D2E] bg-white text-[#1F2A44] font-medium"
            >
              <option value="One-Time Payment">One-Time Payment</option>
              <option value="Recurring">Recurring</option>
            </select>
          </div>

          <div className="flex gap-3 pt-6 border-t-2 border-[#0F3D2E]/10">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-3 border-2 border-[#0F3D2E]/30 rounded-xl text-[#1F2A44] font-bold hover:bg-[#F5F3EF] transition-colors uppercase tracking-wider"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-3 bg-[#0F3D2E] text-white rounded-xl font-bold hover:bg-[#0F3D2E]/90 transition-colors uppercase tracking-wider"
            >
              Add Expense
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export function ExpenseManager() {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [filteredExpenses, setFilteredExpenses] = useState<Expense[]>([]);
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedMonth, setSelectedMonth] = useState(format(new Date(), 'yyyy-MM'));
  const [searchTerm, setSearchTerm] = useState('');
  const [staffNames, setStaffNames] = useState<string[]>([]);
  const [staffRoles, setStaffRoles] = useState<string[]>([]);

  useEffect(() => {
    loadExpenses();
    loadStaffData();
    loadStudentData();
  }, []);

  const loadStudentData = async () => {
    try {
      const data = await studentService.getAllStudents();
      setStudents(data);
    } catch (error) {
      console.error('Error loading students:', error);
    }
  };

  const studentTotals = useMemo(() => {
    return students.reduce((acc, student) => ({
      paid: acc.paid + (student.paid || 0),
      due: acc.due + (student.due || 0),
      total: acc.total + (student.totalFee || 0)
    }), { paid: 0, due: 0, total: 0 });
  }, [students]);

  useEffect(() => {
    filterExpenses();
  }, [expenses, selectedMonth, searchTerm]);

  const loadExpenses = async () => {
    try {
      setLoading(true);
      const data = await expenseService.getAllExpenses();
      setExpenses(data);
    } catch (error) {
      console.error('Error loading expenses:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadStaffData = async () => {
    try {
      const [names, roles] = await Promise.all([
        staffService.getStaffNames(),
        staffService.getStaffRoles()
      ]);
      setStaffNames(names);
      setStaffRoles(roles);
    } catch (error) {
      console.error('Error loading staff data:', error);
    }
  };

  const filterExpenses = () => {
    let filtered = expenses;

    // Filter by month
    if (selectedMonth) {
      const [year, month] = selectedMonth.split('-').map(Number);
      filtered = filtered.filter(expense => {
        const expenseDate = new Date(expense.date || '');
        return expenseDate.getFullYear() === year && expenseDate.getMonth() === month - 1;
      });
    }

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(expense =>
        expense.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (expense.customCategory && expense.customCategory.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    setFilteredExpenses(filtered);
  };

  const handleAddExpense = async (expenseData: Omit<Expense, 'id' | 'createdAt' | 'updatedAt'>) => {
    try {
      await expenseService.addExpense(expenseData);
      await loadExpenses();
      await loadStaffData(); // Reload staff data to include any new staff members
    } catch (error) {
      console.error('Error adding expense:', error);
    }
  };

  const handleUpdateStatus = async (expenseId: string, status: 'Paid' | 'Pending') => {
    try {
      await expenseService.updateExpense(expenseId, { status });
      await loadExpenses();
    } catch (error) {
      console.error('Error updating expense status:', error);
    }
  };

  const handleDeleteExpense = async (expenseId: string) => {
    if (!confirm('Are you sure you want to delete this expense?')) return;

    try {
      await expenseService.deleteExpense(expenseId);
      await loadExpenses();
    } catch (error) {
      console.error('Error deleting expense:', error);
    }
  };

  const generatePDF = () => {
    const doc = new jsPDF();

    // Title
    doc.setFontSize(20);
    doc.text('Expense Report', 20, 20);

    // Date range
    doc.setFontSize(12);
    doc.text(`Period: ${selectedMonth}`, 20, 35);

    // Summary
    const totals = expenseService.calculateMonthlyTotals(filteredExpenses);
    doc.text(`Total Expenses: $${totals.total.toFixed(2)}`, 20, 50);
    doc.text(`Recurring: $${totals.recurring.toFixed(2)}`, 20, 60);
    doc.text(`One-Time: $${totals.oneTime.toFixed(2)}`, 20, 70);
    doc.text(`Paid: $${totals.paid.toFixed(2)}`, 20, 80);
    doc.text(`Pending: $${totals.pending.toFixed(2)}`, 20, 90);

    // Table
    const tableData = filteredExpenses.map(expense => [
      format(new Date(expense.date || ''), 'MMM dd, yyyy'),
      expense.category === 'Other' && expense.customCategory
        ? expense.customCategory
        : expense.category,
      expense.category === 'Staff Salaries' && expense.staffName && expense.role
        ? `${expense.staffName} (${expense.role})`
        : '-',
      `$${expense.amount.toFixed(2)}`,
      expense.status,
      expense.type
    ]);

    (doc as any).autoTable({
      head: [['Date', 'Category', 'Staff Info', 'Amount', 'Status', 'Type']],
      body: tableData,
      startY: 105,
    });

    doc.save(`expense-report-${selectedMonth}.pdf`);
  };

  const totals = expenseService.calculateMonthlyTotals(filteredExpenses);
  const categoryBreakdown = expenseService.getCategoryBreakdown(filteredExpenses);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-[#1F2A44] uppercase tracking-wider">💰 Expense Manager</h1>
          <p className="text-slate-600 font-medium mt-2">Track and manage organizational expenses</p>
        </div>
        <button
          onClick={() => setIsAddModalOpen(true)}
          className="flex items-center gap-2 px-5 py-3 bg-[#0F3D2E] text-white rounded-xl hover:bg-[#0F3D2E]/90 transition-all font-bold uppercase tracking-wider hover:scale-105 active:scale-95"
        >
          <Plus className="w-5 h-5" />
          Add Expense
        </button>
      </div>

      {/* Financial Overview Cards */}
      <div>
        <h2 className="text-lg font-bold text-[#1F2A44] mb-4 uppercase tracking-wider">👥 Student Finances (All Time)</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          <div className="bg-white p-6 rounded-2xl shadow-lg border-2 border-emerald-100 hover:shadow-xl transition-all">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-emerald-100 rounded-xl">
                <Wallet className="w-6 h-6 text-emerald-600" />
              </div>
              <div>
                <p className="text-sm text-slate-600 font-medium uppercase tracking-wider">Total Payments Received</p>
                <p className="text-2xl font-bold text-emerald-700 mt-1">${studentTotals.paid.toFixed(2)}</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-lg border-2 border-rose-100 hover:shadow-xl transition-all">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-rose-100 rounded-xl">
                <AlertCircle className="w-6 h-6 text-rose-600" />
              </div>
              <div>
                <p className="text-sm text-slate-600 font-medium uppercase tracking-wider">Total Due</p>
                <p className="text-2xl font-bold text-rose-700 mt-1">${studentTotals.due.toFixed(2)}</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-lg border-2 border-blue-100 hover:shadow-xl transition-all">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-blue-100 rounded-xl">
                <CreditCard className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-slate-600 font-medium uppercase tracking-wider">Total Course Fees</p>
                <p className="text-2xl font-bold text-blue-700 mt-1">${studentTotals.total.toFixed(2)}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <h2 className="text-lg font-bold text-[#1F2A44] mt-8 uppercase tracking-wider">📊 Expense Summary {selectedMonth ? `(${selectedMonth})` : '(All Time)'}</h2>
      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="bg-white p-6 rounded-2xl shadow-lg border-2 border-[#0F3D2E]/20 hover:shadow-xl transition-all">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-[#0F3D2E]/10 rounded-xl">
              <DollarSign className="w-6 h-6 text-[#0F3D2E]" />
            </div>
            <div>
              <p className="text-xs text-slate-600 font-bold uppercase tracking-wider">Monthly Total</p>
              <p className="text-2xl font-bold text-[#1F2A44] mt-1">${totals.total.toFixed(2)}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-lg border-2 border-green-100 hover:shadow-xl transition-all">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-green-100 rounded-xl">
              <TrendingUp className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <p className="text-xs text-slate-600 font-bold uppercase tracking-wider">Recurring</p>
              <p className="text-2xl font-bold text-[#1F2A44] mt-1">${totals.recurring.toFixed(2)}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-lg border-2 border-emerald-100 hover:shadow-xl transition-all">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-emerald-100 rounded-xl">
              <CheckCircle className="w-6 h-6 text-emerald-600" />
            </div>
            <div>
              <p className="text-xs text-slate-600 font-bold uppercase tracking-wider">Paid</p>
              <p className="text-2xl font-bold text-[#1F2A44] mt-1">${totals.paid.toFixed(2)}</p>
              <p className="text-xs text-slate-500 mt-1">{totals.paidCount} expenses</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-lg border-2 border-orange-100 hover:shadow-xl transition-all">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-orange-100 rounded-xl">
              <Clock className="w-6 h-6 text-orange-600" />
            </div>
            <div>
              <p className="text-xs text-slate-600 font-bold uppercase tracking-wider">Pending</p>
              <p className="text-2xl font-bold text-[#1F2A44] mt-1">${totals.pending.toFixed(2)}</p>
              <p className="text-xs text-slate-500 mt-1">{totals.pendingCount} expenses</p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters and Actions */}
      <div className="bg-white p-6 rounded-2xl shadow-lg border-2 border-[#0F3D2E]/20">
        <div className="flex flex-col sm:flex-row gap-5 items-end justify-between">
          <div className="flex flex-col sm:flex-row gap-5 items-end w-full sm:w-auto">
            <div>
              <label className="block text-sm font-bold text-[#1F2A44] mb-2 uppercase tracking-wider">Month</label>
              <input
                type="month"
                value={selectedMonth}
                onChange={(e) => setSelectedMonth(e.target.value)}
                className="px-4 py-3 border-2 border-[#0F3D2E]/30 rounded-xl focus:ring-2 focus:ring-[#0F3D2E] focus:border-[#0F3D2E] bg-white text-[#1F2A44] font-medium"
              />
            </div>
            <div className="w-full sm:w-auto">
              <label className="block text-sm font-bold text-[#1F2A44] mb-2 uppercase tracking-wider">Search</label>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search categories..."
                className="w-full px-4 py-3 border-2 border-[#0F3D2E]/30 rounded-xl focus:ring-2 focus:ring-[#0F3D2E] focus:border-[#0F3D2E] bg-white text-[#1F2A44] font-medium"
              />
            </div>
          </div>
          <button
            onClick={generatePDF}
            className="flex items-center gap-2 px-5 py-3 bg-emerald-600 text-white rounded-xl hover:bg-emerald-700 transition-all font-bold uppercase tracking-wider hover:scale-105 active:scale-95 w-full sm:w-auto justify-center"
          >
            <Download className="w-5 h-5" />
            Export PDF
          </button>
        </div>
      </div>

      {/* Category Breakdown */}
      {Object.keys(categoryBreakdown).length > 0 && (
        <div className="bg-white p-8 rounded-2xl shadow-lg border-2 border-[#0F3D2E]/20">
          <h3 className="text-xl font-bold text-[#1F2A44] mb-6 uppercase tracking-wider">📂 Category Breakdown</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {Object.entries(categoryBreakdown).map(([category, amount]) => (
              <div key={category} className="flex justify-between items-center p-4 bg-[#F5F3EF] rounded-xl border-2 border-[#0F3D2E]/20 hover:shadow-md transition-all">
                <span className="font-bold text-[#1F2A44]">{category}</span>
                <span className="text-lg font-bold text-[#0F3D2E]">${amount.toFixed(2)}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Expenses Table */}
      <div className="bg-white rounded-2xl shadow-lg border-2 border-[#0F3D2E]/20 overflow-hidden">
        <div className="px-8 py-5 border-b-2 border-[#0F3D2E]/20 bg-[#F5F3EF]">
          <h3 className="text-xl font-bold text-[#1F2A44] uppercase tracking-wider">📋 Expenses ({filteredExpenses.length})</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-[#F5F3EF] border-b-2 border-[#0F3D2E]/20">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-bold text-[#1F2A44] uppercase tracking-wider">Date</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-[#1F2A44] uppercase tracking-wider">Category</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-[#1F2A44] uppercase tracking-wider">Staff Info</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-[#1F2A44] uppercase tracking-wider">Amount</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-[#1F2A44] uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-[#1F2A44] uppercase tracking-wider">Type</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-[#1F2A44] uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-[#0F3D2E]/10">
              {filteredExpenses.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-6 py-12 text-center text-slate-600 font-medium">
                    No expenses found for the selected period
                  </td>
                </tr>
              ) : (
                filteredExpenses.map((expense) => (
                  <tr key={expense.id} className="hover:bg-[#F5F3EF] transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-700 font-medium">
                      {format(new Date(expense.date || ''), 'MMM dd, yyyy')}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-[#1F2A44]">
                      {expense.category === 'Other' && expense.customCategory
                        ? expense.customCategory
                        : expense.category}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-700 font-medium">
                      {expense.category === 'Staff Salaries' && expense.staffName && expense.role
                        ? `${expense.staffName} (${expense.role})`
                        : '-'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-[#0F3D2E]">
                      ${expense.amount.toFixed(2)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-3 py-1 text-xs font-bold rounded-full uppercase tracking-wider ${
                        expense.status === 'Paid'
                          ? 'bg-emerald-100 text-emerald-700'
                          : 'bg-orange-100 text-orange-700'
                      }`}>
                        {expense.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-700">
                      {expense.type}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleUpdateStatus(
                            expense.id,
                            expense.status === 'Paid' ? 'Pending' : 'Paid'
                          )}
                          className={`p-2 rounded-lg transition-all font-bold ${
                            expense.status === 'Paid'
                              ? 'text-orange-600 hover:bg-orange-50'
                              : 'text-emerald-600 hover:bg-emerald-50'
                          }`}
                          title={`Mark as ${expense.status === 'Paid' ? 'Pending' : 'Paid'}`}
                        >
                          {expense.status === 'Paid' ? <Clock className="w-4 h-4" /> : <CheckCircle className="w-4 h-4" />}
                        </button>
                        <button
                          onClick={() => handleDeleteExpense(expense.id)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-all font-bold"
                          title="Delete expense"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Expense Modal */}
      <AddExpenseModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAdd={handleAddExpense}
        staffNames={staffNames}
        staffRoles={staffRoles}
        onStaffDataChange={loadStaffData}
      />
    </div>
  );
}