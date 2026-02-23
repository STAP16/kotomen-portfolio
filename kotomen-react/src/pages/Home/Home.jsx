import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import SectionHeader from '../../components/SectionHeader/SectionHeader';
import CornerDecorations from '../../components/CornerDecorations/CornerDecorations';
import meImage from '../../assets/Me_wo_bg.png';
import s from './Home.module.css';

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i = 0) => ({ opacity: 1, y: 0, transition: { delay: i * 0.2, duration: 0.6 } }),
};

const cardVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: (i = 0) => ({ opacity: 1, y: 0, transition: { delay: i * 0.07, duration: 0.5 } }),
};

/* ===== RADAR CHART ===== */
const skillsData = [
  { label: 'Frontend', value: 0.82 },
  { label: 'Backend', value: 0.74 },
  { label: 'DevOps', value: 0.58 },
  { label: 'Design', value: 0.69 },
  { label: 'AI Tools', value: 0.86 },
  { label: 'Product Thinking', value: 0.77 },
];

function RadarChart({ size = 460 }) {
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

    let rafId;
    function animate() {
      if (animProgress.current < 1) {
        animProgress.current += 0.015;
        draw(Math.min(animProgress.current, 1));
        rafId = requestAnimationFrame(animate);
      }
    }

    const observer = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && animProgress.current === 0) {
        setTimeout(animate, 400);
      }
    });
    observer.observe(canvas);

    return () => {
      observer.disconnect();
      cancelAnimationFrame(rafId);
    };
  }, [size]);

  return <canvas ref={canvasRef} className={s.skillsRadarCanvas} />;
}

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

/* ===== OTHER DATA ===== */
const roles = [
  { icon: '🎨', num: '01', label: 'ROLE_01', title: 'UI/UX Дизайнер', desc: 'Проектирую интерфейсы, которые не просто красивы — они конвертируют. От вайрфрейма до готового дизайн-макета с учётом пользовательского опыта.', tools: ['Figma', 'Prototyping', 'Design Systems', 'UX Research'] },
  { icon: '⚡', num: '02', label: 'ROLE_02', title: 'Frontend Dev', desc: 'Воплощаю дизайн в живой интерфейс. React-приложения с анимациями, адаптивной вёрсткой и оптимизацией под реальных пользователей.', tools: ['React', 'TypeScript', 'Next.js', 'Tailwind', 'CSS/GSAP'] },
  { icon: '🔧', num: '03', label: 'ROLE_03', title: 'Backend Dev', desc: 'Проектирую и строю API, базы данных и серверную логику. FastAPI, PostgreSQL, аутентификация, оптимизация запросов — от MVP до продакшна.', tools: ['FastAPI', 'Python', 'PostgreSQL', 'Redis', 'REST/WebSocket'] },
  { icon: '🚀', num: '04', label: 'ROLE_04', title: 'DevOps', desc: 'Разворачиваю и поддерживаю инфраструктуру. Docker, релизный контур и деплой на сервер — проект едет в продакшн без лишних вопросов.', tools: ['Docker', 'Nginx', 'VPS', 'Linux'] },
];

const flowSteps = [
  { icon: '💡', name: 'BRIEF', desc: 'Разбираем задачу,\nцели, аудиторию,\nсроки' },
  { icon: '📐', name: 'DESIGN', desc: 'Прототип и\nUI в Figma.\nСогласование' },
  { icon: '⚙️', name: 'BUILD', desc: 'Frontend + Backend.\nИтерации,\nдемо каждые 3 дня' },
  { icon: '🔍', name: 'TEST', desc: 'QA, правки,\nоптимизация\nпроизводительности' },
  { icon: '🚀', name: 'DEPLOY', desc: 'Деплой, настройка\nинфраструктуры,\nпередача проекта' },
];

const stats = [
  { num: '20+', label: 'Проектов запущено' },
  { num: '3×', label: 'Быстрее команды из трёх человек' },
  { num: '4+', label: 'Года в разработке' },
];

/* ===== COMPONENT ===== */
export default function Home() {
  const [skillsParallax, setSkillsParallax] = useState(0);
  const [xpValue, setXpValue] = useState(0);
  const xpPanelRef = useRef(null);
  const xpTarget = 8420;

  useEffect(() => {
    const onScroll = () => {
      setSkillsParallax(window.scrollY * 0.08);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
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

  const skillsSectionStyle = { '--skills-parallax': `${skillsParallax}px` };

  return (
    <>
      {/* HERO */}
      <section id="hero" className={s.hero}>
        <div className={s.heroLeft}>
          <motion.div className={s.heroTerminal} variants={fadeUp} initial="hidden" animate="visible" custom={0}>
            <span>~</span> kotomen@prod:~$ <span>whoami</span>
          </motion.div>
          <motion.h1 className={s.heroName} variants={fadeUp} initial="hidden" animate="visible" custom={1}>
            FULL<span className={s.accent}>STACK</span><br />PRODUCT<br />ENGINEER
          </motion.h1>
          <motion.p className={s.heroTagline} variants={fadeUp} initial="hidden" animate="visible" custom={2}>
            <strong>Дизайнер · Бекендер · Фронтендер · DevOps</strong><br />
            Один человек — полный цикл продукта
          </motion.p>
          <motion.p className={s.heroDesc} variants={fadeUp} initial="hidden" animate="visible" custom={3}>
            Раньше кодил всё руками. Теперь совмещаю инженерное мышление
            с AI-инструментами — быстрее, лучше, от идеи до деплоя.
            Закрываю задачи, на которые обычно нужна целая команда.
          </motion.p>
          <motion.div className={s.heroCta} variants={fadeUp} initial="hidden" animate="visible" custom={4}>
            <a href="#contact" className={s.btnPrimary}>[ Запустить проект ]</a>
            <Link to="/projects" className={s.btnSecondary}>[ Посмотреть работы ]</Link>
          </motion.div>
        </div>
        <motion.div className={s.heroRight} variants={fadeUp} initial="hidden" animate="visible" custom={5}>
          <div className={s.heroAvatarWrap} style={{ position: 'relative' }}>
            <CornerDecorations />
            <div className={s.heroAvatarLabel}>Котоман Степан</div>
            <div className={s.heroAvatarCircle}>
              <img src={meImage} alt="Kotomen portrait" className={s.heroAvatarImage} />
            </div>
          </div>
        </motion.div>
      </section>

      {/* ===== SKILLS DASHBOARD ===== */}
      <section id="skills" className={s.skills} style={skillsSectionStyle}>
        <h2 className={s.sectionTitle}>Мои навыки</h2>
        <div className={s.skillsGlowLine} />

        <div className={s.skillsLayout}>
          <div className={s.skillsLeft}>
            <motion.div
              className={s.skillsRadarWrap}
              initial={{ opacity: 0, y: 18, scale: 0.96 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.7 }}
              style={{ position: 'relative' }}
            >
              <CornerDecorations />
              <div className={s.skillsRadarHeader}>TACTICAL_RADAR.exe</div>
              <RadarChart size={460} />
            </motion.div>

            <motion.div
              className={s.techChips}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
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
            </motion.div>

            <motion.div
              className={s.techBars}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
              custom={2}
            >
              {techBars.map(bar => (
                <div key={bar.name} className={s.techBarRow}>
                  <span className={s.techBarLabel}>{bar.name}</span>
                  <div className={s.techBarTrack}>
                    <motion.div
                      className={s.techBarFill}
                      initial={{ width: 0 }}
                      whileInView={{ width: `${bar.level * 100}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.9, delay: 0.2 }}
                    />
                  </div>
                </div>
              ))}
            </motion.div>
          </div>

          <motion.div
            className={s.skillsRight}
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            custom={1}
          >
            <div className={s.missionPanel} ref={xpPanelRef}>
              <div className={s.missionHeader}>SYSTEM_PROGRESS.log</div>
              <div className={s.missionLevel}>Level 12 Product Engineer</div>
              <div className={s.missionXp}>XP: {xpValue} / 10000</div>

              <div className={s.missionGroups}>
                {missionGroups.map((group, groupIndex) => (
                  <motion.div
                    key={group.id}
                    className={s.missionGroup}
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.4, delay: groupIndex * 0.08 }}
                  >
                    <div className={s.missionGroupTitle}>{group.title}</div>
                    <div className={s.missionGroupCards}>
                      {group.missions.map((mission, missionIndex) => {
                        const progress = mission.total ? (mission.current / mission.total) * 100 : 0;
                        return (
                          <motion.div
                            key={mission.id}
                            className={s.questCard}
                            data-cursor-hover
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.2 }}
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
                          </motion.div>
                        );
                      })}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ROLES */}
      <section id="roles" className={s.roles}>
        <SectionHeader tag="02 // ROLES" num="MODULE_LOADED" />
        <h2 className={s.sectionTitle}>Четыре роли.<br />Один специалист.</h2>
        <div className={s.rolesGrid}>
          {roles.map((role, i) => (
            <motion.div
              key={role.num}
              className={s.roleCard}
              data-cursor-hover
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
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
            </motion.div>
          ))}
        </div>
      </section>

      {/* FLOW */}
      <section id="flow" className={s.flow}>
        <SectionHeader tag="03 // PROCESS" num="WORKFLOW_ACTIVE" />
        <h2 className={s.sectionTitle}>Как я работаю</h2>
        <div className={s.flowContainer} style={{ position: 'relative' }}>
          <CornerDecorations />
          <div className={s.flowSteps}>
            {flowSteps.map((step, i) => (
              <motion.div
                key={step.name}
                className={s.flowStep}
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.1 }}
                custom={i}
              >
                <div className={s.flowDot}>{step.icon}</div>
                <div className={s.flowName}>{step.name}</div>
                <div className={s.flowDesc}>{step.desc.split('\n').map((line, j) => <span key={j}>{line}<br /></span>)}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className={s.contact}>
        <SectionHeader tag="04 // CONTACT" num="INIT_HANDSHAKE" />
        <div className={s.contactGrid}>
          <div className={s.contactPanel} style={{ position: 'relative' }}>
            <CornerDecorations />
            <div className={s.contactBig}>Запустим<br /><span className={s.accent}>ваш</span><br />продукт?</div>
            <div className={s.contactSub}>Беру 1–2 проекта в месяц. Работаю с командами и напрямую с основателями стартапов.</div>
            <div className={s.availability}>
              <div className={s.statusDot} />
              ДОСТУПЕН ДЛЯ НОВЫХ ПРОЕКТОВ — ФЕВРАЛЬ 2025
            </div>
            <div className={s.contactLinks}>
              <a href="https://t.me/kotomen" className={s.contactLink} target="_blank" rel="noreferrer">
                <span className={s.contactLinkIcon}>✈️</span>
                Telegram — @kotomen
                <span className={s.contactLinkArrow}>→</span>
              </a>
              <a href="mailto:hello@kotomen.dev" className={s.contactLink}>
                <span className={s.contactLinkIcon}>📧</span>
                hello@kotomen.dev
                <span className={s.contactLinkArrow}>→</span>
              </a>
              <a href="#" className={s.contactLink}>
                <span className={s.contactLinkIcon}>🐙</span>
                GitHub / Portfolio
                <span className={s.contactLinkArrow}>→</span>
              </a>
            </div>
          </div>
          <div className={s.contactRight}>
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                className={s.statBlock}
                style={{ position: 'relative' }}
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.1 }}
                custom={i}
              >
                <CornerDecorations corners={['tl', 'tr']} />
                <div className={s.statNum}>{stat.num}</div>
                <div className={s.statLabel}>{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
