export const SECTION_ROUTE_MAP = {
    home: '/',
    projects: '/projects',
    about: '/about-me',
};

export const ROUTE_SECTION_MAP = {
    '/': 'home',
    '/projects': 'projects',
    '/about-me': 'about',
};

export const skills = [
    'Python',
    'TypeScript',
    'JavaScript',
    'Go',
    'Flask',
    'React',
    'Docker',
    'Kubernetes',
    'SQLite',
    'Node.js',
];

export const experiences = [
    {
        id: 'nextgen',
        company: 'NextGen Federal Systems',
        title: 'Software Engineer Intern',
        range: 'May 2026 — Present',
        description: [
            'Containerize and test microservices with Docker and local Kubernetes clusters, simulating production environments for an ML platform.',
            'Automate local test environments with Makefiles that build and push updated images to a local container registry.',
            'Contribute to full-stack functionality with Python backend services and TypeScript frontend interfaces.',
            'Participate in Agile workflows using Jira and GitLab while aligning with the technical lead during regular stand-ups.',
        ],
    },
    {
        id: 'templehci',
        company: 'Temple HCI Lab',
        title: 'Undergraduate Researcher',
        range: 'Nov 2025 — Present',
        description: [
            'Conduct comprehensive literature reviews through the ACM Digital Library and Google Scholar.',
            'Analyze AI adoption and usage patterns among first-generation students.',
            'Collaborate with lab researchers to formulate research questions and design experimental methodologies for HCI studies.',
        ],
    },
    {
        id: 'linneman',
        company: 'Linneman Associates',
        title: 'Web Consultant',
        range: 'Jun 2025 — Present',
        description: [
            'Serve as the technical link between leadership and Wix support, diagnosing and resolving platform issues.',
            'Manage subscriber pages, checkout emails, and product and shipping settings to keep client operations running smoothly.',
        ],
    },
    {
        id: 'altheros',
        company: 'Altheros Capital',
        title: 'Software Engineer Intern',
        range: 'Sept 2025 — Dec 2025',
        description: [
            'Built and maintained React.js components using JSX and standard CSS to deliver responsive user features.',
            'Turned wireframes into functional interfaces with designers, speeding up design-to-deployment.',
            'Created mobile-friendly, accessible layouts that improved usability across devices.',
            'Supported agile workflows through reviews, testing, and stand-ups to improve collaboration.',
        ],
    },
    {
        id: 'zom',
        company: 'Zom Technologies',
        title: 'Software Engineer Intern',
        range: 'May 2025 — Sept 2025',
        description: [
            'Developed responsive user interfaces in React with TSX, enhancing mobile usability.',
            'Linked frontend systems with APIs to ensure consistent, low-latency data handling.',
            'Partnered with designers to streamline workflows and reduce clicks for key tasks.',
            'Documented test plans that de-risked future deployments.',
        ],
    },
];

export const featuredProjects = [
    {
        title: 'Flashcard Flask',
        description:
            'A full-stack learning platform for creating, managing, and studying custom flashcards, with an interactive JavaScript study flow and persistent SQLite-backed progress.',
        tech: ['Python', 'JavaScript', 'Flask', 'SQLite'],
        links: {
            github: 'https://github.com/edgardopaz/flashcard-flask',
        },
    },
    {
        title: 'Password Manager CLI',
        description:
            'A local command-line credential vault built in Go with Cobra and SQLite, featuring Argon2 master-password hashing and flags for complete CRUD workflows.',
        tech: ['Go', 'Cobra', 'SQLite', 'Argon2'],
        links: {
            github: 'https://github.com/edgardopaz/password-vault',
        },
    },
    {
        title: 'LoLdle',
        description:
            'A full-stack Wordle-style game that generates shareable League of Legends challenges, persists game data in SQLite, and exposes reliable REST endpoints for challenge and guess handling.',
        tech: ['Node.js', 'Express', 'SQLite', 'REST APIs'],
        links: {
            live: 'https://loldle.fly.dev',
            report: '/static/images/loldle-technical-report.pdf',
        },
    },
];
