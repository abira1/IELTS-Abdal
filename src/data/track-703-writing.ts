// Track: 703-M Writing
import { Track } from './track1';

export const track703Writing: Track = {
  id: 'track-703-writing',
  name: '703-M Writing',
  shortName: '703MW',
  description: 'IELTS Academic Writing Test - Island Map Analysis (Task 1) and City Noise Essay (Task 2)',
  duration: 60,
  totalQuestions: 2,
  trackType: 'writing',
  audioURL: null,
  sections: [
    {
      sectionNumber: 1,
      title: 'Writing Task 1',
      questions: [
        {
          type: 'writing-task-with-image',
          taskNumber: 1,
          title: 'Writing Task 1',
          instruction: 'You should spend about 20 minutes on this task.',
          chartDescription: 'The two maps below show an island, before and after the construction of some tourist facilities. The maps illustrate the changes and developments made to the island\'s infrastructure.',
          chartImageURL: 'https://i.postimg.cc/Gps5FGvb/703.png',
          prompt: 'Summarize the information by selecting and reporting the main features, and make comparisons where relevant.\n\nWrite at least 150 words.',
          minWords: 150,
          timeRecommended: 20
        }
      ]
    },
    {
      sectionNumber: 2,
      title: 'Writing Task 2',
      questions: [
        {
          type: 'writing-task',
          taskNumber: 2,
          title: 'Writing Task 2',
          instruction: 'You should spend about 40 minutes on this task.',
          topicIntro: 'Write about the following topic:',
          prompt: 'There is too much noise in many public places in cities.\n\nWhat are the causes of this problem?\nWhat can be done to solve the problem?',
          closingInstruction: 'Give reasons for your answer and include any relevant examples from your own knowledge or experience.\n\nWrite at least 250 words.',
          minWords: 250,
          timeRecommended: 40
        }
      ]
    }
  ]
};
