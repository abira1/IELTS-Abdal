// Track: 709-AC Reading
import { Track } from './track1';

export const track709Reading: Track = {
  id: 'track-709-reading',
  name: '709-AC Reading',
  shortName: '709-AC',
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
        title: 'Sleeping on the job',
        content: `North Americans are not a people of the siesta. There is a tendency to associate afternoon naps with laziness and non-productivity. Latin Americans and some in European cultures take a different view. In Mexico and Greece, for example, it is customary to close businesses between noon and about 4:00 pm - siesta time. Recent studies are showing that if you can take a 15 to 30-minute nap while at work in the afternoon, you'll be more alert, more energetic, happier doing what you do, more productive and therefore more likely to get ahead. Napping on the job is not yet a trend but there is serious talk in academic circles about the merits of 'power napping'.

By some estimate, the average American collects an annual 'sleep debt' of 500 hours - subtracting from an assumed norm of eight hours a night. Two out of three Americans get less than eight hours of sleep a night during the work week, according to a recent study by the National Sleep Foundation in Washington. Forty percent say they're so tired that it interferes with their daily activities. Sleep researcher William Anthony, a professor of psychology at Boston University, says fatigue is a significant problem in modern society. He says sleepiness is a leading cause of auto accidents, second only to drunkenness. All that drowsiness costs an estimated $18 billion annually in lost productivity. 'We have a simple message,' says Professor Anthony. 'People should be allowed to nap at their breaks. The rationale is a productivity one - workers are sleepy, and when they're sleepy on the job they're not productive.'

Some companies are encouraging sleep at work, primarily for safety. The Metropolitan Transit Authority, which runs the New York subway system and two suburban railroads, is considering power naps for its train operators and bus drivers. Another railway has started letting its train operators take nap breaks of up to 45 minutes but only when trains are stopped at designated spots off the main lines and dispatchers have been notified. Some overseas air carriers permit airline pilots, when not on duty, to nap in the cockpit. Airlines in the United States have not accepted this practice yet.

According to the Encyclopedia of Sleep and Dreaming: 'There is a biologically-based tendency to fall asleep in mid-afternoon just as there is a tendency to fall asleep at night. Moreover, if sleep the night before is reduced or disturbed for any reason, a nap the subsequent afternoon is not only more likely to occur, but it can also relieve sleepiness and increase alertness.' The nap zone, documented in numerous studies, is typically between noon and 3:00 pm. Some people power through this natural slowdown with caffeine or sugar but if employers allowed naps, the benefits would be improvements in mood and performance, especially in mid-afternoon. Workers would concentrate better and persevere in tasks longer. Workers commonly sneak naps even without permission but some companies have begun encouraging naps as part of their policies on boosting production. One US distributor, is opening a 2,000-square-foot nap facility that provides beds for up to 20 of its 225 workers at a time. A company in Japan sets up tents in business offices, provides eyeshades and ear plugs and encourages employees to snooze in the middle of the work day. According to Professor Anthony, 'You're not going to see napping at traditional types of operations ... but in 21st century-style operations, this isn't going to be a perk. It's going to have more to do with productivity. Smart employers are understanding that their employees need rest to do their best.'

Some suspect that corporate naptime, like other perks, is just a way to keep people at the office longer. On the other hand, growing flexibility in hours, for some workers, is allowing nap times to become more common. With eleven million Americans telecommuting and another forty million working full- or part-time, office hours are basically as long as you can stay awake. One thing is sure: longer commutes, more intense, stressful workday and higher production demands are taking a toll. So, with Americans sleeping less and working longer hours, some employers are warming up to the idea that a little nap in the middle of the day can be good for business.`
      },
      questions: [
        {
          type: 'multiple-choice',
          questionNumber: 1,
          question: 'According to the passage, which of the following statements is supported by recent research?',
          options: [
            { label: 'Napping is an indicator of laziness.', value: 'A' },
            { label: 'Two thirds of Americans sleep too much.', value: 'B' },
            { label: 'Napping in the workplace is a current trend.', value: 'C' },
            { label: 'Short naps at work increase productivity.', value: 'D' }
          ]
        },
        {
          type: 'true-false-not-given',
          questionNumber: 2,
          statement: 'The number one cause of car accidents is fatigue.'
        },
        {
          type: 'true-false-not-given',
          questionNumber: 3,
          statement: 'People who nap in the afternoon are lazy.'
        },
        {
          type: 'true-false-not-given',
          questionNumber: 4,
          statement: 'A nap in the middle of the day can improve your mood.'
        },
        {
          type: 'true-false-not-given',
          questionNumber: 5,
          statement: 'People who nap regularly live longer.'
        },
        {
          type: 'true-false-not-given',
          questionNumber: 6,
          statement: 'The majority of Americans sleep at least eight hours a night.'
        },
        {
          type: 'drag-and-drop',
          questionNumber: 7,
          statement: 'Humans are biologically programmed to ...',
          options: [
            { label: 'drink coffee to stay awake during the afternoon', value: 'A' },
            { label: 'have a nap during breaks', value: 'B' },
            { label: 'fall asleep when they are bored', value: 'C' },
            { label: 'sneak naps without permission', value: 'D' },
            { label: 'resist the trend toward napping', value: 'E' },
            { label: 'fall asleep in the afternoon', value: 'F' }
          ]
        },
        {
          type: 'drag-and-drop',
          questionNumber: 8,
          statement: 'Employees of some progressive companies are encouraged to ...',
          options: [
            { label: 'drink coffee to stay awake during the afternoon', value: 'A' },
            { label: 'have a nap during breaks', value: 'B' },
            { label: 'fall asleep when they are bored', value: 'C' },
            { label: 'sneak naps without permission', value: 'D' },
            { label: 'resist the trend toward napping', value: 'E' },
            { label: 'fall asleep in the afternoon', value: 'F' }
          ]
        },
        {
          type: 'drag-and-drop',
          questionNumber: 9,
          statement: 'Traditional employers are likely to ...',
          options: [
            { label: 'drink coffee to stay awake during the afternoon', value: 'A' },
            { label: 'have a nap during breaks', value: 'B' },
            { label: 'fall asleep when they are bored', value: 'C' },
            { label: 'sneak naps without permission', value: 'D' },
            { label: 'resist the trend toward napping', value: 'E' },
            { label: 'fall asleep in the afternoon', value: 'F' }
          ]
        },
        {
          type: 'table-gap',
          questionNumber: 10,
          statement: 'In the transportation industry napping is a matter of',
          instruction: 'Complete using NO MORE THAN THREE WORDS from the passage.'
        },
        {
          type: 'table-gap',
          questionNumber: 11,
          statement: 'On some airlines, pilots can sleep in the cockpit if',
          instruction: 'Complete using NO MORE THAN THREE WORDS from the passage.'
        },
        {
          type: 'multiple-choice',
          questionNumber: 12,
          question: 'According to the writer, in America the workplace is becoming ...',
          options: [
            { label: 'less flexible.', value: 'A' },
            { label: 'more exciting.', value: 'B' },
            { label: 'less demanding.', value: 'C' },
            { label: 'more stressful.', value: 'D' }
          ]
        },
        {
          type: 'multiple-choice',
          questionNumber: 13,
          question: 'According to the writer, what is the main reason why employers support the idea of naps at work?',
          options: [
            { label: 'for health reasons', value: 'A' },
            { label: 'to promote safety', value: 'B' },
            { label: 'to increase productivity', value: 'C' },
            { label: 'to encourage creativity', value: 'D' }
          ]
        }
      ]
    },
    {
      sectionNumber: 2,
      title: 'READING PASSAGE 2',
      passage: {
        title: 'Homeopathy',
        content: `A. Homeopathy is an alternative system of medicine, founded in the early 19th century by a German physician, Dr. Samuel Hahnemann. Since 1980, homeopathy has experienced a strong resurgence of interest in North and South America as well as in Europe. Surveys indicate that more than a third of French physicians have prescribed homeopathic remedies and almost 50 percent of British physicians have referred patients for homeopathic treatment.

B. Hahnemann's discovery of the principle of homeopathy was accidental. After taking some quinine, he noticed that he developed malaria-like symptoms. Since malaria patients were treated with quinine, he speculated that possibly malaria is cured by quinine because it causes malaria-like symptoms in healthy people. He decided to explore his theory by testing other substances used as medicine at the time, such as arsenic and belladonna. His tests were conducted by either taking the substances internally himself or by administering them to healthy volunteers and then recording all of the symptoms the volunteers experienced. He continued his experiments on a wide range of natural substances, often toxic. These recorded results created 'drug pictures' which formed the basis for the new system of medicine. The next step was to give the tested substances to patients suffering from the same group of symptoms represented by the drug picture recorded. The results were incredible. People were being cured from diseases that had never been cured before. He condensed his theory into a single Latin phrase: similia similibus curentur (let likes be cured by likes). This means that a disease can be cured by a medicine which produces in a healthy person, symptoms similar to those experienced by the patient.

C. The process of making remedies is very precise. A homeopathic remedy is normally a single substance. The substances may be made from plants, minerals and even animals, for example snake venom and cuttlefish ink. To make remedies, the raw material is dissolved in a mixture that contains approximately 90% alcohol and 10% water. The mixture is left to stand for 2 to 4 weeks, shaken occasionally then strained. The resulting liquid or tincture is then diluted according to very specific measures to a factor of 1:100. For example, to produce a remedy called 1c potency or strength, one drop of the tincture is added to 99 drops of alcohol/water mixture. To produce a 2c potency, one drop of the 1c mixture is added to 99 drops of alcohol/water mixture. Between each mixture the remedy is shaken vigorously. Hahnemann believed that through this process, the energy of the substance was released. Once the remedy has been diluted beyond a 12c potency, it is unlikely that even a molecule of the original substance remains. Yet, ironically, the more dilute the remedy, the stronger it is. This makes no sense in light of present-day science but regardless of what science tells us is impossible, in practice, the higher the dilution the stronger and more lasting the effect.

D. It is this use of high dilutions that has given rise to controversy. Many conventional doctors claim that homeopathy functions only as a placebo because the dosage is so small. However, the clinical experience of homeopathy shows that this tiny dose can be effective: it works on unconscious people and infants, and it even works on animals. Controlled clinical studies performed by medical researchers are demonstrating that homeopathy can be an effective method of treatment for many diseases.

E. The most important part of homeopathic treatment lies in the lengthy interview which the homeopath conducts with the patient. The idea behind this one to two hour consultation is to build up a psychological, emotional and physical history of the patient, to discover the underlying patterns of disease. The homeopath then decides which medicine to prescribe based on the closest match between the patient's symptoms and the known symptoms elicited by the medicine in a healthy body. A single dose is given for the shortest period of time necessary to stimulate the body's healing power.

F. How does the concept of homeopathy differ from that of conventional medicine? Very simply, homeopathy attempts to stimulate the body to recover itself. Instead of looking upon the symptoms as something wrong which must be set right, the homeopath sees them as signs of the way the body is attempting to help itself. Another basic difference between conventional medical therapy and homeopathy is in the role of medication. In much of conventional therapy the illness is controlled through regular use of medical substances. If the medication is withdrawn, the person returns to illness. For example, a person who takes a pill for high blood pressure every day is not undergoing a cure but is only controlling the symptoms. Homeopathy's aim is the cure: 'The complete restoration of perfect health,' as Dr. Hahnemann said.

G. Homeopathy has made significant progress in treating diseases which orthodox medicine finds difficult. Best at dealing with inflammatory conditions such as arthritis, skin conditions, migraines and respiratory problems linked to allergies, it has also proved highly successful at treating asthma. But homeopathy is not an appropriate treatment for degenerative diseases such as emphysema. It cannot treat diseases which destroy tissue, although it can still be beneficial if used in combination with other treatments. Two of the main advantages of homeotherapy are the low cost of the medications and the rarity of adverse reactions. The medicines are inexpensive, safe, and easy to use, so people can learn to handle many of the common illnesses for which they currently seek medical help. The resulting savings in costs and the increase in personal independence represent a significant contribution to health care.`
      },
      questions: [
        {
          type: 'drag-and-drop',
          questionNumber: 14,
          statement: 'Section B',
          options: [
            { label: 'The future of homeopathy', value: 'i' },
            { label: 'Concerns about homeopathy', value: 'ii' },
            { label: 'Comparison with traditional western medicine', value: 'iii' },
            { label: 'Dr. S. Hahnemann', value: 'iv' },
            { label: 'Theoretical and experimental basis', value: 'v' },
            { label: 'Revival of homeopathy', value: 'vi' },
            { label: 'Preparation of medicines', value: 'vii' },
            { label: 'Debate over effectiveness', value: 'viii' },
            { label: 'Advantages and limitations of homeopathy', value: 'ix' },
            { label: 'Aspects of treatment', value: 'x' }
          ]
        },
        {
          type: 'drag-and-drop',
          questionNumber: 15,
          statement: 'Section C',
          options: [
            { label: 'The future of homeopathy', value: 'i' },
            { label: 'Concerns about homeopathy', value: 'ii' },
            { label: 'Comparison with traditional western medicine', value: 'iii' },
            { label: 'Dr. S. Hahnemann', value: 'iv' },
            { label: 'Theoretical and experimental basis', value: 'v' },
            { label: 'Revival of homeopathy', value: 'vi' },
            { label: 'Preparation of medicines', value: 'vii' },
            { label: 'Debate over effectiveness', value: 'viii' },
            { label: 'Advantages and limitations of homeopathy', value: 'ix' },
            { label: 'Aspects of treatment', value: 'x' }
          ]
        },
        {
          type: 'drag-and-drop',
          questionNumber: 16,
          statement: 'Section D',
          options: [
            { label: 'The future of homeopathy', value: 'i' },
            { label: 'Concerns about homeopathy', value: 'ii' },
            { label: 'Comparison with traditional western medicine', value: 'iii' },
            { label: 'Dr. S. Hahnemann', value: 'iv' },
            { label: 'Theoretical and experimental basis', value: 'v' },
            { label: 'Revival of homeopathy', value: 'vi' },
            { label: 'Preparation of medicines', value: 'vii' },
            { label: 'Debate over effectiveness', value: 'viii' },
            { label: 'Advantages and limitations of homeopathy', value: 'ix' },
            { label: 'Aspects of treatment', value: 'x' }
          ]
        },
        {
          type: 'drag-and-drop',
          questionNumber: 17,
          statement: 'Section E',
          options: [
            { label: 'The future of homeopathy', value: 'i' },
            { label: 'Concerns about homeopathy', value: 'ii' },
            { label: 'Comparison with traditional western medicine', value: 'iii' },
            { label: 'Dr. S. Hahnemann', value: 'iv' },
            { label: 'Theoretical and experimental basis', value: 'v' },
            { label: 'Revival of homeopathy', value: 'vi' },
            { label: 'Preparation of medicines', value: 'vii' },
            { label: 'Debate over effectiveness', value: 'viii' },
            { label: 'Advantages and limitations of homeopathy', value: 'ix' },
            { label: 'Aspects of treatment', value: 'x' }
          ]
        },
        {
          type: 'drag-and-drop',
          questionNumber: 18,
          statement: 'Section F',
          options: [
            { label: 'The future of homeopathy', value: 'i' },
            { label: 'Concerns about homeopathy', value: 'ii' },
            { label: 'Comparison with traditional western medicine', value: 'iii' },
            { label: 'Dr. S. Hahnemann', value: 'iv' },
            { label: 'Theoretical and experimental basis', value: 'v' },
            { label: 'Revival of homeopathy', value: 'vi' },
            { label: 'Preparation of medicines', value: 'vii' },
            { label: 'Debate over effectiveness', value: 'viii' },
            { label: 'Advantages and limitations of homeopathy', value: 'ix' },
            { label: 'Aspects of treatment', value: 'x' }
          ]
        },
        {
          type: 'drag-and-drop',
          questionNumber: 19,
          statement: 'Section G',
          options: [
            { label: 'The future of homeopathy', value: 'i' },
            { label: 'Concerns about homeopathy', value: 'ii' },
            { label: 'Comparison with traditional western medicine', value: 'iii' },
            { label: 'Dr. S. Hahnemann', value: 'iv' },
            { label: 'Theoretical and experimental basis', value: 'v' },
            { label: 'Revival of homeopathy', value: 'vi' },
            { label: 'Preparation of medicines', value: 'vii' },
            { label: 'Debate over effectiveness', value: 'viii' },
            { label: 'Advantages and limitations of homeopathy', value: 'ix' },
            { label: 'Aspects of treatment', value: 'x' }
          ]
        },
        {
          type: 'table-gap',
          questionNumber: 20,
          statement: 'A single product is mixed with',
          instruction: 'Complete using NO MORE THAN THREE WORDS from the passage.'
        },
        {
          type: 'table-gap',
          questionNumber: 21,
          statement: 'The mixture is then',
          instruction: 'Complete using NO MORE THAN THREE WORDS from the passage.'
        },
        {
          type: 'table-gap',
          questionNumber: 22,
          statement: 'As the remedy becomes more diluted, it gets',
          instruction: 'Complete using NO MORE THAN THREE WORDS from the passage.'
        },
        {
          type: 'drag-and-drop',
          questionNumber: 23,
          statement: 'heal itself',
          options: [
            { label: 'cheaper', value: 'A' },
            { label: 'cure', value: 'B' },
            { label: 'heal itself', value: 'C' },
            { label: 'illness', value: 'D' },
            { label: 'treatments', value: 'E' },
            { label: 'getting better', value: 'F' },
            { label: 'control symptoms', value: 'G' },
            { label: 'more expensive', value: 'H' },
            { label: 'side effects', value: 'I' },
            { label: 'stronger', value: 'J' }
          ]
        },
        {
          type: 'drag-and-drop',
          questionNumber: 24,
          statement: 'control symptoms',
          options: [
            { label: 'cheaper', value: 'A' },
            { label: 'cure', value: 'B' },
            { label: 'heal itself', value: 'C' },
            { label: 'illness', value: 'D' },
            { label: 'treatments', value: 'E' },
            { label: 'getting better', value: 'F' },
            { label: 'control symptoms', value: 'G' },
            { label: 'more expensive', value: 'H' },
            { label: 'side effects', value: 'I' },
            { label: 'stronger', value: 'J' }
          ]
        },
        {
          type: 'drag-and-drop',
          questionNumber: 25,
          statement: 'cheaper',
          options: [
            { label: 'cheaper', value: 'A' },
            { label: 'cure', value: 'B' },
            { label: 'heal itself', value: 'C' },
            { label: 'illness', value: 'D' },
            { label: 'treatments', value: 'E' },
            { label: 'getting better', value: 'F' },
            { label: 'control symptoms', value: 'G' },
            { label: 'more expensive', value: 'H' },
            { label: 'side effects', value: 'I' },
            { label: 'stronger', value: 'J' }
          ]
        },
        {
          type: 'drag-and-drop',
          questionNumber: 26,
          statement: 'side effects',
          options: [
            { label: 'cheaper', value: 'A' },
            { label: 'cure', value: 'B' },
            { label: 'heal itself', value: 'C' },
            { label: 'illness', value: 'D' },
            { label: 'treatments', value: 'E' },
            { label: 'getting better', value: 'F' },
            { label: 'control symptoms', value: 'G' },
            { label: 'more expensive', value: 'H' },
            { label: 'side effects', value: 'I' },
            { label: 'stronger', value: 'J' }
          ]
        }
      ]
    },
    {
      sectionNumber: 3,
      title: 'READING PASSAGE 3',
      passage: {
        title: 'The hemp revival',
        content: `The hemp plant, one of the world's oldest industrial resources, is back. The rediscovery of this renewable resource is making it the fibre of choice for future textiles, personal care products, building materials, paper and fuel.

Hemp has been grown for paper, textiles, food and medicine throughout human history. The earliest known woven fabric, made of hemp, dates back to the eighth millennium (8000-7000 BC). The majority of all sails, clothes, tents, rugs, towels, paper, rope, twine, art canvas, paints, varnishes and lighting oil were made from hemp. Hemp seeds were regularly used as a source of food and protein for centuries.

Hemp's drastic decline in use and importance within a matter of fifty years is widely considered to have been brought about by the timber and petrochemical industries in America. By the mid-1930s, changes in technology were beginning to impact on the hemp industry. Mechanical stripping equipment and machines to conserve hemp's high-cellulose pulp became available and affordable. Timber and paper holding companies stood to lose billions of dollars if hemp were to be grown on a large scale. A resurgence of the hemp industry also threatened the emerging petro-chemical companies which had patented the chemicals for pulp processing. Newspaper articles began to appear, linking hemp with violent crime. The term used, however, was 'marijuana' to distance it from hemp used for industrial purposes. Because few people realised that marijuana and hemp came from the same plant species, virtually nobody suspected that the Marijuana Prohibition of 1938 would destroy the hemp industry.

Supporting the theory that marijuana was banned to destroy the hemp industry, were two articles written just before the Marijuana Prohibition, claiming that hemp was on the verge of becoming a super crop. These articles, which appeared in well-respected magazines, praised the usefulness and potential of hemp. 'Hemp can be used to produce more than 25,000 products', and 'hemp will prove, for both farmer and public, the most profitable and desirable crop that can be grown.' This was the first time that 'billion dollar' was used to describe the value of a crop. Less than one year after these articles were written, the Marijuana Prohibition took effect. To what extent a conspiracy was involved is still being debated, but the important thing is that for thousands of years, hemp was used extensively. Then over a short period, it became illegal in many parts of the world. Now, however, the focus is on the development of hemp as an industrial resource. Initially, a distinction needs to be made between the two types of hemp. 'Cannabis has evolved into two basic species. Plants grown for fibre and seed are universally called hemp. Cannabis grown for its drug content is commonly called marijuana or drug cannabis. Drug-type cannabis varies widely in THC content from approximately 1-2% in unselected strains to 10% in the best modern varieties.' (as cited from Watson 1994). Hemp contains virtually none of the active ingredients of drug-type cannabis (THC). It is not feasible to 'get high' on hemp, and most marijuana produces very low-quality fibre. Hemp should never be confused with marijuana, as their roles cannot be reversed.

It is evident that hemp is an extraordinary fibre. Both stems and seeds can be utilised. Most significantly, hemp can be grown without pesticides and herbicides. The plant also has the ability to suppress weeds and soil-borne diseases. Based on the hemp industries which have been established overseas, there is a large demand for hemp products and hemp is proving to be a highly profitable industry. On an annual basis, one acre of hemp will produce as much fibre as 2 to 3 acres of cotton. The fibre is stronger and softer than cotton, lasts twice as long and will not mildew. Cotton grows only in warm climates and requires more water and more fertiliser than hemp as well as large quantities of pesticide and herbicide. Hemp can also be used to produce fibreboard that is stronger and lighter than wood, and is fire retardant. Unlike paper from wood pulp, hemp paper contains no dioxin, or other toxic residue, and a single acre of hemp can produce the same amount of paper as four acres of trees. The trees take 20 years to harvest and hemp takes a single season. In warm climates hemp can be harvested two or even three times a year. On an annual basis, one acre of hemp will produce as much paper as 2 to 4 acres of trees. From tissue paper to cardboard, all types of paper products can be produced from hemp. The quality of hemp paper is superior to tree-based paper. Hemp paper will last hundreds of years without degrading and it can be recycled many more times than tree-based paper.

Today, industrialised nations around the world are waking up to the enormous potential of hemp. While some countries, like China and India, have never had laws against hemp cultivation, others are legalising industrial hemp after many years of lumping it together with marijuana. The products and fabrics that are emerging from the international hemp industry are finding strong demand in an eco-aware global community. Hemp is indeed an agricultural crop for the twenty-first century.`
      },
      questions: [
        {
          type: 'drag-and-drop',
          questionNumber: 27,
          statement: 'F',
          options: [
            { label: 'Timber and petro-chemical industries threatened', value: 'A' },
            { label: 'Articles praise hemp as a potential billion dollar crop', value: 'B' },
            { label: 'Widespread cultivation of hemp', value: 'C' },
            { label: 'Prohibition of marijuana', value: 'D' },
            { label: 'Newspaper articles link hemp to violent crime', value: 'E' },
            { label: 'Development of stripping machines', value: 'F' }
          ]
        },
        {
          type: 'drag-and-drop',
          questionNumber: 28,
          statement: 'A',
          options: [
            { label: 'Timber and petro-chemical industries threatened', value: 'A' },
            { label: 'Articles praise hemp as a potential billion dollar crop', value: 'B' },
            { label: 'Widespread cultivation of hemp', value: 'C' },
            { label: 'Prohibition of marijuana', value: 'D' },
            { label: 'Newspaper articles link hemp to violent crime', value: 'E' },
            { label: 'Development of stripping machines', value: 'F' }
          ]
        },
        {
          type: 'drag-and-drop',
          questionNumber: 29,
          statement: 'E',
          options: [
            { label: 'Timber and petro-chemical industries threatened', value: 'A' },
            { label: 'Articles praise hemp as a potential billion dollar crop', value: 'B' },
            { label: 'Widespread cultivation of hemp', value: 'C' },
            { label: 'Prohibition of marijuana', value: 'D' },
            { label: 'Newspaper articles link hemp to violent crime', value: 'E' },
            { label: 'Development of stripping machines', value: 'F' }
          ]
        },
        {
          type: 'drag-and-drop',
          questionNumber: 30,
          statement: 'B',
          options: [
            { label: 'Timber and petro-chemical industries threatened', value: 'A' },
            { label: 'Articles praise hemp as a potential billion dollar crop', value: 'B' },
            { label: 'Widespread cultivation of hemp', value: 'C' },
            { label: 'Prohibition of marijuana', value: 'D' },
            { label: 'Newspaper articles link hemp to violent crime', value: 'E' },
            { label: 'Development of stripping machines', value: 'F' }
          ]
        },
        {
          type: 'drag-and-drop',
          questionNumber: 31,
          statement: 'D',
          options: [
            { label: 'Timber and petro-chemical industries threatened', value: 'A' },
            { label: 'Articles praise hemp as a potential billion dollar crop', value: 'B' },
            { label: 'Widespread cultivation of hemp', value: 'C' },
            { label: 'Prohibition of marijuana', value: 'D' },
            { label: 'Newspaper articles link hemp to violent crime', value: 'E' },
            { label: 'Development of stripping machines', value: 'F' }
          ]
        },
        {
          type: 'table-gap',
          questionNumber: 32,
          statement: 'very low-quality fibre',
          instruction: 'Complete using NO MORE THAN THREE WORDS from the passage.'
        },
        {
          type: 'table-gap',
          questionNumber: 33,
          statement: 'virtually none of the active ingredients',
          instruction: 'Complete using NO MORE THAN THREE WORDS from the passage.'
        },
        {
          type: 'dropdown',
          questionNumber: 34,
          statement: 'mildew-resistant',
          options: [
            { label: 'A. Hemp', value: 'A' },
            { label: 'B. Wood', value: 'B' },
            { label: 'C. Cotton', value: 'C' }
          ]
        },
        {
          type: 'dropdown',
          questionNumber: 35,
          statement: 'dioxin is a by-product of processing',
          options: [
            { label: 'A. Hemp', value: 'A' },
            { label: 'B. Wood', value: 'B' },
            { label: 'C. Cotton', value: 'C' }
          ]
        },
        {
          type: 'dropdown',
          questionNumber: 36,
          statement: 'can be harvested more than once a year',
          options: [
            { label: 'A. Hemp', value: 'A' },
            { label: 'B. Wood', value: 'B' },
            { label: 'C. Cotton', value: 'C' }
          ]
        },
        {
          type: 'dropdown',
          questionNumber: 37,
          statement: 'large amounts of fertiliser needed',
          options: [
            { label: 'A. Hemp', value: 'A' },
            { label: 'B. Wood', value: 'B' },
            { label: 'C. Cotton', value: 'C' }
          ]
        },
        {
          type: 'dropdown',
          questionNumber: 38,
          statement: 'fire-retardant properties',
          options: [
            { label: 'A. Hemp', value: 'A' },
            { label: 'B. Wood', value: 'B' },
            { label: 'C. Cotton', value: 'C' }
          ]
        },
        {
          type: 'dropdown',
          questionNumber: 39,
          statement: 'requires mild temperature',
          options: [
            { label: 'A. Hemp', value: 'A' },
            { label: 'B. Wood', value: 'B' },
            { label: 'C. Cotton', value: 'C' }
          ]
        },
        {
          type: 'multiple-choice',
          questionNumber: 40,
          question: 'The main purpose of this article is ...',
          options: [
            { label: 'to criticise government policy on hemp.', value: 'A' },
            { label: 'to show the economic benefits of hemp.', value: 'B' },
            { label: 'to compare hemp and marijuana.', value: 'C' },
            { label: 'to promote research into new uses of hemp.', value: 'D' }
          ]
        }
      ]
    }
  ]
};
