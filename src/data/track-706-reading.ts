// Track: 706-M Reading
import { Track } from './track1';

export const track706Reading: Track = {
  id: 'track-706-reading',
  name: '706-M Reading',
  shortName: '706MR',
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
        title: 'Spot the Difference',
        content: `Taxonomic history has been made this week, at least according to the World Wildlife Fund (WWF), a conservation group. Scientists have described a new species of clouded leopard from the tropical forests of Indonesia with spots (or "clouds", as they are poetically known) smaller than those of other clouded leopards, with fur a little darker and with a double as opposed to a "partial double" stripe down its back. However, no previously unknown beast has suddenly leapt out from the forest. Instead, some scientists have proposed a change in the official taxonomic accounting system of clouded leopards. Where there were four subspecies there will likely now be two species. A genetic analysis and a closer inspection of museum specimens' coats published in Current Biology has found no relevant difference between three subspecies described 50 years ago from continental Asia and from the Hainan and Taiwan islands. The 5,000-11,000 clouded leopards on Borneo, the 3,000-7,000 on Sumatra, and the remaining few on the nearby Batu islands can now, the authors say, claim a more elevated distinction as a species. What this actually means is fuzzy and whether it is scientifically important is questionable. In any case, biologists do not agree what species and subspecies are. Creatures are given Latin first and second names (corresponding to a genus and species) according to the convention of Carl von Linné, who was born 300 years ago this May. But Linnaeus, as he is more commonly known, thought of species as perfectly discrete units created by God. Darwinism has them as mutable things, generated gradually over time by natural selection. So, delineating when enough variation has evolved to justify a new category is largely a matter of taste.`
      },
      questions: [
        {
          type: 'matching-headings',
          instruction: 'The passage has 7 paragraphs labeled A-G. Which paragraph contains each of the following pieces of information? Drag the letter to the answer box.',
          passageTitle: 'Spot the Difference',
          items: [
            { questionNumber: 1, label: 'How it is generally accepted that different species are named' },
            { questionNumber: 2, label: 'The reason conservationists are happy with the apparent discovery' },
            { questionNumber: 3, label: 'How genes could cause a potential problem for conservationists' },
            { questionNumber: 4, label: 'Some scientists want to change the classification system' }
          ],
          headingOptions: [
            { 
              label: 'A', 
              value: 'A',
              content: '**A.** Taxonomic history has been made this week, at least according to the World Wildlife Fund (WWF), a conservation group. Scientists have described a new species of clouded leopard from the tropical forests of Indonesia with spots (or "clouds", as they are poetically known) smaller than those of other clouded leopards, with fur a little darker and with a double as opposed to a "partial double" stripe down its back.'
            },
            { 
              label: 'B', 
              value: 'B',
              content: '**B.** However, no previously unknown beast has suddenly leapt out from the forest. Instead, some scientists have proposed a change in the official taxonomic accounting system of clouded leopards. Where there were four subspecies there will likely now be two species. A genetic analysis and a closer inspection of museum specimens\' coats published in Current Biology has found no relevant difference between three subspecies described 50 years ago from continental Asia and from the Hainan and Taiwan islands. The 5,000-11,000 clouded leopards on Borneo, the 3,000-7,000 on Sumatra, and the remaining few on the nearby Batu islands can now, the authors say, claim a more elevated distinction as a species.'
            },
            { 
              label: 'C', 
              value: 'C',
              content: '**C.** Creatures are given Latin first and second names (corresponding to a genus and species) according to the convention of Carl von Linné, who was born 300 years ago this May. But Linnaeus, as he is more commonly known, thought of species as perfectly discrete units created by God. Darwinism has them as mutable things, generated gradually over time by natural selection. So, delineating when enough variation has evolved to justify a new category is largely a matter of taste.'
            },
            { 
              label: 'D', 
              value: 'D',
              content: '**D.** The traditional way around the problem is to call a species all members of a group that share the same gene pool. They can mate together and produce fertile offspring. Whether Indonesian clouded leopards can make cubs with continental ones remains unknown but seems probable. Instead, the claim this week is that genetics and slight differences in fur patterning are enough to justify rebranding the clouded leopard as two significant types.'
            },
            { 
              label: 'E', 
              value: 'E',
              content: '**E.** One thing is abundantly clear: conservationists who are trying to stop the destruction of the leopards\' habitat in Borneo and Sumatra see the announcement of a new species of big cat as a means to gain publicity and political capital. Upgrading subspecies to species is a strategy which James Mallet, of University College London, likes to call species inflation. It is a common by-product of genetic analysis, which can reveal differences between populations that the eye cannot.'
            },
            { 
              label: 'F', 
              value: 'F',
              content: '**F.** The problem of redefining species by genetics is the creation of taxonomic confusion, a potentially serious difficulty for conservationists and others. The recent proposal to add the polar bear to the list of animals protected under America\'s Endangered Species Act is an example. That seems all well and good. However, study the genetics and it transpires that polar bears are closer to some brown bears than some brown bears are to each other. Go by the genes and it seems that the polar bear would not count as a species in its own right (and thus might not enjoy the protection afforded to species) but should be labelled a subspecies of the brown bear.'
            },
            { 
              label: 'G', 
              value: 'G',
              content: '**G.** In conclusion, while taxonomic precision is important for scientific classification, the practical implications for conservation must also be considered. The balance between genetics-based and traditional species definitions remains a complex challenge for modern biology.'
            }
          ]
        },
        {
          type: 'paragraph-gap',
          instruction: 'Complete using NO MORE THAN TWO WORDS.',
          paragraph: 'It is difficult to decide exactly when there is enough (5)... to say an animal is a new species. It is (6)... to compare the number of species of ant and butterfly. Generally, animals of the same species can make (7)... together. Some scientists claim that genetics has led to (8)... rather than actual discovery.',
          questionNumbers: [5, 6, 7, 8]
        },
        {
          type: 'true-false-not-given',
          instruction: 'Do the statements agree with the information?',
          statements: [
            { questionNumber: 9, statement: 'The possible new species of leopard appears different in two ways.' },
            { questionNumber: 10, statement: 'Darwinism created a problem with how species are defined.' },
            { questionNumber: 11, statement: 'Lepidopterists study ants.' },
            { questionNumber: 12, statement: 'Scientists are going to study more clouded leopards in Indonesia.' },
            { questionNumber: 13, statement: 'The writer believes that polar bears are not a species in their own right.' }
          ]
        }
      ]
    },
    {
      sectionNumber: 2,
      title: 'READING PASSAGE 2',
      passage: {
        title: 'The Fertility Bust',
        content: `Falling populations - the despair of state pension systems - are often regarded with calmness, even a secret satisfaction, by ordinary people. Europeans no longer need large families to gather the harvest or to look after parents. They have used their good fortune to have fewer children, thinking this will make their lives better. Much of Europe is too crowded as it is. Is this all that is going on? Germans have been agonising about recent European Union estimates suggesting that 30% of German women are, and will remain, childless. The number is a guess: Germany does not collect figures like this. Even if the share is 25%, as other surveys suggest, it is by far the highest in Europe. Germany is something of an oddity in this. In most countries with low fertility, young women have their first child late, and stop at one. In Germany, women with children often have two or three, but many have none at all. Germany is also odd in experiencing low fertility for such a long time. Europe is demographically polarised. Countries in the north and west saw fertility fall early, in the 1960s. Recently, they have seen it stabilise or rise back towards replacement level (i.e. 2.1 births per woman). Countries in the south and east, on the other hand, saw fertility rates fall much faster, more recently (often to below 1.3, a rate at which the population falls by half every 45 years). Germany combines both. Its fertility rate fell below 2 in 1971. However, it has stayed low and is still only just above 1.3.`
      },
      questions: [
        {
          type: 'matching-headings',
          instruction: 'The passage has 6 paragraphs labeled A-F. Which paragraph best fits each of the following headings? Drag the letter to the answer box.',
          passageTitle: 'The Fertility Bust',
          items: [
            { questionNumber: 14, label: 'Even further falls?' },
            { questionNumber: 15, label: 'One-child policy' },
            { questionNumber: 16, label: 'Germany differs' },
            { questionNumber: 17, label: 'Possible reasons' }
          ],
          headingOptions: [
            { 
              label: 'A', 
              value: 'A',
              content: '**A.** Falling populations - the despair of state pension systems - are often regarded with calmness, even a secret satisfaction, by ordinary people. Europeans no longer need large families to gather the harvest or to look after parents. They have used their good fortune to have fewer children, thinking this will make their lives better. Much of Europe is too crowded as it is. Is this all that is going on?'
            },
            { 
              label: 'B', 
              value: 'B',
              content: '**B.** Germans have been agonising about recent European Union estimates suggesting that 30% of German women are, and will remain, childless. The number is a guess: Germany does not collect figures like this. Even if the share is 25%, as other surveys suggest, it is by far the highest in Europe. Germany is something of an oddity in this. In most countries with low fertility, young women have their first child late, and stop at one. In Germany, women with children often have two or three, but many have none at all. Germany is also odd in experiencing low fertility for such a long time.'
            },
            { 
              label: 'C', 
              value: 'C',
              content: '**C.** Europe is demographically polarised. Countries in the north and west saw fertility fall early, in the 1960s. Recently, they have seen it stabilise or rise back towards replacement level (i.e. 2.1 births per woman). Countries in the south and east, on the other hand, saw fertility rates fall much faster, more recently (often to below 1.3, a rate at which the population falls by half every 45 years). Germany combines both. Its fertility rate fell below 2 in 1971. However, it has stayed low and is still only just above 1.3.'
            },
            { 
              label: 'D', 
              value: 'D',
              content: '**D.** China\'s one-child policy was introduced in 1980 as a population control measure. While this policy did reduce population growth, it has also created demographic imbalances and social consequences. The policy has been relaxed in recent years, but its long-term effects on fertility patterns continue to be studied.'
            },
            { 
              label: 'E', 
              value: 'E',
              content: '**E.** Why have Germans decided to have fewer children? Several factors contribute to lower fertility rates. Economic pressures, changing social values, and the desire for personal freedom and career opportunities have led many women to delay or forgo motherhood. Educational opportunities for women and changing gender roles have also played a significant part in demographic shifts.'
            },
            { 
              label: 'F', 
              value: 'F',
              content: '**F.** The demographic trap presents a serious challenge for European societies. With falling birth rates and aging populations, many countries face unsustainable pension systems and labour shortages. Policymakers must address these challenges through immigration, family support policies, and other innovative solutions to maintain economic stability and social welfare systems.'
            }
          ]
        },
        {
          type: 'drag-and-drop',
          instruction: 'Select FIVE true statements:',
          items: [
            { questionNumber: 18, label: 'A' },
            { questionNumber: 19, label: 'B' },
            { questionNumber: 20, label: 'C' },
            { questionNumber: 21, label: 'D' },
            { questionNumber: 22, label: 'E' }
          ],
          options: [
            { label: 'Germany has highest percentage of childless women', value: 'A' },
            { label: 'Italy and Poland have high birth rates', value: 'B' },
            { label: 'Most reasons given are not unique to Germany', value: 'C' },
            { label: 'Eastern Europe governments encouraged children', value: 'D' },
            { label: 'In 1979, most families wanted two children', value: 'E' }
          ]
        },
        {
          type: 'multiple-choice',
          questionNumber: 23,
          question: 'Reasons that ordinary Europeans do not think it is necessary to have as many children include',
          options: [
            { label: 'less labour needed to farm land.', value: 'A' },
            { label: 'the feeling that Europe is too crowded.', value: 'B' },
            { label: 'a general dislike of children.', value: 'C' }
          ]
        },
        {
          type: 'multiple-choice',
          questionNumber: 24,
          question: 'Michael Teitelbaum adds the following reasons:',
          options: [
            { label: 'poor childcare facilities.', value: 'A' },
            { label: 'longer working hours.', value: 'B' },
            { label: 'high unemployment amongst young adults.', value: 'C' }
          ]
        },
        {
          type: 'multiple-choice',
          questionNumber: 25,
          question: 'Initial declines in southern and eastern Europe were because of',
          options: [
            { label: 'the reduced influence of the Catholic church.', value: 'A' },
            { label: 'lower standards of living.', value: 'B' },
            { label: 'governments encouraged smaller families.', value: 'C' }
          ]
        },
        {
          type: 'multiple-choice',
          questionNumber: 26,
          question: 'People may have fewer children than they want because',
          options: [
            { label: 'women are having children at a later age.', value: 'A' },
            { label: 'they are following the example of other people.', value: 'B' },
            { label: 'politicians want them to.', value: 'C' }
          ]
        }
      ]
    },
    {
      sectionNumber: 3,
      title: 'READING PASSAGE 3',
      passage: {
        title: 'Teens Try to Change the World',
        content: `When classes adjourn here at the Fayerweather Street School, eighth-graders ignore the mall down the street and go straight to the place they consider much cooler: the local natural-foods grocer's. There, they gather in groups of ten or more sometimes, smitten by a marketing atmosphere that links attractiveness to eating well. When time comes to buy something even as small as a chocolate treat, they feel good knowing a farmer somewhere probably received a good price. "Food is something you need to stay alive," says eighth-grader Emma Lewis. "Paying farmers well is really important because if we didn't have any unprocessed food, we'd all be living on candy." Eating morally, as some describe it, is becoming a priority for teenagers as well as adults in their early 20s. What began a decade ago as a concern on college campuses to shun clothing made in overseas sweatshops has given birth to a parallel phenomenon in the food and beverage industries. Here, youthful shoppers are leveraging their dollars in a bid to reduce pesticide usage, limit deforestation, and make sure farmers are not left with a pittance on payday. Once again, college campuses are setting the pace. Students at 30 colleges have helped persuade administrators to make sure all cafeteria coffee comes with a "Fair Trade" label, which means bean pickers in Latin America and Africa were paid higher than the going rates. Their peers on another 300 campuses are pushing to follow suit, according to Students United for Fair Trade in Washington, D.C.`
      },
      questions: [
        {
          type: 'multiple-choice',
          instruction: 'Choose the correct letter A, B, or C.',
          questionNumber: 27,
          question: 'Trying to change the world through purchases began with',
          options: [
            { label: 'chocolate', value: 'A' },
            { label: 'clothing', value: 'B' },
            { label: 'coffee', value: 'C' }
          ]
        },
        {
          type: 'multiple-choice',
          instruction: 'Choose the correct letter A, B, or C.',
          questionNumber: 28,
          question: 'Bon Appetit had ___ colleges using its services in 2006.',
          options: [
            { label: '25', value: 'A' },
            { label: '58', value: 'B' },
            { label: '71', value: 'C' }
          ]
        },
        {
          type: 'multiple-choice',
          instruction: 'Choose the correct letter A, B, or C.',
          questionNumber: 29,
          question: 'Buying Ethos Water helps provide money for',
          options: [
            { label: 'poor people in Africa', value: 'A' },
            { label: 'poor farmers', value: 'B' },
            { label: 'clean water projects', value: 'C' }
          ]
        },
        {
          type: 'multiple-choice',
          instruction: 'Choose the correct letter A, B, or C.',
          questionNumber: 30,
          question: 'Joe Curnow first got involved with consumer activism through buying',
          options: [
            { label: 'coffee', value: 'A' },
            { label: 'cocoa', value: 'B' },
            { label: 'water', value: 'C' }
          ]
        },
        {
          type: 'paragraph-gap',
          instruction: 'Complete with NO MORE THAN ONE WORD from text.',
          paragraph: 'Eighth-graders from Fayerweather go to the natural-foods grocer\'s rather than the (31)... Bon Appetit limits its growth (32)... Previously, young generations were (33)... to make sacrifices. Young people can feel frustrated and (34)... because of their age. Gary Lindsay (35)... people to buy products that use Fair Trade.',
          questionNumbers: [31, 32, 33, 34, 35]
        },
        {
          type: 'true-false-not-given',
          instruction: 'Do the statements agree with the information?',
          statements: [
            { questionNumber: 36, statement: 'Fair Trade coffee is more expensive than usual coffee.' },
            { questionNumber: 37, statement: 'Bon Appetit used to sell sugared cereal.' },
            { questionNumber: 38, statement: 'Hob Everts thinks kids do not understand protecting the environment.' },
            { questionNumber: 39, statement: 'Summer Rayne Oakes will wear clothes that do not look good as long as they promote Fair Trade.' },
            { questionNumber: 40, statement: 'Gary Lindsay thinks people should do more than just consume ethically.' }
          ]
        }
      ]
    }
  ]
};
