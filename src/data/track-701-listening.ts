// Track: 701 Listening
import { Track } from './track1';

export const track701Listening: Track = {
  id: 'track-701-listening',
  name: '701 Listening',
  shortName: '701L',
  description: 'IELTS Listening Practice Test - Student Union, Library, and Mobile Phones',
  duration: 60,
  totalQuestions: 40,
  trackType: 'listening',
  audioURL: null,
  sections: [
    {
      sectionNumber: 1,
      title: 'Questions 1-10',
      passage: {
        title: 'Student Union and Services',
        content: 'This section covers student registration and union services including photocopier access, event locations, and discount benefits.'
      },
      questions: [
        {
          type: 'table-gap',
          instruction: 'Write NO MORE THAN TWO WORDS AND/OR A NUMBER for each answer.',
          title: 'Student Union Registration Form',
          rows: [
            {
              label: 'Name',
              value: 'Stefan Unger'
            },
            {
              label: 'Degree programme',
              value: {
                questionNumber: 1
              }
            },
            {
              label: 'Department',
              value: {
                questionNumber: 2
              }
            },
            {
              label: 'Leisure activities',
              value: {
                questionNumber: 3
              }
            },
            {
              label: 'Language(s) (apart from English)',
              value: {
                questionNumber: 4
              }
            },
            {
              label: 'Type of accommodation',
              value: {
                questionNumber: 5
              }
            },
            {
              label: 'Contact number',
              value: {
                questionNumber: 6
              }
            }
          ]
        },
        {
          type: 'sentence-completion',
          instruction: 'Write NO MORE THAN THREE WORDS for each answer.',
          items: [
            {
              questionNumber: 7,
              text: 'When can students use the photocopier? .........'
            },
            {
              questionNumber: 8,
              text: 'Where are events usually held? .........'
            },
            {
              questionNumber: 9,
              text: 'Which Union officer is responsible for van hire? .........'
            },
            {
              questionNumber: 10,
              text: 'What will Union members be able to get a discount on? .........'
            }
          ]
        }
      ]
    },
    {
      sectionNumber: 2,
      title: 'Questions 11-20',
      passage: {
        title: 'Library Services',
        content: 'This section covers library floor plan layout and library system information.'
      },
      questions: [
        {
          type: 'drag-and-drop',
          instruction: 'Choose FIVE answers from the box and write the correct letter A – G next to Questions 11 – 15.',
          imageUrl: 'https://i.postimg.cc/6qyq3QZQ/Library-floor-plan-schematic-layout.png',
          imageTitle: 'Library Floor Plan',
          items: [
            {
              questionNumber: 11,
              label: 'Question 11'
            },
            {
              questionNumber: 12,
              label: 'Question 12'
            },
            {
              questionNumber: 13,
              label: 'Question 13'
            },
            {
              questionNumber: 14,
              label: 'Question 14'
            },
            {
              questionNumber: 15,
              label: 'Question 15'
            }
          ],
          options: [
            { label: 'Arts section', value: 'A' },
            { label: 'Computers', value: 'B' },
            { label: 'Languages section', value: 'C' },
            { label: 'Law', value: 'D' },
            { label: 'Magazines', value: 'E' },
            { label: 'Science', value: 'F' },
            { label: 'study desks', value: 'G' }
          ]
        },
        {
          type: 'table-gap',
          instruction: 'Write NO MORE THAN TWO WORDS AND/OR A NUMBER for each answer.',
          title: 'Library System',
          rows: [
            {
              label: 'Maximum borrowing period',
              value: {
                questionNumber: 16
              }
            },
            {
              label: 'Renew books in person or by',
              value: {
                questionNumber: 17
              }
            },
            {
              label: 'Overdue charge (£)',
              value: {
                questionNumber: 18
              }
            },
            {
              label: 'Unavailable books - leave information in a',
              value: {
                questionNumber: 19
              }
            },
            {
              label: 'Extra services',
              value: {
                questionNumber: 20
              }
            }
          ]
        }
      ]
    },
    {
      sectionNumber: 3,
      title: 'Questions 21-30',
      passage: {
        title: 'Architecture Conference Submission Process',
        content: 'This section covers the process for submitting a paper to the architecture conference.'
      },
      questions: [
        {
          type: 'flowchart',
          instruction: 'Write NO MORE THAN TWO WORDS for each answer.',
          title: 'To Submit a Paper for the Architecture Conference',
          steps: [
            {
              questionNumber: 21,
              text: 'Find details of conference themes on (21).........'
            },
            {
              questionNumber: 22,
              text: 'Check rules for submission, e.g. (22)........... of paper'
            },
            {
              questionNumber: 23,
              text: 'Write paper on (23)........... work'
            },
            {
              questionNumber: 24,
              text: 'Check any data is in a suitable (24)...........'
            },
            {
              questionNumber: 25,
              text: 'Hand in paper to the (25)........... for checking'
            },
            {
              questionNumber: 26,
              text: 'Make any necessary (26)..........., then submit paper'
            },
            {
              questionNumber: 27,
              text: 'If accepted, send in details of your (27)........... requirements'
            },
            {
              questionNumber: 28,
              text: 'Send conference organisers a personal profile for the (28)...........'
            }
          ],
          options: []
        },
        {
          type: 'multiple-choice-multi-select',
          instruction: 'Choose TWO letters, A-E.',
          question: 'Which TWO things does Kirsten plan to do to prepare her conference paper?',
          questionNumbers: [29, 30],
          maxSelections: 2,
          options: [
            { label: 'read another student\'s thesis', value: 'A' },
            { label: 'collect more data', value: 'B' },
            { label: 'talk to some postgraduates', value: 'C' },
            { label: 'contact a Professor at another university', value: 'D' },
            { label: 'inspect a building site', value: 'E' }
          ]
        }
      ]
    },
    {
      sectionNumber: 4,
      title: 'Questions 31-40',
      passage: {
        title: 'Mobile Phone Technology and Uses',
        content: 'This section covers mobile phone technology features and usage patterns.'
      },
      questions: [
        {
          type: 'sentence-completion',
          instruction: 'Write NO MORE THAN TWO WORDS for each answer.',
          items: [
            {
              questionNumber: 31,
              text: 'Mobile phones now have the technology to send ........... of where the sender is.'
            },
            {
              questionNumber: 32,
              text: 'Mobile phones now have the technology to watch ........... in real time.'
            },
            {
              questionNumber: 33,
              text: 'Mobile phones now have the technology to send ........... with texts.'
            },
            {
              questionNumber: 34,
              text: 'Mobile phones now have the technology to inform students about lectures which are ...........'
            },
            {
              questionNumber: 35,
              text: 'Mobile phones now have the technology to transfer ........... to a computer.'
            }
          ]
        },
        {
          type: 'dropdown',
          instruction: 'Select the correct letter, A, B or C next to Questions 36–40.',
          items: [
            {
              questionNumber: 36,
              statement: 'To access information'
            },
            {
              questionNumber: 37,
              statement: 'To stay in touch'
            },
            {
              questionNumber: 38,
              statement: 'For business'
            },
            {
              questionNumber: 39,
              statement: 'To store personal photos'
            },
            {
              questionNumber: 40,
              statement: 'As a camera'
            }
          ],
          options: [
            { label: 'women', value: 'A' },
            { label: 'men', value: 'B' },
            { label: 'men and women', value: 'C' }
          ]
        }
      ]
    }
  ]
};
