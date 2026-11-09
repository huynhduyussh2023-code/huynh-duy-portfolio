"use client";

import { useState } from "react";

type Lang = "vi" | "en";

const copy = {
  vi: {
    nav: ["Trang chủ", "Giới thiệu", "Kỹ năng", "Dự án tiêu biểu", "Kinh nghiệm", "Liên hệ"],
    role: "MARKETING & PR INTERN",
    eyebrow: "PORTFOLIO CÁ NHÂN · 2026",
    hero1: "Sáng tạo.",
    hero2: "Chuyên nghiệp.",
    hero3: "Trách nhiệm.",
    intro: "Sinh viên năm cuối ngành Truyền thông đa phương tiện, được đào tạo bài bản về Marketing, Xây dựng thương hiệu và Quan hệ công chúng. Có kinh nghiệm tham gia các dự án truyền thông và hoạt động ngoại khóa.",
    cta: "Khám phá dự án",
    about: "Tôi là Huỳnh Duy",
    aboutText: "Tôi định hướng phát triển trong lĩnh vực Marketing và Truyền thông, với sự quan tâm đặc biệt đến chiến lược thương hiệu, sáng tạo nội dung và cách thương hiệu kết nối với công chúng. Tôi có khả năng xây dựng kế hoạch truyền thông tích hợp (IMC), xử lý các vấn đề truyền thông và triển khai chiến lược thương hiệu. Chủ động, sáng tạo, linh hoạt và luôn nỗ lực học hỏi để hoàn thiện bản thân.",
    skillsTitle: "Kỹ năng & chuyên môn",
    skillsSub: "Kết hợp tư duy chiến lược, sáng tạo và năng lực triển khai.",
    skillGroups: [
      ["MARKETING & COMMUNICATION", ["Lập kế hoạch Marketing truyền thông", "Lập kế hoạch IMC", "Lập kế hoạch PR", "Sáng tạo nội dung", "Viết thông cáo báo chí"]],
      ["CREATIVE & PRODUCTION", ["Quản trị sự kiện", "Quan hệ đối ngoại", "Xây dựng kịch bản phim ngắn"]],
      ["DIGITAL TOOLS", ["Canva", "CapCut", "Adobe Photoshop (cơ bản)", "Microsoft Office (cơ bản)"]],
    ],
    language: "NGOẠI NGỮ", languageText: "Tiếng Anh – Khả năng giao tiếp",
    worksTitle: "Dự án tiêu biểu",
    worksSub: "Một số dự án thể hiện năng lực hoạch định, sáng tạo và triển khai.",
    experienceTitle: "Kinh nghiệm & dấu ấn",
    contactTitle: "Cùng kết nối nhé.",
    contactText: "Bạn đang tìm kiếm một cộng sự Marketing & PR nhiệt huyết? Hãy liên hệ với tôi.",
    location: "TP. Hồ Chí Minh",
    email: "Gửi email", phone: "Gọi điện", footer: "Được tạo bằng sự tò mò, sáng tạo và tinh thần không ngừng học hỏi.",
    view: "Xem sản phẩm", roleLabel: "VAI TRÒ", course: "HỌC PHẦN",
    exp: [
      { name: "HỒI THANH", role: "Trưởng Dự án", date: "01/2026 — 07/2026", desc: "Dự án truyền thông phối hợp cùng Nhà hát Nghệ thuật Hát Bội TP. Hồ Chí Minh. Điều hành kế hoạch truyền thông tổng thể, định hướng nội dung TikTok, điều phối sản xuất và kết nối các bên liên quan. Dự án nhận được sự chú ý từ TikToker Bé Bảy (hơn 1,7 triệu người theo dõi)." },
      { name: "MERACLE", role: "Phó Ban Đối ngoại", date: "01/2026 — 06/2026", desc: "Xây dựng gói tài trợ, kết nối và đàm phán với đối tác, phối hợp triển khai quyền lợi tài trợ. Gây quỹ thành công tổng giá trị 404,92 triệu đồng, bao gồm tiền mặt và hiện vật." },
      { name: "YOUTHSPEAK", role: "Tổ chức sự kiện & Quản lý người tham dự", date: "03/2025 — 07/2025", desc: "Quản lý fanpage hơn 100.000 người theo dõi; tư vấn, giải đáp và hỗ trợ đăng ký vé. Phân loại dữ liệu người tham dự, trực tiếp hỗ trợ đại biểu và phối hợp vận hành sự kiện." },
      { name: "BÁCH HOA BỘ HÀNH TP.HCM", role: "Cộng tác viên Ban Sản xuất", date: "03/2025", desc: "Hỗ trợ công tác sản xuất và điều phối, phối hợp cùng đội ngũ để đảm bảo quá trình triển khai sự kiện." },
    ],
    projects: [
      { title: "STRONGBOW — CỨ CHILL THÔI", course: "Photography", role: "Project Leader", desc: "Thực hiện bộ ảnh quảng bá thương hiệu nước trái cây lên men Strongbow. Lên ý tưởng, phân công công việc, kiểm soát chất lượng quá trình thực hiện và tham gia hậu kỳ.", tags: ["Creative Direction", "Project Management", "Photography"] },
      { title: "VIỆT NAM CREATIVE PULSE", course: "Digital Marketing", role: "Creative & Marketing Planning", desc: "Đóng vai agency xây dựng chương trình kỷ niệm Ngày Văn hóa Việt Nam. Tham gia phát triển ý tưởng tổng thể, nghiên cứu insight, Customer Journey, POE Matrix, SEO, đề xuất Execution và KPI; lên ý tưởng website, logo và Key Visual ứng dụng AI.", tags: ["Digital Strategy", "Branding", "SEO", "AI Design"] },
      { title: "HAYDAY KOMBUCHA — VINAMILK", course: "Advertising", role: "Campaign Planning", desc: "Xây dựng proposal chiến dịch quảng bá sản phẩm Kombucha HayDay. Nghiên cứu bối cảnh mạng xã hội, định vị thương hiệu, đối thủ, USP và khách hàng mục tiêu; đóng góp Big Idea, kế hoạch triển khai và bài viết báo chí.", tags: ["Brand Research", "Big Idea", "Advertising"] },
      { title: "GÕ CỬA NHÀ MỸ NAM", course: "Website Design and Administration", role: "Website Concept & Design", desc: "Thiết kế website quảng bá phim tương tác do Yeah1 và Mango TV sản xuất. Phụ trách ý tưởng, moodboard, nghiên cứu nội dung phim, thiết kế website và các materials.", tags: ["Web Design", "Moodboard", "Visual Content"], link: "https://gocuanhamynam.vercel.app", linkLabel: "Mở website" },
      { title: "232 TUỔI — THE FLOB × CHUPA CHUPS", course: "Project 2: Audio - Visual Production", role: "Creative & Production Team", desc: "Thực hiện MV remake lồng ghép quảng cáo Chupa Chups. Phát triển ý tưởng và Big Idea, liên hệ The Flob, phụ trách các vấn đề âm nhạc; tham gia lựa chọn trang phục, tìm kiếm và casting diễn viên, chọn địa điểm quay và góp ý hậu kỳ.", tags: ["Music Video", "Production", "Casting"], link: "https://drive.google.com/file/d/1bsmt0bQbmOt5PXVZ6sFqpF9Eqeidf0FD/view?usp=drivesdk", linkLabel: "Xem MV" },
      { title: "SẤP NGỬA", course: "Introduction to Film Directing", role: "Concept & Scriptwriting", desc: "Phim ngắn 15 phút thuộc chủ đề tâm lý – xã hội. Phát triển ý tưởng, chủ đề tư tưởng, logline và kịch bản chi tiết; đảm nhận lựa chọn, casting diễn viên và góp ý hậu kỳ.", tags: ["Short Film", "Scriptwriting", "Casting"], link: "https://drive.google.com/file/d/1nU1vaTUKrXLQzCJa02v4s6DuEjlXkKVd/view?usp=drivesdk", linkLabel: "Xem phim" },
    ],
  },
  en: {
    nav: ["Home", "About Me", "Skills", "Selected Works", "Experience", "Contact"],
    role: "MARKETING & PR INTERN",
    eyebrow: "PERSONAL PORTFOLIO · 2026",
    hero1: "Creative.",
    hero2: "Professional.",
    hero3: "Responsible.",
    intro: "A final-year Multimedia Communications student with academic training in Marketing, Branding, and Public Relations. Experienced in communication projects and extracurricular activities.",
    cta: "Explore projects",
    about: "Hello, I'm Huỳnh Duy",
    aboutText: "I aspire to grow in Marketing and Communications, with a particular interest in brand strategy, content creation, and the ways brands connect with audiences. Skilled in developing Integrated Marketing Communications (IMC) plans, addressing communication challenges, and executing brand strategies. Proactive, creative, and adaptable, with a strong commitment to continuous learning and professional growth.",
    skillsTitle: "Skills & Expertise",
    skillsSub: "Bringing together strategic thinking, creativity, and execution.",
    skillGroups: [
      ["MARKETING & COMMUNICATION", ["Marketing Communications Planning", "Integrated Marketing Communications (IMC) Planning", "Public Relations Planning", "Content Creation", "Press Release Writing"]],
      ["CREATIVE & PRODUCTION", ["Event Management", "External Relations", "Short Film Scriptwriting"]],
      ["DIGITAL TOOLS", ["Canva", "CapCut", "Adobe Photoshop (Basic)", "Microsoft Office (Basic)"]],
    ],
    language: "LANGUAGE", languageText: "English – Conversational proficiency",
    worksTitle: "Selected Works",
    worksSub: "Projects demonstrating strategic planning, creativity, and execution.",
    experienceTitle: "Experience & Achievements",
    contactTitle: "Let's connect.",
    contactText: "Looking for a passionate Marketing & PR collaborator? Feel free to get in touch.",
    location: "Ho Chi Minh City, Vietnam",
    email: "Email me", phone: "Call me", footer: "Made with curiosity, creativity, and a commitment to keep learning.",
    view: "View project", roleLabel: "ROLE", course: "COURSE",
    exp: [
      { name: "HỒI THANH", role: "Project Lead", date: "01/2026 — 07/2026", desc: "A social media communications project in collaboration with Ho Chi Minh City Hat Boi Art Theater. Led the overall communications plan, TikTok content direction, production coordination, and stakeholder relationships. The project gained attention from TikToker Bé Bảy (1.7M+ followers)." },
      { name: "MERACLE", role: "Deputy Head of External Relations", date: "01/2026 — 06/2026", desc: "Developed sponsorship packages, connected and negotiated with partners, and coordinated sponsor benefits. Successfully secured VND 404.92 million in cash and in-kind sponsorships." },
      { name: "YOUTHSPEAK", role: "Event Organization & Delegate Management", date: "03/2025 — 07/2025", desc: "Managed a fanpage with 100,000+ followers; advised attendees, answered inquiries, and supported ticket registration. Organized delegate data and provided on-site event support." },
      { name: "BÁCH HOA BỘ HÀNH HCMC", role: "Production Team Collaborator", date: "03/2025", desc: "Supported production and event coordination, working with the team to ensure smooth execution." },
    ],
    projects: [
      { title: "STRONGBOW — CỨ CHILL THÔI", course: "Photography", role: "Project Leader", desc: "Created a promotional photography series for Strongbow fermented fruit beverage. Developed the concept, assigned tasks, quality-checked execution, and contributed to post-production.", tags: ["Creative Direction", "Project Management", "Photography"] },
      { title: "VIỆT NAM CREATIVE PULSE", course: "Digital Marketing", role: "Creative & Marketing Planning", desc: "Took on an agency role to develop a program celebrating Vietnamese Culture Day. Contributed to the overall concept, audience insights, Customer Journey, POE Matrix, SEO, Execution and KPI proposals, as well as the website concept, logo, and AI-assisted Key Visual.", tags: ["Digital Strategy", "Branding", "SEO", "AI Design"] },
      { title: "HAYDAY KOMBUCHA — VINAMILK", course: "Advertising", role: "Campaign Planning", desc: "Developed an advertising campaign proposal for HayDay Kombucha. Researched social context, brand positioning, competitors, USP, and target audience; contributed to the Big Idea, campaign rollout plan, and press content.", tags: ["Brand Research", "Big Idea", "Advertising"] },
      { title: "GÕ CỬA NHÀ MỸ NAM", course: "Website Design and Administration", role: "Website Concept & Design", desc: "Designed a promotional website for the interactive film produced by Yeah1 and Mango TV. Developed the concept and moodboard, researched the film, and created the website and its visual materials.", tags: ["Web Design", "Moodboard", "Visual Content"], link: "https://gocuanhamynam.vercel.app", linkLabel: "Open website" },
      { title: "232 TUỔI — THE FLOB × CHUPA CHUPS", course: "Project 2: Audio - Visual Production", role: "Creative & Production Team", desc: "Produced a remake music video integrating a Chupa Chups advertisement. Developed the concept and Big Idea, liaised with The Flob on music-related matters, and contributed to styling, casting, location scouting, and post-production feedback.", tags: ["Music Video", "Production", "Casting"], link: "https://drive.google.com/file/d/1bsmt0bQbmOt5PXVZ6sFqpF9Eqeidf0FD/view?usp=drivesdk", linkLabel: "Watch MV" },
      { title: "SẤP NGỬA", course: "Introduction to Film Directing", role: "Concept & Scriptwriting", desc: "A 15-minute psychological-social short film. Developed the concept, central theme, logline, and detailed screenplay; took part in actor selection and casting, and provided post-production feedback.", tags: ["Short Film", "Scriptwriting", "Casting"], link: "https://drive.google.com/file/d/1nU1vaTUKrXLQzCJa02v4s6DuEjlXkKVd/view?usp=drivesdk", linkLabel: "Watch film" },
    ],
  },
};

export default function Home() {
  const [lang, setLang] = useState<Lang>("vi");
  const [menuOpen, setMenuOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<number | null>(null);
  const [selectedExperience, setSelectedExperience] = useState<number | null>(null);
  const t = copy[lang];
  const ids = ["home", "about", "skills", "works", "experience", "contact"];

  return (
    <main>
      <div className="ambient ambient-one" />
      <div className="ambient ambient-two" />
      <div className="grain" />

      <header className="topbar">
        <a className="brand" href="#home"><span className="brand-mark">HD.</span><span>HUỲNH DUY</span></a>
        <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu">☰</button>
        <nav className={menuOpen ? "nav nav-open" : "nav"}>
          {t.nav.map((item, i) => <a key={item} href={`#${ids[i]}`} onClick={() => setMenuOpen(false)}>{item}</a>)}
        </nav>
        <button className="lang-switch" onClick={() => setLang(lang === "vi" ? "en" : "vi")}>{lang === "vi" ? "EN ↗" : "VI ↗"}</button>
      </header>

      <section className="hero section-wrap" id="home">
        <div className="hero-copy">
          <p className="eyebrow"><span className="live-dot" />{t.eyebrow}</p>
          <p className="hero-name">NGUYỄN HỮU<br/>HUỲNH DUY<span className="chrome-dot">.</span></p>
          <p className="role">{t.role}</p>
          <h1 className="hero-tagline">
            {t.hero1}<br/><em>{t.hero2}</em><br/>{t.hero3}
          </h1>
          <p className="hero-intro">{t.intro}</p>
          <a className="text-link" href="#works">{t.cta} <span>↗</span></a>
        </div>

        <div className="portrait-stage">
          <div className="orbit orbit-a" /><div className="orbit orbit-b" />
          <div className="portrait-card">
  <div className="portrait-placeholder">
    <img
      src="/anhcv.jpg"
      alt="Huỳnh Duy - Marketing & PR"
      className="portrait-image"
    />
  </div>
  <div className="portrait-meta">
    <span>CREATIVE MINDSET</span>
    <span>01 / 06</span>
  </div>
</div>
          <div className="float-tag tag-one">STRATEGY <b>✳</b></div><div className="float-tag tag-two">STORYTELLING <b>↗</b></div>
          <div className="hero-index">HCMC · VIETNAM<br/>10°49' N / 106°38' E</div>
        </div>
        <div className="scroll-note">SCROLL TO EXPLORE <span>↓</span></div>
      </section>

      <section className="section-wrap about-section" id="about">
        <div className="section-kicker">01 / ABOUT</div>
        <div className="about-grid"><h2>{t.about}</h2><div><p className="large-copy">{t.aboutText}</p><div className="about-signature">HUỲNH DUY <span>—</span> MARKETING & PR</div></div></div>
      </section>

      <section className="section-wrap skills-section" id="skills">
        <div className="section-kicker">02 / CAPABILITIES</div>
        <div className="section-heading"><h2>{t.skillsTitle}</h2><p>{t.skillsSub}</p></div>
        <div className="skill-grid">{t.skillGroups.map(([group, items]) => <div className="skill-card" key={String(group)}><p className="card-label">{group}</p><ul>
          {Array.isArray(items) ? items.map(x => <li key={x}>{x}</li>) : <li>{items}</li>}
        </ul><span className="card-cross">✳</span></div>)}</div>
        <div className="language-line"><span>{t.language}</span><b>{t.languageText}</b></div>
      </section>

      <section className="section-wrap works-section" id="works">
        <div className="section-kicker">03 / SELECTED WORKS</div>
        <div className="section-heading"><h2>{t.worksTitle}<span className="chrome-dot">.</span></h2><p>{t.worksSub}</p></div>
        <div className="project-grid">
  {t.projects.map((p, i) => (
    <article
      className="project-card"
      key={p.title}
      onClick={() => setSelectedProject(i)}
      role="button"
      tabIndex={0}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          setSelectedProject(i);
        }
      }}
    >
      <div className={`project-art art-${i + 1}`}>
        <span className="art-number">0{i + 1}</span>
        <span className="art-word">
          {["STILL", "PULSE", "FRESH", "INTERACTIVE", "MOTION", "STORY"][i]}
        </span>
        <span className="art-orb" />
      </div>

      <div className="project-info">
        <div className="project-meta">
          <span>{t.course}: {p.course}</span>
          <span>{p.role}</span>
        </div>

        <h3>{p.title}</h3>
        <p>{p.desc}</p>

        <div className="tags">
          {p.tags.map((tag) => (
            <span key={tag}>{tag}</span>
          ))}
        </div>

        {p.link && (
          <a
            className="project-link"
            href={p.link}
            target="_blank"
            rel="noreferrer"
            onClick={(event) => event.stopPropagation()}
          >
            {p.linkLabel} ↗
          </a>
        )}

      </div>
    </article>
  ))}
</div>
      </section>

      <section className="section-wrap experience-section" id="experience">
        <div className="section-kicker">04 / EXPERIENCE</div>
        <div className="section-heading"><h2>{t.experienceTitle}</h2><p>PROJECTS · PEOPLE · IMPACT</p></div>
<div className="timeline">
  {t.exp.map((e, i) => (
    <article
      className="timeline-item"
      key={e.name}
      onClick={() => setSelectedExperience(i)}
      role="button"
      tabIndex={0}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          setSelectedExperience(i);
        }
      }}
    >
      <div className="timeline-count">0{i + 1}</div>
      <div className="timeline-main">
        <div className="timeline-top">
          <h3>{e.name}</h3>
          <span>{e.date}</span>
        </div>
        <p className="timeline-role">{e.role}</p>
        <p>{e.desc}</p>
      </div>
    </article>
  ))}
</div>
        <div className="achievement"><strong>404.92M</strong><span>VND · MERACLE SPONSORSHIP VALUE</span><i>100K+</i><span>YOUTHSPEAK FANPAGE FOLLOWERS</span></div>
      </section>

      <section className="section-wrap contact-section" id="contact">
        <div className="section-kicker">05 / CONTACT</div><h2>{t.contactTitle}</h2><p>{t.contactText}</p>
        <div className="contact-links"><a href="mailto:huynhduyussh2023@gmail.com"><span>EMAIL</span><b>huynhduyussh2023@gmail.com</b><i>↗</i></a><a href="tel:+84942048922"><span>PHONE</span><b>0942-048-922</b><i>↗</i></a><div><span>LOCATION</span><b>{t.location}</b><i>⌖</i></div></div>
      </section>
      <footer><a className="brand" href="#home"><span className="brand-mark">HD.</span><span>HUỲNH DUY</span></a><span>© 2026 NGUYỄN HỮU HUỲNH DUY</span><span>{t.footer}</span></footer>
   {selectedProject !== null && (
  <div
    className="project-modal-backdrop"
    onClick={() => setSelectedProject(null)}
  >
    <div
      className="project-modal"
      role="dialog"
      aria-modal="true"
      onClick={(event) => event.stopPropagation()}
    >
      <button
        className="project-modal-close"
        onClick={() => setSelectedProject(null)}
        aria-label="Close"
      >
        ×
      </button>

      <div className="project-modal-kicker">
        PROJECT DETAILS / 0{selectedProject + 1}
      </div>

      <h2>{t.projects[selectedProject].title}</h2>

      <div className="project-modal-meta">
        <span>{t.course}: {t.projects[selectedProject].course}</span>
        <span>{t.projects[selectedProject].role}</span>
      </div>

      <p>{t.projects[selectedProject].desc}</p>

      <div className="project-modal-art">
        <span>0{selectedProject + 1}</span>
        <strong>
          {["STILL", "PULSE", "FRESH", "INTERACTIVE", "MOTION", "STORY"][selectedProject]}
        </strong>
        <span>CREATIVE PROJECT</span>
      </div>

      <div className="tags">
        {t.projects[selectedProject].tags.map((tag) => (
          <span key={tag}>{tag}</span>
        ))}
      </div>

      {t.projects[selectedProject].link && (
        <a
          className="project-link"
          href={t.projects[selectedProject].link}
          target="_blank"
          rel="noreferrer"
        >
          {t.projects[selectedProject].linkLabel} ↗
        </a>
      )}
    </div>
  </div>
)}
      {selectedExperience !== null && (
  <div
    className="project-modal-backdrop"
    onClick={() => setSelectedExperience(null)}
  >
    <div
      className="project-modal"
      role="dialog"
      aria-modal="true"
      onClick={(event) => event.stopPropagation()}
    >
      <button
        className="project-modal-close"
        onClick={() => setSelectedExperience(null)}
        aria-label="Close"
      >
        ×
      </button>

      <div className="project-modal-kicker">
        EXPERIENCE DETAILS / 0{selectedExperience + 1}
      </div>

      <h2>{t.exp[selectedExperience].name}</h2>

      <div className="project-modal-meta">
        <span>{t.exp[selectedExperience].date}</span>
        <span>{t.exp[selectedExperience].role}</span>
      </div>

      <p>{t.exp[selectedExperience].desc}</p>

      <div className="project-modal-art">
        <span>0{selectedExperience + 1}</span>
        <strong>
          {["HỒI THANH", "MERACLE", "YOUTHSPEAK", "BÁCH HOA"][selectedExperience]}
        </strong>
        <span>EXPERIENCE & ACHIEVEMENTS</span>
      </div>
    </div>
  </div>
)}
    </main>
  );
}
