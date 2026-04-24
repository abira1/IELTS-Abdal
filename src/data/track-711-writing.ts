// Track: 711-M Writing
import { Track } from './track1';

export const track711Writing: Track = {
  id: 'track-711-writing',
  name: '711-M Writing',
  shortName: '711MW',
  description: 'IELTS Academic Writing Test - World Production Output by Region (Task 1) and Computer Games Essay (Task 2)',
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
          chartDescription: 'The diagram shows the world production output from Asia, Europe, and the rest of the world in different years. It illustrates the distribution of global production across major geographic regions over time.',
          chartImageURL: 'https://i.postimg.cc/jS11nZwB/711.png',
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
          prompt: 'Many adults nowadays prefer spending their free time playing computer games.\n\nWhy do they do this?\nIs this a positive or negative development?',
          closingInstruction: 'Give reasons for your answer and include any relevant examples from your own knowledge or experience.\n\nWrite at least 250 words.',
          minWords: 250,
          timeRecommended: 40
        }
      ]
    }
  ]
};
