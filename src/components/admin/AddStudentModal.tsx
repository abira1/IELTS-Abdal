import React, { useState } from 'react';
import { studentService } from '../../services/studentService';
import { Batch } from '../../services/batchService';
import { X, Copy, Check, Mail, FileText, ArrowLeft } from 'lucide-react';
import { generateStudentCredentialEmail } from '../../utils/emailTemplate';
import { PrintableStudentRegistration } from '../PrintableStudentRegistration';

interface AddStudentModalProps {
  onClose: () => void;
  batches: Batch[];
  createdBy: string;
}

interface FormData {
  name: string;
  email: string;
  mobile: string;
  batchId: string;
  status: 'active' | 'inactive';
  totalFee: number;
  paid: number;
}

export function AddStudentModal({ onClose, batches, createdBy }: AddStudentModalProps) {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    mobile: '',
    batchId: '',
    status: 'active',
    totalFee: 0,
    paid: 0
  });
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState<{
    studentId: string;
    password: string;
    name: string;
    batch: string;
    email: string;
    mobile: string;
  } | null>(null);
  const [copied, setCopied] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [showPrintPreview, setShowPrintPreview] = useState(false);

  const validate = (): boolean => {
    const newErrors: Partial<Record<keyof FormData, string>> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }

    if (!formData.mobile.trim()) {
      newErrors.mobile = 'Mobile is required';
    } else if (!/^\+?[\d\s-()]+$/.test(formData.mobile)) {
      newErrors.mobile = 'Mobile number is invalid';
    }

    if (!formData.batchId) {
      newErrors.batchId = 'Batch is required';
    }

    if (formData.totalFee < 0) {
      newErrors.totalFee = 'Total Fee cannot be negative';
    }

    if (formData.paid < 0) {
      newErrors.paid = 'Paid amount cannot be negative';
    }

    if (formData.paid > formData.totalFee) {
      newErrors.paid = 'Paid amount cannot exceed Total Fee';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) return;

    setIsSubmitting(true);

    try {
      const selectedBatch = batches.find(b => b.batchId === formData.batchId);
      
      const result = await studentService.createStudent({
        name: formData.name,
        email: formData.email,
        mobile: formData.mobile,
        batch: selectedBatch?.batchName || '',
        batchId: formData.batchId,
        status: formData.status,
        createdBy,
        totalFee: formData.totalFee,
        paid: formData.paid
      });

      if (result.success && result.studentId && result.password) {
        setSuccess({
          studentId: result.studentId,
          password: result.password,
          name: formData.name,
          batch: selectedBatch?.batchName || '',
          email: formData.email,
          mobile: formData.mobile
        });
      } else {
        alert(result.error || 'Failed to create student');
      }
    } catch (error) {
      console.error('Error creating student:', error);
      alert('Failed to create student. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCopyCredentials = () => {
    if (success) {
      const text = `Student ID: ${success.studentId}\nPassword: ${success.password}`;
      navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleCopyHTMLEmail = () => {
    if (success) {
      const htmlEmail = generateStudentCredentialEmail({
        name: success.name,
        studentId: success.studentId,
        batch: success.batch,
        password: success.password
      });
      navigator.clipboard.writeText(htmlEmail);
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2000);
    }
  };

  const handlePrintDocument = () => {
    setShowPrintPreview(true);
  };

  // Success Modal - Full Screen
  if (success) {
    return (
      <div className="zen-overlay" onClick={onClose}>
        <div className="fixed inset-0 bg-white rounded-none flex flex-col items-center justify-center p-4 sm:p-6" onClick={e => e.stopPropagation()}>
          <div className="w-full max-w-md text-center">
            <div className="w-20 h-20 bg-emerald-50 rounded-zen flex items-center justify-center mx-auto mb-6">
              <Check className="w-10 h-10 text-emerald-600" />
            </div>
            <h3 className="text-2xl sm:text-3xl font-bold text-midnight-800 mb-2">
              Student Created!
            </h3>
            <p className="text-slate-500 text-sm sm:text-base mb-8">
              Save these credentials and provide them to the student.
            </p>

            <div className="bg-forest-50 border border-forest-100 rounded-2xl p-6 mb-6 text-left">
              <div className="mb-4">
                <p className="text-xs font-medium text-slate-500 uppercase tracking-wider mb-2">Student ID</p>
                <p className="text-xl sm:text-2xl font-mono font-bold text-midnight-800 break-all">{success.studentId}</p>
              </div>
              <div>
                <p className="text-xs font-medium text-slate-500 uppercase tracking-wider mb-2">Password</p>
                <p className="text-xl sm:text-2xl font-mono font-bold text-midnight-800 break-all">{success.password}</p>
              </div>
            </div>

            <div className="bg-orange-50 border border-orange-100 rounded-2xl p-4 mb-8">
              <p className="text-xs sm:text-sm text-orange-700 font-semibold">
                ⚠️ This password will not be shown again. Save it now.
              </p>
            </div>

            <div className="flex flex-col gap-2.5 w-full">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                <button
                  onClick={handleCopyCredentials}
                  className="flex items-center justify-center gap-2 px-4 py-3 bg-forest-600 text-white text-sm font-semibold rounded-2xl hover:bg-forest-500 transition-colors"
                  data-testid="copy-credentials-btn"
                >
                  {copied ? <><Check className="w-4 h-4" /> Copied!</> : <><Copy className="w-4 h-4" /> Copy</>}
                </button>
                <button
                  onClick={handlePrintDocument}
                  className="flex items-center justify-center gap-2 px-4 py-3 bg-midnight-800 text-white text-sm font-semibold rounded-2xl hover:bg-midnight-700 transition-colors"
                >
                  <FileText className="w-4 h-4" /> Print
                </button>
              </div>
              <button
                onClick={handleCopyHTMLEmail}
                className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-blue-600 text-white text-sm font-semibold rounded-2xl hover:bg-blue-500 transition-colors"
                data-testid="copy-html-email-btn"
              >
                {copiedEmail ? <><Check className="w-4 h-4" /> Copied!</> : <><Mail className="w-4 h-4" /> Copy HTML Email</>}
              </button>
            </div>

            <button
              onClick={onClose}
              className="w-full mt-6 btn-ghost text-base"
            >
              Close & Return to Dashboard
            </button>
          </div>
        </div>

        {/* Printable Registration Document Modal */}
        {showPrintPreview && (
          <PrintableStudentRegistration
            studentData={{
              name: success.name,
              studentId: success.studentId,
              batch: success.batch,
              email: success.email,
              mobile: success.mobile,
              password: success.password,
              totalFee: formData.totalFee,
              paid: formData.paid,
              due: formData.totalFee - formData.paid
            }}
            onClose={() => setShowPrintPreview(false)}
          />
        )}
      </div>
    );
  }

  // Form Modal
  return (
    <div className="zen-overlay" onClick={onClose}>
      <div className="fixed inset-0 bg-white rounded-none flex flex-col" onClick={e => e.stopPropagation()}>
        <div className="sticky top-0 bg-white border-b border-slate-100 px-4 md:px-8 py-4 flex items-center justify-between z-10 shadow-sm">
          <h3 className="text-xl md:text-2xl font-bold text-midnight-800">Add New Student</h3>
          <button
            onClick={onClose}
            className="inline-flex items-center gap-2 px-4 py-2 hover:bg-slate-100 rounded-lg transition-colors font-semibold text-slate-700"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="hidden sm:inline">Back to Dashboard</span>
            <span className="sm:hidden">Back</span>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto max-h-[calc(100vh-80px)]">
          <div className="p-4 md:p-8 max-w-4xl mx-auto w-full space-y-4">
            {/* Name */}
            <div>
              <label className="zen-label">
                Full Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={e => setFormData({ ...formData, name: e.target.value })}
                className={`zen-input ${errors.name ? '!border-red-400 !ring-red-200' : ''}`}
                placeholder="Enter student name"
                data-testid="student-name-input"
              />
              {errors.name && <p className="text-red-500 text-xs mt-1 ml-1 font-medium">{errors.name}</p>}
            </div>

            {/* Email */}
            <div>
              <label className="zen-label">
                Email <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={e => setFormData({ ...formData, email: e.target.value })}
                className={`zen-input ${errors.email ? '!border-red-400 !ring-red-200' : ''}`}
                placeholder="student@example.com"
                data-testid="student-email-input"
              />
              {errors.email && <p className="text-red-500 text-xs mt-1 ml-1 font-medium">{errors.email}</p>}
            </div>

            {/* Mobile */}
            <div>
              <label className="zen-label">
                Mobile Number <span className="text-red-500">*</span>
              </label>
              <input
                type="tel"
                value={formData.mobile}
                onChange={e => setFormData({ ...formData, mobile: e.target.value })}
                className={`zen-input ${errors.mobile ? '!border-red-400 !ring-red-200' : ''}`}
                placeholder="+1234567890"
                data-testid="student-mobile-input"
              />
              {errors.mobile && <p className="text-red-500 text-xs mt-1 ml-1 font-medium">{errors.mobile}</p>}
            </div>

            {/* Batch & Status - Responsive Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="zen-label">
                  Batch <span className="text-red-500">*</span>
                </label>
                <select
                  value={formData.batchId}
                  onChange={e => setFormData({ ...formData, batchId: e.target.value })}
                  className={`zen-select ${errors.batchId ? '!border-red-400 !ring-red-200' : ''}`}
                  data-testid="student-batch-select"
                >
                  <option value="">Select batch</option>
                  {batches
                    .filter(b => b.status === 'active' || b.status === 'upcoming')
                    .map(batch => (
                      <option key={batch.batchId} value={batch.batchId}>
                        {batch.batchName}
                      </option>
                    ))}
                </select>
                {errors.batchId && <p className="text-red-500 text-xs mt-1 ml-1 font-medium">{errors.batchId}</p>}
              </div>

              <div>
                <label className="zen-label">Status</label>
                <select
                  value={formData.status}
                  onChange={e =>
                    setFormData({
                      ...formData,
                      status: e.target.value as 'active' | 'inactive'
                    })
                  }
                  className="zen-select"
                >
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>
            </div>

            {/* Fee Section */}
            <div className="border-t border-slate-100 pt-5 mt-4">
              <p className="zen-label !text-base !mb-4">Fee Information</p>
              
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 lg:gap-4">
                <div>
                  <label className="zen-label !text-xs">Total Fee</label>
                  <input
                    type="number"
                    value={formData.totalFee}
                    onChange={e => setFormData({ ...formData, totalFee: parseFloat(e.target.value) || 0 })}
                    className={`zen-input ${errors.totalFee ? '!border-red-400' : ''}`}
                    placeholder="0"
                    min="0"
                    step="0.01"
                    data-testid="student-total-fee-input"
                  />
                </div>
                <div>
                  <label className="zen-label !text-xs">Paid</label>
                  <input
                    type="number"
                    value={formData.paid}
                    onChange={e => setFormData({ ...formData, paid: parseFloat(e.target.value) || 0 })}
                    className={`zen-input ${errors.paid ? '!border-red-400' : ''}`}
                    placeholder="0"
                    min="0"
                    step="0.01"
                    data-testid="student-paid-input"
                  />
                </div>
                <div>
                  <label className="zen-label !text-xs">Due</label>
                  <input
                    type="number"
                    value={(formData.totalFee - formData.paid).toFixed(2)}
                    readOnly
                    className="zen-input !bg-slate-100 cursor-not-allowed"
                    data-testid="student-due-input"
                  />
                </div>
              </div>
            </div>

            {/* Info */}
            <div className="bg-blue-50 border border-blue-100 rounded-2xl p-3.5">
              <p className="text-xs text-blue-700 font-medium">
                <strong>Note:</strong> Student ID and password will be auto-generated after submission.
              </p>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-3 mt-8 pt-6 border-t border-slate-100">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 btn-ghost text-base py-3"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex-1 btn-forest disabled:opacity-50 disabled:cursor-not-allowed text-base py-3"
                data-testid="submit-student-btn"
              >
                {isSubmitting ? 'Creating...' : 'Create Student'}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
