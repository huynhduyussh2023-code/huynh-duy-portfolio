"use client";

import Image from "next/image";
import {
  useCallback,
  useEffect,
  useState,
  type KeyboardEvent as ReactKeyboardEvent,
} from "react";
import {
  SECTION_IDS,
  SITE,
  STATS,
  content,
  type Lang,
  type SectionId,
} from "../content";
import ImageGallery from "./ImageGallery";
import Modal from "./Modal";
import LuxuryEffects from "./LuxuryEffects";

type ModalState = { kind: "project" | "experience"; index: number } | null;

const LANG_STORAGE_KEY = "portfolio-lang";
const pad = (n: number) => String(n).padStart(2, "0");

/** Makes a non-button element behave like a button (mouse + keyboard). */
function opensDialog(action: () => void) {
  return {
    role: "button" as const,
    tabIndex: 0,
    "aria-haspopup": "dialog" as const,
    onClick: action,
    onKeyDown: (event: ReactKeyboardEvent<HTMLElement>) => {
      // Ignore keys pressed on inner links/buttons.
      if (event.target !== event.currentTarget) return;
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        action();
      }
    },
  };
}

export default function Portfolio() {
  const [lang, setLang] = useState<Lang>("vi");
  const [menuOpen, setMenuOpen] = useState(false);
  const [modal, setModal] = useState<ModalState>(null);
  const [activeSection, setActiveSection] = useState<SectionId>("home");

  const t = content[lang];
  const closeModal = useCallback(() => setModal(null), []);

  // Restore the visitor's last language choice.
  useEffect(() => {
    try {
      const saved = localStorage.getItem(LANG_STORAGE_KEY);
      if (saved === "vi" || saved === "en") setLang(saved);
    } catch {
      /* storage unavailable (private mode, etc.) */
    }
  }, []);

  // Keep <html lang> in sync for screen readers and search engines.
  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  // Highlight the nav link of the section currently in view.
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActiveSection(entry.target.id as SectionId);
        }
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    for (const id of SECTION_IDS) {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    }
    return () => observer.disconnect();
  }, []);

  // Escape closes the mobile menu.
  useEffect(() => {
    if (!menuOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [menuOpen]);

  const switchLang = () => {
    const next: Lang = lang === "vi" ? "en" : "vi";
    setLang(next);
    try {
      localStorage.setItem(LANG_STORAGE_KEY, next);
    } catch {
      /* ignore */
    }
  };

  const activeProject =
    modal?.kind === "project"
      ? { item: t.works.items[modal.index], number: modal.index + 1 }
      : null;
  const activeExperience =
    modal?.kind === "experience"
      ? { item: t.experience.items[modal.index], number: modal.index + 1 }
      : null;

  return (
    <main>
      <div className="ambient ambient-one" aria-hidden="true" />
      <div className="ambient ambient-two" aria-hidden="true" />
      <div className="grain" aria-hidden="true" />

      {/* ---------- Header ---------- */}
      <header className="topbar">
        <a className="brand" href="#home">
          <span className="brand-mark">HD.</span>
          <span>HUỲNH DUY</span>
        </a>

        <button
          type="button"
          className="menu-toggle"
          onClick={() => setMenuOpen((open) => !open)}
          aria-label={t.a11y.menu}
          aria-expanded={menuOpen}
          aria-controls="primary-nav"
        >
          ☰
        </button>

        <nav id="primary-nav" className={menuOpen ? "nav nav-open" : "nav"}>
          {SECTION_IDS.map((id) => (
            <a
              key={id}
              href={`#${id}`}
              aria-current={activeSection === id ? "location" : undefined}
              onClick={() => setMenuOpen(false)}
            >
              {t.nav[id]}
            </a>
          ))}
        </nav>

        <button
          type="button"
          className="lang-switch"
          onClick={switchLang}
          aria-label={t.a11y.switchLang}
        >
          {lang === "vi" ? "EN ↗" : "VI ↗"}
        </button>
      </header>

      {/* ---------- Hero ---------- */}
      <section className="hero section-wrap" id="home">
        <div className="hero-copy">
          <p className="eyebrow">
            <span className="live-dot" aria-hidden="true" />
            {t.eyebrow}
          </p>
          <p className="hero-name">
            NGUYỄN HỮU
            <br />
            HUỲNH DUY<span className="chrome-dot">.</span>
          </p>
          <p className="role">{t.role}</p>
          <h1 className="hero-tagline">
            {t.hero.line1}
            <br />
            <em>{t.hero.accent}</em>
            <br />
            {t.hero.line3}
          </h1>
          <p className="hero-intro">{t.intro}</p>
          <a className="text-link" href="#works">
            {t.cta} <span aria-hidden="true">↗</span>
          </a>
        </div>

        <div className="portrait-stage">
          <div className="orbit orbit-a" aria-hidden="true" />
          <div className="orbit orbit-b" aria-hidden="true" />

          <div className="portrait-card">
            <div className="portrait-placeholder">
              <Image
                src={SITE.portrait}
                alt={t.a11y.portraitAlt}
                fill
                priority
                sizes="(max-width: 680px) 270px, 350px"
                className="portrait-image"
              />
            </div>
            <div className="portrait-meta">
              <span>CREATIVE MINDSET</span>
              <span>01 / 06</span>
            </div>
          </div>

          <div className="float-tag tag-one">
            STRATEGY <b aria-hidden="true">✳</b>
          </div>
          <div className="float-tag tag-two">
            STORYTELLING <b aria-hidden="true">↗</b>
          </div>
          <div className="hero-index">
            HCMC · VIETNAM
            <br />
            10°49&apos; N / 106°38&apos; E
          </div>
        </div>

        <div className="scroll-note">
          SCROLL TO EXPLORE <span aria-hidden="true">↓</span>
        </div>
      </section>

      {/* ---------- About ---------- */}
      <section className="section-wrap about-section" id="about">
        <div className="section-kicker">01 / ABOUT</div>
        <div className="about-grid">
          <h2>{t.about.title}</h2>
          <div>
            <p className="large-copy">{t.about.text}</p>
            <div className="about-signature">
              HUỲNH DUY <span>—</span> MARKETING &amp; PR
            </div>
          </div>
        </div>
      </section>

      {/* ---------- Skills ---------- */}
      <section className="section-wrap skills-section" id="skills">
        <div className="section-kicker">02 / CAPABILITIES</div>
        <div className="section-heading">
          <h2>{t.skills.title}</h2>
          <p>{t.skills.sub}</p>
        </div>

        <div className="skill-grid">
          {t.skills.groups.map((group) => (
            <div className="skill-card" key={group.title}>
              <p className="card-label">{group.title}</p>
              <ul>
                {group.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
              <span className="card-cross" aria-hidden="true">
                ✳
              </span>
            </div>
          ))}
        </div>

        <div className="language-line">
          <span>{t.skills.languageLabel}</span>
          <b>{t.skills.languageText}</b>
        </div>
      </section>

      {/* ---------- Experience ---------- */}
      <section className="section-wrap experience-section" id="experience">
        <div className="section-kicker">03 / EXPERIENCE</div>
        <div className="section-heading">
          <h2>{t.experience.title}</h2>
          <p>PROJECTS · PEOPLE · IMPACT</p>
        </div>

        <div className="timeline">
          {t.experience.items.map((item, index) => (
            <article
              className="timeline-item"
              key={item.id}
              {...opensDialog(() => setModal({ kind: "experience", index }))}
            >
              <div className="timeline-count">{pad(index + 1)}</div>
              <div className="timeline-main">
                <div className="timeline-top">
                  <h3>{item.name}</h3>
                  <span>{item.date}</span>
                </div>
                <p className="timeline-role">{item.role}</p>
                <p>{item.desc}</p>
              </div>
            </article>
          ))}
        </div>

        <div className="achievement">
          <strong>{STATS[0].value}</strong>
          <span>{STATS[0].label}</span>
          <i>{STATS[1].value}</i>
          <span>{STATS[1].label}</span>
        </div>
      </section>

      {/* ---------- Selected works ---------- */}
      <section className="section-wrap works-section" id="works">
        <div className="section-kicker">04 / SELECTED WORKS</div>
        <div className="section-heading">
          <h2>
            {t.works.title}
            <span className="chrome-dot">.</span>
          </h2>
          <p>{t.works.sub}</p>
        </div>

        <div className="project-grid">
          {t.works.items.map((project, index) => (
            <article
              className="project-card"
              key={project.id}
              {...opensDialog(() => setModal({ kind: "project", index }))}
            >
              <div
                className={`project-art art-${index + 1}${
                  project.images[0] ? " has-cover" : ""
                }`}
              >
                {project.images[0] && (
                  <Image
                    src={project.images[0]}
                    alt=""
                    fill
                    sizes="(max-width: 680px) 90vw, 560px"
                    className="project-cover"
                  />
                )}
                <span className="art-number">{pad(index + 1)}</span>
                <span className="art-word">{project.art}</span>
                <span className="art-orb" aria-hidden="true" />
              </div>

              <div className="project-info">
                <div className="project-meta">
                  <span>
                    {t.courseLabel}: {project.course}
                  </span>
                  <span>{project.role}</span>
                </div>

                <h3>{project.title}</h3>
                <p>{project.desc}</p>

                <div className="tags">
                  {project.tags.map((tag) => (
                    <span key={tag}>{tag}</span>
                  ))}
                </div>

                {project.link && (
                  <a
                    className="project-link"
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(event) => event.stopPropagation()}
                  >
                    {project.linkLabel} ↗
                  </a>
                )}
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* ---------- Contact ---------- */}
      <section className="section-wrap contact-section" id="contact">
        <div className="section-kicker">05 / CONTACT</div>
        <h2>{t.contact.title}</h2>
        <p>{t.contact.text}</p>

        <div className="contact-links">
          <a href={`mailto:${SITE.email}`}>
            <span>EMAIL</span>
            <b>{SITE.email}</b>
            <i aria-hidden="true">↗</i>
          </a>
          <a href={SITE.phoneHref}>
            <span>PHONE</span>
            <b>{SITE.phoneDisplay}</b>
            <i aria-hidden="true">↗</i>
          </a>
          <div>
            <span>LOCATION</span>
            <b>{t.contact.location}</b>
            <i aria-hidden="true">⌖</i>
          </div>
        </div>
      </section>

      <footer>
        <a className="brand" href="#home">
          <span className="brand-mark">HD.</span>
          <span>HUỲNH DUY</span>
        </a>
        <span>© 2026 {SITE.name.toUpperCase()}</span>
        <span>{t.footer}</span>
      </footer>

      {/* ---------- Popups ---------- */}
      {activeProject && (
        <Modal
          kicker={`PROJECT DETAILS / ${pad(activeProject.number)}`}
          title={activeProject.item.title}
          meta={[
            `${t.courseLabel}: ${activeProject.item.course}`,
            activeProject.item.role,
          ]}
          closeLabel={t.a11y.close}
          onClose={closeModal}
        >
          <p>{activeProject.item.desc}</p>

          {activeProject.item.images.length > 0 ? (
            <ImageGallery
              images={activeProject.item.images}
              alt={activeProject.item.title}
              prevLabel={t.a11y.prev}
              nextLabel={t.a11y.next}
            />
          ) : (
            <div className="project-modal-art">
              <span>{pad(activeProject.number)}</span>
              <strong>{activeProject.item.art}</strong>
              <span>CREATIVE PROJECT</span>
            </div>
          )}

          <div className="tags">
            {activeProject.item.tags.map((tag) => (
              <span key={tag}>{tag}</span>
            ))}
          </div>

          {activeProject.item.link && (
            <a
              className="project-link"
              href={activeProject.item.link}
              target="_blank"
              rel="noopener noreferrer"
            >
              {activeProject.item.linkLabel} ↗
            </a>
          )}
        </Modal>
      )}

      {activeExperience && (
        <Modal
          kicker={`EXPERIENCE DETAILS / ${pad(activeExperience.number)}`}
          title={activeExperience.item.name}
          meta={[activeExperience.item.date, activeExperience.item.role]}
          closeLabel={t.a11y.close}
          onClose={closeModal}
        >
          <p>{activeExperience.item.desc}</p>

          {activeExperience.item.images.length > 0 ? (
            <ImageGallery
              images={activeExperience.item.images}
              alt={activeExperience.item.name}
              prevLabel={t.a11y.prev}
              nextLabel={t.a11y.next}
            />
          ) : (
            <div className="project-modal-art">
              <span>{pad(activeExperience.number)}</span>
              <strong>{activeExperience.item.art}</strong>
              <span>EXPERIENCE &amp; ACHIEVEMENTS</span>
            </div>
          )}
        </Modal>
      )}
      <LuxuryEffects />
    </main>
  );
}
