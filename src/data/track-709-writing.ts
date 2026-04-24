// Track: 709-M Writing
import { Track } from './track1';

export const track709Writing: Track = {
  id: 'track-709-writing',
  name: '709-M Writing',
  shortName: '709MW',
  description: 'IELTS Academic Writing Test - Noise Complaints Trend (Task 1) and Community Facilities Essay (Task 2)',
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
          chartDescription: 'The graph below shows the number of complaints made about noise to Environmental Health authorities in the city of Newtown between 1980 and 1996. It illustrates the trend and frequency of noise-related complaints over this 16-year period.',
          chartImageURL: 'https://i.postimg.cc/QdzzK09n/709.png',
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
          prompt: 'Big companies should provide sports and social facilities for the local communities where they operate.\n\nTo what extent do you agree or disagree with this statement?',
          closingInstruction: 'Give reasons for your answer, and include any relevant examples from your own knowledge or experience.\n\nWrite at least 250 words.',
          minWords: 250,
          timeRecommended: 40
        }
      ]
    }
  ]
};
