// Track: 710-M Reading
import { Track } from './track1';

export const track710Reading: Track = {
  id: 'track-710-reading',
  name: '710-M Reading',
  shortName: '710MR',
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
        title: 'Frogwatch: Monitoring Amphibian Populations',
        content: `Amphibians, including frogs, toads, and salamanders, are among the most sensitive indicators of environmental health. These creatures depend on both aquatic and terrestrial environments and are particularly vulnerable to pollution, habitat loss, and climate change. In recent decades, amphibian populations worldwide have experienced dramatic declines, prompting scientists and conservation organizations to develop monitoring programs. Frogwatch is a citizen science initiative that engages members of the public in monitoring frog populations. Volunteers record frog calls during breeding season, contributing data to a centralized database. The program has been implemented in various countries including Australia, the United States, and Europe. Frogwatch volunteers use standardized protocols to identify frog species based on their distinctive calls. Each frog species produces a unique call pattern, allowing trained volunteers to identify species without requiring visual confirmation. This acoustic monitoring method is particularly valuable in wetland habitats where visual observation can be difficult. The data collected through Frogwatch programs provides valuable insights into population trends and the distribution of frog species. Changes in frog populations can indicate broader environmental changes, making this information crucial for conservation efforts. Declining frog populations may signal deteriorating environmental conditions, including water pollution, habitat degradation, or climate-related changes. The program also raises public awareness about amphibians and their ecological importance. By participating in Frogwatch, volunteers develop a deeper understanding of local ecosystems and become advocates for amphibian conservation. This increased public engagement has contributed to policy discussions and conservation initiatives in various regions. Despite the value of citizen science programs like Frogwatch, they face challenges related to data quality, volunteer training, and program sustainability. Ensuring consistent data collection methods and maintaining volunteer engagement over time remain ongoing concerns for program administrators.`
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
            { label: 'Population Decline Indicators', value: 'i' },
            { label: 'Public Awareness and Engagement', value: 'ii' },
            { label: 'Acoustic Monitoring Methods', value: 'iii' },
            { label: 'Program Challenges and Sustainability', value: 'iv' },
            { label: 'Data Collection and Analysis', value: 'v' }
          ]
        },
        {
          type: 'paragraph-gap',
          instruction: 'Complete with words from the text (MAX 3 words).',
          paragraph: 'Amphibians depend on (5)... and (6)... environments. Frogwatch volunteers record (7)... during breeding season. Frog species can be identified by their (8)... Declining frog populations indicate (9)...',
          questionNumbers: [5, 6, 7, 8, 9]
        },
        {
          type: 'true-false-not-given',
          instruction: 'Do the statements agree with the information?',
          statements: [
            { questionNumber: 10, statement: 'Amphibians are sensitive indicators of environmental health.' },
            { questionNumber: 11, statement: 'Frogwatch is only implemented in Australia.' },
            { questionNumber: 12, statement: 'Visual observation is the primary monitoring method used by Frogwatch.' },
            { questionNumber: 13, statement: 'Frogwatch data helps track frog population trends.' },
            { questionNumber: 14, statement: 'Volunteer engagement is not a concern for Frogwatch programs.' }
          ]
        }
      ]
    },
    {
      sectionNumber: 2,
      title: 'READING PASSAGE 2',
      passage: {
        title: 'Understanding Hypnotism',
        content: `Hypnotism, also known as hypnosis, is a state of focused attention and heightened suggestibility in which a person is guided by a hypnotist toward specific thoughts, feelings, or behaviors. Despite popular misconceptions perpetuated by media depictions, hypnosis is not a form of sleep or loss of consciousness. Rather, individuals under hypnosis remain conscious and aware, though their focus is narrowed and their critical judgment may be temporarily suspended. The history of hypnotism dates back centuries, with various forms of trance induction practiced in ancient cultures. Modern hypnotism emerged in the late 18th century with Franz Anton Mesmer, who developed "mesmerism," a precursor to contemporary hypnotherapy. Mesmer believed that illnesses resulted from imbalances in a universal magnetic force, and that hypnotic induction could restore balance. While Mesmer's theories about magnetic forces were ultimately discredited, his techniques influenced the development of modern hypnotherapy. Contemporary hypnotherapists use hypnosis to treat various psychological and psychosomatic conditions, including anxiety, phobias, chronic pain, and smoking cessation. Research has demonstrated that hypnotherapy can be effective for certain conditions, particularly when combined with other therapeutic approaches. The mechanisms underlying hypnosis remain not fully understood, though research suggests involvement of specific brain regions and neurotransmitter systems. Hypnosis works by inducing a state of focused attention where the conscious, critical mind is less active, allowing suggestions to reach the subconscious mind more directly. Despite the potential therapeutic benefits, hypnotherapy should not be considered a substitute for conventional medical or psychological treatment. Individuals should seek hypnotherapy only from qualified professionals and in conjunction with appropriate medical care.`
      },
      questions: [
        {
          type: 'multiple-choice',
          questionNumber: 15,
          question: 'Hypnosis is best described as',
          options: [
            { label: 'a form of sleep', value: 'A' },
            { label: 'a state of focused attention and heightened suggestibility', value: 'B' },
            { label: 'loss of consciousness', value: 'C' },
            { label: 'unconscious mind control', value: 'D' }
          ]
        },
        {
          type: 'multiple-choice',
          questionNumber: 16,
          question: 'Franz Anton Mesmer believed illnesses resulted from',
          options: [
            { label: 'bacterial infections', value: 'A' },
            { label: 'imbalances in a universal magnetic force', value: 'B' },
            { label: 'poor diet and exercise', value: 'C' },
            { label: 'psychological trauma', value: 'D' }
          ]
        },
        {
          type: 'paragraph-gap',
          instruction: 'Complete with words from the text (MAX 2 words).',
          paragraph: 'During hypnosis, a person\'s (17)... is narrowed. Mesmer developed (18)..., a precursor to modern hypnotherapy. Contemporary hypnotherapists treat conditions including (19)... and smoking cessation. Hypnotherapy works by reducing (20)...',
          questionNumbers: [17, 18, 19, 20]
        },
        {
          type: 'drag-and-drop',
          instruction: 'Match each concept with its description.',
          items: [
            { questionNumber: 21, label: 'Hypnosis state' },
            { questionNumber: 22, label: 'Mesmerism' },
            { questionNumber: 23, label: 'Hypnotherapy applications' },
            { questionNumber: 24, label: 'Important caution' }
          ],
          options: [
            { label: 'Not a substitute for medical treatment', value: 'A' },
            { label: 'Focused attention with suspended judgment', value: 'B' },
            { label: 'Franz Mesmer\'s technique', value: 'C' },
            { label: 'Anxiety, phobias, chronic pain', value: 'D' }
          ]
        }
      ]
    },
    {
      sectionNumber: 3,
      title: 'READING PASSAGE 3',
      passage: {
        title: 'Children and Sport',
        content: `Physical activity and participation in sports play crucial roles in children's healthy development. Beyond the obvious physical benefits, sports participation contributes to psychological well-being, social development, and academic performance. Research has consistently demonstrated that children who engage in regular physical activity perform better academically and exhibit improved behavioral outcomes compared to sedentary peers. The psychological benefits of sports participation in children are well-documented. Sports provide opportunities for children to build confidence, develop resilience, and learn coping skills. Competitive sports, in particular, can help children develop mental toughness and learn to handle success and failure appropriately. Team sports foster social skills and cooperation, teaching children to work collaboratively toward common goals. The cardiovascular and musculoskeletal benefits of sports participation are significant. Regular physical activity during childhood establishes healthy habits that often persist into adulthood. Early involvement in sports has been associated with reduced rates of obesity, cardiovascular disease, and type 2 diabetes in later life. Despite the well-established benefits of sports, children's participation rates in organized sports have declined in many developed nations. Factors contributing to this decline include increasing academic pressures, cost of sports programs, and attraction of sedentary activities such as video games and social media. Additionally, concerns about sports injuries and overuse injuries in young athletes have prompted more conservative approaches to youth sports. However, experts advocate for maintaining children's participation in sports while implementing injury prevention strategies. A balance between competitive and recreational sports, appropriate coaching, and emphasis on enjoyment rather than excessive pressure to win can minimize injury risks while maximizing benefits. Physical education programs in schools remain important mechanisms for ensuring all children access basic physical activity opportunities, regardless of their ability or socioeconomic status.`
      },
      questions: [
        {
          type: 'multiple-choice',
          questionNumber: 25,
          question: 'According to the passage, children who engage in regular physical activity',
          options: [
            { label: 'perform worse academically', value: 'A' },
            { label: 'perform better academically', value: 'B' },
            { label: 'show no academic difference', value: 'C' },
            { label: 'always become professional athletes', value: 'D' }
          ]
        },
        {
          type: 'multiple-choice',
          questionNumber: 26,
          question: 'Team sports primarily help develop',
          options: [
            { label: 'individual athletic skills only', value: 'A' },
            { label: 'social skills and cooperation', value: 'B' },
            { label: 'academic knowledge', value: 'C' },
            { label: 'artistic abilities', value: 'D' }
          ]
        },
        {
          type: 'paragraph-gap',
          instruction: 'Complete with words from the text (MAX 3 words).',
          paragraph: 'Sports help children develop (27)... and resilience. Regular activity reduces risks of (28)..., cardiovascular disease, and type 2 diabetes. Factors reducing sports participation include (29)... and video games. Experts recommend (30)... coaching and emphasis on enjoyment. Physical education programs ensure (31)...',
          questionNumbers: [27, 28, 29, 30, 31]
        },
        {
          type: 'true-false-not-given',
          instruction: 'Do the statements agree with the information?',
          statements: [
            { questionNumber: 32, statement: 'Sports participation only provides physical benefits.' },
            { questionNumber: 33, statement: 'Children\'s sports participation rates have increased in developed nations.' },
            { questionNumber: 34, statement: 'Sedentary activities like video games contribute to declining sports participation.' },
            { questionNumber: 35, statement: 'School physical education programs are important for all children.' },
            { questionNumber: 36, statement: 'Pressure to win should be the primary focus of youth sports.' }
          ]
        }
      ]
    }
  ]
};
