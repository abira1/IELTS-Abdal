// Track: 705-M Reading
import { Track } from './track1';

export const track705Reading: Track = {
  id: 'track-705-reading',
  name: '705-M Reading',
  shortName: '705MR',
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
        title: 'Sleepy Students Perform Worse',
        content: `Staying up an hour or two past bedtime makes it far harder for kids to learn, say scientists who deprived youngsters of sleep and tested whether their teachers could tell the difference. They could. If parents want their children to thrive academically, "Getting them to sleep on time is as important as getting them to school on time," said psychologist Gahan Fallone, who conducted the research at Brown Medical School. The study, unveiled Thursday at an American Medical Association (AMA) science writers meeting, was conducted on healthy children who had no evidence of sleep- or learning-related disorders. Difficulty paying attention was among the problems the sleepy youngsters faced - raising the question of whether sleep deprivation could prove even worse for people with attention deficit hyperactivity disorder, or ADHD. Fallone now is studying that question, and suspects that sleep problems "could hit children with ADHD as a double whammy". Sleep experts have long warned that Americans of all ages do not get enough shuteye. Sleep is important for health, bringing a range of benefits that, as Shakespeare put it, "knits up the ravelled sleave of care". Not getting enough is linked to a host of problems, from car crashes as drivers doze off to crippled memory and inhibited creativity. Exactly how much sleep correlates with school performance is hard to prove. So, Brown researchers set out to test whether teachers could detect problems with attention and learning when children stayed up late - even if the teachers had no idea how much sleep their students actually got. They recruited seventy-four 6- to 12-year-olds from Rhode Island and southern Massachusetts for the three-week study. For one week, the youngsters went to bed and woke up at their usual times. They already were fairly good sleepers, getting nine to 9.5 hours of sleep a night. Another week, they were assigned to spend no fewer than ten hours in bed a night. The other week, they were kept up later than usual: First-and second-graders were in bed no more than eight hours and the older children no more than 6.5 hours. In addition to parents' reports, the youngsters wore motion-detecting wrist monitors to ensure compliance. Teachers were not told how much the children slept or which week they stayed up late, but rated the students on a variety of performance measures each week. The teachers reported significantly more academic problems during the week of sleep deprivation, the study, which will be published in the journal Sleep in December, concluded. Students who got eight hours of sleep or less a night were more forgetful, had the most trouble learning new lessons, and had the most problems paying attention, reported Fallone, now at the Forest Institute of Professional Psychology. Sleep has long been a concern of educators. Potter-Burns Elementary School sends notes to parents reminding them to make sure students get enough sleep prior to the school's yearly achievement testing. Another school considers it important enough to include in the school's monthly newsletters. Definitely, there is an impact on students' performance if they come to school tired. However, the findings may change physician practice, said Dr. Regina Benjamin, a family physician in Bayou La Batre, who reviewed the data at the Thursday's AMA meeting. "I don't ask about sleep" when evaluating academically struggling students, she noted. "I'm going to start." So how much sleep do kids need? Recommended amounts range from about ten to eleven hours a night for young elementary students to 8.5 hours for teens. Fallone insists that his own second-grader get ten hours a night, even when it meant dropping soccer - season that practice did not start until 7:30 -- too late for her to fit in dinner and time to wind down before she needed to be snoozing. "It's tough," he acknowledged, but "parents must believe in the importance of sleep."`
      },
      questions: [
        {
          type: 'matching-headings',
          instruction: 'The passage has 7 paragraphs labeled A-G. Which paragraph contains each of the following pieces of information? Drag the letter to the answer box.',
          passageTitle: 'Sleepy Students Perform Worse',
          items: [
            { questionNumber: 1, label: 'Traffic accidents are sometimes caused by lack of sleep.' },
            { questionNumber: 2, label: 'The number of children included in the study' },
            { questionNumber: 3, label: 'How two schools are trying to deal with the problem' },
            { questionNumber: 4, label: 'How the effect of having less sleep was measured' }
          ],
          headingOptions: [
            { 
              label: 'A', 
              value: 'A',
              content: '**A.** Staying up an hour or two past bedtime makes it far harder for kids to learn, say scientists who deprived youngsters of sleep and tested whether their teachers could tell the difference. They could. If parents want their children to thrive academically, "Getting them to sleep on time is as important as getting them to school on time," said psychologist Gahan Fallone, who conducted the research at Brown Medical School.'
            },
            { 
              label: 'B', 
              value: 'B',
              content: '**B.** The study, unveiled Thursday at an American Medical Association (AMA) science writers meeting, was conducted on healthy children who had no evidence of sleep- or learning-related disorders. Difficulty paying attention was among the problems the sleepy youngsters faced - raising the question of whether sleep deprivation could prove even worse for people with attention deficit hyperactivity disorder, or ADHD. Fallone now is studying that question, and suspects that sleep problems "could hit children with ADHD as a double whammy".'
            },
            { 
              label: 'C', 
              value: 'C',
              content: '**C.** Sleep experts have long warned that Americans of all ages do not get enough shuteye. Sleep is important for health, bringing a range of benefits that, as Shakespeare put it, "knits up the ravelled sleave of care". Not getting enough is linked to a host of problems, from car crashes as drivers doze off to crippled memory and inhibited creativity.'
            },
            { 
              label: 'E', 
              value: 'E',
              content: '**E.** Teachers were not told how much the children slept or which week they stayed up late, but rated the students on a variety of performance measures each week. The teachers reported significantly more academic problems during the week of sleep deprivation, the study, which will be published in the journal Sleep in December, concluded. Students who got eight hours of sleep or less a night were more forgetful, had the most trouble learning new lessons, and had the most problems paying attention, reported Fallone, now at the Forest Institute of Professional Psychology.'
            },
            { 
              label: 'F', 
              value: 'F',
              content: '**F.** Sleep has long been a concern of educators. Potter-Burns Elementary School sends notes to parents reminding them to make sure students get enough sleep prior to the school\'s yearly achievement testing. Another school considers it important enough to include in the school\'s monthly newsletters. Definitely, there is an impact on students\' performance if they come to school tired. However, the findings may change physician practice, said Dr. Regina Benjamin, a family physician in Bayou La Batre, who reviewed the data at the Thursday\'s AMA meeting. "I don\'t ask about sleep" when evaluating academically struggling students, she noted. "I\'m going to start."'
            },
            { 
              label: 'G', 
              value: 'G',
              content: '**G.** So how much sleep do kids need? Recommended amounts range from about ten to eleven hours a night for young elementary students to 8.5 hours for teens. Fallone insists that his own second-grader get ten hours a night, even when it meant dropping soccer - season that practice did not start until 7:30 -- too late for her to fit in dinner and time to wind down before she needed to be snoozing. "It\'s tough," he acknowledged, but "parents must believe in the importance of sleep."'
            }
          ]
        },
        {
          type: 'paragraph-gap',
          instruction: 'Complete using NO MORE THAN TWO WORDS from the text.',
          paragraph: 'Fallone is now studying the sleep patterns of children with (5)... The researchers used (6)... that show movement to check that children went to bed at the right time. Students with less sleep had problems with memory, remembering new material, and (7)... Fallone admitted that it was (8)... for children to get enough sleep.',
          questionNumbers: [5, 6, 7, 8]
        },
        {
          type: 'true-false-not-given',
          instruction: 'Do the following statements agree with the information?',
          statements: [
            { questionNumber: 9, statement: 'The results of the study were first distributed to principals of American schools.' },
            { questionNumber: 10, statement: 'Some of the children in the study had previously shown signs of sleeping problems.' },
            { questionNumber: 11, statement: 'The study could influence how doctors deal with children\'s health problems.' },
            { questionNumber: 12, statement: 'Fallone does not let his daughter play soccer.' },
            { questionNumber: 13, statement: 'Staying up later is acceptable if the child is doing homework.' }
          ]
        }
      ]
    },
    {
      sectionNumber: 2,
      title: 'READING PASSAGE 2',
      passage: {
        title: 'The Brain\'s Business',
        content: `For those of a certain age and educational background, it is hard to think of higher education without thinking of ancient institutions. Some universities are of a venerable age - the University of Bologna was founded in 1088, the University of Oxford in 1096 - and many of them have a strong sense of tradition. The truly old ones make the most of their pedigrees, and those of a more recent vintage work hard to create an aura of antiquity. Yet these tradition-loving (or -creating) institutions are currently enduring a thunderstorm of changes so fundamental that some say the very idea of the university is being challenged. Universities are experimenting with new ways of funding (most notably through student fees), forging partnerships with private companies and engaging in mergers and acquisitions. Such changes are tugging at the ivy's roots. This is happening for four reasons. The first is the democratisation of higher education - "massification", in the language of the educational profession. In the rich world, massification has been going on for some time. The proportion of adults with higher educational qualifications in developed countries almost doubled between 1975 and 2000. From 22% to 41%. Most of the rich countries are still struggling to digest this huge growth in numbers. Now massification is spreading to the developing world. China doubled its student population in the late 1990s, and India is trying to follow suit. The second reason is the rise of the knowledge economy. The world is in the grips of a "soft revolution" in which knowledge is replacing physical resources as the main driver of economic growth. Between 1985 and 1997, the contribution of knowledge-based industries to total value added increased from 51% to 59% in Germany and from 45% to 51% in Britain. The best companies are now devoting at least a third of their investment to knowledge-intensive intangibles such as R&D, licensing, and marketing. Universities are among the most important engines of the knowledge economy. Not only do they produce the brain workers who man it, they also provide much of its backbone, from laboratories to libraries to computer networks. The third factor is globalisation. The death of distance is transforming academia just as radically as it is transforming business. The number of people from developed countries studying abroad has doubled over the past twenty years, to 1.9 million; universities are opening campuses all around the world; and a growing number of countries are trying to turn higher education into an export industry. The fourth is competition. Traditional universities are being forced to compete for students and research grants, and private companies are trying to break into a sector which they regard as "the new health care". The World Bank calculates that global spending on higher education amounts to $300 billion a year, or 1% of global economic output. There are more than 80 million students worldwide, and 3.5 million people are employed to teach them or look after them.`
      },
      questions: [
        {
          type: 'matching-headings',
          instruction: 'The passage has 6 paragraphs labeled A-F. Which paragraph best fits each of the following headings? Drag the letter to the answer box.',
          passageTitle: 'The Brain\'s Business',
          items: [
            { questionNumber: 14, label: 'Education for the masses' },
            { questionNumber: 15, label: 'Future possibilities' },
            { questionNumber: 16, label: 'Globalisation and competition' },
            { questionNumber: 17, label: 'Funding problem' }
          ],
          headingOptions: [
            { 
              label: 'A', 
              value: 'A',
              content: '**A.** For those of a certain age and educational background, it is hard to think of higher education without thinking of ancient institutions. Some universities are of a venerable age - the University of Bologna was founded in 1088, the University of Oxford in 1096 - and many of them have a strong sense of tradition. The truly old ones make the most of their pedigrees, and those of a more recent vintage work hard to create an aura of antiquity. Yet these tradition-loving (or -creating) institutions are currently enduring a thunderstorm of changes so fundamental that some say the very idea of the university is being challenged. Universities are experimenting with new ways of funding (most notably through student fees), forging partnerships with private companies and engaging in mergers and acquisitions. Such changes are tugging at the ivy\'s roots.'
            },
            { 
              label: 'B', 
              value: 'B',
              content: '**B.** This is happening for four reasons. The first is the democratisation of higher education - "massification", in the language of the educational profession. In the rich world, massification has been going on for some time. The proportion of adults with higher educational qualifications in developed countries almost doubled between 1975 and 2000. From 22% to 41%. Most of the rich countries are still struggling to digest this huge growth in numbers. Now massification is spreading to the developing world. China doubled its student population in the late 1990s, and India is trying to follow suit.'
            },
            { 
              label: 'C', 
              value: 'C',
              content: '**C.** The second reason is the rise of the knowledge economy. The world is in the grips of a "soft revolution" in which knowledge is replacing physical resources as the main driver of economic growth. Between 1985 and 1997, the contribution of knowledge-based industries to total value added increased from 51% to 59% in Germany and from 45% to 51% in Britain. The best companies are now devoting at least a third of their investment to knowledge-intensive intangibles such as R&D, licensing, and marketing. Universities are among the most important engines of the knowledge economy. Not only do they produce the brain workers who man it, they also provide much of its backbone, from laboratories to libraries to computer networks.'
            },
            { 
              label: 'D', 
              value: 'D',
              content: '**D.** The third factor is globalisation. The death of distance is transforming academia just as radically as it is transforming business. The number of people from developed countries studying abroad has doubled over the past twenty years, to 1.9 million; universities are opening campuses all around the world; and a growing number of countries are trying to turn higher education into an export industry. The fourth is competition. Traditional universities are being forced to compete for students and research grants, and private companies are trying to break into a sector which they regard as "the new health care".'
            },
            { 
              label: 'E', 
              value: 'E',
              content: '**E.** All this sounds as though a golden age for universities is just around the corner. Yet many universities are facing up to worrying difficulties. The World Bank calculates that global spending on higher education amounts to $300 billion a year, or 1% of global economic output. There are more than 80 million students worldwide, and 3.5 million people are employed to teach them or look after them. Yet many countries are debating whether they have enough resources for such expansion.'
            },
            { 
              label: 'F', 
              value: 'F',
              content: '**F.** What, if anything can be done? Colleges need to make better use of their endowments. Universities also need to reinvent themselves - not least by tapping into the internet as an instrument for reaching out to the vast numbers of would-be students who cannot be taught in any other way. This is particularly important for countries that simply do not have the resources to expand campus-based education.'
            }
          ]
        },
        {
          type: 'drag-and-drop',
          instruction: 'Select FIVE true statements from the options:',
          items: [
            { questionNumber: 18, label: 'A' },
            { questionNumber: 19, label: 'B' },
            { questionNumber: 20, label: 'C' },
            { questionNumber: 21, label: 'D' },
            { questionNumber: 22, label: 'E' }
          ],
          options: [
            { label: 'Some universities are joining with each other', value: 'A' },
            { label: 'Most companies devote a third of profits to R&D', value: 'B' },
            { label: 'People from developed countries studying abroad doubled in 20 years', value: 'C' },
            { label: 'Scandinavian governments provide enough university funding', value: 'D' },
            { label: 'Universities are important engines of knowledge economy', value: 'E' }
          ]
        },
        {
          type: 'multiple-choice',
          questionNumber: 23,
          question: 'Universities are responding to changes by',
          options: [
            { label: 'constructing new buildings in old styles so they appear old and traditional.', value: 'A' },
            { label: 'introducing new subjects for study.', value: 'B' },
            { label: 'charging students higher fees.', value: 'C' }
          ]
        },
        {
          type: 'multiple-choice',
          questionNumber: 24,
          question: 'The knowledge economy is',
          options: [
            { label: 'on the rise most of all in Germany.', value: 'A' },
            { label: 'not fully appreciated in Britain.', value: 'B' },
            { label: 'heavily reliant on universities.', value: 'C' }
          ]
        },
        {
          type: 'multiple-choice',
          questionNumber: 25,
          question: 'Current problems at universities, especially in Europe, include',
          options: [
            { label: 'managers arguing with governments.', value: 'A' },
            { label: 'problems with funding.', value: 'B' },
            { label: 'poor management.', value: 'C' }
          ]
        },
        {
          type: 'multiple-choice',
          questionNumber: 26,
          question: 'Possible solutions include',
          options: [
            { label: 'reducing student numbers.', value: 'A' },
            { label: 'introducing new funding methods.', value: 'B' },
            { label: 'closing down some universities.', value: 'C' }
          ]
        }
      ]
    },
    {
      sectionNumber: 3,
      title: 'READING PASSAGE 3',
      passage: {
        title: 'Sunday Is a Fun Day for Modern Brits',
        content: `In a new study, Essex University sociologists have dissected the typical British Sunday, and found we get up later and do fewer chores than we did 40 years ago - and we are far more likely to be out shopping or enjoying ourselves than cooking Sunday lunch. Academics at the university's Institute of Social and Economic Research asked 10,000 people to keep a detailed diary of how they spent Sundays in 2001. Then they compared the results with 3,500 diaries written in 1961, a treasure trove of information that had been uncovered 'in two egg boxes and a tea chest' in the basement of the BBC by ISER's director, Professor Jonathan Gershuny. The contrast between the two periods could not be more striking. Forty years ago, Sunday mornings were a flurry of activity as men and women - especially women - caught up on their weekly chores and cooked up a storm in the kitchen. Women rarely allowed themselves any 'leisure' until the afternoon, after the dishes were cleaned. In 1961, more than a fifth of all men and women in Britain were sitting at a table by 2 p.m., most likely tucking into a roast with all the trimmings. Then there would be another rush to the table between 5 p.m. and 6 p.m. for high tea. Since the arrival of brunch, the gastropub and the all-you-can-eat Sunday buffet at the local curry house, such institutions have become extinct. Today, we graze the entire day. You only have two free days a week. You don't want to have to waste one because there is nothing to do but watch TV. Sunday has leapfrogged Saturday in the fun stakes. On Saturdays, you are recovering from the week. Sundays are the last bastion of the weekend - you want to get as much as you can out of the day before you have to go back to work. According to researchers, the ability to trail around B&Q has made the most dramatic difference to our Sundays. In 1961, adults spent an average of 20 minutes a day shopping; by 2001, it was 50 minutes. 'Shopping used to be a gender segregated activity that would take place during the week, while the husband was at work. Now it's as much men as women,' said Gershuny. We're all more likely to be relaxing or shopping on a Sunday morning these days than scrubbing the floor or putting up shelves. 'Men now stay in bed longer, and get up not, as previously, to work around the house, but rather to shop or to pursue other outside leisure activities.' Men do about the same amount of unpaid work around the house as they used to on a Sunday, but it's spread throughout the whole day, instead of crammed into the morning. Women do considerably less than 40 years ago. Indeed, men and women were 'pretty much different species' in 1961, as far as the way they spent Sundays was concerned, with men far more likely to be out of the house - at the pub or playing football - before lunch. 'For women, leisure happened only in the afternoon. But by 2001, the shapes of men's and women's Sundays were much more similar,' says the report.`
      },
      questions: [
        {
          type: 'multiple-choice',
          questionNumber: 27,
          question: 'According to the diaries, in 1961, women rarely had free time on Sunday',
          options: [
            { label: 'mornings.', value: 'A' },
            { label: 'afternoons.', value: 'B' },
            { label: 'evenings.', value: 'C' }
          ]
        },
        {
          type: 'multiple-choice',
          questionNumber: 28,
          question: 'People want to do more on Sundays because',
          options: [
            { label: 'more shops are open.', value: 'A' },
            { label: 'it is a good day to graze.', value: 'B' },
            { label: 'they are tired on Saturdays.', value: 'C' }
          ]
        },
        {
          type: 'multiple-choice',
          questionNumber: 29,
          question: 'Shopping habits have changed since 1961 in that',
          options: [
            { label: 'people shop less at weekends.', value: 'A' },
            { label: 'men shop more than women.', value: 'B' },
            { label: 'men do as much shopping as women.', value: 'C' }
          ]
        },
        {
          type: 'multiple-choice',
          questionNumber: 30,
          question: 'Compared with 1961,',
          options: [
            { label: 'women do far less housework on Sundays.', value: 'A' },
            { label: 'men do far less housework on Sundays.', value: 'B' },
            { label: 'men and women do far less housework on Sundays.', value: 'C' }
          ]
        },
        {
          type: 'paragraph-gap',
          instruction: 'Complete using NO MORE THAN THREE WORDS from the text.',
          paragraph: 'Professor Gershuny discovered thousands of (31)... at the BBC. In 1961, people ate (32)... at 5 or 6 o\'clock. In 2001, people spent (33)... 50 minutes on shopping on Sundays. Shopping is something that is not as (34)... as it was in 1961. In 1961, men would often go for a drink or be (35)... before lunch.',
          questionNumbers: [31, 32, 33, 34, 35]
        },
        {
          type: 'true-false-not-given',
          instruction: 'Do the following agree with the information?',
          statements: [
            { questionNumber: 36, statement: 'Mr. Atchison usually eats out.' },
            { questionNumber: 37, statement: 'Mrs. Hallows\' husband does no household chores on Sundays.' },
            { questionNumber: 38, statement: 'Mrs. Hallows thinks the shops are too busy on Sundays.' },
            { questionNumber: 39, statement: 'Mr. Jones is a widower.' },
            { questionNumber: 40, statement: 'Mr. Jones does household chores on Sundays.' }
          ]
        }
      ]
    }
  ]
};
