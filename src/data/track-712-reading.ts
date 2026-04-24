// Track: 712-M Reading
import { Track } from './track1';

export const track712Reading: Track = {
  id: 'track-712-reading',
  name: '712-M Reading',
  shortName: '712MR',
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
        title: 'On-Hold Music and Customer Experience',
        content: `Waiting on hold while listening to music is a nearly universal experience in modern customer service. However, the choice of music and audio experience during hold time has significant implications for customer satisfaction and business perception. Research in behavioral psychology and customer experience has revealed that on-hold music can significantly influence how long customers perceive they have waited and their satisfaction with the service. Studies show that customers' perception of wait time is subjective and can be substantially influenced by the presence of music. When placed on hold without any audio, customers typically perceive wait times as longer than they actually are. Conversely, appropriate music can make waiting feel less tedious and reduce the perception of time passage. The tempo and style of on-hold music can significantly affect customer psychology. Slow-tempo music can feel more soothing and help reduce customer frustration during wait periods. However, music tempo that is too slow can actually increase perceived wait time. Moderate tempo music, typically between 60 and 80 beats per minute, has been shown to create a balanced experience that is both soothing and engaging. The choice of music genre also influences customer experience. Instrumental music or soft pop typically performs better than rock or hip-hop in hold-time scenarios. Classical music, in particular, has been associated with reduced customer stress levels. Some companies have moved beyond traditional music to offer personalized hold experiences, including company jingles, brand-related audio, or informative content about products and services. These customized audio experiences can strengthen brand recognition and provide value to waiting customers. Despite the benefits of well-chosen on-hold music, many businesses continue to use default music provided by phone systems, which often lacks optimization for customer psychology. Investing in appropriate hold-time audio experiences can improve customer satisfaction, reduce perceived wait time, and enhance overall brand perception.`
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
            { label: 'Music Tempo and Perception', value: 'i' },
            { label: 'The Importance of On-Hold Audio', value: 'ii' },
            { label: 'Genre Selection and Psychology', value: 'iii' },
            { label: 'Personalized Audio Experiences', value: 'iv' },
            { label: 'Business Benefits', value: 'v' }
          ]
        },
        {
          type: 'paragraph-gap',
          instruction: 'Complete with words from the text (MAX 3 words).',
          paragraph: 'Music on hold influences customers\' (5)... of wait time. Waiting without (6)... makes time seem longer. Moderate tempo music is between (7)... beats per minute. (8)... music performs better than rock. Personalized audio can (9)...',
          questionNumbers: [5, 6, 7, 8, 9]
        },
        {
          type: 'true-false-not-given',
          instruction: 'Do the statements agree with the information?',
          statements: [
            { questionNumber: 10, statement: 'Customers accurately perceive wait time without music.' },
            { questionNumber: 11, statement: 'Slow-tempo music is ideal for on-hold situations.' },
            { questionNumber: 12, statement: 'Classical music reduces customer stress levels.' },
            { questionNumber: 13, statement: 'Most businesses use optimized hold-time audio.' },
            { questionNumber: 14, statement: 'Appropriate on-hold audio can improve brand perception.' }
          ]
        }
      ]
    },
    {
      sectionNumber: 2,
      title: 'READING PASSAGE 2',
      passage: {
        title: 'The Industrial Revolution and Tea',
        content: `The Industrial Revolution profoundly transformed global trade patterns, and few commodities exemplify this transformation more clearly than tea. The industrial revolution, beginning in 18th-century Britain, revolutionized manufacturing processes and created unprecedented demand for exotic commodities. Tea, imported from China and later grown in British colonial territories, became a symbol of British wealth and culture. The establishment of British colonies in India and Ceylon (now Sri Lanka) created vast tea plantations that supplied Europe with affordable tea. This colonial expansion, while bringing tea to the masses, came at enormous human and environmental cost. The tea industry drove significant technological innovation. The development of steam-powered machinery revolutionized textile production, enabling vast quantities of cotton and other fabrics to be manufactured. These textiles became essential trade goods used to purchase tea from China and other Asian territories. The expansion of British tea consumption was facilitated by technological advances in transportation. The construction of railways and the development of faster shipping routes reduced transportation costs and delivery times. Steam-powered ships dramatically decreased the journey time from Asia to Europe, making tea affordable for broader segments of the British population. The afternoon tea tradition, popularized during the Victorian era, became integral to British culture. However, this cultural icon was built on global trade networks that relied on colonial exploitation and widespread labor abuses. Workers on tea plantations faced harsh conditions, low wages, and limited rights. The legacy of colonial tea production persists in contemporary global trade structures, with many tea-producing nations remaining economically dependent on tea exports. The history of tea during the Industrial Revolution illustrates how technological innovation, global trade, and colonialism intertwined to shape modern economic systems.`
      },
      questions: [
        {
          type: 'multiple-choice',
          questionNumber: 15,
          question: 'The Industrial Revolution began in',
          options: [
            { label: '17th-century Britain', value: 'A' },
            { label: '18th-century Britain', value: 'B' },
            { label: '19th-century Britain', value: 'C' },
            { label: 'Colonial India', value: 'D' }
          ]
        },
        {
          type: 'multiple-choice',
          questionNumber: 16,
          question: 'British colonies in tea-growing regions included',
          options: [
            { label: 'India and Africa', value: 'A' },
            { label: 'India and Ceylon', value: 'B' },
            { label: 'Asia and the Americas', value: 'C' },
            { label: 'Australia and India', value: 'D' }
          ]
        },
        {
          type: 'paragraph-gap',
          instruction: 'Complete with words from the text (MAX 2 words).',
          paragraph: 'Technological advances in (17)... reduced costs and delivery times. (18)... made tea more affordable. The tradition of afternoon tea became integral to (19)... during the (20)...',
          questionNumbers: [17, 18, 19, 20]
        },
        {
          type: 'drag-and-drop',
          instruction: 'Match each development with its consequence.',
          items: [
            { questionNumber: 21, label: 'Steam-powered machinery' },
            { questionNumber: 22, label: 'Railway and shipping development' },
            { questionNumber: 23, label: 'Colonial tea plantations' },
            { questionNumber: 24, label: 'Afternoon tea tradition' }
          ],
          options: [
            { label: 'Made tea affordable for mass population', value: 'A' },
            { label: 'Became part of British culture', value: 'B' },
            { label: 'Revolutionized textile production', value: 'C' },
            { label: 'Reduced transportation costs', value: 'D' }
          ]
        }
      ]
    },
    {
      sectionNumber: 3,
      title: 'READING PASSAGE 3',
      passage: {
        title: 'Team-Based Learning in IT Education',
        content: `Traditional educational approaches in information technology often emphasize individual achievement and competition. However, increasingly, IT educators are recognizing the value of team-based learning approaches that better prepare students for real-world workplace environments. In professional IT settings, most significant projects involve collaborative teams of developers, designers, project managers, and other specialists. Team-based learning methodologies have been shown to improve student engagement, enhance problem-solving abilities, and develop essential soft skills including communication and teamwork. Team-based learning requires students to work collaboratively on projects, with each team member contributing specialized knowledge and skills. This approach mirrors professional IT development environments, where complex projects require diverse expertise. Students learn not only technical skills but also how to communicate effectively, resolve conflicts, and coordinate work across team members. Research has demonstrated that students who participate in team-based learning develop stronger communication skills and greater self-confidence compared to students in traditional competitive learning environments. The collaborative process helps students develop deeper understanding of technical concepts through explanation and discussion with peers. Team-based learning also exposes students to diverse perspectives and problem-solving approaches. Students working in teams encounter different viewpoints and methodologies, broadening their understanding of how technical problems can be solved. This exposure to diversity in thinking enhances creativity and innovation. However, implementing team-based learning presents challenges. Students must be taught how to work effectively in teams, as many lack prior experience in collaborative projects. Unequal effort distribution among team members, often called "free-riding," can undermine the effectiveness of team projects. Instructors must implement systems to ensure fair evaluation and prevent exploitation. Despite these challenges, team-based learning is increasingly recognized as essential preparation for IT professionals. As the IT industry continues to emphasize collaborative development practices, educational programs that incorporate team-based learning produce graduates better equipped to succeed in professional environments.`
      },
      questions: [
        {
          type: 'multiple-choice',
          questionNumber: 25,
          question: 'Team-based learning is particularly valuable for IT education because',
          options: [
            { label: 'it reduces teaching workload', value: 'A' },
            { label: 'it mirrors professional workplace environments', value: 'B' },
            { label: 'it is less expensive to implement', value: 'C' },
            { label: 'it guarantees higher grades', value: 'D' }
          ]
        },
        {
          type: 'multiple-choice',
          questionNumber: 26,
          question: 'The "free-riding" problem in team-based learning refers to',
          options: [
            { label: 'using public transportation', value: 'A' },
            { label: 'unequal effort distribution among team members', value: 'B' },
            { label: 'not attending class regularly', value: 'C' },
            { label: 'copying other students\' work', value: 'D' }
          ]
        },
        {
          type: 'paragraph-gap',
          instruction: 'Complete with words from the text (MAX 3 words).',
          paragraph: 'Team-based learning develops (27)... and problem-solving abilities. Collaborative work helps students develop (28)... understanding. Exposure to diverse perspectives enhances (29)... Students must be taught (30)... to work effectively. Team-based learning produces (31)...',
          questionNumbers: [27, 28, 29, 30, 31]
        },
        {
          type: 'true-false-not-given',
          instruction: 'Do the statements agree with the information?',
          statements: [
            { questionNumber: 32, statement: 'Traditional IT education emphasizes individual achievement.' },
            { questionNumber: 33, statement: 'Most IT projects in professional settings are completed by individuals.' },
            { questionNumber: 34, statement: 'Team-based learning improves communication skills development.' },
            { questionNumber: 35, statement: 'All students naturally excel at team-based projects.' },
            { questionNumber: 36, statement: 'The IT industry emphasizes collaborative development practices.' },
            { questionNumber: 37, statement: 'Team-based learning eliminates the need for individual testing.' }
          ]
        }
      ]
    }
  ]
};
