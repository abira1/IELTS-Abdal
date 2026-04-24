// Track: 703 Listening
import { Track } from './track1';

export const track703Listening: Track = {
  id: 'track-703-listening',
  name: '703 Listening',
  shortName: '703L',
  description: 'IELTS Listening Practice Test - Language Classes, City Shopping District, Archives, and Wind Power',
  duration: 60,
  totalQuestions: 40,
  trackType: 'listening',
  audioURL: null,
  sections: [
    {
      sectionNumber: 1,
      title: 'Questions 1-10',
      passage: {
        title: 'Language Classes and Tuition',
        content: 'This section covers language class schedules and tuition information.'
      },
      questions: [
        {
          type: 'table-gap',
          instruction: 'Complete the schedule below',
          title: 'Class Schedule',
          rows: [
            {
              label: 'Chinese Level:',
              value: 'Advanced'
            },
            {
              label: 'Level:',
              value: 'Advanced'
            },
            {
              label: 'Days: (1)........... evenings',
              value: {
                questionNumber: 1
              }
            },
            {
              label: 'Japanese',
              value: 'Japanese'
            },
            {
              label: 'Level: (2)...........',
              value: {
                questionNumber: 2
              }
            },
            {
              label: 'Days:',
              value: 'Tuesday and Thursday mornings'
            },
            {
              label: 'Level: (3)...........',
              value: {
                questionNumber: 3
              }
            },
            {
              label: 'Days:',
              value: 'Monday, Wednesday, and Friday mornings'
            },
            {
              label: 'French',
              value: 'French'
            },
            {
              label: 'Level:',
              value: 'Intermediate'
            },
            {
              label: 'Days: Friday (4)...........',
              value: {
                questionNumber: 4
              }
            }
          ]
        },
        {
          type: 'sentence-completion',
          instruction: 'Write NO MORE THAN TWO WORDS for each answer.',
          items: [
            {
              questionNumber: 5,
              text: 'Six weeks $ .........'
            },
            {
              questionNumber: 6,
              text: 'Four weeks $ .........'
            },
            {
              questionNumber: 7,
              text: 'One week $ .........'
            },
            {
              questionNumber: 8,
              text: 'Twelve weeks $ .........'
            }
          ]
        },
        {
          type: 'sentence-completion',
          instruction: 'Write NO MORE THAN TWO WORDS for each answer.',
          items: [
            {
              questionNumber: 9,
              text: 'Students can register for a class by visiting the .........'
            },
            {
              questionNumber: 10,
              text: '........... is in charge of student registration.'
            }
          ]
        }
      ]
    },
    {
      sectionNumber: 2,
      title: 'Questions 11-20',
      passage: {
        title: 'City Shopping District and Harbor Park',
        content: 'This section covers the city shopping district map and Harbor Park information.'
      },
      questions: [
        {
          type: 'drag-and-drop',
          instruction: 'Drop the correct letter A-I next to questions 11-15.',
          question: 'Which locations on the map correspond to each description?',
          questionNumbers: [11, 12, 13, 14, 15],
          imageUrl: 'https://i.postimg.cc/XJPvhyHk/City-shopping-district-map-schematic.png',
          items: [
            { label: 'Harbor View Bookstore', questionNumber: 11 },
            { label: 'Pear Cafe', questionNumber: 12 },
            { label: 'Souvenir Store', questionNumber: 13 },
            { label: 'Art Gallery', questionNumber: 14 },
            { label: 'Harbor Park', questionNumber: 15 }
          ],
          options: [
            { label: 'Harbor View Bookstore', value: 'A' },
            { label: 'Pear Cafe', value: 'B' },
            { label: 'Souvenir Store', value: 'C' },
            { label: 'Art Gallery', value: 'D' },
            { label: 'Harbor Park', value: 'E' },
            { label: 'Bank', value: 'F' },
            { label: 'Post Office', value: 'G' },
            { label: 'Library', value: 'H' },
            { label: 'Museum', value: 'I' }
          ]
        },
        {
          type: 'sentence-completion',
          instruction: 'Write ONE WORD ONLY for each answer.',
          items: [
            {
              questionNumber: 16,
              text: 'The park was built in .........'
            },
            {
              questionNumber: 17,
              text: 'A ........... stands in the center of the park.'
            },
            {
              questionNumber: 18,
              text: 'Take the path through the .........'
            },
            {
              questionNumber: 19,
              text: 'In the middle of the garden is a .........'
            },
            {
              questionNumber: 20,
              text: 'A ........... takes you down to the harbor and a view of the boats.'
            }
          ]
        }
      ]
    },
    {
      sectionNumber: 3,
      title: 'Questions 21-30',
      passage: {
        title: 'City Archives and Building Collections',
        content: 'This section covers information about the city archives and floor collections.'
      },
      questions: [
        {
          type: 'sentence-completion',
          instruction: 'Write ONE WORD ONLY for each answer.',
          items: [
            {
              questionNumber: 21,
              text: 'University students with a valid .........'
            },
            {
              questionNumber: 22,
              text: 'City residents with payment of .........'
            },
            {
              questionNumber: 23,
              text: 'Days: .........'
            },
            {
              questionNumber: 24,
              text: 'Hours: 9:30 A.M. until ........... P.M'
            }
          ]
        },
        {
          type: 'drag-and-drop',
          instruction: 'Choose FIVE answers from the box and write the correct letter A-G next to questions 25-30.',
          question: 'Which collection is stored on each floor?',
          questionNumbers: [25, 26, 27, 28, 29, 30],
          items: [
            { label: 'basement', questionNumber: 25 },
            { label: 'ground floor', questionNumber: 26 },
            { label: 'second floor', questionNumber: 27 },
            { label: 'third floor', questionNumber: 28 },
            { label: 'fourth floor', questionNumber: 29 },
            { label: 'fifth floor', questionNumber: 30 }
          ],
          options: [
            { label: 'nineteenth-century documents', value: 'A' },
            { label: 'maps', value: 'B' },
            { label: 'personal papers', value: 'C' },
            { label: 'photographs', value: 'D' },
            { label: 'books about the city', value: 'E' },
            { label: 'newspapers', value: 'F' },
            { label: 'information about the woolen mill', value: 'G' }
          ]
        }
      ]
    },
    {
      sectionNumber: 4,
      title: 'Questions 31-40',
      passage: {
        title: 'Wind Power: Advantages and Disadvantages',
        content: 'This section covers the advantages and disadvantages of wind power as an energy source.'
      },
      questions: [
        {
          type: 'multi-column-table',
          instruction: 'Complete the chart below. Write NO MORE THAN TWO WORDS for each answer.',
          title: 'Wind Power - Advantages vs Disadvantages',
          headers: ['Advantages', 'Disadvantages'],
          rows: [
            {
              cells: [
                { content: 'Unlike oil and coal, wind power does not cause (31)............' },
                { content: 'The cost of the initial investment is high.' }
              ]
            },
            {
              cells: [
                { content: 'There are limited supplies of oil and coal, but wind is a (32).............' },
                { content: 'The (33)........... of the wind is not constant.' }
              ]
            },
            {
              cells: [
                { content: 'It (34)........... to generate electricity with the wind' },
                { content: 'Wind turbines are usually located far from (35).............' }
              ]
            },
            {
              cells: [
                { content: 'Wind turbines do not take up much land' },
                { content: 'Wind turbines may spoil (36)............' }
              ]
            },
            {
              cells: [
                { content: 'Wind energy is (37)........... in many regions' },
                { content: 'Wind turbines make as (38)............ as a high-speed car.' }
              ]
            },
            {
              cells: [
                { content: 'Wind farms can be built on (39)........... land' },
                { content: 'Wind power installation requires (40)........... sites.' }
              ]
            }
          ]
        }
      ]
    }
  ]
};
