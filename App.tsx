import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { ArrowRight, ArrowUpRight, Command as CommandIcon } from 'lucide-react';
import AIChat, { OPEN_CHAT_EVENT } from './components/AIChat';
import CommandPalette, { Command } from './components/CommandPalette';
import CredlyBadges from './components/CredlyBadges';
import OfferVisual, { OfferKind } from './components/OfferVisual';
import ProjectModal from './components/ProjectModal';
import SkillRadar from './components/SkillRadar';
import { CONTACT, CREDLY_BADGE_IDS, EXPERIENCE_DATA, MODES, PROJECT_DATA, SKILLS_DATA } from './constants';
import { Mode, Project, SkillCategory } from './types';

const FORMSPREE_FORM_ID = 'mdkqjerp';

// "SPECTER - Forensic Toolkit" reads as "SPECTER" in tight spots
const shortTitle = (p: Project) => p.title.split(' - ')[0];
const fieldOf = (p: Project) => MODES.filter((m) => p.modes.includes(m.id)).map((m) => m.field).join(' · ');
const scrollToId = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
const reducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// The kinds of software Khalid builds. Tools, not projects, so nothing repeats the case studies.
const OFFERS: { id: OfferKind; kind: string; title: string; text: string; tools: string[] }[] = [
  { id: 'web', kind: 'Front to back', title: 'Web apps', text: 'Storefronts, booking and rental systems, logistics tracking. I design the screens, build the API and database behind them, and deploy them on Vercel, Firebase or AWS.', tools: ['React', 'TypeScript', 'Node.js', 'Firebase'] },
  { id: 'mobile', kind: 'iOS and Android', title: 'Mobile apps', text: 'Apps your customers keep on their phones, running on the same backend as your web app so accounts, orders and data stay in sync.', tools: ['React Native', 'Flutter', 'Firebase', 'REST APIs'] },
  { id: 'business', kind: 'Where accounting helps', title: 'Business solutions', text: 'Admin dashboards, client portals, workflow tools and financial reporting. My accounting and finance training means the numbers in the systems I build add up.', tools: ['Dashboards', 'User roles', 'Reports', 'Automation'] },
];

// Web apps lead, then the finance builds; security tools live in the full list
const CASE_IDS = ['lunarlogix', 'rentalnest', 'atelier-anj', 'eventgo', 'neuroquant', 'fraud-detection'];
const FEATURED = CASE_IDS.map((id) => PROJECT_DATA.find((p) => p.id === id)!);

/* ---------- hero ---------- */
const Hero: React.FC<{ onOpenMenu: () => void }> = ({ onOpenMenu }) => {
  const portraitRef = useRef<HTMLDivElement>(null);

  // The portrait drifts a little against the names as the cursor moves
  const onMove = (e: React.MouseEvent) => {
    if (reducedMotion() || !portraitRef.current) return;
    const x = (e.clientX / window.innerWidth - 0.5) * 18;
    const y = (e.clientY / window.innerHeight - 0.5) * 10;
    portraitRef.current.style.transform = `translate(${x}px, ${y}px)`;
  };

  return (
    <header className="hero" onMouseMove={onMove}>
      <div className="topbar">
        <a href="#top" className="disp text-lg font-bold tracking-tight">K. Adebiyi</a>
        <nav className="mono" aria-label="Sections">
          <a href="#build">What I build</a>
          <a href="#work">Work</a>
          <a href="#path">Path</a>
          <a href="#contact">Contact</a>
        </nav>
        <div className="flex items-center gap-3">
          <button className="mono kbd-hint" onClick={onOpenMenu} aria-label="Open command menu">
            <CommandIcon size={13} /> K
          </button>
          <span className="mono status"><i />Available for work</span>
        </div>
      </div>
      <div className="stage">
        <h1 className="sr-only">Khalid Adebiyi</h1>
        <span className="n1" aria-hidden="true">Khalid</span>
        <div className="portrait" ref={portraitRef}>
          <img src="/khalid.jpg" alt="Portrait of Khalid Adebiyi in a grey pinstripe suit" fetchPriority="high" />
        </div>
        <span className="n2" aria-hidden="true">Adebiyi</span>
      </div>
      <div className="hero-foot">
        <p>Full-stack developer building web apps, mobile apps and software for businesses. Background in accounting and finance.</p>
        <p className="r mono text-right">Senior full-stack · AZM Nexus<br />Freelance since 2023</p>
      </div>
    </header>
  );
};

/* ---------- what I build ---------- */
const Offers: React.FC = () => {
  const [open, setOpen] = useState(OFFERS[0].id);

  return (
    <section className="pad pt-6" id="build">
      <span className="mono label">What I build</span>
      <h2 className="h-big">Full-stack, from the<br />screen to the server.</h2>
      <div className="panels panels-short">
        {OFFERS.map((o) => (
          <div
            key={o.id}
            className={`panel ${open === o.id ? 'open' : ''}`}
            onMouseEnter={() => setOpen(o.id)}
            onFocus={() => setOpen(o.id)}
            onClick={() => setOpen(o.id)}
            tabIndex={0}
          >
            <span className="mono count">{o.kind}</span>
            <OfferVisual kind={o.id} live={open === o.id} />
            <div>
              <h3>{o.title}</h3>
              <div className="more">
                <p>{o.text}</p>
                <div className="chips">
                  {o.tools.map((t) => <span key={t} className="chip">{t}</span>)}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

/* ---------- selected work: vertical scroll drives a horizontal track ---------- */
const Work: React.FC<{ onOpen: (p: Project) => void }> = ({ onOpen }) => {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current!, track = trackRef.current!, bar = barRef.current!;
    const pinned = () => window.innerWidth > 900;
    let dist = 0, frame = 0;

    // The section is exactly as tall as the track is wide, so the scroll maps 1:1
    const measure = () => {
      if (!pinned()) { section.style.height = ''; track.style.transform = ''; return; }
      dist = Math.max(0, track.scrollWidth - window.innerWidth);
      section.style.height = `${window.innerHeight + dist}px`;
      update();
    };
    const update = () => {
      frame = 0;
      if (!pinned()) return;
      const t = Math.min(1, Math.max(0, -section.getBoundingClientRect().top / Math.max(1, dist)));
      track.style.transform = `translate3d(${-t * dist}px,0,0)`;
      bar.style.width = `${t * 100}%`;
    };
    const onScroll = () => { if (!frame) frame = requestAnimationFrame(update); };

    measure();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', measure);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', measure);
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <section className="work" id="work" ref={sectionRef}>
      <div className="work-pin">
        <div className="work-head pad">
          <div>
            <span className="mono label">Selected work</span>
            <h2 className="h-big">Case studies</h2>
          </div>
          <span className="mono hidden text-slate sm:block">Scroll to browse</span>
        </div>
        <div className="track" ref={trackRef}>
          {FEATURED.map((p) => (
            <button key={p.id} className="case" onClick={() => onOpen(p)}>
              <div className="ph"><img src={p.imageUrl} alt="" loading="lazy" /></div>
              <div className="meta">
                <h3>{shortTitle(p)}</h3>
                <span className="mono shrink-0 text-slate">{fieldOf(p)}</span>
              </div>
              <p>{p.description}</p>
            </button>
          ))}
          <div className="case end">
            <h3 className="disp text-[clamp(28px,3vw,44px)] font-bold leading-none tracking-[-.035em]">
              {PROJECT_DATA.length - FEATURED.length} more projects, from client sites to security tools.
            </h3>
            <button className="btn" onClick={() => scrollToId('index')}>See all work <ArrowRight size={16} /></button>
          </div>
        </div>
        <div className="progress"><i ref={barRef} /></div>
      </div>
    </section>
  );
};

/* ---------- every project, filterable, with a preview that follows the cursor ---------- */
type Filter = Mode | 'all';

const ProjectIndex: React.FC<{ filter: Filter; setFilter: (f: Filter) => void; onOpen: (p: Project) => void }> = ({ filter, setFilter, onOpen }) => {
  const [peek, setPeek] = useState<string | null>(null);
  const peekRef = useRef<HTMLDivElement>(null);
  const list = filter === 'all' ? PROJECT_DATA : PROJECT_DATA.filter((p) => p.modes.includes(filter));

  const onMove = (e: React.MouseEvent) => {
    if (peekRef.current) {
      peekRef.current.style.left = `${e.clientX}px`;
      peekRef.current.style.top = `${e.clientY}px`;
    }
  };

  return (
    <section className="pad mt-[clamp(80px,10vw,150px)]" id="index">
      <div className="flex flex-wrap items-end justify-between gap-6">
        <div>
          <span className="mono label">Index</span>
          <h2 className="h-big">Everything I’ve made</h2>
        </div>
        <div className="seg" role="group" aria-label="Filter projects">
          {(['all', ...MODES.map((m) => m.id)] as Filter[]).map((f) => (
            <button key={f} aria-pressed={filter === f} onClick={() => setFilter(f)}>
              {f === 'all' ? `All ${PROJECT_DATA.length}` : MODES.find((m) => m.id === f)!.field}
            </button>
          ))}
        </div>
      </div>
      <div className="index-list" onMouseMove={onMove} onMouseLeave={() => setPeek(null)}>
        {list.map((p) => (
          <button key={p.id} className="row" onClick={() => onOpen(p)} onMouseEnter={() => setPeek(p.imageUrl)}>
            <h3>{shortTitle(p)}</h3>
            <span className="mono hide-sm text-slate">{fieldOf(p)}</span>
            <span className="hide-sm text-[15px] text-slate">{p.techStack?.slice(0, 3).join(', ')}</span>
            <ArrowUpRight className="arr" size={22} aria-hidden="true" />
          </button>
        ))}
      </div>
      <div className={`peek ${peek ? 'on' : ''}`} ref={peekRef} aria-hidden="true">
        {peek && <img src={peek} alt="" />}
      </div>
    </section>
  );
};

/* ---------- skills ---------- */
const Skills: React.FC = () => {
  const [mode, setMode] = useState<Mode | 'all'>('build');
  const highlight: SkillCategory[] = mode === 'all'
    ? Object.values(SkillCategory)
    : MODES.find((m) => m.id === mode)!.skillCategories;

  return (
    <section className="pad mt-[clamp(100px,12vw,170px)]" id="skills">
      <div className="flex flex-wrap items-end justify-between gap-6">
        <div>
          <span className="mono label">Toolkit</span>
          <h2 className="h-big">What I work with</h2>
        </div>
        <div className="seg" role="group" aria-label="Show skills for">
          {(['all', ...MODES.map((m) => m.id)] as (Mode | 'all')[]).map((m) => (
            <button key={m} aria-pressed={mode === m} onClick={() => setMode(m)}>
              {m === 'all' ? 'Everything' : MODES.find((x) => x.id === m)!.field}
            </button>
          ))}
        </div>
      </div>
      <div className="skills">
        <div className="hidden sm:block"><SkillRadar highlight={highlight} color="#B4925F" /></div>
        <ul className="skill-list">
          {SKILLS_DATA.map((s) => {
            const on = highlight.includes(s.category);
            return (
              <li key={s.name} className={on ? '' : 'dim'}>
                <span>{s.name}</span>
                <span className="bar"><i style={{ width: `${on ? s.value : 0}%` }} /></span>
                <span className="mono text-right text-slate">{s.value}</span>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
};

/* ---------- path ---------- */
const Path: React.FC = () => {
  const lineRef = useRef<HTMLDivElement>(null);
  // Oldest first, so the line reads left to right
  const stops = [...EXPERIENCE_DATA].reverse();

  useEffect(() => {
    const line = lineRef.current!;
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { line.style.setProperty('--p', '100%'); io.disconnect(); }
    }, { threshold: 0.4 });
    io.observe(line);
    return () => io.disconnect();
  }, []);

  return (
    <section className="path pad" id="path">
      <div className="intro">
        <div>
          <span className="mono label">Path</span>
          <h2 className="h-big">From ledgers<br />to full-stack.</h2>
        </div>
        <p>I didn’t start in tech. Years in accounts and operations taught me how businesses track money, orders and records. I taught myself to code so I could build the software that does it.</p>
      </div>
      <div className="line" ref={lineRef}>
        {stops.map((x, i) => (
          <div className="stop" key={x.id}>
            <span className="mono when">{i === 0 ? 'Start' : x.period === 'Past' ? 'Then' : x.period}</span>
            <h3>{x.role}</h3>
            <p className="co">{x.company}</p>
            <p className="desc">{x.description}</p>
          </div>
        ))}
      </div>
      <div className="creds">
        <p className="mono mb-6 text-[#A9B2C4]">Verified on Credly · {CREDLY_BADGE_IDS.length} credentials</p>
        <CredlyBadges badgeIds={CREDLY_BADGE_IDS} />
      </div>
    </section>
  );
};

/* ---------- contact ---------- */
const Contact: React.FC<{ onOpenMenu: () => void }> = ({ onOpenMenu }) => {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [state, setState] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setState('sending');

    // Without a Formspree form, hand the message to the visitor's mail app
    if (!FORMSPREE_FORM_ID) {
      const subject = `Portfolio inquiry from ${form.name || 'a visitor'}`;
      const body = `Name: ${form.name}\nEmail: ${form.email}\n\n${form.message}`;
      window.location.href = `mailto:${CONTACT.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      setState('sent');
      return;
    }

    try {
      const res = await fetch(`https://formspree.io/f/${FORMSPREE_FORM_ID}`, {
        method: 'POST',
        headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error(String(res.status));
      setForm({ name: '', email: '', message: '' });
      setState('sent');
    } catch {
      setState('error');
    }
  };

  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm({ ...form, [k]: e.target.value });

  return (
    <section className="contact pad" id="contact">
      <div className="contact-grid">
        <div>
          <span className="mono label">Contact</span>
          <a className="cta mt-6" href={`mailto:${CONTACT.email}`}><u>Let’s talk</u> ↗</a>
          <p className="mt-8 max-w-[40ch] text-[#9CA3AE]">
            Tell me what you need built.
            Prefer to ask questions first?{' '}
            <button className="text-shirt underline decoration-brass underline-offset-4 hover:text-brass" onClick={() => window.dispatchEvent(new Event(OPEN_CHAT_EVENT))}>
              Ask my assistant
            </button>.
          </p>
        </div>

        {state === 'sent' ? (
          <div className="rise" role="status">
            <p className="disp text-4xl font-bold tracking-tight">Message sent.</p>
            <p className="mt-3 text-[#9CA3AE]">Thanks. I’ll reply to the email you gave.</p>
            <button className="btn mt-8" onClick={() => setState('idle')}>Send another message</button>
          </div>
        ) : (
          <form className="grid gap-7" onSubmit={submit}>
            <div className="field">
              <label className="mono" htmlFor="c-name">Your name</label>
              <input id="c-name" value={form.name} onChange={set('name')} autoComplete="name" required />
            </div>
            <div className="field">
              <label className="mono" htmlFor="c-email">Email</label>
              <input id="c-email" type="email" value={form.email} onChange={set('email')} autoComplete="email" required />
            </div>
            <div className="field">
              <label className="mono" htmlFor="c-msg">What do you need?</label>
              <textarea id="c-msg" rows={3} value={form.message} onChange={set('message')} required />
            </div>
            {state === 'error' && (
              <p className="text-[15px] text-brass" role="alert">
                The message didn’t go through. Try again, or email {CONTACT.email}.
              </p>
            )}
            <button className="btn btn-brass justify-self-start" disabled={state === 'sending'}>
              {state === 'sending' ? 'Sending…' : 'Send message'} <ArrowRight size={16} />
            </button>
          </form>
        )}
      </div>

      <div className="foot-row mono">
        <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a>
        <nav aria-label="Elsewhere">
          <a href={CONTACT.github} target="_blank" rel="noopener noreferrer">GitHub</a>
          <a href={CONTACT.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a>
          <a href={CONTACT.upwork} target="_blank" rel="noopener noreferrer">Upwork</a>
          <a href={CONTACT.cv} target="_blank" rel="noopener noreferrer">CV</a>
          <button onClick={onOpenMenu}>Menu ⌘K</button>
        </nav>
      </div>
      <p className="mono mt-6 text-[#6F757F]">© {new Date().getFullYear()} Khalid Adebiyi</p>
    </section>
  );
};

/* ---------- page ---------- */
const App: React.FC = () => {
  const [project, setProject] = useState<Project | null>(null);
  const [filter, setFilter] = useState<Filter>('all');
  const [menuOpen, setMenuOpen] = useState(false);

  const openMenu = useCallback(() => setMenuOpen(true), []);
  const closeProject = useCallback(() => setProject(null), []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setMenuOpen((o) => !o);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const commands = useMemo<Command[]>(() => [
    ...[
      ['build', 'What I build'], ['work', 'Case studies'], ['index', 'All projects'],
      ['skills', 'Toolkit'], ['path', 'Path and credentials'], ['contact', 'Contact'],
    ].map(([id, label]) => ({ id: `go-${id}`, label, group: 'Go to', run: () => scrollToId(id) })),
    ...PROJECT_DATA.map((p) => ({ id: `p-${p.id}`, label: p.title, group: 'Projects', run: () => setProject(p) })),
    { id: 'chat', label: 'Ask my assistant', group: 'Actions', run: () => window.dispatchEvent(new Event(OPEN_CHAT_EVENT)) },
    { id: 'email', label: `Email ${CONTACT.email}`, group: 'Actions', run: () => { window.location.href = `mailto:${CONTACT.email}`; } },
    { id: 'cv', label: 'Open CV', group: 'Actions', run: () => window.open(CONTACT.cv, '_blank') },
    { id: 'gh', label: 'GitHub', group: 'Actions', run: () => window.open(CONTACT.github, '_blank') },
  ], []);

  return (
    <div id="top">
      <Hero onOpenMenu={openMenu} />
      <main>
        <section className="statement pad">
          <p>
            I <span className="face"><img src="/khalid.jpg" alt="" /></span> build web apps, mobile apps and the systems
            businesses run on. Trained in <em>accounting</em>, so the numbers add up.
          </p>
        </section>
        <Offers />
        <Work onOpen={setProject} />
        <ProjectIndex filter={filter} setFilter={setFilter} onOpen={setProject} />
        <Skills />
        <Path />
        <Contact onOpenMenu={openMenu} />
      </main>
      <ProjectModal project={project} isOpen={!!project} onClose={closeProject} />
      <CommandPalette isOpen={menuOpen} onClose={() => setMenuOpen(false)} commands={commands} />
      <AIChat />
    </div>
  );
};

export default App;
