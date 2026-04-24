// Track: 704-M Reading
import { Track } from './track1';

export const track704Reading: Track = {
  id: 'track-704-reading',
  name: '704-M Reading',
  shortName: '704MR',
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
        title: 'Lake Vostok',
        content: `Beneath the white blanket of Antarctica lies half a continent of virtually uncharted territory - an area so completely hidden that scientists have little clue what riches await discovery. Recently, Russian and British glaciologists identified an immense lake - one of Earth's largest and deepest - buried beneath 4,000 meters of ice immediately below Russia's Vostok Station.

As details have emerged, a growing number of scientists are showing interest, with dozens of investigators keen to explore the feature, known as Lake Vostok. A thick layer of sediment at the bottom of the lake could hold novel clues to the planet's climate going back tens of millions of years. By looking at the ratio of different oxygen isotopes, scientists should be able to trace how Earth's temperature changed over the millennia. NASA has expressed interest in Lake Vostok because of its similarity to Europa. This moon of Jupiter appears to have a water ocean covered by a thick ice sheet, measuring perhaps tens of kilometers in depth. If hydrothermal vents exist beneath the ice, chemical reactions on Europa could have created the molecular building blocks for life, if not life itself. Vostok would be an ideal testing ground for technology that would eventually fly to Europa or places even more distant, say many scientists. Though cheap compared with a Europan mission, any expedition to Vostok would represent a significant investment.

Vostok Station holds the uncomfortable distinction of having recorded the coldest temperature on Earth. Thermometers there measured in July 1983, and the average temperature hovers around -55°C. It's the thick ice, strangely, that enables a lake to survive in such a frozen environment. The 4 kilometers of ice acts effectively as an insulating blanket protecting the bedrock underneath the ice from the cold temperatures above. Geothermal heat coming from the planet's interior keeps the lake from freezing and warms the lowest layers of ice. The tremendous weight of the ice sheet also plays a role in maintaining the lake. Beneath 4 kilometers of glacier, the pressure is intense enough to melt ice at a temperature of -4°C. These factors have helped lakes develop across much of the thickly blanketed East Antarctica. More than 70 hidden lakes have been detected in the small portion of the continent to date. Lake Vostok is the largest of these, stretching 280km from south to north and some 60km from east to west. At Vostok station, which sits at the southern end of the lake, the water depth appears to be 500m according to seismic experiments carried out by Russian researchers.

The first clues to Lake Vostok's existence came in the 1970s, when British, U.S., and Danish researchers collected radar observations by flying over this region. The radar penetrates the ice and bounces off whatever sits below. When researchers found a surface as flat as a mirror, they surmised that a lake must exist underneath the ice. An airborne survey of the lake is being undertaken, the first step toward eventually drilling into the water. Along with the potential rewards come a host of challenges. Researchers must find a way to penetrate the icy covering without introducing any microorganisms or pollutants into the sealed-off water.

What about life in the depths? If tiny microbes do populate the lake, they may be some of the hungriest organisms ever discovered. Lake Vostok has the potential to be one of the most energy-limited, or oligotrophic, environments on the planet. For the lake's residents, the only nutrients would come from below. Russian investigators have speculated that the lake floor may have hot springs spewing out hydrothermal fluids stocked with reduced metals and other sorts of chemical nutrients. Scant geological evidence available for this region, however, indicates that the crust is old and dead. Without a stream of nutrients seeping up from the deep Earth, the only potential source of energy lies above the lake. The ice sheet above the water is creeping from west to east at a rate of roughly four meters per year. The lowermost layers of ice melt when they come in contact with the lake, liberating trapped gases and bits of crushed-up rock. If the glacier recently passed over rock before reaching the lake, it could be supplying organic compounds useful to microorganisms. It also could be seeding the lake with a continuous source of new residents. Bacteria, yeasts, fungi, algae and even pollen grains have been found in the Vostok ice core samples taken down to depths of 2,750m - three quarters of the way to the bottom. At least some of these organisms are alive and capable of growing, according to recent reports.`
      },
      questions: [
        {
          type: 'drag-and-drop',
          instruction: 'Choose the most suitable heading for sections B-E from the list of headings below.',
          items: [
            { questionNumber: 1, label: 'Section B' },
            { questionNumber: 2, label: 'Section C' },
            { questionNumber: 3, label: 'Section D' },
            { questionNumber: 4, label: 'Section E' }
          ],
          options: [
            { label: 'Cost of exploration', value: 'i' },
            { label: 'Location and description of the lake', value: 'ii' },
            { label: 'Potential for living organisms in the lake', value: 'iii' },
            { label: 'Challenges of exploration', value: 'iv' },
            { label: 'Discovery of the lake', value: 'v' },
            { label: 'Possible sources of nutrients to support life', value: 'vi' },
            { label: 'Types of organisms in the lake', value: 'vii' },
            { label: 'Scientific interest in Lake Vostok', value: 'viii' }
          ]
        },
        {
          type: 'multiple-choice',
          questionNumber: 5,
          question: 'Which is NOT given as a reason for interest in exploring Lake Vostok?',
          options: [
            { label: 'To test technology for space exploration', value: 'A' },
            { label: 'To develop anti-pollution devices', value: 'B' },
            { label: 'To investigate the history of Earth\'s climate', value: 'C' },
            { label: 'To look for living organisms', value: 'D' }
          ]
        },
        {
          type: 'multiple-choice',
          questionNumber: 6,
          question: 'Lake Vostok does not freeze because...',
          options: [
            { label: 'A thick ice cover provides insulation.', value: 'A' },
            { label: 'It is warmed by heat from the earth\'s interior.', value: 'B' },
            { label: 'Low pressure prevents freezing.', value: 'C' },
            { label: 'An underwater volcano erupted recently.', value: 'D' }
          ]
        },
        {
          type: 'yes-no-not-given',
          instruction: 'Do the following statements reflect the claims of the author?',
          statements: [
            { questionNumber: 7, statement: 'Only one lake has been found beneath Antarctica.' },
            { questionNumber: 8, statement: 'Lake Vostok was detected by radar.' },
            { questionNumber: 9, statement: 'Exploration of Lake Vostok is coordinated by Russia.' },
            { questionNumber: 10, statement: 'Nutrients to support life have been found in the Antarctic ice.' },
            { questionNumber: 11, statement: 'The ice above the lake is moving to the east.' },
            { questionNumber: 12, statement: 'Scientists have drilled through the ice into the water of Lake Vostok.' },
            { questionNumber: 13, statement: 'The water in the lake is approximately 500 meters deep at the southern end.' }
          ]
        }
      ]
    },
    {
      sectionNumber: 2,
      title: 'READING PASSAGE 2',
      passage: {
        title: 'The Cells from Hell',
        content: `Recently, an international team of biologists met to discuss what they believe is a global crisis in the sudden appearance of strange marine microorganisms capable of poisoning not just fish but people too. In the mid-1980s, fishermen in North Carolina, on the eastern coast of the United States, began complaining about mysterious fish kills. They were convinced that pollution was responsible but nobody would listen. That changed in 1988 after an accident at a research center. Tank after tank of fish suddenly died. Researchers spotted an unknown microorganism in the water. It was later named pfiesteria. Pfiesteria belongs to a prehistoric group of algae that are part plant, part animal. They are called dinoflagellates after the tiny whips or flagella that propel them through the water. Magnified a thousand times they are some of the strangest and most beautiful creatures in the sea. They are at the bottom of the food chain but, to deter fish from swallowing them, some have evolved powerful toxins. As the researchers were to discover, pfiesteria doesn't just discourage fish. It actively hunts them, then eats them. Fish are one of its preferred foods but one of the intriguing things about pfiesteria is that it will eat everything from bacteria to dead plant and animal remains all the way up to mammalian tissues. So its food spans the entire food web of an estuary. Gradually the researchers realised that nothing in the water was safe from pfiesteria. It could harm humans too. A mis-directed air-conditioning duct from a room containing the toxins nearly killed one of the researchers. He suffered a host of symptoms ranging from profuse sweating, tingling hands and feet, to liver and kidney problems, as well as memory loss. As the research intensified, some startling discoveries were made. In tanks, pfiesteria was quite content to behave like a plant and photosynthesize. However, when fish were added, a dramatic transformation occurred. Pfiesteria switched to attack mode. In a matter of minutes it changed shape and secreted a toxin. The fish quickly became disorientated and within five minutes all were dead. Pfiesteria changed shape again and devoured them. When it had had its fill, it vanished. No one had ever seen an organism do this. Initially scientists believed this was part of a natural cycle, but on closer examination, it seemed pollution was to blame. When the water containing the biggest fish kills was analysed, scientists found high levels of pollution. But this is just one of the factors that can boost the transformation in pfiesteria. Others include large numbers of fish travelling together which feed in poorly flushed places with a lot of algae to eat and other rich food sources. That is the perfect habitat for pfiesteria. But pfiesteria is not the only concern. In the oceans all around the world similar kinds of algae are now materialising and turning toxic. In the last decade these algal blooms have poisoned sea-lions in California, caused catastrophic fish kills in the Pacific, the Mediterranean and the North Sea, and devastated the shellfish industry in New Zealand. Researchers from forty-seven nations met recently to share the latest information about harmful algal blooms. They heard about new kinds of toxins and discussed possible links between algae and whale standings. But what dominated the proceedings was news that toxic algae are spreading to new shores in ballast water carried by ships. That may have already happened in Australian waters. A tuna kill in 1996 cost fish farmers an estimated $45 million. The official explanation was that a storm was to blame. But there were also reports of orange-brown streaks in the water. When a water sample was examined, it was found to be teeming with an alga never before seen in Australia, called chattonella. The same chattonella killed half a billion dollars' worth of fish in Japan in 1972.`
      },
      questions: [
        {
          type: 'drag-drop-summary',
          instruction: 'Complete the summary by selecting words from the box.',
          paragraph: 'Pfiesteria is a microorganism with some unusual characteristics. Under normal conditions, it acts like a (14)... but it has also developed powerful (15)... as a defence against being eaten by fish. When the fish are disabled and killed by the neurotoxins, the organism (16)... and it (17)...',
          questionNumbers: [14, 15, 16, 17],
          optionsList: ['jaws', 'kills', 'plant', 'disappears', 'grows', 'eats', 'microorganism', 'fish', 'animal', 'poisons', 'dies', 'bacteria']
        },
        {
          type: 'paragraph-gap',
          instruction: 'Fill in the blanks with NO MORE THAN THREE WORDS from the passage.',
          paragraph: 'Conditions which favour the growth of toxic algae include high levels of (18)... and (19)... fish feeding together. Research scientists at the international conference learned about (20)... toxic algae and how they are spreading around the world in water (21)...',
          questionNumbers: [18, 19, 20, 21]
        },
        {
          type: 'dropdown',
          instruction: 'Classify the following as caused by pfiesteria (A), chattonella (B), or an unidentified microorganism (C).',
          items: [
            { questionNumber: 22, statement: 'Death of sea-lions off the coast of California (1990s)' },
            { questionNumber: 23, statement: 'Fish kill in Japan (1972)' },
            { questionNumber: 24, statement: 'Shellfish industry losses in New Zealand (1990s)' },
            { questionNumber: 25, statement: 'Tuna industry losses in Australia (1990s)' },
            { questionNumber: 26, statement: 'Fish kill in North Carolina (1980s)' }
          ],
          options: [
            { label: 'Caused by pfiesteria', value: 'A' },
            { label: 'Caused by chattonella', value: 'B' },
            { label: 'Caused by an unidentified microorganism', value: 'C' }
          ]
        }
      ]
    },
    {
      sectionNumber: 3,
      title: 'READING PASSAGE 3',
      passage: {
        title: 'Mystery of the Mummies',
        content: `In 1992, a German scientist made a discovery which was to upset whole areas of scientific study from history and archaeology to chemistry and botany. Dr. Svetlana Balabanova, a forensic specialist, was performing tissue tests on an Egyptian mummy, part of a German museum collection. The mummified remains were of a woman named Henut-Taui who had died over 3,000 years ago. Amazingly, the tests revealed that her body contained large quantities of cocaine and nicotine. Dr. Balabanova had regularly used the same testing methods to convict people of drug consumption but she had not expected to find nicotine and cocaine in an Ancient Egyptian mummy. It is generally accepted that these two plants, native to the Americas, did not exist on other continents prior to European exploration. Dr. Balabanova repeated the tests then sent out fresh samples to three other labs. When the results came back positive, she published a paper with two other scientists. If Balabanova was shocked by the results of her tests, she was even more shocked at the hostile response to her publication. She received many insulting letters, accusing her of fraud. There were two explanations that came immediately to mind. One was that something in the tests could have given a false result. The second was that the mummies tested were not truly Ancient Egyptian. Perhaps they were relatively modern bodies, containing traces of cocaine. Dr. Balabanova then examined tissue from 134 naturally preserved bodies over a thousand years old discovered in an excavated cemetery in the Sudan. About a third of them tested positive for nicotine or cocaine. But something had happened even earlier which should have initiated serious discussion. In 1976, the mummified remains of Ramses II arrived in Paris for repair work. Dr. Michelle Lescot of the Natural History Museum (Paris) was looking at sections of bandages and within the fibres found a plant fragment. When she checked it under a microscope, she was amazed to discover that the plant was tobacco. Fearing that she had made some mistake, she repeated her tests again and again with the same result every time: a New World plant had been found on an Old World mummy. The results caused a sensation in Europe. Was it possible that a piece of tobacco had been dropped by chance from the pipe of some forgotten archaeologist? Dr. Lescot responded to this charge of contamination by carefully extracting new samples from the abdomen, with the entire process recorded on film. These samples, which could not be 'droppings', were then tested. Once again they were shown to be tobacco. The discovery of tobacco fragments in the mummified body of Ramses II should have had a profound influence upon our whole understanding of the relationship between Ancient Egypt and America but this piece of evidence was simply ignored. It raised too many questions and was too far outside of commonly accepted scientific views. So now the question had returned. Could Ancient Egyptian trade have stretched all the way across the Atlantic Ocean?`
      },
      questions: [
        {
          type: 'multiple-choice',
          questionNumber: 27,
          question: 'What most surprised Dr. Balabanova about her discovery?',
          options: [
            { label: 'The presence of drugs in the mummies', value: 'A' },
            { label: 'The fact that the plants originated in the western hemisphere', value: 'B' },
            { label: 'The positive results of tests on other mummies', value: 'C' },
            { label: 'The hostile reaction of the scientific community', value: 'D' }
          ]
        },
        {
          type: 'multiple-choice',
          questionNumber: 28,
          question: 'Which of the following was ruled out by Dr. Lescot\'s investigation?',
          options: [
            { label: 'Tobacco had been dropped onto the mummy.', value: 'A' },
            { label: 'Tobacco grew in Ancient Egypt.', value: 'B' },
            { label: 'Chemicals produced false test results.', value: 'C' },
            { label: 'The mummies were fake.', value: 'D' }
          ]
        },
        {
          type: 'multiple-choice',
          questionNumber: 29,
          question: 'Why was the discovery of tobacco in the body of Ramses II ignored?',
          options: [
            { label: 'Contamination was suspected.', value: 'A' },
            { label: 'The evidence raised difficult questions.', value: 'B' },
            { label: 'The tests produced false results.', value: 'C' },
            { label: 'The researcher was a woman.', value: 'D' }
          ]
        },
        {
          type: 'dropdown',
          instruction: 'Match researchers to statements about their findings.',
          items: [
            { questionNumber: 30, statement: 'First to find a substance from the Americas in a mummy' },
            { questionNumber: 31, statement: 'Argues against transoceanic trade because of lack of evidence' },
            { questionNumber: 32, statement: 'Had to defend against attacks on research methodology' },
            { questionNumber: 33, statement: 'Gives evidence of extensive Egyptian trade in ancient times' },
            { questionNumber: 34, statement: 'Publication of research results was controversial' }
          ],
          options: [
            { label: 'Dr. Svetlana Balabanova', value: 'A' },
            { label: 'Dr. Michelle Lescot', value: 'B' },
            { label: 'Professor John Baines', value: 'C' },
            { label: 'Professor Martin Bernal', value: 'D' }
          ]
        },
        {
          type: 'yes-no-not-given',
          instruction: 'Do the following statements reflect the opinions of the writer?',
          statements: [
            { questionNumber: 35, statement: 'There is proof that tobacco was grown in Ancient Egypt.' },
            { questionNumber: 36, statement: 'Trade routes across the Atlantic Ocean may have existed thousands of years ago.' },
            { questionNumber: 37, statement: 'Ancient Egyptians were great ship builders.' },
            { questionNumber: 38, statement: 'The scientific community generally rejects the idea of contact between Ancient Egypt and the Americas.' },
            { questionNumber: 39, statement: 'The unusual test results could have come from a plant native to North Africa.' }
          ]
        },
        {
          type: 'multiple-choice',
          questionNumber: 40,
          question: 'What is the main idea of this passage?',
          options: [
            { label: 'Experimental research often gives false results.', value: 'A' },
            { label: 'Long-held beliefs can be challenged by new information.', value: 'B' },
            { label: 'The scientific community is conservative by nature.', value: 'C' },
            { label: 'Ideas which don\'t fit our belief system must be wrong.', value: 'D' }
          ]
        }
      ]
    }
  ]
};
