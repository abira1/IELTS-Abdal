// Track: 707 Listening
import { Track } from './track1';

export const track707Listening: Track = {
  id: 'track-707-listening',
  name: '707 Listening',
  shortName: '707L',
  description: 'IELTS Listening Practice Test - Photo Digitization Services and School Facilities',
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
          type: 'sentence-completion',
          instruction: 'Write ONE WORD AND/OR A NUMBER for each answer.',
          title: 'Copying photos to digital format - Picturerep',
          items: [
            {
              questionNumber: 1,
              text: 'Photos must not be in a (1).........'
            },
            {
              questionNumber: 2,
              text: 'The cost for 360 photos is 2 £ (2).........'
            },
            {
              questionNumber: 3,
              text: 'Before the complete order is sent, (3).........'
            },
            {
              questionNumber: 4,
              text: 'Photos can be placed in a folder, e.g. with the name (4).........'
            },
            {
              questionNumber: 5,
              text: 'The (5).........and contrast can be improved if necessary.'
            },
            {
              questionNumber: 6,
              text: 'Photos which are very fragile will be scanned by (6).........'
            },
            {
              questionNumber: 7,
              text: 'It may be possible to remove an object from a photo, or change the (7).........'
            },
            {
              questionNumber: 8,
              text: 'A photo which is not correctly in (8).........cannot be fixed.'
            },
            {
              questionNumber: 9,
              text: 'Orders are completed within (9).........'
            },
            {
              questionNumber: 10,
              text: 'Send the photos in a box (not (10).........).'
            }
          ]
        }
      ]
    },
    {
      sectionNumber: 2,
      title: 'Questions 11-20',
      questions: [
        {
          type: 'multiple-choice',
          questionNumber: 11,
          question: 'Dartfield House school used to be',
          options: [
            { label: 'a tourist information centre', value: 'A' },
            { label: 'a private home', value: 'B' },
            { label: 'a local council building', value: 'C' }
          ]
        },
        {
          type: 'multiple-choice',
          questionNumber: 12,
          question: 'What is planned with regard to the lower school?',
          options: [
            { label: 'All buildings on the main site will be improved', value: 'A' },
            { label: 'The lower school site will be used for new homes', value: 'B' },
            { label: 'Additional school buildings will be constructed on the lower school site', value: 'C' }
          ]
        },
        {
          type: 'multiple-choice',
          questionNumber: 13,
          question: 'The catering has been changed because of',
          options: [
            { label: 'long queuing times', value: 'A' },
            { label: 'changes to the school timetable', value: 'B' },
            { label: 'dissatisfaction with the menus', value: 'C' }
          ]
        },
        {
          type: 'multiple-choice',
          questionNumber: 14,
          question: 'Parents are asked to',
          options: [
            { label: 'help their children to decide in advance which serving point to use', value: 'A' },
            { label: 'make sure their children have enough money for food', value: 'B' },
            { label: 'advise their children on healthy food to eat', value: 'C' }
          ]
        },
        {
          type: 'multiple-choice',
          questionNumber: 15,
          question: 'What does the speaker say about the existing canteen?',
          options: [
            { label: 'Food will still be served there', value: 'A' },
            { label: 'Only staff will have access to it', value: 'B' },
            { label: 'Pupils can take their food into it', value: 'C' }
          ]
        },
        {
          type: 'drag-and-drop',
          instruction: 'What comment does the speaker make about each of the following serving points in the Food Hall? Choose THREE answers from the box.',
          items: [
            { label: 'World Adventures', questionNumber: 16 },
            { label: 'Street Life', questionNumber: 17 },
            { label: 'Speedy Italian', questionNumber: 18 }
          ],
          options: [
            { label: 'pupils help to plan menus', value: 'A' },
            { label: 'only vegetarian food', value: 'B' },
            { label: 'different food every week', value: 'C' },
            { label: 'daily change in menu', value: 'D' }
          ]
        },
        {
          type: 'multiple-choice-multi-select',
          instruction: 'Choose TWO letters, A-E.',
          question: 'Which TWO optional after-school lessons are new?',
          questionNumbers: [19, 20],
          maxSelections: 2,
          options: [
            { label: 'swimming', value: 'A' },
            { label: 'piano', value: 'B' },
            { label: 'acting', value: 'C' },
            { label: 'cycling', value: 'D' },
            { label: 'theatre sound and lighting', value: 'E' }
          ]
        }
      ]
    },
    {
      sectionNumber: 3,
      title: 'Questions 21-30',
      questions: [
        {
          type: 'multiple-choice',
          questionNumber: 21,
          question: 'Luke read that one reason why we often forget dreams is that',
          options: [
            { label: 'our memories cannot cope with too much information', value: 'A' },
            { label: 'we might otherwise be confused about what is real', value: 'B' },
            { label: 'we do not think they are important', value: 'C' }
          ]
        },
        {
          type: 'multiple-choice',
          questionNumber: 22,
          question: 'What do Luke and Susie agree about dreams predicting the future?',
          options: [
            { label: 'It may just be due to chance', value: 'A' },
            { label: 'It only happens with certain types of event', value: 'B' },
            { label: 'It happens more often than some people think', value: 'C' }
          ]
        },
        {
          type: 'multiple-choice',
          questionNumber: 23,
          question: 'Susie says that a study on pre-school children having a short nap in the day',
          options: [
            { label: 'had controversial results', value: 'A' },
            { label: 'used faulty research methodology', value: 'B' },
            { label: 'failed to reach any clear conclusions', value: 'C' }
          ]
        },
        {
          type: 'multiple-choice',
          questionNumber: 24,
          question: 'In their last assignment, both students had problems with',
          options: [
            { label: 'statistical analysis', value: 'A' },
            { label: 'making an action plan', value: 'B' },
            { label: 'self-assessment', value: 'C' }
          ]
        },
        {
          type: 'flowchart',
          instruction: 'Write ONE WORD ONLY for each answer.',
          title: 'Assignment plan',
          steps: [
            {
              text: 'Decide on research question: Is there a relationship between hours of sleep and number of dreams?'
            },
            {
              questionNumber: 25,
              text: 'Decide on sample: Twelve students from the (25).........'
            },
            {
              text: 'Decide on methodology: Self-reporting'
            },
            {
              questionNumber: 26,
              text: 'Decide on procedure: Answers on (26).........'
            },
            {
              questionNumber: 27,
              text: 'Check ethical guidelines for working with (27).........'
            },
            {
              questionNumber: 28,
              text: 'Ensure that risk is assessed and (28).........is kept to a minimum'
            },
            {
              text: 'Analyse the results: Calculate the correlation'
            },
            {
              questionNumber: 29,
              text: 'Make a (29).........'
            },
            {
              questionNumber: 30,
              text: '(30).........the research'
            }
          ],
          options: []
        }
      ]
    },
    {
      sectionNumber: 4,
      title: 'Questions 31-40',
      questions: [
        {
          type: 'sentence-completion',
          instruction: 'Write ONE WORD ONLY for each answer.',
          title: 'Health benefits of dance',
          items: [
            {
              questionNumber: 31,
              text: 'An experiment on university students suggested that dance increases (31).........'
            },
            {
              questionNumber: 32,
              text: 'For those with mental illness, dance could be used as a form of (32).........'
            },
            {
              questionNumber: 33,
              text: 'accessible for people with low levels of (33).........'
            },
            {
              questionNumber: 34,
              text: 'better (34).........reduces the risk of accidents'
            },
            {
              questionNumber: 35,
              text: 'improves (35).........function by making it work faster'
            },
            {
              questionNumber: 36,
              text: 'gives people more (36).........to take exercise'
            },
            {
              questionNumber: 37,
              text: 'can lessen the feeling of (37).........., very common in older people'
            },
            {
              questionNumber: 38,
              text: 'doing Zumba for 40 minutes uses up as many (38).........as other quite intense forms of exercise'
            },
            {
              questionNumber: 39,
              text: 'women suffering from (39).........benefited from doing Zumba'
            },
            {
              questionNumber: 40,
              text: 'Zumba became a (40).........for the participants'
            }
          ]
        }
      ]
    }
  ]
};
