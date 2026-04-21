import React, { useState } from 'react';
import { studentService, Student } from '../../services/studentService';
import { Batch } from '../../services/batchService';
import { X } from 'lucide-react';

interface EditStudentModalProps {
  student: Student;
  batches: Batch[];
  onClose: () => void;
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

export function EditStudentModal({ student, batches, onClose }: EditStudentModalProps) {
  const [formData, setFormData] = useState<FormData>({
    name: student.name,
    email: student.email,
    mobile: student.mobile,
    batchId: student.batchId,
    status: student.status,
    totalFee: student.totalFee || 0,
    paid: student.paid || 0
  });
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

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

      const success = await studentService.updateStudent(student.studentId, {
        name: formData.name,
        email: formData.email,
        mobile: formData.mobile,
        batch: selectedBatch?.batchName || '',
        batchId: formData.batchId,
        status: formData.status,
        totalFee: formData.totalFee,
        paid: formData.paid,
        due: formData.totalFee - formData.paid
      });

      if (success) {
        alert('Student updated successfully');
        onClose();
      } else {
        alert('Failed to update student');
      }
    } catch (error) {
      console.error('Error updating student:', error);
      alert('Failed to update student. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="zen-overlay" onClick={onClose}>
      <div className="zen-modal !max-w-md" onClick={e => e.stopPropagation()}>
        <div className="sticky top-0 bg-white border-b border-slate-100 px-6 md:px-8 py-5 flex items-center justify-between rounded-t-zen">
          <h3 className="text-lg font-bold text-midnight-800">Edit Student</h3>
          <button
            onClick={onClose}
            className="p-2 hover:bg-slate-50 rounded-xl transition-colors"
          >
            <X className="w-5 h-5 text-slate-500" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 md:p-8">
          <div className="space-y-4">
            {/* Student ID (Read-only) */}
            <div>
              <label className="zen-label">Student ID</label>
              <input
                type="text"
                value={student.studentId}
                disabled
                className="zen-input !bg-slate-100 cursor-not-allowed !text-slate-500"
              />
              <p className="text-[10px] text-slate-400 mt-1 ml-1 font-medium">
                Student ID cannot be changed
              </p>
            </div>

            {/* Name */}
            <div>
              <label className="zen-label">
                Full Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={e => setFormData({ ...formData, name: e.target.value })}
                className={`zen-input ${errors.name ? '!border-red-400' : ''}`}
                placeholder="Enter student name"
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
                className={`zen-input ${errors.email ? '!border-red-400' : ''}`}
                placeholder="student@example.com"
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
                className={`zen-input ${errors.mobile ? '!border-red-400' : ''}`}
                placeholder="+1234567890"
              />
              {errors.mobile && <p className="text-red-500 text-xs mt-1 ml-1 font-medium">{errors.mobile}</p>}
            </div>

            {/* Batch & Status - 2 col */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="zen-label">
                  Batch <span className="text-red-500">*</span>
                </label>
                <select
                  value={formData.batchId}
                  onChange={e => setFormData({ ...formData, batchId: e.target.value })}
                  className={`zen-select ${errors.batchId ? '!border-red-400' : ''}`}
                >
                  <option value="">Select batch</option>
                  {batches.map(batch => (
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
            <div className="border-t border-slate-100 pt-4 mt-2">
              <p className="zen-label !text-base !mb-4">Fee Information</p>
              
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
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
                  />
                </div>
                <div>
                  <label className="zen-label !text-xs">Due</label>
                  <input
                    type="number"
                    value={(formData.totalFee - formData.paid).toFixed(2)}
                    readOnly
                    className="zen-input !bg-slate-100 cursor-not-allowed"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-3 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 btn-ghost"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 btn-forest disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Updating...' : 'Update Student'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
