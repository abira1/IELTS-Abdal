import { useState, useEffect } from 'react';
import {
  Users,
  Calendar,
  BookOpen,
  Plus,
  Edit,
  Trash2,
  Loader,
  CheckCircle,
  AlertCircle,
  Clock
} from 'lucide-react';
import { batchService } from '../../services/batchService';
import { allTracks } from '../../data/tracks';
import { AppLayout } from '../../components/layout/AppLayout';

interface Batch {
  batchId: string;
  batchName: string;
  startDate: string;
  endDate: string;
  schedule?: string;
  totalStudents: number;
  assignedTracks: string[];
  status: 'active' | 'completed' | 'upcoming';
  createdAt: string;
  createdBy: string;
}

export function BatchesPage() {
  const [batches, setBatches] = useState<Batch[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingBatch, setEditingBatch] = useState<Batch | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  // Form state
  const [batchName, setBatchName] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [schedule, setSchedule] = useState('');
  const [selectedTracks, setSelectedTracks] = useState<string[]>([]);
  const [status, setStatus] = useState<'active' | 'upcoming' | 'completed'>('active');

  useEffect(() => {
    loadBatches();
  }, []);

  const loadBatches = async () => {
    setIsLoading(true);
    try {
      const allBatches = await batchService.getAllBatches();
      setBatches(allBatches);
      
      await recalculateAllStudentCounts(allBatches);
    } catch (err) {
      console.error('Error loading batches:', err);
      setError('Failed to load batches');
    } finally {
      setIsLoading(false);
    }
  };

  const recalculateAllStudentCounts = async (batchList: Batch[]) => {
    try {
      const updatePromises = batchList.map(batch => 
        batchService.updateStudentCount(batch.batchId)
      );
      await Promise.all(updatePromises);
      
      const updatedBatches = await batchService.getAllBatches();
      setBatches(updatedBatches);
    } catch (err) {
      console.error('Error recalculating student counts:', err);
    }
  };

  const handleOpenModal = (batch?: Batch) => {
    if (batch) {
      setEditingBatch(batch);
      setBatchName(batch.batchName);
      setStartDate(batch.startDate);
      setEndDate(batch.endDate);
      setSchedule(batch.schedule || '');
      setSelectedTracks(batch.assignedTracks || []);
      setStatus(batch.status);
    } else {
      resetForm();
    }
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingBatch(null);
    resetForm();
  };

  const resetForm = () => {
    setBatchName('');
    setStartDate('');
    setEndDate('');
    setSchedule('');
    setSelectedTracks([]);
    setStatus('active');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!batchName.trim()) {
      setError('Batch name is required');
      return;
    }

    if (startDate && endDate && new Date(endDate) < new Date(startDate)) {
      setError('End date must be after start date');
      return;
    }

    try {
      if (editingBatch) {
        const success = await batchService.updateBatch(editingBatch.batchId, {
          batchName,
          startDate,
          endDate,
          schedule,
          assignedTracks: selectedTracks,
          status
        });

        if (success) {
          setSuccess('Batch updated successfully!');
          handleCloseModal();
          await loadBatches();
          setTimeout(() => setSuccess(null), 3000);
        } else {
          setError('Failed to update batch');
        }
      } else {
        const result = await batchService.createBatch({
          batchName,
          startDate,
          endDate,
          schedule,
          assignedTracks: selectedTracks,
          status,
          createdBy: 'admin'
        });

        if (result.success) {
          setSuccess(`Batch ${result.batchId} created successfully!`);
          handleCloseModal();
          await loadBatches();
          setTimeout(() => setSuccess(null), 3000);
        } else {
          setError(result.error || 'Failed to create batch');
        }
      }
    } catch (err) {
      console.error('Error saving batch:', err);
      setError('Failed to save batch');
    }
  };

  const handleDelete = async (batchId: string) => {
    if (!confirm('Are you sure you want to delete this batch? This action cannot be undone.')) {
      return;
    }

    try {
      const success = await batchService.deleteBatch(batchId);
      if (success) {
        setSuccess('Batch deleted successfully!');
        await loadBatches();
        setTimeout(() => setSuccess(null), 3000);
      } else {
        setError('Failed to delete batch');
      }
    } catch (err) {
      console.error('Error deleting batch:', err);
      setError('Failed to delete batch');
    }
  };

  const toggleTrackSelection = (trackId: string) => {
    setSelectedTracks(prev =>
      prev.includes(trackId)
        ? prev.filter(id => id !== trackId)
        : [...prev, trackId]
    );
  };

  const handleSelectAllTracks = () => {
    setSelectedTracks(allTracks.map(track => track.id));
  };

  const handleDeselectAllTracks = () => {
    setSelectedTracks([]);
  };

  const getStatusConfig = (status: string) => {
    switch (status) {
      case 'active':
        return { class: 'pill-emerald', dot: 'bg-emerald-500' };
      case 'upcoming':
        return { class: 'pill-orange', dot: 'bg-orange-500' };
      case 'completed':
        return { class: 'pill-slate', dot: 'bg-slate-500' };
      default:
        return { class: 'pill-slate', dot: 'bg-slate-500' };
    }
  };

  return (
    <AppLayout role="admin" title="Batch Management" subtitle={`${batches.length} batches`}>
      {/* Header Actions */}
      <div className="flex items-center justify-between mb-6">
        <div />
        <button
          onClick={() => handleOpenModal()}
          className="btn-forest text-sm !py-2.5"
          data-testid="create-batch-button"
        >
          <Plus className="w-4 h-4" />
          Create Batch
        </button>
      </div>

      {/* Messages */}
      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-100 rounded-2xl flex items-start gap-3 animate-fadeIn">
          <AlertCircle className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" />
          <p className="text-red-800 text-sm font-medium">{error}</p>
        </div>
      )}

      {success && (
        <div className="mb-6 p-4 bg-emerald-50 border border-emerald-100 rounded-2xl flex items-start gap-3 animate-fadeIn">
          <CheckCircle className="w-5 h-5 text-emerald-500 mt-0.5 flex-shrink-0" />
          <p className="text-emerald-800 text-sm font-medium">{success}</p>
        </div>
      )}

      {/* Batches Grid */}
      {isLoading ? (
        <div className="text-center py-16">
          <Loader className="w-10 h-10 animate-spin mx-auto text-slate-400" />
          <p className="mt-4 text-slate-500 font-medium">Loading batches...</p>
        </div>
      ) : batches.length === 0 ? (
        <div className="zen-card text-center py-16">
          <div className="w-20 h-20 bg-slate-50 rounded-zen flex items-center justify-center mx-auto mb-4">
            <Users className="w-10 h-10 text-slate-400" />
          </div>
          <h3 className="text-lg font-bold text-midnight-800 mb-2">No batches yet</h3>
          <p className="text-slate-500 mb-6">Create your first batch to get started</p>
          <button
            onClick={() => handleOpenModal()}
            className="btn-forest inline-flex"
          >
            <Plus className="w-4 h-4" />
            Create Batch
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {batches.map((batch, index) => {
            const statusConfig = getStatusConfig(batch.status);
            return (
              <div
                key={batch.batchId}
                className="zen-card zen-card-hover animate-fadeInUp"
                style={{ animationDelay: `${index * 0.05}s`, animationFillMode: 'both' }}
              >
                {/* Header */}
                <div className="flex items-start justify-between mb-5">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <div className={`w-2.5 h-2.5 rounded-full ${statusConfig.dot}`} />
                      <h3 className="text-base font-bold text-midnight-800 truncate">{batch.batchName}</h3>
                    </div>
                    <p className="text-xs font-mono text-slate-400">{batch.batchId}</p>
                  </div>
                  <span className={statusConfig.class}>{batch.status}</span>
                </div>

                {/* Metadata */}
                <div className="space-y-3 mb-5">
                  <div className="flex items-center gap-3 text-sm text-slate-600">
                    <div className="w-8 h-8 rounded-xl bg-slate-50 flex items-center justify-center flex-shrink-0">
                      <Users className="w-4 h-4 text-slate-500" />
                    </div>
                    <span className="font-medium">{batch.totalStudents || 0} Students</span>
                  </div>

                  <div className="flex items-center gap-3 text-sm text-slate-600">
                    <div className="w-8 h-8 rounded-xl bg-slate-50 flex items-center justify-center flex-shrink-0">
                      <BookOpen className="w-4 h-4 text-slate-500" />
                    </div>
                    <span className="font-medium">{batch.assignedTracks?.length || 0} Tracks</span>
                  </div>

                  {(batch.startDate || batch.endDate) && (
                    <div className="flex items-center gap-3 text-sm text-slate-600">
                      <div className="w-8 h-8 rounded-xl bg-slate-50 flex items-center justify-center flex-shrink-0">
                        <Calendar className="w-4 h-4 text-slate-500" />
                      </div>
                      <span className="font-medium">
                        {batch.startDate ? new Date(batch.startDate).toLocaleDateString() : '—'} – {batch.endDate ? new Date(batch.endDate).toLocaleDateString() : '—'}
                      </span>
                    </div>
                  )}

                  {batch.schedule && (
                    <div className="flex items-center gap-3 text-sm text-slate-600">
                      <div className="w-8 h-8 rounded-xl bg-slate-50 flex items-center justify-center flex-shrink-0">
                        <Clock className="w-4 h-4 text-slate-500" />
                      </div>
                      <span className="font-medium">{batch.schedule}</span>
                    </div>
                  )}
                </div>

                {/* Actions */}
                <div className="flex gap-2 pt-4 border-t border-slate-100">
                  <button
                    onClick={() => handleOpenModal(batch)}
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-forest-600 hover:bg-forest-500 text-white text-sm font-semibold rounded-2xl transition-colors"
                  >
                    <Edit className="w-4 h-4" />
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(batch.batchId)}
                    className="flex items-center justify-center gap-2 px-4 py-2.5 bg-red-50 hover:bg-red-100 text-red-600 text-sm font-semibold rounded-2xl transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Create/Edit Modal */}
      {showModal && (
        <div className="zen-overlay" onClick={handleCloseModal}>
          <div className="zen-modal" onClick={e => e.stopPropagation()}>
            <div className="sticky top-0 bg-white border-b border-slate-100 px-6 md:px-8 py-5 rounded-t-zen">
              <h2 className="text-xl font-bold text-midnight-800">
                {editingBatch ? 'Edit Batch' : 'Create New Batch'}
              </h2>
            </div>

            <form onSubmit={handleSubmit} className="p-6 md:p-8 space-y-5">
              {/* Batch Name */}
              <div>
                <label className="zen-label">
                  Batch Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={batchName}
                  onChange={(e) => setBatchName(e.target.value)}
                  className="zen-input"
                  placeholder="e.g., Morning Batch A"
                  required
                />
              </div>

              {/* Date Range */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="zen-label">Start Date</label>
                  <input
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="zen-input"
                  />
                </div>

                <div>
                  <label className="zen-label">End Date</label>
                  <input
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    className="zen-input"
                  />
                </div>
              </div>

              {/* Schedule */}
              <div>
                <label className="zen-label">Schedule</label>
                <input
                  type="text"
                  value={schedule}
                  onChange={(e) => setSchedule(e.target.value)}
                  className="zen-input"
                  placeholder="e.g., Mon-Fri 9AM-12PM"
                />
              </div>

              {/* Status */}
              <div>
                <label className="zen-label">
                  Status <span className="text-red-500">*</span>
                </label>
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value as any)}
                  className="zen-select"
                >
                  <option value="active">Active</option>
                  <option value="upcoming">Upcoming</option>
                  <option value="completed">Completed</option>
                </select>
              </div>

              {/* Assigned Tracks */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="zen-label !mb-0">Assigned Tracks</label>
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={handleSelectAllTracks}
                      className="px-3 py-1 text-xs font-semibold bg-forest-50 hover:bg-forest-100 text-forest-600 rounded-xl transition-colors"
                      data-testid="select-all-tracks-button"
                    >
                      Select All
                    </button>
                    <button
                      type="button"
                      onClick={handleDeselectAllTracks}
                      className="px-3 py-1 text-xs font-semibold bg-slate-50 hover:bg-slate-100 text-slate-600 rounded-xl transition-colors"
                      data-testid="deselect-all-tracks-button"
                    >
                      Deselect
                    </button>
                  </div>
                </div>
                <div className="border border-slate-200 rounded-2xl p-3 space-y-1 max-h-48 overflow-y-auto scrollbar-thin bg-slate-50">
                  {allTracks.map((track) => (
                    <label
                      key={track.id}
                      className="flex items-center gap-3 cursor-pointer hover:bg-white p-2.5 rounded-xl transition-colors"
                    >
                      <input
                        type="checkbox"
                        checked={selectedTracks.includes(track.id)}
                        onChange={() => toggleTrackSelection(track.id)}
                        className="w-4 h-4 text-forest-600 rounded-lg focus:ring-2 focus:ring-forest-200 border-slate-300"
                      />
                      <span className="text-sm font-medium text-midnight-800">{track.name}</span>
                    </label>
                  ))}
                </div>
                <p className="text-xs text-slate-500 mt-2 ml-1">
                  {selectedTracks.length} track{selectedTracks.length !== 1 ? 's' : ''} selected
                </p>
              </div>

              {/* Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="flex-1 btn-ghost"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 btn-forest"
                >
                  {editingBatch ? 'Update Batch' : 'Create Batch'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </AppLayout>
  );
}
