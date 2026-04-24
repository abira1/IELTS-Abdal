// Track: 711-M Reading
import { Track } from './track1';

export const track711Reading: Track = {
  id: 'track-711-reading',
  name: '711-M Reading',
  shortName: '711MR',
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
        title: 'Wings of Hope: Butterfly Conservation',
        content: `Butterflies have long captivated human imagination with their graceful flight and vibrant colors. Beyond their aesthetic appeal, butterflies serve crucial ecological functions as pollinators and indicators of environmental health. In recent decades, butterfly populations have declined significantly due to habitat loss, climate change, and pesticide use. Conservation efforts focused on protecting butterflies have become increasingly important. The Wings of Hope initiative is a global butterfly conservation program that combines habitat restoration, research, and public education. The program works with local communities to establish butterfly gardens and preserve native plant species essential for butterfly survival. Butterfly larvae depend on specific host plants for food, and the loss of these plants has contributed significantly to population declines. Host plant restoration is therefore a critical component of butterfly conservation. Different butterfly species require different host plants, making biodiversity in vegetation essential for supporting diverse butterfly populations. Butterfly gardening has emerged as a popular conservation strategy that allows individuals to contribute to butterfly protection. Home gardens, community gardens, and public spaces are being transformed into butterfly habitats through the planting of native flowers and host plants. These gardens serve not only as habitat but also as educational spaces where people learn about butterflies and their ecological importance. Research has revealed that even small habitat patches can support butterfly populations if they contain appropriate plants and resources. Urban butterfly gardens, despite their limited size, can provide valuable habitat and contribute to broader landscape connectivity. Climate change poses an increasing threat to butterfly populations, as shifting temperatures affect the timing of butterfly emergence and the availability of host plants. Some butterfly species may be unable to adapt to rapid environmental changes, placing them at risk of extinction. Conservation efforts must therefore address both immediate habitat threats and long-term climate change impacts.`
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
            { label: 'Host Plant Importance', value: 'i' },
            { label: 'Butterfly Gardening and Public Participation', value: 'ii' },
            { label: 'Climate Change Threats', value: 'iii' },
            { label: 'Butterfly Conservation Initiatives', value: 'iv' },
            { label: 'Ecological Role of Butterflies', value: 'v' }
          ]
        },
        {
          type: 'paragraph-gap',
          instruction: 'Complete with words from the text (MAX 3 words).',
          paragraph: 'Butterflies serve as (5)... and environmental indicators. Butterfly larvae depend on (6)... plants for food. Wings of Hope works with (7)... to establish butterfly gardens. Small habitat patches can support (8)... if resources are appropriate. Climate change affects (9)...',
          questionNumbers: [5, 6, 7, 8, 9]
        },
        {
          type: 'true-false-not-given',
          instruction: 'Do the statements agree with the information?',
          statements: [
            { questionNumber: 10, statement: 'Butterfly populations have increased in recent decades.' },
            { questionNumber: 11, statement: 'Different butterfly species require different host plants.' },
            { questionNumber: 12, statement: 'Urban butterfly gardens cannot support butterfly populations.' },
            { questionNumber: 13, statement: 'Climate change affects the timing of butterfly emergence.' },
            { questionNumber: 14, statement: 'All butterfly species can easily adapt to environmental changes.' }
          ]
        }
      ]
    },
    {
      sectionNumber: 2,
      title: 'READING PASSAGE 2',
      passage: {
        title: 'Spider Silk: Nature\'s Strongest Material',
        content: `Spider silk has long fascinated scientists due to its remarkable combination of strength and flexibility. Despite being thinner than human hair, spider silk is stronger than steel of equivalent diameter and more flexible than nylon. These exceptional properties have made spider silk a subject of intensive research for potential applications in various fields. The strength of spider silk derives from its molecular structure and composition. Spider silk is composed primarily of protein, specifically a protein called fibroin. The arrangement of protein molecules within the silk fiber creates a structure that is both strong and flexible. Different spider species produce silk with varying properties, adapted to the specific functions their webs must serve. Some spiders produce sticky silk for trapping prey, while others produce silk used for structural support in web construction. The environmental resilience of spider silk is another remarkable property. Unlike synthetic materials that degrade under ultraviolet radiation, spider silk exhibits exceptional resistance to UV damage. Spider silk also remains functional in a wide range of temperatures and humidity levels, making it suitable for diverse applications. Scientists have attempted to replicate spider silk in laboratory settings, both by studying natural spider silk and by developing genetic engineering approaches to produce silk proteins. Some companies have successfully produced spider silk using genetically modified organisms. However, the production of synthetic spider silk at commercially viable scales remains challenging. Potential applications for spider silk include biomedical uses such as surgical sutures, tissue engineering scaffolds, and drug delivery systems. In materials science, spider silk has potential applications in ultra-lightweight armor, high-strength textiles, and optical fibers. Despite significant progress in understanding and replicating spider silk, many challenges remain in achieving cost-effective mass production while maintaining the material's exceptional properties.`
      },
      questions: [
        {
          type: 'multiple-choice',
          questionNumber: 15,
          question: 'Spider silk is stronger than',
          options: [
            { label: 'nylon', value: 'A' },
            { label: 'steel of equivalent diameter', value: 'B' },
            { label: 'human hair', value: 'C' },
            { label: 'plastic fibers', value: 'D' }
          ]
        },
        {
          type: 'multiple-choice',
          questionNumber: 16,
          question: 'Spider silk is primarily composed of',
          options: [
            { label: 'collagen', value: 'A' },
            { label: 'keratin', value: 'B' },
            { label: 'protein called fibroin', value: 'C' },
            { label: 'mineral compounds', value: 'D' }
          ]
        },
        {
          type: 'paragraph-gap',
          instruction: 'Complete with words from the text (MAX 2 words).',
          paragraph: 'Different spiders produce (17)... adapted to specific web functions. Spider silk demonstrates exceptional (18)... resistance. Scientists have produced spider silk using (19)... organisms. Potential medical applications include (20)... and tissue engineering. Challenges in production include (21)...',
          questionNumbers: [17, 18, 19, 20, 21]
        },
        {
          type: 'drag-and-drop',
          instruction: 'Match each property with its description.',
          items: [
            { questionNumber: 22, label: 'Strength' },
            { questionNumber: 23, label: 'Flexibility' },
            { questionNumber: 24, label: 'UV resistance' },
            { questionNumber: 25, label: 'Thermal stability' }
          ],
          options: [
            { label: 'Stronger than steel of equivalent diameter', value: 'A' },
            { label: 'More flexible than nylon', value: 'B' },
            { label: 'Resistant to ultraviolet radiation', value: 'C' },
            { label: 'Functional across temperature range', value: 'D' }
          ]
        }
      ]
    },
    {
      sectionNumber: 3,
      title: 'READING PASSAGE 3',
      passage: {
        title: 'Map Projections and Cartography',
        content: `Maps have been essential tools for human navigation and understanding of the world for centuries. However, creating accurate maps presents a fundamental challenge: the Earth is spherical, while maps are typically flat. Map projections are mathematical techniques used to represent the curved surface of the Earth on a flat map. Every map projection involves some distortion because it is mathematically impossible to represent a sphere perfectly on a flat surface. Different map projections introduce different types and amounts of distortion. The Mercator projection, developed in the 16th century, is one of the most commonly used projections. The Mercator projection preserves angles and directions, making it useful for navigation. However, the Mercator projection introduces significant distortion of area, particularly at high latitudes, causing land masses near the poles to appear much larger than they actually are. For example, Greenland appears almost as large as Africa on a Mercator map, though Africa is actually about 14 times larger. Equal-area projections, such as the Mollweide or Sinusoidal projections, sacrifice angular accuracy to preserve the relative areas of land masses. These projections are more accurate representations of true land areas but introduce distortion in shape and direction. Azimuthal projections, such as the Lambert Azimuthal Equal-Area projection, are centered on a specific point and accurately represent distances and directions from that point. These projections are particularly useful for regional maps or specialized applications. The choice of map projection depends on the purpose of the map and the region being represented. Cartographers must balance competing priorities regarding what aspects of geographic information to preserve and what distortions can be tolerated. Modern mapping technology, including GPS and satellite imagery, has improved the accuracy of map creation. However, understanding the strengths and limitations of different map projections remains essential for anyone creating or interpreting maps.`
      },
      questions: [
        {
          type: 'multiple-choice',
          questionNumber: 26,
          question: 'The fundamental challenge in map creation is that',
          options: [
            { label: 'the Earth is too large', value: 'A' },
            { label: 'the Earth is spherical while maps are flat', value: 'B' },
            { label: 'accurate measurements are difficult', value: 'C' },
            { label: 'technology is not advanced enough', value: 'D' }
          ]
        },
        {
          type: 'multiple-choice',
          questionNumber: 27,
          question: 'The Mercator projection distorts',
          options: [
            { label: 'direction and angle', value: 'A' },
            { label: 'area, particularly at high latitudes', value: 'B' },
            { label: 'distance from the equator', value: 'C' },
            { label: 'ocean depths', value: 'D' }
          ]
        },
        {
          type: 'paragraph-gap',
          instruction: 'Complete with words from the text (MAX 2 words).',
          paragraph: 'Map projections are (28)... techniques. Every projection involves some (29)... Equal-area projections preserve (30)... but distort shape. Azimuthal projections are useful for (31)... maps. Map projection choice depends on (32)... and region.',
          questionNumbers: [28, 29, 30, 31, 32]
        },
        {
          type: 'true-false-not-given',
          instruction: 'Do the statements agree with the information?',
          statements: [
            { questionNumber: 33, statement: 'It is possible to create a perfectly accurate map projection.' },
            { questionNumber: 34, statement: 'The Mercator projection was developed in the 16th century.' },
            { questionNumber: 35, statement: 'On a Mercator map, Greenland appears almost as large as Africa.' },
            { questionNumber: 36, statement: 'Africa is approximately 14 times larger than Greenland.' },
            { questionNumber: 37, statement: 'Equal-area projections are equally useful for navigation as the Mercator projection.' },
            { questionNumber: 38, statement: 'GPS technology has improved map accuracy.' }
          ]
        }
      ]
    }
  ]
};
