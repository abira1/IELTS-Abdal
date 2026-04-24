// Track: 706-M Writing
import { Track } from './track1';

export const track706Writing: Track = {
  id: 'track-706-writing',
  name: '706-M Writing',
  shortName: '706MW',
  description: 'IELTS Academic Writing Test - Art Gallery Layout Changes (Task 1) and Wildlife Protection Essay (Task 2)',
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
          chartDescription: 'The map illustrates how an art gallery changed from 2015 to now. The diagram shows the layout modifications and renovations made to the gallery space over this period.',
          chartImageURL: 'https://i.postimg.cc/DzbMrLLY/706.png',
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
          prompt: 'Many believe that it is important to protect all wild animals, while others think that it is important to protect some, not all of them.\n\nDiscuss both views and give your opinion.',
          closingInstruction: 'Give reasons for your answer and include any relevant examples from your own knowledge or experience.\n\nWrite at least 250 words.',
          minWords: 250,
          timeRecommended: 40
        }
      ]
    }
  ]
};
