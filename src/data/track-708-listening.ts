// Track: 708 Listening
import { Track } from './track1';

export const track708Listening: Track = {
  id: 'track-708-listening',
  name: '708 Listening',
  shortName: '708L',
  description: 'IELTS Listening Practice Test - Class Transfer and Music Preferences',
  duration: 60,
  totalQuestions: 40,
  trackType: 'listening',
  audioURL: null,
  sections: [
    {
      sectionNumber: 1,
      title: 'Questions 1-10',
      questions: [
        {
          type: 'multiple-choice',
          questionNumber: 1,
          question: 'Listen and select the correct image',
          options: [
            { label: 'Image A', value: 'A', imageUrl: 'https://i.postimg.cc/2yCsZQ4k/1-A.png' },
            { label: 'Image B', value: 'B', imageUrl: 'https://i.postimg.cc/sx3khYps/1-B.png' },
            { label: 'Image C', value: 'C', imageUrl: 'https://i.postimg.cc/j2Rp7Hzb/1-C.png' },
            { label: 'Image D', value: 'D', imageUrl: 'https://i.postimg.cc/Y0t5W61w/1-D.png' }
          ]
        },
        {
          type: 'multiple-choice',
          questionNumber: 2,
          question: 'Listen and select the correct image',
          options: [
            { label: 'Image A', value: 'A', imageUrl: 'https://i.postimg.cc/LXkd5CZp/2-A.png' },
            { label: 'Image B', value: 'B', imageUrl: 'https://i.postimg.cc/gJy9jSL1/2-B.png' },
            { label: 'Image C', value: 'C', imageUrl: 'https://i.postimg.cc/MT0kHPfL/2-C.png' },
            { label: 'Image D', value: 'D', imageUrl: 'https://i.postimg.cc/ydhqxQ3v/2-D.png' }
          ]
        },
        {
          type: 'multiple-choice',
          questionNumber: 3,
          question: 'Listen and select the correct image',
          options: [
            { label: 'Image A', value: 'A', imageUrl: 'https://i.postimg.cc/PxbGJ3vW/3-A.png' },
            { label: 'Image B', value: 'B', imageUrl: 'https://i.postimg.cc/JnCV1V0x/3-B.png' },
            { label: 'Image C', value: 'C', imageUrl: 'https://i.postimg.cc/50Wdxdy3/3-C.png' },
            { label: 'Image D', value: 'D', imageUrl: 'https://i.postimg.cc/76r8x8hM/3-D.png' }
          ]
        },
        {
          type: 'multiple-choice',
          questionNumber: 4,
          question: 'Listen and select the correct image',
          options: [
            { label: 'Image A', value: 'A', imageUrl: 'https://i.postimg.cc/vmVwFHYc/4-A.png' },
            { label: 'Image B', value: 'B', imageUrl: 'https://i.postimg.cc/JhkCV4rs/4-B.png' },
            { label: 'Image C', value: 'C', imageUrl: 'https://i.postimg.cc/j5Y0s02S/4-C.png' },
            { label: 'Image D', value: 'D', imageUrl: 'https://i.postimg.cc/nLDfbcFM/4-D.png' }
          ]
        },
        {
          type: 'sentence-completion',
          instruction: 'Write NO MORE THAN THREE WORDS for each answer.',
          items: [
            {
              questionNumber: 5,
              text: 'Where will Mary go now?'
            },
            {
              questionNumber: 6,
              text: 'Who is waiting for Tom?'
            },
            {
              questionNumber: 7,
              text: 'What time does Mary expect to come home?'
            },
            {
              questionNumber: 8,
              text: 'Where is Mary\'s office?'
            },
            {
              questionNumber: 9,
              text: 'What TV program does Tom plan to watch tonight?'
            },
            {
              questionNumber: 10,
              text: 'Where does Tom have to go tomorrow?'
            }
          ]
        }
      ]
    },
    {
      sectionNumber: 2,
      title: 'Questions 11-22',
      questions: [
        {
          type: 'table-gap',
          instruction: 'Write NO MORE THAN TWO WORDS AND/OR A NUMBER for each answer.',
          title: 'Request to Terminate or Transfer Classes',
          rows: [
            {
              label: 'Department',
              value: {
                questionNumber: 11
              }
            },
            {
              label: 'Message for',
              value: {
                questionNumber: 12
              }
            },
            {
              label: 'Student\'s family name',
              value: {
                questionNumber: 13
              }
            },
            {
              label: 'Student\'s first name',
              value: {
                questionNumber: 14
              }
            },
            {
              label: 'Student number',
              value: {
                questionNumber: 15
              }
            },
            {
              label: 'Teacher\'s name',
              value: {
                questionNumber: 16
              }
            },
            {
              label: 'Student\'s address',
              value: {
                questionNumber: 17
              }
            }
          ]
        },
        {
          type: 'multiple-choice',
          questionNumber: 18,
          question: 'May wants to change classes because',
          options: [
            { label: 'she doesn\'t like her teacher', value: 'A' },
            { label: 'too many students share a language', value: 'B' },
            { label: 'she can\'t understand the work', value: 'C' },
            { label: 'the class is too large', value: 'D' }
          ]
        },
        {
          type: 'multiple-choice',
          questionNumber: 19,
          question: 'In the evening class most students\' first language is',
          options: [
            { label: 'English', value: 'A' },
            { label: 'Italian', value: 'B' },
            { label: 'Spanish', value: 'C' },
            { label: 'Japanese', value: 'D' }
          ]
        },
        {
          type: 'multiple-choice',
          questionNumber: 20,
          question: 'There is room in the new class because two students',
          options: [
            { label: 'went home', value: 'A' },
            { label: 'dropped the course', value: 'B' },
            { label: 'transferred', value: 'C' },
            { label: 'graduated', value: 'D' }
          ]
        },
        {
          type: 'multiple-choice',
          questionNumber: 21,
          question: 'May prefers the evening class because it is',
          options: [
            { label: 'in the same room', value: 'A' },
            { label: 'in the room next door', value: 'B' },
            { label: 'in the same building', value: 'C' },
            { label: 'in the building next door', value: 'D' }
          ]
        },
        {
          type: 'multiple-choice',
          questionNumber: 22,
          question: 'May wants Mrs Brooks to leave a message at',
          options: [
            { label: 'the library', value: 'A' },
            { label: 'her work', value: 'B' },
            { label: 'her friend\'s house', value: 'C' },
            { label: 'her home', value: 'D' }
          ]
        }
      ]
    },
    {
      sectionNumber: 3,
      title: 'Questions 23-31',
      questions: [
        {
          type: 'multi-column-table',
          instruction: 'Complete the table showing the students\' opinions. Choose answers from the box.',
          title: 'Students\' Music Preferences',
          headers: ['Student', 'Favourite Instrument', 'Favourite Style of Music'],
          rows: [
            {
              cells: [
                { content: 'Example' },
                { content: 'drums' },
                { content: 'classical' }
              ]
            },
            {
              cells: [
                { content: 'Greg' },
                { content: { questionNumber: 23 } },
                { content: { questionNumber: 24 } }
              ]
            },
            {
              cells: [
                { content: 'Alexandri' },
                { content: 'guitar' },
                { content: { questionNumber: 25 } }
              ]
            },
            {
              cells: [
                { content: 'Katja' },
                { content: { questionNumber: 26 } },
                { content: 'rock' }
              ]
            },
            {
              cells: [
                { content: 'Rachel' },
                { content: 'violin' },
                { content: { questionNumber: 27 } }
              ]
            },
            {
              cells: [
                { content: 'Harry' },
                { content: { questionNumber: 28 } },
                { content: 'opera' }
              ]
            },
            {
              cells: [
                { content: 'Emiko' },
                { content: 'flute' },
                { content: { questionNumber: 29 } }
              ]
            }
          ]
        },
        {
          type: 'sentence-completion',
          instruction: 'Write NO MORE THAN THREE WORDS to complete the sentences.',
          items: [
            {
              questionNumber: 30,
              text: 'Stimulating music speeds up our (30).........'
            },
            {
              questionNumber: 31,
              text: 'Calming music reduces our (31).........'
            }
          ]
        }
      ]
    },
    {
      sectionNumber: 4,
      title: 'Questions 32-40',
      questions: [
        {
          type: 'sentence-completion',
          instruction: 'Using NO MORE THAN THREE WORDS, answer the following questions.',
          items: [
            {
              questionNumber: 32,
              text: 'Who should take charge of the patient\'s health?'
            },
            {
              questionNumber: 33,
              text: 'What, in the speaker\'s opinion, is the single greatest threat to health?'
            },
            {
              questionNumber: 34,
              text: 'Which group in the study was most at risk of early death?'
            },
            {
              questionNumber: 35,
              text: 'Which environmental hazard does the speaker find most under-rated?'
            },
            {
              questionNumber: 36,
              text: 'What will be improved by an education campaign?'
            },
            {
              questionNumber: 37,
              text: 'Statistics quoted show that (37).........would prevent many illnesses.'
            },
            {
              questionNumber: 38,
              text: 'Exercise should be (38).........., so find someone to join you in your activity.'
            },
            {
              questionNumber: 39,
              text: 'One important way of preventing sports injury is by adequate (39).........'
            },
            {
              questionNumber: 40,
              text: 'Injuries can also be reduced by using (40).........techniques.'
            }
          ]
        }
      ]
    }
  ]
};
