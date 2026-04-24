import { Track } from './track1';

export const track712Listening: Track = {
  id: 'track-712-listening',
  name: '712 Listening',
  shortName: '712L',
  description: 'IELTS Listening Practice Test - University clubs and residences',
  duration: 60,
  totalQuestions: 40,
  trackType: 'listening',
  audioURL: null,
  sections: [
    {
      sectionNumber: 1,
      title: 'Section 1: University Clubs and Climbing Club Details',
      questions: [
        // Q1-4: Table gaps - University Clubs
        {
          type: 'multi-column-table',
          instruction: 'Write NO MORE THAN THREE WORDS AND/OR A NUMBER for each answer.',
          title: 'University Clubs',
          headers: ['Name of club', 'Monday', 'Tuesday', 'Wednesday'],
          rows: [
            {
              cells: [
                { content: 'Film' },
                { content: 'climbing' },
                { content: 'chess' },
                { content: '' }
              ]
            },
            {
              cells: [
                { content: 'Extra activities' },
                { content: 'discussions' },
                { content: '(1)...' },
                { content: '(2)...' }
              ]
            },
            {
              cells: [
                { content: 'Current number of members' },
                { content: '(3)...' },
                { content: '40' },
                { content: '55' }
              ]
            },
            {
              cells: [
                { content: 'Contact' },
                { content: 'Events organiser' },
                { content: '(4)...' },
                { content: 'Maths tutor' }
              ]
            }
          ]
        },
        // Q5-10: Sentence completion gaps - Climbing club details
        {
          type: 'sentence-completion',
          instruction: 'Write NO MORE THAN THREE WORDS for each answer.',
          title: 'Details of climbing club',
          items: [
            {
              questionNumber: 5,
              text: 'Meets (5)...'
            },
            {
              questionNumber: 6,
              text: 'Excursion to France in the (6)...'
            },
            {
              questionNumber: 7,
              text: 'Subscriptions paid (7)...'
            },
            {
              questionNumber: 8,
              text: 'Benefits: Discounts on (8)...'
            },
            {
              questionNumber: 9,
              text: 'Annual (9)...'
            },
            {
              questionNumber: 10,
              text: 'Free entrance to climbing (10)...in Cardiff'
            }
          ]
        }
      ]
    },
    {
      sectionNumber: 2,
      title: 'Section 2: Halls of Residence and Campus Map',
      questions: [
        // Q11-15: Halls of residence - Features matching drag and drop
        {
          type: 'drag-and-drop',
          instruction: 'Which features are available at the following halls of residence? Choose the correct letter, A-G for each.',
          items: [
            { questionNumber: 11, label: 'Brown Hall' },
            { questionNumber: 12, label: 'Blake Residence' },
            { questionNumber: 13, label: 'Queens Building' },
            { questionNumber: 14, label: 'Parkway Flats' },
            { questionNumber: 15, label: 'Temple Rise' }
          ],
          options: [
            { label: 'cleaning included', value: 'A' },
            { label: 'all meals included', value: 'B' },
            { label: 'private showers', value: 'C' },
            { label: 'modern building', value: 'D' },
            { label: 'parking spaces', value: 'E' },
            { label: 'single sex', value: 'F' },
            { label: 'sports facilities', value: 'G' }
          ]
        },
        // Q16-20: Drag and drop - Map labeling
        {
          type: 'drag-and-drop',
          instruction: 'Label the map below. Write the correct letter, A-G next to Questions 16-20.',
          imageUrl: 'https://i.postimg.cc/8C8wwR0k/Town-street-plan-diagram.png',
          imageTitle: 'University Campus Map',
          items: [
            { questionNumber: 16, label: 'Brown Hall' },
            { questionNumber: 17, label: 'Blake Residence' },
            { questionNumber: 18, label: 'Queens Building' },
            { questionNumber: 19, label: 'Parkway Flats' },
            { questionNumber: 20, label: 'Temple Rise' }
          ],
          options: [
            { label: 'A', value: 'A' },
            { label: 'B', value: 'B' },
            { label: 'C', value: 'C' },
            { label: 'D', value: 'D' },
            { label: 'E', value: 'E' },
            { label: 'F', value: 'F' },
            { label: 'G', value: 'G' }
          ]
        }
      ]
    },
    {
      sectionNumber: 3,
      title: 'Section 3: Project Work and Collaboration',
      questions: [
        // Q21-24: Sentence completion gaps - Project work
        {
          type: 'sentence-completion',
          instruction: 'Write NO MORE THAN THREE WORDS OR A NUMBER for each answer.',
          items: [
            {
              questionNumber: 21,
              text: 'Jenna and Marco must complete their project by (21)...'
            },
            {
              questionNumber: 22,
              text: 'The project will be a study of the increase in (22)...'
            },
            {
              questionNumber: 23,
              text: 'The project will be assessed by (23)...'
            },
            {
              questionNumber: 24,
              text: 'Jenna and Marco agree they need a (24)...for the project.'
            }
          ]
        },
        // Q25-27: Multiple choice multi-select
        {
          type: 'multiple-choice-multi-select',
          instruction: 'Choose THREE letters, A-G.',
          questionNumbers: [25, 26, 27],
          question: 'What THREE things do Marco and Jenna have to do now for the project?',
          maxSelections: 3,
          options: [
            { label: 'A. interview some people', value: 'A' },
            { label: 'B. hand out questionnaires', value: 'B' },
            { label: 'C. choose their subjects', value: 'C' },
            { label: 'D. take photographs', value: 'D' },
            { label: 'E. use statistical software', value: 'E' },
            { label: 'F. do some work in the library', value: 'F' },
            { label: 'G. contact some local companies', value: 'G' }
          ]
        },
        // Q28-30: Multiple choice single
        {
          type: 'multiple-choice',
          instruction: 'Choose the correct letter, A, B or C.',
          questionNumber: 28,
          question: 'Why did Jenna and Marco agree to work together?',
          options: [
            { label: 'A', value: 'A. because they both wanted to work with someone else' },
            { label: 'B', value: 'B. because they each have different skills' },
            { label: 'C', value: 'C. because they have worked together before' }
          ]
        },
        {
          type: 'multiple-choice',
          instruction: 'Choose the correct letter, A, B or C.',
          questionNumber: 29,
          question: 'Why does Marco suggest that he writes the analysis?',
          options: [
            { label: 'A', value: 'A. He needs more practice with his kind of writing' },
            { label: 'B', value: 'B. He is better at English than Jenna' },
            { label: 'C', value: 'C. He has more experience of this than Jenna' }
          ]
        },
        {
          type: 'multiple-choice',
          instruction: 'Choose the correct letter, A, B or C.',
          questionNumber: 30,
          question: 'Why does Jenna offer to do the presentation?',
          options: [
            { label: 'A', value: 'A. Her tutor wants her to do the presentation' },
            { label: 'B', value: 'B. Marco is very nervous about giving presentation' },
            { label: 'C', value: 'C. She wants do divide the work on the project fairly' }
          ]
        }
      ]
    },
    {
      sectionNumber: 4,
      title: 'Section 4: News Sources and Advertising',
      questions: [
        // Q31-35: Dropdown - News source
        {
          type: 'dropdown',
          instruction: 'Write the correct letter, A, B or C next to Questions 31-35.',
          question: 'Of which US news source is each of the following statements true?',
          options: [
            { label: 'television', value: 'A' },
            { label: 'internet', value: 'B' },
            { label: 'the press', value: 'C' }
          ],
          items: [
            {
              questionNumber: 31,
              statement: 'It is more popular at the weekend than during the week.'
            },
            {
              questionNumber: 32,
              statement: 'It has affected the popularity of local radio.'
            },
            {
              questionNumber: 33,
              statement: 'It has recently been able to expand internationally'
            },
            {
              questionNumber: 34,
              statement: 'It is offering more varied reporting than previously.'
            },
            {
              questionNumber: 35,
              statement: 'It has suffered from government intervention.'
            }
          ]
        },
        // Q36-40: Sentence completion gaps - Advertising and newspapers
        {
          type: 'sentence-completion',
          instruction: 'Write NO MORE THAN TWO WORDS for each answer.',
          title: 'Advertising and Newspapers',
          items: [
            {
              questionNumber: 36,
              text: 'In the USA, newspapers are being increasingly inventive about the way they attract advertisers and their (36)...now exceeds that of other industries.'
            },
            {
              questionNumber: 37,
              text: 'Advertising has increased because of a good relationship with the (37)...sector.'
            },
            {
              questionNumber: 38,
              text: 'In addition, newspapers now run more adverts which include (38)...'
            },
            {
              questionNumber: 39,
              text: 'These have been found to raise readership of the papers and create more sales for the (39)...'
            },
            {
              questionNumber: 40,
              text: 'There are also an increasing number of more expensive (40)...adverts.'
            }
          ]
        }
      ]
    }
  ]
};
