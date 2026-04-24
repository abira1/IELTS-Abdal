// Track: 704 Listening
import { Track } from './track1';

export const track704Listening: Track = {
  id: 'track-704-listening',
  name: '704 Listening',
  shortName: '704L',
  description: 'IELTS Listening Practice Test - DVD Players, Home Security, Essay Writing, and Exchange Rate Project',
  duration: 60,
  totalQuestions: 40,
  trackType: 'listening',
  audioURL: null,
  sections: [
    {
      sectionNumber: 1,
      title: 'Questions 1-10',
      passage: {
        title: 'DVD Player Customer Profile',
        content: 'This section covers customer preferences for DVD players and product specifications.'
      },
      questions: [
        {
          type: 'sentence-completion',
          instruction: 'Write NO MORE THAN THREE WORDS for each answer.',
          items: [
            {
              questionNumber: 1,
              text: 'What is the maximum you want to spend on a DVD player?'
            },
            {
              questionNumber: 2,
              text: 'How often do you watch DVDs?'
            },
            {
              questionNumber: 3,
              text: 'What type of films do you enjoy?'
            },
            {
              questionNumber: 4,
              text: 'What other DVDs (non-film) do you watch?'
            }
          ]
        },
        {
          type: 'multi-column-table',
          instruction: 'Complete the table below.',
          title: 'DVD Player Comparison',
          headers: ['Player', 'Features', 'Cost', 'After-sales service'],
          rows: [
            {
              cells: [
                { content: 'DB 30' },
                { content: 'basic' },
                { content: '£69' },
                { content: '(5)............ only' }
              ]
            },
            {
              cells: [
                { content: 'XL 643' },
                { content: 'can also (6).........' },
                { content: '£ (7).........' },
                { content: '(8)........... at a reduced cost' }
              ]
            },
            {
              cells: [
                { content: 'TriX 24' },
                { content: 'Will also play (9).........' },
                { content: '£ 94 including (10).........' },
                { content: 'Guaranteed for 3 years' }
              ]
            }
          ]
        }
      ]
    },
    {
      sectionNumber: 2,
      title: 'Questions 11-20',
      passage: {
        title: 'Home Security Alarm System',
        content: 'This section covers home security, alarm systems, and installation information.'
      },
      questions: [
        {
          type: 'sentence-completion',
          instruction: 'Write NO MORE THAN TWO WORDS for each answer.',
          items: [
            {
              questionNumber: 11,
              text: 'A quarter of break-ins are through the...........'
            },
            {
              questionNumber: 12,
              text: 'The ...........'
            },
            {
              questionNumber: 13,
              text: 'You should warn burglars your house is alarmed by putting a ..........'
            },
            {
              questionNumber: 14,
              text: 'The alarms show a constant ...........'
            },
            {
              questionNumber: 15,
              text: 'The alarms can be set off by a...........'
            },
            {
              questionNumber: 16,
              text: 'The alarms are connected to the...........'
            },
            {
              questionNumber: 17,
              text: 'The alarms are usually installed in ...........'
            },
            {
              questionNumber: 18,
              text: 'The security code should be kept...........'
            },
            {
              questionNumber: 19,
              text: 'The alarms can be installed ..........'
            },
            {
              questionNumber: 20,
              text: 'Customers can pay ..........'
            }
          ]
        }
      ]
    },
    {
      sectionNumber: 3,
      title: 'Questions 21-30',
      passage: {
        title: 'Essay Writing and Academic Skills',
        content: 'This section covers essay writing techniques and academic writing skills.'
      },
      questions: [
        {
          type: 'sentence-completion',
          instruction: 'Write NO MORE THAN TWO WORDS for each answer.',
          items: [
            {
              questionNumber: 21,
              text: 'Essay writing is simply the process of (21)........... information'
            },
            {
              questionNumber: 22,
              text: 'presenting your (22)...........'
            },
            {
              questionNumber: 23,
              text: 'You will need to use skills of analysis, (23)........... and expression'
            },
            {
              questionNumber: 24,
              text: 'The key to producing a good essay is in the (24)...........'
            },
            {
              questionNumber: 25,
              text: 'You will find several books in the library to help you with the particular (25)........... of academic writing'
            },
            {
              questionNumber: 26,
              text: 'When you have completed your essay you must remember to (26)........... it carefully'
            },
            {
              questionNumber: 27,
              text: 'by doing this, you can (27)........... from it'
            }
          ]
        },
        {
          type: 'multiple-choice-multi-select',
          instruction: 'Choose THREE letters A-G.',
          question: 'Which THREE pieces of advice does the tutor give the student?',
          questionNumbers: [28, 29, 30],
          maxSelections: 3,
          options: [
            { label: 'break the question down into smaller questions', value: 'A' },
            { label: 'check the vocabulary in the question', value: 'B' },
            { label: 'limit how much you read', value: 'C' },
            { label: 'make sure you have good notes', value: 'D' },
            { label: 'use only a few quotations', value: 'E' },
            { label: 'ask a friend to read your essay', value: 'F' },
            { label: 'try to be objective', value: 'G' }
          ]
        }
      ]
    },
    {
      sectionNumber: 4,
      title: 'Questions 31-40',
      passage: {
        title: 'Exchange Rate Project',
        content: 'This section covers a currency exchange rate project with steps and final questions.'
      },
      questions: [
        {
          type: 'flowchart',
          instruction: 'Write NO MORE THAN TWO WORDS for each answer.',
          title: 'Exchange Rate Project',
          steps: [
            {
              questionNumber: 31,
              text: '(31)........... a currency'
            },
            {
              questionNumber: 32,
              text: 'Imagine you need to (32)........... £100'
            },
            {
              questionNumber: 33,
              text: '(33)........... facts about the state of your country\'s economy'
            },
            {
              questionNumber: 34,
              text: 'Try to (34)........... your currency'
            },
            {
              questionNumber: 35,
              text: '(35)........... other currency if you want'
            },
            {
              questionNumber: 36,
              text: '(36)........... your profit'
            }
          ],
          options: []
        },
        {
          type: 'sentence-completion',
          instruction: 'Write NO MORE THAN THREE WORDS for each answer.',
          items: [
            {
              questionNumber: 37,
              text: 'How many main trading partners does the UK have?'
            },
            {
              questionNumber: 38,
              text: 'Which sector does the tutor want students to study?'
            },
            {
              questionNumber: 39,
              text: 'What does the tutor want students to look at changes in?'
            },
            {
              questionNumber: 40,
              text: 'When does the tutor want the project completed by?'
            }
          ]
        }
      ]
    }
  ]
};
