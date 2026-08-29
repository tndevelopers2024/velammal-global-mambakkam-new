/**
 * Single source of truth for every string and asset on the page.
 * Copy is verbatim from the source site — do not paraphrase, shorten or "fix".
 */

export type Img = {
  src: string;
  alt: string;
  width: number;
  height: number;
};

export const identity = {
  brand: "Velammal New-Gen Edu Network",
  subject: "Velammal Global School, Mambakkam",
  title: "Global School Mambakkam - Velammal New Gen Edu Network",
  description:
    "Velammal Global school adapting global practices and tech integration. We pride ourselves for providing the quality of our educational programs, the",
} as const;

export const logos = {
  network: {
    src: "/img/edu-network.svg",
    alt: "Velammal New-Gen Edu Network",
    // the SVG is 9600 x 2967.96 — 3.235:1, not the 4.35:1 declared before
    width: 960,
    height: 297,
  },
  global: {
    src: "/img/global-logo.png",
    alt: "Velammal Global School crest",
    width: 101,
    height: 91,
  },
} satisfies Record<string, Img>;

/* ------------------------------------------------------------------ nav */

export type NavItem = {
  label: string;
  href: string;
  mega?: true;
};

export const nav: readonly NavItem[] = [
  { label: "Home", href: "#top" },
  { label: "Schools", href: "#schools", mega: true },
  { label: "Admissions", href: "#admissions" },
  { label: "Academics & Beyond", href: "#academics" },
] as const;

export type NavCta = {
  label: string;
  href: string;
  variant: "solid" | "ghost";
};

export const navCtas: readonly NavCta[] = [
  { label: "LMS", href: "#lms", variant: "ghost" },
  { label: "Fees", href: "#fees", variant: "ghost" },
  { label: "Register", href: "#admissions", variant: "solid" },
] as const;

export type SchoolGroup = {
  group: string;
  campuses: readonly string[];
  preview: Img;
};

export const schoolGroups: readonly SchoolGroup[] = [
  {
    group: "Velammal Vidhyashram",
    campuses: [
      "Ambattur",
      "Dindigul",
      "Guduvanchery",
      "Mambakkam",
      "Maraimalai Nagar",
      "Padappai",
      "Padur",
      "Surapet",
      "Somangalam",
      "Tiruvannamalai",
    ],
    preview: {
      src: "/img/advantage-schools.jpg",
      alt: "Abacus on a play table in a Velammal kindergarten classroom",
      width: 768,
      height: 449,
    },
  },
  {
    group: "Vidhyalaya",
    campuses: ["Sholinganallur"],
    preview: {
      src: "/img/pillar-curriculum.jpg",
      alt: "Empty Velammal classroom with blue desks and a whiteboard",
      width: 500,
      height: 292,
    },
  },
  {
    group: "Velammal New Gen School",
    campuses: [
      "Adhanur",
      "Kelambakkam",
      "Pallikaranai",
      "Madhavaram",
      "Medavakkam",
    ],
    preview: {
      src: "/img/gallery-08.jpg",
      alt: "Two Velammal students writing in workbooks at a shared desk",
      width: 600,
      height: 400,
    },
  },
  {
    group: "Annex",
    campuses: ["Navalur", "Nedungundram", "Thiruvottiyur"],
    preview: {
      src: "/img/update-02.jpg",
      alt: "Velammal classroom with rows of desks and pinboards of student work",
      width: 600,
      height: 403,
    },
  },
  {
    group: "Velammal New Gen Kids",
    campuses: [
      "Kolathur",
      "Mannivakkam",
      "Periyar Nagar",
      "Perungalathur",
      "Sembakkam",
      "Vinayagapuram",
    ],
    preview: {
      src: "/img/gallery-04.jpg",
      alt: "Kindergarten children in paper chef hats at a cookery activity table",
      width: 600,
      height: 400,
    },
  },
  {
    group: "Velammal Matriculation",
    campuses: [],
    preview: {
      src: "/img/gallery-01.jpg",
      alt: "Primary students gathered around a craft project on a classroom table",
      width: 600,
      height: 400,
    },
  },
  {
    group: "Velammal Global",
    campuses: ["Puzhal"],
    preview: {
      src: "/img/hero-campus.jpg",
      alt: "The Velammal Global School campus building seen from the grounds",
      width: 1366,
      height: 540,
    },
  },
] as const;

/* ----------------------------------------------------------------- hero */

export const hero = {
  h1: "Velammal Global School, Mambakkam",
  eyebrow: "Kindergarten to A+",
  paragraphs: [
    "Velammal Global school adapting global practices and tech integration. We pride ourselves for providing the quality of our educational programs, the professionalism of our staff, the enthusiasm of our students and the high level of support provided by parents and community members.",
    "VGS delivers the best to maximize students' global competence by making them collaborate, communicate, think critically and be digitally fluent. We Develop the School Values like a high standard of teaching and learning, safe and welcoming environment, family and community involvement. It was founded in the year 2015 with a current strength of 750 students. The school has classes from Kindergarten to A+. When your child passes out of our Velammal Global school they are adept in 21st century skills and competent enough to face the challenge outside.",
  ],
  ctaPrimary: "Apply Now",
  ctaVideo: "Play Video",
  ctaVideoLong: "Introduction Video",
  videoUrl: "https://www.youtube.com/watch?v=cEum4rrC0cs",
  videoId: "cEum4rrC0cs",
  /** The ambient film behind the fold. Muted, looping, decorative. */
  stageVideoId: "e1a4LrbRZfg",
  /** Painted first so the LCP is an image; the film fades in over it. */
  image: {
    src: "/img/hero-campus.jpg",
    alt: "The Velammal Global School, Mambakkam campus building behind trees on the school grounds",
    width: 1366,
    height: 540,
  },
} as const;

export const heroVideos = {
  eyebrow: "Campus Life",
  heading: "Glimpses of Velammal",
  sub: "Explore our featured videos to get a look into the vibrant environment, academic excellence, and holistic development at Velammal Global School.",
  videos: [
    { id: "Qn22prv-aB4", title: "Velammal Global School - Video 1" },
    { id: "5S2nqyoI-0s", title: "Velammal Global School - Video 2" },
    { id: "e1a4LrbRZfg", title: "Velammal Global School - Video 3" },
    { id: "GgCgeRWmb2o", title: "Velammal Global School - Video 4" },
    { id: "BwLJ4bnTypw", title: "Velammal Global School - Video 5" },
    { id: "14lxQesoQug", title: "Velammal Global School - Video 6" },
  ]
} as const;

export const instagramReels = {
  eyebrow: "Socials",
  heading: "Follow our Journey",
  sub: "Stay updated with the latest events, student achievements, and campus moments by following us on Instagram.",
  videos: [
    "insta1.mp4",
    "insta2.mp4",
    "insta3.mp4",
    "insta4.mp4",
    "insta5.mp4",
    "insta6.mp4",
    "insta7.mp4",
    "insta8.mp4",
    "insta9.mp4",
    "insta10.mp4",
    "insta11.mp4",
    "insta12.mp4",
    "insta13.mp4",
  ],
} as const;

/* ----------------------------------------------------------- facts bar */

export type Fact = { label: string; value: string };

export const facts: readonly Fact[] = [
  { label: "Location", value: "Mambakkam" },
  { label: "Curriculum", value: "CBSE" },
  { label: "18th Nov, 2026", value: "Admissions' Start" },
  { label: "Infrastructure", value: "State of the Art" },
  { label: "Specialization", value: "Project Based Learning" },
] as const;

/* --------------------------------------------------------- why consider */

export type Pillar = {
  title: string;
  body: string;
  image: Img;
};

export const whyConsider = {
  heading: "Why should a parent consider the Global School Mambakkam?",
  intro:
    "Based on the CBSE Curriculum that utilises contemporary teaching methods and state-of-the-art amenities to prepare thought leaders for the future.",
  pillars: [
    {
      title: "Academics",
      body: "Velammal's advantage of academic rigour and iterative approach where a student's academic progress is monitored on a daily, weekly and end of term cycle. Velammal NewGen schools offer a gamut of co-curricular activities like Yoga, Karate, Music, Zumba, Arts & Physical Education leading to an overall deveopment of your ward.",
      image: {
        src: "/img/pillar-academics.jpg",
        alt: "The Velammal teaching faculty photographed together in front of a display of student charts",
        width: 500,
        height: 292,
      },
    },
    {
      title: "Curriculum",
      body: "There is a great focus and emphasis on social and communication skills, as well as collaboration and exchange of ideas. The Math camps, Science camps, Drama in classroom programs, cooperative learning time in VNGS schools are all samples of this. This is in contrast to the rote learning that happens in ordinary schools.",
      image: {
        src: "/img/pillar-curriculum.jpg",
        alt: "A Velammal classroom set up for group work, with blue chairs drawn around shared desks",
        width: 500,
        height: 292,
      },
    },
    {
      title: "Tech Integration",
      body: "Parents can download the Velammal Digital App for daily elogs (info on what happens in school period by period), homework info and athena online assessments. Online APPs are used to enhance the teaching and learning process. Our Google Classrooms are virtual classrooms that engage students during the vacation time also.",
      image: {
        src: "/img/pillar-tech.jpg",
        alt: "A student following a teacher's lesson on a tablet during an online class",
        width: 500,
        height: 292,
      },
    },
  ] satisfies readonly Pillar[],
} as const;

/* -------------------------------------------------------------- gallery */

export const gallery = {
  heading: "Glimpses from the Vibrant Classrooms & Big Playgrounds",
  sub: "We ensure our students hone their skills in the best learning environment.",
  images: [
    {
      src: "/img/gallery-01.jpg",
      alt: "Primary students in Velammal uniform gathered around clay models they have made on a classroom table",
      width: 600,
      height: 400,
    },
    {
      src: "/img/gallery-02.jpg",
      alt: "Children in costume as Hindu deities for a Velammal fancy dress performance",
      width: 600,
      height: 400,
    },
    {
      src: "/img/gallery-03.jpg",
      alt: "A teacher pinning a badge on a young Velammal student at an award ceremony",
      width: 600,
      height: 400,
    },
    {
      src: "/img/gallery-04.jpg",
      alt: "Kindergarten children in paper chef hats arranging cups and bowls at a cookery activity",
      width: 600,
      height: 400,
    },
    {
      src: "/img/gallery-05.jpg",
      alt: "A large group of young students holding up handmade paper craft they have finished",
      width: 600,
      height: 400,
    },
    {
      src: "/img/gallery-06.jpg",
      alt: "Teachers presenting badges to a line of Velammal students at a school assembly",
      width: 600,
      height: 400,
    },
    {
      src: "/img/gallery-07.jpg",
      alt: "Two young students decorating a large yellow poster together during an art period",
      width: 600,
      height: 400,
    },
    {
      src: "/img/gallery-08.jpg",
      alt: "Two Velammal students writing in their workbooks at a shared classroom desk",
      width: 600,
      height: 400,
    },
  ] satisfies readonly Img[],
} as const;

/* ------------------------------------------------------------ highlights */

export const highlights = {
  eyebrowTitle: "Academics & Extracurricular Overview",
  heading: "Key Highlights",
  items: [
    "Academic rigour with regular revisions, assessments & open day",
    "Tech-driven academic activities and projects for skill development",
    "Modern amenities and a touch of technology for today's time",
    "Gamut of additional learning programs to engage young minds to the fullest",
    "Structured Academic Framework for developing learning rigour in the students",
    "Robust digital assessment procedures to measure learning",
  ],
  closing:
    "Velammal New Gen Edu Network provides best of education to its students by incorporating global best practices in teaching and learning and blending them with our own learnings of the past 35 years. Our education philosophy centres around building strong foundation for students to succeed in a competitive new world.",
} as const;

/* ------------------------------------------------------- group advantage */

export type AdvantageTab = { label: string; image: Img };

export const groupAdvantage = {
  heading: "The Velammal Group Advantage",
  sub: "Educational edifice with lakhs of students, hundreds of teachers and several top-notch institutions growing under our umbrella.",
  tabs: [
    {
      label: "Schools",
      image: {
        src: "/img/advantage-schools.jpg",
        alt: "A coloured abacus on a play table in a bright Velammal kindergarten room",
        width: 768,
        height: 449,
      },
    },
    {
      label: "Colleges",
      image: {
        src: "/img/advantage-colleges.jpg",
        alt: "The long facade of a Velammal college building with students walking the lawn below",
        width: 768,
        height: 449,
      },
    },
    {
      label: "Hospitals",
      image: {
        src: "/img/advantage-hospitals.jpg",
        alt: "Medical students in white coats seated in a Velammal teaching hospital lecture theatre",
        width: 768,
        height: 449,
      },
    },
  ] satisfies readonly AdvantageTab[],
  journey: {
    title: "Journey So Far",
    milestones: [
      {
        year: "1986",
        body: "We started with a small school, few students, one Velammal Educational Trust and a dedicated set of teachers back in 1986.",
      },
      {
        year: "Today",
        body: "Today our institutional breadth spans from Kindergarten (KG) to Post-Graduate levels.",
      },
      {
        year: "25+",
        body: "With focus on evolving our teaching and learning practices to meet the best of global standards the group pioneered the Velammal New Gen Edu Network mission with 25+ mainstream schools in different locations.",
      },
    ],
  },
  approach: {
    title: "360 Approach",
    items: [
      "Online Learning Management System on the Velammal Digital App",
      "GPS – a unique set of After School Programs to help you 'Discover your way'.",
    ],
  },
} as const;

/* --------------------------------------------------------------- updates */

export type Update = {
  title: string;
  /**
   * Editorial category. The source site carries no dates or taxonomy for
   * these pieces, so this is a classification of the article's own subject —
   * never a claim the source does not make.
   */
  tag: string;
  excerpt: string;
  href: string;
  image: Img;
};

export const updates = {
  heading: "Latest Updates",
  sub: "News from the Velammal Edu Network to the complete educational ecosystem, we bring you all the updates here.",
  items: [
    {
      title: "Lead Up to School Admissions: 4 Steps to Follow",
      tag: "Admissions",
      excerpt:
        "The desire to get your child enrolled into one of the best CBSE schools in Chennai can become overwhelming. Most parents feel bogged down due to...",
      href: "#admissions",
      image: {
        src: "/img/update-01.jpg",
        alt: "An alarm clock, apple, pencil pot, glasses and stack of books on a desk in front of a blackboard",
        width: 900,
        height: 604,
      },
    },
    {
      title: "4 Ways to Improve Your Child's Attention Span",
      tag: "Parenting",
      excerpt:
        "Children are always curious. And while that curiosity is good when they are exploring, but this very trait can become distracting when focus is required at a particular task. Untamed…",
      href: "https://velammal.org/4-ways-to-improve-your-childs-attention-span/",
      image: {
        src: "/img/update-02.jpg",
        alt: "An empty Velammal classroom with rows of desks and pinboards of student work on the walls",
        width: 600,
        height: 403,
      },
    },
  ] satisfies readonly Update[],
  readMore: "Read",
} as const;

/* ---------------------------------------------------------------- alumni */

export type Alum = { name: string; role: string; image: Img };

const alumniNames: readonly (readonly [string, string])[] = [
  ["Siva Prasath", "Officer at Standard Chartered"],
  ["Miss. Gomathy M", "Senior Software Developer"],
  ["N.K.Siva Prasath", "Business Analyst in TCS - Walmart"],
  ["Shabreen Fathima M", "Decision Scientist in MU Sigma"],
  [
    "Sarath Umashankar",
    "Senior Consultant / Technical Lead in Capgemini India Pvt.Ltd",
  ],
  ["Sneha Sinha", "Asst Manager in Thomas Cook India"],
  ["Lokesh Sathya", "Co-Founder & Director in Milky Delight"],
  ["Vijaya Lakshmi A", "Associate Consultant in INFOSYS"],
] as const;

export const alumni = {
  heading: "Our Alumni",
  people: alumniNames.map(([name, role], i) => ({
    name,
    role,
    image: {
      src: `/img/alumni-0${i + 1}.jpg`,
      alt: `Portrait of Velammal alumnus ${name}, ${role}`,
      width: 550,
      height: 613,
    },
  })) satisfies readonly Alum[],
} as const;

/* ------------------------------------------------------------------- faq */

export type FaqPanel = { q: string; a: readonly string[]; map?: true };

export const faq = {
  heading: "Frequently Asked Questions",
  panels: [
    {
      q: "How to Apply",
      a: [
        "To Complete the Registration process please click the apply now button in the website. You can also choose to visit our school directly to fulfill the Registration and Enrollment process. The completed registration form has to be submitted with the registration fees and the following documents at the respective School on any working day (Monday-Saturday) between 8.30 a.m. and 4.30 p.m.",
      ],
    },
    {
      q: "List of Documents",
      a: [
        "Pre KG to Grade 1 - Original Birth Certificate.",
        "Grades 2 and above - Original Report Card or a copy of Mark Sheet duly signed by the Head of the school (if available) where the child is presently studying.",
      ],
    },
    {
      q: "Age Eligibility Criteria",
      a: [
        "Pre KG: Should have been born on or before March 31, 2023.",
        "Jr. KG: Should have been born on or before March 31, 2022.",
        "Sr. KG: Should have been born on or before March 31, 2021.",
        "Grade I: Should have been born on or before March 31, 2020.",
        "Grade II and above: Age as per the Transfer Certificate.",
      ],
    },
    {
      q: "Selection Procedure",
      a: [
        "Pre KG to Grade 2: Solely based on interaction with Principal/ACO.",
        "Grade 3 to Grade 5: Based on the analysis of student's progress report from the previous school and interaction with the Principal/ACO. In absence of the Progress Report, the selection is based on the performance in the MCQ Learning Level Identification in Math, English, & Science. In Grade 5, if a change in the Second Language is sought, the student shall take a descriptive Learning Level Identification (LLI).",
        "Grade 6 and above: Solely based on the performance in the MCQ Learning Level Identification (LLI) in Math, English & Science. If a change in the Second Language is sought, the student shall take a descriptive Learning Level Identification (LLI).",
      ],
    },
    {
      q: "Payment of School Fee & Other Details",
      a: [
        "School Fee should be paid within 7 working days from the date of provisional admission offer. Admission stands cancelled for students who fail to pay the fee on the stipulated date. No further enquiry or request in this matter shall be appreciated.",
      ],
    },
    {
      q: "Mode of Payment",
      a: ["Registration Fees – Cash Only. All other fees – Debit Card / Credit Card."],
    },
    {
      q: "Office Hours",
      a: ["Cash Counter Working Hours: 8:00 am – 4:30 pm."],
    },
    {
      q: "Uniform, Text Books and Note Books",
      a: [
        "Schedule for distribution of books, notebooks and uniforms will be communicated through SMS/E-mail.",
      ],
    },
    {
      q: "School Location",
      a: [],
      map: true,
    },
  ] satisfies readonly FaqPanel[],
} as const;

/* ------------------------------------------------------------------ misc */

export const footer = {
  contactTitle: "CONTACT",
  contact: [
    "Velammal Vidhyashram CBSE Surapet",
    "4/176, Surapet Main Rd, Puzhal, Kadirvedu,",
    "Tamil Nadu 600066",
    "07855005555",
  ],
  phone: "07855005555",
  locationsTitle: "LOCATIONS",
  locations: [
    "Adhanur",
    "Ambattur",
    "Ambattur Kids",
    "Guduvanchery",
    "Kelambakkam",
    "Kolathur",
    "Dindigul",
    "Madhavaram",
    "Pallikaranai",
    "Mambakkam",
    "Maraimalai Nagar",
    "Medavakkam",
    "Mannivakkam",
    "Navalur",
    "Nedungundram",
    "Padappai",
    "Padur",
    "Periyar Nagar",
    "Puzhal",
    "Sholinganalur",
    "Sembakkam",
    "Somangalam",
    "surapet",
    "Tiruvottiyur",
    "Tiruvannamalai",
    "Vinayagapuram",
    "Kolathur",
    "Perungalathur",
  ],
} as const;

export const whatsapp = {
  label: "WhatsApp",
  href: "https://api.whatsapp.com/send?phone=919123547720&text=Hello%20Velammal%20New-Gen%20Group%20of%20Institutions%20%21%21%20Please%20let%20me%20know%20more%20about%20your%20school%20offerings%21%21",
} as const;

/** Section eyebrow numbering — "01 — ADMISSIONS" */
export const sectionIds = {
  facts: "facts",
  why: "why",
  gallery: "gallery",
  highlights: "academics",
  advantage: "advantage",
  updates: "updates",
  alumni: "alumni",
  faq: "admissions",
  closing: "closing",
} as const;

/* ---------------------------------------------------------------- popup */

/**
 * Admissions interstitial. Fires three seconds after arrival — late enough
 * that the preloader has cleared and the hero has been read, early enough to
 * catch a parent before they scroll past the fold.
 *
 * It carries enough to answer the three questions a parent actually has on
 * first contact — when, what, and who else — so the card is a decision, not
 * an interruption.
 */
export const admissionsPopup = {
  badge: "Admissions Open",
  eyebrow: "2026 – 27 Intake",
  headingLead: "Join the next intake at",
  headingAccent: "Mambakkam",
  body: "CBSE from Kindergarten to A+, taught through project-based learning on a state-of-the-art campus — with the Velammal Group's thirty-five years behind it.",
  facts: [
    { label: "Admissions Start", value: "18th Nov, 2026" },
    { label: "Curriculum", value: "CBSE" },
    { label: "Classes", value: "KG to A+" },
  ] satisfies readonly Fact[],
  highlights: [
    "Daily, weekly and end-of-term academic reviews",
    "Period-by-period e-logs on the Velammal Digital App",
    "Yoga, Karate, Music, Zumba, Arts & Physical Education",
    "Google Classrooms that run through the vacations",
  ],
  /** Overlaid on the campus photograph — proof, not decoration. */
  stat: { value: "750", label: "Students on campus", short: "Students" },
  statSide: [
    { label: "Founded", value: "2015" },
    { label: "Network", value: "25+ Schools" },
  ] satisfies readonly Fact[],
  /** The same proof, collapsed to one line for the mobile photo band. */
  statLine: "750 Students · Founded 2015 · 25+ Schools",
  ctaPrimary: { label: hero.ctaPrimary, href: "#admissions" },
  ctaSecondary: { label: "Ask us on WhatsApp", href: whatsapp.href },
  footnote: {
    label: "Cash counter",
    value: "8:00 am – 4:30 pm, Mon – Sat",
  },
  phoneLabel: "Call",
  phone: footer.phone,
  dismiss: "Close",
  image: {
    src: "/img/gallery-03.jpg",
    alt: "A teacher pinning a badge on a young Velammal student at an award ceremony",
    width: 600,
    height: 400,
  },
} as const;

/* --------------------------------------------------------------- closing */

/**
 * The finale composes strings that already exist elsewhere on the page rather
 * than introducing new copy for the sake of a bigger block.
 */
export const closingCta = {
  eyebrow: admissionsPopup.eyebrow,
  line: identity.subject,
  cta: hero.ctaPrimary,
  ctaSecondary: admissionsPopup.ctaSecondary,
} as const;
