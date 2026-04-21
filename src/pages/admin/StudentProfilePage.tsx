import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { studentService, Student } from '../../services/studentService';
import { storage, ExamSubmission } from '../../utils/storage';
import {
  Mail,
  Phone,
  Calendar,
  Shield,
  Edit2,
  Key,
  UserX,
  Trash2,
  Copy,
  Check,
  BarChart3,
  Mail as MailIcon
} from 'lucide-react';
import { generateStudentCredentialEmail } from '../../utils/emailTemplate';
import { AppLayout } from '../../components/layout/AppLayout';

export function StudentProfilePage() {
  const { studentId } = useParams<{ studentId: string }>();
  const navigate = useNavigate();
  const [student, setStudent] = useState<Student | null>(null);
  const [submissions, setSubmissions] = useState<ExamSubmission[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [newPassword, setNewPassword] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);

  useEffect(() => {
    if (studentId) {
      loadStudentData();
    }
  }, [studentId]);

  const loadStudentData = async () => {
    if (!studentId) return;

    setIsLoading(true);
    try {
      const studentData = await studentService.getStudentById(studentId);
      if (studentData) {
        setStudent(studentData);
        const allSubmissions = await storage.getSubmissions();
        const studentSubmissions = allSubmissions.filter(
          s => s.studentId === studentId
        );
        setSubmissions(studentSubmissions);
      } else {
        alert('Student not found');
        navigate('/admin/students');
      }
    } catch (error) {
      console.error('Error loading student:', error);
      alert('Failed to load student data');
    } finally {
      setIsLoading(false);
    }
  };

  const handleResetPassword = async () => {
    if (!studentId) return;
    if (!confirm('Are you sure you want to reset the password for this student?'))
      return;

    const result = await studentService.resetPassword(studentId);

    if (result.success && result.password) {
      setNewPassword(result.password);
      alert('Password reset successfully!');
    } else {
      alert(result.error || 'Failed to reset password');
    }
  };

  const handleDeactivate = async () => {
    if (!studentId) return;
    if (!confirm('Are you sure you want to deactivate this student?')) return;

    const success = await studentService.updateStudent(studentId, {
      status: 'inactive'
    });

    if (success) {
      alert('Student deactivated successfully');
      loadStudentData();
    } else {
      alert('Failed to deactivate student');
    }
  };

  const handleActivate = async () => {
    if (!studentId) return;

    const success = await studentService.updateStudent(studentId, {
      status: 'active'
    });

    if (success) {
      alert('Student activated successfully');
      loadStudentData();
    } else {
      alert('Failed to activate student');
    }
  };

  const handleDelete = async () => {
    if (!studentId) return;
    if (
      !confirm(
        'Are you sure you want to delete this student? This action cannot be undone.'
      )
    )
      return;

    const success = await studentService.deleteStudent(studentId);

    if (success) {
      alert('Student deleted successfully');
      navigate('/admin/students');
    } else {
      alert('Failed to delete student');
    }
  };

  const handleCopyPassword = () => {
    if (newPassword) {
      navigator.clipboard.writeText(newPassword);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleCopyHTMLEmail = () => {
    if (newPassword && student) {
      const htmlEmail = generateStudentCredentialEmail({
        name: student.name,
        studentId: student.studentId,
        batch: student.batch,
        password: newPassword
      });
      navigator.clipboard.writeText(htmlEmail);
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2000);
    }
  };

  const calculateAverageScore = (): number => {
    if (submissions.length === 0) return 0;
    const total = submissions.reduce((acc, s) => acc + (s.score || 0), 0);
    return Math.round(total / submissions.length);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  if (isLoading) {
    return (
      <AppLayout role="admin" title="Student Profile" subtitle="Loading...">
        <div className="flex items-center justify-center py-20">
          <div className="text-center">
            <div className="w-10 h-10 border-2 border-forest-200 border-t-forest-600 rounded-full animate-spin mx-auto mb-4" />
            <p className="text-slate-500 font-medium">Loading student profile...</p>
          </div>
        </div>
      </AppLayout>
    );
  }

  if (!student) {
    return (
      <AppLayout role="admin" title="Student Profile" subtitle="Not found">
        <div className="flex items-center justify-center py-20">
          <div className="text-center">
            <p className="text-slate-500 font-medium mb-4">Student not found</p>
            <button
              onClick={() => navigate('/admin/students')}
              className="btn-forest"
            >
              Back to Students
            </button>
          </div>
        </div>
      </AppLayout>
    );
  }

  return (
    <AppLayout role="admin" title="Student Profile" subtitle={student.name}>
      {/* Profile Header Card */}
      <div className="zen-card mb-6 animate-fadeInUp">
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-zen bg-gradient-to-br from-forest-500 to-emerald-600 flex items-center justify-center text-white text-2xl font-bold shadow-lg flex-shrink-0">
              {student.name?.charAt(0)?.toUpperCase()}
            </div>
            <div>
              <h2 className="text-xl font-bold text-midnight-800">{student.name}</h2>
              <p className="text-sm font-mono text-slate-500">{student.studentId}</p>
              <div className="mt-1.5">
                {student.status === 'active' ? (
                  <span className="pill-emerald">Active</span>
                ) : (
                  <span className="pill-orange">Inactive</span>
                )}
              </div>
            </div>
          </div>
          <button
            onClick={() => navigate(`/admin/students`)}
            className="btn-ghost text-sm self-start"
          >
            <Edit2 className="w-4 h-4" />
            Edit Profile
          </button>
        </div>

        {/* Info Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div className="space-y-4">
            <div>
              <p className="text-xs font-medium text-slate-500 uppercase tracking-wider mb-1">Email</p>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-slate-400" />
                <span className="text-sm font-medium text-midnight-800">{student.email}</span>
              </div>
            </div>
            <div>
              <p className="text-xs font-medium text-slate-500 uppercase tracking-wider mb-1">Mobile</p>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-slate-400" />
                <span className="text-sm font-medium text-midnight-800">{student.mobile}</span>
              </div>
            </div>
          </div>
          <div className="space-y-4">
            <div>
              <p className="text-xs font-medium text-slate-500 uppercase tracking-wider mb-1">Batch</p>
              <span className="text-sm font-medium text-midnight-800">{student.batch}</span>
            </div>
            <div>
              <p className="text-xs font-medium text-slate-500 uppercase tracking-wider mb-1">Enrolled</p>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-slate-400" />
                <span className="text-sm font-medium text-midnight-800">{formatDate(student.enrollmentDate)}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Password Section */}
        <div className="mt-5 pt-5 border-t border-slate-100">
          <div className="flex items-center gap-2 mb-2">
            <Key className="w-4 h-4 text-slate-400" />
            <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">Password</p>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-midnight-800 font-mono">••••••••</span>
            {newPassword && (
              <div className="flex items-center gap-2 ml-3">
                <span className="text-sm font-mono font-bold text-forest-600 bg-forest-50 px-3 py-1 rounded-xl">
                  {newPassword}
                </span>
                <button
                  onClick={handleCopyPassword}
                  className="p-1.5 hover:bg-slate-50 rounded-xl transition-colors"
                  title="Copy password"
                >
                  {copied ? (
                    <Check className="w-4 h-4 text-forest-600" />
                  ) : (
                    <Copy className="w-4 h-4 text-slate-500" />
                  )}
                </button>
                <button
                  onClick={handleCopyHTMLEmail}
                  className="p-1.5 hover:bg-slate-50 rounded-xl transition-colors"
                  title="Copy HTML Email"
                >
                  {copiedEmail ? (
                    <Check className="w-4 h-4 text-forest-600" />
                  ) : (
                    <MailIcon className="w-4 h-4 text-blue-600" />
                  )}
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Password Reset Success */}
        {newPassword && (
          <div className="mt-5 p-4 bg-emerald-50 border border-emerald-100 rounded-2xl animate-fadeIn">
            <h3 className="font-bold text-emerald-800 text-sm mb-2">Password Reset Successful!</h3>
            <p className="text-xs text-emerald-700 mb-3">
              Share these credentials with the student:
            </p>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={handleCopyPassword}
                className="flex items-center gap-2 px-4 py-2 bg-forest-600 text-white text-sm font-semibold rounded-2xl hover:bg-forest-500 transition-colors"
              >
                {copied ? <><Check className="w-4 h-4" /> Copied!</> : <><Copy className="w-4 h-4" /> Copy Password</>}
              </button>
              <button
                onClick={handleCopyHTMLEmail}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white text-sm font-semibold rounded-2xl hover:bg-blue-500 transition-colors"
                data-testid="copy-html-email-profile-btn"
              >
                {copiedEmail ? <><Check className="w-4 h-4" /> Copied!</> : <><MailIcon className="w-4 h-4" /> Copy HTML Email</>}
              </button>
              <button
                onClick={() => window.print()}
                className="flex items-center gap-2 px-4 py-2 bg-slate-100 text-midnight-800 text-sm font-semibold rounded-2xl hover:bg-slate-200 transition-colors"
              >
                Print
              </button>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-2 mt-6 pt-5 border-t border-slate-100">
          <button onClick={handleResetPassword} className="btn-ghost text-sm">
            <Key className="w-4 h-4" /> Reset Password
          </button>
          {student.status === 'active' ? (
            <button
              onClick={handleDeactivate}
              className="flex items-center gap-2 px-4 py-2.5 bg-orange-50 text-orange-700 text-sm font-semibold rounded-2xl hover:bg-orange-100 transition-colors"
            >
              <UserX className="w-4 h-4" /> Deactivate
            </button>
          ) : (
            <button
              onClick={handleActivate}
              className="flex items-center gap-2 px-4 py-2.5 bg-emerald-50 text-emerald-700 text-sm font-semibold rounded-2xl hover:bg-emerald-100 transition-colors"
            >
              <Shield className="w-4 h-4" /> Activate
            </button>
          )}
          <button
            onClick={handleDelete}
            className="flex items-center gap-2 px-4 py-2.5 bg-red-50 text-red-600 text-sm font-semibold rounded-2xl hover:bg-red-100 transition-colors"
          >
            <Trash2 className="w-4 h-4" /> Delete
          </button>
        </div>
      </div>

      {/* Performance Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <div className="zen-card !p-5 animate-fadeInUp stagger-1" style={{ animationFillMode: 'both' }}>
          <div className="flex items-center gap-3 mb-2">
            <div className="w-8 h-8 bg-blue-50 rounded-xl flex items-center justify-center">
              <BarChart3 className="w-4 h-4 text-blue-600" />
            </div>
            <p className="text-xs font-medium text-slate-500">Exams Taken</p>
          </div>
          <p className="text-2xl font-bold text-midnight-800">{submissions.length}</p>
        </div>

        <div className="zen-card !p-5 animate-fadeInUp stagger-2" style={{ animationFillMode: 'both' }}>
          <div className="flex items-center gap-3 mb-2">
            <div className="w-8 h-8 bg-emerald-50 rounded-xl flex items-center justify-center">
              <BarChart3 className="w-4 h-4 text-emerald-600" />
            </div>
            <p className="text-xs font-medium text-slate-500">Avg Score</p>
          </div>
          <p className="text-2xl font-bold text-emerald-600">{calculateAverageScore()}%</p>
        </div>

        <div className="zen-card !p-5 animate-fadeInUp stagger-3" style={{ animationFillMode: 'both' }}>
          <div className="flex items-center gap-3 mb-2">
            <div className="w-8 h-8 bg-purple-50 rounded-xl flex items-center justify-center">
              <BarChart3 className="w-4 h-4 text-purple-600" />
            </div>
            <p className="text-xs font-medium text-slate-500">Published</p>
          </div>
          <p className="text-2xl font-bold text-purple-600">{submissions.filter(s => s.resultPublished).length}</p>
        </div>
      </div>

      {/* Submission History */}
      <div className="zen-card !p-0 overflow-hidden">
        <div className="px-6 md:px-8 py-5 border-b border-slate-100">
          <h2 className="text-base font-bold text-midnight-800">Submission History</h2>
        </div>

        {submissions.length === 0 ? (
          <div className="p-12 text-center">
            <div className="w-14 h-14 bg-slate-50 rounded-zen flex items-center justify-center mx-auto mb-3">
              <BarChart3 className="w-7 h-7 text-slate-400" />
            </div>
            <p className="text-midnight-800 font-semibold mb-1">No submissions yet</p>
            <p className="text-sm text-slate-500">This student hasn't completed any exams</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="zen-table">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Track</th>
                  <th>Score</th>
                  <th className="hidden md:table-cell">Time Spent</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {submissions.map(submission => (
                  <tr key={submission.id}>
                    <td className="text-slate-600">{formatDate(submission.submittedAt)}</td>
                    <td className="font-semibold text-midnight-800">{submission.trackName || 'Unknown'}</td>
                    <td>
                      <span className="text-lg font-bold text-forest-600">{submission.score}%</span>
                    </td>
                    <td className="hidden md:table-cell text-slate-500">{submission.timeSpent}</td>
                    <td>
                      {submission.resultPublished ? (
                        <span className="pill-emerald">Published</span>
                      ) : (
                        <span className="pill-orange">Pending</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </AppLayout>
  );
}
