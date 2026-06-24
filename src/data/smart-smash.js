const assetRoot = "./public/assets/study-smart-smash";
const image = (name) => `${assetRoot}/study-smart-smash-${name}.png`;
const icon = (name) => `${assetRoot}/icons/${name}.svg`;

const deviceGrid = (names, columns = 3, caption = "") => ({
  type: "imageGrid",
  columns,
  fit: "contain",
  variant: "device",
  caption,
  images: names.map(([name, alt]) => [image(name), alt]),
});

export const smartSmashCase = {
  title: "Smart Smash",
  label: "Case study,",
  subtitle: "A badminton session and payment management app for small playing groups.",
  next: "habit-tracker-app",
  sections: [
    {
      id: "overview",
      title: "Overview",
      intro: "Smart Smash is a mobile app designed for small badminton groups that need a clearer way to manage sessions, participants, shuttle usage, court fees, and unpaid balances. In many casual groups, one host still relies on notes, chat threads, or spreadsheets to calculate shared costs and follow up on payments. Smart Smash brings that fragmented workflow into one structured mobile flow.",
      blocks: [
        { type: "cards", columns: 2, items: [
          ["Session Management", "Create recurring sessions with court cost, shuttle usage, date, and participant data.", icon("task")],
          ["Player Management", "Support regular members, guests, participation states, and reusable profiles.", icon("user")],
          ["Cost Calculation", "Turn session expenses and player rules into explainable shared amounts.", icon("split-bill")],
          ["Payment Tracking", "See paid, deposited, partially paid, and remaining balances in one place.", icon("wallet")],
        ] },
        { type: "meta", rows: [
          ["Project", "Smart Smash", icon("task")],
          ["Product Type", "Mobile App", icon("grid")],
          ["Domain", "Sports, community finance, session management", icon("business-strategy")],
          ["Role", "Product Designer / Product BA", icon("user")],
          ["Platform", "iOS-first mobile app", icon("home")],
          ["Scope", "UX flow, UI design, information architecture, product logic, edge cases, payment tracking", icon("workflow")],
          ["Core Idea", "A lightweight operations tool for recurring badminton groups", icon("idea")],
          ["Key Challenge", "Make cost calculation simple for users while preserving financial accuracy and historical data integrity", icon("warning")],
        ] },
        { type: "highlight", quote: "Smart Smash turns badminton group management from scattered manual calculation into a structured session and payment workflow.", label: "Product direction" },
        { type: "chips", items: ["Session ops", "Shared costs", "Player profiles", "Stable history"] },
        deviceGrid([
          ["home", "Smart Smash home dashboard."],
          ["home-list", "Smart Smash session list."],
          ["session-detail", "Smart Smash session detail."],
        ], 3, "The home and session views show how Smart Smash consolidates recurring group operations into one mobile workflow."),
      ],
    },
    {
      id: "context",
      title: "Context",
      intro: "Badminton groups are casual, but the operational workflow is not. One host repeatedly coordinates court fees, shuttle usage, mixed player types, deposits, partial payments, and follow-up after every session.",
      blocks: [
        { type: "cards", columns: 2, items: [
          ["Before Smart Smash", "Chat threads, notes, spreadsheets, banking screenshots, and memory carry different parts of the workflow.", icon("document")],
          ["With Smart Smash", "Session data, player rules, costs, payment states, and history live in one focused product.", icon("document")],
          ["The Host Carries the Work", "One organizer books the court, adds players, calculates shares, records payments, and follows up.", icon("user")],
          ["A Focused Operational Tool", "The host needs quick answers: who joined, what it cost, who paid, and what remains unpaid.", icon("task")],
        ] },
        { type: "highlight", quote: "The product does not need to become a heavy finance system. It needs to make recurring coordination reliable.", label: "Context principle" },
      ],
    },
    {
      id: "problem",
      title: "Problem",
      intro: "The product challenge is not only recording who joined a badminton session. The harder problem is helping one host manage attendance changes, multiple pricing rules, and unpaid balances without introducing financial confusion.",
      blocks: [
        { type: "cards", columns: 2, items: [
          ["Repeated data entry", "Hosts often create sessions with the same court fee, shuttle price, and shuttle usage. Re-entering those fields every time adds friction.", icon("warning")],
          ["Unclear cost calculation", "When shared costs are summarized manually, players have little visibility into why they owe a specific amount.", icon("split-bill")],
          ["Unpaid balances are hard to track", "After each session, the host needs one place to see who paid, who deposited, and what remains unpaid.", icon("payment-failed")],
          ["Player changes can break old records", "Membership or gender-based pricing changes should affect future sessions without silently rewriting historical calculations.", icon("lock")],
        ] },
        { type: "note", title: "Historical Records Must Not Break", items: ["Profile and pricing changes apply forward. Completed sessions preserve the calculation context used at the time."] },
        { type: "highlight", quote: "The UX challenge was to design a casual sports app that also behaves like a reliable lightweight financial system.", label: "Core UX challenge" },
        deviceGrid([
          ["unpaid-list", "Smart Smash unpaid balance list."],
          ["invoice-detail", "Smart Smash invoice detail."],
          ["settings", "Smart Smash settings screen."],
        ], 3, "Cost visibility, payment follow-up, and invoice detail are central to the product problem Smart Smash is designed to solve."),
      ],
    },
    {
      id: "users",
      title: "Users",
      intro: "The primary user is the group host who creates sessions, manages player participation, calculates costs, and collects payments. Secondary users are regular players and guests whose status needs to stay accurate across sessions.",
      blocks: [
        { type: "profileCards", columns: 3, items: [
          ["Group Host", "Needs speed, accuracy, and a clear overview of what each session costs and what still needs to be collected.", ["Setup", "Balances"], icon("user")],
          ["Regular Player", "Needs a payment history that stays understandable even when membership rules or attendance change over time.", ["Amounts", "History"], icon("user")],
          ["Guest Player", "Needs to be added quickly during a live session while still following the correct guest pricing and discount logic.", ["Fast add", "Discounts"], icon("user")],
        ] },
        deviceGrid([
          ["player-list", "Smart Smash player list."],
          ["player-detail", "Smart Smash player profile."],
          ["player-edit", "Smart Smash player editing state."],
        ], 3, "Player management is treated as structured profile data, not just a loose participant list."),
      ],
    },
    {
      id: "strategy",
      title: "Strategy",
      intro: "The product strategy focuses on reducing manual work during live session management while protecting the calculation logic that keeps the group financially aligned.",
      blocks: [
        { type: "cards", columns: 2, items: [
          ["Reduce repeated input", "Frequently reused cost fields should be prefilled from the latest session so the host can start faster.", icon("task")],
          ["Make calculation logic visible", "The app should show enough cost structure for hosts and players to understand how shared amounts are derived.", icon("split-bill")],
          ["Keep operations fast during real sessions", "Adding players, changing participation, and updating payment state should stay lightweight in-session.", icon("workflow")],
          ["Protect historical accuracy", "Profile changes, deletions, and payment updates should not corrupt older financial records.", icon("lock")],
        ] },
        { type: "note", title: "Protect Historical Accuracy", items: ["Treat completed sessions as financial records so later profile or rule changes never rewrite the past."] },
        deviceGrid([
          ["home", "Smart Smash dashboard."],
          ["create-session", "Smart Smash session creation."],
          ["dashboard-settings", "Smart Smash group settings."],
        ], 3, "Dashboard, creation flow, and settings separate daily operations from reusable group rules."),
      ],
    },
    {
      id: "information-architecture",
      title: "Information Architecture",
      tocLabel: "IA",
      intro: "Smart Smash separates high-frequency session operations from low-frequency configuration, while keeping Home, Sessions, Players, Unpaid, and Settings easy to scan.",
      blocks: [
        { type: "flow", items: [["01", "Home"], ["02", "Sessions"], ["03", "Players"], ["04", "Unpaid List"], ["05", "Settings"], ["06", "Payment Account"], ["07", "Cost Rules"]] },
        { type: "cards", columns: 2, items: [
          ["Home", "Provides a monthly overview, calendar access, and recent sessions.", icon("home")],
          ["Session Detail", "Acts as the operational center for costs, player states, and final totals.", icon("task")],
          ["Player Profiles", "Stores stable player attributes such as type, gender, skill, and history.", icon("user")],
          ["Unpaid List", "Aggregates unpaid balances across sessions for easier follow-up.", icon("payment-failed")],
          ["Settings", "Keeps calculation rules, payment accounts, and pricing options out of the daily flow.", icon("grid")],
        ] },
        deviceGrid([
          ["home", "Smart Smash home information architecture."],
          ["player-list", "Smart Smash player information architecture."],
          ["invoice-detail", "Smart Smash payment information architecture."],
        ], 3, "The main modules map directly to the host's real operating loop: session management, people management, and payment follow-up."),
      ],
    },
    {
      id: "core-user-flow",
      title: "Core User Flow",
      tocLabel: "Flow",
      intro: "The primary workflow keeps session setup, player changes, cost review, and payment follow-up connected without forcing the host to leave the current operational context.",
      blocks: [
        { type: "flow", items: [["01", "Create session"], ["02", "Auto-fill repeated costs"], ["03", "Add players"], ["04", "Adjust participation"], ["05", "Review cost breakdown"], ["06", "Track unpaid balances"], ["07", "Collect payment"]] },
        deviceGrid([
          ["home", "Start from the Smart Smash dashboard."],
          ["player-list", "Manage players in Smart Smash."],
          ["invoice-detail", "Complete payment follow-up in Smart Smash."],
        ], 3, "The main modules map directly to the host's real operating loop: session management, people management, and payment follow-up."),
      ],
    },
    {
      id: "solution",
      title: "Solution",
      intro: "Smart Smash is designed around the host's real session flow: create the session, add players, calculate fairly, and collect what remains unpaid.",
      blocks: [
        { type: "cards", columns: 2, items: [
          ["Fast session creation", "New sessions reuse repeated cost fields from the latest record while the date stays context-aware.", icon("task")],
          ["Session cost dashboard", "One session view combines expenses, player states, and collection summaries in a single operational screen.", icon("split-bill")],
          ["Player management in context", "Hosts can add existing players or create a new profile without leaving the active session flow.", icon("user")],
          ["Unpaid balance tracking", "A dedicated unpaid list aggregates remaining balances by player so follow-up is faster and less manual.", icon("payment-failed")],
          ["Payment-ready invoice detail", "Invoice screens show breakdowns and payment account details so the app can support real collection behavior.", icon("receipt")],
        ] },
        { type: "highlight", quote: "Smart Smash is designed around the host's real workflow: create the session, add players, calculate fairly, and collect what remains unpaid.", label: "Solution direction" },
        deviceGrid([
          ["create-session", "Create a Smart Smash session."],
          ["add-existing-player", "Add an existing Smart Smash player."],
          ["quick-create-player", "Quick-create a new Smart Smash player."],
        ], 3, "Session setup and player addition are optimized for speed inside a live operating context."),
        deviceGrid([
          ["session-detail", "Review Smart Smash session costs."],
          ["unpaid-list", "Review unpaid Smart Smash balances."],
          ["invoice-detail", "Open Smart Smash invoice details."],
        ], 3, "The solution closes the loop by turning session management into structured payment follow-up."),
      ],
    },
    {
      id: "ux-decisions",
      title: "UX Decisions",
      intro: "Several product behaviors were intentionally designed to keep the app fast during real sessions while protecting the trustworthiness of the underlying calculation model.",
      blocks: [
        { type: "cards", columns: 2, items: [
          ["Auto-fill repeated fields, but not date", "Cost fields often repeat, but the date depends on how the host starts the flow. Smart Smash copies reusable values while keeping the session date action-based.", icon("edit")],
          ["Separate profile data from session data", "Stable player attributes belong to the profile, while attendance and payment adjustments belong to the session record.", icon("user")],
          ["Preserve history after profile changes", "Type conversions affect future sessions only so older calculations remain financially stable and explainable.", icon("lock")],
          ["Use modals for contextual operations", "Adding players, editing participation, and confirming destructive actions all happen without forcing the host to leave the current task.", icon("workflow")],
          ["Move advanced rules to Settings", "Rounding, guest pricing, female guest discounts, payment account details, and other calculation rules stay available without overloading session creation.", icon("grid")],
        ] },
        deviceGrid([
          ["create-session", "Smart Smash auto-filled session form."],
          ["participation-state", "Smart Smash participation state."],
          ["confirmation-state", "Smart Smash confirmation state."],
        ], 3, "UX decisions keep advanced logic visible when it matters, but out of the way when the host needs speed."),
        deviceGrid([
          ["rule-settings", "Smart Smash calculation rules."],
          ["dashboard-settings", "Smart Smash group settings."],
        ], 2, "Settings collect the deeper rules that support the financial model without turning daily operations into a heavy form."),
      ],
    },
    {
      id: "cost-logic",
      title: "Cost Calculation Logic",
      tocLabel: "Cost Logic",
      intro: "Even in a casual group, money-related behavior must be predictable. Smart Smash keeps the total expense visible, makes each player amount explainable, and preserves the rules used by completed sessions.",
      blocks: [
        { type: "chips", items: ["Court fee", "Tube price", "Shuttles used", "Player count", "Player type", "Guest rule", "Discount", "Rounding", "Paid amount", "Remaining"] },
        { type: "cards", columns: 2, items: [
          ["Keep Total Expense Visible", "Show court fee and shuttle cost before dividing the session into player-level amounts.", icon("split-bill")],
          ["Make Each Share Explainable", "Expose player count, player type, discounts, and rule context behind the amount.", icon("receipt")],
          ["Keep Remaining Amount Simple", "Use one clear relationship between total owed, paid amount, and outstanding balance.", icon("wallet")],
          ["Preserve Historical Context", "Completed sessions retain the player and pricing rules applied at that moment.", icon("lock")],
        ] },
        { type: "highlight", quote: "Total owed - Paid amount = Remaining amount", label: "Core balance relationship" },
      ],
    },
    {
      id: "player-management",
      title: "Player Management Logic",
      tocLabel: "Players",
      intro: "Reusable profiles hold identity and group attributes; each session stores participation, amount owed, paid amount, and remaining balance. This separation keeps the model flexible without rewriting history.",
      blocks: [
        { type: "cards", columns: 3, items: [
          ["Fixed and Guest Players", "Player type supports recurring members and occasional guests whose pricing may follow different group rules.", icon("user")],
          ["Future-Only Type Changes", "When a guest becomes fixed, the change applies to future sessions and is confirmed before saving.", icon("edit")],
          ["Deleted Profile Handling", "Deleting an active profile never removes the player name, amount, participation, or payment history from old sessions.", icon("lock")],
        ] },
        deviceGrid([
          ["player-list", "Smart Smash player selection."],
          ["player-detail", "Smart Smash player profile states."],
          ["player-edit", "Smart Smash player type editing."],
        ], 3, "Player selection and profile states show how reusable identity data stays separate from session-level participation and payment."),
      ],
    },
    {
      id: "payments",
      title: "Payment and Unpaid Tracking",
      tocLabel: "Payments",
      intro: "The workflow continues after the game. Smart Smash turns deposits, partial payments, and unpaid balances into explicit states the host can review and follow up.",
      blocks: [
        { type: "cards", columns: 2, items: [
          ["Paid", "The full player amount has been recorded and no balance remains.", icon("wallet")],
          ["Deposited or Partially Paid", "A recorded amount reduces the outstanding balance without hiding the original total owed.", icon("receipt")],
          ["Dedicated Unpaid List", "The host can scan who owes money, how much remains, and which session created the balance.", icon("payment-failed")],
          ["Payment-Ready Invoice", "One detail view combines player, session, total owed, paid amount, remaining balance, and payment account.", icon("receipt")],
        ] },
        { type: "highlight", quote: "A player who owes 50k and has paid 30k has a remaining balance of 20k.", label: "Example payment state" },
        deviceGrid([
          ["unpaid-list", "Smart Smash unpaid player list."],
          ["invoice-detail", "Smart Smash invoice and remaining balance."],
          ["settings", "Smart Smash payment account settings."],
        ], 3, "The unpaid list and invoice detail turn post-session payment follow-up into a visible, explainable task."),
      ],
    },
    {
      id: "settings",
      title: "Settings and Rule Management",
      tocLabel: "Settings",
      intro: "Group-level rules live outside the high-frequency session flow. This keeps creation fast while supporting different pricing, rounding, shuttle, discount, and payment-account conventions.",
      blocks: [
        { type: "cards", columns: 3, items: [
          ["Rounding Rule", "Controls how calculated player amounts are rounded for practical collection.", icon("grid")],
          ["Female Guest Discount", "Supports a group-specific discount without adding fields to every session.", icon("user")],
          ["Shuttles per Tube", "Defines how shuttle usage maps to tube quantity and cost.", icon("split-bill")],
          ["Payment Account", "Stores the account information presented in payment details.", icon("wallet")],
          ["Bank List", "Lets the host select and maintain the bank used for payment requests.", icon("receipt")],
          ["Guest Pricing Rule", "Controls how occasional players are charged relative to fixed members.", icon("business-strategy")],
        ] },
        { type: "highlight", quote: "Configuration is flexible, but changes apply forward so completed session records remain stable.", label: "Rule-management principle" },
        deviceGrid([
          ["home", "Smart Smash operational dashboard."],
          ["create-session", "Smart Smash daily session flow."],
          ["dashboard-settings", "Smart Smash low-frequency settings."],
        ], 3, "Dashboard, session creation, and Settings demonstrate the separation between daily operations and low-frequency rules."),
      ],
    },
    {
      id: "edge-cases",
      title: "Edge Cases",
      intro: "The product is designed around financial trust. Empty states, destructive actions, and history-preserving cases need explicit behavior so the host never loses confidence in the data.",
      blocks: [
        { type: "cards", columns: 2, items: [
          ["Empty session", "When no players have been added, the app shows a deliberate empty state instead of a blank or ambiguous list.", icon("warning")],
          ["Full session", "When the player limit is reached, the UI prevents accidental over-addition and communicates that the session is full.", icon("warning")],
          ["Deleted player profile", "Historical session details remain visible even if a player profile is deleted later.", icon("lock")],
          ["Delete session", "Deleting a session requires explicit confirmation because it removes financial and attendance data.", icon("payment-failed")],
          ["Player does not join", "A player can be marked as not participating in one session without changing the global profile.", icon("user")],
          ["Player type conversion", "Changing player type uses an explicit confirmation pattern because it affects future calculation behavior.", icon("edit")],
        ] },
        { type: "highlight", quote: "The product is designed around financial trust: the system should not silently change, delete, or recalculate important records without warning.", label: "Edge-case principle" },
        deviceGrid([
          ["empty-session", "Smart Smash empty session state."],
          ["full-session", "Smart Smash full session state."],
          ["confirmation-state", "Smart Smash history-sensitive confirmation."],
        ], 3, "Edge states are surfaced directly in the operational UI so the host can recover without leaving the session context."),
        deviceGrid([
          ["delete-session", "Smart Smash destructive session action."],
          ["not-joining", "Smart Smash non-participation state."],
        ], 2, "Destructive and history-sensitive actions use confirmation and persistence patterns that preserve trust in the record."),
      ],
    },
    {
      id: "ui-system",
      title: "UI System",
      intro: "The UI uses a clean mobile dashboard language with rounded cards, compact controls, and reusable component states so hosts can operate the app quickly before or after playing.",
      blocks: [
        { type: "chips", items: ["Dashboard cards", "Player cards", "Session cards", "Bottom navigation", "Input fields", "Segmented controls", "Search", "Empty states", "Bottom sheets", "Confirm modals"] },
        { type: "cards", columns: 3, items: [
          ["Card-based layout", "Cards make costs, sessions, and player states easier to scan at a glance.", icon("grid")],
          ["Bottom navigation", "Primary destinations stay reachable through a familiar mobile navigation pattern.", icon("home")],
          ["Modal-based editing", "Secondary actions stay contextual instead of sending users into deep nested pages.", icon("edit")],
          ["Compact controls", "Segmented choices work better than dropdowns for small, repeated rule sets.", icon("workflow")],
          ["Clear destructive states", "Conversion and deletion actions are visually separated and explicitly confirmed.", icon("warning")],
        ] },
        deviceGrid([
          ["input-states", "Smart Smash input field states."],
          ["confirmation-modal", "Smart Smash confirmation modal."],
          ["bottom-bar-states", "Smart Smash bottom navigation states."],
          ["bill-card-states", "Smart Smash player bill card states."],
        ], 2, "Smart Smash component references show reusable input fields, bottom bar variants, player bill states, and confirmation modal patterns that inform the production screens."),
      ],
    },
    {
      id: "impact",
      title: "Impact",
      intro: "The expected impact is framed as a product hypothesis because this case study focuses on product definition, UX logic, and interface design rather than measured post-launch analytics.",
      blocks: [
        { type: "table", headers: ["Problem", "Design Response", "Expected Product Value", "Proposed Metric"], rows: [
          ["Repeated session setup", "Auto-fill recurring cost fields from the latest session.", "Faster session creation.", "Time to create a session"],
          ["Manual cost calculation", "Use structured cost inputs and a visible breakdown.", "Clearer payment logic.", "Number of payment corrections"],
          ["Unpaid balances are hard to track", "Provide an unpaid list and invoice detail.", "Easier payment follow-up.", "Percentage of balances resolved"],
          ["Player type changes may affect old records", "Apply type changes to future sessions only.", "Better historical accuracy.", "Unexpected recalculations"],
          ["Guest players join unexpectedly", "Quick-create a player inside the session flow.", "Faster real-session operation.", "Time to add a new player"],
          ["Complex pricing rules", "Move pricing and payment rules into Settings.", "Simpler session creation.", "Fields required per session"],
        ] },
        { type: "metrics", items: [
          ["Efficiency", "Operational speed", "Time required to create a new session\nManual fields entered per session\nTime required to add a player\nTime required to find unpaid balances", icon("line-chart")],
          ["Accuracy", "Calculation quality", "Payment calculation corrections per session\nMissed unpaid players\nAccidental duplicate player profiles", icon("line-chart")],
          ["Adoption", "Product usage", "Sessions created per week\nPercentage using auto-filled cost fields\nPlayers with complete profiles", icon("line-chart")],
          ["Trust", "Financial confidence", "Confidence in payment calculation\nUnderstanding of why each amount is owed\nManual recalculation outside the app", icon("line-chart")],
        ] },
      ],
    },
    {
      id: "reflection",
      title: "Reflection",
      intro: "Smart Smash showed how a simple sports utility can contain complex operational logic. Designing the interface required designing the rules behind auto-fill, player changes, payment states, deletion, and historical records at the same time.",
      blocks: [
        { type: "list", icon: icon("check"), items: [
          "Simple workflows can hide complex logic.",
          "Financial trust depends on predictable behavior.",
          "UX and business logic must be designed together.",
          "Edge cases are part of the core experience.",
        ] },
        deviceGrid([
          ["session-detail", "Final Smart Smash session detail."],
          ["invoice-detail", "Final Smart Smash invoice detail."],
          ["dashboard-settings", "Final Smart Smash settings direction."],
        ], 3, "The final product direction balances a clean operational UI with rules that support long-term trust in the data."),
      ],
    },
    {
      id: "closing",
      title: "Closing Statement",
      toc: false,
      intro: "Smart Smash turns a small but repetitive real-world workflow into a structured mobile system. Session management, player rules, payment tracking, cost calculation, settings, and edge-case handling work together in one focused product experience.",
      blocks: [
        { type: "highlight", quote: "Less time managing logistics. More confidence running the group.", label: "Smart Smash" },
      ],
    },
  ],
};

export const smartSmashCardImage = image("card");
