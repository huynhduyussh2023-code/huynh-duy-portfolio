/**
 * All portfolio content lives here, so page/components only deal with layout.
 * Text that is identical in both languages (titles, tags, links, dates) is
 * defined once; only the translated parts are kept per language.
 */

export type Lang = "vi" | "en";

/* ---------- Site-wide constants ---------- */

export const SITE = {
  name: "Nguyễn Hữu Huỳnh Duy",
  email: "huynhduyussh2023@gmail.com",
  phoneDisplay: "0942-048-922",
  phoneHref: "tel:+84942048922",
  portrait: "/anhcv.jpg",
} as const;

export const SECTION_IDS = [
  "home",
  "about",
  "skills",
  "experience",
  "works",
  "contact",
] as const;
export type SectionId = (typeof SECTION_IDS)[number];

export const STATS = [
  { value: "404.92M", label: "VND · MERACLE SPONSORSHIP VALUE" },
  { value: "100K+", label: "YOUTHSPEAK FANPAGE FOLLOWERS" },
] as const;

/* ---------- Types ---------- */

export interface SkillGroup {
  title: string;
  items: string[];
}

type ExperienceId = "hoi-thanh" | "meracle" | "youthspeak" | "bach-hoa";
interface ExperienceBase {
  id: ExperienceId;
  date: string;
  /** Short label shown in the popup when there is no photo gallery. */
  art: string;
  images: readonly string[];
}
interface ExperienceText {
  name: string;
  role: string;
  desc: string;
}
export type Experience = ExperienceBase & ExperienceText;

type ProjectId =
  | "strongbow"
  | "creative-pulse"
  | "hayday"
  | "my-nam"
  | "232-tuoi"
  | "sap-ngua";
interface ProjectBase {
  id: ProjectId;
  title: string;
  art: string;
  tags: readonly string[];
  link?: string;
  /** Photos shown in the popup; the first one is also the card cover. */
  images: readonly string[];
}
interface ProjectText {
  course: string;
  role: string;
  desc: string;
  linkLabel?: string;
}
export type Project = ProjectBase & ProjectText;

export interface Copy {
  nav: Record<SectionId, string>;
  role: string;
  eyebrow: string;
  hero: { line1: string; accent: string; line3: string };
  intro: string;
  cta: string;
  about: { title: string; text: string };
  skills: {
    title: string;
    sub: string;
    groups: SkillGroup[];
    languageLabel: string;
    languageText: string;
  };
  experience: { title: string; items: Experience[] };
  works: { title: string; sub: string; items: Project[] };
  contact: { title: string; text: string; location: string };
  footer: string;
  courseLabel: string;
  a11y: {
    menu: string;
    close: string;
    prev: string;
    next: string;
    switchLang: string;
    portraitAlt: string;
  };
}

/* ---------- Shared (language-independent) data ---------- */

/**
 * PHOTOS — how to add images
 * 1. Put the files in /public/images/<folder>/
 * 2. List the file names below. The first photo of a project is its card cover.
 * An empty list is fine: the popup then shows the text-only card instead.
 */
const photos = (folder: string, files: readonly string[]) =>
  files.map((file) => `${folder}/${file}`);

const experienceBase: readonly ExperienceBase[] = [
  {
    id: "hoi-thanh",
    date: "01/2026 — 07/2026",
    art: "HỒI THANH",
    // NOTE: the folder name is repeated on purpose to match the current files
    // in /public. If photos do not show, check this path first.
    images: photos("/images/hoi-thanh/images/hoi-thanh", [
      "W2.jpg",
      "W.jpg",
      "W1.jpg",
      "W3.jpg",
      "W4.jpg",
    ]),
  },
  {
    id: "meracle",
    date: "01/2026 — 06/2026",
    art: "MERACLE",
    images: photos("/images/meracle", []), // e.g. ["1.jpg", "2.jpg"]
  },
  {
    id: "youthspeak",
    date: "03/2025 — 07/2025",
    art: "YOUTHSPEAK",
    images: photos("/images/youthspeak", []),
  },
  {
    id: "bach-hoa",
    date: "03/2025",
    art: "BÁCH HOA",
    images: photos("/images/bach-hoa", []),
  },
];

const projectBase: readonly ProjectBase[] = [
  {
    id: "strongbow",
    title: "STRONGBOW — CỨ CHILL THÔI",
    art: "STILL",
    tags: ["Creative Direction", "Project Management", "Photography"],
    images: photos("/images/strongbow", []),
  },
  {
    id: "creative-pulse",
    title: "VIỆT NAM CREATIVE PULSE",
    art: "PULSE",
    tags: ["Digital Strategy", "Branding", "SEO", "AI Design"],
    images: photos("/images/creative-pulse", []),
  },
  {
    id: "hayday",
    title: "HAYDAY KOMBUCHA — VINAMILK",
    art: "FRESH",
    tags: ["Brand Research", "Big Idea", "Advertising"],
    images: photos("/images/hayday", []),
  },
  {
    id: "my-nam",
    title: "GÕ CỬA NHÀ MỸ NAM",
    art: "INTERACTIVE",
    tags: ["Web Design", "Moodboard", "Visual Content"],
    link: "https://gocuanhamynam.vercel.app",
    images: photos("/images/my-nam", []),
  },
  {
    id: "232-tuoi",
    title: "232 TUỔI — THE FLOB × CHUPA CHUPS",
    art: "MOTION",
    tags: ["Music Video", "Production", "Casting"],
    link: "https://drive.google.com/file/d/1bsmt0bQbmOt5PXVZ6sFqpF9Eqeidf0FD/view?usp=drivesdk",
    images: photos("/images/232-tuoi", []),
  },
  {
    id: "sap-ngua",
    title: "SẤP NGỬA",
    art: "STORY",
    tags: ["Short Film", "Scriptwriting", "Casting"],
    link: "https://drive.google.com/file/d/1nU1vaTUKrXLQzCJa02v4s6DuEjlXkKVd/view?usp=drivesdk",
    images: photos("/images/sap-ngua", []),
  },
];

function mergeById<K extends string, B extends { id: K }, T>(
  base: readonly B[],
  text: Record<K, T>,
): Array<B & T> {
  return base.map((item) => ({ ...item, ...text[item.id] }));
}

/* ---------- Vietnamese ---------- */

const experienceVi: Record<ExperienceId, ExperienceText> = {
  "hoi-thanh": {
    name: "HỒI THANH",
    role: "Trưởng Dự án",
    desc: "Dự án truyền thông phối hợp cùng Nhà hát Nghệ thuật Hát Bội TP. Hồ Chí Minh. Điều hành kế hoạch truyền thông tổng thể, định hướng nội dung TikTok, điều phối sản xuất và kết nối các bên liên quan. Dự án nhận được sự chú ý từ TikToker Bé Bảy (hơn 1,7 triệu người theo dõi).",
  },
  meracle: {
    name: "MERACLE",
    role: "Phó Ban Đối ngoại",
    desc: "Xây dựng gói tài trợ, kết nối và đàm phán với đối tác, phối hợp triển khai quyền lợi tài trợ. Gây quỹ thành công tổng giá trị 404,92 triệu đồng, bao gồm tiền mặt và hiện vật.",
  },
  youthspeak: {
    name: "YOUTHSPEAK",
    role: "Tổ chức sự kiện & Quản lý người tham dự",
    desc: "Quản lý fanpage hơn 100.000 người theo dõi; tư vấn, giải đáp và hỗ trợ đăng ký vé. Phân loại dữ liệu người tham dự, trực tiếp hỗ trợ đại biểu và phối hợp vận hành sự kiện.",
  },
  "bach-hoa": {
    name: "BÁCH HOA BỘ HÀNH TP.HCM",
    role: "Cộng tác viên Ban Sản xuất",
    desc: "Hỗ trợ công tác sản xuất và điều phối, phối hợp cùng đội ngũ để đảm bảo quá trình triển khai sự kiện.",
  },
};

const projectsVi: Record<ProjectId, ProjectText> = {
  strongbow: {
    course: "Nhiếp ảnh",
    role: "Project Leader",
    desc: "Thực hiện bộ ảnh quảng bá thương hiệu nước trái cây lên men Strongbow. Lên ý tưởng, phân công công việc, kiểm soát chất lượng quá trình thực hiện và tham gia hậu kỳ.",
  },
  "creative-pulse": {
    course: "Digital Marketing",
    role: "Creative & Marketing Planning",
    desc: "Đóng vai agency xây dựng chương trình kỷ niệm Ngày Văn hóa Việt Nam. Tham gia phát triển ý tưởng tổng thể, nghiên cứu insight, Customer Journey, POE Matrix, SEO, đề xuất Execution và KPI; lên ý tưởng website, logo và Key Visual ứng dụng AI.",
  },
  hayday: {
    course: "Quảng cáo",
    role: "Campaign Planning",
    desc: "Xây dựng proposal chiến dịch quảng bá sản phẩm Kombucha HayDay. Nghiên cứu bối cảnh mạng xã hội, định vị thương hiệu, đối thủ, USP và khách hàng mục tiêu; đóng góp Big Idea, kế hoạch triển khai và bài viết báo chí.",
  },
  "my-nam": {
    course: "Thiết kế và Quản trị Website",
    role: "Website Concept & Design",
    desc: "Thiết kế website quảng bá phim tương tác do Yeah1 và Mango TV sản xuất. Phụ trách ý tưởng, moodboard, nghiên cứu nội dung phim, thiết kế website và các materials.",
    linkLabel: "Mở website",
  },
  "232-tuoi": {
    course: "Đồ án 2: Sản xuất Sản phẩm Nghe - Nhìn",
    role: "Creative & Production Team",
    desc: "Thực hiện MV remake lồng ghép quảng cáo Chupa Chups. Phát triển ý tưởng và Big Idea, liên hệ The Flob, phụ trách các vấn đề âm nhạc; tham gia lựa chọn trang phục, tìm kiếm và casting diễn viên, chọn địa điểm quay và góp ý hậu kỳ.",
    linkLabel: "Xem MV",
  },
  "sap-ngua": {
    course: "Công tác Đạo diễn",
    role: "Concept & Scriptwriting",
    desc: "Phim ngắn 15 phút thuộc chủ đề tâm lý – xã hội. Phát triển ý tưởng, chủ đề tư tưởng, logline và kịch bản chi tiết; đảm nhận lựa chọn, casting diễn viên và góp ý hậu kỳ.",
    linkLabel: "Xem phim",
  },
};

const vi: Copy = {
  nav: {
    home: "TRANG CHỦ",
    about: "VỀ TÔI",
    skills: "KỸ NĂNG",
    experience: "KINH NGHIỆM",
    works: "DỰ ÁN",
    contact: "LIÊN HỆ",
  },
  role: "MARKETING & PR INTERN",
  eyebrow: "PORTFOLIO CÁ NHÂN · 2026",
  hero: { line1: "Sáng tạo.", accent: "Chuyên nghiệp.", line3: "Trách nhiệm." },
  intro:
    "Sinh viên năm cuối ngành Truyền thông đa phương tiện, được đào tạo bài bản về Marketing, Xây dựng thương hiệu và Quan hệ công chúng. Có kinh nghiệm tham gia các dự án truyền thông và hoạt động ngoại khóa.",
  cta: "Khám phá dự án",
  about: {
    title: "Tôi là Huỳnh Duy",
    text: "Tôi định hướng phát triển trong lĩnh vực Marketing và Truyền thông, với sự quan tâm đặc biệt đến chiến lược thương hiệu, sáng tạo nội dung và cách thương hiệu kết nối với công chúng. Tôi có khả năng xây dựng kế hoạch truyền thông tích hợp (IMC), xử lý các vấn đề truyền thông và triển khai chiến lược thương hiệu. Chủ động, sáng tạo, linh hoạt và luôn nỗ lực học hỏi để hoàn thiện bản thân.",
  },
  skills: {
    title: "Kỹ năng & chuyên môn",
    sub: "Kết hợp tư duy chiến lược, sáng tạo và năng lực triển khai.",
    groups: [
      {
        title: "MARKETING & COMMUNICATION",
        items: [
          "Lập kế hoạch Marketing truyền thông",
          "Lập kế hoạch IMC",
          "Lập kế hoạch PR",
          "Sáng tạo nội dung",
          "Viết thông cáo báo chí",
        ],
      },
      {
        title: "CREATIVE & PRODUCTION",
        items: ["Quản trị sự kiện", "Quan hệ đối ngoại", "Xây dựng kịch bản phim ngắn"],
      },
      {
        title: "DIGITAL TOOLS",
        items: ["Canva", "CapCut", "Adobe Photoshop (cơ bản)", "Microsoft Office (cơ bản)"],
      },
    ],
    languageLabel: "NGOẠI NGỮ",
    languageText: "Tiếng Anh – Khả năng giao tiếp",
  },
  experience: {
    title: "Kinh nghiệm & dấu ấn",
    items: mergeById(experienceBase, experienceVi),
  },
  works: {
    title: "Dự án tiêu biểu",
    sub: "Một số dự án thể hiện năng lực hoạch định, sáng tạo và triển khai.",
    items: mergeById(projectBase, projectsVi),
  },
  contact: {
    title: "Cùng kết nối nhé.",
    text: "Bạn đang tìm kiếm một cộng sự Marketing & PR nhiệt huyết? Hãy liên hệ với tôi.",
    location: "TP. Hồ Chí Minh",
  },
  footer: "Được tạo bằng sự tò mò, sáng tạo và tinh thần không ngừng học hỏi.",
  courseLabel: "HỌC PHẦN",
  a11y: {
    menu: "Mở menu",
    close: "Đóng",
    prev: "Ảnh trước",
    next: "Ảnh tiếp theo",
    switchLang: "Switch to English",
    portraitAlt: "Huỳnh Duy – Marketing & PR",
  },
};

/* ---------- English ---------- */

const experienceEn: Record<ExperienceId, ExperienceText> = {
  "hoi-thanh": {
    name: "HỒI THANH",
    role: "Project Lead",
    desc: "A social media communications project in collaboration with Ho Chi Minh City Hat Boi Art Theater. Led the overall communications plan, TikTok content direction, production coordination, and stakeholder relationships. The project gained attention from TikToker Bé Bảy (1.7M+ followers).",
  },
  meracle: {
    name: "MERACLE",
    role: "Deputy Head of External Relations",
    desc: "Developed sponsorship packages, connected and negotiated with partners, and coordinated sponsor benefits. Successfully secured VND 404.92 million in cash and in-kind sponsorships.",
  },
  youthspeak: {
    name: "YOUTHSPEAK",
    role: "Event Organization & Delegate Management",
    desc: "Managed a fanpage with 100,000+ followers; advised attendees, answered inquiries, and supported ticket registration. Organized delegate data and provided on-site event support.",
  },
  "bach-hoa": {
    name: "BÁCH HOA BỘ HÀNH HCMC",
    role: "Production Team Collaborator",
    desc: "Supported production and event coordination, working with the team to ensure smooth execution.",
  },
};

const projectsEn: Record<ProjectId, ProjectText> = {
  strongbow: {
    course: "Photography",
    role: "Project Leader",
    desc: "Created a promotional photography series for Strongbow fermented fruit beverage. Developed the concept, assigned tasks, quality-checked execution, and contributed to post-production.",
  },
  "creative-pulse": {
    course: "Digital Marketing",
    role: "Creative & Marketing Planning",
    desc: "Took on an agency role to develop a program celebrating Vietnamese Culture Day. Contributed to the overall concept, audience insights, Customer Journey, POE Matrix, SEO, Execution and KPI proposals, as well as the website concept, logo, and AI-assisted Key Visual.",
  },
  hayday: {
    course: "Advertising",
    role: "Campaign Planning",
    desc: "Developed an advertising campaign proposal for HayDay Kombucha. Researched social context, brand positioning, competitors, USP, and target audience; contributed to the Big Idea, campaign rollout plan, and press content.",
  },
  "my-nam": {
    course: "Website Design and Administration",
    role: "Website Concept & Design",
    desc: "Designed a promotional website for the interactive film produced by Yeah1 and Mango TV. Developed the concept and moodboard, researched the film, and created the website and its visual materials.",
    linkLabel: "Open website",
  },
  "232-tuoi": {
    course: "Project 2: Audio - Visual Production",
    role: "Creative & Production Team",
    desc: "Produced a remake music video integrating a Chupa Chups advertisement. Developed the concept and Big Idea, liaised with The Flob on music-related matters, and contributed to styling, casting, location scouting, and post-production feedback.",
    linkLabel: "Watch MV",
  },
  "sap-ngua": {
    course: "Introduction to Film Directing",
    role: "Concept & Scriptwriting",
    desc: "A 15-minute psychological-social short film. Developed the concept, central theme, logline, and detailed screenplay; took part in actor selection and casting, and provided post-production feedback.",
    linkLabel: "Watch film",
  },
};

const en: Copy = {
  nav: {
    home: "HOME",
    about: "ABOUT ME",
    skills: "SKILLS & EXPERTISE",
    experience: "EXPERIENCE & ACHIEVEMENTS",
    works: "SELECTED WORKS",
    contact: "CONTACT",
  },
  role: "MARKETING & PR INTERN",
  eyebrow: "PERSONAL PORTFOLIO · 2026",
  hero: { line1: "Creative.", accent: "Professional.", line3: "Responsible." },
  intro:
    "A final-year Multimedia Communications student with academic training in Marketing, Branding, and Public Relations. Experienced in communication projects and extracurricular activities.",
  cta: "Explore projects",
  about: {
    title: "Hello, I'm Huỳnh Duy",
    text: "I aspire to grow in Marketing and Communications, with a particular interest in brand strategy, content creation, and the ways brands connect with audiences. Skilled in developing Integrated Marketing Communications (IMC) plans, addressing communication challenges, and executing brand strategies. Proactive, creative, and adaptable, with a strong commitment to continuous learning and professional growth.",
  },
  skills: {
    title: "Skills & Expertise",
    sub: "Bringing together strategic thinking, creativity, and execution.",
    groups: [
      {
        title: "MARKETING & COMMUNICATION",
        items: [
          "Marketing Communications Planning",
          "Integrated Marketing Communications (IMC) Planning",
          "Public Relations Planning",
          "Content Creation",
          "Press Release Writing",
        ],
      },
      {
        title: "CREATIVE & PRODUCTION",
        items: ["Event Management", "External Relations", "Short Film Scriptwriting"],
      },
      {
        title: "DIGITAL TOOLS",
        items: ["Canva", "CapCut", "Adobe Photoshop (Basic)", "Microsoft Office (Basic)"],
      },
    ],
    languageLabel: "LANGUAGE",
    languageText: "English – Conversational proficiency",
  },
  experience: {
    title: "Experience & Achievements",
    items: mergeById(experienceBase, experienceEn),
  },
  works: {
    title: "Selected Works",
    sub: "Projects demonstrating strategic planning, creativity, and execution.",
    items: mergeById(projectBase, projectsEn),
  },
  contact: {
    title: "Let's connect.",
    text: "Looking for a passionate Marketing & PR collaborator? Feel free to get in touch.",
    location: "Ho Chi Minh City, Vietnam",
  },
  footer: "Made with curiosity, creativity, and a commitment to keep learning.",
  courseLabel: "COURSE",
  a11y: {
    menu: "Open menu",
    close: "Close",
    prev: "Previous photo",
    next: "Next photo",
    switchLang: "Chuyển sang Tiếng Việt",
    portraitAlt: "Huỳnh Duy – Marketing & PR",
  },
};

export const content: Record<Lang, Copy> = { vi, en };
