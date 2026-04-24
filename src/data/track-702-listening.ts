// Track: 702 Listening
import { Track } from './track1';

export const track702Listening: Track = {
  id: 'track-702-listening',
  name: '702 Listening',
  shortName: '702L',
  description: 'IELTS Listening Practice Test - Community Center, Hiking, Student Teaching, and Retail',
  duration: 60,
  totalQuestions: 40,
  trackType: 'listening',
  audioURL: null,
  sections: [
    {
      sectionNumber: 1,
      title: 'Questions 1-10',
      passage: {
        title: 'Community Center Activities',
        content: 'This section covers community center activities schedule and membership details.'
      },
      questions: [
        {
          type: 'multi-column-table',
          instruction: 'Write NO MORE THAN TWO WORDS AND/OR A NUMBER for each answer.',
          title: 'Community Center Classes Schedule',
          headers: ['Days', 'Class/Activity', 'Age Group'],
          rows: [
            {
              cells: [
                { content: 'Wednesday, Saturday' },
                { content: { questionNumber: 1 } },
                { content: 'children, teens' }
              ]
            },
            {
              cells: [
                { content: { questionNumber: 2 } },
                { content: 'Tennis' },
                { content: { questionNumber: 3 } }
              ]
            },
            {
              cells: [
                { content: 'Tuesday, Thursday' },
                { content: { questionNumber: 4 } },
                { content: 'children, teens, adults' }
              ]
            },
            {
              cells: [
                { content: 'Friday' },
                { content: 'Book club' },
                { content: { questionNumber: 5 } }
              ]
            }
          ]
        },
        {
          type: 'sentence-completion',
          instruction: 'Write ONE WORD ONLY for each answer.',
          items: [
            {
              questionNumber: 6,
              text: 'Membership fees $ ......... (individual)'
            },
            {
              questionNumber: 7,
              text: '$ ......... (family)'
            },
            {
              questionNumber: 8,
              text: 'Located at 107 ......... Street'
            },
            {
              questionNumber: 9,
              text: 'Parking is located ...........'
            },
            {
              questionNumber: 10,
              text: 'The Center is closed on ...........'
            }
          ]
        }
      ]
    },
    {
      sectionNumber: 2,
      title: 'Questions 11-20',
      passage: {
        title: 'Hiking Trip and Safety Rules',
        content: 'This section covers what to bring on a hiking trip and important safety rules.'
      },
      questions: [
        {
          type: 'multiple-choice-multi-select',
          instruction: 'Choose FIVE from letters A-J.',
          question: 'Which FIVE things should hikers take on the hiking trip?',
          questionNumbers: [11, 12, 13, 14, 15],
          maxSelections: 5,
          options: [
            { label: 'sleeping bag', value: 'A' },
            { label: 'tent', value: 'B' },
            { label: 'food', value: 'C' },
            { label: 'dishes', value: 'D' },
            { label: 'hiking boots', value: 'E' },
            { label: 'backpack', value: 'F' },
            { label: 'walking poles', value: 'G' },
            { label: 'maps', value: 'H' },
            { label: 'jacket', value: 'I' },
            { label: 'first-aid kit', value: 'J' }
          ]
        },
        {
          type: 'sentence-completion',
          instruction: 'Write NO MORE THAN TWO WORDS for each answer.',
          items: [
            {
              questionNumber: 16,
              text: 'Always stay ahead of the ...........'
            },
            {
              questionNumber: 17,
              text: 'Stop and wait at any ...........'
            },
            {
              questionNumber: 18,
              text: 'Don\'t try to climb ...........'
            },
            {
              questionNumber: 19,
              text: 'Don\'t ........... wild animals.'
            },
            {
              questionNumber: 20,
              text: 'Always carry ........... with you.'
            }
          ]
        }
      ]
    },
    {
      sectionNumber: 3,
      title: 'Questions 21-30',
      passage: {
        title: 'Student Teaching Program',
        content: 'This section covers requirements and timeline for student teachers.'
      },
      questions: [
        {
          type: 'multiple-choice-multi-select',
          instruction: 'Choose FOUR from letters A-G.',
          question: 'Which FOUR of the following are required of student teachers?',
          questionNumbers: [21, 22, 23, 24],
          maxSelections: 4,
          options: [
            { label: 'weekly journal', value: 'A' },
            { label: 'sample lesson plans', value: 'B' },
            { label: 'meetings with other student teachers', value: 'C' },
            { label: 'observing other teachers', value: 'D' },
            { label: 'evaluation from supervising teacher', value: 'E' },
            { label: 'portfolio', value: 'F' },
            { label: 'final exam', value: 'G' }
          ]
        },
        {
          type: 'multiple-choice',
          questionNumber: 25,
          question: 'Who has to sign the agreement form?',
          options: [
            { label: 'the student teacher', value: 'A' },
            { label: 'the supervising teacher', value: 'B' },
            { label: 'the advisor', value: 'C' }
          ]
        },
        {
          type: 'table-gap',
          instruction: 'Write ONE WORD AND/OR A NUMBER for each answer.',
          title: 'Student Teaching Timeline',
          rows: [
            {
              label: 'First week',
              value: {
                questionNumber: 26
              }
            },
            {
              label: 'Fourth week',
              value: {
                questionNumber: 27
              }
            },
            {
              label: 'Seventh week',
              value: {
                questionNumber: 28
              }
            },
            {
              label: 'Fourteenth week',
              value: {
                questionNumber: 29
              }
            },
            {
              label: 'Fifteenth week',
              value: {
                questionNumber: 30
              }
            }
          ]
        }
      ]
    },
    {
      sectionNumber: 4,
      title: 'Questions 31-40',
      passage: {
        title: 'Retail and Store Psychology',
        content: 'This section covers retail strategies and the psychology of store design including colors and effects.'
      },
      questions: [
        {
          type: 'multiple-choice',
          questionNumber: 31,
          question: 'Retailers place popular items',
          options: [
            { label: 'in the back of the store', value: 'A' },
            { label: 'near the front entrance', value: 'B' },
            { label: 'at the end of the aisle', value: 'C' }
          ]
        },
        {
          type: 'multiple-choice',
          questionNumber: 32,
          question: 'Carpet patterns are used to',
          options: [
            { label: 'help shoppers feel comfortable', value: 'A' },
            { label: 'appeal to shoppers\' decorative sense', value: 'B' },
            { label: 'encourage shoppers to walk in certain directions', value: 'C' }
          ]
        },
        {
          type: 'multiple-choice',
          questionNumber: 33,
          question: 'Retailers can keep customers in the store longer by',
          options: [
            { label: 'providing places to sit', value: 'A' },
            { label: 'keeping the doors closed', value: 'B' },
            { label: 'lowering the prices', value: 'C' }
          ]
        },
        {
          type: 'multiple-choice',
          questionNumber: 34,
          question: 'Music is used in stores to',
          options: [
            { label: 'entertain customers', value: 'A' },
            { label: 'slow customers down', value: 'B' },
            { label: 'make customers shop faster', value: 'C' }
          ]
        },
        {
          type: 'multiple-choice',
          questionNumber: 35,
          question: 'The scent of vanilla has been used in',
          options: [
            { label: 'ice cream shops', value: 'A' },
            { label: 'bakeries', value: 'B' },
            { label: 'clothing stores', value: 'C' }
          ]
        },
        {
          type: 'multi-column-table',
          instruction: 'Write ONE WORD AND/OR A NUMBER for each answer.',
          title: 'Store Colors and Effects',
          headers: ['Colors', 'Effect'],
          rows: [
            {
              cells: [
                { content: 'Purple' },
                { content: 'encourages people to (36)...........' }
              ]
            },
            {
              cells: [
                { content: 'Orange' },
                { content: 'makes restaurant customers (37)..........' }
              ]
            },
            {
              cells: [
                { content: 'Orange' },
                { content: 'conveys a sense of (38)...........' }
              ]
            },
            {
              cells: [
                { content: 'Bright colors' },
                { content: 'appeal to (39)...........' }
              ]
            },
            {
              cells: [
                { content: 'Soft colors' },
                { content: 'appeal to (40)...........' }
              ]
            }
          ]
        }
      ]
    }
  ]
};
