// Track: 708-M Reading
import { Track } from './track1';

export const track708Reading: Track = {
  id: 'track-708-reading',
  name: '708-M Reading',
  shortName: '708MR',
  description: 'IELTS Reading Practice Test - Academic Reading with 3 parts and 40 questions',
  duration: 60,
  totalQuestions: 40,
  trackType: 'reading',
  audioURL: null,
  sections: [
    {
      sectionNumber: 1,
      title: 'READING PASSAGE 1',
      passage: {
        title: 'Thailand\'s Economic Success',
        content: `Thailand has emerged as one of Southeast Asia's most successful economies, transforming from an agricultural society to a diversified industrial nation. This remarkable development has been achieved through strategic economic policies, foreign direct investment, and a focus on manufacturing and tourism. Thailand's growth began in earnest during the 1960s when the government implemented policies aimed at industrialization. The country attracted multinational corporations seeking to establish manufacturing operations in Southeast Asia. These foreign companies brought advanced technology, management expertise, and capital to Thailand, catalyzing rapid economic growth. The textile industry became one of Thailand's primary manufacturing sectors, with numerous factories established to produce garments for export to developed nations. Over the decades, Thailand has successfully diversified its industrial base, developing strong sectors in electronics, automotive manufacturing, petrochemicals, and food processing. Tourism has also played a crucial role in Thailand's economic development. The country's natural beauty, cultural heritage, and relatively affordable prices have attracted millions of tourists annually, generating significant foreign exchange earnings. Bangkok, the capital, has developed into a major international business and tourism hub. Agriculture remains important to the Thai economy, with rice being the primary crop and Thailand maintaining its position as one of the world's leading rice exporters. However, the share of agriculture in Thailand's overall economy has declined as manufacturing and services sectors have expanded. Thailand's development model has not been without challenges. The country has experienced economic crises, most notably the 1997 Asian financial crisis, which severely impacted the Thai economy and triggered regional economic instability. Despite this setback, Thailand recovered and continued its trajectory of economic growth. More recently, Thailand faces challenges related to income inequality, education quality, and infrastructure development. Nevertheless, Thailand remains an attractive destination for foreign investment and continues to be an important economic engine in Southeast Asia.`
      },
      questions: [
        {
          type: 'drag-and-drop',
          instruction: 'Choose the most suitable heading for each section.',
          items: [
            { questionNumber: 1, label: 'Section A' },
            { questionNumber: 2, label: 'Section B' },
            { questionNumber: 3, label: 'Section C' },
            { questionNumber: 4, label: 'Section D' }
          ],
          options: [
            { label: 'Tourism\'s Important Role', value: 'i' },
            { label: 'Recent Challenges', value: 'ii' },
            { label: 'Rapid Industrialization', value: 'iii' },
            { label: 'Diverse Economy', value: 'iv' },
            { label: 'Economic Recovery', value: 'v' }
          ]
        },
        {
          type: 'paragraph-gap',
          instruction: 'Complete with words from the text (MAX 3 words).',
          paragraph: 'Thailand began industrialization in the (5)..., attracting (6)... corporations. The textile industry produced (7)... for export. Important sectors include (8)... agriculture. Tourism has generated (9)...',
          questionNumbers: [5, 6, 7, 8, 9]
        },
        {
          type: 'true-false-not-given',
          instruction: 'Do the statements agree with the information?',
          statements: [
            { questionNumber: 10, statement: 'Thailand transformed from an agricultural to an industrial society.' },
            { questionNumber: 11, statement: 'The textile industry remains Thailand\'s largest manufacturing sector.' },
            { questionNumber: 12, statement: 'Thailand is the world\'s largest rice exporter.' },
            { questionNumber: 13, statement: 'Thailand was severely impacted by the 1997 Asian financial crisis.' },
            { questionNumber: 14, statement: 'Agriculture now comprises the largest share of Thailand\'s economy.' }
          ]
        }
      ]
    },
    {
      sectionNumber: 2,
      title: 'READING PASSAGE 2',
      passage: {
        title: 'Preferred Employers',
        content: `A survey of business school graduates has revealed important insights into what makes a company an attractive employer. The survey, conducted by a leading business education institution, asked graduates about the factors that influence their career choices and workplace preferences. The findings indicate that salary and benefits remain important considerations, but they are not the primary factors influencing career decisions. Instead, graduates place high value on company culture, leadership quality, and opportunities for professional development. Career advancement opportunities ranked highly among the factors influencing workplace choices. Graduates expressed a strong preference for companies that provide clear pathways for career progression and invest in employee development. Mentorship programs and training initiatives were particularly valued. Work-life balance emerged as another significant factor in workplace preferences. Many graduates, particularly younger employees, prioritize flexibility in work arrangements and the ability to maintain a healthy balance between professional and personal commitments. Companies offering remote work options, flexible schedules, and generous leave policies were viewed more favorably. The survey also highlighted the importance of corporate social responsibility and environmental sustainability initiatives. Graduates, especially those from younger generations, are increasingly conscious of the social and environmental impact of their employers. Companies demonstrating commitment to ethical practices, community engagement, and environmental protection were rated more highly. Innovation and the opportunity to work on challenging projects also significantly influenced career decisions. Graduates sought employers that encouraged creativity, supported new ideas, and provided opportunities to work on meaningful projects that could have a positive impact. The findings suggest that contemporary business school graduates prioritize holistic workplace benefits beyond just financial compensation. Companies aiming to attract top talent must focus on creating positive workplace cultures, supporting employee development, and demonstrating social responsibility.`
      },
      questions: [
        {
          type: 'multiple-choice',
          questionNumber: 15,
          question: 'According to the survey, what is NOT the primary factor in career decisions?',
          options: [
            { label: 'Company culture', value: 'A' },
            { label: 'Salary and benefits', value: 'B' },
            { label: 'Leadership quality', value: 'C' },
            { label: 'Professional development', value: 'D' }
          ]
        },
        {
          type: 'multiple-choice',
          questionNumber: 16,
          question: 'Career advancement opportunities ranked ___',
          options: [
            { label: 'low among preferences', value: 'A' },
            { label: 'highly among preferences', value: 'B' },
            { label: 'equally with salary', value: 'C' },
            { label: 'below work-life balance', value: 'D' }
          ]
        },
        {
          type: 'paragraph-gap',
          instruction: 'Complete with words from the text (MAX 3 words).',
          paragraph: 'Graduates value companies that provide (17)... for career progression. Work-life balance includes (18)... in work arrangements. (19)... and environmental sustainability significantly influenced preferences. Graduates seek opportunities to work on (20)... projects.',
          questionNumbers: [17, 18, 19, 20]
        },
        {
          type: 'drag-and-drop',
          instruction: 'Match each factor with its description.',
          items: [
            { questionNumber: 21, label: 'Career advancement' },
            { questionNumber: 22, label: 'Work-life balance' },
            { questionNumber: 23, label: 'Social responsibility' },
            { questionNumber: 24, label: 'Innovation' }
          ],
          options: [
            { label: 'Flexibility and leave policies', value: 'A' },
            { label: 'Pathways for progression', value: 'B' },
            { label: 'Ethical practices and environmental protection', value: 'C' },
            { label: 'Challenging projects and creativity', value: 'D' }
          ]
        }
      ]
    },
    {
      sectionNumber: 3,
      title: 'READING PASSAGE 3',
      passage: {
        title: 'The Rise of Robots in the Workplace',
        content: `Robotics and automation technology is increasingly transforming the modern workplace, revolutionizing how work is performed across numerous industries. While automation has historically been associated with manufacturing, its application has expanded significantly into service sectors, healthcare, and administrative functions. The integration of robots into the workplace presents both opportunities and challenges for businesses and workers. One of the primary benefits of workplace automation is increased productivity and efficiency. Robots can perform repetitive tasks faster and more accurately than humans, reducing production errors and increasing output. In manufacturing, automated assembly lines have dramatically improved efficiency and product quality. In warehousing and logistics, robots are being deployed to handle material sorting, packing, and transportation, significantly reducing human labor requirements for these tasks. Another advantage of automation is the creation of new job categories. While robots eliminate certain jobs, they also create demand for workers with skills in robotics programming, maintenance, and operation. These new roles often command higher salaries and require more specialized training than the positions they replace. However, workplace automation also raises concerns about job displacement and economic inequality. Workers in routine, repetitive jobs face the greatest risk of displacement as their tasks become automated. This has prompted discussions about the need for workforce retraining programs and social safety nets. Additionally, the transition to an automated workplace may exacerbate income inequality if the benefits of automation are not distributed equitably. Despite these concerns, automation is likely to continue advancing as businesses seek to improve competitiveness and efficiency. The key challenge for society is to manage this transition effectively, ensuring that the benefits of automation are shared broadly and that workers displaced by automation receive adequate support and opportunities for retraining.`
      },
      questions: [
        {
          type: 'multiple-choice',
          questionNumber: 25,
          question: 'Historically, automation has been most associated with',
          options: [
            { label: 'healthcare', value: 'A' },
            { label: 'service sectors', value: 'B' },
            { label: 'manufacturing', value: 'C' },
            { label: 'administrative functions', value: 'D' }
          ]
        },
        {
          type: 'multiple-choice',
          questionNumber: 26,
          question: 'Robots in warehousing primarily handle',
          options: [
            { label: 'quality control', value: 'A' },
            { label: 'customer service', value: 'B' },
            { label: 'material sorting, packing, and transportation', value: 'C' },
            { label: 'product design', value: 'D' }
          ]
        },
        {
          type: 'paragraph-gap',
          instruction: 'Complete with words from the text (MAX 3 words).',
          paragraph: 'Robots perform tasks (27)... and (28)... than humans. Automation creates (29)... in robotics. Workers in (30)... jobs face the greatest displacement risk. Society must ensure (31)... of automation benefits.',
          questionNumbers: [27, 28, 29, 30, 31]
        },
        {
          type: 'true-false-not-given',
          instruction: 'Do the statements agree with the information?',
          statements: [
            { questionNumber: 32, statement: 'Robots reduce production errors in manufacturing.' },
            { questionNumber: 33, statement: 'All new jobs created by automation pay lower salaries.' },
            { questionNumber: 34, statement: 'Routine jobs are at greater risk of automation than specialized positions.' },
            { questionNumber: 35, statement: 'The transition to automation will inevitably increase economic inequality.' },
            { questionNumber: 36, statement: 'Automation is expected to continue advancing in the future.' }
          ]
        }
      ]
    }
  ]
};
