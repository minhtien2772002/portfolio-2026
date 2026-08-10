import { hpfAssets } from "./hpf-assets.js";

const iconRoot = "./public/assets/study-smart-smash/icons";
const icon = (name) => `${iconRoot}/${name}.svg`;
const shot = (name, label, alt, options = {}) => ({ ...hpfAssets[name], label, alt, ...options });

export const hpfCardImage = hpfAssets.thumbnail.src;
export const hpfCardImageSrcset = hpfAssets.thumbnail.srcset;

export const hpfCase = {
  title: "HPF",
  label: "Product Design Case Study",
  subtitle: "A mobile personal-development ecosystem connecting habits, reflection, learning, coaching, challenges, and community support.",
  next: "smart-smash",
  sections: [
    {
      id: "overview",
      title: "Overview",
      intro: "HPF is a mobile-first personal-development platform for men pursuing stronger roles as fathers and husbands through emotional, relational, and physical growth. Daily habits form the recurring core, connecting Family, Self, Service, reflection, learning, coaching, challenges, and trusted community support.",
      blocks: [
        { type: "cards", columns: 2, items: [
          ["Habit Building", "Today turns intention into daily habits, completion states, and a practical next step.", icon("task")],
          ["Learning and Coaching", "Courses, lessons, coaching, podcasts, and events offer structured support beyond the daily loop.", icon("workflow")],
          ["Reflection and Mood", "Journal and mood logging add a dedicated place to record emotional context.", icon("idea")],
          ["Community and Challenges", "Groups, posts, challenges, and achievements add participation, accountability, and recognition.", icon("user")],
        ] },
        { type: "meta", rows: [
          ["Project", "HPF", icon("task")],
          ["Product Type", "Mobile personal-development platform", icon("grid")],
          ["Core Experience", "Daily habits supported by reflection, learning, guidance, and community", icon("workflow")],
          ["Primary Users", "Habit builders, learners, coaching users, community participants", icon("user")],
          ["Platform", "Mobile app", icon("home")],
          ["Key Modules", "Today, Journal, Explore, Community, Learning, Profile", icon("grid")],
          ["Design Scope", "Experience architecture, behaviour-support flows, states, and mobile UI", icon("idea")],
          ["Status", "Source design marked in progress; no launch outcomes claimed", icon("warning")],
        ] },
        { type: "evidence", title: "NEW-SOURCE PRODUCT ECOSYSTEM", columns: 3, items: [
          shot("today", "Today", "HPF Today dashboard with daily habits and progress", { crop: "today" }),
          shot("journal", "Journal", "HPF journal with mood-based reflections"),
          shot("communityFeed", "Community", "HPF community post editor"),
          shot("learning", "Learning", "HPF learning home with courses and coaching"),
          shot("profile", "Profile", "HPF member profile and streak progress"),
          shot("achievements", "Achievements", "HPF achievements and streak milestones"),
        ], caption: "These new-source screens show the connected ecosystem from daily action and reflection through community, structured learning, personal identity, and recognition." },
        { type: "highlight", quote: "HPF treats long-term development as a system of action, reflection, support, and recovery rather than a single streak counter." },
        { type: "chips", items: ["Today", "Journal", "Explore", "Learning"] },
      ],
    },
    {
      id: "context",
      title: "Context",
      intro: "HPF is not a task list: growth spans relationships, nutrition, fitness, and service, while the supporting content lives across several experiences. The product needs a repeatable daily structure that can personalize habits and learning while connecting accountability to real people.",
      blocks: [
        { type: "cards", columns: 2, items: [
          ["Daily Structure", "Today gives users a clear home for habits, completion, reminders, and the next action.", icon("home")],
          ["Accountability", "Community, groups, challenges, and achievements connect individual practice with participation.", icon("user")],
          ["Reflection", "Journal and mood logging create room for deeper personal context.", icon("idea")],
          ["Guidance", "Coaching, content, events, and affirmations provide routes into support and learning.", icon("workflow")],
        ] },
        { type: "evidence", title: "DAILY ACTION WITH CONNECTED SUPPORT", columns: 4, items: [
          shot("today", "Daily guidance", "Daily habit guidance on the HPF Today screen", { crop: "today" }),
          shot("communityDetail", "Accountability group", "HPF accountability community detail"),
          shot("learning", "Learning support", "HPF structured learning support"),
          shot("profile", "Personal progress", "HPF profile showing personal streak progress"),
        ], caption: "Today provides the recurring action layer while community, learning, and profile states keep guidance, accountability, and progress connected." },
        { type: "highlight", quote: "The product does not need more disconnected self-improvement features. It needs each surface to support a coherent development journey." },
      ],
    },
    {
      id: "problem",
      title: "Problem",
      intro: "The design challenge is to turn broad goals into daily action without hiding a large ecosystem behind one destination. HPF must make habits, content, coaching, community, progress, and membership states understandable while treating interruption as a recoverable state.",
      blocks: [
        { type: "cards", columns: 2, items: [
          ["Goals need daily action", "The experience must turn longer-term intentions into a repeatable practice a user can complete today.", icon("task")],
          ["Support is distributed", "Habits, journaling, coaching, learning, and community need clear roles within one product.", icon("workflow")],
          ["Access states change the experience", "Onboarding, verification, and free-tier application flows need clear requirements and next steps.", icon("lock")],
          ["Progress needs a readable home", "Users need to understand their current state and next action without interpreting several dashboards.", icon("line-chart")],
          ["Missed habits need recovery", "Streak recovery should make interruption a navigable state instead of a dead end.", icon("warning")],
        ] },
        { type: "evidence", title: "PRODUCT STATES THAT REQUIRE CLARITY", columns: 5, items: [
          shot("authLogin", "Account access", "HPF account login state"),
          shot("streakInterrupted", "Interrupted streak", "HPF interrupted streak state"),
          shot("waitlist", "Restricted access", "HPF restricted access waitlist state"),
          shot("notifications", "Notification load", "HPF notification list"),
          shot("addHabitState", "Habit configuration", "HPF habit configuration state"),
        ], caption: "These confirmed states expose activation, recovery, access, communication, and configuration moments where status and next actions must remain explicit." },
        { type: "highlight", quote: "The UX challenge is to keep daily behaviour at the centre while making deeper support systems available when a user needs them." },
      ],
    },
    {
      id: "users",
      title: "Users",
      intro: "The product supports new members who need recommendations, active habit builders who need daily feedback and recovery, and community participants who need tribes, squads, posts, and messages. Learners, coaching members, and free-tier applicants each need clear paths into the support available to them.",
      blocks: [
        { type: "personas", items: [
          { title: "Habit Builder", need: "A clear daily routine with visible progress and a recoverable path after interruption.", experiences: ["Today", "Habits", "Calendar", "Streak Recovery"], icon: icon("user") },
          { title: "Guided Learner", need: "Structured courses and lessons with visible progression and continued guidance.", experiences: ["Learning", "Courses", "Lessons", "Coaching Groups"], icon: icon("task") },
          { title: "Community Participant", need: "Connection, accountability, and direct conversation with peers.", experiences: ["Community", "Posts", "Groups", "Messages"], icon: icon("user") },
        ] },
        { type: "evidence", title: "REPRESENTATIVE USER STATES", columns: 3, items: [
          shot("authLogin", "New or returning member", "HPF login for a new or returning member"),
          shot("today", "Active habit builder", "HPF Today dashboard for an active habit builder", { crop: "today" }),
          shot("learning", "Learner", "HPF learning home for a guided learner"),
          shot("communityFeed", "Community participant", "HPF community participation surface"),
          shot("profile", "Established member", "HPF profile for an established member"),
          shot("waitlist", "Applicant or restricted user", "HPF application waitlist state"),
        ], caption: "The selected states represent entry, daily action, learning, participation, established membership, and restricted-access needs found in the new source." },
      ],
    },
    {
      id: "strategy",
      title: "Strategy",
      intro: "The strategy connects a personalized starting point to a daily habit loop, then reinforces it through reflection, progress, trusted peers, structured learning, and coaching. Mobile-first rituals, lightweight gamification, small groups, and tiered access make the broad ecosystem actionable in stages.",
      blocks: [
        { type: "cards", columns: 2, items: [
          ["Reveal complexity progressively", "Onboarding and clear destinations let the product grow without overwhelming a new user.", icon("grid")],
          ["Design for recovery", "Offer an earn-back-streak path so a missed habit does not end the journey.", icon("warning")],
          ["Start with Today", "Give every user a practical daily entry point for habits and progress.", icon("home")],
          ["Connect support to behaviour", "Coaching, content, learning, and community should reinforce the active habit loop.", icon("workflow")],
          ["Make progress legible", "Use completion, streak, calendar, challenge, and achievement states as visible feedback.", icon("line-chart")],
        ] },
        { type: "evidence", title: "ACTION, RECOVERY, ACCOUNTABILITY, AND GROWTH", columns: 5, items: [
          shot("today", "Daily hub", "HPF daily hub", { crop: "today" }),
          shot("streakRecovery", "Recover momentum", "HPF earn-back-streak recovery"),
          shot("communityDetail", "Small-group accountability", "HPF small accountability group"),
          shot("learning", "Structured progression", "HPF structured learning progression"),
          shot("achievements", "Long-term recognition", "HPF long-term achievement recognition"),
        ], caption: "The product strategy appears in the interface as a daily hub reinforced by recoverable progress, trusted groups, structured learning, and visible achievement." },
      ],
    },
    {
      id: "information-architecture",
      title: "Information Architecture",
      intro: "Today is the daily core; Explore, Community, Messages, Learning, and Profile support discovery, accountability, conversation, structured development, and personal progress. Journal and Calendar remain connected to Today so reflection and history remain part of the daily loop rather than separate destinations.",
      blocks: [
        { type: "architecture", groups: [
          { title: "Daily hub", body: "Today holds habits, completion, journal entry, calendar context, reminders, and recovery as the recurring daily loop.", icon: icon("home"), emphasis: true },
          { title: "Primary destinations", body: "Explore, Community, Learning, and My HPF provide distinct routes into discovery, participation, development, and personal progress.", icon: icon("user") },
          { title: "Connected utilities", body: "Journal, Calendar, Notifications, Messages, and All Habits support the daily experience without competing with it.", icon: icon("task") },
        ] },
        { type: "evidence", title: "NAVIGATION EVIDENCE", columns: 4, items: [
          shot("today", "Today", "HPF Today navigation destination", { crop: "today" }),
          shot("journal", "Journal", "HPF Journal destination"),
          shot("communityFeed", "Community", "HPF Community destination"),
          shot("messageList", "Messages", "HPF Messages destination"),
          shot("learning", "Learning", "HPF Learning destination"),
          shot("profile", "Profile", "HPF Profile destination"),
          shot("notifications", "Notifications", "HPF Notifications utility"),
          shot("allHabits", "All Habits", "HPF All Habits utility"),
        ], caption: "These screens show the daily hub, primary destinations, and supporting utilities as connected parts of the same mobile structure." },
      ],
    },
    {
      id: "core-flows",
      title: "Core Flows",
      intro: "The designed flows cover entry, daily action, recovery, reflection, discovery, social participation, structured learning, and access. Together they show how a user can move from onboarding questions to recommended support, then return to a clear next step each day.",
      blocks: [
        { type: "evidence", title: "ONBOARDING AND PERSONALIZATION", columns: 4, numbered: true, items: [
          shot("splash", "Start", "HPF splash screen"),
          shot("getStarted", "Enter HPF", "HPF get-started screen"),
          shot("createAccount", "Register", "HPF account registration"),
          shot("coachIntroduction", "Meet the guide", "HPF coach introduction"),
          shot("focusQuestion", "Personalize", "HPF personalization question"),
          shot("planGeneration", "Build the plan", "HPF plan generation state"),
          shot("todayDashboard", "Begin daily action", "HPF first Today dashboard"),
        ], caption: "The entry flow moves from account creation into guided questions and plan generation before landing in Today, so personalization is established before the broader product ecosystem is introduced." },
        { type: "evidence", title: "CONFIRMED CORE WORKFLOWS · HABIT CREATION AND REVIEW", columns: 3, numbered: true, items: [
          shot("today", "Start in Today", "Start the habit flow in Today", { crop: "today" }),
          shot("addHabit", "Add habit", "HPF add habit screen"),
          shot("addHabitState", "Configure", "HPF habit configuration"),
          shot("habitDetail", "Review detail", "HPF habit detail"),
          shot("allHabits", "Review all habits", "HPF all habits list"),
        ] },
        { type: "evidence", title: "STREAK RECOVERY", columns: 3, numbered: true, items: [
          shot("streakInterrupted", "Interrupted state", "HPF interrupted streak"),
          shot("streakRecovery", "Earn back streak", "HPF earn-back-streak flow"),
          shot("today", "Return to Today", "Return to the HPF Today dashboard", { crop: "today" }),
        ] },
        { type: "evidence", title: "JOURNAL", columns: 3, numbered: true, items: [
          shot("journal", "Open Journal", "Open the HPF journal"),
          shot("journalEntry", "Add reflection", "Add an HPF journal reflection"),
          shot("journalUpdatedToday", "Updated daily state", "Updated HPF Today state after journaling"),
        ] },
        { type: "evidence", title: "LEARNING", columns: 3, numbered: true, items: [
          shot("learning", "Learning home", "HPF learning home"),
          shot("courseList", "Course list", "HPF course list"),
          shot("course", "Course detail", "HPF course detail"),
          shot("lessonVideo", "Video lesson", "HPF video lesson"),
          shot("courseDetail", "Continue course", "HPF course progression detail"),
        ], caption: "The new-source workflows document habit setup, streak recovery, reflective logging, and structured learning as separate sequences while preserving the existing onboarding evidence where the new source has no equivalent." },
      ],
    },
    {
      id: "solution",
      title: "Solution",
      intro: "HPF works as a connected system: action through habits and tasks, reflection through mood and journal, accountability through streaks, challenges, groups, and progress, and deeper support through learning, coaching, and recognition.",
      blocks: [
        { type: "cards", columns: 3, items: [
          ["Reflection", "Journal and mood logging add emotional context alongside progress.", icon("idea")],
          ["Trusted Support", "Community groups, coaching, courses, and curated content provide distinct routes into deeper support.", icon("user")],
          ["Daily Action", "Today turns intention into habits, completion states, and a practical next step.", icon("task")],
          ["Accountability", "Community, groups, and challenges connect individual practice with participation.", icon("workflow")],
          ["Recognition", "Achievements and visible progress acknowledge continued learning and completion.", icon("line-chart")],
        ] },
        { type: "evidence", title: "SIX CONNECTED PRODUCT MECHANISMS", columns: 3, items: [
          shot("today", "Action", "Daily action in HPF Today", { crop: "today" }),
          shot("journal", "Reflection", "Reflection in HPF Journal"),
          shot("streakRecovery", "Accountability", "Accountability through HPF streak recovery"),
          shot("learning", "Learning", "Structured learning in HPF"),
          shot("communityDetail", "Trusted support", "Trusted support through an HPF community"),
          shot("achievements", "Recognition", "Recognition through HPF achievements"),
        ], caption: "Each mechanism has a visible home in the new source: daily action, reflective logging, recoverable progress, learning, trusted support, and recognition." },
        { type: "highlight", quote: "The ecosystem works when every deeper module strengthens a user’s ability to return to today’s practice." },
      ],
    },
    {
      id: "ux-decisions",
      title: "UX Decisions",
      intro: "The product decisions prioritize orientation and re-entry. Today remains the daily destination, onboarding personalizes before asking users to navigate the full system, completed habits stay visible as feedback, and access or recovery states clearly explain what can happen next.",
      blocks: [
        { type: "cards", columns: 2, items: [
          ["Today as the daily home", "The main daily destination keeps habits and the next action visible even as the platform expands.", icon("home")],
          ["Progressive onboarding", "Questions, sign-up, and verification introduce the system in stages.", icon("workflow")],
          ["Recovery over punishment", "Earn-back-streak states provide a path forward after a missed habit.", icon("warning")],
          ["Separate action and reflection", "Journal makes deeper reflection available without making habit completion feel like a long form.", icon("idea")],
          ["Clear support entry points", "Explore, Community, and Learning each provide a recognisable route into different types of help.", icon("grid")],
        ] },
        { type: "evidence", title: "DECISIONS PROVEN IN PRODUCT STATES", columns: 3, items: [
          shot("today", "Today as the home", "HPF Today as the daily home", { crop: "today" }),
          shot("addHabit", "Progressive configuration", "Progressive HPF habit configuration"),
          shot("habitDetail", "Visible progress", "Visible progress in HPF habit detail"),
          shot("streakRecovery", "Recovery over failure", "HPF recovery after an interrupted streak"),
          shot("communityTribe", "Small-group structure", "HPF small-group community structure"),
          shot("waitlist", "Explicit access state", "Explicit HPF waitlist access state"),
        ], caption: "These screens support the nearby decisions through a central daily destination, staged habit setup, readable progress, recovery, structured groups, and explicit access." },
      ],
    },
    {
      id: "today-habits",
      title: "Today & Habits",
      intro: "Today brings together task ordering, completion, habit creation, progress, streaks, calendar review, and reminders. The flow is designed to make the next action obvious while preserving an understandable path for reviewing history or recovering after interruption.",
      blocks: [
        { type: "cards", columns: 2, items: [
          ["Create a habit", "Move from an intention to a defined daily action that can be surfaced in Today.", icon("edit")],
          ["Review habit details", "Detail states keep the behaviour understandable beyond a single checkmark.", icon("document")],
          ["Track the current state", "Completion, calendar, reminders, notifications, and messages connect the habit to time and follow-up.", icon("line-chart")],
          ["Recover a streak", "Missed-habit states offer a route back into the routine instead of a permanent loss.", icon("warning")],
        ] },
        { type: "evidence", title: "REAL HPF DAILY-LOOP EVIDENCE", columns: 5, items: [
          shot("today", "Today dashboard", "HPF Today dashboard"),
          shot("noHabitsState", "No habits yet? The empty state makes the next step clear.", "HPF empty habit state"),
          shot("allHabits", "All habits", "HPF all habits list"),
          shot("addHabit", "Create habit", "HPF create habit form"),
          shot("addHabitState", "Habit setup state", "HPF habit setup state"),
        ] },
        { type: "evidence", title: "RECOVERY, DETAIL, AND COMMUNICATION", columns: 4, items: [
          shot("habitDetail", "Habit detail", "HPF habit detail"),
          shot("streakInterrupted", "Interrupted streak", "HPF interrupted streak"),
          shot("streakRecovery", "Earn back streak", "HPF earn-back-streak action"),
          shot("notifications", "Notifications", "HPF notifications"),
        ], caption: "The expanded Today evidence connects habit detail and progress with interruption, recovery, and the notification layer that brings users back to action." },
        { type: "highlight", quote: "A streak is useful feedback only when the product also gives users a realistic way back into the routine." },
      ],
    },
    {
      id: "journal-mood",
      title: "Journal & Mood",
      intro: "Mood selection and journal entry create a deliberate reflection loop alongside daily action: select a feeling, write a response, save it, and return to an updated Today state. This records personal context without claiming therapeutic outcomes.",
      blocks: [
        { type: "cards", columns: 3, items: [
          ["Mood Logging", "Select and record a mood as personal context around the wider development journey.", icon("idea")],
          ["Reflection", "Save a considered reflection without adding unnecessary effort to the Today flow.", icon("edit")],
          ["Reviewable History", "Keep entries available as a user-owned record that can be revisited over time.", icon("document")],
        ] },
        { type: "evidence", title: "MOOD AND JOURNAL FLOW", columns: 3, items: [
          shot("journal", "Review mood", "Review mood in HPF Journal"),
          shot("journalEntry", "Add reflection", "Add an HPF journal reflection"),
          shot("journalUpdatedToday", "Return to Today", "Return to an updated HPF Today state"),
        ], caption: "The confirmed new-source flow moves from mood review into a journal entry and back to an updated Today state, keeping reflection connected to daily action." },
      ],
    },
    {
      id: "explore-coaching",
      title: "Explore & Coaching",
      intro: "Explore extends the daily product with coaching and curated content. The audited overview includes coaching, articles, podcasts, events, and topic collections, while article cards continue into a focused long-form reading experience.",
      blocks: [
        { type: "cards", columns: 2, items: [
          ["Discover support", "The Explore overview brings coaching and curated content into one discovery surface.", icon("user")],
          ["Continue into detail", "Article cards open into focused long-form content without changing the primary navigation.", icon("document")],
        ] },
        { type: "highlight", quote: "Discovery is most useful when it helps users choose support that connects back to their active practice." },
        { type: "evidence", title: "DISCOVERY AND CONTENT", columns: 2, items: [
          shot("explore", "Explore overview", "HPF Explore overview", { crop: "editorial" }),
          shot("blog", "Long-form article", "HPF long-form article", { crop: "editorial" }),
        ], caption: "The audited source confirms an Explore overview with coaching, articles, podcasts, events, and topic collections, plus a long-form article detail. Dedicated rank, affirmation, challenge, and coaching flows were not confirmed as individual screens." },
      ],
    },
    {
      id: "community-learning",
      title: "Community & Learning",
      intro: "Community supports participation through feeds, image posts, tribes, groups, and conversations. Learning provides course discovery, course detail, video lessons, resources, and progression states so development can continue beyond daily tasks.",
      blocks: [
        { type: "cards", columns: 2, items: [
          ["Posts", "A feed-level entry point for ideas, activity, and interaction across the network.", icon("document")],
          ["Communities", "A way to organise broader shared interests or development contexts.", icon("grid")],
          ["Groups", "A focused space for participation and continued interaction with peers.", icon("user")],
          ["Courses and Lessons", "Structured learning gives users a sequence beyond the daily habit surface.", icon("task")],
          ["Coaching Groups", "Group-based learning extends the individual lesson path with guided participation.", icon("workflow")],
          ["Progress and Recognition", "Course progression and achievement states make continued effort visible without implying measured outcomes.", icon("line-chart")],
        ] },
        { type: "highlight", quote: "Community and learning are most useful when they make a personal goal feel supported without becoming a prerequisite for progress." },
        { type: "evidence", title: "COMMUNITY PARTICIPATION", columns: 4, items: [
          shot("communityFeed", "Community feed", "HPF community feed"),
          shot("communityPosts", "Post list", "HPF community post list"),
          shot("communityComposer", "Compose post", "Compose an HPF community post"),
          shot("communityPostDetail", "Published post", "Published HPF community post"),
        ] },
        { type: "evidence", columns: 3, items: [
          shot("communityDetail", "Community detail", "HPF community detail"),
          shot("communityTribe", "Tribe detail", "HPF tribe detail"),
          shot("communityMessage", "Group message", "HPF group message"),
        ] },
        { type: "evidence", columns: 3, items: [
          shot("messageList", "Conversation list", "HPF conversation list"),
          shot("conversation", "Conversation", "HPF conversation"),
          shot("messageState", "Message detail", "HPF message detail"),
        ] },
        { type: "evidence", title: "STRUCTURED LEARNING", columns: 4, items: [
          shot("learning", "Learning home", "HPF learning home"),
          shot("courseList", "Course list", "HPF course list"),
          shot("course", "Course overview", "HPF course overview"),
          shot("courseDetail", "Course state", "HPF course state"),
        ] },
        { type: "evidence", columns: 4, items: [
          shot("lessonVideo", "Video lesson", "HPF video lesson"),
          shot("courseState2", "Course progression", "HPF course progression"),
          shot("courseState3", "Course state", "HPF course state"),
          shot("courseState4", "Course state", "HPF course state with enrollment action"),
        ] },
        { type: "evidence", columns: 2, items: [
          shot("courseState5", "Additional course state", "Additional HPF course state"),
        ], caption: "Community evidence covers browsing, composing, published content, tribe structure, and messaging. Learning evidence shows discovery, course detail, video, and multiple progression states confirmed in the new source." },
      ],
    },
    {
      id: "edge-cases",
      title: "Edge Cases",
      intro: "The confirmed edge states cover account entry, restricted membership, interrupted streaks, notifications, message availability, and incomplete habit configuration. Each state needs an explicit status and next action rather than a silent dead end.",
      blocks: [
        { type: "cards", columns: 2, items: [
          ["Account entry", "Authentication should make requirements and recovery routes visible.", icon("lock")],
          ["Restricted membership", "Waitlist and access states should explain what is available and what happens next.", icon("lock")],
          ["Incomplete setup", "Partially configured habits need clear required fields and a recoverable next step.", icon("grid")],
          ["Interrupted progress", "Streak recovery turns a missed habit into an explicit transition instead of a permanent loss.", icon("warning")],
          ["Communication states", "Notifications and message lists should distinguish new activity from an empty or inactive state.", icon("line-chart")],
          ["Incomplete learning", "Course progression should remain understandable before completion.", icon("line-chart")],
        ] },
        { type: "highlight", quote: "A long-term engagement product earns trust when the next step remains clear even when a user is new, interrupted, locked out, or not yet eligible." },
        { type: "evidence", title: "CONFIRMED EDGE AND ACCESS STATES", columns: 3, items: [
          shot("authLogin", "Authentication", "HPF authentication state"),
          shot("waitlist", "Waitlist access", "HPF waitlist access state"),
          shot("streakInterrupted", "Interrupted streak", "HPF interrupted streak state"),
          shot("notifications", "Notification state", "HPF notification state"),
          shot("messageList", "Message list", "HPF message list state"),
          shot("addHabitState", "Habit configuration state", "HPF incomplete habit configuration"),
        ], caption: "These confirmed states cover authentication, restricted entry, interrupted progress, notifications, messaging, and incomplete habit configuration without inventing unavailable scenarios." },
      ],
    },
    {
      id: "ui-system",
      title: "UI System",
      intro: "The UI system is expressed through navigation, cards, progress and task states, buttons, inputs, bottom sheets, dialogs, carousels, community posts, course cards, achievements, and locked or empty states. Repeated patterns help a broad product feel coherent from daily action to long-form learning.",
      blocks: [
        { type: "cards", columns: 3, items: [
          ["Progress states", "Completion, streak, course, challenge, and achievement signals provide feedback across modules.", icon("line-chart")],
          ["Interaction patterns", "Buttons, forms, cards, and detail views support entry, selection, completion, and follow-up.", icon("edit")],
          ["Hierarchy", "Destination-level navigation and card grouping keep a broad ecosystem scannable on mobile.", icon("grid")],
          ["Status communication", "Access, verification, missed-habit, and incomplete states need labels and actions in addition to colour.", icon("warning")],
          ["Semantic iconography", "Outline icons support scanning inside the portfolio page without becoming decorative noise.", icon("task")],
        ] },
        { type: "evidence", title: "PRODUCT UI PATTERNS", columns: 3, items: [
          shot("addHabit", "Form fields", "HPF form fields"),
          shot("habitDetail", "Progress detail", "HPF progress detail"),
          shot("allHabits", "Task and habit cards", "HPF task and habit cards"),
          shot("communityFeed", "Community post", "HPF community post pattern"),
          shot("courseDetail", "Course card and state", "HPF course card and state"),
          shot("achievements", "Achievement state", "HPF achievement state"),
        ], caption: "The selected screens show recurring navigation, cards, progress, form controls, community content, course patterns, and achievement feedback at a readable size." },
      ],
    },
    {
      id: "impact",
      title: "Impact",
      intro: "No measured launch outcomes were included in the supplied source. The table therefore frames expected product value alongside proposed validation questions such as onboarding completion, first habit creation, daily completion, streak recovery, journal adoption, course enrollment, participation, and application conversion.",
      blocks: [
        { type: "table", headers: ["User or Product Problem", "Design Response", "Expected Product Value", "Proposed Validation Metric"], rows: [
          ["Fragmented development activities", "Connect habits, journal, learning, coaching, and community in one ecosystem.", "A clearer relationship between daily action and deeper support.", "Can users explain how each area supports their current goal?"],
          ["Difficulty resuming after missed habits", "Provide an earn-back-streak path and explicit missed-habit states.", "Lower effort to resume a disrupted routine.", "Do recovery states help users return after a missed day?"],
          ["Unclear next action", "Keep Today as the central daily destination.", "A more legible route into habits and current progress.", "Can a user identify the next action without navigating elsewhere?"],
          ["Low visibility of progress", "Use completion, calendar, learning, challenge, and achievement feedback.", "More visible progress across short and longer time horizons.", "Can users interpret their current status and what progress means?"],
          ["Complex feature ecosystem", "Use dedicated destinations for reflection, discovery, community, learning, and profile.", "Clearer discovery and lower cognitive load.", "Can users distinguish the purpose of each major destination?"],
          ["Different access levels", "Show free-tier and Apply to join HPF states explicitly.", "Transparent availability and a defined next step.", "Do restricted states communicate eligibility without confusion?"],
        ] },
        { type: "cards", columns: 2, items: [
          ["Flow Coverage", "Entry, daily habits, recovery, reflection, discovery, learning, community, and access states are represented.", icon("workflow")],
          ["System Coverage", "Habit, journal, coaching, content, community, learning, challenge, and profile surfaces work as one system.", icon("grid")],
          ["Validation Focus", "Recovery, support discovery, access clarity, and progress comprehension are appropriate usability-testing areas.", icon("line-chart")],
          ["Evidence Boundary", "No user numbers, conversion, retention, revenue, dates, or launch outcomes are presented as measured results.", icon("warning")],
        ] },
        { type: "evidence", title: "PRODUCT VALUE EVIDENCE", columns: 4, items: [
          shot("today", "Daily completion", "Daily completion in HPF Today", { crop: "today" }),
          shot("streakRecovery", "Recovery", "HPF streak recovery"),
          shot("courseState4", "Learning progression", "HPF learning progression"),
          shot("communityPosts", "Participation", "Participation through HPF community posts"),
        ], caption: "These representative screens connect the proposed validation areas to visible product behavior without introducing analytics or claiming measured outcomes." },
      ],
    },
    {
      id: "reflection",
      title: "Reflection",
      intro: "The central design task was maintaining a clear daily core inside a broad personal-development ecosystem. The next validation should test whether users understand the role of each destination, can resume after interruption, and can find the right level of social, learning, or coaching support.",
      blocks: [
        { type: "list", icon: icon("check"), items: [
          "A daily habit loop needs a visible home even when the product expands into several support systems.",
          "Recovery is a product behaviour: a missed action should lead to a clear and respectful next state.",
          "Content, coaching, learning, and community need purposeful entry points that do not compete with today’s practice.",
          "The next validation work should test how users understand module relationships and re-enter after interruption.",
        ] },
        { type: "evidence", title: "FINAL ECOSYSTEM SUMMARY", columns: 5, items: [
          shot("today", "Daily action", "Daily action in HPF Today", { crop: "today" }),
          shot("journal", "Reflection", "Reflection in HPF Journal"),
          shot("communityDetail", "Community", "Community support in HPF"),
          shot("learning", "Learning", "Structured learning in HPF"),
          shot("profile", "Profile and progress", "HPF profile and personal progress"),
        ], caption: "The final visual summary returns to the complete system: daily action, reflection, community support, structured learning, and personal progress." },
      ],
    },
    {
      id: "closing",
      title: "Closing Statement",
      toc: false,
      intro: "HPF connects daily action with reflection, structured learning, coaching, and community so personal development can be practiced as an ongoing system rather than a set of disconnected self-improvement tasks.",
      blocks: [
        { type: "highlight", quote: "Sustainable personal development comes from connecting daily action with reflection, support, and learning." },
      ],
    },
  ],
};
