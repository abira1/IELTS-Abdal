// Track: 710-M Writing
import { Track } from './track1';

export const track710Writing: Track = {
  id: 'track-710-writing',
  name: '710-M Writing',
  shortName: '710MW',
  description: 'IELTS Academic Writing Test - Russia Export Quantities by Transport (Task 1) and Teen Part-time Jobs Essay (Task 2)',
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
          chartDescription: 'The graph below shows the quantities of goods exported from Russia to several countries between 1975 to 2010 by different modes of transport. It illustrates the export volumes and transportation methods used over this 35-year period.',
          chartImageURL: 'https://i.postimg.cc/QdCPMRtp/710.png',
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
          prompt: 'In many countries, teenagers are encouraged to find part-time jobs.\n\nSome think this is a good development while others disagree.\n\nDiscuss both sides and give your own opinion.',
          closingInstruction: 'Give reasons for your answer and include any relevant examples from your own knowledge or experience.\n\nWrite at least 250 words.',
          minWords: 250,
          timeRecommended: 40
        }
      ]
    }
  ]
};
