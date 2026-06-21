import { galleryAlbums } from "./data/gallery.js";
import { icon, magIcon } from "./icons/magicons.js";

const asset = (name) => `./public/assets/${name}`;
const vendorAsset = (name) => `./public/vendor/${name}`;

const assets = {
  menuIcon: asset("menu-icon.png"),
  profile: asset("profile.png"),
  profileVector: asset("profile-vector.svg"),
  profileShape: asset("profile-shape.svg"),
  mottoTop: asset("motto-top.png"),
  mottoMiddle: asset("motto-middle.png"),
  mottoGrid: asset("motto-grid.png"),
  mottoGridAlt: asset("motto-grid-alt.png"),
  mottoUnion: asset("motto-union.svg"),
  patternVertical: asset("pattern-vertical.svg"),
  patternHorizontal: asset("pattern-horizontal.svg"),
  approachDiscover: asset("approach-discover.svg"),
  approachDefine: asset("approach-define.svg"),
  approachDeliver: asset("approach-deliver.svg"),
  approachValidate: asset("approach-validate.svg"),
  appFigma: asset("app-figma.png"),
  appPs: asset("app-ps.png"),
  appAi: asset("app-ai.png"),
  appAe: asset("app-ae.png"),
  appChatgpt: asset("app-chatgpt.png"),
  appMiro: asset("app-miro.png"),
  appZalo: asset("app-zalo.png"),
  appArc: asset("app-arc.png"),
  appNotion: asset("app-notion.png"),
  appAtlassian: asset("app-atlassian.png"),
  appBase: asset("app-base.png"),
  caseOne: asset("case-1.png"),
  caseTwo: asset("case-2.png"),
  caseThree: asset("case-3.png"),
  studyHabitCard: asset("study-habit-card.png"),
  studyEtubeCard: asset("study-etube-card.png"),
  studyHubCycleCard: asset("study-hub-cycle-card.png"),
  studyPotluckCard: asset("study-potluck-card.png"),
  studyHabitSlides: Array.from({ length: 14 }, (_, index) => asset(`study-habit-slide-${String(index + 1).padStart(2, "0")}.png`)),
  studyEtubeSlides: Array.from({ length: 11 }, (_, index) => asset(`study-etube-slide-${String(index + 1).padStart(2, "0")}.png`)),
  studyHubCycle: {
    overview: asset("study-hub-cycle-overview.png"),
    environmentalImpact: asset("study-hub-cycle-environmental-impact.png"),
    behaviorModel: asset("study-hub-cycle-behavior-model.png"),
    persona: asset("study-hub-cycle-persona.png"),
    parentInformationArchitecture: asset("study-hub-cycle-parent-information-architecture.png"),
    secondWorkflow: asset("study-hub-cycle-second-workflow.png"),
    productUiScreens: asset("study-hub-cycle-product-ui-screens.png"),
    testingResults: asset("study-hub-cycle-testing-results.png"),
    styleGuide: asset("study-hub-cycle-style-guide.png"),
  },
  galleryOne: asset("gallery-1.png"),
  galleryThree: asset("gallery-3.png"),
  galleryFour: asset("gallery-4.png"),
  galleryFive: asset("gallery-5.png"),
  gallerySix: asset("gallery-6.png"),
  gallerySeven: asset("gallery-7.png"),
  galleryEight: asset("gallery-8.png"),
  footerZalo: asset("footer-zalo.svg"),
  footerVietnam: asset("footer-vietnam.svg"),
  footerBehance: asset("footer-behance.svg"),
  footerLinkedIn: asset("footer-linkedin.svg"),
  footerDribbble: asset("footer-dribbble.svg"),
  certOne: asset("cert-1.png"),
  certTwo: asset("cert-2.png"),
  certThree: asset("cert-3.png"),
  certFour: asset("cert-4.png"),
  certFive: asset("cert-5.png"),
  certSix: asset("cert-6.png"),
  certFptLogo: asset("certificate-fpt-university-logo.png"),
  certIeltsLogo: asset("certificate-ielts-logo.png"),
  certIeltsScoreBg: asset("certificate-ielts-score-bg.png"),
  certIeltsThumbnail: `${asset("certificate-ielts-thumbnail.png")}?v=figma-474-3031-hover`,
  certFptDegree: asset("certificate-fpt-digital-art-degree.png"),
};

const siteLinks = {
  email: "mailto:minhtien2772002@gmail.com",
  phone: "tel:+84398466432",
  cv: "https://drive.google.com/file/d/1p9E_Y7Z-JFuyeyAxSJmP1U1zV33Q7ViL/view?usp=drive_link",
  zalo: "https://zalo.me/0398466432",
  linkedin: "https://www.linkedin.com/in/tien-nguyen-minh-5b99a8164/",
  dribbble: "https://dribbble.com/cuc22cu",
  behance: "https://www.behance.net/minhtien2765d6",
};

const externalLinkAttrs = `target="_blank" rel="noopener noreferrer"`;
const matterScriptSrc = vendorAsset("matter.min.js");

const approachCards = [
  ["Discover", "Understand users, business needs, and the real problem before defining a solution.", assets.approachDiscover],
  ["Define", "Turn insights into a clear product direction, focused priorities, and an achievable scope.", assets.approachDefine],
  ["Deliver", "Align people, decisions, and execution to move the product from concept to reality.", assets.approachDeliver],
  ["Validate", "Test assumptions, measure outcomes, and improve the product through evidence.", assets.approachValidate],
];

const workItems = [
  ["Product Designer", "Advizia Vietnam", "04/2025 - Present", [
    "Own the end-to-end design process for web and mobile products, from requirement discovery and workflow definition to final delivery and implementation review.",
    "Work directly with international clients, primarily Australian stakeholders, in an outsourced product development environment.",
    "Partner with clients, Business Analysts, Product Owners, and stakeholders to clarify requirements, identify gaps and edge cases, map business processes, and translate complex needs into scalable product solutions.",
    "Define information architecture, user flows, interaction models, wireframes, and interactive prototypes for workflow-heavy products.",
    "Review initial design solutions with Business Analysts to validate business logic and requirement coverage before presenting them to clients for feedback and approval.",
    "Evaluate and iterate design alternatives based on user needs, client feedback, business priorities, technical feasibility, and delivery constraints, using AI-assisted analysis to explore alternative flows and improve UX decisions.",
    "Build and maintain reusable components, design patterns, and documentation, while collaborating with developers to clarify interaction logic, review implementation quality, and resolve usability issues.",
  ]],
  ["UI/UX Designer", "VietTS Software", "08/2024 - 03/2025", [
    "Designed responsive web and mobile experiences, covering user flows, wireframes, interaction design, high-fidelity interfaces, and prototypes.",
    "Worked with stakeholders and cross-functional teams to clarify requirements, identify workflow issues, and convert product needs into practical UX solutions.",
    "Improved navigation, form structures, task flows, information hierarchy, and interaction patterns based on usability principles and product constraints.",
    "Presented design rationale, compared alternative solutions, and refined product experiences based on stakeholder feedback and implementation feasibility.",
    "Prepared design specifications, interaction notes, responsive behaviors, and assets for developer handoff.",
    "Reviewed implemented interfaces and collaborated with developers to resolve inconsistencies between design intent and final delivery.",
  ]],
  ["Product Designer", "GapoWork", "04/2024 - 08/2024", [
    "Collaborated with Business Analysts and Product Managers to translate business requirements into user flows, feature structures, and interface solutions.",
    "Designed product features aligned with roadmap priorities, operational workflows, user needs, and technical constraints.",
    "Identified gaps and edge cases within product requirements before translating them into wireframes and interaction models.",
    "Created interactive prototypes to communicate product logic, support internal validation, and reduce ambiguity before implementation.",
    "Worked with developers during feature delivery to clarify design decisions and maintain consistency across the product experience.",
  ]],
  ["UI/UX Designer", "Cloudify Vietnam", "07/2022 - 03/2024", [
    "Designed CRM and ERP interfaces for data-heavy screens and business workflows.",
    "Created user flows, wireframes, prototypes, and UI specifications for web and mobile products.",
    "Collaborated with Product Managers, Business Analysts, and developers to improve UX consistency and handoff quality.",
    "Supported landing pages, WordPress websites, and digital marketing materials.",
  ]],
  ["Freelance UI/UX Designer", "PageFly, Tigren & tabtab.me", "Project-based", [
    "Worked with clients including PageFly, Tigren, and tabtab.me on landing pages, ecommerce visuals, campaign assets, and digital marketing materials.",
    "Translated client briefs, commercial goals, and brand guidelines into polished visual solutions across multiple digital channels.",
    "Designed assets for product communication, acquisition campaigns, ecommerce presentation, and brand consistency.",
    "Managed feedback, revisions, and delivery timelines across project-based freelance assignments.",
  ]],
];

const certificates = [
  {
    title: "Bachelor’s Degree in Digital Art / Digital Design",
    issuer: "FPT University",
    source: "",
    tag: "UI/UX Design",
    image: assets.certFptLogo,
    media: "fpt",
    action: "modal",
  },
  {
    title: "IELTS 7.0",
    issuer: "British Council",
    source: "",
    tag: "English proficiency",
    image: assets.certIeltsThumbnail,
    media: "ielts",
  },
  {
    title: "Business Analysis / CBAP-aligned Specialization",
    issuer: "Starweaver",
    source: "Coursera",
    tag: "Business Analysis",
    image: assets.certOne,
    href: "https://www.coursera.org/account/accomplishments/specialization/GUG6NDFS9AVR",
  },
  {
    title: "Project Management Principles and Practices",
    issuer: "UC Irvine",
    source: "Coursera",
    tag: "Project Delivery",
    image: assets.certTwo,
    href: "https://www.coursera.org/account/accomplishments/specialization/HQCQUAQ99GG4",
  },
  {
    title: "Introduction to Agile Development and Scrum",
    issuer: "IBM",
    source: "Coursera",
    tag: "Agile / Scrum",
    image: assets.certThree,
    href: "https://www.coursera.org/account/accomplishments/verify/0DS2S3OEVL6I",
  },
  {
    title: "Leading People and Teams",
    issuer: "University of Michigan",
    source: "Coursera",
    tag: "Leadership",
    image: assets.certFour,
    href: "https://www.coursera.org/account/accomplishments/specialization/48RWQA6H6XBK",
  },
  {
    title: "Entrepreneurship: Launching an Innovative Business",
    issuer: "University of Maryland",
    source: "Coursera",
    tag: "Startup Thinking",
    image: assets.certFive,
    href: "https://www.coursera.org/account/accomplishments/specialization/GGEVQYDZRKEW",
  },
  {
    title: "Google UX Design Professional Certificate",
    issuer: "Google",
    source: "Coursera",
    tag: "UX Foundation",
    image: assets.certSix,
    href: "https://www.coursera.org/account/accomplishments/professional-cert/G5D2SB5BFANC",
  },
];

const skillBadges = [
  "Wireframing & Prototyping",
  "Requirements Analysis",
  "Product Discovery",
  "Product Strategy",
  "Product Design",
  "UX/UI Design",
  "Design Systems",
  "User Flows",
  "UX Research",
  "Information Architecture",
  "Usability Testing",
  "Stakeholder Communication",
];

const appIcons = [
  [assets.appFigma, "Figma", "icon-a"], [assets.appPs, "Photoshop", "icon-b"], [assets.appAi, "Illustrator", "icon-c"],
  [assets.appAe, "After Effects", "icon-d"], [assets.appChatgpt, "ChatGPT", "icon-e"], [assets.appMiro, "Miro", "icon-f"],
  [assets.appZalo, "Zalo", "icon-g"], [assets.appArc, "Arc", "icon-h"], [assets.appNotion, "Notion", "icon-i"],
  [assets.appAtlassian, "Atlassian", "icon-j"], [assets.appBase, "Design tool", "icon-k"],
];

const studyCaseCards = [
  {
    slug: "habit-tracker-app",
    title: "Habit Tracker App Engagement",
    meta: "Product Design Case Study - 2025",
    image: assets.studyHabitCard,
    href: "#/study-cases/habit-tracker-app",
  },
  {
    slug: "etube-music-app-redesign",
    title: "eTube Music App Redesign",
    meta: "UX/UI Case Study - 2025",
    image: assets.studyEtubeCard,
    href: "#/study-cases/etube-music-app-redesign",
  },
  {
    slug: "hub-cycle",
    title: "HubCycle",
    meta: "Capstone Project - 2023",
    image: assets.studyHubCycleCard,
    href: "#/study-cases/hub-cycle",
  },
  {
    slug: "cultural-exchange-potluck",
    title: "Cultural exchange potluck",
    meta: "06/20/2025",
    image: assets.studyPotluckCard,
    href: "#/contact",
  },
];

const studyCaseDetails = {
  "habit-tracker-app": {
    title: "Habit Tracker App",
    label: "Case study,",
    subtitle: "Increasing long-term engagement in a behavior-change product",
    next: "etube-music-app-redesign",
    sections: [
      {
        id: "overview",
        title: "Overview",
        intro: "A behavior-change product case study focused on why habit-app engagement fades after initial motivation, and how design can support longer-term consistency.",
        blocks: [
          { type: "meta", rows: [
            ["Project", "Habit Tracker App Engagement Redesign"],
            ["Role", "Product Designer"],
            ["Context", "Product Designer Test - Advizia"],
            ["Date", "14 March 2025"],
            ["Platform", "Mobile App"],
            ["Scope", "Product analysis, behavioral research, user journey, competitor analysis, information architecture, UX solution design, UI design"],
          ] },
          { type: "metrics", items: [
            ["Platform", "Mobile-first redesign"],
            ["Method", "Behavior research led"],
            ["Outcome", "Retention-focused UX"],
            ["Format", "Portfolio-ready UI"],
          ] },
        ],
      },
      {
        id: "problem",
        title: "Problem",
        intro: "The main issue was not awareness or download intent. Drop-off happened when initial motivation had to become repeatable daily behavior.",
        blocks: [
          { type: "cards", columns: 2, items: [
            ["Motivation drops over time", "Users start with energy, but motivation naturally fluctuates. The app needs encouragement, recovery cues, and reinforcement after the first few weeks."],
            ["UX feels like extra work", "Manual logging and cluttered flows make habit tracking feel like another task instead of a lightweight support system."],
            ["Lack of personalization", "Different goals, routines, and schedules need flexible setup. Generic flows make the product feel detached from real life."],
            ["Weak progress feedback", "When effort is not visible, users lose the feeling of achievement. Progress needs to be clear, emotional, and easy to understand."],
          ] },
        ],
      },
      {
        id: "research",
        title: "Research",
        intro: "The research reframed the product from a tracking tool into a habit-formation companion. Rather than adding more reminders, the app needs to support the full behavior-change process.",
        blocks: [
          { type: "image", src: assets.studyHabitSlides[0], alt: "Behavior change model slide for the habit tracker case study." },
          { type: "highlight", quote: "Users do not abandon habit apps only because they forget to track. They abandon them because the app fails to support the full behavior-change process.", label: "Key behavioral insight" },
        ],
      },
      {
        id: "behavioral-insight",
        title: "Behavioral Insight",
        intro: "Habit formation depends on repeated action in response to a stable cue or trigger. The app should help users connect a desired habit to a concrete moment in their daily routine.",
        blocks: [
          { type: "formula", items: [["I want to", "[habit]"], ["before/after", "[trigger action]"], ["so I can be", "[identity outcome]"]] },
          { type: "image", src: assets.studyHabitSlides[1], alt: "Trigger framework slide for habit setup." },
        ],
      },
      {
        id: "persona",
        title: "Persona",
        intro: "Lan Anh represents a busy, self-improvement oriented user who wants a polished product that makes consistency feel achievable rather than demanding.",
        blocks: [
          { type: "persona", name: "Lan Anh", meta: "28 / Marketing Professional / Hanoi, Vietnam", chips: ["Needs guided setup", "Pain: repetitive tracking", "Goal: sustainable habits", "Behavior: tries apps, drops off"] },
          { type: "image", src: assets.studyHabitSlides[2], alt: "Lan Anh persona slide." },
        ],
      },
      {
        id: "journey",
        title: "Journey",
        intro: "The journey map makes the highest-risk moments visible: activation, retention, and churn recovery.",
        blocks: [
          { type: "image", src: assets.studyHabitSlides[3], alt: "User journey map slide for the habit tracker app." },
          { type: "list", items: [
            "Activation is where users need guidance.",
            "Retention depends on visible progress and emotional reinforcement.",
            "Churn risk increases when reminders become generic or the app feels repetitive.",
          ] },
        ],
      },
      {
        id: "competitors",
        title: "Competitors",
        intro: "The competitor review surfaced a clear opportunity: combine modern habit guidance, progress visibility, community support, and lower-friction daily access.",
        blocks: [
          { type: "image", src: assets.studyHabitSlides[4], alt: "Competitor analysis slide for habit tracking apps." },
          { type: "cards", columns: 2, items: [
            ["Better progress visualization", "Clear charts, streaks, success rates, and visual indicators make effort easier to understand."],
            ["Modern and intuitive UI", "A cleaner interface reduces friction and increases perceived product quality."],
            ["Stronger community features", "Challenges, support, leaderboards, and friend invitations make habit-building more accountable."],
            ["Useful home screen widgets", "Widgets keep habits visible outside the app and reduce the cost of daily logging."],
          ] },
        ],
      },
      {
        id: "strategy",
        title: "Strategy",
        intro: "The product strategy focused on four mechanisms that help motivation become routine.",
        blocks: [
          { type: "cards", columns: 2, items: [
            ["Habit Formation", "Help users attach habits to stable real-life triggers so actions are easier to remember and repeat."],
            ["Progress Visibility", "Turn repeated effort into visible evidence through charts, streaks, and success indicators."],
            ["Social Accountability", "Use peer support and challenges to create commitment without making the product feel heavy."],
            ["Lightweight Rewards", "Reward consistency with points, badges, quotes, and small moments of positive reinforcement."],
          ] },
          { type: "imageGrid", images: [
            [assets.studyHabitSlides[5], "Function list slide."],
            [assets.studyHabitSlides[6], "Information architecture slide."],
          ] },
        ],
      },
      {
        id: "solution",
        title: "Solution",
        intro: "The final solution is grouped into four product areas instead of a long feature list. Each group supports a different part of habit formation and retention.",
        blocks: [
          { type: "cards", columns: 2, items: [
            ["Habit Formation", "Trigger-based habit creation, pre-built routines, and smart reminders help users begin with a concrete behavioral plan."],
            ["Progress Feedback", "Charts, image-based notes, and widgets make progress visible and give daily logging more meaning."],
            ["Motivation System", "Motivational quotes, points, badges, and rewards make consistency feel emotionally rewarding."],
            ["Social Accountability", "Challenges, leaderboards, peer support, and virtual gifts create social commitment."],
          ] },
          { type: "imageGrid", images: [
            [assets.studyHabitSlides[7], "Trigger solution slide."],
            [assets.studyHabitSlides[8], "Progress solution slide."],
            [assets.studyHabitSlides[9], "Routines slide."],
            [assets.studyHabitSlides[10], "Challenge slide."],
            [assets.studyHabitSlides[11], "Widget slide."],
            [assets.studyHabitSlides[12], "Notifications slide."],
          ] },
        ],
      },
      {
        id: "ui-direction",
        title: "UI Direction",
        intro: "The UI direction keeps the product friendly, rounded, supportive, and clean while using the original app design system direction from the source deck.",
        blocks: [
          { type: "image", src: assets.studyHabitSlides[13], alt: "UI design system direction slide for the habit tracker." },
          { type: "chips", items: ["Typography: Manrope", "Color direction: soft purple system", "Style: friendly and rounded", "Tone: supportive and clean"] },
        ],
      },
      {
        id: "impact",
        title: "Impact",
        intro: "The expected impact is framed as product hypotheses to validate with retention, completion, reminder, challenge, widget, and return-rate metrics.",
        blocks: [
          { type: "table", headers: ["Problem", "Design Response", "Expected Outcome"], rows: [
            ["Users lose motivation after a few weeks", "Challenges, peer support, rewards", "Higher emotional engagement"],
            ["Users forget or delay habits", "Trigger-based setup, reminders, widgets", "Better habit recall"],
            ["Progress feels invisible", "Charts, streaks, indicators", "Stronger sense of achievement"],
            ["Users do not know where to start", "Pre-built routines", "Faster activation"],
            ["Tracking feels repetitive", "Image-based notes and gamified feedback", "More meaningful daily logging"],
            ["Users feel isolated", "Peer support and community challenges", "Higher accountability"],
          ] },
        ],
      },
      {
        id: "reflection",
        title: "Reflection",
        intro: "This project shows that habit-tracking apps cannot rely on motivation alone. A stronger product helps users attach habits to real-life triggers, see progress clearly, and receive support when consistency gets hard.",
        blocks: [
          { type: "list", items: [
            "Design for the behavior loop, not only the tracking moment.",
            "Make progress emotionally visible before motivation fades.",
            "Validate the solution through usability testing and retention-focused experiments.",
          ] },
        ],
      },
    ],
  },
  "etube-music-app-redesign": {
    title: "eTube Music",
    label: "Case study,",
    subtitle: "Redesigning music discovery, playback, and personalization for a smoother listening experience",
    next: "hub-cycle",
    sections: [
      {
        id: "overview",
        title: "Overview",
        intro: "eTube Music is a mobile streaming app redesign focused on smoother discovery, playback, playlist management, and personalized listening.",
        blocks: [
          { type: "meta", rows: [
            ["Project", "eTube Music App Redesign"],
            ["Role", "UI/UX Designer"],
            ["Platform", "iOS Mobile App"],
            ["Timeline", "8 weeks"],
            ["Tools", "Figma, Lark Suite, Adobe Suite"],
            ["Scope", "UX research, user flow, sitemap, UI redesign, interaction design, visual system, final prototype"],
          ] },
          { type: "chips", items: ["Year: 2025", "Core loop: Discover > Play > Save > Return", "Media-first mobile UI", "Personalized discovery"] },
        ],
      },
      {
        id: "problem",
        title: "Problem",
        intro: "Users were initially interested in eTube Music, but the current experience created friction across playback, navigation, recommendations, and personalization.",
        blocks: [
          { type: "cards", columns: 3, items: [
            ["Performance friction", "Slow loading, crashes, and unreliable playback reduce trust during core listening moments."],
            ["Navigation complexity", "Users struggled to find playlist, recommendation, and playback features quickly."],
            ["Weak personalization", "Recommendations and playlist support did not feel tailored enough to keep users returning."],
          ] },
        ],
      },
      {
        id: "research",
        title: "Research",
        intro: "The research phase focused on current eTube users to identify the issues affecting satisfaction, retention, and daily usability.",
        blocks: [
          { type: "image", src: assets.studyEtubeSlides[0], alt: "eTube user research slide." },
          { type: "image", src: assets.studyEtubeSlides[1], alt: "eTube pain points and insights slide." },
        ],
      },
      {
        id: "insights",
        title: "Insights",
        intro: "The strongest research signal was clear: speed, clarity, reliability, and personalization mattered more than adding more surface-level features.",
        blocks: [
          { type: "metrics", items: [
            ["49.44%", "Slow loading times", "Prioritize faster content access and clearer loading feedback."],
            ["37.99%", "Confusing navigation", "Simplify the app structure around primary listening tasks."],
            ["35.75%", "Bugs and crashes", "Reduce interaction complexity and reinforce reliability."],
            ["25.14%", "Poor recommendations", "Improve curated discovery and recommendation relevance."],
            ["18.99%", "Very satisfied", "Modernize hierarchy and improve perceived product quality."],
            ["42.46%", "Want personalization", "Add tailored playlists and behavior-based suggestions."],
          ] },
        ],
      },
      {
        id: "persona",
        title: "Persona",
        intro: "Lucas Jonas represents a tech-savvy listener who expects music apps to feel fast, stable, visually polished, and personalized throughout the day.",
        blocks: [
          { type: "persona", name: "Lucas Jonas", meta: "28 / Marketing Specialist at a Tech Startup / Tech proficiency: Intermediate", chips: ["Goal: seamless listening", "Secondary goal: share music", "Pain: slow and unstable app", "Needs: discovery, playlists, offline support"] },
          { type: "image", src: assets.studyEtubeSlides[2], alt: "Lucas Jonas persona slide." },
        ],
      },
      {
        id: "flow",
        title: "Flow",
        intro: "The redesigned flow reduces navigation complexity by organizing the app around Home, Search, Playback, Library, and Profile.",
        blocks: [
          { type: "image", src: assets.studyEtubeSlides[3], alt: "eTube redesigned user flow slide." },
          { type: "paragraph", text: "The sitemap clarifies the relationship between discovery, playback, storage, and personalization." },
          { type: "image", src: assets.studyEtubeSlides[4], alt: "eTube sitemap slide." },
        ],
      },
      {
        id: "strategy",
        title: "Strategy",
        intro: "The redesign was guided by four principles that support the core listening loop: discover music, start playback, save content, and return to recommendations.",
        blocks: [
          { type: "cards", columns: 2, items: [
            ["Make Discovery Immediate", "Put search, recommendations, playlists, and genres where users can act quickly."],
            ["Reduce Navigation Friction", "Simplify the app around Home, Search, Playback, Library, and Profile."],
            ["Improve Perceived Performance", "Use clearer flows and faster access patterns to make listening feel more responsive."],
            ["Strengthen Personalization", "Make recommendations and playlists feel tailored to user behavior and taste."],
          ] },
        ],
      },
      {
        id: "solution",
        title: "Solution",
        intro: "The final solution focused on five product areas that improve discovery, control, playlist organization, playback reliability, and perceived performance.",
        blocks: [
          { type: "cards", columns: 3, items: [
            ["Search Accuracy", "Clearer search categories and filters help users find songs, artists, playlists, and albums faster."],
            ["Seek Functionality", "More accessible controls make playback navigation easier and reduce listening friction."],
            ["Playlist Management", "Better playlist capacity and organization support saving, grouping, and returning to music."],
            ["Background Playback", "Restored background listening supports real mobile usage while users are on the go."],
            ["Performance Optimization", "Simpler flows and faster access improve perceived speed across core tasks."],
          ] },
          { type: "image", src: assets.studyEtubeSlides[5], alt: "eTube solution slide." },
        ],
      },
      {
        id: "final-design",
        title: "Final Design",
        intro: "The final UI turns the research findings into practical mobile screens for discovery, search, playback, playlist access, and website communication.",
        blocks: [
          { type: "image", src: assets.studyEtubeSlides[6], alt: "eTube homepage improvement slide." },
          { type: "paragraph", text: "Homepage redesign prioritizes personalized recommendations, quick playlist access, prominent search, and genre-based discovery." },
          { type: "image", src: assets.studyEtubeSlides[7], alt: "eTube search improvement slide." },
          { type: "paragraph", text: "Search redesign introduces clearer content categories and filtering to help users find songs, artists, playlists, and albums faster." },
          { type: "imageGrid", images: [
            [assets.studyEtubeSlides[8], "eTube multi-screen UI showcase."],
            [assets.studyEtubeSlides[9], "eTube website design extension."],
          ] },
        ],
      },
      {
        id: "ui-design",
        title: "UI Design",
        intro: "The visual system uses Inter, strong media artwork, rounded mobile components, and a dark listening experience to make the app feel immersive and modern.",
        blocks: [
          { type: "image", src: assets.studyEtubeSlides[10], alt: "eTube typography and colors slide." },
          { type: "chips", items: ["Typography: Inter", "Direction: modern, immersive, media-first", "Focus: clear hierarchy", "Dark listening experience"] },
        ],
      },
      {
        id: "impact",
        title: "Impact",
        intro: "The expected impact is framed as product hypotheses, with validation metrics kept visible for the next testing phase.",
        blocks: [
          { type: "table", headers: ["User Problem", "Design Response", "Expected Outcome"], rows: [
            ["Slow loading times", "Faster access and clearer playback flow", "Improved perceived performance"],
            ["Confusing navigation", "Simplified Home, Search, Playback, Library, Profile", "Reduced cognitive load"],
            ["Bugs and crashes", "Reduced interaction complexity around core flows", "Higher trust and reliability"],
            ["Poor recommendations", "Personalized discovery and curated sections", "Better content relevance"],
            ["Lack of personalization", "Tailored playlists and behavior-based suggestions", "Stronger engagement"],
            ["Low design satisfaction", "Modernized UI and visual hierarchy", "Better perceived product quality"],
          ] },
          { type: "note", title: "Metrics to validate next:", items: [
            "[Metric needed] Post-redesign usability testing result",
            "[Metric needed] Task completion rate improvement",
            "[Metric needed] Search success rate improvement",
            "[Metric needed] User satisfaction score after redesign",
          ] },
        ],
      },
      {
        id: "reflection",
        title: "Reflection",
        intro: "This project showed that redesigning a music app is not only about visual polish. The core challenge was improving the listening loop: discover music, start playback, save content, and return to personalized recommendations.",
        blocks: [
          { type: "list", items: [
            "Speed and reliability shape trust in entertainment apps.",
            "Personalization is central to music discovery.",
            "Clear navigation helps users move from discovery to playback with less friction.",
          ] },
        ],
      },
    ],
  },
  "hub-cycle": {
    title: "HubCycle",
    label: "Case study,",
    subtitle: "Designing a sustainable exchange app for second-hand textbooks and school uniforms",
    next: "habit-tracker-app",
    sections: [
      {
        id: "overview",
        title: "Overview",
        intro: "HubCycle is a mobile application designed to help parents give and receive second-hand textbooks and school uniforms. The product addresses environmental waste and financial pressure by extending the lifecycle of school-related items through community-based exchange.",
        blocks: [
          { type: "meta", rows: [
            ["Project", "HubCycle"],
            ["Context", "Capstone Project - GDP493"],
            ["Role", "UI/UX Designer / Product Designer"],
            ["Team", "GDP493_G02"],
            ["Platform", "Mobile App"],
            ["Domain", "Sustainability, education, parent community, second-hand exchange"],
            ["Scope", "Research, problem definition, IA, workflow, prototype, usability testing, heuristic evaluation, UI design"],
            ["Core Idea", "An app that allows parents to exchange second-hand textbooks and school uniforms"],
          ] },
          { type: "highlight", quote: "HubCycle turns unused school items into shared community value." },
          { type: "chips", items: ["Second-hand exchange", "Parent community", "School textbooks", "Uniform reuse", "Responsible consumption"] },
          { type: "image", src: assets.studyHubCycle.overview, alt: "HubCycle mobile app overview screens.", fit: "cover" },
        ],
      },
      {
        id: "problem",
        title: "Problem",
        intro: "Parents often need to buy new textbooks and uniforms every school year, while usable books and clothing are discarded after short periods of use. This creates unnecessary waste, increases household spending, and weakens reuse within local parent communities.",
        blocks: [
          { type: "cards", columns: 2, items: [
            ["Discarded books and uniforms", "Usable school items are often thrown away despite still having practical value."],
            ["Environmental impact", "Discarded clothing and books contribute to resource depletion, emissions, water pollution, and landfill congestion."],
            ["Financial burden for parents", "New textbooks and uniforms create recurring costs as curricula, requirements, or student sizes change."],
            ["Fragmented exchange behavior", "Parents already exchange through informal channels, but the process lacks structure, visibility, trust, and convenience."],
          ] },
          { type: "image", src: assets.studyHubCycle.environmentalImpact, alt: "Environmental impact source frame from the HubCycle report.", fit: "contain", maxWidth: 700, ratio: "1785 / 2526", caption: "Source frame: paper waste and environmental impact evidence from the HubCycle report." },
        ],
      },
      {
        id: "research",
        title: "Research",
        intro: "The research connected sustainability, education, parent behavior, and community exchange. HubCycle was framed around SDG-aligned responsible consumption, product lifecycle extension, and freecycling behavior, then translated into a mobile experience for parents.",
        blocks: [
          { type: "cards", columns: 3, items: [
            ["SDGs", "Responsible consumption and waste reduction."],
            ["Product Life Cycle", "Gift-based exchange extends product life."],
            ["Freecycling", "Community trust encourages sustainable behavior."],
            ["Environmental Effects", "School, grade, size, and curriculum affect fit."],
            ["Community Impact", "Responsible consumption and waste reduction."],
            ["Behavior Change", "Gift-based exchange extends product life."],
            ["Hook Model", "Community trust encourages sustainable behavior."],
            ["Market Research", "School, grade, size, and curriculum affect fit."],
            ["User Research", "Responsible consumption and waste reduction."],
            ["Competitor Research", "Gift-based exchange extends product life."],
            ["SDG 12", "Responsible consumption and waste reduction."],
            ["Freecycling", "Gift-based exchange extends product life."],
            ["Community", "Participation builds trust and repeat behavior."],
            ["Relevance", "School, grade, size, and curriculum determine item fit."],
          ] },
          { type: "highlight", quote: "The core UX challenge is not only listing used items. It is helping parents quickly determine whether an item is relevant, trustworthy, and worth requesting." },
          { type: "image", src: assets.studyHubCycle.behaviorModel, alt: "Behavior intervention model from the HubCycle report.", fit: "contain", maxWidth: 700, ratio: "1785 / 2526", caption: "Source frame: behavior intervention model connecting sustainable behavior and product design decisions." },
        ],
      },
      {
        id: "users",
        title: "Users",
        intro: "The primary users are parents of school-age children who need a safer, more structured way to find and give away relevant textbooks and uniforms.",
        blocks: [
          { type: "chipCard", title: "Parents of school-age children", items: ["Find by school / grade / size", "Give away usable items", "Reduce school costs", "Avoid waste", "Safer exchange process", "Understand item condition"] },
          { type: "cards", columns: 2, items: [
            ["Needs", "Relevant school filters\nClear item condition\nLower school-related costs\nStructured community exchange"],
            ["Pain Points", "Hard to search informal groups\nScattered communication\nLow trust in strangers\nManual pickup coordination"],
          ] },
          { type: "image", src: assets.studyHubCycle.persona, alt: "Persona summary for parents who receive or share used textbooks and uniforms.", fit: "contain", maxWidth: 700, ratio: "1785 / 2526", caption: "Source frame: persona summary for parents who receive or share used textbooks and uniforms." },
        ],
      },
      {
        id: "strategy",
        title: "Strategy",
        intro: "The project followed a design thinking process: explore sustainability and parent behavior, define the exchange problem, ideate product models, build prototypes, and evaluate the design through usability testing and heuristic evaluation.",
        blocks: [
          { type: "cards", columns: 3, items: [
            ["Empathize", "Understand sustainability and parent behavior."],
            ["Define", "Frame the exchange problem."],
            ["Ideate", "Explore product and community models."],
            ["Prototype", "Build app flows and screens."],
            ["Test", "Evaluate usability and heuristics."],
            ["Textbook changes affect reuse", "Matching by school, grade, and textbook set becomes important."],
            ["Uniform reuse depends on rules", "Size, school, condition, and item type must be visible."],
            ["Informal exchange already exists", "The opportunity is structure, searchability, and trust."],
          ] },
        ],
      },
      {
        id: "ia-flow",
        title: "IA & Flow",
        intro: "The app structure organizes item discovery, item posting, exchange requests, user profiles, and community-based interactions. The operating model connects parents who want to give usable school items with parents who need them.",
        blocks: [
          { type: "chips", items: ["Browse items", "Post item", "Item detail", "Request item", "Exchange management", "Messages / contact", "Profile", "Community / information"] },
          { type: "flow", items: ["Parent has unused item", "Posts textbook or uniform", "Adds school / grade / size / condition", "Another parent searches", "Sends request", "Coordinate exchange", "Item lifecycle extended"] },
          { type: "flow", items: ["Parent needs item", "Searches by category", "Filters by school / grade / size / location", "Reviews condition", "Sends request", "Receives item", "Reduces need to buy new"] },
          { type: "image", src: assets.studyHubCycle.parentInformationArchitecture, alt: "Parent-role information architecture diagram for HubCycle.", fit: "contain", maxWidth: 780, ratio: "1497 / 1716", caption: "Source diagram: parent-role information architecture used to organize discovery, posting, and exchange flows." },
          { type: "image", src: assets.studyHubCycle.secondWorkflow, alt: "Improved HubCycle exchange workflow diagram.", fit: "contain", maxWidth: 820, ratio: "1473 / 1281", caption: "Source diagram: improved workflow showing the exchange system after IA refinement." },
        ],
      },
      {
        id: "solution",
        title: "Solution",
        intro: "The product solution focuses on making reuse easier to post, easier to search, and safer to request through structured item information and a parent-community exchange model.",
        blocks: [
          { type: "cards", columns: 3, items: [
            ["Item Posting", "Parents can upload textbooks or uniforms with category, school, grade, size, condition, and location."],
            ["Item Discovery", "Parents can browse and search available items to find relevant school materials faster."],
            ["Structured Item Details", "Listings make relevance clear through school, grade, size, condition, and availability."],
          ] },
          { type: "cards", columns: 2, items: [
            ["Exchange Request", "Parents can request an item and coordinate with the owner through a more organized exchange flow."],
            ["Community-Based Reuse", "The product supports freecycling by making it easier for families to pass usable items to others."],
          ] },
          { type: "highlight", quote: "For a reuse product, trust is part of the user experience. Parents are not only selecting an item - they are deciding whether the exchange feels safe, relevant, and worth coordinating." },
          { type: "cards", columns: 2, items: [
            ["Clear item information", "Enough detail to judge item relevance before contacting the owner."],
            ["Condition transparency", "Photos and condition labels reduce uncertainty."],
            ["Community context", "Exchange works better inside a parent or school-related community."],
            ["Lower-friction giving", "The easier posting is, the more likely items stay in circulation."],
          ] },
          { type: "image", src: assets.studyHubCycle.productUiScreens, alt: "HubCycle product feed and product detail screens.", fit: "contain", maxWidth: 760, ratio: "1785 / 2526", caption: "Source frame: product feed and product detail screens showing how parents browse and evaluate items." },
        ],
      },
      {
        id: "testing",
        title: "Testing",
        intro: "The design was iterated through usability testing, information architecture refinement, prototype updates, heuristic evaluation, and final simulation. The evaluation process helped refine app structure, interaction flow, and UI clarity.",
        blocks: [
          { type: "cards", columns: 3, items: [
            ["First Usability Testing", "Evaluation stage from the project process. Keep exact metrics visible once validated."],
            ["Second Information Architecture", "Evaluation stage from the project process. Keep exact metrics visible once validated."],
            ["Second Prototype", "Evaluation stage from the project process. Keep exact metrics visible once validated."],
            ["User Interface Design", "Evaluation stage from the project process. Keep exact metrics visible once validated."],
            ["Heuristic Evaluation", "Evaluation stage from the project process. Keep exact metrics visible once validated."],
            ["Design Finalization", "Evaluation stage from the project process. Keep exact metrics visible once validated."],
            ["Simulation", "Evaluation stage from the project process. Keep exact metrics visible once validated."],
          ] },
          { type: "image", src: assets.studyHubCycle.testingResults, alt: "Second prototype testing results and issues for HubCycle.", fit: "contain", maxWidth: 700, ratio: "1785 / 2526", caption: "Source frame: second prototype testing results and issues used to refine the experience." },
        ],
      },
      {
        id: "ui-system",
        title: "UI System",
        intro: "The UI system was designed to make the product feel approachable, practical, and sustainability-oriented. Visual consistency across typography, colors, buttons, icons, and layout helped create a more trustworthy exchange experience.",
        blocks: [
          { type: "chips", items: ["Color", "Typography", "Iconography", "Grid", "Buttons", "Mascot", "Interactive components"] },
          { type: "image", src: assets.studyHubCycle.styleGuide, alt: "HubCycle visual style guide.", fit: "contain", maxWidth: 700, ratio: "1785 / 2526", caption: "Source frame: visual style guide documenting the HubCycle color and interface direction." },
        ],
      },
      {
        id: "impact",
        title: "Impact",
        intro: "The expected impact is framed as product hypotheses, with metrics kept conservative for future validation.",
        blocks: [
          { type: "table", headers: ["Problem", "Design Response", "Expected Product Value"], rows: [
            ["Usable textbooks and uniforms are discarded", "Exchange flow for giving and receiving items", "Extends item lifecycle and reduces waste"],
            ["Parents face recurring school expenses", "Second-hand item discovery by category and relevance", "Reduces pressure to buy everything new"],
            ["Exchange happens in scattered communities", "Centralized listing and request flow", "Makes reuse easier to search, compare, and coordinate"],
            ["Users need trust before exchanging", "Photos, condition details, school/grade/size metadata", "Improves confidence before contacting another parent"],
            ["Sustainable behavior requires participation", "Community-based freecycling model", "Encourages responsible consumption and sharing"],
          ] },
        ],
      },
      {
        id: "reflection",
        title: "Reflection",
        intro: "HubCycle showed how UX design can translate sustainability research into a practical community product. The most important challenge was not simply designing a marketplace, but creating a structured and trustworthy exchange experience for parents who need relevant school items at the right time.",
        blocks: [
          { type: "list", items: [
            "Sustainable products need low-friction participation.",
            "Second-hand exchange depends on trust, relevance, and timing.",
            "Research-driven IA helps turn complex social behavior into a usable product flow.",
          ] },
        ],
      },
    ],
  },
};

const galleryFallbackImages = [
  assets.gallerySeven,
  assets.galleryEight,
  assets.galleryFive,
  assets.galleryFour,
  assets.galleryThree,
  assets.gallerySix,
  assets.galleryOne,
];

const galleryMasonryLayout = [
  { x: 67, y: 46, w: 250, speed: 30, drift: -4, rotate: -0.7 },
  { x: 45, y: 1065.5, w: 494, speed: 44, drift: 3, rotate: 0.8 },
  { x: 368, y: 101, w: 475, speed: 24, drift: 4, rotate: 0.4 },
  { x: 562, y: 828, w: 336, speed: 38, drift: -3, rotate: -0.5 },
  { x: 774, y: 396, w: 333, speed: 34, drift: 2, rotate: 0.6 },
  { x: 625, y: 1350, w: 482, speed: 42, drift: -2, rotate: -0.4 },
  { x: 233, y: 527, w: 329, speed: 28, drift: 3, rotate: 0.5 },
  { x: 150, y: 1573, w: 495, speed: 36, drift: -4, rotate: -0.6 },
];

const galleryTilePatterns = [
  "feature",
  "small",
  "wide",
  "tall",
  "medium",
  "small",
  "wide",
  "medium",
  "tall",
  "feature",
  "small",
  "wide",
];

let cleanupTasks = [];
const addCleanup = (fn) => cleanupTasks.push(fn);
const runCleanups = () => {
  cleanupTasks.forEach((fn) => fn());
  cleanupTasks = [];
};

const pattern = () => `
  <div class="pattern" aria-hidden="true">
    <img class="pattern-lines" src="${assets.patternVertical}" alt="">
    <img class="pattern-lines" src="${assets.patternHorizontal}" alt="">
  </div>
`;

const galleryImageEntries = () => galleryAlbums.flatMap((album, albumIndex) => {
  const entries = Array.isArray(album.imageEntries) && album.imageEntries.length
    ? album.imageEntries
    : album.images.map((src, index) => ({ src, order: index }));

  return entries.map((entry, index) => ({
    albumIndex,
    albumSlug: album.slug,
    albumTitle: album.title,
    fileName: entry.fileName || entry.src.split("/").pop() || "",
    modifiedAt: entry.modifiedAt || "",
    modifiedAtMs: Number(entry.modifiedAtMs || 0),
    order: Number(entry.order ?? index),
    src: entry.src,
  }));
});

const galleryAlbumMedia = (album) => {
  if (Array.isArray(album.media) && album.media.length) {
    return album.media.map((item, index) => ({
      id: item.id || `${album.slug}-media-${index}`,
      type: item.type === "video" ? "video" : "image",
      src: item.src,
      poster: item.poster || "",
      alt: item.alt || `${album.title} media ${index + 1}`,
      title: item.title || item.fileName || `${album.title} media ${index + 1}`,
      order: Number(item.order ?? index),
      fileName: item.fileName || item.src.split("/").pop() || "",
    })).filter((item) => item.src);
  }

  return (album.images || []).map((src, index) => ({
    id: `${album.slug}-image-${index}`,
    type: "image",
    src,
    poster: "",
    alt: `${album.title} image ${index + 1}`,
    title: src.split("/").pop() || `${album.title} image ${index + 1}`,
    order: index,
    fileName: src.split("/").pop() || "",
  }));
};

const galleryAlbumImages = (album) => Array.isArray(album.images) && album.images.length
  ? album.images
  : galleryAlbumMedia(album).filter((item) => item.type === "image").map((item) => item.src);

const latestGalleryImages = (limit = 7) => {
  const entries = galleryImageEntries()
    .filter((entry) => entry.src)
    .sort((a, b) => {
      if (b.modifiedAtMs !== a.modifiedAtMs) return b.modifiedAtMs - a.modifiedAtMs;
      const dateDiff = Date.parse(b.modifiedAt || "") - Date.parse(a.modifiedAt || "");
      if (dateDiff) return dateDiff;
      return b.fileName.localeCompare(a.fileName, undefined, { numeric: true });
    });

  if (entries.length) return entries.slice(0, limit);

  return galleryFallbackImages.slice(0, limit).map((src, index) => ({
    albumIndex: 0,
    albumSlug: "fallback",
    albumTitle: "Gallery",
    fileName: src.split("/").pop() || "",
    modifiedAt: "",
    modifiedAtMs: 0,
    order: index,
    src,
  }));
};

const footerSocialLinks = [
  { label: "Zalo", href: siteLinks.zalo, icon: assets.footerZalo, className: "footer-icon-zalo" },
  { label: "Behance", href: siteLinks.behance, icon: assets.footerBehance, className: "footer-icon-behance" },
  { label: "LinkedIn", href: siteLinks.linkedin, icon: assets.footerLinkedIn, className: "footer-icon-linkedin" },
  { label: "Dribbble", href: siteLinks.dribbble, icon: assets.footerDribbble, className: "footer-icon-dribbble" },
];

const footerIconLink = ({ label, href, icon: src, className }) => `
  <a class="footer-social-link ${className}" href="${href}" ${href.startsWith("http") ? externalLinkAttrs : ""} aria-label="${label}">
    <img src="${src}" alt="">
  </a>
`;

function getRoute() {
  const hash = window.location.hash || "#/";
  const slugMatch = hash.match(/^#\/study-cases\/([^/?#]+)/);
  if (slugMatch) return { page: "study-detail", slug: decodeURIComponent(slugMatch[1]) };
  const gallerySlugMatch = hash.match(/^#\/gallery\/([^/?#]+)/);
  if (gallerySlugMatch) return { page: "gallery-detail", slug: decodeURIComponent(gallerySlugMatch[1]) };
  if (hash === "#study-cases" || hash.startsWith("#/study-cases")) return { page: "study-list" };
  if (hash === "#about" || hash.startsWith("#/about")) return { page: "about" };
  if (hash === "#works" || hash.startsWith("#/works")) return { page: "home", target: "works" };
  if (hash === "#gallery" || hash === "#/gallery") return { page: "gallery-list" };
  if (hash === "#contact" || hash.startsWith("#/contact")) return { page: "home", target: "contact" };
  return { page: "home" };
}

function headerMarkup() {
  const route = getRoute();
  const isStudyCase = route.page === "study-list" || route.page === "study-detail";
  const isGallery = route.page === "gallery-list" || route.page === "gallery-detail";
  return `
    <header class="site-header">
      <button class="mobile-menu-overlay" type="button" aria-hidden="true" tabindex="-1"></button>
      <nav class="nav-shell glass-light" aria-label="Primary navigation">
        <a class="brand" href="#/" aria-label="Nguyen Minh Tien home">
          <span class="brand-avatar"><img src="${assets.menuIcon}" alt=""></span>
          <span>Tien Nguyen</span>
        </a>
        <button class="mobile-menu-button" type="button" aria-expanded="false" aria-controls="site-menu">
          <span class="mobile-menu-glyph" aria-hidden="true"></span>
          <span class="mobile-menu-label">Menu</span>
        </button>
        <div class="nav-links" id="site-menu" data-open="false">
          <a href="#/about" ${route.page === "about" ? `aria-current="page"` : ""}>About me</a>
          <a href="#/study-cases" ${isStudyCase ? `aria-current="page"` : ""}>Study-cases</a>
          <a href="#/gallery" ${isGallery ? `aria-current="page"` : ""}>Gallery</a>
          <a class="button button-primary button-small" href="${siteLinks.cv}" ${externalLinkAttrs} aria-label="Open Nguyen Minh Tien CV in Google Drive">My CV ${icon()}</a>
        </div>
      </nav>
    </header>
  `;
}

function footerMarkup() {
  return `
    <footer class="footer" id="contact">
      <canvas class="footer-grid" aria-hidden="true"></canvas>
      <div class="footer-content">
        <h2 class="footer-title" aria-label="Let’s build better products together.">
          <span class="footer-line"><span>Let’s&nbsp;</span><span class="typewriter-visual" aria-hidden="true" data-typewriter="footer" data-reserve="design"><span class="typewriter-word"><span class="typewriter-text"></span><span class="typewriter-cursor">|</span></span></span></span>
          <span class="footer-muted">better products together.</span>
        </h2>
        <div class="footer-contact">
          <div class="footer-details">
            <div><span>Email</span><a href="${siteLinks.email}">minhtien2772002@gmail.com</a></div>
            <div><span>Phone</span><a class="phone-link" href="${siteLinks.phone}"><span class="phone-dot" aria-hidden="true"><img src="${assets.footerVietnam}" alt=""></span>(+84)398.466.432</a></div>
          </div>
          <div class="social-block">
            <div class="social-links">
              ${footerSocialLinks.map(footerIconLink).join("")}
            </div>
            <p>© 2026 Nguyen Minh Tien</p>
          </div>
        </div>
      </div>
    </footer>
  `;
}

function profileIntroSection({ id = "about", reveal = true, showAboutButton = true } = {}) {
  return `
    <section class="section about-section" id="${id}" aria-labelledby="${id}-title" ${reveal ? "data-reveal" : ""}>
      <figure class="profile-composition" data-parallax="profile">
        <div class="profile-art">
          <div class="profile-vector layer" data-layer="profile-bg"><img src="${assets.profileVector}" alt=""></div>
          <div class="profile-photo layer" data-layer="profile-photo"><img src="${assets.profile}" alt="Nguyen Minh Tien portrait"></div>
          <div class="profile-shape layer" data-layer="profile-shape"><img src="${assets.profileShape}" alt=""></div>
          <div class="experience-badge glass-light layer" data-layer="profile-badge">Have lots of ideas in mind</div>
        </div>
        <figcaption class="profile-caption"><strong>Nguyen Minh Tien</strong><span>Product Designer</span></figcaption>
      </figure>
      <div class="about-copy">
        <h2 id="${id}-title"><span>Hello there,</span><span>How u’ doing?</span></h2>
        <div class="body-copy">
          <p>I’m a product-oriented professional with a background in UX/UI design and business analysis. I work at the intersection of user needs, business goals, and delivery constraints, turning complex problems into clear requirements, priorities, and practical product experiences.</p>
          <p>My UX background helps me understand users and usability, while business analysis has strengthened my ability to clarify workflows, manage requirements, and align stakeholders. Over time, I became increasingly interested in the broader decisions behind the interface—what should be built, why it matters, and how success should be evaluated.</p>
          <p>This naturally led me toward Product Management. I have also always had a long-term ambition to build and bring a real product of my own to market. That goal continues to shape how I approach product discovery, strategy, execution, and cross-functional collaboration: not only as a contributor, but as someone who wants to understand and take ownership of the entire product journey.</p>
        </div>
        <div class="button-row">
          ${showAboutButton ? `<a class="button button-primary" href="#/about">About me ${icon()}</a>` : ""}
          <a class="button button-secondary" href="${siteLinks.cv}" ${externalLinkAttrs} aria-label="Open Nguyen Minh Tien CV in Google Drive">My CV ${icon()}</a>
        </div>
      </div>
    </section>
  `;
}

function mottoSection() {
  return `
    <section class="section motto-section" aria-label="Product motto" data-reveal data-parallax="motto">
      ${pattern()}
      <div class="floating-photo photo-top-left" data-layer="motto-top-left"><div class="floating-photo-hover"><img src="${assets.mottoGrid}" alt=""></div></div>
      <div class="floating-photo photo-left" data-layer="motto-left"><div class="floating-photo-hover"><img src="${assets.mottoMiddle}" alt=""></div></div>
      <div class="floating-photo photo-top-right" data-layer="motto-top-right"><div class="floating-photo-hover"><img src="${assets.mottoTop}" alt=""></div></div>
      <div class="floating-photo photo-bottom-right" data-layer="motto-bottom-right"><div class="floating-photo-hover"><img src="${assets.mottoGridAlt}" alt=""></div></div>
      <p class="motto-text">I don’t start with pretty.<br>I start with making sense of the problem-<br>then make the solution look as good as it works.</p>
    </section>
  `;
}

function workSection({ reveal = true } = {}) {
  return `
    <section class="section work-section" id="works" aria-labelledby="work-title" ${reveal ? "data-reveal" : ""}>
      <div class="work-card">
        <h2 id="work-title">Learning by building</h2>
        <div class="work-list">
          ${workItems.map((item, index) => `
            <article class="work-item" data-expanded="false">
              <button id="work-button-${index}" class="work-header" type="button" aria-expanded="false" aria-controls="work-panel-${index}">
                <span class="work-meta">
                  <span class="work-main"><strong>${item[0]}</strong><span>@ <u>${item[1]}</u></span></span>
                  <span class="work-dates">${item[2]}</span>
                </span>
                <span class="chevron" aria-hidden="true">${magIcon("chevron-down")}</span>
              </button>
              <div class="work-panel" id="work-panel-${index}" role="region" aria-labelledby="work-button-${index}">
                <ul>${item[3].map((bullet) => `<li>${bullet}</li>`).join("")}</ul>
              </div>
            </article>
          `).join("")}
        </div>
        <div class="app-icon-cloud" aria-hidden="true">
          ${appIcons.map(([src, label, className]) => `<span class="app-icon-orbit ${className}" data-app-icon="${className}"><span class="app-icon"><img src="${src}" alt="${label}"></span></span>`).join("")}
        </div>
      </div>
    </section>
  `;
}

function approachSection() {
  return `
    <section class="section approach-section" aria-labelledby="approach-title" data-reveal>
      ${pattern()}
      <div class="approach-head">
        <h2 id="approach-title">My Product Approach</h2>
        <p>A structured approach to moving from ambiguity to a focused, validated product.</p>
      </div>
      <div class="approach-grid">
        ${approachCards.map(([title, body, src], index) => `
          <div class="approach-card-shell approach-card-shell-${index + 1}" style="z-index:${index + 1}">
            <div class="approach-card" data-parallax-tilt="approach">
              <img src="${src}" alt="">
              <div><h3>${title}</h3><p>${body}</p></div>
            </div>
          </div>
        `).join("")}
      </div>
    </section>
  `;
}

function caseSection() {
  return `
    <section class="section case-section" aria-labelledby="case-title" data-reveal>
      ${caseCard(studyCaseCards[0], "large")}
      <div class="case-title-block">
        <h2 id="case-title">Study Cases</h2>
        <a class="button button-secondary" href="#/study-cases">See all ${icon()}</a>
      </div>
      ${caseCard(studyCaseCards[1], "small")}
      ${caseCard(studyCaseCards[2], "wide")}
      <a class="button button-secondary case-mobile-button" href="#/study-cases">See all ${icon()}</a>
    </section>
  `;
}

function gallerySection() {
  const latestImages = latestGalleryImages(7);
  return `
    <section class="gallery-scroll" id="gallery" aria-labelledby="gallery-title">
      <div class="gallery-sticky">
        <div class="section gallery-section" data-hover="false">
          <h2 id="gallery-title">Gallery</h2>
          <div class="gallery-stage">
            ${latestImages.map((image, index) => `
              <button class="gallery-card" type="button" data-gallery-image="${index}" aria-label="Open latest gallery image ${index + 1}">
                <span class="gallery-card-inner"><img src="${image.src}" alt="" loading="lazy"></span>
              </button>
            `).join("")}
          </div>
          <a class="button button-secondary gallery-button" href="#/gallery">See all ${icon()}</a>
        </div>
      </div>
      ${latestImages.length ? galleryLightbox({ title: "Gallery", images: latestImages.map((image) => image.src) }) : ""}
    </section>
  `;
}

function renderGalleryPage() {
  return `
    <main class="gallery-page">
      <section class="gallery-folder-hero" aria-labelledby="gallery-page-title">
        <div class="gallery-folder-title-row">
          ${pattern()}
          <h1 id="gallery-page-title">Design Gallery</h1>
          <p>Selected UI explorations across web, mobile, and digital products.</p>
        </div>
      </section>
      <section class="gallery-folder-body" aria-label="Gallery albums">
        <div class="gallery-folder-grid" data-reveal>
          ${galleryAlbums.length
            ? galleryAlbums.map((album) => galleryFolderCard(album)).join("")
            : `<p class="gallery-empty">No gallery albums yet. Add images to <strong>public/gallery</strong>, then run <strong>npm run gallery:update</strong>.</p>`}
        </div>
      </section>
    </main>
  `;
}

function galleryFolderCard(album) {
  const previews = galleryAlbumImages(album).slice(0, 3);
  const slots = [
    { name: "left", image: previews[1] },
    { name: "right", image: previews[2] },
    { name: "front", image: previews[0] },
  ];
  return `
    <a class="gallery-folder-card" href="#/gallery/${encodeURIComponent(album.slug)}" aria-label="Open ${album.title} gallery">
      <span class="gallery-folder-tilt-layer parallax-tilt-layer" data-parallax-tilt="album">
        <span class="gallery-preview-stack" aria-hidden="true">
          ${slots.map((slot) => `
            <span class="gallery-preview gallery-preview-${slot.name}${slot.image ? "" : " is-placeholder"}">
              ${slot.image ? `<img src="${slot.image}" alt="" loading="lazy">` : ""}
            </span>
          `).join("")}
        </span>
        <span class="gallery-folder-title">${album.title}</span>
      </span>
    </a>
  `;
}

function renderGalleryAlbumPage(slug) {
  const album = galleryAlbums.find((item) => item.slug === slug) || galleryAlbums[0];
  if (!album) {
    return `
      <main class="gallery-album-page">
        <section class="gallery-album-hero">
          <div class="gallery-album-title-row">
            <a class="button button-secondary gallery-back-button" href="#/gallery">${icon("arrow-left")} All Works</a>
            <h1 class="gallery-album-title">Gallery</h1>
          </div>
        </section>
        <section class="gallery-album-body"><p class="gallery-empty">No gallery album data found.</p></section>
      </main>
    `;
  }
  const media = galleryAlbumMedia(album);
  return `
    <main class="gallery-album-page" data-gallery-album="${album.slug}">
      <section class="gallery-album-hero" aria-labelledby="gallery-album-title">
        <div class="gallery-album-title-row">
          <a class="button button-secondary gallery-back-button" href="#/gallery">${icon("arrow-left")} All Works</a>
          <h1 class="gallery-album-title" id="gallery-album-title">${album.title}</h1>
        </div>
      </section>
      <section class="gallery-album-body" aria-label="${album.title} media">
        ${media.length ? galleryMasonry(album, media) : `<p class="gallery-empty">This album folder is empty.</p>`}
      </section>
      ${media.length ? galleryLightbox(album, media) : ""}
    </main>
  `;
}

function galleryMasonry(album, media = galleryAlbumMedia(album)) {
  return `
    <div class="gallery-masonry" data-reveal>
      ${media.map((item, index) => {
        const patternName = galleryTilePatterns[index % galleryTilePatterns.length];
        const isVideo = item.type === "video";
        const mediaMarkup = isVideo
          ? `<video class="gallery-video-thumb" src="${item.src}" poster="${item.poster || ""}" preload="metadata" muted playsinline aria-hidden="true"></video>
             <span class="gallery-video-play-indicator" aria-hidden="true"><span></span></span>`
          : `<img src="${item.src}" alt="${item.alt || ""}" loading="lazy">`;
        return `
          <button
            class="gallery-masonry-card gallery-media-pattern-${patternName}"
            type="button"
            data-gallery-image="${index}"
            data-gallery-type="${item.type}"
            data-gallery-src="${item.src}"
            data-gallery-poster="${item.poster || ""}"
            style="--z:${index + 1};"
            aria-label="Open ${isVideo ? "video" : "image"} ${index + 1} from ${album.title}"
          >
            <span class="gallery-scroll-layer">
              <span class="gallery-tilt-layer">
                <span class="gallery-image-layer">${mediaMarkup}</span>
                <span class="gallery-light-sheen" aria-hidden="true"></span>
              </span>
            </span>
          </button>
        `;
      }).join("")}
    </div>
  `;
}

function galleryLightbox(album, media = galleryAlbumMedia(album)) {
  const firstItem = media[0] || { type: "image", src: "" };
  return `
    <div class="gallery-lightbox" data-open="false" data-active-type="${firstItem.type}" role="dialog" aria-modal="true" aria-label="${album.title} media viewer" tabindex="-1">
      <button class="gallery-lightbox-backdrop" type="button" data-gallery-close aria-label="Close media viewer"></button>
      <div class="gallery-lightbox-stage" data-gallery-stage data-media-type="${firstItem.type}">
        <img class="gallery-lightbox-image" data-gallery-active-image src="${firstItem.type === "image" ? firstItem.src : ""}" alt="">
        <video class="gallery-lightbox-video" data-gallery-active-video src="${firstItem.type === "video" ? firstItem.src : ""}" controls playsinline preload="metadata"></video>
      </div>
      <aside class="gallery-lightbox-controls" aria-label="Media viewer controls">
        <div class="gallery-control-shell gallery-close-group">
          <button type="button" class="gallery-control gallery-control-close" data-gallery-close aria-label="Close media viewer">${magIcon("close")}</button>
        </div>
        <div class="gallery-control-shell gallery-control-group">
          <div class="gallery-control-stack" aria-label="Media navigation controls">
            <button type="button" class="gallery-control" data-gallery-prev aria-label="Previous media">${magIcon("arrow-up")}</button>
            <button type="button" class="gallery-control" data-gallery-next aria-label="Next media">${magIcon("arrow-down")}</button>
          </div>
          <span class="gallery-control-separator" aria-hidden="true"></span>
          <div class="gallery-control-stack" aria-label="Image zoom controls">
            <button type="button" class="gallery-control" data-gallery-zoom-in aria-label="Zoom in">${magIcon("plus")}</button>
            <button type="button" class="gallery-control" data-gallery-zoom-out aria-label="Zoom out">${magIcon("minus")}</button>
          </div>
        </div>
      </aside>
    </div>
  `;
}

function certificatesSection() {
  const certificateMedia = (certificate) => `
    <span class="cert-image cert-image-${certificate.media || "default"}">
      <img class="cert-primary-image" src="${certificate.image}" alt="">
      ${certificate.imageSecondary ? `<img class="cert-secondary-image" src="${certificate.imageSecondary}" alt="">` : ""}
    </span>
  `;
  const certificateMeta = (certificate) => `
    <span class="cert-details">
      <h3>${certificate.title}</h3>
      <span class="cert-meta">
        ${certificate.issuer}
        ${certificate.source ? `<span class="cert-dot" aria-hidden="true"></span>${certificate.source}` : ""}
      </span>
      <strong class="cert-badge">${certificate.tag}</strong>
    </span>
  `;
  const certificateContent = (certificate) => `
    <span class="cert-media">
      ${certificateMedia(certificate)}
      <span class="cert-overlay" aria-hidden="true"></span>
      ${certificate.action || certificate.href ? `<span class="cert-action round-icon" aria-hidden="true">${icon()}</span>` : ""}
    </span>
    ${certificateMeta(certificate)}
  `;
  const certificateCard = (certificate) => {
    const cardModifier = certificate.media === "ielts" ? " cert-card-ielts" : "";
    if (certificate.action === "modal") {
      return `
        <button class="cert-card cert-card-button${cardModifier}" type="button" data-certificate-modal-open aria-label="Open ${certificate.title} certificate">
          ${certificateContent(certificate)}
        </button>
      `;
    }
    if (certificate.href) {
      return `
        <a class="cert-card${cardModifier}" href="${certificate.href}" aria-label="${certificate.title}" ${externalLinkAttrs}>
          ${certificateContent(certificate)}
        </a>
      `;
    }
    return `
      <article class="cert-card cert-card-static${cardModifier}" aria-label="${certificate.title}">
        ${certificateContent(certificate)}
      </article>
    `;
  };
  return `
    <section class="section learning-section" aria-labelledby="learning-title" data-reveal>
      <div class="learning-head">
        <h2 id="learning-title">Still ...<br>Learning</h2>
        <p>I like learning across design, product, and business — not to collect certificates, but to understand how better products actually get made.</p>
      </div>
      <div class="cert-grid">
        ${certificates.map(certificateCard).join("")}
      </div>
      ${certificateModal()}
    </section>
  `;
}

function certificateModal() {
  return `
    <div class="certificate-modal" data-certificate-modal data-open="false" role="dialog" aria-modal="true" aria-labelledby="certificate-modal-title" aria-hidden="true" tabindex="-1">
      <button class="certificate-modal-backdrop" type="button" data-certificate-modal-close aria-label="Close certificate popup"></button>
      <figure class="certificate-modal-panel">
        <button class="certificate-modal-close round-icon" type="button" data-certificate-modal-close aria-label="Close certificate popup">${magIcon("close")}</button>
        <figcaption id="certificate-modal-title">Bachelor’s Degree Certificate</figcaption>
        <img src="${assets.certFptDegree}" alt="FPT University bachelor’s degree certificate for Nguyen Minh Tien" loading="lazy">
      </figure>
    </div>
  `;
}

function skillsSection() {
  const fallback = [
    [17, 33, -37.09], [34, 156, -37.13], [279, 211, -15.11], [207, 322, 29.61],
    [39, 443, 0], [518, 119, 23.25], [380, 277, -15.21], [482, 352, -31.31],
    [675, 282, 0], [683, 110, 1.19], [834, 184, 25.26], [632, 443, 0],
  ];
  return `
    <section class="section skills-section" aria-labelledby="skills-title" data-reveal>
      <h2 id="skills-title" class="sr-only">Skills</h2>
      <div class="skills-physics" data-skills-physics>
        ${skillBadges.map((label, index) => {
          const [x, y, rotation] = fallback[index];
          return `<button class="skill-badge" type="button" data-x="${x}" data-y="${y}" data-rotation="${rotation}">${label}</button>`;
        }).join("")}
      </div>
    </section>
  `;
}

function renderHomePage() {
  return `
    <main>
      <section class="hero" id="top" aria-labelledby="hero-title">
        <p class="hero-label">Hello, I’m</p>
        <h1 id="hero-title" class="hero-title" aria-label="Nguyen Minh Tien, Product Designer">
          <span class="typewriter-visual" aria-hidden="true" data-typewriter="hero" data-reserve="Nguyen Minh Tien">
            <span class="typewriter-word"><span class="typewriter-text"></span><span class="typewriter-cursor">|</span></span>
          </span>
        </h1>
      </section>
      <div class="body-wrap">
        ${profileIntroSection()}
        ${mottoSection()}
        ${workSection()}
        ${approachSection()}
        ${caseSection()}
        ${gallerySection()}
      </div>
    </main>
  `;
}

function renderAboutPage() {
  return `
    <main class="about-page">
      <section class="about-page-hero" aria-labelledby="about-page-title">
        <p class="about-kicker">Mostly abt how I work &amp;</p>
        <h1 id="about-page-title">A little about me</h1>
      </section>
      <div class="body-wrap about-body">
        ${profileIntroSection({ id: "about-profile", showAboutButton: false })}
        ${mottoSection()}
        ${workSection()}
        ${certificatesSection()}
        ${skillsSection()}
      </div>
    </main>
  `;
}

function renderStudyCaseListPage() {
  return `
    <main class="study-list-page">
      ${studyHero({ label: "Selected work,", title: "Beyond the screens" })}
      <div class="study-body">
        <section class="study-list-grid" aria-label="Study cases" data-reveal>
          ${studyCaseCards.map((card) => studyListingCard(card)).join("")}
        </section>
      </div>
    </main>
  `;
}

function renderStudyCaseDetailPage(slug) {
  const detail = studyCaseDetails[slug] || studyCaseDetails["habit-tracker-app"];
  const next = studyCaseDetails[detail.next];
  const pageSlug = slug in studyCaseDetails ? slug : "habit-tracker-app";
  return `
    <main class="study-detail-page study-detail-page--${pageSlug}">
      ${studyHero({ label: detail.label, title: detail.title, subtitle: detail.subtitle })}
      <div class="study-body study-detail-body">
        <div class="study-detail-wrapper">
          ${studyCaseToc(detail)}
          <article class="study-article" aria-label="${detail.title} study case">
            ${detail.sections.map((section) => studySection(section)).join("")}
            <nav class="study-next" aria-label="Study case navigation" data-reveal>
              <a class="button button-secondary" href="#/study-cases">Back to Study Cases ${icon()}</a>
              ${next ? `<a class="button button-primary" href="#/study-cases/${detail.next}">Next: ${next.title} ${icon()}</a>` : ""}
            </nav>
          </article>
        </div>
      </div>
    </main>
  `;
}

function render() {
  const route = getRoute();
  const pageMarkup = route.page === "about"
    ? renderAboutPage()
    : route.page === "study-list"
      ? renderStudyCaseListPage()
      : route.page === "study-detail"
        ? renderStudyCaseDetailPage(route.slug)
        : route.page === "gallery-list"
          ? renderGalleryPage()
          : route.page === "gallery-detail"
            ? renderGalleryAlbumPage(route.slug)
            : renderHomePage();
  document.querySelector("#root").innerHTML = `
    ${headerMarkup()}
    ${pageMarkup}
    ${footerMarkup()}
  `;
  document.body.dataset.page = route.page;
}

function caseCard(card, size) {
  return `
    <a class="case-card case-${size}" href="${card.href}" aria-label="${card.title}, ${card.meta}">
      <span class="case-card-tilt-layer parallax-tilt-layer" data-parallax-tilt="project">
        <span class="case-image"><img src="${card.image}" alt="" loading="lazy"></span>
        <span class="case-info">
          <span><strong>${card.title}</strong><span>${card.meta}</span></span>
          <span class="round-icon" aria-hidden="true">${icon()}</span>
        </span>
      </span>
    </a>
  `;
}

function studyHero({ label, title, subtitle = "" }) {
  return `
    <section class="study-hero" aria-labelledby="study-page-title">
      <p>${label}</p>
      <h1 id="study-page-title">${title}</h1>
      ${subtitle ? `<span>${subtitle}</span>` : ""}
    </section>
  `;
}

function studyListingCard(card) {
  return `
    <a class="study-list-card" href="${card.href}" aria-label="${card.title}, ${card.meta}">
      <span class="study-list-tilt-layer parallax-tilt-layer" data-parallax-tilt="project">
        <span class="study-list-image"><img src="${card.image}" alt="" loading="lazy"></span>
        <span class="study-list-info">
          <span><strong>${card.title}</strong><small>${card.meta}</small></span>
          <span class="round-icon" aria-hidden="true">${icon()}</span>
        </span>
      </span>
    </a>
  `;
}

function studyCaseToc(detail) {
  return `
    <nav class="study-toc" aria-label="${detail.title} table of contents" data-reveal>
      <a class="study-back-link" href="#/study-cases">${icon("arrow-left")}<span>All cases</span></a>
      <span class="study-toc-divider" aria-hidden="true"></span>
      <span class="study-toc-fade" aria-hidden="true"></span>
      <div class="study-toc-scroll">
        ${detail.sections.map((section, index) => `
          <a class="study-toc-link${index === 0 ? " is-active" : ""}" href="#${section.id}" data-toc-link="${section.id}">
            <span aria-hidden="true"></span>${section.title}
          </a>
        `).join("")}
      </div>
    </nav>
  `;
}

function studySection(section) {
  return `
    <section class="study-case-section" id="${section.id}" aria-labelledby="${section.id}-title" data-study-section="${section.id}" data-reveal>
      <h2 id="${section.id}-title">${section.title}</h2>
      ${section.intro ? `<p class="study-section-intro">${section.intro}</p>` : ""}
      ${section.blocks.map((block) => studyBlock(block)).join("")}
    </section>
  `;
}

function studyAssetIcon(name) {
  return `<img class="study-case-icon study-case-icon-${name}" src="${asset(`study-case-icons/study-case-icon-${name}.png`)}" alt="" aria-hidden="true">`;
}

function studyBlockIcon(label = "") {
  const key = label.toLowerCase();
  const exactIconMap = {
    needs: "check",
    "pain points": "notification",
    sdgs: "search",
    "product life cycle": "star",
    freecycling: "search",
    "environmental effects": "star",
    "community impact": "search",
    "behavior change": "star",
    "hook model": "search",
    "market research": "star",
    "user research": "search",
    "competitor research": "star",
    "sdg 12": "check",
    community: "check",
    relevance: "check",
    empathize: "check",
    define: "task",
    ideate: "check",
    prototype: "task",
    test: "check",
    "textbook changes affect reuse": "grid",
    "uniform reuse depends on rules": "home",
    "informal exchange already exists": "employee",
    "item posting": "task",
    "item discovery": "search",
    "structured item details": "grid",
    "exchange request": "notification",
    "community-based reuse": "employee",
    "clear item information": "check",
    "condition transparency": "star",
    "community context": "employee",
    "lower-friction giving": "task",
    "first usability testing": "check",
    "second information architecture": "settings",
    "second prototype": "check",
    "user interface design": "settings",
    "heuristic evaluation": "check",
    "design finalization": "settings",
    simulation: "check",
  };
  if (exactIconMap[key]) return studyAssetIcon(exactIconMap[key]);
  if (/(date|timeline|schedule)/.test(key)) return studyAssetIcon("schedule");
  if (/(role|stakeholder|client|persona|user)/.test(key)) return studyAssetIcon("employee");
  if (/(context|platform|app|website|home|navigation)/.test(key)) return studyAssetIcon("home");
  if (/(scope|task|workflow|flow|journey|wireframe|roadmap)/.test(key)) return studyAssetIcon("task");
  if (/(research|method|competitor|screen|solution|grid|architecture|design system)/.test(key)) return studyAssetIcon("grid");
  if (/(progress|metric|chart|measure|retention|completion|rate|performance)/.test(key)) return studyAssetIcon("line-chart");
  if (/(impact|outcome|goal|target|expected|business)/.test(key)) return studyAssetIcon("business-target");
  if (/(motivation|achievement|reward|success|trust|quality)/.test(key)) return studyAssetIcon("star");
  if (/(notification|reminder|alert)/.test(key)) return studyAssetIcon("notification");
  if (/(setting|personalization|preference|profile)/.test(key)) return studyAssetIcon("settings");
  if (/(search|discovery|recommendation|discover)/.test(key)) return studyAssetIcon("search");
  if (/(community|communication|feedback|support|share)/.test(key)) return studyAssetIcon("chat");
  if (/(project|briefcase|format)/.test(key)) return studyAssetIcon("briefcase");
  if (/(validation|test|trophy)/.test(key)) return studyAssetIcon("trophy");
  return studyAssetIcon("idea");
}

function studyBlock(block) {
  const renderCard = ([title, body]) => `
    <article class="study-info-card">
      <span class="study-card-icon" aria-hidden="true">${studyBlockIcon(title)}</span>
      <h3>${title}</h3>
      ${body ? `<p>${String(body).split("\n").join("<br>")}</p>` : ""}
    </article>
  `;
  if (block.type === "meta") {
    return `<div class="study-meta-card">${block.rows.map(([label, value]) => `
      <div class="study-meta-row">
        <span class="study-card-icon" aria-hidden="true">${studyBlockIcon(label)}</span>
        <span><small>${label}</small><strong>${value}</strong></span>
      </div>
    `).join("")}</div>`;
  }
  if (block.type === "metrics") {
    return `<div class="study-metric-grid">${block.items.map((item) => `
      <article class="study-metric-card">
        <small>${item[0]}</small>
        <strong>${item[1]}</strong>
        ${item[2] ? `<p>${item[2]}</p>` : ""}
      </article>
    `).join("")}</div>`;
  }
  if (block.type === "cards") {
    return `<div class="study-card-grid study-card-grid-${block.columns || 2}">${block.items.map(renderCard).join("")}</div>`;
  }
  if (block.type === "image") {
    const classes = ["study-image-block", block.fit === "contain" ? "study-image-contain" : ""].filter(Boolean).join(" ");
    const styleVars = [
      block.maxWidth ? `--study-image-max: ${block.maxWidth}px` : "",
      block.ratio ? `--study-image-ratio: ${block.ratio}` : "",
    ].filter(Boolean).join("; ");
    const style = styleVars ? ` style="${styleVars}"` : "";
    return `<figure class="${classes}"${style}><img src="${block.src}" alt="${block.alt || ""}" loading="lazy">${block.caption ? `<figcaption>${block.caption}</figcaption>` : ""}</figure>`;
  }
  if (block.type === "imageGrid") {
    return `<div class="study-image-grid">${block.images.map(([src, alt]) => `<figure class="study-image-block"><img src="${src}" alt="${alt}" loading="lazy"></figure>`).join("")}</div>`;
  }
  if (block.type === "flow") {
    return `<div class="study-flow-row">${block.items.map((item) => `<article><span>${item}</span></article>`).join("")}</div>`;
  }
  if (block.type === "highlight") {
    return `<aside class="study-highlight"><blockquote>${block.quote}</blockquote><p>${block.label}</p></aside>`;
  }
  if (block.type === "formula") {
    return `<div class="study-formula">${block.items.map(([label, value]) => `<article><small>${label}</small><strong>${value}</strong></article>`).join("")}</div>`;
  }
  if (block.type === "persona") {
    return `<article class="study-persona-card"><h3>${block.name}</h3><p>${block.meta}</p>${studyChips(block.chips)}</article>`;
  }
  if (block.type === "chipCard") {
    return `<article class="study-chip-card"><h3>${block.title}</h3>${studyChips(block.items)}</article>`;
  }
  if (block.type === "chips") return studyChips(block.items);
  if (block.type === "list") {
    return `<div class="study-takeaways">${block.items.map((item) => `<p><span class="study-card-icon" aria-hidden="true">${studyAssetIcon("check")}</span>${item}</p>`).join("")}</div>`;
  }
  if (block.type === "paragraph") return `<p class="study-body-copy">${block.text}</p>`;
  if (block.type === "table") {
    return `<div class="study-table-wrap"><table class="study-table">
      <thead><tr>${block.headers.map((header) => `<th>${header}</th>`).join("")}</tr></thead>
      <tbody>${block.rows.map((row) => `<tr>${row.map((cell) => `<td>${cell}</td>`).join("")}</tr>`).join("")}</tbody>
    </table></div>`;
  }
  if (block.type === "note") {
    return `<aside class="study-note"><h3>${block.title}</h3>${block.items.map((item) => `<p>${item}</p>`).join("")}</aside>`;
  }
  return "";
}

function studyChips(items) {
  return `<div class="study-chip-row">${items.map((item) => `<span>${item}</span>`).join("")}</div>`;
}

function initMenu() {
  const button = document.querySelector(".mobile-menu-button");
  const menu = document.querySelector(".nav-links");
  const header = document.querySelector(".site-header");
  const overlay = document.querySelector(".mobile-menu-overlay");
  if (!button || !menu || !header) return;

  const setOpen = (open) => {
    button.setAttribute("aria-expanded", String(open));
    menu.dataset.open = String(open);
    document.body.classList.toggle("is-mobile-menu-open", open);
    overlay?.setAttribute("aria-hidden", String(!open));
    const label = button.querySelector(".mobile-menu-label");
    if (label) label.textContent = open ? "Close" : "Menu";
  };

  button.addEventListener("click", () => {
    setOpen(button.getAttribute("aria-expanded") !== "true");
  });
  menu?.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      setOpen(false);
    });
  });
  document.addEventListener("click", (event) => {
    if (button.getAttribute("aria-expanded") !== "true") return;
    if (header.contains(event.target)) return;
    setOpen(false);
  });
  overlay?.addEventListener("click", () => {
    setOpen(false);
  });
  document.addEventListener("keydown", (event) => {
    if (event.key !== "Escape" || button.getAttribute("aria-expanded") !== "true") return;
    setOpen(false);
    button.focus({ preventScroll: true });
  });
  addCleanup(() => {
    document.body.classList.remove("is-mobile-menu-open");
  });
}

function typewriter(element, options) {
  if (!element) return;
  const word = element.querySelector(".typewriter-text");
  const cursor = element.querySelector(".typewriter-cursor");
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (element.dataset.typewriter !== "hero") {
    element.style.minWidth = `calc(${element.dataset.reserve.length}ch + 0.24em)`;
  }
  if (reduce) {
    word.textContent = options.words[0];
    cursor.hidden = true;
    return;
  }

  let wordIndex = 0;
  let charIndex = 0;
  let deleting = false;
  let timer = 0;
  let paused = document.hidden;
  const schedule = (delay) => {
    window.clearTimeout(timer);
    timer = window.setTimeout(tick, delay);
  };
  const jitter = (base) => Math.max(20, base + Math.round((Math.random() * 2 - 1) * (options.jitter || 0)));
  const tick = () => {
    if (paused) return;
    const current = options.words[wordIndex];
    if (!deleting) {
      charIndex += 1;
      word.textContent = current.slice(0, charIndex);
      if (charIndex >= current.length) {
        deleting = true;
        schedule(options.holdDuration);
      } else {
        schedule(jitter(options.typingSpeed));
      }
      return;
    }
    charIndex -= 1;
    word.textContent = current.slice(0, Math.max(0, charIndex));
    if (charIndex <= 0) {
      deleting = false;
      wordIndex = (wordIndex + 1) % options.words.length;
      schedule(options.pauseDuration);
    } else {
      schedule(options.deletingSpeed);
    }
  };

  const onVisibilityChange = () => {
    paused = document.hidden;
    window.clearTimeout(timer);
    if (!paused) schedule(options.typingSpeed);
  };
  document.addEventListener("visibilitychange", onVisibilityChange);
  schedule(options.initialDelay || 0);
  addCleanup(() => {
    paused = true;
    window.clearTimeout(timer);
    document.removeEventListener("visibilitychange", onVisibilityChange);
  });
}

function initTypewriters() {
  typewriter(document.querySelector('[data-typewriter="hero"]'), {
    words: ["Nguyen Minh Tien", "Product Designer", "Product Builder"],
    typingSpeed: 90,
    deletingSpeed: 45,
    holdDuration: 1800,
    pauseDuration: 350,
    jitter: 15,
  });
  typewriter(document.querySelector('[data-typewriter="footer"]'), {
    words: ["build", "design", "shape", "craft", "launch", "scale"],
    typingSpeed: 82,
    deletingSpeed: 46,
    holdDuration: 1200,
    pauseDuration: 220,
    initialDelay: 300,
    jitter: 10,
  });
}

const clamp = (value, min = 0, max = 1) => Math.min(max, Math.max(min, value));
const mix = (from, to, progress) => from + (to - from) * progress;

function initReveal() {
  const elements = Array.from(document.querySelectorAll("[data-reveal]"));
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    elements.forEach((element) => element.classList.add("is-revealed"));
    return;
  }
  const revealIfVisible = (element) => {
    const rect = element.getBoundingClientRect();
    const visible = rect.top < window.innerHeight && rect.bottom > 0;
    if (!visible) return false;
    element.classList.add("is-revealed");
    return true;
  };
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-revealed");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08, rootMargin: "0px 0px -8% 0px" });
  elements.forEach((element) => {
    observer.observe(element);
    window.requestAnimationFrame(() => {
      if (revealIfVisible(element)) observer.unobserve(element);
    });
  });
  addCleanup(() => observer.disconnect());
}

function initScrollBlurReveal() {
  const selectors = [
    ".hero-label",
    ".hero-title",
    ".about-page-hero .about-kicker",
    ".about-page-hero h1",
    ".about-page-intro",
    ".about-copy h2",
    ".body-copy p",
    ".button-row .button",
    ".motto-text",
    ".work-card h2",
    ".work-item",
    ".approach-head",
    ".approach-card-shell",
    ".case-title-block",
    ".case-card",
    ".study-hero p",
    ".study-hero h1",
    ".study-hero span",
    ".study-list-card",
    ".study-toc",
    ".study-case-section h2",
    ".study-section-intro",
    ".study-info-card",
    ".study-metric-card",
    ".study-chip-card",
    ".study-flow-row",
    ".study-image-block",
    ".study-highlight",
    ".study-persona-card",
    ".study-table-wrap",
    ".study-note",
    ".study-next",
    ".gallery-folder-hero h1",
    ".gallery-folder-hero p",
    ".gallery-folder-card",
    ".gallery-album-hero h1",
    ".gallery-back-button",
    ".gallery-masonry-card",
    ".gallery-button",
    ".learning-head",
    ".cert-card",
    ".skills-section",
    ".footer-title",
    ".footer-details",
    ".social-block",
  ];
  const elements = Array.from(document.querySelectorAll(selectors.join(",")))
    .filter((element) => !element.closest(".typewriter-visual") && !element.closest(".skills-physics"));

  if (!elements.length) return;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    elements.forEach((element) => element.classList.add("is-blur-revealed"));
    return;
  }

  const revealIfVisible = (element) => {
    const rect = element.getBoundingClientRect();
    const visible = rect.top < window.innerHeight && rect.bottom > 0;
    if (!visible) return false;
    element.classList.add("is-blur-revealed");
    return true;
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("is-blur-revealed");
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.08, rootMargin: "0px 0px -8% 0px" });

  const approachElements = Array.from(document.querySelectorAll(".approach-card-shell"));
  const galleryImageElements = Array.from(document.querySelectorAll(".gallery-masonry-card"));

  elements.forEach((element, index) => {
    element.classList.add("blur-reveal");
    const approachIndex = approachElements.indexOf(element);
    const galleryImageIndex = galleryImageElements.indexOf(element);
    element.style.setProperty("--blur-delay", `${
      approachIndex >= 0
        ? approachIndex * 80
        : galleryImageIndex >= 0
          ? galleryImageIndex * 75
          : Math.min(index % 8, 7) * 55
    }ms`);
    observer.observe(element);
    window.requestAnimationFrame(() => {
      if (revealIfVisible(element)) observer.unobserve(element);
    });
  });
  addCleanup(() => observer.disconnect());
}

function initParallax(section, specs) {
  if (!section || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  const source = section.closest(".about-section, .motto-section") || section;
  let frame = 0;
  let current = 0;
  const update = () => {
    frame = 0;
    const rect = source.getBoundingClientRect();
    const target = clamp((window.innerHeight - rect.top) / (window.innerHeight + rect.height));
    current += (target - current) * 0.18;
    const profileMobile = section.matches('[data-parallax="profile"]') && window.innerWidth <= 720;
    const small = profileMobile ? 1 : window.innerWidth < 768 ? 0.55 : window.innerWidth < 1024 ? 0.7 : 1;
    specs.forEach((spec) => {
      const node = section.querySelector(`[data-layer="${spec.name}"]`);
      if (!node) return;
      const x = mix(spec.fromX, spec.toX, current) * small;
      const y = mix(spec.fromY, spec.toY, current) * small;
      const rotate = spec.baseRotate + mix(spec.fromRotate, spec.toRotate, current) * small;
      node.style.transform = `translate3d(${x}px, ${y}px, 0) rotate(${rotate}deg)`;
    });
  };
  const request = () => {
    if (!frame) frame = window.requestAnimationFrame(update);
  };
  update();
  window.addEventListener("scroll", request, { passive: true });
  window.addEventListener("resize", request);
  addCleanup(() => {
    window.removeEventListener("scroll", request);
    window.removeEventListener("resize", request);
    if (frame) window.cancelAnimationFrame(frame);
  });
}

function initParallaxSections() {
  initParallax(document.querySelector('[data-parallax="profile"]'), [
    ["profile-bg", 0, -10, 8, 28, -34, -2, 2.5],
    ["profile-photo", -2.9, 5, -5, 18, -24, 1.2, -1.8],
    ["profile-shape", 0, 12, -10, 30, -42, 2.5, -3],
    ["profile-badge", 1.16, -8, 9, 24, -36, -1.2, 1.4],
  ].map(([name, baseRotate, fromX, toX, fromY, toY, fromRotate, toRotate]) => ({
    name, baseRotate, fromX, toX, fromY, toY, fromRotate, toRotate,
  })));

  initParallax(document.querySelector('[data-parallax="motto"]'), [
    ["motto-top-left", -6.44, -2, 3, 8, -12, -1, 0.8],
    ["motto-left", -6.44, -4, 5, 14, -18, -2, 1],
    ["motto-top-right", 12.16, 4, -4, 10, -16, 2, -0.8],
    ["motto-bottom-right", 2.97, 3, -5, 18, -22, 1, -1.5],
  ].map(([name, baseRotate, fromX, toX, fromY, toY, fromRotate, toRotate]) => ({
    name, baseRotate, fromX, toX, fromY, toY, fromRotate, toRotate,
  })));
}

function initAccordions() {
  document.querySelectorAll(".work-header").forEach((button) => {
    const initialPanel = document.getElementById(button.getAttribute("aria-controls"));
    const initialItem = button.closest(".work-item");
    if (initialPanel && initialItem) {
      const expanded = button.getAttribute("aria-expanded") === "true";
      initialItem.dataset.expanded = String(expanded);
      initialPanel.style.height = expanded ? "auto" : "0px";
      initialPanel.style.overflow = expanded ? "visible" : "hidden";
    }
    button.addEventListener("click", () => {
      const expanded = button.getAttribute("aria-expanded") === "true";
      const panel = document.getElementById(button.getAttribute("aria-controls"));
      const item = button.closest(".work-item");
      button.setAttribute("aria-expanded", String(!expanded));
      if (!panel || !item) return;
      item.dataset.expanded = String(!expanded);
      if (expanded) {
        panel.style.overflow = "hidden";
        panel.style.height = `${panel.scrollHeight}px`;
        panel.offsetHeight;
        panel.style.height = "0px";
      } else {
        panel.style.overflow = "hidden";
        panel.style.height = `${panel.scrollHeight}px`;
      }
      const onTransitionEnd = (event) => {
        if (event.propertyName !== "height") return;
        panel.removeEventListener("transitionend", onTransitionEnd);
        if (button.getAttribute("aria-expanded") === "true") {
          panel.style.height = "auto";
          panel.style.overflow = "visible";
        }
      };
      panel.addEventListener("transitionend", onTransitionEnd);
    });
  });
  window.addEventListener("resize", () => {
    document.querySelectorAll('.work-item[data-expanded="true"] .work-panel').forEach((panel) => {
      panel.style.height = "auto";
      panel.style.overflow = "visible";
    });
  });
}

function initAppIcons() {
  const section = document.querySelector(".work-card");
  const icons = Array.from(document.querySelectorAll(".app-icon-orbit"));
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (icons.length && reducedMotion) {
    icons.forEach((icon) => {
      icon.style.transform = "";
    });
  }
  if (!section || !icons.length || reducedMotion) return;

  const specs = [
    [-14, 14, 42, -60, 1.3], [-24, 20, 48, -42, -1.1], [-18, -14, 36, -52, 1.2],
    [16, -16, 44, -56, -0.9], [24, -20, 62, -74, 1.5], [-14, 22, 40, -44, -1.3],
    [20, 18, 50, -64, 1], [28, -14, 36, -58, -1.2], [-22, -18, 44, -60, 1.3],
    [26, 18, 48, -68, -1.5], [-18, 22, 40, -54, 1.1],
  ];

  let frame = 0;
  let current = 0;
  const update = () => {
    frame = 0;
    const rect = section.getBoundingClientRect();
    const target = clamp((window.innerHeight - rect.top) / (window.innerHeight + rect.height));
    current += (target - current) * 0.16;
    const mobileGrid = window.innerWidth <= 720;
    const small = mobileGrid ? 0.18 : window.innerWidth < 768 ? 0.45 : window.innerWidth < 1024 ? 0.65 : 1;
    icons.forEach((icon, index) => {
      const [fromX, toX, fromY, toY, rot] = specs[index];
      const x = mobileGrid ? 0 : mix(fromX, toX, current) * small;
      const y = mobileGrid
        ? mix(8, -10, current) + ((index % 3) - 1) * 2
        : mix(fromY, toY, current) * small;
      const r = mobileGrid ? 0 : mix(-rot, rot, current) * small;
      icon.style.transform = mobileGrid
        ? `translate3d(${x}px, ${y}px, 0) rotate(0deg)`
        : `translate3d(${x}px, ${y}px, 0) rotate(calc(var(--base-rotate) + ${r}deg))`;
    });
  };
  const request = () => {
    if (!frame) frame = window.requestAnimationFrame(update);
  };
  update();
  window.addEventListener("scroll", request, { passive: true });
  window.addEventListener("resize", request);
  addCleanup(() => {
    window.removeEventListener("scroll", request);
    window.removeEventListener("resize", request);
    if (frame) window.cancelAnimationFrame(frame);
  });
}

function initParallaxTiltCards() {
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const canHover = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
  const mobileLayout = window.matchMedia("(max-width: 720px)").matches;
  if (reduce || !canHover || mobileLayout) return;

  const tiltProfiles = {
    approach: { maxAngleX: 5, maxAngleY: 5, scale: 1.015, perspective: 1000 },
    project: { maxAngleX: 4, maxAngleY: 4, scale: 1.018, perspective: 1000 },
    album: { maxAngleX: 4, maxAngleY: 4, scale: 1.02, perspective: 1000 },
  };

  const entries = [
    ...Array.from(document.querySelectorAll(".approach-card")).map((element) => ({
      root: element,
      target: element,
      profile: tiltProfiles.approach,
    })),
    ...Array.from(document.querySelectorAll(".case-card, .study-list-card")).map((element) => ({
      root: element,
      target: element.querySelector(".parallax-tilt-layer") || element,
      profile: tiltProfiles.project,
    })),
    ...Array.from(document.querySelectorAll(".gallery-folder-card")).map((element) => ({
      root: element,
      target: element.querySelector(".parallax-tilt-layer") || element,
      profile: tiltProfiles.album,
    })),
  ].filter(({ target }) => target);

  entries.forEach(({ root, target, profile }, index) => {
    const state = {
      active: false,
      frame: 0,
      x: 0,
      y: 0,
      scale: 1,
      targetX: 0,
      targetY: 0,
      targetScale: 1,
    };

    const render = () => {
      state.frame = 0;
      state.x += (state.targetX - state.x) * 0.22;
      state.y += (state.targetY - state.y) * 0.22;
      state.scale += (state.targetScale - state.scale) * 0.22;
      target.style.setProperty("--tilt-x", `${state.x.toFixed(3)}deg`);
      target.style.setProperty("--tilt-y", `${state.y.toFixed(3)}deg`);
      target.style.setProperty("--tilt-scale", state.scale.toFixed(4));
      target.style.setProperty("--tilt-perspective", `${profile.perspective}px`);
      if (state.active || Math.abs(state.x) > 0.01 || Math.abs(state.y) > 0.01 || Math.abs(state.scale - 1) > 0.001) {
        state.frame = window.requestAnimationFrame(render);
      } else {
        root.classList.remove("is-parallax-tilting", "is-tilting");
        target.classList.remove("is-parallax-tilting", "is-tilting");
        root.style.zIndex = "";
      }
    };

    const request = () => {
      if (!state.frame) state.frame = window.requestAnimationFrame(render);
    };

    const handleEnter = (event) => {
      if (event.pointerType === "touch") return;
      state.active = true;
      state.targetScale = profile.scale;
      root.classList.add("is-parallax-tilting", "is-tilting");
      target.classList.add("is-parallax-tilting", "is-tilting");
      root.style.zIndex = String(20 + index);
      request();
    };

    const handleMove = (event) => {
      if (event.pointerType === "touch") return;
      const rect = root.getBoundingClientRect();
      const x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      const y = ((event.clientY - rect.top) / rect.height) * 2 - 1;
      state.targetY = clamp(x, -1, 1) * profile.maxAngleY;
      state.targetX = clamp(y, -1, 1) * -profile.maxAngleX;
      state.targetScale = profile.scale;
      request();
    };

    const handleLeave = () => {
      state.active = false;
      state.targetX = 0;
      state.targetY = 0;
      state.targetScale = 1;
      request();
    };

    root.addEventListener("pointerenter", handleEnter);
    root.addEventListener("pointermove", handleMove);
    root.addEventListener("pointerleave", handleLeave);

    const handleFocusIn = () => {
      state.active = true;
      state.targetX = -1.5;
      state.targetY = 1.5;
      state.targetScale = 1.01;
      request();
    };

    root.addEventListener("focusin", handleFocusIn);
    root.addEventListener("focusout", handleLeave);

    addCleanup(() => {
      root.removeEventListener("pointerenter", handleEnter);
      root.removeEventListener("pointermove", handleMove);
      root.removeEventListener("pointerleave", handleLeave);
      root.removeEventListener("focusin", handleFocusIn);
      root.removeEventListener("focusout", handleLeave);
      if (state.frame) window.cancelAnimationFrame(state.frame);
    });
  });
}

function initBlueReveal() {
  const items = Array.from(document.querySelectorAll("[data-blue-reveal]"));
  if (!items.length) return;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    items.forEach((item) => item.classList.add("is-blue-revealed"));
    return;
  }
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("is-blue-revealed");
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.4, rootMargin: "0px 0px -8% 0px" });
  items.forEach((item, index) => {
    item.style.setProperty("--blue-delay", `${index * 65}ms`);
    observer.observe(item);
  });
}

function initFooterGrid() {
  const footer = document.querySelector(".footer");
  const canvas = document.querySelector(".footer-grid");
  if (!footer || !canvas) return;
  const ctx = canvas.getContext("2d");
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  let dots = [];
  let width = 0;
  let height = 0;
  let pointer = null;
  let frame = 0;
  let start = performance.now();

  const build = () => {
    if (frame) {
      window.cancelAnimationFrame(frame);
      frame = 0;
    }
    const rect = footer.getBoundingClientRect();
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    width = Math.max(1, Math.round(rect.width));
    height = Math.max(1, Math.round(rect.height));
    canvas.width = Math.round(width * dpr);
    canvas.height = Math.round(height * dpr);
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    const spacing = window.innerWidth < 720 ? 24 : 20;
    dots = [];
    for (let y = spacing; y < height; y += spacing) {
      for (let x = spacing; x < width; x += spacing) {
        dots.push({ x, y, cx: x, cy: y, hue: 190 + (x / Math.max(width, 1)) * 120 + (y / Math.max(height, 1)) * 40 });
      }
    }
    draw(performance.now());
  };

  const draw = (now = performance.now()) => {
    frame = 0;
    ctx.clearRect(0, 0, width, height);
    const radius = window.innerWidth < 900 ? 120 : 160;
    const max = window.innerWidth < 900 ? 14 : 22;
    const phase = reduce ? 0 : ((now - start) % 14000) / 14000;
    dots.forEach((dot) => {
      let tx = dot.x;
      let ty = dot.y;
      if (pointer && !reduce) {
        const dx = dot.x - pointer.x;
        const dy = dot.y - pointer.y;
        const distance = Math.hypot(dx, dy);
        if (distance < radius && distance > 0.01) {
          const force = (1 - distance / radius) * max;
          tx += (dx / distance) * force;
          ty += (dy / distance) * force;
        }
      }
      dot.cx += (tx - dot.cx) * (reduce ? 1 : 0.1);
      dot.cy += (ty - dot.cy) * (reduce ? 1 : 0.1);
      const hue = dot.hue + phase * 360 + Math.sin((dot.x / Math.max(width, 1)) * Math.PI * 2 + phase * Math.PI * 2) * 28;
      const lightness = 68 + Math.sin((dot.y / Math.max(height, 1)) * Math.PI * 2 + phase * Math.PI * 2) * 7;
      ctx.beginPath();
      ctx.fillStyle = `hsla(${hue}, 85%, ${lightness}%, 0.48)`;
      ctx.arc(dot.cx, dot.cy, window.innerWidth < 720 ? 1.65 : 2, 0, Math.PI * 2);
      ctx.fill();
    });
    if (!reduce) frame = window.requestAnimationFrame(draw);
  };

  const request = () => {
    if (!frame) frame = window.requestAnimationFrame(draw);
  };

  const onPointerMove = (event) => {
    if (event.pointerType === "touch") return;
    const rect = footer.getBoundingClientRect();
    pointer = { x: event.clientX - rect.left, y: event.clientY - rect.top };
    request();
  };
  const onPointerLeave = () => {
    pointer = null;
    request();
  };
  footer.addEventListener("pointermove", onPointerMove);
  footer.addEventListener("pointerleave", onPointerLeave);
  window.addEventListener("resize", build);
  build();
  if (!reduce && !frame) frame = window.requestAnimationFrame(draw);
  addCleanup(() => {
    footer.removeEventListener("pointermove", onPointerMove);
    footer.removeEventListener("pointerleave", onPointerLeave);
    window.removeEventListener("resize", build);
    if (frame) window.cancelAnimationFrame(frame);
  });
}

function initSkillPhysics() {
  const stage = document.querySelector("[data-skills-physics]");
  if (!stage) return;
  const badges = Array.from(stage.querySelectorAll(".skill-badge"));
  if (!badges.length) return;

  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  const mobileSkills = () => window.matchMedia("(max-width: 720px)").matches;
  const loadMatter = () => {
    if (window.Matter) return Promise.resolve(window.Matter);
    return new Promise((resolve, reject) => {
      const existing = Array.from(document.scripts).find((script) => script.src.endsWith("/public/vendor/matter.min.js"));
      const timeout = window.setTimeout(() => reject(new Error("Matter.js did not initialize.")), 5000);
      const done = (script) => {
        window.clearTimeout(timeout);
        if (!window.Matter) {
          reject(new Error("Matter.js loaded without exposing window.Matter."));
          return;
        }
        script.dataset.loaded = "true";
        delete script.dataset.loading;
        resolve(window.Matter);
      };

      if (existing?.dataset.loaded === "true") {
        done(existing);
        return;
      }

      const script = existing || document.createElement("script");
      if (!existing) {
        script.src = matterScriptSrc;
        script.async = true;
        document.head.appendChild(script);
      }
      script.dataset.loading = "true";
      script.addEventListener("load", () => done(script), { once: true });
      script.addEventListener("error", () => {
        window.clearTimeout(timeout);
        reject(new Error("Matter.js failed to load."));
      }, { once: true });
    });
  };

  let disposed = false;
  let active = false;
  let started = false;
  let engine = null;
  let runner = null;
  let runnerActive = false;
  let entries = [];
  let walls = [];
  let observer = null;
  let resizeObserver = null;
  let settleTimer = 0;
  let resizeTimer = 0;
  let drag = null;
  let dragConstraint = null;
  const spawnTimers = [];
  const pointerCleanups = [];

  const clearTimers = () => {
    spawnTimers.splice(0).forEach((timer) => window.clearTimeout(timer));
    window.clearTimeout(settleTimer);
    window.clearTimeout(resizeTimer);
  };

  const resetBadges = (mode = "static") => {
    stage.dataset.physicsMode = mode;
    stage.classList.remove("is-physics-running");
    if (mode === "mobile") {
      stage.style.height = "";
      stage.classList.add("is-physics-running");
      badges.forEach((badge, index) => {
        badge.classList.remove("is-dragging");
        badge.style.opacity = "1";
        badge.style.transform = "none";
        badge.style.zIndex = "";
        badge.style.setProperty("--skill-index", String(index));
      });
      return;
    }
    const width = Math.max(stage.clientWidth, 1);
    const scale = Math.min(1, Math.max(0.34, width / 1152));
    const compact = width < 700;
    let cursorX = 0;
    let cursorY = 0;
    let rowHeight = 0;
    let neededHeight = stage.clientHeight;
    if (!compact) stage.style.height = "";
    badges.forEach((badge) => {
      badge.classList.remove("is-dragging");
      badge.style.opacity = "1";
      badge.style.transform = "none";
      badge.style.zIndex = "";
      const rect = badge.getBoundingClientRect();
      let x = Number(badge.dataset.x) * scale;
      let y = Number(badge.dataset.y) * scale;
      let rotation = Number(badge.dataset.rotation) || 0;
      if (compact) {
        const gap = 10;
        if (cursorX > 0 && cursorX + rect.width > width) {
          cursorX = 0;
          cursorY += rowHeight + gap;
          rowHeight = 0;
        }
        x = cursorX;
        y = cursorY;
        rotation = 0;
        cursorX += rect.width + gap;
        rowHeight = Math.max(rowHeight, rect.height);
        neededHeight = Math.max(neededHeight, y + rect.height);
      }
      x = clamp(x, 0, Math.max(width - rect.width, 0));
      y = clamp(y, 0, compact ? y : Math.max(stage.clientHeight - rect.height, 0));
      badge.style.transform = `translate3d(${x}px, ${y}px, 0) rotate(${rotation}deg)`;
    });
    if (compact) stage.style.height = `${Math.ceil(neededHeight)}px`;
  };

  const stopRunner = () => {
    if (!runner || !runnerActive || !window.Matter) return;
    window.Matter.Runner.stop(runner);
    runnerActive = false;
  };

  const runRunner = () => {
    if (!runner || !engine || runnerActive) return;
    window.Matter.Runner.run(runner, engine);
    runnerActive = true;
  };

  const clampBodyMotion = (body) => {
    if (!window.Matter || !body) return;
    const Matter = window.Matter;
    const maxVelocity = window.innerWidth < 720 ? 10 : 14;
    const maxAngular = 0.34;
    const velocity = body.velocity;
    const speed = Math.hypot(velocity.x, velocity.y);
    if (speed > maxVelocity) {
      const ratio = maxVelocity / speed;
      Matter.Body.setVelocity(body, { x: velocity.x * ratio, y: velocity.y * ratio });
    }
    if (Math.abs(body.angularVelocity) > maxAngular) {
      Matter.Body.setAngularVelocity(body, maxAngular * Math.sign(body.angularVelocity));
    }
  };

  const sync = () => {
    entries.forEach(({ badge, body, width, height }) => {
      clampBodyMotion(body);
      if (mobileSkills() && window.Matter) {
        const halfExtentX = Math.abs(Math.cos(body.angle)) * width / 2 + Math.abs(Math.sin(body.angle)) * height / 2;
        const minCenterX = halfExtentX;
        const maxCenterX = Math.max(stage.clientWidth - halfExtentX, minCenterX);
        const nextX = clamp(body.position.x, minCenterX, maxCenterX);
        if (nextX !== body.position.x) {
          window.Matter.Body.setPosition(body, { x: nextX, y: body.position.y });
          window.Matter.Body.setVelocity(body, { x: body.velocity.x * -0.2, y: body.velocity.y });
        }
      }
      badge.style.opacity = "1";
      badge.style.transform = `translate3d(${body.position.x - width / 2}px, ${body.position.y - height / 2}px, 0) rotate(${body.angle}rad)`;
    });
  };

  const clearDrag = () => {
    if (!window.Matter) return;
    const Matter = window.Matter;
    if (dragConstraint && engine) Matter.Composite.remove(engine.world, dragConstraint);
    if (drag?.entry?.body) clampBodyMotion(drag.entry.body);
    if (drag?.entry?.badge) {
      drag.entry.badge.classList.remove("is-dragging");
      drag.entry.badge.style.zIndex = "";
    }
    stage.classList.remove("is-dragging");
    dragConstraint = null;
    drag = null;
  };

  const clearWorld = () => {
    if (!engine || !window.Matter) return;
    clearDrag();
    const Matter = window.Matter;
    Matter.Events.off(engine, "afterUpdate", sync);
    Matter.Composite.clear(engine.world, false);
    entries = [];
    walls = [];
  };

  const settle = () => {
    if (!window.Matter || !entries.length) return;
    if (drag) {
      settleTimer = window.setTimeout(settle, 1200);
      return;
    }
    const Matter = window.Matter;
    entries.forEach(({ body }) => {
      Matter.Sleeping.set(body, true);
      Matter.Body.setVelocity(body, { x: 0, y: 0 });
      Matter.Body.setAngularVelocity(body, 0);
    });
    sync();
    stopRunner();
    stage.classList.remove("is-physics-running");
  };

  const buildWorld = () => {
    if (!engine || !window.Matter || disposed) return;
    const Matter = window.Matter;
    const { Bodies, Body, Composite, Events } = Matter;
    clearTimers();
    clearWorld();

    const width = Math.max(stage.clientWidth, 1);
    const height = Math.max(stage.clientHeight, 1);
    const thickness = Math.max(80, width * 0.08);
    const safePadding = clamp(width * 0.035, window.innerWidth <= 720 ? 28 : 28, window.innerWidth <= 720 ? 36 : 56);
    const minX = safePadding;
    const maxX = Math.max(width - safePadding, minX + 1);
    const floorY = height + thickness / 2 - 12;

    engine.gravity.y = window.innerWidth < 720 ? 0.82 : 0.95;
    engine.gravity.scale = window.innerWidth < 720 ? 0.0018 : 0.0022;
    walls = [
      Bodies.rectangle(width / 2, floorY, width + thickness * 2, thickness, { isStatic: true, label: "skills-floor" }),
      Bodies.rectangle(minX - thickness / 2, height / 2, thickness, height + thickness * 2, { isStatic: true, label: "skills-left-wall" }),
      Bodies.rectangle(maxX + thickness / 2, height / 2, thickness, height + thickness * 2, { isStatic: true, label: "skills-right-wall" }),
      Bodies.rectangle(width / 2, -300 - thickness / 2, width + thickness * 2, thickness, { isStatic: true, label: "skills-ceiling" }),
    ];
    Composite.add(engine.world, walls);

    entries = badges.map((badge, index) => {
      badge.style.opacity = "0";
      badge.style.transform = "translate3d(0, -180px, 0)";
      const rect = badge.getBoundingClientRect();
      const bodyWidth = Math.max(rect.width, 1);
      const bodyHeight = Math.max(rect.height, 1);
      const distribution = badges.length > 1 ? index / (badges.length - 1) : 0.5;
      const jitter = (((index * 37) % 15) - 7) / 100;
      const x = clamp(width * clamp(0.15 + distribution * 0.7 + jitter, 0.15, 0.85), minX + bodyWidth / 2, maxX - bodyWidth / 2);
      const y = -118 + (index % 4) * 28;
      const angle = ((((index * 29) % 37) - 18) * Math.PI) / 180;
      const body = Bodies.rectangle(x, y, bodyWidth, bodyHeight, {
        chamfer: { radius: bodyHeight / 2 },
        density: 0.001,
        friction: 0.55,
        frictionStatic: 0.7,
        frictionAir: 0.025,
        restitution: 0.18,
        slop: 0.05,
        sleepThreshold: 34,
        angle,
        label: `skill-badge-${index}`,
      });
      Body.setVelocity(body, {
        x: (((index * 17) % 17) - 8) / 10,
        y: (index % 5) * 0.24,
      });
      Body.setAngularVelocity(body, (((index * 19) % 51) - 25) / 1000);
      return { badge, body, width: bodyWidth, height: bodyHeight };
    });

    Events.on(engine, "afterUpdate", sync);
    stage.dataset.physicsMode = "matter";
    stage.classList.add("is-physics-running");

    entries.forEach((entry, index) => {
      const timer = window.setTimeout(() => {
        if (disposed || !engine || !window.Matter) return;
        entry.badge.style.opacity = "1";
        Composite.add(engine.world, entry.body);
        Matter.Sleeping.set(entry.body, false);
        runRunner();
      }, index * 85);
      spawnTimers.push(timer);
    });

    settleTimer = window.setTimeout(settle, 5200);
  };

  const getPointerPoint = (event) => {
    const rect = stage.getBoundingClientRect();
    return {
      x: clamp(event.clientX - rect.left, 0, rect.width),
      y: clamp(event.clientY - rect.top, 0, rect.height),
    };
  };

  const beginDrag = (entry, event) => {
    if (!engine || !window.Matter || reducedMotion.matches || mobileSkills() || stage.dataset.physicsMode !== "matter") return;
    const Matter = window.Matter;
    if (!Matter.Composite.allBodies(engine.world).includes(entry.body)) return;
    event.preventDefault();
    clearDrag();
    entries.forEach((item) => Matter.Sleeping.set(item.body, false));
    Matter.Sleeping.set(entry.body, false);
    drag = { entry, pointerId: event.pointerId };
    dragConstraint = Matter.Constraint.create({
      pointA: getPointerPoint(event),
      bodyB: entry.body,
      pointB: { x: 0, y: 0 },
      stiffness: 0.18,
      damping: 0.16,
      length: 0,
      render: { visible: false },
    });
    Matter.Composite.add(engine.world, dragConstraint);
    entry.badge.classList.add("is-dragging");
    entry.badge.style.zIndex = "20";
    stage.classList.add("is-dragging");
    runRunner();
  };

  const updateDrag = (event) => {
    if (!drag || !dragConstraint || event.pointerId !== drag.pointerId) return;
    event.preventDefault();
    dragConstraint.pointA = getPointerPoint(event);
    if (drag.entry?.body && window.Matter) window.Matter.Sleeping.set(drag.entry.body, false);
    runRunner();
  };

  const endDrag = (event) => {
    if (!drag || event.pointerId !== drag.pointerId) return;
    event.preventDefault();
    clearDrag();
    runRunner();
    window.clearTimeout(settleTimer);
    settleTimer = window.setTimeout(settle, 2400);
  };

  badges.forEach((badge) => {
    const onPointerDown = (event) => {
      if (event.button !== undefined && event.button > 0) return;
      const entry = entries.find((item) => item.badge === badge);
      if (entry) beginDrag(entry, event);
    };
    badge.addEventListener("pointerdown", onPointerDown);
    pointerCleanups.push(() => badge.removeEventListener("pointerdown", onPointerDown));
  });

  window.addEventListener("pointermove", updateDrag, { passive: false });
  window.addEventListener("pointerup", endDrag, { passive: false });
  window.addEventListener("pointercancel", endDrag, { passive: false });
  pointerCleanups.push(() => {
    window.removeEventListener("pointermove", updateDrag);
    window.removeEventListener("pointerup", endDrag);
    window.removeEventListener("pointercancel", endDrag);
  });

  const start = async () => {
    if (started || disposed) return;
    if (reducedMotion.matches) {
      resetBadges(mobileSkills() ? "mobile" : "reduced");
      return;
    }
    started = true;

    try {
      await document.fonts?.ready;
      const Matter = await loadMatter();
      if (disposed || !Matter) return;
      engine = Matter.Engine.create({ enableSleeping: true });
      runner = Matter.Runner.create();
      buildWorld();
      if (active) runRunner();
    } catch {
      resetBadges("fallback");
    }
  };

  observer = new IntersectionObserver((entries) => {
    active = entries.some((entry) => entry.isIntersecting);
    if (active) {
      start();
      runRunner();
    } else {
      stopRunner();
    }
  }, { rootMargin: "0px 0px -12% 0px", threshold: 0.15 });
  observer.observe(stage);

  resizeObserver = new ResizeObserver(() => {
    if (reducedMotion.matches) {
      resetBadges(mobileSkills() ? "mobile" : "reduced");
      return;
    }
    if (!started || reducedMotion.matches || !engine) return;
    window.clearTimeout(resizeTimer);
    resizeTimer = window.setTimeout(() => {
      if (!disposed) buildWorld();
    }, 180);
  });
  resizeObserver.observe(stage);

  resetBadges(reducedMotion.matches && mobileSkills() ? "mobile" : reducedMotion.matches ? "reduced" : "static");

  addCleanup(() => {
    disposed = true;
    observer?.disconnect();
    resizeObserver?.disconnect();
    clearTimers();
    clearDrag();
    pointerCleanups.splice(0).forEach((cleanup) => cleanup());
    stopRunner();
    clearWorld();
    if (engine && window.Matter) window.Matter.Engine.clear(engine);
    resetBadges("static");
  });
}

function initGallery() {
  const scroll = document.querySelector(".gallery-scroll");
  const section = document.querySelector(".gallery-section");
  const cards = Array.from(document.querySelectorAll(".gallery-card"));
  if (!scroll || !section || !cards.length) return;
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  let frame = 0;
  let current = reduce ? 1 : 0;
  const update = () => {
    frame = 0;
    const rect = scroll.getBoundingClientRect();
    if (window.innerWidth <= 720) {
      section.dataset.hover = "false";
      const rotations = [-5.5, 4.2, -2.8, 5.2, -4.4, 3.4, -3.6];
      const stackOffsets = [
        { x: -10, y: -8 },
        { x: 8, y: -12 },
        { x: -2, y: 10 },
        { x: 12, y: 6 },
        { x: -12, y: 8 },
        { x: 4, y: -4 },
        { x: 0, y: 0 },
      ];
      const stageRect = section.getBoundingClientRect();
      const scrollDistance = Math.max(1, rect.height - window.innerHeight);
      const target = reduce ? 1 : clamp(-rect.top / scrollDistance);
      current += (target - current) * 0.2;
      const phase = reduce ? 1 : clamp(current / 0.9);
      cards.forEach((card, index) => {
        const finalLeft = card.offsetLeft || 0;
        const finalTop = card.offsetTop || 0;
        const stack = stackOffsets[index] || { x: 0, y: 0 };
        const stackLeft = stageRect.width / 2 - card.offsetWidth / 2 + stack.x;
        const stackTop = stageRect.height / 2 - card.offsetHeight / 2 + stack.y;
        const stackX = stackLeft - finalLeft;
        const stackY = stackTop - finalTop;
        const x = mix(stackX, 0, phase);
        const y = mix(stackY, 0, phase);
        const rotate = mix((index - 3) * 2.2, rotations[index] || 0, phase);
        card.style.transform = `translate3d(${x}px, ${y}px, 0) rotate(${rotate}deg)`;
        card.style.zIndex = String(index < 4 ? index + 2 : index + 1);
        card.style.setProperty("--hover-rot", "0deg");
      });
      if (!reduce && Math.abs(target - current) > 0.002 && !frame) {
        frame = window.requestAnimationFrame(update);
      }
      return;
    }
    const target = reduce ? 1 : clamp((window.innerHeight * 0.5 - rect.top) / Math.max(1, rect.height - window.innerHeight * 0.5));
    current += (target - current) * 0.2;
    section.dataset.hover = current >= 0.55 ? "true" : "false";
    const width = Math.min(882, Math.max(320, section.clientWidth - 64));
    const scale = window.innerWidth < 700 ? 0.52 : window.innerWidth < 1024 ? 0.76 : 1;
    const maxSpread = width * 0.382 * scale;
    const curveDepth = 38 * scale;
    const maxRotation = 12 * scale;
    const startRot = [-2.2, 1.4, -1.2, 0.6, 2.4, -0.8, 3];
    const phase = clamp((current - 0.15) / 0.7);
    cards.forEach((card, index) => {
      const normalized = cards.length === 1 ? 0.5 : index / (cards.length - 1);
      const horizontal = normalized * 2 - 1;
      const local = reduce ? 1 : clamp((phase - index * 0.018) / 0.88);
      const x = mix(0, horizontal * maxSpread, local);
      const y = mix(0, curveDepth * horizontal * horizontal, local);
      const rotate = mix(startRot[index], horizontal * maxRotation, local);
      card.style.transform = `translate3d(calc(-50% + ${x}px), ${y}px, 0) rotate(${rotate}deg)`;
      card.style.zIndex = String(index + 1);
      card.style.setProperty("--hover-rot", `${rotate * -0.45}deg`);
    });
  };
  const request = () => {
    if (!frame) frame = window.requestAnimationFrame(update);
  };
  update();
  window.addEventListener("scroll", request, { passive: true });
  window.addEventListener("resize", request);
  addCleanup(() => {
    window.removeEventListener("scroll", request);
    window.removeEventListener("resize", request);
    if (frame) window.cancelAnimationFrame(frame);
  });
}

function initGalleryImageParallax() {
  const cards = Array.from(document.querySelectorAll(".gallery-masonry-card"));
  if (!cards.length || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  const canHover = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
  if (!canHover) return;

  cards.forEach((card) => {
    let frame = 0;
    let target = { x: 0, y: 0 };
    let current = { x: 0, y: 0 };
    const draw = () => {
      frame = 0;
      current.x += (target.x - current.x) * 0.22;
      current.y += (target.y - current.y) * 0.22;
      card.style.setProperty("--ry", `${clamp(current.x, -1, 1) * 7}deg`);
      card.style.setProperty("--rx", `${clamp(current.y, -1, 1) * -7}deg`);
      card.style.setProperty("--px", `${clamp(current.x, -1, 1) * -10}px`);
      card.style.setProperty("--py", `${clamp(current.y, -1, 1) * -10}px`);
      card.style.setProperty("--mx", `${(current.x * 0.5 + 0.5) * 100}%`);
      card.style.setProperty("--my", `${(current.y * 0.5 + 0.5) * 100}%`);
      if (Math.abs(target.x - current.x) > 0.004 || Math.abs(target.y - current.y) > 0.004) {
        frame = window.requestAnimationFrame(draw);
      }
    };
    const request = () => {
      if (!frame) frame = window.requestAnimationFrame(draw);
    };
    card.addEventListener("pointermove", (event) => {
      const rect = card.getBoundingClientRect();
      target = {
        x: ((event.clientX - rect.left) / rect.width) * 2 - 1,
        y: ((event.clientY - rect.top) / rect.height) * 2 - 1,
      };
      card.classList.add("is-hovered");
      request();
    });
    card.addEventListener("pointerleave", () => {
      target = { x: 0, y: 0 };
      card.classList.remove("is-hovered");
      request();
    });
    addCleanup(() => {
      if (frame) window.cancelAnimationFrame(frame);
    });
  });
}

function initGalleryScrollParallax() {
  const cards = Array.from(document.querySelectorAll(".gallery-masonry-card"));
  if (!cards.length) return;
  const hasLegacyPositioning = cards.some((card) => card.style.getPropertyValue("--scroll-speed"));
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  let frame = 0;

  const measureMasonry = () => {
    const masonry = document.querySelector(".gallery-masonry");
    if (!hasLegacyPositioning || !masonry || window.innerWidth <= 1180) return;
    const bottoms = cards.map((card) => {
      const top = parseFloat(card.style.getPropertyValue("--y")) || 0;
      const height = card.getBoundingClientRect().height;
      return top + height;
    });
    masonry.style.height = `${Math.max(1600, Math.ceil(Math.max(...bottoms) + 40))}px`;
  };

  const update = () => {
    frame = 0;
    cards.forEach((card, index) => {
      const layer = card.querySelector(".gallery-scroll-layer");
      if (!layer) return;
      const isVideoTile = card.dataset.galleryType === "video";
      if (reduce || isVideoTile || (hasLegacyPositioning && window.innerWidth <= 720)) {
        layer.style.setProperty("--scroll-y", "0px");
        layer.style.setProperty("--scroll-x", "0px");
        layer.style.setProperty("--scroll-r", "0deg");
        return;
      }
      const rect = card.getBoundingClientRect();
      const progress = clamp((window.innerHeight - rect.top) / (window.innerHeight + rect.height));
      const gridSpeed = 10 + (index % 4) * 2;
      const speed = hasLegacyPositioning
        ? parseFloat(card.style.getPropertyValue("--scroll-speed")) || 24
        : gridSpeed;
      const drift = hasLegacyPositioning
        ? parseFloat(card.style.getPropertyValue("--scroll-drift")) || 0
        : 0;
      const rotate = hasLegacyPositioning
        ? parseFloat(card.style.getPropertyValue("--scroll-rotate")) || 0
        : 0;
      const local = progress * 2 - 1;
      const scale = hasLegacyPositioning
        ? window.innerWidth < 720 ? 0.42 : window.innerWidth < 1180 ? 0.7 : 1
        : window.innerWidth < 720 ? 0.28 : window.innerWidth < 1180 ? 0.55 : 0.85;
      layer.style.setProperty("--scroll-y", `${local * speed * -0.55 * scale}px`);
      layer.style.setProperty("--scroll-x", `${local * drift * 0.8 * scale}px`);
      layer.style.setProperty("--scroll-r", `${local * rotate * 0.7 * scale}deg`);
      layer.style.zIndex = String(index + 1);
    });
  };

  const request = () => {
    if (!frame) frame = window.requestAnimationFrame(update);
  };
  cards.forEach((card) => {
    card.querySelector("img")?.addEventListener("load", () => {
      measureMasonry();
      request();
    }, { once: true });
  });
  measureMasonry();
  update();
  const onResize = () => {
    measureMasonry();
    request();
  };
  window.addEventListener("scroll", request, { passive: true });
  window.addEventListener("resize", onResize);
  addCleanup(() => {
    window.removeEventListener("scroll", request);
    window.removeEventListener("resize", onResize);
    if (frame) window.cancelAnimationFrame(frame);
  });
}

function initGalleryLightbox() {
  const lightbox = document.querySelector(".gallery-lightbox");
  const triggers = Array.from(document.querySelectorAll("[data-gallery-image]"));
  if (!lightbox || !triggers.length) return;
  if (lightbox.parentNode !== document.body) {
    document.body.appendChild(lightbox);
  }

  const activeImage = lightbox.querySelector("[data-gallery-active-image]");
  const activeVideo = lightbox.querySelector("[data-gallery-active-video]");
  const stage = lightbox.querySelector("[data-gallery-stage]");
  const closeButtons = Array.from(lightbox.querySelectorAll("[data-gallery-close]"));
  const prevButton = lightbox.querySelector("[data-gallery-prev]");
  const nextButton = lightbox.querySelector("[data-gallery-next]");
  const zoomInButton = lightbox.querySelector("[data-gallery-zoom-in]");
  const zoomOutButton = lightbox.querySelector("[data-gallery-zoom-out]");
  const media = triggers.map((trigger) => {
    const type = trigger.dataset.galleryType === "video" ? "video" : "image";
    const source = trigger.dataset.gallerySrc || trigger.querySelector(type === "video" ? "video" : "img")?.src || "";
    return {
      type,
      src: source,
      poster: trigger.dataset.galleryPoster || "",
    };
  }).filter((item) => item.src);
  if (!media.length || !activeImage || !activeVideo || !stage) return;
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const minZoom = 1;
  const maxZoom = 4;
  const zoomStep = 0.25;
  const morphDuration = window.innerWidth < 720 ? 360 : 520;
  let index = 0;
  let zoom = 1;
  let pan = { x: 0, y: 0 };
  let drag = null;
  let restoreFocus = null;
  let activeTrigger = null;
  let mediaLoading = false;
  let mediaFailed = false;
  let transitionLocked = false;
  let transitionTimer = 0;

  const currentMedia = () => media[index] || media[0];
  const isImageActive = () => currentMedia()?.type !== "video";

  const pauseActiveVideo = () => {
    activeVideo.pause();
  };

  const updateControls = () => {
    const singleItem = media.length <= 1;
    const modalBusy = transitionLocked || lightbox.classList.contains("is-morphing") || lightbox.classList.contains("is-morph-closing");
    prevButton.disabled = modalBusy || mediaLoading || singleItem || index === 0;
    nextButton.disabled = modalBusy || mediaLoading || singleItem || index === media.length - 1;
    zoomInButton.disabled = !isImageActive() || mediaLoading || mediaFailed || zoom >= maxZoom;
    zoomOutButton.disabled = !isImageActive() || mediaLoading || mediaFailed || zoom <= minZoom;
  };

  const lockTransition = (duration = reduce ? 0 : 260) => {
    transitionLocked = true;
    window.clearTimeout(transitionTimer);
    transitionTimer = window.setTimeout(() => {
      transitionLocked = false;
      updateControls();
    }, duration);
    updateControls();
  };

  const clampPan = () => {
    if (!isImageActive()) return;
    const availableWidth = window.innerWidth < 900 ? window.innerWidth - 48 : window.innerWidth - 220;
    const availableHeight = window.innerHeight - (window.innerWidth < 900 ? 160 : 96);
    const scaledWidth = activeImage.offsetWidth * zoom;
    const scaledHeight = activeImage.offsetHeight * zoom;
    const minVisible = window.innerWidth < 720 ? 56 : 96;
    const maxX = zoom <= 1 ? 0 : Math.max(0, (scaledWidth + availableWidth) / 2 - minVisible);
    const maxY = zoom <= 1 ? 0 : Math.max(0, (scaledHeight + availableHeight) / 2 - minVisible);
    pan.x = clamp(pan.x, -maxX, maxX);
    pan.y = clamp(pan.y, -maxY, maxY);
  };

  const applyTransform = () => {
    if (isImageActive()) {
      clampPan();
      activeImage.style.transform = `translate3d(${pan.x}px, ${pan.y}px, 0) scale(${zoom})`;
    } else {
      activeImage.style.transform = "";
    }
    updateControls();
  };

  const resetView = () => {
    zoom = 1;
    pan = { x: 0, y: 0 };
    applyTransform();
  };

  const setMedia = (nextIndex) => {
    pauseActiveVideo();
    index = clamp(nextIndex, 0, media.length - 1);
    const item = currentMedia();
    activeTrigger = triggers[index] || activeTrigger;
    mediaLoading = item.type === "image";
    mediaFailed = false;
    lockTransition(reduce ? 0 : 260);
    activeImage.classList.add("is-loading");
    activeImage.classList.remove("has-error");
    lightbox.dataset.activeType = item.type;
    stage.dataset.mediaType = item.type;
    if (item.type === "video") {
      activeImage.removeAttribute("src");
      activeVideo.poster = item.poster || "";
      activeVideo.src = item.src;
      activeVideo.load();
      mediaLoading = false;
      activeImage.classList.remove("is-loading", "has-error");
    } else {
      activeVideo.removeAttribute("src");
      activeVideo.poster = "";
      activeVideo.load();
      activeImage.src = item.src;
      if (activeImage.complete) {
        mediaLoading = false;
        mediaFailed = !activeImage.naturalWidth;
        activeImage.classList.toggle("has-error", mediaFailed);
        activeImage.classList.remove("is-loading");
      }
    }
    if (!mediaLoading) {
      activeImage.classList.remove("is-loading");
    }
    resetView();
  };

  const waitForActiveImage = () => {
    if (activeImage.complete) return Promise.resolve();
    return new Promise((resolve) => {
      const done = () => {
        activeImage.removeEventListener("load", done);
        activeImage.removeEventListener("error", done);
        resolve();
      };
      activeImage.addEventListener("load", done, { once: true });
      activeImage.addEventListener("error", done, { once: true });
      window.setTimeout(done, 900);
    });
  };

  const triggerRect = (trigger) => {
    const thumbnail = trigger?.querySelector("img, video, .gallery-image-layer");
    const rect = (thumbnail || trigger)?.getBoundingClientRect();
    if (!rect || rect.width <= 0 || rect.height <= 0) return null;
    return rect;
  };

  const imageDeltaToRect = (targetRect) => {
    const imageRect = activeImage.getBoundingClientRect();
    if (!targetRect || imageRect.width <= 0 || imageRect.height <= 0) return null;
    return {
      dx: targetRect.left + targetRect.width / 2 - (imageRect.left + imageRect.width / 2),
      dy: targetRect.top + targetRect.height / 2 - (imageRect.top + imageRect.height / 2),
      scale: Math.min(targetRect.width / imageRect.width, targetRect.height / imageRect.height),
    };
  };

  const clearMorphStyles = () => {
    activeImage.style.opacity = "";
    activeImage.style.transition = "";
  };

  const morphFromThumbnail = async (trigger) => {
    if (reduce || !trigger || !isImageActive()) return;
    await waitForActiveImage();
    if (lightbox.dataset.open !== "true") return;
    const delta = imageDeltaToRect(triggerRect(trigger));
    if (!delta) return;
    lockTransition(morphDuration + 80);
    lightbox.classList.add("is-morphing");
    activeImage.style.transition = "none";
    activeImage.style.transform = `translate3d(${delta.dx}px, ${delta.dy}px, 0) scale(${delta.scale})`;
    activeImage.style.opacity = "0.98";
    activeImage.offsetHeight;
    window.requestAnimationFrame(() => {
      activeImage.style.transition = `transform ${morphDuration}ms cubic-bezier(0.22, 1, 0.36, 1), opacity 180ms ease-out`;
      applyTransform();
      activeImage.style.opacity = "1";
    });
    window.setTimeout(() => {
      lightbox.classList.remove("is-morphing");
      clearMorphStyles();
      updateControls();
    }, morphDuration + 40);
  };

  const open = async (nextIndex, trigger) => {
    restoreFocus = trigger;
    activeTrigger = trigger;
    setMedia(nextIndex);
    lightbox.dataset.open = "true";
    lightbox.classList.remove("is-morph-closing");
    document.body.classList.add("is-gallery-lightbox-open");
    lightbox.focus({ preventScroll: true });
    updateControls();
    morphFromThumbnail(trigger);
  };

  const finalizeClose = () => {
    pauseActiveVideo();
    lightbox.dataset.open = "false";
    lightbox.classList.remove("is-morphing", "is-morph-closing");
    document.body.classList.remove("is-gallery-lightbox-open");
    window.clearTimeout(transitionTimer);
    transitionLocked = false;
    clearMorphStyles();
    resetView();
    restoreFocus?.focus({ preventScroll: true });
  };

  const close = () => {
    if (lightbox.dataset.open !== "true") return;
    pauseActiveVideo();
    if (reduce) {
      finalizeClose();
      return;
    }
    if (!isImageActive()) {
      finalizeClose();
      return;
    }
    lockTransition(morphDuration + 80);
    lightbox.classList.add("is-morph-closing");
    zoom = 1;
    pan = { x: 0, y: 0 };
    activeImage.style.transition = "none";
    applyTransform();
    const targetRect = triggerRect(activeTrigger || restoreFocus);
    const delta = imageDeltaToRect(targetRect);
    if (!delta) {
      finalizeClose();
      return;
    }
    activeImage.offsetHeight;
    window.requestAnimationFrame(() => {
      activeImage.style.transition = `transform ${morphDuration}ms cubic-bezier(0.22, 1, 0.36, 1), opacity 180ms ease-out`;
      activeImage.style.transform = `translate3d(${delta.dx}px, ${delta.dy}px, 0) scale(${delta.scale})`;
      activeImage.style.opacity = "0.98";
    });
    window.setTimeout(finalizeClose, morphDuration);
  };

  const changeZoom = (delta, originEvent = null) => {
    if (!isImageActive()) return;
    const oldZoom = zoom;
    const nextZoom = clamp(Math.round((zoom + delta) * 100) / 100, minZoom, maxZoom);
    if (nextZoom === oldZoom) return;
    if (originEvent) {
      const rect = activeImage.getBoundingClientRect();
      const originX = originEvent.clientX - (rect.left + rect.width / 2);
      const originY = originEvent.clientY - (rect.top + rect.height / 2);
      const ratio = nextZoom / oldZoom;
      pan.x -= originX * (ratio - 1);
      pan.y -= originY * (ratio - 1);
    }
    zoom = nextZoom;
    if (zoom === minZoom) pan = { x: 0, y: 0 };
    applyTransform();
  };

  triggers.forEach((trigger) => {
    trigger.addEventListener("click", () => open(Number(trigger.dataset.galleryImage), trigger));
  });
  closeButtons.forEach((button) => button.addEventListener("click", close));
  activeImage.addEventListener("load", () => {
    mediaLoading = false;
    mediaFailed = false;
    activeImage.classList.remove("is-loading", "has-error");
    updateControls();
  });
  activeImage.addEventListener("error", () => {
    mediaLoading = false;
    mediaFailed = true;
    activeImage.classList.remove("is-loading");
    activeImage.classList.add("has-error");
    updateControls();
  });
  prevButton.addEventListener("click", () => {
    if (!prevButton.disabled) setMedia(index - 1);
  });
  nextButton.addEventListener("click", () => {
    if (!nextButton.disabled) setMedia(index + 1);
  });
  zoomInButton.addEventListener("click", () => {
    if (!zoomInButton.disabled) changeZoom(zoomStep);
  });
  zoomOutButton.addEventListener("click", () => {
    if (!zoomOutButton.disabled) changeZoom(-zoomStep);
  });

  stage.addEventListener("wheel", (event) => {
    if (lightbox.dataset.open !== "true" || !isImageActive()) return;
    event.preventDefault();
    changeZoom(event.deltaY < 0 ? zoomStep : -zoomStep, event);
  }, { passive: false });

  stage.addEventListener("pointerdown", (event) => {
    if (!isImageActive() || zoom <= 1) return;
    drag = { x: event.clientX, y: event.clientY, panX: pan.x, panY: pan.y };
    stage.setPointerCapture(event.pointerId);
    stage.classList.add("is-dragging");
  });
  stage.addEventListener("pointermove", (event) => {
    if (!drag) return;
    pan = {
      x: drag.panX + event.clientX - drag.x,
      y: drag.panY + event.clientY - drag.y,
    };
    applyTransform();
  });
  const stopDrag = () => {
    drag = null;
    stage.classList.remove("is-dragging");
  };
  stage.addEventListener("pointerup", stopDrag);
  stage.addEventListener("pointercancel", stopDrag);

  lightbox.addEventListener("keydown", (event) => {
    if (lightbox.dataset.open !== "true") return;
    if (event.key === "Escape") close();
    if ((event.key === "ArrowUp" || event.key === "ArrowLeft") && !prevButton.disabled) setMedia(index - 1);
    if ((event.key === "ArrowDown" || event.key === "ArrowRight") && !nextButton.disabled) setMedia(index + 1);
    if ((event.key === "+" || event.key === "=") && !zoomInButton.disabled) changeZoom(zoomStep);
    if ((event.key === "-" || event.key === "_") && !zoomOutButton.disabled) changeZoom(-zoomStep);
    if (event.key === "0") resetView();
    if (event.key === "Tab") {
      const focusables = Array.from(lightbox.querySelectorAll("button:not([disabled])"));
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (!first || !last) return;
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }
  });

  setMedia(0);
  addCleanup(() => {
    pauseActiveVideo();
    document.body.classList.remove("is-gallery-lightbox-open");
    window.clearTimeout(transitionTimer);
    if (lightbox.parentNode === document.body) lightbox.remove();
  });
}

function initCertificateModal() {
  const modal = document.querySelector("[data-certificate-modal]");
  const triggers = Array.from(document.querySelectorAll("[data-certificate-modal-open]"));
  if (!modal || !triggers.length) return;
  if (modal.parentNode !== document.body) {
    document.body.appendChild(modal);
  }

  const closeButtons = Array.from(modal.querySelectorAll("[data-certificate-modal-close]"));
  let lastTrigger = null;

  const open = (trigger) => {
    lastTrigger = trigger;
    modal.dataset.open = "true";
    modal.removeAttribute("aria-hidden");
    document.body.classList.add("is-certificate-modal-open");
    const closeButton = modal.querySelector("[data-certificate-modal-close]");
    window.requestAnimationFrame(() => closeButton?.focus({ preventScroll: true }));
  };

  const close = () => {
    if (modal.dataset.open !== "true") return;
    modal.dataset.open = "false";
    modal.setAttribute("aria-hidden", "true");
    document.body.classList.remove("is-certificate-modal-open");
    lastTrigger?.focus({ preventScroll: true });
    lastTrigger = null;
  };

  triggers.forEach((trigger) => {
    trigger.addEventListener("click", () => open(trigger));
  });
  closeButtons.forEach((button) => {
    button.addEventListener("click", close);
  });
  modal.addEventListener("keydown", (event) => {
    if (modal.dataset.open !== "true") return;
    if (event.key === "Escape") {
      event.preventDefault();
      close();
      return;
    }
    if (event.key !== "Tab") return;
    const focusables = Array.from(modal.querySelectorAll("button:not([disabled])"));
    if (!focusables.length) return;
    const first = focusables[0];
    const last = focusables[focusables.length - 1];
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  });

  addCleanup(() => {
    document.body.classList.remove("is-certificate-modal-open");
    if (modal.parentNode === document.body) modal.remove();
  });
}

function initStudyCaseToc() {
  const page = document.querySelector(".study-detail-page");
  if (!page) return;
  const links = Array.from(page.querySelectorAll("[data-toc-link]"));
  const sections = Array.from(page.querySelectorAll("[data-study-section]"));
  if (!links.length || !sections.length) return;

  let activeId = "";
  let tocScrollFrame = 0;
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  const scrollActiveLinkIntoView = (link) => {
    const scrollArea = link.closest(".study-toc-scroll");
    if (!scrollArea || scrollArea.scrollWidth <= scrollArea.clientWidth) return;
    window.cancelAnimationFrame(tocScrollFrame);
    tocScrollFrame = window.requestAnimationFrame(() => {
      const maxScroll = Math.max(0, scrollArea.scrollWidth - scrollArea.clientWidth);
      const scrollRect = scrollArea.getBoundingClientRect();
      const linkRect = link.getBoundingClientRect();
      const itemLeft = scrollArea.scrollLeft + linkRect.left - scrollRect.left;
      const target = itemLeft - (scrollArea.clientWidth - linkRect.width) / 2;
      scrollArea.scrollTo({
        left: clamp(target, 0, maxScroll),
        behavior: prefersReducedMotion.matches ? "auto" : "smooth",
      });
    });
  };

  const setActive = (id) => {
    if (id === activeId) return;
    activeId = id;
    links.forEach((link) => {
      const active = link.dataset.tocLink === id;
      link.classList.toggle("is-active", active);
      if (active) {
        link.setAttribute("aria-current", "location");
        scrollActiveLinkIntoView(link);
      } else {
        link.removeAttribute("aria-current");
      }
    });
  };

  const updateActiveByPosition = () => {
    const offset = 170;
    const current = sections
      .map((section) => ({ id: section.id, top: section.getBoundingClientRect().top - offset }))
      .filter((item) => item.top <= 0)
      .sort((a, b) => b.top - a.top)[0];
    setActive(current?.id || sections[0].id);
  };

  links.forEach((link) => {
    link.addEventListener("click", (event) => {
      const id = link.dataset.tocLink;
      const target = document.getElementById(id);
      if (!target) return;
      event.preventDefault();
      const scrollOffset = Number.parseFloat(getComputedStyle(target).scrollMarginTop) || 150;
      window.scrollTo({
        top: target.getBoundingClientRect().top + window.scrollY - scrollOffset,
        behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth",
      });
      setActive(id);
    });
  });

  const observer = new IntersectionObserver((entries) => {
    const visible = entries
      .filter((entry) => entry.isIntersecting)
      .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
    if (visible?.target?.id) setActive(visible.target.id);
  }, { threshold: [0.16, 0.32, 0.48], rootMargin: "-150px 0px -55% 0px" });

  sections.forEach((section) => observer.observe(section));
  updateActiveByPosition();
  window.addEventListener("scroll", updateActiveByPosition, { passive: true });
  addCleanup(() => {
    observer.disconnect();
    window.removeEventListener("scroll", updateActiveByPosition);
    window.cancelAnimationFrame(tocScrollFrame);
  });
}

function boot() {
  runCleanups();
  render();
  initMenu();
  initTypewriters();
  initReveal();
  initScrollBlurReveal();
  initBlueReveal();
  initParallaxSections();
  initAccordions();
  initParallaxTiltCards();
  initAppIcons();
  initGallery();
  initGalleryScrollParallax();
  initGalleryLightbox();
  initCertificateModal();
  initStudyCaseToc();
  initFooterGrid();
  initSkillPhysics();
  const route = getRoute();
  if (route.target) {
    window.requestAnimationFrame(() => {
      document.getElementById(route.target)?.scrollIntoView({ block: "start" });
    });
  } else {
    window.scrollTo({ top: 0 });
  }
}

window.addEventListener("hashchange", boot);
boot();
