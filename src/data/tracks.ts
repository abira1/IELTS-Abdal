// Track Registry - All available exam tracks
import { Track } from './track1';
import { track703Reading } from './track-703-reading';
import { track704Reading } from './track-704-reading';
import { track705Reading } from './track-705-reading';
import { track706Reading } from './track-706-reading';
import { track707Reading } from './track-707-reading';
import { track708Reading } from './track-708-reading';
import { track709Reading } from './track-709-reading';
import { track710Reading } from './track-710-reading';
import { track711Reading } from './track-711-reading';
import { track712Reading } from './track-712-reading';
import { track1MWriting } from './track-1m-writing';
import { track2MWriting } from './track-2m-writing';
import { track3MWriting } from './track-3m-writing';
import { track4MWriting } from './track-4m-writing';
import { track5MWriting } from './track-5m-writing';
import { track6MWriting } from './track-6m-writing';
import { track7MWriting } from './track-7m-writing';
import { track8MWriting } from './track-8m-writing';
import { track9MWriting } from './track-9m-writing';
import { track10MWriting } from './track-10m-writing';
import { track701Listening } from './track-701-listening';
import { track702Listening } from './track-702-listening';
import { track703Listening } from './track-703-listening';
import { track704Listening } from './track-704-listening';
import { track706Listening } from './track-706-listening';
import { track707Listening } from './track-707-listening';
import { track708Listening } from './track-708-listening';
import { track709Listening } from './track-709-listening';
import { track710Listening } from './track-710-listening';
import { track712Listening } from './track-712-listening';

// Export all tracks as an array
export const allTracks: Track[] = [
  // Listening Tracks (700 series only)
  track701Listening,// 701 Listening
  track702Listening,// 702 Listening
  track703Listening,// 703 Listening
  track704Listening,// 704 Listening
  track706Listening,// 706 Listening
  track707Listening,// 707 Listening
  track708Listening,// 708 Listening
  track709Listening,// 709 Listening
  track710Listening,// 710 Listening
  track712Listening,// 712 Listening
  // Reading Tracks
  track703Reading,
  track704Reading,
  track705Reading,
  track706Reading,
  track707Reading,
  track708Reading,
  track709Reading,
  track710Reading,
  track711Reading,
  track712Reading,
  // Writing Tracks
  track1MWriting,
  track2MWriting,
  track3MWriting,
  track4MWriting,
  track5MWriting,
  track6MWriting,
  track7MWriting,
  track8MWriting,
  track9MWriting,
  track10MWriting
];

// Helper function to get track by ID
export const getTrackById = (trackId: string): Track | undefined => {
  return allTracks.find(track => track.id === trackId);
};

// Helper function to get tracks by type
export const getTracksByType = (type: 'listening' | 'reading' | 'writing' | 'sicu'): Track[] => {
  return allTracks.filter(track => track.trackType === type);
};

// Helper function to get all tracks grouped by type
export const getAllTracksByType = () => {
  return {
    listening: getTracksByType('listening'),
    reading: getTracksByType('reading'),
    writing: getTracksByType('writing'),
    sicu: getTracksByType('sicu')
  };
};

// Helper function to get track names for dropdown
export const getTrackOptions = () => {
  return allTracks.map(track => ({
    id: track.id,
    name: track.name,
    duration: track.duration,
    totalQuestions: track.totalQuestions,
    trackType: track.trackType
  }));
};

// Helper function to get track options grouped by type
export const getTrackOptionsGrouped = () => {
  const grouped = getAllTracksByType();
  return {
    listening: grouped.listening.map(track => ({
      id: track.id,
      name: track.name,
      duration: track.duration,
      totalQuestions: track.totalQuestions
    })),
    reading: grouped.reading.map(track => ({
      id: track.id,
      name: track.name,
      duration: track.duration,
      totalQuestions: track.totalQuestions
    })),
    writing: grouped.writing.map(track => ({
      id: track.id,
      name: track.name,
      duration: track.duration,
      totalQuestions: track.totalQuestions
    })),
    sicu: grouped.sicu.map(track => ({
      id: track.id,
      name: track.name,
      duration: track.duration,
      totalQuestions: track.totalQuestions
    }))
  };
};

// Export Track type for use in other files
export type { Track };
