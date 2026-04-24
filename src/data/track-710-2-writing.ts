// Track: 710-2-M Writing
import { Track } from './track1';

export const track7102Writing: Track = {
  id: 'track-710-2-writing',
  name: '710-2-M Writing',
  shortName: '710-2MW',
  description: 'IELTS Academic Writing Test - Japan Population Data (Task 1) and Museum Visits Essay (Task 2)',
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
          chartDescription: 'The chart and table below give information about population figures in Japan. They display demographic data showing population trends, distribution, and statistics across different regions or time periods.',
          chartImageURL: 'https://i.postimg.cc/W1yyqXFK/710-2.png',
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
          prompt: 'Nowadays foreign visitors show more interest in the museums of a country than its local residents do.\n\nWhy is this?\nWhat can be done to attract more local residents to visit museums in their country?',
          closingInstruction: 'Give reasons for your answer and include any relevant examples from your own knowledge or experience.\n\nWrite at least 250 words.',
          minWords: 250,
          timeRecommended: 40
        }
      ]
    }
  ]
};
