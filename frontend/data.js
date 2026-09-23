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
        title: 'Software Engineer Intern, Weather Modeling Platform',
        range: 'May 2026 — Present',
        description: [
            'Rewrote a Python dataset-removal microservice on Kubernetes to recursively delete directory trees, eliminating pod hangs when removing multi-gigabyte Zarr archives.',
            'Train a pycontrails-based contrail prediction model using Zarr weather data on a high-performance computing cluster, integrating it with the MISTK testing harness and evaluating AWS S3 storage.',
            'Participate in Agile biweekly stand-ups, manage task lifecycles in Jira, and maintain source code in GitLab.',
        ],
    },
    {
        id: 'spiideo',
        company: 'Spiideo',
        title: 'Technical Operations Agent',
        range: 'Sept 2026 — Present',
        description: [
            'Monitor logs and incidents across hundreds of concurrent live video streams, surfacing system-level problems before they require escalation.',
            'Triage stream outages through incident.io, using incident threads and log output to diagnose root causes and restore service.',
            'Serve in an on-call rotation focused on observability, log analysis, and troubleshooting across the streaming pipeline.',
        ],
    },
    {
        id: 'owlhacks',
        company: 'Owl Hacks',
        title: 'Operations Team Member',
        range: 'June 2026 — Sept 2026',
        description: [
            'Planned the weekend run of show for Temple University’s hackathon, building the event schedule and programming workshops and trivia.',
            'Recruited guest speakers and coordinated prizes, participant gifts, and catering within event budgets and timelines.',
            'Directed day-of operations, keeping sessions on schedule and resolving logistical issues across organizer teams.',
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
        title: 'Football Transfer Value Predictor',
        description:
            'An end-to-end machine-learning pipeline that combines Transfermarkt valuations with FBref statistics, matches player records across sources, and predicts football transfer values using a leakage-safe temporal split.',
        tech: ['Python', 'pandas', 'scikit-learn', 'BeautifulSoup', 'Matplotlib'],
        links: {
            github: 'https://github.com/edgardopaz/tm-scraper',
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
