// Track: 707-M Writing
import { Track } from './track1';

export const track707Writing: Track = {
  id: 'track-707-writing',
  name: '707-M Writing',
  shortName: '707MW',
  description: 'IELTS Academic Writing Test - UAE Government Budget Breakdown (Task 1) and Sports Facilities Essay (Task 2)',
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
          chartDescription: 'The chart below shows how much money was spent in the budget on different sectors by the UAE government in 2000. It provides a breakdown of government expenditure across various categories and departments.',
          chartImageURL: 'https://i.postimg.cc/CKfQGkkQ/707.png',
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
          prompt: 'Some countries invest in specialized sports facilities for top athletes but not for the average person.\n\nIs this a positive or negative development?',
          closingInstruction: 'Give reasons for your answer and include any relevant examples from your own knowledge or experience.\n\nWrite at least 250 words.',
          minWords: 250,
          timeRecommended: 40
        }
      ]
    }
  ]
};
