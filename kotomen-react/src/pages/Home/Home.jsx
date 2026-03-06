import { memo, useEffect, useMemo, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion as Motion } from 'framer-motion';
import SectionHeader from '../../components/SectionHeader/SectionHeader';
import CornerDecorations from '../../components/CornerDecorations/CornerDecorations';
import meImage from '../../assets/Me_wo_bg.png';
import s from './Home.module.css';

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i = 0) => ({ opacity: 1, y: 0, transition: { delay: i * 0.2, duration: 0.6 } }),
};

const heroFadeUp = {
  hidden: { opacity: 0, y: 18 },
  visible: (i = 0) => ({ opacity: 1, y: 0, transition: { delay: i * 0.1, duration: 0.45 } }),
};

const cardVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: (i = 0) => ({ opacity: 1, y: 0, transition: { delay: i * 0.07, duration: 0.5 } }),
};

const inViewViewport = { once: true, amount: 0.01 };

/* ===== RADAR CHART ===== */
const skillsData = [
  { label: 'Frontend', value: 0.82 },
  { label: 'Backend', value: 0.74 },
  { label: 'DevOps', value: 0.58 },
  { label: 'Design', value: 0.69 },
  { label: 'AI Tools', value: 0.86 },
  { label: 'Product Thinking', value: 0.77 },
];

const RadarChart = memo(function RadarChart({ size = 460 }) {
  const canvasRef = useRef(null);
  const animProgress = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return undefined;
    const ctx = canvas.getContext('2d');
    const dpr = window.devicePixelRatio || 1;
    canvas.width = size * dpr;
    canvas.height = size * dpr;
    canvas.style.width = size + 'px';
    canvas.style.height = size + 'px';
    ctx.scale(dpr, dpr);

    const cx = size / 2, cy = size / 2, r = 172;
    const n = skillsData.length;
    const angleStep = (Math.PI * 2) / n;
    const startAngle = -Math.PI / 2;

    function draw(progress) {
      ctx.clearRect(0, 0, size, size);

      // grid rings
      for (let ring = 1; ring <= 4; ring++) {
        ctx.beginPath();
        for (let i = 0; i <= n; i++) {
          const angle = startAngle + i * angleStep;
          const rr = (r * ring) / 4;
          const x = cx + rr * Math.cos(angle);
          const y = cy + rr * Math.sin(angle);
          i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
        }
        ctx.strokeStyle = 'rgba(0,240,255,0.20)';
        ctx.lineWidth = 1;
        ctx.stroke();
      }

      // axis lines
      skillsData.forEach((_, i) => {
        const angle = startAngle + i * angleStep;
        ctx.beginPath();
        ctx.moveTo(cx, cy);
        ctx.lineTo(cx + r * Math.cos(angle), cy + r * Math.sin(angle));
        ctx.strokeStyle = 'rgba(0,240,255,0.2)';
        ctx.lineWidth = 1;
        ctx.stroke();
      });

      // filled polygon
      ctx.beginPath();
      skillsData.forEach((skill, i) => {
        const angle = startAngle + i * angleStep;
        const val = skill.value * progress;
        const x = cx + r * val * Math.cos(angle);
        const y = cy + r * val * Math.sin(angle);
        i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
      });
      ctx.closePath();
      const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, r);
      grad.addColorStop(0, 'rgba(0,240,255,0.24)');
      grad.addColorStop(1, 'rgba(0,240,255,0.03)');
      ctx.fillStyle = grad;
      ctx.fill();
      ctx.strokeStyle = 'rgba(0,240,255,0.8)';
      ctx.lineWidth = 1.6;
      ctx.stroke();

      // dots + labels
      skillsData.forEach((skill, i) => {
        const angle = startAngle + i * angleStep;
        const val = skill.value * progress;
        const x = cx + r * val * Math.cos(angle);
        const y = cy + r * val * Math.sin(angle);

        // glow dot
        ctx.beginPath();
        ctx.arc(x, y, 4, 0, Math.PI * 2);
        ctx.fillStyle = '#00d8e6';
        ctx.shadowColor = '#00e7f7';
        ctx.shadowBlur = 12;
        ctx.fill();
        ctx.shadowBlur = 0;

        // label
        const lx = cx + (r + 30) * Math.cos(angle);
        const ly = cy + (r + 30) * Math.sin(angle);
        ctx.font = '500 11px Inter';
        ctx.fillStyle = 'rgba(146,222,232,0.85)';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(skill.label.toUpperCase(), lx, ly);
      });
    }

    let rafId = null;
    let timeoutId = null;
    function animate() {
      if (animProgress.current < 1) {
        animProgress.current += 0.015;
        draw(Math.min(animProgress.current, 1));
        rafId = requestAnimationFrame(animate);
      }
    }

    const observer = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && animProgress.current === 0) {
        timeoutId = setTimeout(animate, 400);
      }
    });
    observer.observe(canvas);

    return () => {
      observer.disconnect();
      if (timeoutId) clearTimeout(timeoutId);
      cancelAnimationFrame(rafId);
    };
  }, [size]);

  return <canvas ref={canvasRef} className={s.skillsRadarCanvas} />;
});

/* ===== SKILLS DATA ===== */
const techChips = ['React', 'Next.js', 'FastAPI', 'PostgreSQL', 'Docker'];

const techBars = [
  { name: 'React / Next.js', level: 0.82 },
  { name: 'FastAPI / Python', level: 0.74 },
  { name: 'Product Ops', level: 0.77 },
  { name: 'Docker / Infra', level: 0.58 },
  { name: 'AI Tooling', level: 0.86 },
];

const missionGroups = [
  {
    id: 'core',
    title: 'Core Missions',
    missions: [
      { id: 'launch-mvp', title: 'Launch MVP', current: 3, total: 5, axis: 'Product Thinking' },
      { id: 'prod-deploy', title: 'Production Deploy', current: 12, total: 20, axis: 'DevOps' },
    ],
  },
  {
    id: 'ai',
    title: 'AI Missions',
    missions: [
      { id: 'ai-integration', title: 'AI Integration', current: 4, total: 8, axis: 'AI Tools' },
      { id: 'prompt-optimization', title: 'Prompt Optimization', current: 9, total: 18, axis: 'AI Tools' },
    ],
  },
];

/* ===== SVG ICONS ===== */
const IconAI = () => (
  <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="6" y="4" width="20" height="16" rx="3" stroke="currentColor" strokeWidth="1.6"/>
    <circle cx="12" cy="12" r="2" fill="currentColor"/>
    <circle cx="20" cy="12" r="2" fill="currentColor"/>
    <path d="M10 24L12 20H20L22 24" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M14 28H18" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
    <path d="M4 10H6M26 10H28M4 14H6M26 14H28" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" opacity="0.5"/>
    <path d="M13 7L16 4L19 7" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" opacity="0.5"/>
  </svg>
);

const IconFrontend = () => (
  <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 8L5 16L12 24" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M20 8L27 16L20 24" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M18 6L14 26" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" opacity="0.6"/>
  </svg>
);

const IconBackend = () => (
  <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="5" y="4" width="22" height="7" rx="2" stroke="currentColor" strokeWidth="1.6"/>
    <rect x="5" y="13" width="22" height="7" rx="2" stroke="currentColor" strokeWidth="1.6"/>
    <rect x="5" y="22" width="22" height="7" rx="2" stroke="currentColor" strokeWidth="1.6"/>
    <circle cx="9" cy="7.5" r="1.2" fill="currentColor"/>
    <circle cx="9" cy="16.5" r="1.2" fill="currentColor"/>
    <circle cx="9" cy="25.5" r="1.2" fill="currentColor"/>
    <path d="M14 7.5H23M14 16.5H20M14 25.5H21" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" opacity="0.4"/>
  </svg>
);

const IconLeadership = () => (
  <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="16" cy="9" r="4" stroke="currentColor" strokeWidth="1.6"/>
    <path d="M10 27V25C10 22.24 12.24 20 15 20H17C19.76 20 22 22.24 22 25V27" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
    <circle cx="6" cy="14" r="2.5" stroke="currentColor" strokeWidth="1.2" opacity="0.5"/>
    <path d="M3 25V24C3 22.34 4.34 21 6 21" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" opacity="0.5"/>
    <circle cx="26" cy="14" r="2.5" stroke="currentColor" strokeWidth="1.2" opacity="0.5"/>
    <path d="M29 25V24C29 22.34 27.66 21 26 21" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" opacity="0.5"/>
    <path d="M16 4L17 2L18 4" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" opacity="0.4"/>
  </svg>
);

const IconTelegram = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M21.2 3.1L2.4 10.5C1.5 10.9 1.5 11.5 2.2 11.7L7 13.2L18.4 6.5C18.9 6.2 19.4 6.4 19 6.7L9.6 15.2L9.2 20.1C9.7 20.1 9.9 19.9 10.2 19.6L12.8 17.1L17.7 20.7C18.6 21.2 19.2 20.9 19.4 19.9L22.4 4.5C22.7 3.3 22 2.7 21.2 3.1Z" fill="currentColor"/>
  </svg>
);

const IconEmail = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="3" y="5" width="18" height="14" rx="2" stroke="currentColor" strokeWidth="1.6"/>
    <path d="M3 7L12 13L21 7" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const IconGitHub = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2C6.48 2 2 6.48 2 12C2 16.42 4.87 20.17 8.84 21.5C9.34 21.58 9.5 21.27 9.5 21V19.31C6.73 19.91 6.14 17.97 6.14 17.97C5.68 16.81 5.03 16.5 5.03 16.5C4.12 15.88 5.1 15.9 5.1 15.9C6.1 15.97 6.63 16.93 6.63 16.93C7.5 18.45 8.97 18 9.54 17.76C9.63 17.11 9.89 16.67 10.17 16.42C7.95 16.17 5.62 15.31 5.62 11.5C5.62 10.39 6 9.5 6.65 8.79C6.55 8.54 6.2 7.5 6.75 6.15C6.75 6.15 7.59 5.88 9.5 7.17C10.29 6.95 11.15 6.84 12 6.84C12.85 6.84 13.71 6.95 14.5 7.17C16.41 5.88 17.25 6.15 17.25 6.15C17.8 7.5 17.45 8.54 17.35 8.79C18 9.5 18.38 10.39 18.38 11.5C18.38 15.32 16.04 16.16 13.81 16.41C14.17 16.72 14.5 17.33 14.5 18.26V21C14.5 21.27 14.66 21.59 15.17 21.5C19.14 20.16 22 16.42 22 12C22 6.48 17.52 2 12 2Z" fill="currentColor"/>
  </svg>
);

/* ===== OTHER DATA ===== */
const roles = [
  { icon: <IconAI />, num: '01', label: 'ROLE_01', title: 'AI-Дизайн', desc: 'Генерация идей, компонентов и концепций с помощью AI-сервисов. Быстрое прототипирование и визуализация решений.', tools: ['Midjourney', 'DALL·E', 'Stable Diffusion', 'ChatGPT'] },
  { icon: <IconFrontend />, num: '02', label: 'ROLE_02', title: 'Frontend Dev', desc: 'Воплощаю дизайн в живой интерфейс. React-приложения с анимациями, адаптивной вёрсткой и оптимизацией под реальных пользователей.', tools: ['React', 'JavaScript', 'Next.js', 'Tailwind'] },
  { icon: <IconBackend />, num: '03', label: 'ROLE_03', title: 'Backend Dev', desc: 'Проектирую и строю API, базы данных и серверную логику. FastAPI, PostgreSQL, аутентификация, оптимизация запросов — от MVP до продакшна.', tools: ['FastAPI', 'Python', 'PostgreSQL', 'Redis', 'REST/WebSocket'] },
  { icon: <IconLeadership />, num: '04', label: 'ROLE_04', title: 'Лидерство', desc: 'Веду команду, онборжу новичков, общаюсь с заказчиком. Умею декомпозировать задачи, выстраивать процессы и держать ритм проекта даже при смене состава.', tools: ['Управление', 'Soft Skills', 'Менторство', 'Коммуникация'] },
];

const stats = [
  { num: 'E2E', label: 'Реальные кейсы' },
  { num: '3×', label: 'Быстрее команды из трёх человек' },
  { num: '2+', label: 'Года в разработке' },
];

/* ===== COMPONENT ===== */
export default function Home() {
  const [skillsParallax, setSkillsParallax] = useState(0);
  const [xpValue, setXpValue] = useState(0);
  const xpPanelRef = useRef(null);
  const xpTarget = 8420;

  useEffect(() => {
    let rafId = null;

    const updateParallax = () => {
      setSkillsParallax(window.scrollY * 0.08);
      rafId = null;
    };

    const onScroll = () => {
      if (rafId) return;
      rafId = requestAnimationFrame(updateParallax);
    };

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  useEffect(() => {
    const panel = xpPanelRef.current;
    if (!panel) return undefined;

    let rafId = null;
    let started = false;

    const observer = new IntersectionObserver((entries) => {
      const entry = entries[0];
      if (!entry.isIntersecting || started) return;
      started = true;
      const startedAt = performance.now();
      const duration = 1300;

      const tick = (now) => {
        const elapsed = Math.min((now - startedAt) / duration, 1);
        const eased = 1 - (1 - elapsed) ** 3;
        setXpValue(Math.round(xpTarget * eased));
        if (elapsed < 1) {
          rafId = requestAnimationFrame(tick);
        }
      };

      rafId = requestAnimationFrame(tick);
      observer.disconnect();
    }, { threshold: 0.35 });

    observer.observe(panel);

    return () => {
      observer.disconnect();
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  const skillsSectionStyle = useMemo(() => ({ '--skills-parallax': `${skillsParallax}px` }), [skillsParallax]);

  return (
    <>
      {/* HERO */}
      <section id="hero" className={s.hero}>
        <div className={s.heroLeft}>
          <Motion.div className={s.heroTerminal} variants={heroFadeUp} initial="hidden" animate="visible" custom={0}>
            <span>~</span> kotomen@prod:~$ <span>whoami</span>
          </Motion.div>
          <Motion.h1 className={s.heroName} variants={heroFadeUp} initial="hidden" animate="visible" custom={1}>
            FULL<span className={s.accent}>STACK</span><br />PRODUCT<br />ENGINEER
          </Motion.h1>
          <Motion.p className={s.heroTagline} variants={heroFadeUp} initial="hidden" animate="visible" custom={2}>
            Один человек — полный цикл продукта
          </Motion.p>
          <Motion.p className={s.heroDesc} variants={heroFadeUp} initial="hidden" animate="visible" custom={3}>
            Раньше кодил всё руками. Теперь совмещаю инженерное мышление
            с AI-инструментами — быстрее, лучше, от идеи до деплоя.
            Закрываю задачи, на которые обычно нужна целая команда.
          </Motion.p>
          <Motion.div className={s.heroCta} variants={heroFadeUp} initial="hidden" animate="visible" custom={4}>
            <a href="#contact" className={s.btnPrimary}>[ Запустить проект ]</a>
            <Link to="/projects" className={s.btnSecondary}>[ Посмотреть работы ]</Link>
          </Motion.div>
        </div>
        <Motion.div className={s.heroRight} variants={heroFadeUp} initial="hidden" animate="visible" custom={3}>
          <div className={s.heroAvatarWrap} style={{ position: 'relative' }}>
            <CornerDecorations />
            <div className={s.heroAvatarLabel}>Котоман Степан</div>
            <div className={s.heroAvatarCircle}>
              <img
                src={meImage}
                alt="Kotomen portrait"
                className={s.heroAvatarImage}
                loading="eager"
                decoding="async"
                fetchPriority="high"
              />
            </div>
          </div>
        </Motion.div>
      </section>

      {/* ===== SKILLS DASHBOARD ===== */}
      <section id="skills" className={s.skills} style={skillsSectionStyle}>
        <h2 className={s.sectionTitle}>Мои навыки</h2>
        <div className={s.skillsGlowLine} />

        <div className={s.skillsLayout}>
          <div className={s.skillsLeft}>
            <Motion.div
              className={s.skillsRadarWrap}
              initial={{ opacity: 0, y: 18, scale: 0.96 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={inViewViewport}
              transition={{ duration: 0.7 }}
              style={{ position: 'relative' }}
            >
              <CornerDecorations />
              <div className={s.skillsRadarHeader}>TACTICAL_RADAR.exe</div>
              <RadarChart size={460} />
            </Motion.div>

            <Motion.div
              className={s.techChips}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={inViewViewport}
              custom={1}
            >
              {techChips.map(chip => (
                <span
                  key={chip}
                  className={s.techChip}
                  data-cursor-hover
                >
                  {chip}
                </span>
              ))}
            </Motion.div>

            <Motion.div
              className={s.techBars}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={inViewViewport}
              custom={2}
            >
              {techBars.map(bar => (
                <div key={bar.name} className={s.techBarRow}>
                  <span className={s.techBarLabel}>{bar.name}</span>
                  <div className={s.techBarTrack}>
                    <Motion.div
                      className={s.techBarFill}
                      initial={{ width: 0 }}
                      whileInView={{ width: `${bar.level * 100}%` }}
                      viewport={inViewViewport}
                      transition={{ duration: 0.9, delay: 0.2 }}
                    />
                  </div>
                </div>
              ))}
            </Motion.div>
          </div>

          <Motion.div
            className={s.skillsRight}
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={inViewViewport}
            custom={1}
          >
            <div className={s.missionPanel} ref={xpPanelRef}>
              <div className={s.missionHeader}>SYSTEM_PROGRESS.log</div>
              <div className={s.missionLevel}>Level 18 Product Engineer</div>
              <div className={s.missionXp}>XP: {xpValue} / 10000</div>

              <div className={s.missionGroups}>
                {missionGroups.map((group, groupIndex) => (
                  <Motion.div
                    key={group.id}
                    className={s.missionGroup}
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={inViewViewport}
                    transition={{ duration: 0.4, delay: groupIndex * 0.08 }}
                  >
                    <div className={s.missionGroupTitle}>{group.title}</div>
                    <div className={s.missionGroupCards}>
                      {group.missions.map((mission, missionIndex) => {
                        const progress = mission.total ? (mission.current / mission.total) * 100 : 0;
                        return (
                          <Motion.div
                            key={mission.id}
                            className={s.questCard}
                            data-cursor-hover
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={inViewViewport}
                            transition={{ duration: 0.35, delay: missionIndex * 0.06 }}
                          >
                            <div className={s.questTitle}>{mission.title}</div>
                            {mission.milestone ? (
                              <div className={s.questMilestone}>{mission.milestone}</div>
                            ) : (
                              <>
                                <div className={s.questRatio}>{mission.current} / {mission.total}</div>
                                <div className={s.questProgressTrack}>
                                  <div className={s.questProgressFill} style={{ width: `${progress}%` }} />
                                </div>
                              </>
                            )}
                          </Motion.div>
                        );
                      })}
                    </div>
                  </Motion.div>
                ))}
              </div>
            </div>
          </Motion.div>
        </div>
      </section>

      {/* ROLES */}
      <section id="roles" className={s.roles}>
        <SectionHeader tag="02 // ROLES" num="MODULE_LOADED" />
        <h2 className={s.sectionTitle}>Четыре роли.<br />Один специалист.</h2>
        <div className={s.rolesGrid}>
          {roles.map((role, i) => (
            <Motion.div
              key={role.num}
              className={s.roleCard}
              data-cursor-hover
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={inViewViewport}
              custom={i}
            >
              <CornerDecorations />
              <div className={s.roleNumber}>{role.num}</div>
              <span className={s.roleIcon}>{role.icon}</span>
              <div className={s.roleLabel}>{role.label}</div>
              <div className={s.roleTitle}>{role.title}</div>
              <div className={s.roleDesc}>{role.desc}</div>
              <div className={s.roleTools}>
                {role.tools.map(t => <span key={t} className={s.toolTag}>{t}</span>)}
              </div>
            </Motion.div>
          ))}
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className={s.contact}>
        <SectionHeader tag="03 // CONTACT" num="INIT_HANDSHAKE" />
        <div className={s.contactGrid}>
          <div className={s.contactPanel} style={{ position: 'relative' }}>
            <CornerDecorations />
            <div className={s.contactBig}>Запустим<br /><span className={s.accent}>ваш</span><br />продукт?</div>
            <div className={s.contactSub}>Беру 1–2 проекта в месяц. Работаю с командами и напрямую с основателями стартапов.</div>
            <div className={s.availability} style={{ visibility: 'hidden' }}>
              <div className={s.statusDot} />
            </div>
            <div className={s.contactLinks}>
              <a href="https://t.me/stap17" className={s.contactLink} target="_blank" rel="noreferrer">
                <span className={s.contactLinkIcon}><IconTelegram /></span>
                Telegram — @stap17
                <span className={s.contactLinkArrow}>→</span>
              </a>
              <a href="mailto:stepancat61@gmail.com" className={s.contactLink}>
                <span className={s.contactLinkIcon}><IconEmail /></span>
                stepancat61@gmail.com
                <span className={s.contactLinkArrow}>→</span>
              </a>
              <a href="https://github.com/STAP16" className={s.contactLink} target="_blank" rel="noreferrer">
                <span className={s.contactLinkIcon}><IconGitHub /></span>
                GitHub — STAP16
                <span className={s.contactLinkArrow}>→</span>
              </a>
            </div>
          </div>
          <div className={s.contactRight}>
            {stats.map((stat) => (
              <div
                key={stat.label}
                className={s.statBlock}
                style={{ position: 'relative' }}
              >
                <CornerDecorations corners={['tl', 'tr']} />
                <div className={s.statNum}>{stat.num}</div>
                <div className={s.statLabel}>{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
