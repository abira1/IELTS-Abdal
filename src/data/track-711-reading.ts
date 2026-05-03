// Track: 711-AC Reading
import { Track } from './track1';

export const track711Reading: Track = {
  id: 'track-711-reading',
  name: '711-AC Reading',
  shortName: '711-AC',
  description: 'IELTS Reading Academic - 3 parts with 40 questions',
  duration: 60,
  totalQuestions: 40,
  trackType: 'reading',
  audioURL: null,
  sections: [
    {
      sectionNumber: 1,
      title: 'READING PASSAGE 1',
      passage: {
        title: 'Survivor from the sky',
        content: `In a remarkable documentary, Wings of Hope, German director Werner Herzog re-counts the true story of an eighteen-year-old girl, the sole survivor of a plane crash in the Amazon jungle in 1971. Twenty-nine years later, Herzog returns to the jungle with Juliane Koepke, now a 46-year-old biologist, and she tells her amazing story on film.

Juliane had just graduated from high school in Lima, Peru and, with her mother, was flying out to spend Christmas at her father's research station in the jungle. A half hour into the flight they encountered a horrific storm. In the midst of wild turbulence, the plane was struck by lightning and fell into a nosedive.

Passengers screamed as baggage flew around the compartment. Then the plane broke into pieces and suddenly Juliane found herself outside free-falling 30,000 feet. 'I was suspended in mid-air, still in my seat. It wasn't so much that I had left the plane but that the plane had left me. It simply wasn't there any more. I was all alone with my row of seats,' says Juliane. 'I sailed on through the air, then I tumbled into a fall. The seatbelt squeezed my stomach and I couldn't breathe any more.' Before she lost consciousness, Juliane saw the dense jungle below, 'a deep green, like broccoli', with no clearings for hundreds of miles.

Somehow, miraculously, Juliane survived that fall from the sky. In the film, she speculates on a number of factors which may have combined to save her. First, the storm had produced a strong updraft from the thunder clouds. Secondly, being strapped into a row of seats, she was aware of falling in a spiralling movement, like a maple seed pod. Then, hitting the canopy of trees, she tumbled through a maze of vines which slowed her landing in deep mud.

But surviving the fall, though miraculous in itself, was just the beginning. When Juliane awoke hours later, wet and covered with mud, she was still strapped to her seat. Staggering to her feet, she assessed her injuries: a fractured bone in the neck, concussion and deep cuts in her leg and back. She was also in shock, lost and totally alone in the Amazon jungle.

No doubt it was her familiarity with the wilderness that enabled her to cope. Her parents were biologists and Juliane had grown up in the jungle. She realised her only hope was to follow a little stream of water nearby, trusting that it would eventually lead to a larger river and rescue. With no provisions, dressed in the miniskirt she had worn on the plane and wearing just one shoe, she set off through the jungle. She passed broken fragments from the plane - a wheel, an engine. 'Initially, I saw planes circling above me, but after a few days I realised the search had been called off,' she said.

Surprisingly she felt no hunger but as the days passed her health was deteriorating rapidly. The gash in her shoulder, where flies had laid their eggs was now crawling with maggots. 'I knew I'd perish in the jungle so I stayed in the water.' Walking in the stream, however, presented one risk more serious than any others. Before each step she had to poke ahead in the sand with a stick, to avoid treading on poisonous sting rays, lying hidden on the bottom.

As the stream grew into a river, swimming was the only option. However, here in deeper water, there were new threats. Crocodiles basking on the shores slipped silently into the water as she passed. Juliane trusted that they feared humans and were entering the water to hide. She swam on. On the tenth day, starving and barely conscious, she spotted a hut and a canoe. They belonged to three woodcutters working nearby. Rescue was at hand.

For this 46-year-old woman, re-living such a traumatic experience on film must have been a great challenge. But she shows little emotion. Flying back into the jungle, she sits in the same seat (19F) as on that fateful day. She is dispassionate, unemotional in describing the flight. On the ground, when they finally locate the crash site, in dense jungle, Juliane is scientific in her detachment, looking through the debris, now buried under dense vegetation. She examines a girl's purse, the skeleton of a suitcase. Walking along the stream, she spots the engine which she remembers passing on the third day. Her arms and legs are covered with mosquitoes, but she seems to ignore all discomfort. Then, back in the town, standing in front of a monument erected in memory of the victims of the crash, entitled Alas de Esperanza (Wings of Hope), Juliane comments simply, 'I emerged, as the sole embodiment of hope from this disaster.'`
      },
      questions: [
        {
          type: 'short-answer',
          questionNumber: 1,
          question: 'How old was Juliane at the time of the crash?',
          instruction: 'Answer using NO MORE THAN THREE WORDS from the passage.'
        },
        {
          type: 'short-answer',
          questionNumber: 2,
          question: 'What is her occupation now?',
          instruction: 'Answer using NO MORE THAN THREE WORDS from the passage.'
        },
        {
          type: 'short-answer',
          questionNumber: 3,
          question: 'What was the cause of the plane crash?',
          instruction: 'Answer using NO MORE THAN THREE WORDS from the passage.'
        },
        {
          type: 'multiple-choice',
          questionNumber: 4,
          question: 'What happened to the plane?',
          options: [
            { label: 'It broke apart in the air.', value: 'A' },
            { label: 'It hit trees and exploded.', value: 'B' },
            { label: 'It crashed into a mountainside.', value: 'C' },
            { label: 'It hit the ground and burst into flames.', value: 'D' }
          ]
        },
        {
          type: 'multiple-choice',
          questionNumber: 5,
          question: 'Which of the following did NOT help to slow her fall?',
          options: [
            { label: 'an updraft caused by storm clouds', value: 'A' },
            { label: 'hitting vines', value: 'B' },
            { label: 'the section of seats to which she was attached', value: 'C' },
            { label: 'a parachute', value: 'D' }
          ]
        },
        {
          type: 'multiple-choice',
          questionNumber: 6,
          question: 'Which of the following injuries did she sustain?',
          options: [
            { label: 'a broken foot', value: 'A' },
            { label: 'a broken arm', value: 'B' },
            { label: 'concussion', value: 'C' },
            { label: 'cuts on her head', value: 'D' }
          ]
        },
        {
          type: 'multiple-choice',
          questionNumber: 7,
          question: 'What helped her to survive?',
          options: [
            { label: 'Knowledge of the jungle', value: 'A' },
            { label: 'a map showing the location of the river', value: 'B' },
            { label: 'appropriate clothing and shoes', value: 'C' },
            { label: 'food supplies from the plane', value: 'D' }
          ]
        },
        {
          type: 'multiple-choice',
          questionNumber: 8,
          question: 'What was the biggest threat to her survival?',
          options: [
            { label: 'infected wounds', value: 'A' },
            { label: 'sting rays', value: 'B' },
            { label: 'starvation', value: 'C' },
            { label: 'crocodiles', value: 'D' }
          ]
        },
        {
          type: 'multiple-choice',
          questionNumber: 9,
          question: 'How long was she lost in the jungle?',
          options: [
            { label: '3 days', value: 'A' },
            { label: '5 days', value: 'B' },
            { label: '10 days', value: 'C' },
            { label: '15 days', value: 'D' }
          ]
        },
        {
          type: 'multiple-choice',
          questionNumber: 10,
          question: 'How was she finally rescued?',
          options: [
            { label: 'A search party found her in the jungle.', value: 'A' },
            { label: 'Native hunters found her.', value: 'B' },
            { label: 'She signaled to a plane from the river.', value: 'C' },
            { label: 'She reached a campsite along the river.', value: 'D' }
          ]
        },
        {
          type: 'true-false-not-given',
          questionNumber: 11,
          statement: 'Other survivors of the crash were found in the jungle.'
        },
        {
          type: 'true-false-not-given',
          questionNumber: 12,
          statement: 'Juliane was upset when she re-visited the crash site.'
        },
        {
          type: 'true-false-not-given',
          questionNumber: 13,
          statement: 'Wings of Hope is the name given to a memorial statue.'
        },
        {
          type: 'true-false-not-given',
          questionNumber: 14,
          statement: 'Juliane suffered nightmares for many years as a result of her experience.'
        }
      ]
    },
    {
      sectionNumber: 2,
      title: 'READING PASSAGE 2',
      passage: {
        title: 'The race to make spider silk',
        content: `The strength, toughness, and elasticity of silk continue to fascinate scientists, who wonder what gives this natural material its unusual qualities. Finer than human hair, lighter than cotton, and ounce for ounce stronger than steel, silk is of special interest to materials researchers. They are trying to duplicate its properties and synthesise it for large-scale production. Silk holds the promise of wear-resistant shoes and clothes; stronger ropes, nets, seatbelts and parachutes; rust-free panels and bumpers for automobiles; improved sutures and bandages; artificial tendons and ligaments; supports for weakened blood vessels as well as bulletproof vests.

Many insects secrete silks of varying quality. Best known is the moth bombyx mori, whose caterpillar is commonly known as the silkworm. It spins its cocoon from a single thread between 300 and 900 metres long and has been used for centuries to make fine garments. But the focus of scientific attention today is on spider silk: tougher, stretchier, and more waterproof than silkworm strands. Spiders make as many as seven different types of silk, but one spider and two types of silk are at the centre of intense interest. The spider is the golden orb-weaving spider, nephila clavipes. Its two silks under investigation go by the evocative names 'dragline' and 'capture'.

Dragline is the silk which forms the frame for the wheel-shaped webs and enables the dangling spider to drop down and grab its prey. This silk exhibits a combination of strength and toughness unmatched by high-performance synthetic fibre. Capture silk is the resilient substance at the centre of the web. To catch a speeding insect, it may stretch to almost three times its original length. Insects get entangled in the sticky web because the stretchiness of capture silk lets the web move back and forth after the insect hits it. If the web were stiff, the insect might just bounce off. Whereas dragline is stronger, capture silk is more flexible, five times more flexible in fact.

Because the orb weaver's survival depends on its silk, some 400 million years of evolution have fine-tuned a remarkably tough and versatile material. Now, research groups all over the world are competing to spin the first artificial spider silk, a job that requires a three-step approach: to determine the fibre's molecular architecture, to understand the genes that yield silk proteins, and then to learn how to spin the raw material into threads.

The first two steps are well underway. The molecular structure for both dragline and capture silk is known and now researchers have cloned several genes for the silks and unravelled their protein structure.

The next step is to find hosts for the artificial genes. Plants and fungi, as well as bacteria, are being considered. If a hardy plant could express a dragline silk gene, silk proteins could eventually be harvested in large quantities, processed into a liquid, polymer, and spun in factories. A different experimental approach is to insert the web gene into goats in order to collect the protein from the goats' milk. Goats are being used instead of the simpler and much cheaper bacteria, because the secret of the protein's strength lies in how the molecules cross-link with one another. When bacteria is used to make artificial web, the protein folds in a way that prevents it from cross-linking properly, resulting in hard white lumps. The spider makes protein in a manner similar to the way mammals make milk, so the researchers hope that the protein made in the goats' mammary glands will be able to cross-link properly. Once the protein is extracted from the goats' milk, the next step is to find a way to spin it.

Spiders make their silk in environmentally friendly ways. They process proteins from water-based solutions which, from a manufacturing point of view, is very attractive. The process of making synthetic fibres like nylon, on the other hand, requires petroleum products or organic solvents and results in pollution. So bio-technologists are motivated by both the practical and economic potential of generating artificial spider silk. Globally, as much as 60 per cent of the threads used to weave clothing come from natural fibre, including cotton, wool, and silk. The aim is to offer substitutes for natural fibres that are free of the problems of poor wash-wear performance: stretching, wrinkling and shrinkage. They are seeking a better-than-natural alternative fibre for which there is a major market. Bio-inspired materials are providing a new frontier for the fibre business.`
      },
      questions: [
        {
          type: 'dropdown',
          questionNumber: 15,
          statement: 'forms the framework of a web',
          options: [
            { label: 'the silk of bombyx mori', value: 'A' },
            { label: 'dragline silk of nephila clavipes', value: 'B' },
            { label: 'capture silk of nephila clavipes', value: 'C' }
          ]
        },
        {
          type: 'dropdown',
          questionNumber: 16,
          statement: 'most elastic silk',
          options: [
            { label: 'the silk of bombyx mori', value: 'A' },
            { label: 'dragline silk of nephila clavipes', value: 'B' },
            { label: 'capture silk of nephila clavipes', value: 'C' }
          ]
        },
        {
          type: 'dropdown',
          questionNumber: 17,
          statement: 'allows predator to drop quickly',
          options: [
            { label: 'the silk of bombyx mori', value: 'A' },
            { label: 'dragline silk of nephila clavipes', value: 'B' },
            { label: 'capture silk of nephila clavipes', value: 'C' }
          ]
        },
        {
          type: 'dropdown',
          questionNumber: 18,
          statement: 'single strand can be up to 900 metres long',
          options: [
            { label: 'the silk of bombyx mori', value: 'A' },
            { label: 'dragline silk of nephila clavipes', value: 'B' },
            { label: 'capture silk of nephila clavipes', value: 'C' }
          ]
        },
        {
          type: 'dropdown',
          questionNumber: 19,
          statement: 'strongest silk',
          options: [
            { label: 'the silk of bombyx mori', value: 'A' },
            { label: 'dragline silk of nephila clavipes', value: 'B' },
            { label: 'capture silk of nephila clavipes', value: 'C' }
          ]
        },
        {
          type: 'true-false-not-given',
          questionNumber: 20,
          statement: 'All spiders secrete silk.'
        },
        {
          type: 'true-false-not-given',
          questionNumber: 21,
          statement: 'Artificial genes for spider silk have been produced.'
        },
        {
          type: 'true-false-not-given',
          questionNumber: 22,
          statement: 'Spider silk protein occurs naturally in goats\' milk.'
        },
        {
          type: 'true-false-not-given',
          questionNumber: 23,
          statement: 'China is leading research efforts in the area of spider silk.'
        },
        {
          type: 'true-false-not-given',
          questionNumber: 24,
          statement: 'Spider silk is now being produced commercially.'
        },
        {
          type: 'short-answer',
          questionNumber: 25,
          question: 'Main problem in the production of synthetic fibres',
          instruction: 'Using NO MORE THAN THREE WORDS from the passage.'
        },
        {
          type: 'short-answer',
          questionNumber: 26,
          question: '3 disadvantages of natural fibres',
          instruction: 'Using NO MORE THAN THREE WORDS from the passage.'
        },
        {
          type: 'short-answer',
          questionNumber: 27,
          question: 'Proportion of clothing made from natural fibre',
          instruction: 'Using NO MORE THAN THREE WORDS from the passage.'
        }
      ]
    },
    {
      sectionNumber: 3,
      title: 'READING PASSAGE 3',
      passage: {
        title: 'Map wars',
        content: `A map of the world expresses a point of view. A correct model of the earth is a sphere - or an ellipsoid to be precise. Photographs of the earth from space provide comforting reassurance on that point. If you wish to know the relative positions of the continents and the oceans you should go out and buy yourself a globe and spin it around.

But a globe cannot be pinned to a wall or printed in a book. For that you need a two-dimensional representation. This is where the problems start since you cannot project three-dimensional information onto a flat plane without making certain assumptions. The arguments between cartographers mostly concern what those assumptions should be.

The simplest two-dimensional representation is a 'cylindrical' projection - what you get by wrapping a sheet of paper around a globe and simply transferring the information across. This means it indicates true north and south. So, Newfoundland is directly north of Venezuela and it appears that way on the map. East and west similarly are also indicated correctly. Such a map demonstrates what is called 'fidelity of axis'.

One of the longest-lived cylindrical projections was based on the needs of sixteenth century navigators. Gerhard Kremer, a Flemish mathematician, produced his view of the world in 1569. 'Kremer' translates to 'merchant' in English and 'mercator' in Latin. And the Mercator projection survives to this day in many books and maps.

Mercator's projection of the world also shows intermediate compass directions like north-west more or less accurately. So, it is possible to conclude from his map that Brazil is south-west of Liberia and if you plot a course in that direction you will eventually arrive at your destination. No wonder it was appreciated by the early explorers! If it can be used in this way a map is said to have 'fidelity of angle'.

But fidelity of angle is only achieved at a cost. To make it work, the further away you get from the equator, the further apart you have to move the horizontal lines of latitude. As these distances increase so do the sizes of the countries underneath them. So, by the time you get to the North or South Poles the lines would be drawn infinitely far apart and the Arctic and Antarctic regions can scarcely be represented at all since they would be infinitely large. More importantly the relative sizes of intermediate areas are completely distorted; South America seems smaller than Europe whereas in fact it is twice the size. These changes in scale distort both the size and shape of countries. Given such defects, it is surprising that the Mercator projection has survived so long, especially as dozens of other more satisfactory projections have appeared since. One of the best known of these is the Aitoff projection of 1889, which attempted to represent country sizes and shapes more correctly. But to do so required a compromise - the lines of latitude and longitude had to be 'bent'. Fidelity of axis had thus been lost and you could no longer judge north, south, east and west so easily. Most of us, however, did not notice that these projections were different from Mercator. We assumed that all maps were simply factual statements.

Dr. Arno Peters, a German historian, was irritated by the maps he saw widely published, particularly by the survival of Mercator which he argued, gave a euro-centric view of the world. It shrank the developing countries since most of these are around the equator, and it expanded the richer countries since they lay further north. Even the equator itself is shown two thirds of the way down on the traditional Mercator map. Dr. Peters insisted that his map, which first appeared in 1985, has equal-area projection so that no country is given prominence over another, plus fidelity of axis to avoid the disorientating effect of bent lines of latitude and longitude.

Then there is the question of country shape. If you were to take a photo of a globe in its normal position you would find the countries around the equator like Zaire or Ecuador came out of it pretty well. They would be shown relatively large and with something close to their correct shape. But further north or south there are considerable distortions: Australia tails away alarmingly. Dr. Peters decided that the minimum distortions should occur not at the equator but at the 45 degree lines of latitude, as these are much more populated areas. However, this controversial Peters map does radically change the shape of both Africa and South America; and although all projections distort to some extent, it is clear that Africa appears exceptionally long and thin on the Peters map.

But the oddity of the Peters projection is at least partly responsible for its success, as there has been widespread discussion on the misrepresentation of country sizes in previous maps. The issues which the Peters map raises are relatively simple. If you decide you want an equal area map with fidelity of axis you will always get something resembling the Peters projection. If you decide that shape is more significant you will get something else.

The real value of the Peters projection is that it has made the world think about something that before was never taken seriously: that maps of the world represent a point of view just as do press articles or TV programmes or photographs. But it isn't recommended that you navigate a '747' round the world with the Peters projection or with any other single global projection they would all lead you astray!`
      },
      questions: [
        {
          type: 'drag-drop-summary',
          questionNumber: 28,
          blank: 'projection',
          instruction: 'Choose from the box. There are more words than you will need.'
        },
        {
          type: 'drag-drop-summary',
          questionNumber: 29,
          blank: 'axis',
          instruction: 'Choose from the box. There are more words than you will need.'
        },
        {
          type: 'drag-drop-summary',
          questionNumber: 30,
          blank: 'perspective',
          instruction: 'Choose from the box. There are more words than you will need.'
        },
        {
          type: 'drag-drop-summary',
          questionNumber: 31,
          blank: 'compare',
          instruction: 'Choose from the box. There are more words than you will need.'
        },
        {
          type: 'dropdown',
          questionNumber: 32,
          statement: 'makes Europe seem larger than it is',
          options: [
            { label: 'Mercator projection', value: 'M' },
            { label: 'Aitoff projection', value: 'A' },
            { label: 'Peters projection', value: 'P' }
          ]
        },
        {
          type: 'dropdown',
          questionNumber: 33,
          statement: 'maximum distortions at the poles',
          options: [
            { label: 'Mercator projection', value: 'M' },
            { label: 'Aitoff projection', value: 'A' },
            { label: 'Peters projection', value: 'P' }
          ]
        },
        {
          type: 'dropdown',
          questionNumber: 34,
          statement: 'maintains greatest accuracy at 45 degrees latitude',
          options: [
            { label: 'Mercator projection', value: 'M' },
            { label: 'Aitoff projection', value: 'A' },
            { label: 'Peters projection', value: 'P' }
          ]
        },
        {
          type: 'dropdown',
          questionNumber: 35,
          statement: 'most distorts the position of the equator',
          options: [
            { label: 'Mercator projection', value: 'M' },
            { label: 'Aitoff projection', value: 'A' },
            { label: 'Peters projection', value: 'P' }
          ]
        },
        {
          type: 'dropdown',
          questionNumber: 36,
          statement: 'more accurately represents country shapes and sizes',
          options: [
            { label: 'Mercator projection', value: 'M' },
            { label: 'Aitoff projection', value: 'A' },
            { label: 'Peters projection', value: 'P' }
          ]
        },
        {
          type: 'drag-drop-image',
          questionNumber: 37,
          statement: 'Mercator projection',
          options: [
            { label: 'A', image: 'https://i.postimg.cc/1X5F2VP6/A.png' },
            { label: 'B', image: 'https://i.postimg.cc/cHcYFBqc/B.png' },
            { label: 'C', image: 'https://i.postimg.cc/kGXSzR9b/C.png' },
            { label: 'D', image: 'https://i.postimg.cc/SsG8gf07/D.png' }
          ]
        },
        {
          type: 'drag-drop-image',
          questionNumber: 38,
          statement: 'Aitoff projection',
          options: [
            { label: 'A', image: 'https://i.postimg.cc/1X5F2VP6/A.png' },
            { label: 'B', image: 'https://i.postimg.cc/cHcYFBqc/B.png' },
            { label: 'C', image: 'https://i.postimg.cc/kGXSzR9b/C.png' },
            { label: 'D', image: 'https://i.postimg.cc/SsG8gf07/D.png' }
          ]
        },
        {
          type: 'drag-drop-image',
          questionNumber: 39,
          statement: 'Peters projection',
          options: [
            { label: 'A', image: 'https://i.postimg.cc/1X5F2VP6/A.png' },
            { label: 'B', image: 'https://i.postimg.cc/cHcYFBqc/B.png' },
            { label: 'C', image: 'https://i.postimg.cc/kGXSzR9b/C.png' },
            { label: 'D', image: 'https://i.postimg.cc/SsG8gf07/D.png' }
          ]
        },
        {
          type: 'multiple-choice',
          questionNumber: 40,
          question: 'The main point made by the writer of this article is that we need to ...',
          options: [
            { label: 'understand maps.', value: 'A' },
            { label: 'understand map-making.', value: 'B' },
            { label: 'understand that maps are not objective.', value: 'C' },
            { label: 'understand the importance of latitude and longitude.', value: 'D' }
          ]
        }
      ]
    }
  ]
};
