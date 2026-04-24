// Track: 709 Listening
import { Track } from './track1';

export const track709Listening: Track = {
  id: 'track-709-listening',
  name: '709 Listening',
  shortName: '709L',
  description: 'IELTS Listening Practice - Special Leave and Language School',
  duration: 60,
  totalQuestions: 40,
  trackType: 'listening',
  audioURL: null,
  sections: [
    {
      sectionNumber: 1,
      title: 'Questions 1-12',
      questions: [
        {
          type: 'table-gap',
          instruction: 'Write NO MORE THAN THREE WORDS AND/OR A NUMBER for each answer.',
          title: 'Request for Special Leave',
          rows: [
            { label: 'Name', value: { content: 'Angela Tung' } },
            { label: 'Student number (Example)', value: { content: 'H5712' } },
            { label: 'Address', value: { questionNumber: 1 } },
            { label: 'Course', value: { questionNumber: 2 } },
            { label: 'Teacher\'s name', value: { questionNumber: 3 } },
            { label: 'Student visa expiry date', value: { questionNumber: 4 } },
            { label: 'I wish to request leave in Term', value: { questionNumber: 5 } },
            { label: 'Dates of leave (from)', value: { questionNumber: 6 } },
            { label: 'Dates of leave (to)', value: { questionNumber: 7 } },
            { label: 'Number of working days missed', value: { questionNumber: 8 } }
          ]
        },
        {
          type: 'multiple-choice',
          questionNumber: 9,
          question: 'Why does Angela want to take leave?',
          options: [
            { label: 'to visit her aunt and uncle', value: 'A' },
            { label: 'to see the National Gallery', value: 'B' },
            { label: 'to see the Southern Highlands', value: 'C' },
            { label: 'to study more writing', value: 'D' }
          ]
        },
        {
          type: 'multiple-choice',
          questionNumber: 10,
          question: 'Where is Angela going?',
          options: [
            { label: 'Tamworth', value: 'A' },
            { label: 'Brisbane', value: 'B' },
            { label: 'Armidale', value: 'C' },
            { label: 'Sydney', value: 'D' }
          ]
        },
        {
          type: 'multiple-choice',
          questionNumber: 11,
          question: 'Who is going with Angela?',
          options: [
            { label: 'her uncle', value: 'A' },
            { label: 'her mother', value: 'B' },
            { label: 'her aunt', value: 'C' },
            { label: 'her father', value: 'D' }
          ]
        },
        {
          type: 'multiple-choice',
          questionNumber: 12,
          question: 'When will Angela go home to her own country?',
          options: [
            { label: 'in five years', value: 'A' },
            { label: 'in twelve months', value: 'B' },
            { label: 'in two months', value: 'C' },
            { label: 'when her mother goes home', value: 'D' }
          ]
        }
      ]
    },
    {
      sectionNumber: 2,
      title: 'Questions 13-24',
      questions: [
        {
          type: 'multi-column-table',
          instruction: 'Complete the calendar while you listen. Use words from the box. There are more words in the box than you need. Some words may be used more than once.',
          title: 'Service Schedule Calendar',
          headers: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
          rows: [
            {
              cells: [
                { content: 'May 17' },
                { content: 'May 18' },
                { content: 'May 19' },
                { content: 'May 20' },
                { content: 'May 21' },
                { content: 'May 22' },
                { content: 'May 23' }
              ]
            },
            {
              cells: [
                { content: '(13)...' },
                { content: '' },
                { content: '' },
                { content: '' },
                { content: '' },
                { content: '' },
                { content: '' }
              ]
            },
            {
              cells: [
                { content: 'May 24' },
                { content: 'May 25' },
                { content: 'May 26' },
                { content: 'May 27' },
                { content: 'May 28' },
                { content: 'May 29' },
                { content: 'May 30' }
              ]
            },
            {
              cells: [
                { content: '' },
                { content: '(14)...' },
                { content: '' },
                { content: '' },
                { content: '' },
                { content: '(15)...' },
                { content: '' }
              ]
            },
            {
              cells: [
                { content: 'May 31' },
                { content: 'June 1' },
                { content: 'June 2' },
                { content: 'June 3' },
                { content: 'June 4' },
                { content: 'June 5' },
                { content: 'June 6' }
              ]
            },
            {
              cells: [
                { content: '' },
                { content: '(16)...' },
                { content: '' },
                { content: '(17)...' },
                { content: '' },
                { content: '(18)...' },
                { content: '' }
              ]
            }
          ]
        },
        {
          type: 'multiple-choice',
          questionNumber: 19,
          question: 'Where has Martha gone?',
          options: [
            { label: 'London', value: 'A' },
            { label: 'Sydney', value: 'B' },
            { label: 'New York', value: 'C' },
            { label: 'Paris', value: 'D' }
          ]
        },
        {
          type: 'multiple-choice',
          questionNumber: 20,
          question: 'Why is Martha away from home?',
          options: [
            { label: 'She\'s visiting friends', value: 'A' },
            { label: 'She\'s at a conference', value: 'B' },
            { label: 'She\'s on business', value: 'C' },
            { label: 'She\'s setting up a business', value: 'D' }
          ]
        },
        {
          type: 'multiple-choice',
          questionNumber: 21,
          question: 'Who will Martha meet while she\'s away?',
          options: [
            { label: 'an old school friend', value: 'A' },
            { label: 'a friend of her mother\'s', value: 'B' },
            { label: 'an old university friend', value: 'C' },
            { label: 'an old teacher', value: 'D' }
          ]
        },
        {
          type: 'multiple-choice',
          questionNumber: 22,
          question: 'What has Martha left for John?',
          options: [
            { label: 'a letter', value: 'A' },
            { label: 'a meal', value: 'B' },
            { label: 'a book', value: 'C' },
            { label: 'a bill', value: 'D' }
          ]
        },
        {
          type: 'multiple-choice',
          questionNumber: 23,
          question: 'Who does Martha want John to telephone?',
          options: [
            { label: 'the optometrist', value: 'A' },
            { label: 'the telephone company', value: 'B' },
            { label: 'the doctor', value: 'C' },
            { label: 'the dentist', value: 'D' }
          ]
        },
        {
          type: 'multiple-choice',
          questionNumber: 24,
          question: 'What is the code for Martha\'s alarm system?',
          options: [
            { label: 'enter 2190', value: 'A' },
            { label: '2190 enter', value: 'B' },
            { label: '9120 enter', value: 'C' },
            { label: 'enter 9120', value: 'D' }
          ]
        }
      ]
    },
    {
      sectionNumber: 3,
      title: 'Questions 25-36',
      questions: [
        {
          type: 'table-gap',
          instruction: 'Write NO MORE THAN THREE WORDS AND/OR A NUMBER for each answer.',
          title: 'Language School Enrolment Form',
          rows: [
            { label: 'Name of Applicant', value: { content: 'Vijay Paresh' } },
            { label: 'Telephone number', value: { content: '909 2467' } },
            { label: 'Language to be learned', value: { questionNumber: 25 } },
            { label: 'Location of class', value: { questionNumber: 26 } },
            { label: 'Time of class', value: { questionNumber: 27 } },
            { label: 'Name of class', value: { questionNumber: 28 } },
            { label: 'Date of commencement of class', value: { questionNumber: 29 } }
          ]
        },
        {
          type: 'multiple-choice',
          questionNumber: 30,
          question: 'Anne is',
          options: [
            { label: 'Vijay\'s friend', value: 'A' },
            { label: 'Denise\'s friend', value: 'B' },
            { label: 'Vijay\'s boss', value: 'C' },
            { label: 'Denise\'s boss', value: 'D' }
          ]
        },
        {
          type: 'multiple-choice',
          questionNumber: 31,
          question: 'When Anne speaks she',
          options: [
            { label: 'congratulates Denise', value: 'A' },
            { label: 'ignores Denise', value: 'B' },
            { label: 'criticises Denise', value: 'C' },
            { label: 'praises Denise', value: 'D' }
          ]
        },
        {
          type: 'multiple-choice',
          questionNumber: 32,
          question: 'When Denise replies she',
          options: [
            { label: 'laughs at Anne', value: 'A' },
            { label: 'sympathises with Anne', value: 'B' },
            { label: 'argues with Anne', value: 'C' },
            { label: 'apologises to Anne', value: 'D' }
          ]
        },
        {
          type: 'drag-and-drop',
          instruction: 'Listen to the directions and match the places to the appropriate letter A-H on the plan.',
          imageUrl: 'https://i.postimg.cc/qRKK3npL/Robert-Street.png',
          imageTitle: 'Robert Street Floor Plan',
          items: [
            { label: 'Reception area, admissions', questionNumber: 33 },
            { label: 'Fees office', questionNumber: 34 },
            { label: 'Book and stationery supply', questionNumber: 35 },
            { label: 'Travel agency', questionNumber: 36 }
          ],
          options: [
            { label: 'A', value: 'A' },
            { label: 'B', value: 'B' },
            { label: 'C', value: 'C' },
            { label: 'D', value: 'D' },
            { label: 'E', value: 'E' },
            { label: 'F', value: 'F' },
            { label: 'G', value: 'G' },
            { label: 'H', value: 'H' }
          ]
        }
      ]
    },
    {
      sectionNumber: 4,
      title: 'Questions 37-40',
      questions: [
        {
          type: 'multiple-choice-multi-select',
          instruction: 'Choose FIVE letters A-K.',
          question: 'Which FIVE cities have old-structure problems and good public transport?',
          questionNumbers: [37, 38],
          maxSelections: 5,
          options: [
            { label: 'A. Los Angeles', value: 'A' },
            { label: 'B. London', value: 'B' },
            { label: 'C. Bangkok', value: 'C' },
            { label: 'D. Hong Kong', value: 'D' },
            { label: 'E. New York', value: 'E' },
            { label: 'F. Taipei', value: 'F' },
            { label: 'G. Houston', value: 'G' },
            { label: 'H. Sydney', value: 'H' },
            { label: 'I. Paris', value: 'I' },
            { label: 'J. Tokyo', value: 'J' },
            { label: 'K. Dallas', value: 'K' }
          ]
        },
        {
          type: 'sentence-completion',
          instruction: 'Write NO MORE THAN THREE WORDS to complete the sentences.',
          items: [
            {
              questionNumber: 39,
              text: 'The public transport available in Houston is (39).........'
            },
            {
              questionNumber: 40,
              text: 'To reduce peak hour traffic jams, people can travel (40).........'
            }
          ]
        }
      ]
    }
  ]
};
