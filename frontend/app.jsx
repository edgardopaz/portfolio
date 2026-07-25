import React, {
    useCallback,
    useEffect,
    useMemo,
    useRef,
    useState,
} from 'react';
import { hydrateRoot } from 'react-dom/client';

import {
    experiences,
    featuredProjects,
    ROUTE_SECTION_MAP,
    SECTION_ROUTE_MAP,
    skills,
} from './data.js';

function updateActiveNav(section) {
    document.querySelectorAll('nav a[data-section]').forEach((link) => {
        const isActive = link.dataset.section === section;
        link.classList.toggle('active', isActive);
        if (isActive) {
            link.setAttribute('aria-current', 'page');
        } else {
            link.removeAttribute('aria-current');
        }
    });
}

function HeroSection() {
    const heroTitles = ['Software Engineer', 'Undergraduate Researcher'];
    const [titleIndex, setTitleIndex] = useState(0);
    const [displayText, setDisplayText] = useState(heroTitles[0]);
    const [isDeleting, setIsDeleting] = useState(false);

    useEffect(() => {
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            return undefined;
        }

        const currentTitle = heroTitles[titleIndex];
        const isComplete = displayText === currentTitle;
        const isCleared = displayText === '';
        let timeoutDelay = isDeleting ? 70 : 110;

        if (!isDeleting && isComplete) {
            timeoutDelay = 1400;
        } else if (isDeleting && isCleared) {
            timeoutDelay = 250;
        }

        const timeoutId = window.setTimeout(() => {
            if (!isDeleting && isComplete) {
                setIsDeleting(true);
                return;
            }

            if (isDeleting && isCleared) {
                setIsDeleting(false);
                setTitleIndex((currentIndex) => (currentIndex + 1) % heroTitles.length);
                return;
            }

            setDisplayText((currentText) =>
                isDeleting
                    ? currentText.slice(0, -1)
                    : currentTitle.slice(0, currentText.length + 1),
            );
        }, timeoutDelay);

        return () => window.clearTimeout(timeoutId);
    }, [displayText, isDeleting, titleIndex]);

    return (
        <section id="home" className="section-wrapper page-section" data-section-id="home">
            <p className="hero-eyebrow">Hi, my name is</p>
            <h1 className="hero-title">Edgardo Paz-Romero.</h1>
            <h2
                className="hero-subtitle"
                aria-label="Software Engineer and Undergraduate Researcher"
            >
                <span className="hero-subtitle-text">{displayText}</span>
                <span className="hero-subtitle-cursor" aria-hidden="true">|</span>
            </h2>
            <p className="hero-description">
                I'm a first-generation Computer Science student at Temple University
                building dependable full-stack and platform software. My recent work
                spans containerized microservices for an ML platform, HCI research on
                AI adoption, and practical tools built with Python, TypeScript, and Go.
            </p>
            <a className="hero-cta" href="/projects" data-section="projects">
                Check out my work →
            </a>
        </section>
    );
}

function AboutSection() {
    return (
        <section id="about" className="section-wrapper page-section" data-section-id="about">
            <h2 className="section-title"><span>01.</span> About Me</h2>
            <div className="about-grid">
                <div>
                    <p>
                        Hey! I'm Edgardo, and I've always been drawn to understanding
                        how systems work behind the scenes. I started coding during my
                        first year at Temple and quickly became interested in combining{' '}
                        <span className="highlight">
                            software engineering, thoughtful design, and automation
                        </span>{' '}
                        to solve practical problems.
                    </p>
                    <br />
                    <p>
                        Lately, I've been containerizing and testing microservices with
                        Docker and Kubernetes for an ML platform while contributing to
                        Python backend services and TypeScript interfaces. Outside of
                        work, I'm researching how first-generation students adopt AI
                        tools and building projects such as a Flask flashcard platform,
                        a secure password manager in Go, and LoLdle.
                    </p>
                    <br />
                    <p>Here are a few technologies I've been working with recently:</p>
                    <ul className="skills-grid">
                        {skills.map((skill) => <li key={skill}>{skill}</li>)}
                    </ul>
                </div>
                <div>
                    <div className="profile-frame">
                        <img
                            src="/static/images/profile.jpg"
                            alt="Edgardo Paz-Romero"
                            loading="lazy"
                            decoding="async"
                        />
                    </div>
                </div>
            </div>
        </section>
    );
}

function ExperienceSection() {
    const [activeId, setActiveId] = useState(experiences[0].id);
    const activeExperience = useMemo(
        () => experiences.find((experience) => experience.id === activeId) || experiences[0],
        [activeId],
    );

    const handleTabKeyDown = (event, currentIndex) => {
        if (event.key === 'Home' || event.key === 'End') {
            event.preventDefault();
            const nextIndex = event.key === 'Home' ? 0 : experiences.length - 1;
            const nextExperience = experiences[nextIndex];
            setActiveId(nextExperience.id);
            document.getElementById(`experience-tab-${nextExperience.id}`)?.focus();
            return;
        }

        const keyDirections = {
            ArrowRight: 1,
            ArrowDown: 1,
            ArrowLeft: -1,
            ArrowUp: -1,
        };
        const direction = keyDirections[event.key];
        if (!direction) {
            return;
        }

        event.preventDefault();
        const nextIndex = (currentIndex + direction + experiences.length) % experiences.length;
        const nextExperience = experiences[nextIndex];
        setActiveId(nextExperience.id);
        document.getElementById(`experience-tab-${nextExperience.id}`)?.focus();
    };

    return (
        <section id="experience" className="section-wrapper">
            <h2 className="section-title"><span>02.</span> Where I've Worked</h2>
            <div className="experience-layout">
                <div className="experience-tabs" role="tablist" aria-label="Work experience">
                    {experiences.map((experience, index) => (
                        <button
                            key={experience.id}
                            id={`experience-tab-${experience.id}`}
                            type="button"
                            role="tab"
                            aria-selected={experience.id === activeId}
                            aria-controls="experience-panel"
                            tabIndex={experience.id === activeId ? 0 : -1}
                            className={`experience-tab ${experience.id === activeId ? 'active' : ''}`.trim()}
                            onClick={() => setActiveId(experience.id)}
                            onKeyDown={(event) => handleTabKeyDown(event, index)}
                        >
                            {experience.company}
                        </button>
                    ))}
                </div>
                <div
                    id="experience-panel"
                    role="tabpanel"
                    aria-labelledby={`experience-tab-${activeExperience.id}`}
                    tabIndex="0"
                >
                    <h3 className="experience-role">
                        {activeExperience.title}{' '}
                        <span className="experience-company">@ {activeExperience.company}</span>
                    </h3>
                    <p className="experience-time">{activeExperience.range}</p>
                    <ul className="experience-list">
                        {activeExperience.description.map((item) => <li key={item}>{item}</li>)}
                    </ul>
                </div>
            </div>
        </section>
    );
}

function ProjectsSection() {
    return (
        <section id="projects" className="section-wrapper page-section" data-section-id="projects">
            <h2 className="section-title"><span>03.</span> Some Things I've Built</h2>
            <div className="projects-grid">
                {featuredProjects.map((project) => (
                    <article key={project.title} className="project-card">
                        <div>
                            <h3>{project.title}</h3>
                            <p>{project.description}</p>
                        </div>
                        <div className="tech-list">
                            {project.tech.map((tech) => <span key={tech}>{tech}</span>)}
                        </div>
                        <div className="project-footer">
                            {project.links.report ? (
                                <a
                                    href={project.links.report}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label={`Read the ${project.title} report (opens in a new tab)`}
                                >
                                    Report ↗
                                </a>
                            ) : (
                                <span>Featured Project</span>
                            )}
                            <div className="external-links">
                                {project.links.live && (
                                    <a
                                        href={project.links.live}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        aria-label={`Open ${project.title} live site (opens in a new tab)`}
                                    >
                                        Live ↗
                                    </a>
                                )}
                                {project.links.github && (
                                    <a
                                        href={project.links.github}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        aria-label={`View ${project.title} on GitHub (opens in a new tab)`}
                                    >
                                        GitHub ↗
                                    </a>
                                )}
                            </div>
                        </div>
                    </article>
                ))}
            </div>
        </section>
    );
}

function ContactSection() {
    return (
        <section id="contact" className="contact-section">
            <span className="hero-eyebrow">04. What's Next?</span>
            <h2>Get In Touch</h2>
            <p>
                I'm currently looking for internship opportunities and collaborative
                projects. Whether you have a question or just want to say hi, my inbox
                is always open — I'll get back to you as soon as I can.
            </p>
            <div className="social-links">
                <a
                    className="social-link"
                    href="https://github.com/edgardopaz"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="GitHub profile (opens in a new tab)"
                >
                    <svg viewBox="0 0 24 24" aria-hidden="true">
                        <path d="M12 .5a11.5 11.5 0 0 0-3.64 22.41c.58.11.79-.25.79-.56v-2.17c-3.22.7-3.9-1.55-3.9-1.55-.53-1.34-1.3-1.7-1.3-1.7-1.06-.74.08-.73.08-.73 1.18.08 1.8 1.22 1.8 1.22 1.04 1.78 2.73 1.26 3.39.96.11-.76.41-1.26.75-1.55-2.57-.29-5.27-1.29-5.27-5.73 0-1.27.46-2.31 1.21-3.13-.12-.3-.53-1.5.11-3.11 0 0 .99-.32 3.24 1.19a11.2 11.2 0 0 1 5.9 0c2.26-1.51 3.24-1.19 3.24-1.19.64 1.61.24 2.81.12 3.11.75.82 1.21 1.86 1.21 3.13 0 4.45-2.71 5.43-5.29 5.72.42.37.8 1.1.8 2.22v3.29c0 .31.21.68.8.56A11.5 11.5 0 0 0 12 .5Z" />
                    </svg>
                </a>
                <a
                    className="social-link"
                    href="https://www.linkedin.com/in/edgardopazromero"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="LinkedIn profile (opens in a new tab)"
                >
                    <svg viewBox="0 0 24 24" aria-hidden="true">
                        <path d="M22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.226.792 24 1.771 24h20.451C23.2 24 24 23.226 24 22.271V1.729C24 .774 23.2 0 22.225 0ZM7.12 20.452H3.562V9h3.558Zm-1.78-13.03a2.063 2.063 0 1 1 0-4.127 2.063 2.063 0 0 1 0 4.126ZM20.452 20.452h-3.557v-5.605c0-1.337-.027-3.061-1.866-3.061-1.868 0-2.155 1.46-2.155 2.969v5.697H9.317V9h3.414v1.561h.049c.476-.9 1.637-1.848 3.37-1.848 3.6 0 4.27 2.37 4.27 5.456Z" />
                    </svg>
                </a>
                <a
                    className="social-link"
                    href="mailto:edgardopazromero@gmail.com"
                    aria-label="Email"
                >
                    <svg viewBox="0 0 24 24" aria-hidden="true">
                        <path d="M3 5.5h18c.83 0 1.5.67 1.5 1.5v10c0 .83-.67 1.5-1.5 1.5H3c-.83 0-1.5-.67-1.5-1.5v-10c0-.83.67-1.5 1.5-1.5Zm0 2.03V17h18V7.53l-9 5.25-9-5.25Zm9 3.72 8.85-5.17H3.15L12 11.25Z" />
                    </svg>
                </a>
            </div>
        </section>
    );
}

function Footer() {
    return (
        <footer>
            Built with Flask and React • © {new Date().getFullYear()} Edgardo Paz-Romero
        </footer>
    );
}

export function PortfolioPage() {
    const activeSectionRef = useRef('home');
    const observerLockRef = useRef(false);
    const lockTimeoutRef = useRef(null);

    const releaseObserverLockAfter = useCallback((delay) => {
        if (lockTimeoutRef.current) {
            window.clearTimeout(lockTimeoutRef.current);
        }
        lockTimeoutRef.current = window.setTimeout(() => {
            observerLockRef.current = false;
        }, delay);
    }, []);

    const scrollToSection = useCallback((sectionId, { instant = false } = {}) => {
        document.querySelector(`[data-section-id="${sectionId}"]`)?.scrollIntoView({
            behavior: instant ? 'auto' : 'smooth',
            block: 'start',
        });
    }, []);

    useEffect(() => {
        const initialSectionFromWindow = (window.initialSection || '').trim();
        const resolvedInitialSection =
            ROUTE_SECTION_MAP[window.location.pathname] || initialSectionFromWindow || 'home';

        activeSectionRef.current = resolvedInitialSection;
        observerLockRef.current = true;

        window.requestAnimationFrame(() => {
            scrollToSection(resolvedInitialSection, { instant: true });
            const expectedPath = SECTION_ROUTE_MAP[resolvedInitialSection] || '/';
            window.history.replaceState(
                { section: resolvedInitialSection },
                '',
                expectedPath,
            );
            updateActiveNav(resolvedInitialSection);
            releaseObserverLockAfter(500);
        });
    }, [releaseObserverLockAfter, scrollToSection]);

    useEffect(() => {
        const handlePopState = (event) => {
            const sectionId =
                event.state?.section ||
                ROUTE_SECTION_MAP[window.location.pathname] ||
                'home';
            activeSectionRef.current = sectionId;
            updateActiveNav(sectionId);
            observerLockRef.current = true;
            scrollToSection(sectionId);
            releaseObserverLockAfter(600);
        };

        window.addEventListener('popstate', handlePopState);
        return () => window.removeEventListener('popstate', handlePopState);
    }, [releaseObserverLockAfter, scrollToSection]);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                const visibleEntry = entries
                    .filter((entry) => entry.isIntersecting)
                    .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

                if (observerLockRef.current || !visibleEntry) {
                    return;
                }

                const newSection = visibleEntry.target.dataset.sectionId;
                if (newSection && newSection !== activeSectionRef.current) {
                    activeSectionRef.current = newSection;
                    updateActiveNav(newSection);
                    const targetPath = SECTION_ROUTE_MAP[newSection];
                    if (targetPath && window.location.pathname !== targetPath) {
                        window.history.replaceState({ section: newSection }, '', targetPath);
                    }
                }
            },
            { threshold: 0.55, rootMargin: '-20% 0px -20% 0px' },
        );

        document.querySelectorAll('.page-section').forEach((section) => observer.observe(section));
        return () => observer.disconnect();
    }, []);

    useEffect(() => {
        const links = document.querySelectorAll('a[data-section]');
        const handleClick = (event) => {
            event.preventDefault();
            const sectionId = event.currentTarget.dataset.section;
            const targetPath = SECTION_ROUTE_MAP[sectionId];

            if (targetPath && window.location.pathname !== targetPath) {
                window.history.pushState({ section: sectionId }, '', targetPath);
            }

            activeSectionRef.current = sectionId;
            updateActiveNav(sectionId);
            observerLockRef.current = true;
            event.currentTarget.closest('details')?.removeAttribute('open');
            scrollToSection(sectionId);
            releaseObserverLockAfter(600);
        };

        links.forEach((link) => link.addEventListener('click', handleClick));
        return () => links.forEach((link) => link.removeEventListener('click', handleClick));
    }, [releaseObserverLockAfter, scrollToSection]);

    useEffect(
        () => () => {
            if (lockTimeoutRef.current) {
                window.clearTimeout(lockTimeoutRef.current);
            }
        },
        [],
    );

    return (
        <>
            <HeroSection />
            <AboutSection />
            <ExperienceSection />
            <ProjectsSection />
            <ContactSection />
            <Footer />
        </>
    );
}

if (typeof document !== 'undefined') {
    hydrateRoot(document.getElementById('root'), <PortfolioPage />);
}
