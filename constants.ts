import { Experience, Project, SkillCategory, Service, Certification } from './types';

export const KHALID_BIO = `
You are Khalid. Your journey into technology didn’t start with code — it started with curiosity.
You studied Accounting and Finance, which shaped how you think about structure, numbers, risk, and decision-making.
Over time, that curiosity grew beyond finance into a desire to understand how systems actually work behind the scenes.

Professional History:
- Early experience in administration and finance at the Standard Organisation of Nigeria (SON) and a debt recovery company (taught discipline and accuracy).
- Worked at IBEDC through PIPLL as a DTE, dealing with large-scale real-world infrastructure (taught reliability and responsibility).

Technical Journey (Self-Taught):
- Linux (Kali, Alpine), AWS, Cybersecurity, and Penetration Testing.
- Python for automation and tool building.
- Algorithmic Trading and Forex: leveraging finance background to design and test MT5 trading bots.

Philosophy:
- You don’t just study concepts; you build, test, break, and improve.
- Focus: Cybersecurity, Software Development, Independent Digital Work.
- Goal: Building secure, intentional systems that actually work.
`;

export const SERVICES_DATA: Service[] = [
  {
    id: 'security',
    title: 'Cybersecurity & Digital Forensics',
    description: 'Penetration testing, vulnerability assessments, and forensic investigations using custom Python tools. From network anomaly detection to phishing analysis and incident response.',
    icon: 'Shield'
  },
  {
    id: 'fullstack',
    title: 'Full-Stack Web Development',
    description: 'Modern web applications built with React, TypeScript, and Node.js. E-commerce platforms, client portals, booking systems, and logistics dashboards with responsive design.',
    icon: 'Layers'
  },
  {
    id: 'python-tools',
    title: 'Python Security Tools & Automation',
    description: 'Custom CLI tools for security professionals: forensic toolkits, fraud detection systems, log analyzers, and automation scripts that save hours of manual work.',
    icon: 'Terminal'
  },
  {
    id: 'trading',
    title: 'Trading Systems & FinTech',
    description: 'Algorithmic trading bots for MT5, AI-powered market analysis platforms, real-time fraud detection, and financial risk management tools.',
    icon: 'BarChart3'
  },
  {
    id: 'saas',
    title: 'SaaS Product Development',
    description: 'End-to-end SaaS solutions: event management platforms, rental systems, logistics tracking, and architecture workflow tools with user authentication and admin dashboards.',
    icon: 'Cpu'
  },
  {
    id: 'cloud',
    title: 'Cloud & DevOps',
    description: 'AWS infrastructure setup, Docker containerization, Firebase integration, Vercel deployments, and Linux server administration (Kali, Alpine, Ubuntu).',
    icon: 'Cloud'
  }
];

export const EXPERIENCE_DATA: Experience[] = [
  {
    id: '1',
    role: 'DTE (Distribution Transformer Executive)',
    company: 'PIPLL (IBEDC)',
    period: 'Past',
    description: 'Managed distribution infrastructure, technical operations, and ensured power stability in assigned districts.'
  },
  {
    id: '2',
    role: 'Accounts Department Staff',
    company: 'Standards Organization of Nigeria (SON)',
    period: 'Past',
    description: 'Managed financial records, reconciliation, and administrative accounting duties ensuring regulatory compliance.'
  },
  {
    id: '3',
    role: 'Administrative Officer',
    company: 'Debt Recovery Company',
    period: 'Past',
    description: 'Oversaw case file management, client communications, and general office administration.'
  }
];

export const PROJECT_DATA: Project[] = [
  {
    id: 'lunarlogix',
    title: 'LunarLogix Express',
    description: 'Global logistics platform with real-time shipment tracking, instant quotes, and secure delivery solutions.',
    longDescription: 'LunarLogix Express is a comprehensive logistics and shipping platform serving 220+ countries. Features include real-time package tracking, instant shipping quotes, and a professional admin dashboard for managing shipments.',
    challenge: 'Businesses and individuals needed a reliable, transparent shipping solution with real-time visibility into their package locations and competitive pricing.',
    solution: 'Built a full-stack logistics platform with live tracking integration, automated quote calculations, and a clean UI that instills trust and simplifies the shipping process.',
    tags: ['React', 'Logistics', 'Full-Stack', 'SaaS'],
    techStack: ['React', 'TypeScript', 'Tailwind CSS', 'Firebase', 'Vercel'],
    imageUrl: '/projects/lunarlogix.png',
    category: 'project',
    featured: true,
    githubUrl: 'https://github.com/iamkhalidd/lunarlogix-express',
    liveUrl: 'https://lunarlogix-express.vercel.app/'
  },
  {
    id: 'rentalnest',
    title: 'RentalNest',
    description: 'A full-stack rental platform with booking flows, availability management, and responsive design.',
    longDescription: 'RentalNest is a modern short-let and serviced apartment rental platform. I built the React frontend from scratch, designing intuitive listing pages, a real-time availability calendar, and a seamless booking experience.',
    challenge: 'Small landlords struggled with managing multiple properties across different platforms, leading to double-bookings and lost revenue.',
    solution: 'Built a centralized dashboard with real-time availability sync, automated booking confirmations, and a mobile-first UI that increased conversion rates.',
    tags: ['React', 'Frontend', 'Real Estate', 'UI/UX'],
    techStack: ['React', 'TypeScript', 'Tailwind CSS', 'Firebase', 'Node.js'],
    imageUrl: '/projects/rentalnest-1.png',
    category: 'project',
    featured: true,
    githubUrl: 'https://github.com/iamkhalidd/RentalNest',
    liveUrl: '#'
  },
  {
    id: 'neuroquant',
    title: 'NeuroQuant',
    description: 'AI-assisted trading analysis platform with forecasting, journaling, and risk management tools.',
    longDescription: 'NeuroQuant is a SaaS platform that helps traders make data-driven decisions. It combines AI-powered chart analysis with a trading journal to encourage discipline and track performance over time.',
    challenge: 'Traders often make emotional decisions, ignoring their own rules and lacking a structured way to review past trades.',
    solution: 'Integrated Gemini AI for real-time trade analysis and built a comprehensive journaling system that tracks entries, exits, and emotional state for each trade.',
    tags: ['React', 'Trading', 'AI Analysis', 'SaaS'],
    techStack: ['React', 'TypeScript', 'Gemini API', 'Firebase', 'Recharts'],
    imageUrl: '/projects/neuroquant-2.png',
    category: 'project',
    featured: true,
    githubUrl: 'https://github.com/iamkhalidd/neuroquant-pro',
    liveUrl: '#'
  },
  {
    id: 'mt5-bots',
    title: 'Algorithmic Trading & MT5 Bots',
    description: 'Automated trading systems for BTC, ETH, and XAU/USD with risk-controlled execution.',
    longDescription: 'A suite of Expert Advisors (EAs) for MetaTrader 5 that automate trading strategies. Implements technical indicators like RSI, Moving Averages, and MACD with sophisticated risk management.',
    challenge: 'Manual trading is exhausting and prone to emotional errors, especially during volatile market conditions.',
    solution: 'Developed automated bots with break-even protection, trailing stops, and position sizing algorithms that execute 24/7 without emotional interference.',
    tags: ['Python', 'MQL5', 'Algo Trading', 'Automation'],
    techStack: ['MQL5', 'Python', 'MetaTrader 5', 'Technical Analysis'],
    imageUrl: '/projects/mt5-bots.png',
    category: 'project',
    featured: true,
    githubUrl: 'https://github.com/iamkhalidd',
    liveUrl: '#'
  },
  {
    id: 'security-experiments',
    title: 'Security & API Experiments',
    description: 'Python-based security tools for breach validation, secure requests, and API integration.',
    longDescription: 'A collection of security-focused Python scripts including email breach checkers, secure HTTP request handlers, and API integration tools for threat intelligence.',
    challenge: 'Many developers lack awareness of common security vulnerabilities in their applications.',
    solution: 'Created reusable Python modules for input validation, secure API calls, and automated breach detection that can be integrated into any project.',
    tags: ['Python', 'Cybersecurity', 'API', 'Data Validation'],
    techStack: ['Python', 'Flask', 'REST APIs', 'Docker'],
    imageUrl: '/projects/security-api.png',
    category: 'project',
    githubUrl: 'https://github.com/iamkhalidd'
  },
  {
    id: 'cake-store',
    title: 'Cake & Pastry Store Web App',
    description: 'E-commerce platform for a local bakery with product display and ordering system.',
    longDescription: 'A business-focused web application designed for a local bakery, featuring beautiful product galleries, an intuitive ordering flow, and WhatsApp integration for order confirmations.',
    challenge: 'Small bakeries struggle to showcase their products online and often lose customers to larger chains with better web presence.',
    solution: 'Built a visually stunning, mobile-first storefront with easy product management and direct WhatsApp ordering integration.',
    tags: ['React', 'E-commerce', 'Small Business', 'UI/UX'],
    techStack: ['React', 'CSS', 'WhatsApp API'],
    imageUrl: '/projects/cake-store.png',
    category: 'project',
    githubUrl: 'https://github.com/iamkhalidd/CyberSweet'
  },
  {
    id: 'linux-automation',
    title: 'Linux & Automation Scripts',
    description: 'Python utility scripts for task automation and security testing on Linux.',
    longDescription: 'A growing collection of Python and Bash scripts for automating repetitive tasks, data cleaning, and security testing within Kali and Alpine Linux environments.',
    challenge: 'Repetitive system administration tasks consume valuable time that could be spent on higher-value work.',
    solution: 'Building a personal toolkit of automation scripts that handle common tasks like log rotation, backup, and security scanning.',
    tags: ['Linux', 'Bash', 'Python', 'Automation'],
    techStack: ['Python', 'Bash', 'Linux', 'Docker'],
    imageUrl: '/projects/linux-automation.png',
    category: 'wip',
    githubUrl: 'https://github.com/iamkhalidd'
  },
  {
    id: 'ai-toolkit',
    title: 'AI-Powered Solopreneur Toolkit',
    description: 'Digital product helping solo founders leverage AI for productivity and marketing.',
    longDescription: 'A curated collection of AI prompts, workflows, and templates designed specifically for solo entrepreneurs to automate marketing, content creation, and business operations.',
    tags: ['Digital Product', 'AI', 'Productivity'],
    techStack: ['AI Prompts', 'Notion', 'Automation'],
    imageUrl: '/projects/ai-toolkit.png',
    category: 'product',
    liveUrl: '#'
  },
  {
    id: 'forex-toolkit',
    title: 'Forex Starter Toolkit',
    description: 'Educational resource for beginner traders on market dynamics and risk management.',
    longDescription: 'A comprehensive educational package for beginner traders, covering technical analysis basics, risk management principles, and trading psychology.',
    tags: ['Education', 'Finance', 'Digital Product'],
    techStack: ['Educational Content', 'PDF', 'Video'],
    imageUrl: '/projects/forex-toolkit.png',
    category: 'product',
    liveUrl: '#'
  },
  {
    id: 'network-anomaly',
    title: 'Network Anomaly Detection System',
    description: 'ML-powered network security tool that detects DDoS attacks, port scans, and suspicious traffic patterns in real-time.',
    longDescription: 'A Python-based network security system that uses machine learning to analyze network traffic and detect anomalies. Features real-time packet inspection, traffic visualization, and automated alerting for security threats.',
    challenge: 'Traditional network monitoring tools generate too many false positives and miss sophisticated attack patterns.',
    solution: 'Implemented machine learning models trained on network traffic data to accurately identify DDoS attempts, port scans, and other malicious activities with high precision.',
    tags: ['Python', 'Cybersecurity', 'Machine Learning', 'Network Security'],
    techStack: ['Python', 'Scikit-learn', 'Pandas', 'Scapy', 'NetworkX'],
    imageUrl: '/projects/network-anomaly.png',
    category: 'project',
    featured: true,
    githubUrl: 'https://github.com/iamkhalidd/network_anomaly_detection_system'
  },
  {
    id: 'phishing-detector',
    title: 'Email Phishing Detector',
    description: 'AI-powered email analysis tool that identifies phishing attempts using NLP and pattern recognition.',
    longDescription: 'A sophisticated Python application that analyzes email content, sender information, and embedded links to detect phishing attempts. Uses natural language processing to identify social engineering patterns.',
    challenge: 'Phishing emails are becoming increasingly sophisticated, bypassing traditional spam filters and tricking users.',
    solution: 'Built an ML classifier that analyzes sender verification, URL patterns, and email content with 89%+ confidence in detecting social engineering attacks.',
    tags: ['Python', 'Cybersecurity', 'NLP', 'Email Security'],
    techStack: ['Python', 'NLTK', 'Scikit-learn', 'BeautifulSoup', 'DNS Libraries'],
    imageUrl: '/projects/phishing-detector.png',
    category: 'project',
    githubUrl: 'https://github.com/iamkhalidd/email-phishing-detector'
  },
  {
    id: 'fraud-detection',
    title: 'Real-Time Fraud Detection System',
    description: 'Financial transaction monitoring system with ML-based anomaly detection and risk scoring.',
    longDescription: 'A real-time fraud detection platform that monitors financial transactions, calculates risk scores, and flags suspicious activities. Features geographic fraud mapping and timeline analysis.',
    challenge: 'Financial fraud causes billions in losses annually, and manual review processes cannot scale to handle transaction volumes.',
    solution: 'Developed an automated fraud detection pipeline that analyzes transaction patterns, geographic anomalies, and behavioral indicators in real-time.',
    tags: ['Python', 'Fintech', 'Machine Learning', 'Security'],
    techStack: ['Python', 'Pandas', 'Scikit-learn', 'Plotly', 'FastAPI'],
    imageUrl: '/projects/fraud-detection.png',
    category: 'project',
    githubUrl: 'https://github.com/iamkhalidd/real_time_fraud_system'
  },
  {
    id: 'eventgo',
    title: 'EventGO Platform',
    description: 'Modern event management platform with ticketing, attendee management, and QR code check-in.',
    longDescription: 'A full-stack event management solution featuring event creation, ticket sales analytics, attendee management, and QR-based check-in systems for seamless event operations.',
    challenge: 'Event organizers struggle with fragmented tools for ticketing, attendee tracking, and day-of-event check-in.',
    solution: 'Built an all-in-one platform that handles the entire event lifecycle from creation to post-event analytics with real-time attendee insights.',
    tags: ['React', 'Full-Stack', 'Events', 'SaaS'],
    techStack: ['React', 'TypeScript', 'Node.js', 'PostgreSQL', 'QR Code API'],
    imageUrl: '/projects/eventgo.png',
    category: 'project',
    githubUrl: 'https://github.com/iamkhalidd/EVENTGO'
  },
  {
    id: 'atelier-anj',
    title: 'Atelier ANJ - Architectural Workflow',
    description: 'Premium architecture firm website with client portal, project workflow management, and curated portfolio showcase.',
    longDescription: 'A sophisticated digital platform for an architectural practice featuring a stunning portfolio display, transparent project workflow system (Vision → Design → Development → Execution), and client portal for project tracking and approvals.',
    challenge: 'Architectural firms need to showcase their work beautifully while giving clients visibility into project progress without opaque timelines or hidden costs.',
    solution: 'Built a premium website with elegant design aesthetics, curated project galleries, and a 4-step workflow system that provides complete transparency from brief to execution.',
    tags: ['React', 'Architecture', 'Full-Stack', 'Client Portal'],
    techStack: ['React', 'TypeScript', 'Tailwind CSS', 'Firebase', 'Vercel'],
    imageUrl: '/projects/atelier-anj.png',
    category: 'project',
    featured: true,
    githubUrl: 'https://github.com/iamkhalidd/atelier-anj---architectural-workflow--1-',
    liveUrl: 'https://atelier-anj.vercel.app/'
  },
  {
    id: 'specter',
    title: 'SPECTER - Forensic Toolkit',
    description: 'A powerful Python CLI tool for security professionals to accelerate forensic investigations.',
    longDescription: 'SPECTER is a cross-platform cybersecurity forensic toolkit featuring file forensics (hash, entropy, YARA scanning), log analysis for attack detection, network forensics (PCAP analysis), threat intelligence (IP reputation, IOC scan), system analysis, and HTML/JSON report generation.',
    challenge: 'Security professionals need comprehensive forensic tools that are fast, cross-platform, and can generate actionable reports during incident response.',
    solution: 'Built a modular CLI toolkit with 7 core features: file forensics, log analysis, network forensics, threat intelligence, system analysis, report generation, and configurable settings.',
    tags: ['Python', 'Cybersecurity', 'CLI', 'Forensics'],
    techStack: ['Python', 'YARA', 'PCAP Analysis', 'Threat Intelligence APIs'],
    imageUrl: '/projects/specter.png',
    category: 'project',
    featured: true,
    githubUrl: 'https://github.com/iamkhalidd/specter'
  }
];

export const SKILLS_DATA = [
  // Cybersecurity
  { name: 'Kali Linux', category: SkillCategory.CYBERSECURITY, value: 90 },
  { name: 'Penetration Testing', category: SkillCategory.CYBERSECURITY, value: 85 },
  { name: 'Digital Forensics', category: SkillCategory.CYBERSECURITY, value: 80 },
  { name: 'Network Security', category: SkillCategory.CYBERSECURITY, value: 85 },
  // Development
  { name: 'Python', category: SkillCategory.DEVELOPMENT, value: 90 },
  { name: 'React / TypeScript', category: SkillCategory.DEVELOPMENT, value: 85 },
  { name: 'Node.js', category: SkillCategory.DEVELOPMENT, value: 75 },
  { name: 'REST APIs', category: SkillCategory.DEVELOPMENT, value: 80 },
  // Cloud & DevOps
  { name: 'AWS', category: SkillCategory.CLOUD, value: 70 },
  { name: 'Docker', category: SkillCategory.CLOUD, value: 75 },
  { name: 'Firebase', category: SkillCategory.CLOUD, value: 85 },
  { name: 'Linux Admin', category: SkillCategory.CLOUD, value: 85 },
  // Trading & FinTech
  { name: 'MQL5 / MT5', category: SkillCategory.TRADING, value: 85 },
  { name: 'Technical Analysis', category: SkillCategory.TRADING, value: 90 },
  { name: 'Algo Trading', category: SkillCategory.TRADING, value: 80 },
  // Design
  { name: 'UI/UX Design', category: SkillCategory.DESIGN, value: 75 },
  { name: 'Tailwind CSS', category: SkillCategory.DESIGN, value: 90 },
];

// Add your certifications here - replace placeholders with your actual credentials
export const CERTIFICATIONS_DATA: Certification[] = [
  {
    id: 'cert-1',
    name: 'CompTIA Security+',
    issuer: 'CompTIA',
    date: 'Expected 2026',
    category: 'cybersecurity',
    // credentialUrl: 'https://www.credly.com/...',
    // badgeUrl: 'https://...'
  },
  {
    id: 'cert-2',
    name: 'Google Cybersecurity Certificate',
    issuer: 'Google',
    date: 'In Progress',
    category: 'cybersecurity',
  },
  {
    id: 'cert-3',
    name: 'AWS Cloud Practitioner',
    issuer: 'Amazon Web Services',
    date: 'Expected 2026',
    category: 'cloud',
  },
  // Add more certifications as needed
];