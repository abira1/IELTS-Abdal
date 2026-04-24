// Track: 709-2-M Writing
import { Track } from './track1';

export const track7092Writing: Track = {
  id: 'track-709-2-writing',
  name: '709-2-M Writing',
  shortName: '709-2MW',
  description: 'IELTS Academic Writing Test - Overseas Visitor Spending Trends (Task 1) and Newspapers vs Internet Essay (Task 2)',
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
          chartDescription: 'The line graph shows how much money overseas visitors spent in the UK from 1980 to 2010 and the pie charts show the reasons for their visits in 1980 and 2010. The visual representation compares spending trends and changing motivations for international tourism.',
          chartImageURL: 'https://i.postimg.cc/K8WW3JkD/709-2.png',
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
          prompt: 'Although more and more people read news on the Internet, newspapers will remain the most important source of news for the majority of people.\n\nTo what extent do you agree or disagree?',
          closingInstruction: 'Give reasons for your answer and include any relevant examples from your own knowledge or experience.\n\nWrite at least 250 words.',
          minWords: 250,
          timeRecommended: 40
        }
      ]
    }
  ]
};
