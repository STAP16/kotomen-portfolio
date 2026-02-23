import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import SectionHeader from '../../components/SectionHeader/SectionHeader';
import CornerDecorations from '../../components/CornerDecorations/CornerDecorations';
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

function RadarChart({ onAxisHover = () => {}, size = 460 }) {
  const canvasRef = useRef(null);
  const animProgress = useRef(0);
  const hoveredAxisRef = useRef(-1);

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
      const hovered = hoveredAxisRef.current;

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
        const isActive = hovered === i;
        ctx.strokeStyle = isActive ? 'rgba(0,240,255,0.75)' : 'rgba(0,240,255,0.2)';
        ctx.lineWidth = isActive ? 1.6 : 1;
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
        const isActive = hovered === i;
        ctx.arc(x, y, isActive ? 5 : 4, 0, Math.PI * 2);
        ctx.fillStyle = '#00d8e6';
        ctx.shadowColor = '#00e7f7';
        ctx.shadowBlur = isActive ? 18 : 12;
        ctx.fill();
        ctx.shadowBlur = 0;

        // label
        const lx = cx + (r + 30) * Math.cos(angle);
        const ly = cy + (r + 30) * Math.sin(angle);
        ctx.font = isActive ? '700 12px Inter' : '500 11px Inter';
        ctx.fillStyle = isActive ? 'rgba(214,250,255,0.95)' : 'rgba(146,222,232,0.85)';
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

    function getHoveredAxis(event) {
      const rect = canvas.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      const dx = x - cx;
      const dy = y - cy;
      const distance = Math.sqrt(dx * dx + dy * dy);
      if (distance > r + 32 || distance < 28) return -1;

      let angle = Math.atan2(dy, dx) - startAngle;
      if (angle < 0) angle += Math.PI * 2;
      return Math.round(angle / angleStep) % n;
    }

    const handleMove = (event) => {
      const nextHovered = getHoveredAxis(event);
      if (nextHovered !== hoveredAxisRef.current) {
        hoveredAxisRef.current = nextHovered;
        onAxisHover(nextHovered >= 0 ? skillsData[nextHovered].label : null);
        draw(Math.min(animProgress.current, 1));
      }
    };

    const handleLeave = () => {
      hoveredAxisRef.current = -1;
      onAxisHover(null);
      draw(Math.min(animProgress.current, 1));
    };

    canvas.addEventListener('mousemove', handleMove);
    canvas.addEventListener('mouseleave', handleLeave);

    return () => {
      observer.disconnect();
      cancelAnimationFrame(rafId);
      canvas.removeEventListener('mousemove', handleMove);
      canvas.removeEventListener('mouseleave', handleLeave);
    };
  }, [onAxisHover]);

  return <canvas ref={canvasRef} className={s.skillsRadarCanvas} />;
}

/* ===== SKILLS DATA ===== */
const techChips = ['React', 'Next.js', 'FastAPI', 'PostgreSQL', 'Docker', 'CI/CD', 'AWS'];

const axisTechMap = {
  Frontend: ['React', 'Next.js'],
  Backend: ['FastAPI', 'PostgreSQL'],
  DevOps: ['Docker', 'CI/CD', 'AWS'],
  Design: ['React', 'Next.js'],
  'AI Tools': ['FastAPI', 'AWS'],
  'Product Thinking': ['React', 'PostgreSQL', 'CI/CD'],
};

const techBars = [
  { name: 'React / Next.js', level: 0.82 },
  { name: 'FastAPI / Python', level: 0.74 },
  { name: 'Product Ops', level: 0.77 },
  { name: 'Docker / CI', level: 0.58 },
  { name: 'AI Tooling', level: 0.86 },
];

const kanbanCards = [
  { id: 1, col: 'todo', label: 'Design Sprint', title: 'EdTech landing architecture', desc: 'Flow map, value framing and key UX hypotheses.', stack: ['◉', '△', '⌘'], progress: 0.18, members: ['AK', 'IR', 'UI'], role: 'Product + UX lead', steplanding: true },
  { id: 2, col: 'todo', label: 'API System', title: 'Fitness tracker service core', desc: 'Auth, event model and API contracts for clients.', stack: ['λ', '▦', '⇄'], progress: 0.24, members: ['BE', 'QA'], role: 'Backend architect', steplanding: false },
  { id: 3, col: 'progress', label: 'SaaS CRM', title: 'Agency operating workspace', desc: 'Kanban, estimates and analytics in one loop.', stack: ['◉', 'λ', '▦'], progress: 0.61, members: ['FS', 'PM', 'DS'], role: 'System orchestrator', steplanding: true },
  { id: 4, col: 'progress', label: 'AI Workflow', title: 'Course assistant pipeline', desc: 'Prompt routing, retrieval quality and moderation.', stack: ['λ', '✶', '⇄'], progress: 0.74, members: ['AI', 'BE'], role: 'AI integration owner', steplanding: false },
  { id: 5, col: 'done', label: 'Analytics Board', title: 'SaaS executive dashboard', desc: 'Real-time metrics, role model and alerting.', stack: ['◉', '▣', 'λ'], progress: 1, members: ['FS', 'DA', 'CTO'], role: 'Product engineering lead', steplanding: true },
  { id: 6, col: 'done', label: 'Commerce UX', title: 'Jewelry commerce platform', desc: 'Checkout pipeline with conversion-focused UI.', stack: ['◉', '◇', '⌁'], progress: 1, members: ['FE', 'UX'], role: 'Frontend owner', steplanding: false },
];

const kanbanFilters = [
  { key: 'todo', label: 'Todo' },
  { key: 'progress', label: 'In Progress' },
  { key: 'done', label: 'Done' },
  { key: 'steplanding', label: 'STEPLANDING' },
];

/* ===== OTHER DATA ===== */
const roles = [
  { icon: '🎨', num: '01', label: 'ROLE_01', title: 'UI/UX Дизайнер', desc: 'Проектирую интерфейсы, которые не просто красивы — они конвертируют. От вайрфрейма до готового дизайн-макета с учётом пользовательского опыта.', tools: ['Figma', 'Prototyping', 'Design Systems', 'UX Research'] },
  { icon: '⚡', num: '02', label: 'ROLE_02', title: 'Frontend Dev', desc: 'Воплощаю дизайн в живой интерфейс. React-приложения с анимациями, адаптивной вёрсткой и оптимизацией под реальных пользователей.', tools: ['React', 'TypeScript', 'Next.js', 'Tailwind', 'CSS/GSAP'] },
  { icon: '🔧', num: '03', label: 'ROLE_03', title: 'Backend Dev', desc: 'Проектирую и строю API, базы данных и серверную логику. FastAPI, PostgreSQL, аутентификация, оптимизация запросов — от MVP до продакшна.', tools: ['FastAPI', 'Python', 'PostgreSQL', 'Redis', 'REST/WebSocket'] },
  { icon: '🚀', num: '04', label: 'ROLE_04', title: 'DevOps', desc: 'Разворачиваю и поддерживаю инфраструктуру. Docker, CI/CD пайплайны, деплой на сервер — проект едет в продакшн без лишних вопросов.', tools: ['Docker', 'GitHub Actions', 'Nginx', 'VPS', 'Linux'] },
];

const flowSteps = [
  { icon: '💡', name: 'BRIEF', desc: 'Разбираем задачу,\nцели, аудиторию,\nсроки' },
  { icon: '📐', name: 'DESIGN', desc: 'Прототип и\nUI в Figma.\nСогласование' },
  { icon: '⚙️', name: 'BUILD', desc: 'Frontend + Backend.\nИтерации,\nдемо каждые 3 дня' },
  { icon: '🔍', name: 'TEST', desc: 'QA, правки,\nоптимизация\nпроизводительности' },
  { icon: '🚀', name: 'DEPLOY', desc: 'Деплой, настройка\nCI/CD, передача\nпроекта' },
];

const stats = [
  { num: '20+', label: 'Проектов запущено' },
  { num: '3×', label: 'Быстрее команды из трёх человек' },
  { num: '4+', label: 'Года в разработке' },
];

/* ===== COMPONENT ===== */
export default function Home() {
  const [kanbanFilter, setKanbanFilter] = useState('progress');
  const [activeAxis, setActiveAxis] = useState(null);
  const [skillsParallax, setSkillsParallax] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      setSkillsParallax(window.scrollY * 0.08);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const colColor = (col) => {
    if (col === 'todo') return s.colTodo;
    if (col === 'progress') return s.colProgress;
    return s.colDone;
  };

  const colLabel = (col) => {
    if (col === 'todo') return 'TODO';
    if (col === 'progress') return 'NOW';
    return 'COMPLETED';
  };

  const skillsSectionStyle = { '--skills-parallax': `${skillsParallax}px` };

  const getColumnCards = (column) =>
    kanbanCards.filter((card) => {
      if (card.col !== column) return false;
      if (kanbanFilter === 'steplanding') return card.steplanding;
      return card.col === kanbanFilter;
    });

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
          <div className={s.radarContainer} style={{ position: 'relative' }}>
            <CornerDecorations />
            <div className={s.radarTitle}>SKILL_MATRIX.exe — v2.4.1</div>
            <RadarChart size={420} />
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
              <RadarChart onAxisHover={setActiveAxis} size={460} />
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
                  className={`${s.techChip} ${activeAxis && axisTechMap[activeAxis]?.includes(chip) ? s.techChipActive : ''}`}
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
            <div className={s.kanbanPanel} style={{ position: 'relative' }}>
              <CornerDecorations />

              <div className={s.kanbanHeader}>
                <span className={s.kanbanTitle}>PROJECTS.board</span>
                <div className={s.kanbanFilters}>
                  {kanbanFilters.map(f => (
                    <button
                      key={f.key}
                      className={`${s.kanbanFilterBtn} ${kanbanFilter === f.key ? s.kanbanFilterActive : ''}`}
                      onClick={() => setKanbanFilter(f.key)}
                    >
                      {f.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className={s.kanbanBody}>
                {[
                  { key: 'todo', title: 'Todo' },
                  { key: 'progress', title: 'In Progress' },
                  { key: 'done', title: 'Done' },
                ].map((column) => (
                  <div
                    key={column.key}
                    className={`${s.kanbanColumn} ${column.key === 'progress' ? s.kanbanColumnAccent : ''}`}
                  >
                    <div className={s.kanbanColumnHead}>
                      <span>{column.title}</span>
                      {column.key === 'progress' && <span className={s.nowBadge}>Now</span>}
                    </div>
                    <AnimatePresence mode="popLayout">
                      {getColumnCards(column.key).map((card, i) => (
                        <motion.div
                          key={card.id}
                          className={s.kanbanCard}
                          data-cursor-hover
                          layout
                          initial={{ opacity: 0, y: 12 }}
                          animate={{ opacity: 1, y: 0, transition: { delay: i * 0.05 } }}
                          exit={{ opacity: 0, y: 8, transition: { duration: 0.2 } }}
                        >
                          <div className={s.kanbanCardTop}>
                            <span className={s.kanbanCardLabel}>{card.label}</span>
                            <span className={`${s.kanbanCardStatus} ${colColor(card.col)}`}>{colLabel(card.col)}</span>
                          </div>
                          <div className={s.kanbanCardTitle}>{card.title}</div>
                          <div className={s.kanbanCardDesc}>{card.desc}</div>
                          <div className={s.kanbanStackRow}>
                            {card.stack.map((item) => (
                              <span key={`${card.id}-${item}`} className={s.kanbanStackIcon}>{item}</span>
                            ))}
                          </div>
                          <div className={s.kanbanProgress}>
                            <div className={s.kanbanProgressTrack}>
                              <div className={s.kanbanProgressFill} style={{ width: `${card.progress * 100}%` }} />
                            </div>
                          </div>
                          <div className={s.kanbanMembers}>
                            {card.members.map((member) => (
                              <span key={`${card.id}-${member}`} className={s.kanbanMember}>{member}</span>
                            ))}
                          </div>
                          <div className={s.cardRoleHint}>{card.role}</div>
                        </motion.div>
                      ))}
                    </AnimatePresence>
                  </div>
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
