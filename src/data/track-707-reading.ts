// Track: 707-M Reading
import { Track } from './track1';

export const track707Reading: Track = {
  id: 'track-707-reading',
  name: '707-M Reading',
  shortName: '707MR',
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
        title: 'Money Transfers and Mobile Phones in Kenya',
        content: `In Kenya, a technological innovation is changing the way people transfer money. Safaricom, the largest mobile phone operator in the East African nation, has partnered with various banks and money transfer organizations to create a simple payment system called M-Pesa. The system allows people to send and receive money using text messages on their mobile phones. Users register at authorized retail outlets and are given an ID code that links them to their phone number. To send money, a user simply texts their recipient's phone number and the amount, and the money is instantly transferred to the recipient's account. The recipient can then collect the cash from any authorized outlet. This system has revolutionized money transfer in Kenya, where access to traditional banking services is limited in many rural areas. The M-Pesa system has attracted over 2 million users within its first year of operation. The system charges a small fee for each transaction, which varies depending on the amount being sent. For example, sending 1000 Kenyan shillings costs 38 shillings in fees, while sending 35000 shillings costs 398 shillings. Despite the fees, the system remains popular because it is much faster and cheaper than traditional money transfer methods. The system has also had an unexpected social benefit. Previously, many people in rural Kenya were unable to access the financial system. Now, through M-Pesa, people who do not have bank accounts can save money and participate in the financial system. Women, who make up a significant portion of M-Pesa users, have benefited particularly, gaining greater financial independence and the ability to start small businesses. The success of M-Pesa has led to the introduction of similar systems in other East African countries and has attracted the interest of mobile phone operators around the world. Several African countries are now exploring the implementation of similar services, and the system is being studied as a model for developing nations seeking to provide financial services to their populations.`
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
            { label: 'How the System Works', value: 'i' },
            { label: 'Wide Reaching Impact', value: 'ii' },
            { label: 'A New Innovation in Kenya', value: 'iii' },
            { label: 'Cost and Speed Advantages', value: 'iv' },
            { label: 'Future Expansion', value: 'v' }
          ]
        },
        {
          type: 'paragraph-gap',
          instruction: 'Complete with words from the text (MAX 3 words).',
          paragraph: 'Users of M-Pesa register at (5)... and receive (6)... that links to their phone. To send money, users text (7)... and the amount. The system charges (8)... for each transaction. The system benefits (9)... particularly.',
          questionNumbers: [5, 6, 7, 8, 9]
        },
        {
          type: 'true-false-not-given',
          instruction: 'Do the statements agree with the information?',
          statements: [
            { questionNumber: 10, statement: 'All people in Kenya have access to banking services.' },
            { questionNumber: 11, statement: 'M-Pesa allows users to transfer money using text messages.' },
            { questionNumber: 12, statement: 'The system charges the same fee regardless of the amount sent.' },
            { questionNumber: 13, statement: 'Women have become more financially independent through M-Pesa.' },
            { questionNumber: 14, statement: 'M-Pesa is only available in Kenya.' }
          ]
        }
      ]
    },
    {
      sectionNumber: 2,
      title: 'READING PASSAGE 2',
      passage: {
        title: 'Parking in Modern Cities',
        content: `Parking has become one of the most pressing challenges in modern urban centers. As cities grow and automobile ownership increases, finding a parking space has become a time-consuming and frustrating task for many drivers. Studies show that drivers in major cities spend an average of 30 minutes searching for a parking space, and this inefficiency contributes significantly to traffic congestion, pollution, and wasted fuel. One innovative approach to solving the parking problem is the implementation of smart parking systems. These systems use sensors and real-time information technology to help drivers find available parking spaces quickly and efficiently. Smart parking systems can reduce the time spent searching for parking by up to 30%, according to recent studies. Some cities have implemented dynamic pricing for parking, where the cost of parking varies depending on demand. In areas with high demand, parking is more expensive, while in areas with low demand, it is cheaper. This approach encourages drivers to park in less congested areas and distributes parking demand more evenly throughout the city. Other solutions include the development of multi-story parking facilities and the promotion of alternative transportation methods such as public transit and cycling. Additionally, some cities have restricted vehicle access to certain areas, creating car-free zones that encourage walking and the use of alternative transportation. The most successful approach to addressing the parking crisis likely involves a combination of these strategies, tailored to the specific needs and characteristics of each city.`
      },
      questions: [
        {
          type: 'multiple-choice',
          instruction: 'Choose the correct letter A, B, C or D.',
          questionNumber: 15,
          question: 'According to the passage, drivers spend on average ___ searching for parking.',
          options: [
            { label: '20 minutes', value: 'A' },
            { label: '30 minutes', value: 'B' },
            { label: '40 minutes', value: 'C' },
            { label: '50 minutes', value: 'D' }
          ]
        },
        {
          type: 'multiple-choice',
          instruction: 'Choose the correct letter A, B, C or D.',
          questionNumber: 16,
          question: 'Smart parking systems can reduce search time by',
          options: [
            { label: 'up to 20%', value: 'A' },
            { label: 'up to 30%', value: 'B' },
            { label: 'up to 40%', value: 'C' },
            { label: 'up to 50%', value: 'D' }
          ]
        },
        {
          type: 'paragraph-gap',
          instruction: 'Complete with words from the text (MAX 2 words).',
          paragraph: 'Dynamic pricing encourages drivers to park in areas with (17)... demand. Multi-story parking facilities and (18)... are alternative solutions. Car-free zones encourage (19)... and alternative transportation. The most successful approach likely involves (20)... of different strategies.',
          questionNumbers: [17, 18, 19, 20]
        },
        {
          type: 'drag-and-drop',
          instruction: 'Match each solution with its benefit.',
          items: [
            { questionNumber: 21, label: 'Smart parking systems' },
            { questionNumber: 22, label: 'Dynamic pricing' },
            { questionNumber: 23, label: 'Car-free zones' },
            { questionNumber: 24, label: 'Alternative transportation' }
          ],
          options: [
            { label: 'Reduces search time', value: 'A' },
            { label: 'Distributes parking demand', value: 'B' },
            { label: 'Encourages walking', value: 'C' },
            { label: 'Reduces traffic congestion', value: 'D' }
          ]
        }
      ]
    },
    {
      sectionNumber: 3,
      title: 'READING PASSAGE 3',
      passage: {
        title: 'LED Technology and Energy Efficiency',
        content: `LED (Light-Emitting Diode) technology represents a significant advancement in lighting solutions, offering numerous advantages over traditional incandescent and fluorescent bulbs. LEDs are highly energy-efficient, consuming approximately 75% less energy than incandescent bulbs while producing the same amount of light. This energy efficiency translates to lower electricity bills for consumers and reduced environmental impact. Another major advantage of LED technology is its longevity. LED bulbs can last up to 25 times longer than incandescent bulbs, with some lasting up to 50,000 hours of use. This extended lifespan means fewer replacements and reduced waste. Additionally, LED bulbs generate less heat than traditional bulbs, making them safer to handle and reducing cooling costs in buildings. LEDs are also available in various colors and can be dimmed, allowing for greater flexibility in lighting design. The declining cost of LED technology has made it increasingly affordable for consumers. The price of LED bulbs has dropped significantly over the past decade, making them more competitive with traditional lighting solutions. Many governments have implemented LED lighting initiatives and incentives to encourage their adoption. For example, some countries offer rebates or tax credits for consumers who switch to LED lighting. Furthermore, LED technology is being integrated into various applications beyond general lighting, including automotive lighting, display screens, and medical devices. The transition to LED lighting is part of a broader global movement toward sustainability and energy efficiency. As more consumers and businesses adopt LED technology, the environmental benefits will continue to accumulate.`
      },
      questions: [
        {
          type: 'multiple-choice',
          instruction: 'Choose the correct letter A, B, C or D.',
          questionNumber: 25,
          question: 'LED bulbs consume approximately ___ less energy than incandescent bulbs.',
          options: [
            { label: '50%', value: 'A' },
            { label: '60%', value: 'B' },
            { label: '75%', value: 'C' },
            { label: '90%', value: 'D' }
          ]
        },
        {
          type: 'multiple-choice',
          instruction: 'Choose the correct letter A, B, C or D.',
          questionNumber: 26,
          question: 'LED bulbs can last up to ___ times longer than incandescent bulbs.',
          options: [
            { label: '10', value: 'A' },
            { label: '15', value: 'B' },
            { label: '20', value: 'C' },
            { label: '25', value: 'D' }
          ]
        },
        {
          type: 'paragraph-gap',
          instruction: 'Complete with words from the text (MAX 2 words).',
          paragraph: 'LEDs consume significantly (27)... energy than traditional bulbs. LED bulbs generate (28)... heat and can be (29)... Various (30)... have encouraged LED adoption through rebates and tax credits. LED technology is being integrated into (31)...',
          questionNumbers: [27, 28, 29, 30, 31]
        },
        {
          type: 'true-false-not-given',
          instruction: 'Do the statements agree with the information?',
          statements: [
            { questionNumber: 32, statement: 'LED bulbs are more expensive than all traditional lighting solutions.' },
            { questionNumber: 33, statement: 'LED technology has applications beyond general lighting.' },
            { questionNumber: 34, statement: 'LED bulbs generate more heat than incandescent bulbs.' },
            { questionNumber: 35, statement: 'Most consumers have already switched to LED lighting.' },
            { questionNumber: 36, statement: 'LED technology is environmentally friendly.' }
          ]
        }
      ]
    }
  ]
};
