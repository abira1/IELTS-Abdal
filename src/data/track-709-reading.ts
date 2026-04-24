// Track: 709-M Reading
import { Track } from './track1';

export const track709Reading: Track = {
  id: 'track-709-reading',
  name: '709-M Reading',
  shortName: '709MR',
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
        title: 'Afternoon Naps and Productivity',
        content: `Sleep researchers have long recognized the importance of adequate nighttime sleep for health and cognitive function. However, recent research has also highlighted the benefits of strategic daytime napping. Studies conducted at leading sleep research centers have demonstrated that even brief afternoon naps can significantly enhance alertness, memory consolidation, and cognitive performance. In Spain and other Mediterranean countries, the tradition of the siesta—a midday nap—has been practiced for centuries. These cultures recognized intuitively what modern sleep science is confirming: a strategic afternoon nap can restore mental energy and improve productivity. Many Spanish workers traditionally take a 20 to 40-minute nap after lunch, returning to work refreshed and more mentally acute. The benefits of napping have caught the attention of progressive companies worldwide. Some major corporations now provide dedicated nap spaces for employees, acknowledging that brief rest periods can improve workplace productivity and reduce errors. Google, Nike, and other leading companies have incorporated nap rooms into their office environments. Research has shown that a 20-minute nap can restore cognitive function comparable to additional nighttime sleep. More extended naps of 60 to 90 minutes can facilitate memory consolidation and creative problem-solving by allowing the brain to enter deeper sleep stages. However, longer naps can leave individuals feeling groggy upon awakening, a phenomenon called sleep inertia. The timing of naps is important. Naps taken in early afternoon, typically between 1 and 3 PM, are generally most effective for restoring alertness. Napping later in the day may interfere with nighttime sleep quality. Furthermore, individual differences in circadian rhythms mean that optimal nap timing varies from person to person. Despite the growing evidence supporting the benefits of napping, cultural attitudes toward daytime sleep vary significantly across different regions. In some cultures, napping is viewed as a sign of laziness or poor work ethic. Changing these cultural perceptions represents an important challenge in promoting the health and productivity benefits of strategic napping.`
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
            { label: 'Optimal Timing and Duration', value: 'i' },
            { label: 'Scientific Benefits of Napping', value: 'ii' },
            { label: 'Corporate Recognition', value: 'iii' },
            { label: 'Traditional Practice in Mediterranean Countries', value: 'iv' },
            { label: 'Cultural Barriers to Acceptance', value: 'v' }
          ]
        },
        {
          type: 'paragraph-gap',
          instruction: 'Complete with words from the text (MAX 3 words).',
          paragraph: 'A 20-minute nap can restore (5)... comparable to nighttime sleep. A (6)... nap allows deeper sleep stages. Sleep (7)... occurs after longer naps. Optimal nap timing is typically (8)... The benefits of napping vary due to (9)...',
          questionNumbers: [5, 6, 7, 8, 9]
        },
        {
          type: 'true-false-not-given',
          instruction: 'Do the statements agree with the information?',
          statements: [
            { questionNumber: 10, statement: 'The siesta tradition originated in Spain.' },
            { questionNumber: 11, statement: 'A 20-minute nap is more effective than a 90-minute nap.' },
            { questionNumber: 12, statement: 'Google and Nike provide nap rooms for employees.' },
            { questionNumber: 13, statement: 'Afternoon naps should be taken between 4 and 6 PM.' },
            { questionNumber: 14, statement: 'All cultures view daytime napping positively.' }
          ]
        }
      ]
    },
    {
      sectionNumber: 2,
      title: 'READING PASSAGE 2',
      passage: {
        title: 'Homeopathy: Fact or Fiction',
        content: `Homeopathy is a form of alternative medicine that has attracted significant interest and controversy in recent decades. Developed in the late 18th century by German physician Samuel Hahnemann, homeopathy is based on the principle of "like cures like"—the idea that a substance that causes symptoms in a healthy person can cure those same symptoms in a sick person. Homeopathic remedies are created through a process of serial dilution, where a substance is repeatedly diluted in water or alcohol. Despite the extreme dilutions used in homeopathic preparations, some of which contain no molecules of the original substance, practitioners claim these remedies retain therapeutic properties through a concept called "water memory." The scientific community remains highly skeptical of homeopathy's efficacy. Multiple large-scale clinical trials have found no evidence that homeopathic remedies work better than placebo treatments. The principles underlying homeopathy contradict established principles of chemistry and physics. Despite this scientific consensus, homeopathy remains popular in many countries. In Europe, particularly in countries like Germany, France, and Switzerland, homeopathy has achieved mainstream acceptance and integration into healthcare systems in some cases. In India, homeopathy is a recognized and regulated medical practice. The popularity of homeopathy can be attributed to several factors. Many patients report experiencing symptom improvement after using homeopathic remedies, though this can be explained by placebo effects, natural disease recovery, and the extended consultation time homeopaths typically provide. Additionally, some patients prefer homeopathy's gentle approach and the philosophical emphasis on treating the whole person rather than isolated symptoms. The debate surrounding homeopathy reflects broader tensions in healthcare between conventional medicine and alternative therapies. While mainstream medicine demands rigorous clinical evidence, some patients seek alternatives that align with their personal beliefs or offer a different approach to health and wellness.`
      },
      questions: [
        {
          type: 'multiple-choice',
          questionNumber: 15,
          question: 'Homeopathy was developed by',
          options: [
            { label: 'a French physician', value: 'A' },
            { label: 'a German physician', value: 'B' },
            { label: 'an English physician', value: 'C' },
            { label: 'an Italian physician', value: 'D' }
          ]
        },
        {
          type: 'multiple-choice',
          questionNumber: 16,
          question: 'The principle of "like cures like" means',
          options: [
            { label: 'curing similar diseases requires similar treatments', value: 'A' },
            { label: 'a substance causing symptoms can cure those same symptoms', value: 'B' },
            { label: 'treatment must be customized to each patient', value: 'C' },
            { label: 'natural remedies are more effective than synthetic drugs', value: 'D' }
          ]
        },
        {
          type: 'paragraph-gap',
          instruction: 'Complete with words from the text (MAX 2 words).',
          paragraph: 'Homeopathic remedies are created through (17)... Extreme dilutions may contain (18)... of the original substance. The scientific community considers homeopathy (19)... Clinical trials show homeopathy works (20)... than placebo. Homeopathy is recognized in (21)... and Switzerland.',
          questionNumbers: [17, 18, 19, 20, 21]
        },
        {
          type: 'drag-and-drop',
          instruction: 'Match reasons for homeopathy\'s popularity.',
          items: [
            { questionNumber: 22, label: 'Patient symptom improvement' },
            { questionNumber: 23, label: 'Patient preferences' },
            { questionNumber: 24, label: 'Treatment philosophy' },
            { questionNumber: 25, label: 'Consultation quality' }
          ],
          options: [
            { label: 'Placebo effect and natural recovery', value: 'A' },
            { label: 'Gentle approach preferred', value: 'B' },
            { label: 'Extended time with practitioners', value: 'C' },
            { label: 'Whole-person treatment emphasis', value: 'D' }
          ]
        }
      ]
    },
    {
      sectionNumber: 3,
      title: 'READING PASSAGE 3',
      passage: {
        title: 'Hemp: A Versatile Plant',
        content: `Hemp, derived from the Cannabis sativa plant, has been used by humans for thousands of years. Historically, hemp was cultivated extensively for fiber production, with the strong fibers used to create textiles, rope, and canvas. Hemp's versatility extends far beyond fiber production. The plant produces seeds that are rich in protein, omega-3 and omega-6 fatty acids, making hemp seeds a nutritious food source. Hemp seed oil has been used in traditional medicine and modern nutritional supplements. In recent years, hemp has gained attention for its potential applications in producing cannabidiol (CBD), a non-psychoactive compound with potential therapeutic properties. CBD derived from hemp has been studied for its potential benefits in treating anxiety, chronic pain, and epilepsy, though more research is needed to establish efficacy. The legalization of hemp cultivation in many countries has spurred agricultural and commercial interest in the plant. Farmers have begun growing hemp as a commercial crop, though regulations vary significantly across different regions. In the European Union, hemp cultivation for fiber and seed production is legally permitted, with strict regulations on THC (tetrahydrocannabinol) content. In the United States, hemp cultivation was legalized at the federal level in 2018, leading to rapid expansion of the hemp industry. The environmental benefits of hemp cultivation are noteworthy. Hemp requires minimal pesticides and fertilizers compared to many conventional crops. Additionally, hemp cultivation can improve soil health through crop rotation. Hemp also grows relatively quickly and requires less water than many alternative crops. Despite its potential, the hemp industry faces challenges related to regulatory uncertainty, standardization of hemp-derived products, and public perception influenced by the plant's association with cannabis. Nevertheless, hemp represents a promising crop for sustainable agriculture and a source of diverse products with potential health and industrial applications.`
      },
      questions: [
        {
          type: 'multiple-choice',
          questionNumber: 26,
          question: 'Hemp seeds are rich in',
          options: [
            { label: 'fiber and cellulose', value: 'A' },
            { label: 'protein and fatty acids', value: 'B' },
            { label: 'THC and CBD', value: 'C' },
            { label: 'pesticides and fertilizers', value: 'D' }
          ]
        },
        {
          type: 'multiple-choice',
          questionNumber: 27,
          question: 'Hemp cultivation was legalized at the federal level in the US in',
          options: [
            { label: '2008', value: 'A' },
            { label: '2015', value: 'B' },
            { label: '2018', value: 'C' },
            { label: '2020', value: 'D' }
          ]
        },
        {
          type: 'paragraph-gap',
          instruction: 'Complete with words from the text (MAX 2 words).',
          paragraph: 'Hemp fibers are historically used for (28)... and rope. CBD is a (29)... compound from hemp. Hemp requires (30)... pesticides than conventional crops. Hemp grows (31)... and needs less (32)...',
          questionNumbers: [28, 29, 30, 31, 32]
        },
        {
          type: 'true-false-not-given',
          instruction: 'Do the statements agree with the information?',
          statements: [
            { questionNumber: 33, statement: 'Hemp has been used by humans for thousands of years.' },
            { questionNumber: 34, statement: 'CBD is a psychoactive compound.' },
            { questionNumber: 35, statement: 'All countries permit hemp cultivation without restrictions.' },
            { questionNumber: 36, statement: 'Hemp cultivation improves soil health.' },
            { questionNumber: 37, statement: 'Hemp is associated only with therapeutic applications.' },
            { questionNumber: 38, statement: 'The hemp industry faces regulatory challenges.' }
          ]
        }
      ]
    }
  ]
};
