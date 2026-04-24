import { Track } from './track1';

export const track710Listening: Track = {
  id: 'track-710-listening',
  name: '710 Listening',
  shortName: '710L',
  description: 'Listening practice with sentence completion, multiple choice, dropdown, map labeling, and table gaps',
  duration: 30,
  totalQuestions: 40,
  trackType: 'listening',
  audioURL: null,
  sections: [
    {
      sectionNumber: 1,
      title: 'Questions 1-10',
      questions: [
        {
          type: 'sentence-completion',
          instruction: 'Write NO MORE THAN THREE WORDS AND/OR A NUMBER for each answer.',
          items: [
            {
              questionNumber: 1,
              text: 'For example: Writing in first term\n(1)... in second term'
            },
            {
              questionNumber: 2,
              text: '(2)... throughout the year'
            },
            {
              questionNumber: 3,
              text: '(3)... during long vacation'
            },
            {
              questionNumber: 4,
              text: 'Class sizes: (4)... maximum'
            },
            {
              questionNumber: 5,
              text: 'Course costs often paid by the (5)...'
            },
            {
              questionNumber: 6,
              text: 'Exams available in (6)...'
            },
            {
              questionNumber: 7,
              text: 'Must enrol by (7)...'
            }
          ],
          answers: {}
        },
        {
          type: 'multiple-choice-multi-select',
          instruction: 'Choose THREE letters, A-G.',
          question: 'Which THREE items does the student need to bring to the first class?',
          questionNumbers: [8, 9, 10],
          maxSelections: 3,
          options: [
            { label: 'A. passport', value: 'A' },
            { label: 'B. computer disk', value: 'B' },
            { label: 'C. note from tutor', value: 'C' },
            { label: 'D. notebook', value: 'D' },
            { label: 'E. student identity card', value: 'E' },
            { label: 'F. dictionary', value: 'F' },
            { label: 'G. registration form', value: 'G' }
          ],
          answers: {}
        }
      ]
    },
    {
      sectionNumber: 2,
      title: 'Questions 11-20',
      questions: [
        {
          type: 'dropdown',
          instruction: 'Write the correct letter, A, B or C next to Questions 11-15.',
          items: [
            {
              questionNumber: 11,
              statement: 'cheapest'
            },
            {
              questionNumber: 12,
              statement: 'most convenient'
            },
            {
              questionNumber: 13,
              statement: 'most comfortable'
            },
            {
              questionNumber: 14,
              statement: 'fastest'
            },
            {
              questionNumber: 15,
              statement: 'most frequent service'
            }
          ],
          options: [
            { label: 'A. tube', value: 'A' },
            { label: 'B. train', value: 'B' },
            { label: 'C. bus', value: 'C' }
          ],
          answers: {}
        },
        {
          type: 'drag-and-drop',
          instruction: 'Label the map below. Write the correct letter, A-G, next to Questions 16-20.',
          imageUrl: 'https://i.postimg.cc/8C8wwR0k/Town-street-plan-diagram.png',
          imageTitle: 'Town Street Plan',
          items: [
            { label: 'bus stop', questionNumber: 16 },
            { label: 'train station', questionNumber: 17 },
            { label: 'tube entrance', questionNumber: 18 },
            { label: 'transport ticket office', questionNumber: 19 },
            { label: 'taxi rank', questionNumber: 20 }
          ],
          options: [
            { label: 'A', value: 'A' },
            { label: 'B', value: 'B' },
            { label: 'C', value: 'C' },
            { label: 'D', value: 'D' },
            { label: 'E', value: 'E' },
            { label: 'F', value: 'F' },
            { label: 'G', value: 'G' }
          ],
          answers: {}
        }
      ]
    },
    {
      sectionNumber: 3,
      title: 'Questions 21-37',
      questions: [
        {
          type: 'dropdown',
          instruction: 'What is the advantage of each course? Choose THREE answers from the box and write the correct letter, A-E next to Questions 21-23.',
          items: [
            {
              questionNumber: 21,
              statement: 'Science and Ethics'
            },
            {
              questionNumber: 22,
              statement: 'Pharmacology Prelim'
            },
            {
              questionNumber: 23,
              statement: 'Reporting Test Results'
            }
          ],
          options: [
            { label: 'A. will be tested in the final exams', value: 'A' },
            { label: 'B. will be useful for a future job', value: 'B' },
            { label: 'C. will help with research skills', value: 'C' },
            { label: 'D. will improve writing skills', value: 'D' },
            { label: 'E. will support material already covered', value: 'E' }
          ],
          answers: {}
        },
        {
          type: 'sentence-completion',
          instruction: 'Write NO MORE THAN TWO WORDS for each answer.',
          items: [
            {
              questionNumber: 24,
              text: 'The Maths course will run in the (24)...'
            },
            {
              questionNumber: 25,
              text: 'The tutor for Pharmacology is visiting from (25)...'
            },
            {
              questionNumber: 26,
              text: '(26)... for the project must be submitted by the end of January.'
            },
            {
              questionNumber: 27,
              text: 'Resources for experiments are available in the (27)...'
            },
            {
              questionNumber: 28,
              text: 'Extra (28)... will be held in December.'
            },
            {
              questionNumber: 29,
              text: 'Students are allowed to do presentations in (29)...'
            },
            {
              questionNumber: 30,
              text: 'Course assessment will be based on (30)...'
            }
          ],
          answers: {}
        },
        {
          type: 'multi-column-table',
          instruction: 'Write NO MORE THAN TWO WORDS for each answer.',
          title: 'New City Features',
          headers: ['New Features', 'Size', 'Problems'],
          rows: [
            {
              cells: [
                { content: 'individual transport' },
                { content: 'levels of investment' },
                { content: '(31)... will be limited to outskirts' }
              ]
            },
            {
              cells: [
                { content: '' },
                { content: 'narrower roofs will have' },
                { content: '(32)... of (33)... will be limited' }
              ]
            },
            {
              cells: [
                { content: 'commercial areas' },
                { content: '(34)...' },
                { content: 'to providing enough housing' }
              ]
            },
            {
              cells: [
                { content: 'For residential areas' },
                { content: 'homes made of 15,000' },
                { content: '(35)...' }
              ]
            },
            {
              cells: [
                { content: 'energy sources' },
                { content: '(36)... will be an energy source' },
                { content: 'noise and congestion will be smaller' }
              ]
            },
            {
              cells: [
                { content: '' },
                { content: 'energy plants' },
                { content: 'caused by (37)...' }
              ]
            }
          ],
          answers: {}
        }
      ]
    },
    {
      sectionNumber: 4,
      title: 'Questions 38-40',
      questions: [
        {
          type: 'sentence-completion',
          instruction: 'Write NO MORE THAN TWO WORDS for each answer.',
          items: [
            {
              questionNumber: 38,
              text: 'Which three types of accommodation does the speaker say will increase in city centres?\n(38)...'
            },
            {
              questionNumber: 39,
              text: '(39)...'
            },
            {
              questionNumber: 40,
              text: '(40)...'
            }
          ],
          answers: {}
        }
      ]
    }
  ]
};
