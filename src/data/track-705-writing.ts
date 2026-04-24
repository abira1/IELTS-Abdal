// Track: 705-M Writing
import { Track } from './track1';

export const track705Writing: Track = {
  id: 'track-705-writing',
  name: '705-M Writing',
  shortName: '705MW',
  description: 'IELTS Academic Writing Test - Olive Oil Production Process (Task 1) and Happiness and Success Essay (Task 2)',
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
          chartDescription: 'The diagram below gives information about stages of the process of producing olive oil. It illustrates the complete production steps from harvesting olives to final product preparation.',
          chartImageURL: 'https://i.postimg.cc/s2ZNY75z/705.png',
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
          prompt: 'Some people think personal happiness is directly related to economic success, while others believe this depends on other factors.\n\nDiscuss both sides and give your own opinion.',
          closingInstruction: 'Give reasons for your answer and include any relevant examples from your own knowledge or experience.\n\nWrite at least 250 words.',
          minWords: 250,
          timeRecommended: 40
        }
      ]
    }
  ]
};
