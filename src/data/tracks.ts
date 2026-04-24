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

import { track703Writing } from './track-703-writing';
import { track705Writing } from './track-705-writing';
import { track706Writing } from './track-706-writing';
import { track707Writing } from './track-707-writing';
import { track708Writing } from './track-708-writing';
import { track7082Writing } from './track-708-2-writing';
import { track709Writing } from './track-709-writing';
import { track7092Writing } from './track-709-2-writing';
import { track710Writing } from './track-710-writing';
import { track7102Writing } from './track-710-2-writing';
import { track711Writing } from './track-711-writing';
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
  // 700 Series Writing Tracks
  track703Writing,
  track705Writing,
  track706Writing,
  track707Writing,
  track708Writing,
  track7082Writing,
  track709Writing,
  track7092Writing,
  track710Writing,
  track7102Writing,
  track711Writing
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
