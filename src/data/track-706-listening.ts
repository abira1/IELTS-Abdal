// Track: 706 Listening
import { Track } from './track1';

export const track706Listening: Track = {
  id: 'track-706-listening',
  name: '706 Listening',
  shortName: '706L',
  description: 'IELTS Listening Practice Test - Author Recommendations and Event Information',
  duration: 60,
  totalQuestions: 40,
  trackType: 'listening',
  audioURL: null,
  sections: [
    {
      sectionNumber: 1,
      title: 'Questions 1-14',
      questions: [
        {
          type: 'table-gap',
          instruction: 'Write C for Cookery, S for Sports and T for Travel.',
          title: 'Name of author',
          rows: [
            {
              label: 'Peter Adams',
              value: '(Example) S T'
            },
            {
              label: 'Stephen Bau',
              value: {
                questionNumber: 1
              }
            },
            {
              label: 'Pam Campbell',
              value: {
                questionNumber: 2
              }
            },
            {
              label: 'C. Kezik',
              value: 'S'
            },
            {
              label: 'Ari Hussein',
              value: {
                questionNumber: 3
              }
            },
            {
              label: 'Sally Innes',
              value: 'S'
            },
            {
              label: 'Meg Jorgensen',
              value: {
                questionNumber: 4
              }
            },
            {
              label: 'Bruno Murray',
              value: {
                questionNumber: 5
              }
            },
            {
              label: 'Ruby Lee',
              value: {
                questionNumber: 6
              }
            },
            {
              label: 'Jim Wells',
              value: {
                questionNumber: 7
              }
            },
            {
              label: 'Helen Yeung',
              value: {
                questionNumber: 8
              }
            }
          ]
        },
        {
          type: 'table-gap',
          instruction: 'Tick (v) if the information is correct or write in the changes.',
          title: 'Invitation to a Welcoming Lunch',
          rows: [
            {
              label: 'Item 1: AT BLACKWELL HOUSE',
              value: {
                questionNumber: 9
              }
            },
            {
              label: 'Item 2: ON FRIDAY JUNE 15 AT 8 PM',
              value: {
                questionNumber: 10
              }
            },
            {
              label: 'Item 3: FREE TRANSPORT AVAILABLE LEAVING BLACKWELL HOUSE AT 10.30',
              value: {
                questionNumber: 11
              }
            },
            {
              label: 'Item 4: OTHER STUDENTS MAY ATTEND',
              value: {
                questionNumber: 12
              }
            },
            {
              label: 'Item 5: PLEASE BRING YOUR STUDENT IDENTIFICATION CARD',
              value: {
                questionNumber: 13
              }
            },
            {
              label: 'Item 6: PLEASE REPLY BY TUESDAY IF YOU CAN COME',
              value: {
                questionNumber: 14
              }
            }
          ]
        }
      ]
    },
    {
      sectionNumber: 2,
      title: 'Questions 15-23',
      questions: [
        {
          type: 'sentence-completion',
          instruction: 'Write NO MORE THAN THREE WORDS for each answer.',
          items: [
            {
              questionNumber: 15,
              text: 'There is new road work on .........'
            },
            {
              questionNumber: 16,
              text: 'Do not use Blackwell Street because workmen are .........'
            },
            {
              questionNumber: 17,
              text: 'When you pass the roundabout, go along Brown Crescent into .........'
            },
            {
              questionNumber: 18,
              text: 'It\'s wise to use the .........'
            }
          ]
        },
        {
          type: 'drag-and-drop',
          instruction: 'Label the parts of the lawn sprinkler. Choose words from the box below. There are more words in the box than you will need.',
          imageUrl: 'https://i.postimg.cc/7ZvrRNx3/Irrigation-system-technical-diagram.png',
          items: [
            { label: 'Part A', questionNumber: 19 },
            { label: 'Part B', questionNumber: 20 },
            { label: 'Part C', questionNumber: 21 },
            { label: 'Part D', questionNumber: 22 },
            { label: 'Part E', questionNumber: 23 }
          ],
          options: [
            { label: 'holes', value: 'holes' },
            { label: 'base', value: 'base' },
            { label: 'crank', value: 'crank' },
            { label: 'hinge', value: 'hinge' },
            { label: 'hose', value: 'hose' },
            { label: 'pipe', value: 'pipe' },
            { label: 'water wheel', value: 'water wheel' },
            { label: 'spray', value: 'spray' },
            { label: 'tube', value: 'tube' },
            { label: 'handle', value: 'handle' },
            { label: 'gears', value: 'gears' },
            { label: 'guide', value: 'guide' },
            { label: 'chain', value: 'chain' },
            { label: 'guard', value: 'guard' },
            { label: 'pulley', value: 'pulley' }
          ]
        }
      ]
    },
    {
      sectionNumber: 3,
      title: 'Questions 24-29',
      questions: [
        {
          type: 'multiple-choice',
          questionNumber: 24,
          question: 'The last examinations will be held on',
          options: [
            { label: 'November 26', value: 'A' },
            { label: 'November 29', value: 'B' },
            { label: 'December 2', value: 'C' },
            { label: 'December 4', value: 'D' }
          ]
        },
        {
          type: 'multiple-choice',
          questionNumber: 25,
          question: 'Scott is going to the United States',
          options: [
            { label: 'to study', value: 'A' },
            { label: 'to teach', value: 'B' },
            { label: 'to travel', value: 'C' },
            { label: 'to visit friends', value: 'D' }
          ]
        },
        {
          type: 'multiple-choice',
          questionNumber: 26,
          question: 'The general science course in the United States is',
          options: [
            { label: 'similar', value: 'A' },
            { label: 'simple', value: 'B' },
            { label: 'difficult', value: 'C' },
            { label: 'different', value: 'D' }
          ]
        },
        {
          type: 'multiple-choice',
          questionNumber: 27,
          question: 'Linda has had an extension to',
          options: [
            { label: 'complete her assignment', value: 'A' },
            { label: 'do more research', value: 'B' },
            { label: 'study', value: 'C' },
            { label: 'go on holiday', value: 'D' }
          ]
        },
        {
          type: 'multiple-choice',
          questionNumber: 28,
          question: 'Communications and English will be examined on',
          options: [
            { label: 'December 1 morning', value: 'A' },
            { label: 'December 2 morning', value: 'B' },
            { label: 'December 1 afternoon', value: 'C' },
            { label: 'December 2 afternoon', value: 'D' }
          ]
        },
        {
          type: 'multiple-choice',
          questionNumber: 29,
          question: 'Mark finds teaching this class',
          options: [
            { label: 'boring', value: 'A' },
            { label: 'tiring', value: 'B' },
            { label: 'depressing', value: 'C' },
            { label: 'stimulating', value: 'D' }
          ]
        }
      ]
    },
    {
      sectionNumber: 4,
      title: 'Questions 30-40',
      questions: [
        {
          type: 'sentence-completion',
          instruction: 'Complete the summary. Use words from the box. There are more words in the box than you need. Some words may be used more than once.',
          items: [
            {
              questionNumber: 30,
              text: 'The most usual cause of headaches is .........'
            },
            {
              questionNumber: 31,
              text: 'Headaches can also come as a result of excessive .........'
            },
            {
              questionNumber: 32,
              text: 'Some people say they get a headache when they .........'
            },
            {
              questionNumber: 33,
              text: 'This is probably because they get very .........'
            },
            {
              questionNumber: 34,
              text: 'It may also be because they are working in poor light which makes them very .........'
            },
            {
              questionNumber: 35,
              text: 'It is also important to be .........'
            },
            {
              questionNumber: 36,
              text: 'You may even get a headache because you .........'
            },
            {
              questionNumber: 37,
              text: 'The best advice is to try to eat regular meals, get enough .........'
            },
            {
              questionNumber: 38,
              text: 'and avoid .........'
            },
            {
              questionNumber: 39,
              text: 'places. The smoke there may cause you terrible .........'
            },
            {
              questionNumber: 40,
              text: 'damage.'
            }
          ]
        }
      ]
    }
  ]
};
