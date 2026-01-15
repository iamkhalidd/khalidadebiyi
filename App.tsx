import React, { useState, useEffect } from 'react';
import {
  Terminal,
  Cloud,
  Code2,
  BarChart3,
  Shield,
  Github,
  Linkedin,
  Mail,
  Layers,
  ChevronDown,
  ExternalLink,
  PenTool,
  Briefcase,
  Cpu,
  CheckCircle2,
  Menu,
  X,
  Sparkles,
  Construction,
  Loader2,
  CheckCircle
} from 'lucide-react';
import AIChat from './components/AIChat';
import SkillRadar from './components/SkillRadar';
import ProjectModal from './components/ProjectModal';
import { EXPERIENCE_DATA, PROJECT_DATA, SERVICES_DATA } from './constants';
import CredlyBadges from './components/CredlyBadges';
import { Project } from './types';

const App: React.FC = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [projectFilter, setProjectFilter] = useState<'all' | 'project' | 'product' | 'wip'>('all');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  // Contact Form State
  const [contactForm, setContactForm] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // YOUR FORMSPREE FORM ID
  const FORMSPREE_FORM_ID = "mdkqjerp";

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'about', 'services', 'skills', 'certifications', 'projects', 'contact'];
      const scrollPosition = window.scrollY + 150;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element && element.offsetTop <= scrollPosition && (element.offsetTop + element.offsetHeight) > scrollPosition) {
          setActiveSection(section);
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>, sectionId: string) => {
    e.preventDefault();
    const element = document.getElementById(sectionId);
    if (element) {
      const headerOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });

      setActiveSection(sectionId);
      setIsMobileMenuOpen(false);
      window.history.pushState(null, '', `#${sectionId}`);
    }
  };

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // 1. If no Formspree ID is set, fallback to 'mailto'
    if (!FORMSPREE_FORM_ID) {
      setTimeout(() => {
        const subject = `Portfolio Inquiry from ${contactForm.name || 'Visitor'}`;
        const body = `Name: ${contactForm.name}\nContact Email: ${contactForm.email}\n\nMessage:\n${contactForm.message}`;
        window.location.href = `mailto:khalidadebiyi@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
        setIsSubmitting(false);
        setIsSubmitted(true); // Fixed: Changed setSubmitted to setIsSubmitted
      }, 1000);
      return;
    }

    // 2. If Formspree ID is set, send direct POST request
    try {
      const response = await fetch(`https://formspree.io/f/${FORMSPREE_FORM_ID}`, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(contactForm)
      });

      if (response.ok) {
        setIsSubmitted(true);
        setContactForm({ name: '', email: '', message: '' });
      } else {
        alert("Something went wrong. Please try again or email me directly.");
      }
    } catch (error) {
      alert("Error sending message. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const getIcon = (name: string) => {
    switch (name) {
      case 'Shield': return <Shield size={32} className="text-cyber-green" />;
      case 'Code2': return <Code2 size={32} className="text-cyber-blue" />;
      case 'BarChart3': return <BarChart3 size={32} className="text-yellow-500" />;
      case 'PenTool': return <PenTool size={32} className="text-purple-500" />;
      case 'Cloud': return <Cloud size={32} className="text-cyan-400" />;
      default: return <Terminal size={32} className="text-gray-400" />;
    }
  };

  const getBadgeStyle = (category: string | undefined) => {
    switch (category) {
      case 'product': return 'bg-purple-500/20 text-purple-300 border-purple-500/30';
      case 'wip': return 'bg-orange-500/20 text-orange-300 border-orange-500/30';
      default: return 'bg-blue-500/20 text-blue-300 border-blue-500/30';
    }
  };

  const getBadgeLabel = (category: string | undefined) => {
    switch (category) {
      case 'product': return 'Digital Product';
      case 'wip': return 'In Progress';
      default: return 'Project';
    }
  };

  const filteredProjects = projectFilter === 'all'
    ? PROJECT_DATA
    : PROJECT_DATA.filter(p => p.category === projectFilter);

  const featuredProjects = filteredProjects.filter(p => p.featured);
  const standardProjects = filteredProjects.filter(p => !p.featured);

  return (
    <div className="min-h-screen text-gray-300 font-sans relative overflow-x-hidden bg-[#05070a]">

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-40 bg-cyber-dark/90 backdrop-blur-md border-b border-gray-800 h-16 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center justify-between">
          {/* Logo */}
          <div
            className="flex items-center space-x-2 cursor-pointer group"
            onClick={(e) => scrollToSection(e as any, 'home')}
          >
            <Terminal className="text-cyber-green group-hover:text-white transition-colors" size={24} />
            <span className="font-mono font-bold text-lg text-white tracking-tighter group-hover:text-cyber-green transition-colors">
              KHALID<span className="text-cyber-green group-hover:text-white">_DEV</span>
            </span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            {['Home', 'About', 'Services', 'Skills', 'Certs', 'Projects', 'Contact'].map((item) => {
              const sectionId = item === 'Certs' ? 'certifications' : item.toLowerCase();
              return (
                <a
                  key={item}
                  href={`#${sectionId}`}
                  onClick={(e) => scrollToSection(e, sectionId)}
                  className={`text-sm font-medium transition-all hover:text-cyber-green relative ${activeSection === sectionId ? 'text-cyber-green' : 'text-gray-400'
                    }`}
                >
                  {item}
                  {activeSection === sectionId && (
                    <span className="absolute -bottom-5 left-0 right-0 h-0.5 bg-cyber-green shadow-[0_0_10px_rgba(0,255,65,0.5)] animate-fade-in"></span>
                  )}
                </a>
              );
            })}
          </div>

          {/* Mobile Menu Toggle */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-gray-300 hover:text-white focus:outline-none"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-cyber-dark/95 backdrop-blur-xl border-b border-gray-800 absolute w-full">
            <div className="px-4 pt-2 pb-6 space-y-2">
              {['Home', 'About', 'Services', 'Skills', 'Certs', 'Projects', 'Contact'].map((item) => {
                const sectionId = item === 'Certs' ? 'certifications' : item.toLowerCase();
                return (
                  <a
                    key={item}
                    href={`#${sectionId}`}
                    onClick={(e) => scrollToSection(e, sectionId)}
                    className={`block px-3 py-3 rounded-md text-base font-medium ${activeSection === sectionId
                      ? 'text-cyber-green bg-gray-900/50 border-l-2 border-cyber-green'
                      : 'text-gray-300 hover:text-white hover:bg-gray-800'
                      }`}
                  >
                    {item}
                  </a>
                );
              })}
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section id="home" className="min-h-screen flex flex-col justify-center items-center pt-16 px-4 relative bg-[url('https://images.unsplash.com/photo-1550751827-4bd374c3f58b?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80')] bg-cover bg-center bg-no-repeat">
        <div className="absolute inset-0 bg-cyber-dark/90 bg-[radial-gradient(circle_at_center,_transparent_0%,_#0d1117_80%)]"></div>
        <div className="relative z-10 text-center max-w-5xl mx-auto px-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 mb-6 border border-cyber-green/30 rounded-full bg-cyber-green/10 text-cyber-green text-xs font-mono tracking-wide animate-fade-in-up">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
            </span>
            OPEN TO WORK • UPWORK & FREELANCE
          </div>

          <h1 className="text-4xl sm:text-6xl md:text-7xl font-bold text-white mb-6 tracking-tight leading-tight">
            Securing Systems.<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyber-green via-blue-400 to-purple-500">Building Products.</span><br />
            Analyzing Markets.
          </h1>

          <p className="text-lg md:text-xl text-gray-400 mb-10 max-w-3xl mx-auto leading-relaxed font-light">
            I am <span className="text-white font-semibold">Khalid</span>. A versatile digital professional mastering the intersection of Cybersecurity, Python Development, and Financial Markets. From Kali Linux to AWS, I build and secure the digital future.
          </p>

          <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-4">
            <a
              href="#projects"
              onClick={(e) => scrollToSection(e, 'projects')}
              className="px-8 py-3.5 bg-cyber-green text-cyber-dark font-bold rounded hover:bg-green-400 transition-all shadow-[0_0_20px_rgba(0,255,65,0.3)] hover:shadow-[0_0_30px_rgba(0,255,65,0.5)] transform hover:-translate-y-1 cursor-pointer"
            >
              View Portfolio
            </a>
            <a
              href="#services"
              onClick={(e) => scrollToSection(e, 'services')}
              className="px-8 py-3.5 bg-gray-800/50 border border-gray-600 text-white rounded hover:bg-gray-800 hover:border-gray-400 transition-all backdrop-blur-sm cursor-pointer"
            >
              My Services
            </a>
          </div>
        </div>

        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce text-gray-500 cursor-pointer" onClick={(e) => scrollToSection(e as any, 'about')}>
          <ChevronDown size={30} />
        </div>
      </section >

      {/* About & Experience Section */}
      < section id="about" className="py-24 px-4 bg-cyber-dark relative overflow-hidden" >
        {/* Decorative Elements */}
        < div className="absolute top-0 right-0 w-96 h-96 bg-cyber-blue/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" ></div >

        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <div>
              <div className="mb-8">
                <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
                  <div className="p-2 bg-gray-800 rounded-lg text-cyber-green">
                    <Cpu size={24} />
                  </div>
                  About Me
                </h2>
                <div className="prose prose-invert text-gray-400 leading-relaxed">
                  <p className="mb-4">
                    My journey into technology didn’t start with code — it started with curiosity. I studied <span className="text-cyber-green font-medium">Accounting and Finance</span>, which shaped how I think about structure, numbers, risk, and decision-making. Over time, that curiosity grew beyond finance into a desire to understand how systems actually work behind the scenes.
                  </p>
                  <p className="mb-4">
                    My early professional experience was in administration and finance. I worked at the <span className="text-white">Standard Organisation of Nigeria (SON)</span> in the accounts office and later with a debt recovery company, roles that taught me discipline, accuracy, and respect for structured processes.
                  </p>
                  <p className="mb-4">
                    I later worked at <span className="text-white">IBEDC (through PIPLL)</span> as a DTE, where I was exposed to large-scale, real-world infrastructure. That experience changed how I think about reliability, responsibility, and systems that people depend on every day.
                  </p>
                  <p className="mb-4">
                    Alongside my work history, I began building technical skills independently. I taught myself <span className="text-cyber-green">Linux</span>, explored Kali and Alpine Linux, worked with AWS, and immersed myself in <span className="text-cyber-green">cybersecurity</span> and penetration testing. I also use Python to automate tasks and build practical tools.
                  </p>
                  <p className="mb-4">
                    With my finance background, I naturally became interested in algorithmic trading and Forex, where logic, risk management, and discipline matter as much as code. I design and test <span className="text-white">MT5 trading bots</span>, continuously refining how systems behave under pressure.
                  </p>
                  <p>
                    What defines me is how I learn — I don’t just study concepts, I build, test, break, and improve. I’m focused on growing in cybersecurity, software development, and independent digital work, with the long-term goal of building secure, intentional systems that actually work.
                  </p>
                </div>
              </div>

              <div className="bg-[#161b22] border border-gray-800 rounded-xl p-6 mb-8 relative overflow-hidden group">
                <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-cyber-green to-transparent"></div>
                <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                  <Terminal size={18} className="text-cyber-green" /> Current Focus & Learning
                </h3>
                <ul className="space-y-3 text-sm text-gray-400">
                  <li className="flex items-start gap-3">
                    <CheckCircle2 size={16} className="text-cyber-green shrink-0 mt-0.5" />
                    <span>Building structured learning routines in Cybersecurity & Python (Beginner to Pro).</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 size={16} className="text-cyber-green shrink-0 mt-0.5" />
                    <span>Securing penetration testing jobs on Upwork using skills in Kali & Alpine Linux.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 size={16} className="text-cyber-green shrink-0 mt-0.5" />
                    <span>Expanding Cloud Architecture knowledge, specifically AWS EC2 & VM setup.</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="relative">
              <h3 className="text-xl font-bold text-white mb-8 pl-2 border-l-4 border-cyber-blue">Professional Journey</h3>
              <div className="space-y-8 relative pl-8 before:absolute before:left-[7px] before:top-2 before:bottom-2 before:w-[2px] before:bg-gray-800">
                {EXPERIENCE_DATA.map((job, index) => (
                  <div key={job.id} className="relative group">
                    <div className={`absolute -left-[39px] bg-[#0d1117] border-4 ${index === 0 ? 'border-cyber-green' : 'border-gray-700'} rounded-full w-4 h-4 transition-colors group-hover:border-cyber-blue`}></div>
                    <div className="glass-panel p-6 rounded-lg transition-all duration-300 hover:-translate-x-[-5px] hover:border-gray-600">
                      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-2">
                        <h4 className="text-lg font-bold text-white group-hover:text-cyber-blue transition-colors">{job.role}</h4>
                        <span className={`text-xs font-mono px-2 py-1 rounded mt-1 sm:mt-0 ${index === 0 ? 'bg-cyber-green/20 text-cyber-green' : 'bg-gray-800 text-gray-400'}`}>{job.period}</span>
                      </div>
                      <p className="text-sm text-cyber-blue/80 font-medium mb-3">{job.company}</p>
                      <p className="text-sm text-gray-400 leading-relaxed">{job.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section >

      {/* Services Section */}
      < section id="services" className="py-24 px-4 bg-[#0f1218]" >
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-white mb-4">What I Offer</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Specialized services for businesses and individuals. Available for hire on Upwork and contract roles.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {SERVICES_DATA.map((service) => (
              <div key={service.id} className="glass-panel p-8 rounded-xl hover:bg-gray-800/50 transition-all duration-300 hover:-translate-y-2 border-t-2 border-t-transparent hover:border-t-cyber-green group">
                <div className="w-14 h-14 rounded-lg bg-gray-800 flex items-center justify-center mb-6 group-hover:bg-gray-700 transition-colors">
                  {getIcon(service.icon)}
                </div>
                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-cyber-green transition-colors">{service.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  {service.description}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <a
              href="#contact"
              onClick={(e) => scrollToSection(e, 'contact')}
              className="inline-flex items-center gap-2 text-cyber-green hover:text-white font-medium transition-colors border-b border-transparent hover:border-cyber-green pb-0.5 cursor-pointer"
            >
              Start a project with me <Briefcase size={16} />
            </a>
          </div>
        </div>
      </section >

      {/* Skills Section */}
      < section id="skills" className="py-24 px-4 bg-cyber-dark border-y border-gray-800" >
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12">
            <div className="max-w-2xl">
              <h2 className="text-3xl font-bold text-white mb-4">Technical Arsenal</h2>
              <p className="text-gray-400">
                My expertise spans across secure infrastructure, algorithmic trading, and modern web development.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1 grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Skill Group */}
              <div className="p-5 rounded-xl bg-[#161b22] border border-gray-800 hover:border-cyber-green/30 transition-colors">
                <div className="flex items-center gap-3 text-white font-bold mb-4">
                  <div className="p-2 bg-blue-500/10 rounded-lg"><Code2 size={20} className="text-blue-400" /></div> Development
                </div>
                <ul className="space-y-2.5 text-sm text-gray-400">
                  <li className="flex items-center justify-between"><span>Python (Scripting/Auto)</span> <span className="text-xs bg-gray-800 px-2 py-0.5 rounded text-gray-300">Adv</span></li>
                  <li className="flex items-center justify-between"><span>Next.js & React</span> <span className="text-xs bg-gray-800 px-2 py-0.5 rounded text-gray-300">Int</span></li>
                  <li className="flex items-center justify-between"><span>Flask & Docker</span> <span className="text-xs bg-gray-800 px-2 py-0.5 rounded text-gray-300">Int</span></li>
                </ul>
              </div>

              <div className="p-5 rounded-xl bg-[#161b22] border border-gray-800 hover:border-cyber-green/30 transition-colors">
                <div className="flex items-center gap-3 text-white font-bold mb-4">
                  <div className="p-2 bg-green-500/10 rounded-lg"><Shield size={20} className="text-green-400" /></div> Security
                </div>
                <ul className="space-y-2.5 text-sm text-gray-400">
                  <li className="flex items-center justify-between"><span>Kali Linux</span> <span className="text-xs bg-gray-800 px-2 py-0.5 rounded text-gray-300">Pro</span></li>
                  <li className="flex items-center justify-between"><span>Alpine Linux</span> <span className="text-xs bg-gray-800 px-2 py-0.5 rounded text-gray-300">Int</span></li>
                  <li className="flex items-center justify-between"><span>AWS Cloud VMs</span> <span className="text-xs bg-gray-800 px-2 py-0.5 rounded text-gray-300">Int</span></li>
                </ul>
              </div>

              <div className="p-5 rounded-xl bg-[#161b22] border border-gray-800 hover:border-cyber-green/30 transition-colors">
                <div className="flex items-center gap-3 text-white font-bold mb-4">
                  <div className="p-2 bg-yellow-500/10 rounded-lg"><BarChart3 size={20} className="text-yellow-400" /></div> Trading
                </div>
                <ul className="space-y-2.5 text-sm text-gray-400">
                  <li className="flex items-center justify-between"><span>Tech Analysis</span> <span className="text-xs bg-gray-800 px-2 py-0.5 rounded text-gray-300">Exp</span></li>
                  <li className="flex items-center justify-between"><span>MQL5 (MT5 Bots)</span> <span className="text-xs bg-gray-800 px-2 py-0.5 rounded text-gray-300">Int</span></li>
                  <li className="flex items-center justify-between"><span>Scalping Strategies</span> <span className="text-xs bg-gray-800 px-2 py-0.5 rounded text-gray-300">Pro</span></li>
                </ul>
              </div>

              <div className="p-5 rounded-xl bg-[#161b22] border border-gray-800 hover:border-cyber-green/30 transition-colors">
                <div className="flex items-center gap-3 text-white font-bold mb-4">
                  <div className="p-2 bg-purple-500/10 rounded-lg"><Layers size={20} className="text-purple-400" /></div> Creative
                </div>
                <ul className="space-y-2.5 text-sm text-gray-400">
                  <li className="flex items-center justify-between"><span>Logo Design</span> <span className="text-xs bg-gray-800 px-2 py-0.5 rounded text-gray-300">Pro</span></li>
                  <li className="flex items-center justify-between"><span>YouTube Automation</span> <span className="text-xs bg-gray-800 px-2 py-0.5 rounded text-gray-300">Int</span></li>
                  <li className="flex items-center justify-between"><span>Digital Products</span> <span className="text-xs bg-gray-800 px-2 py-0.5 rounded text-gray-300">Int</span></li>
                </ul>
              </div>
            </div>

            <div className="order-1 lg:order-2 glass-panel p-4 rounded-xl h-[400px] flex items-center justify-center">
              <SkillRadar />
            </div>
          </div>
        </div>
      </section >

      {/* Certifications Section */}
      <section id="certifications" className="py-24 px-4 bg-[#0f1218]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">Certifications & Badges</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Professional credentials validating my expertise in cybersecurity, cloud infrastructure, and development.
            </p>
          </div>

          {/* Credly Badges */}
          <div className="glass-panel p-8 rounded-2xl border border-gray-800">
            <CredlyBadges
              badgeIds={[
                '9ab7f516-bba1-4ba0-89e9-2a9b7bc2ae49',
                '8ad52b68-583c-44fa-ad56-5c9a80600004',
                '110b554f-e0e9-4140-a644-7d60a7579022',
                '6ccb2a57-001c-4184-aeb0-e3dc60b8f0a9',
                'b83f5cb1-ab6d-4db1-9ba1-e611aa37c185',
                'bd747121-20ea-4ec6-8045-3d23d328e4aa',
                '8a4fb54e-f21b-4f36-bf44-41b1e42a69a1',
                'b086082d-591f-444f-8416-3f83ca930fc2'
              ]}
            />
          </div>

          {/* Call to Action */}
          <div className="mt-12 text-center">
            <p className="text-gray-500 text-sm">
              Click any badge to verify on Credly
            </p>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      < section id="projects" className="py-24 px-4 bg-[#0f1218]" >
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-8">
            <div>
              <h2 className="text-3xl font-bold text-white mb-2">Portfolio</h2>
              <p className="text-gray-400">A showcase of my projects, products, and ongoing work.</p>
            </div>
            <div className="flex flex-wrap gap-2 mt-4 md:mt-0 bg-gray-800/50 p-1 rounded-lg backdrop-blur-sm">
              {[
                { id: 'all', label: 'All' },
                { id: 'project', label: 'Projects', icon: <Code2 size={14} /> },
                { id: 'product', label: 'Products', icon: <Layers size={14} /> },
                { id: 'wip', label: 'WIP', icon: <Construction size={14} /> }
              ].map((filter) => (
                <button
                  key={filter.id}
                  onClick={() => setProjectFilter(filter.id as any)}
                  className={`px-3 py-1.5 text-sm font-medium rounded-md transition-all flex items-center gap-2 ${projectFilter === filter.id
                    ? 'bg-cyber-green text-cyber-dark shadow-sm'
                    : 'text-gray-400 hover:text-white'
                    }`}
                >
                  {filter.icon && <span>{filter.icon}</span>}
                  {filter.label}
                </button>
              ))}
            </div>
          </div>

          {/* Featured Projects Grid */}
          {featuredProjects.length > 0 && (
            <div className="mb-12">
              <h3 className="text-lg font-semibold text-cyber-green mb-6 flex items-center gap-2">
                <Sparkles size={18} /> Featured Work
              </h3>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {featuredProjects.map((project) => (
                  <div
                    key={project.id}
                    onClick={() => setSelectedProject(project)}
                    className="group relative overflow-hidden rounded-xl glass-panel border-2 border-cyber-green/30 transition-all duration-500 hover:-translate-y-3 hover:shadow-[0_10px_40px_-10px_rgba(0,255,65,0.3)] hover:border-cyber-green cursor-pointer"
                  >
                    {/* Featured Badge */}
                    <div className="absolute top-3 right-3 z-10">
                      <span className="px-2 py-1 text-xs font-bold bg-cyber-green text-cyber-dark rounded-full flex items-center gap-1">
                        <Sparkles size={10} /> Featured
                      </span>
                    </div>
                    {/* Image Container */}
                    <div className="aspect-[4/3] overflow-hidden bg-gray-900 relative">
                      <img
                        src={project.imageUrl}
                        alt={project.title}
                        className="w-full h-full object-cover transition-all duration-700 ease-out group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#161b22] via-[#161b22]/50 to-transparent"></div>
                    </div>

                    {/* Content */}
                    <div className="p-5 relative">
                      <span className={`inline-block px-2 py-0.5 text-xs font-bold rounded-full backdrop-blur-md border mb-3 ${getBadgeStyle(project.category)}`}>
                        {getBadgeLabel(project.category)}
                      </span>
                      <h3 className="text-lg font-bold text-white mb-2 group-hover:text-cyber-green transition-colors duration-300">
                        {project.title}
                      </h3>
                      <p className="text-sm text-gray-400 mb-4 line-clamp-2">
                        {project.description}
                      </p>
                      <div className="flex flex-wrap gap-1.5">
                        {project.techStack?.slice(0, 3).map((tech) => (
                          <span key={tech} className="px-2 py-0.5 text-xs font-mono bg-cyber-green/10 text-cyber-green rounded">
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Standard Projects Grid */}
          {standardProjects.length > 0 && (
            <div>
              {featuredProjects.length > 0 && (
                <h3 className="text-lg font-semibold text-gray-400 mb-6 flex items-center gap-2">
                  <Code2 size={18} /> More Projects
                </h3>
              )}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {standardProjects.map((project) => (
                  <div
                    key={project.id}
                    onClick={() => setSelectedProject(project)}
                    className="group relative overflow-hidden rounded-xl glass-panel border border-gray-800 transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_10px_40px_-10px_rgba(0,255,65,0.15)] hover:border-cyber-green/30 cursor-pointer"
                  >
                    {/* Image Container */}
                    <div className="aspect-video overflow-hidden bg-gray-900 relative">
                      <img
                        src={project.imageUrl}
                        alt={project.title}
                        className="w-full h-full object-cover opacity-70 grayscale-[0.3] transition-all duration-700 ease-out group-hover:scale-105 group-hover:grayscale-0 group-hover:opacity-100"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#161b22] via-transparent to-transparent opacity-90"></div>

                      {/* Tag Badge */}
                      <div className="absolute top-3 left-3">
                        <span className={`px-2 py-0.5 text-xs font-bold rounded-full backdrop-blur-md border ${getBadgeStyle(project.category)}`}>
                          {getBadgeLabel(project.category)}
                        </span>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-4 relative">
                      <h3 className="text-base font-bold text-white mb-1 group-hover:text-cyber-green transition-colors duration-300">
                        {project.title}
                      </h3>
                      <p className="text-xs text-gray-400 mb-3 line-clamp-2">
                        {project.description}
                      </p>
                      <div className="flex flex-wrap gap-1.5">
                        {project.tags.slice(0, 3).map((tag) => (
                          <span key={tag} className="px-2 py-0.5 text-xs font-mono bg-gray-800 text-gray-500 rounded border border-gray-700/50">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section >

      {/* Project Modal */}
      < ProjectModal
        project={selectedProject}
        isOpen={!!selectedProject}
        onClose={() => setSelectedProject(null)}
      />

      {/* Contact Section */}
      <section id="contact" className="py-24 px-4 bg-cyber-dark relative">
        <div className="max-w-4xl mx-auto relative z-10">
          <div className="glass-panel rounded-2xl p-8 md:p-12 border-t border-cyber-green/20">
            <div className="text-center mb-10">
              <h2 className="text-3xl font-bold text-white mb-4">Let's Work Together</h2>
              <p className="text-gray-400 max-w-2xl mx-auto">
                I am currently open to freelance opportunities on Upwork and full-time roles.
                Whether you need a secure Python script, a trading bot, or cloud infrastructure help, I'm ready to deploy.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              <a href="mailto:khalidadebiyi@gmail.com" className="flex flex-col items-center p-6 bg-gray-800/50 rounded-xl hover:bg-gray-800 transition-all group border border-transparent hover:border-cyber-green/50">
                <div className="w-12 h-12 rounded-full bg-gray-900 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Mail className="text-cyber-green" />
                </div>
                <span className="text-sm font-medium text-gray-300 group-hover:text-white">Email Me</span>
                <span className="text-xs text-gray-500 mt-1">khalidadebiyi@gmail.com</span>
              </a>

              <a href="https://www.linkedin.com/in/khalid-adebiyi-a99157174" target="_blank" rel="noopener noreferrer" className="flex flex-col items-center p-6 bg-gray-800/50 rounded-xl hover:bg-gray-800 transition-all group border border-transparent hover:border-blue-500/50">
                <div className="w-12 h-12 rounded-full bg-gray-900 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Linkedin className="text-blue-500" />
                </div>
                <span className="text-sm font-medium text-gray-300 group-hover:text-white">LinkedIn</span>
                <span className="text-xs text-gray-500 mt-1">Professional Profile</span>
              </a>

              <a href="https://www.upwork.com/freelancers/~010dfac3d251b1a570" target="_blank" rel="noopener noreferrer" className="flex flex-col items-center p-6 bg-gray-800/50 rounded-xl hover:bg-gray-800 transition-all group border border-transparent hover:border-purple-500/50">
                <div className="w-12 h-12 rounded-full bg-gray-900 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Briefcase className="text-purple-500" />
                </div>
                <span className="text-sm font-medium text-gray-300 group-hover:text-white">Upwork</span>
                <span className="text-xs text-gray-500 mt-1">Hire Me Now</span>
              </a>
            </div>

            {isSubmitted ? (
              <div className="text-center py-12 animate-fade-in bg-gray-800/30 rounded-lg border border-cyber-green/30">
                <div className="flex justify-center mb-4">
                  <CheckCircle className="text-cyber-green h-16 w-16" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">Message Received!</h3>
                <p className="text-gray-400 max-w-md mx-auto">
                  Thank you for reaching out. I'll get back to you at <span className="text-cyber-green">{contactForm.email}</span> as soon as possible.
                </p>
                <button
                  onClick={() => setIsSubmitted(false)}
                  className="mt-6 text-sm text-gray-500 hover:text-white underline"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form className="space-y-4 max-w-lg mx-auto" onSubmit={handleContactSubmit}>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="Name"
                    value={contactForm.name}
                    onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                    className="bg-gray-900 border border-gray-700 rounded-lg px-4 py-3 text-gray-300 focus:outline-none focus:border-cyber-green transition-colors placeholder-gray-600"
                    required
                  />
                  <input
                    type="email"
                    placeholder="Email"
                    value={contactForm.email}
                    onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                    className="bg-gray-900 border border-gray-700 rounded-lg px-4 py-3 text-gray-300 focus:outline-none focus:border-cyber-green transition-colors placeholder-gray-600"
                    required
                  />
                </div>
                <textarea
                  placeholder="Project Details..."
                  rows={4}
                  value={contactForm.message}
                  onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                  className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-3 text-gray-300 focus:outline-none focus:border-cyber-green transition-colors placeholder-gray-600"
                  required
                ></textarea>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full bg-cyber-green text-cyber-dark font-bold py-3 rounded-lg hover:bg-green-400 transition-all flex items-center justify-center gap-2 ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="animate-spin" size={18} /> Sending...
                    </>
                  ) : (
                    <>
                      <Mail size={18} /> Send Message
                    </>
                  )}
                </button>
              </form>
            )}
          </div>

          <footer className="text-gray-600 text-sm text-center mt-16">
            <p>© {new Date().getFullYear()} Khalid. All rights reserved.</p>
            <p className="mt-2 flex items-center justify-center gap-1">
              Built with <Code2 size={12} /> React, Tailwind & Gemini AI.
            </p>
          </footer>
        </div>
      </section>

      {/* AI Chatbot Overlay */}
      <AIChat />
    </div >
  );
};

export default App;