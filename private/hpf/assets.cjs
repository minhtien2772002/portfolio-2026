const publicThumbnailRoot = "./public/images/study-cases/hpf";
const protectedAssetUrl = (file) => `/api/hpf/assets?name=${encodeURIComponent(file)}`;

const screen = (file, width, height, sourceNode, usages) => ({
  src: protectedAssetUrl(`${file}.webp`),
  srcset: width > 188
    ? `${protectedAssetUrl(`${file}-sm.webp`)} 188w, ${protectedAssetUrl(`${file}.webp`)} ${width}w`
    : `${protectedAssetUrl(`${file}.webp`)} ${width}w`,
  sizes: "(max-width: 520px) min(100vw - 48px, 375px), (max-width: 900px) 30vw, 215px",
  width,
  height,
  sourceNode,
  usages,
});

const hpfAssets = {
  thumbnail: {
    src: `${publicThumbnailRoot}/hpf-thumbnail.webp`,
    srcset: `${publicThumbnailRoot}/hpf-thumbnail-sm.webp 640w, ${publicThumbnailRoot}/hpf-thumbnail.webp 1280w, ${publicThumbnailRoot}/hpf-thumbnail-lg.webp 2560w`,
    sizes: "(max-width: 720px) 100vw, (max-width: 1180px) 90vw, 1152px",
    width: 1280,
    height: 719,
    sourceNode: "897:5990",
    usages: ["case-study listing", "open graph preview"],
  },
  today: screen("today", 467, 1024, "2673:80906", ["overview", "context", "strategy", "information architecture", "core flows", "today and habits", "impact", "reflection"]),
  journal: screen("journal", 375, 812, "2673:81124", ["overview", "information architecture", "core flows", "journal and mood", "reflection"]),
  communityFeed: screen("community-feed", 375, 812, "2850:94604", ["overview", "information architecture", "community and learning", "ui system"]),
  learning: screen("learning", 375, 885, "2673:81887", ["overview", "context", "strategy", "information architecture", "core flows", "solution", "community and learning", "reflection"]),
  profile: screen("profile", 375, 812, "4289:116912", ["overview", "context", "users", "information architecture", "reflection"]),
  achievements: screen("achievements", 375, 842, "3379:156438", ["overview", "strategy", "solution", "ui system"]),
  communityDetail: screen("community-detail", 375, 812, "2850:96651", ["context", "strategy", "solution", "community and learning", "reflection"]),
  authLogin: screen("auth-login", 375, 812, "2732:135051", ["problem", "users", "edge cases"]),
  streakInterrupted: screen("streak-interrupted", 375, 812, "2884:129852", ["problem", "core flows", "today and habits", "edge cases"]),
  waitlist: screen("waitlist", 375, 812, "3590:33732", ["problem", "users", "ux decisions", "edge cases"]),
  notifications: screen("notifications", 359, 1024, "2673:81374", ["problem", "information architecture", "today and habits", "edge cases"]),
  addHabitState: screen("add-habit-state", 375, 812, "4128:144393", ["problem", "core flows", "today and habits", "edge cases"]),
  streakRecovery: screen("streak-recovery", 375, 812, "2732:136788", ["strategy", "core flows", "solution", "ux decisions", "today and habits", "impact"]),
  messageList: screen("message-list", 375, 812, "3667:28674", ["information architecture", "community and learning", "edge cases"]),
  allHabits: screen("all-habits", 375, 804, "2850:92847", ["information architecture", "core flows", "today and habits", "ui system"]),
  splash: screen("splash", 375, 812, "862:6000", ["core flows"]),
  getStarted: screen("get-started", 375, 812, "862:6008", ["core flows"]),
  createAccount: screen("create-account", 375, 812, "862:6016", ["core flows"]),
  coachIntroduction: screen("coach-introduction", 375, 812, "862:6024", ["core flows"]),
  focusQuestion: screen("focus-question", 375, 812, "862:6032", ["core flows"]),
  planGeneration: screen("plan-generation", 375, 812, "862:6040", ["core flows"]),
  todayDashboard: screen("today-dashboard", 375, 812, "862:6048", ["core flows"]),
  addHabit: screen("add-habit", 375, 812, "2673:80310", ["core flows", "ux decisions", "today and habits", "ui system"]),
  habitDetail: screen("habit-detail", 375, 874, "2673:80995", ["core flows", "ux decisions", "today and habits", "ui system"]),
  journalEntry: screen("journal-entry", 375, 812, "2673:82836", ["core flows", "journal and mood"]),
  journalUpdatedToday: screen("journal-updated-today", 375, 879, "2673:82891", ["core flows", "journal and mood"]),
  courseList: screen("course-list", 375, 1004, "2673:81864", ["core flows", "community and learning"]),
  course: screen("course", 375, 892, "2673:81583", ["core flows", "community and learning"]),
  lessonVideo: screen("lesson-video", 375, 812, "2673:81832", ["core flows", "community and learning"]),
  courseDetail: screen("course-detail", 375, 812, "2673:81912", ["core flows", "community and learning", "ui system"]),
  noHabitsState: screen("no-habits-state", 375, 812, "854:6009", ["today and habits"]),
  explore: screen("explore", 155, 1024, "2673:81496", ["explore and coaching"]),
  blog: screen("blog", 156, 1024, "2673:81560", ["explore and coaching"]),
  communityPosts: screen("community-posts", 375, 812, "2673:82600", ["community and learning", "impact"]),
  communityComposer: screen("community-composer", 375, 812, "2673:82548", ["community and learning"]),
  communityPostDetail: screen("community-post-detail", 375, 812, "2673:82529", ["community and learning"]),
  communityTribe: screen("community-tribe", 352, 1024, "4251:108376", ["ux decisions", "community and learning"]),
  communityMessage: screen("community-message", 375, 946, "2673:82638", ["community and learning"]),
  conversation: screen("conversation", 375, 812, "2673:81393", ["community and learning"]),
  messageState: screen("message-state", 375, 812, "3433:1122007", ["community and learning"]),
  courseState2: screen("course-state-2", 375, 892, "4128:147972", ["community and learning"]),
  courseState3: screen("course-state-3", 375, 892, "3602:131575", ["community and learning"]),
  courseState4: screen("course-state-4", 375, 892, "4256:115010", ["community and learning", "impact"]),
  courseState5: screen("course-state-5", 375, 892, "4986:137845", ["community and learning"]),
};

const hpfAssetManifest = Object.entries(hpfAssets).map(([name, asset]) => ({ name, ...asset }));

module.exports = { hpfAssets, hpfAssetManifest };
