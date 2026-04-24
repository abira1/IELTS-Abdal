// Track: 708-M Writing
import { Track } from './track1';

export const track708Writing: Track = {
  id: 'track-708-writing',
  name: '708-M Writing',
  shortName: '708MW',
  description: 'IELTS Academic Writing Test - Internet Use by Age Group (Task 1) and Success Definition Essay (Task 2)',
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
          chartDescription: 'The table below gives information on internet use in six categories by age group. It shows how different age demographics utilize the internet across various platforms and applications.',
          chartImageURL: 'https://i.postimg.cc/pdn6fzzs/708.png',
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
          prompt: 'Some people say that individuals who make a lot of money are the most successful. Others think that those who contribute to society like scientists and teachers are more successful.\n\nDiscuss both sides and give your own opinion.',
          closingInstruction: 'Give reasons for your answer and include any relevant examples from your own knowledge or experience.\n\nWrite at least 250 words.',
          minWords: 250,
          timeRecommended: 40
        }
      ]
    }
  ]
};
