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
  { label: 'Frontend', value: 0.70 },
  { label: 'Backend', value: 0.63 },
  { label: 'DevOps', value: 0.25 },
  { label: 'Design', value: 0.46 },
  { label: 'AI Tools', value: 0.78 },
  { label: 'Product', value: 0.70 },
];

function RadarChart() {
  const canvasRef = useRef(null);
  const animProgress = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const dpr = window.devicePixelRatio || 1;
    const size = 420;
    canvas.width = size * dpr;
    canvas.height = size * dpr;
    canvas.style.width = size + 'px';
    canvas.style.height = size + 'px';
    ctx.scale(dpr, dpr);

    const cx = size / 2, cy = size / 2, r = 160;
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
        ctx.strokeStyle = 'rgba(0,229,255,0.08)';
        ctx.lineWidth = 1;
        ctx.stroke();
      }

      // axis lines
      skillsData.forEach((_, i) => {
        const angle = startAngle + i * angleStep;
        ctx.beginPath();
        ctx.moveTo(cx, cy);
        ctx.lineTo(cx + r * Math.cos(angle), cy + r * Math.sin(angle));
        ctx.strokeStyle = 'rgba(0,229,255,0.12)';
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
      grad.addColorStop(0, 'rgba(0,229,255,0.20)');
      grad.addColorStop(1, 'rgba(0,229,255,0.04)');
      ctx.fillStyle = grad;
      ctx.fill();
      ctx.strokeStyle = 'rgba(0,229,255,0.7)';
      ctx.lineWidth = 1.5;
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
        ctx.fillStyle = '#00e5ff';
        ctx.shadowColor = '#00e5ff';
        ctx.shadowBlur = 12;
        ctx.fill();
        ctx.shadowBlur = 0;

        // label
        const lx = cx + (r + 28) * Math.cos(angle);
        const ly = cy + (r + 28) * Math.sin(angle);
        ctx.font = '11px Share Tech Mono';
        ctx.fillStyle = 'rgba(0,229,255,0.8)';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(skill.label.toUpperCase(), lx, ly);

        const pct = Math.round(skill.value * 100 * progress);
        ctx.font = '9px Share Tech Mono';
        ctx.fillStyle = 'rgba(201,209,217,0.45)';
        ctx.fillText(pct + '%', lx, ly + 14);
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

    return () => { observer.disconnect(); cancelAnimationFrame(rafId); };
  }, []);

  return <canvas ref={canvasRef} className={s.skillsRadarCanvas} />;
}

/* ===== SKILLS DATA ===== */
const techChips = ['React', 'Next.js', 'FastAPI', 'PostgreSQL', 'Docker', 'CI/CD', 'Figma'];

const techBars = [
  { name: 'React / Next.js', level: 0.70 },
  { name: 'FastAPI / Python', level: 0.63 },
  { name: 'Figma / UI', level: 0.46 },
  { name: 'Docker / Linux', level: 0.25 },
  { name: 'AI Tooling', level: 0.78 },
];

const kanbanCards = [
  { id: 1, col: 'todo', label: 'Landing · Design', title: 'Лендинг для EdTech-стартапа', desc: 'Дизайн + прототип в Figma, анимации', tags: ['Figma', 'GSAP'], progress: 0 },
  { id: 2, col: 'todo', label: 'API · Backend', title: 'REST API для фитнес-трекера', desc: 'Авторизация, CRUD, WebSocket', tags: ['FastAPI', 'Redis'], progress: 0 },
  { id: 3, col: 'progress', label: 'SaaS · Full-stack', title: 'CRM для фриланс-агентства', desc: 'Канбан, трекинг времени, счета', tags: ['React', 'FastAPI', 'PostgreSQL'], progress: 0.45 },
  { id: 4, col: 'progress', label: 'Bot · AI', title: 'AI-ассистент для курсов', desc: 'Telegram-бот, GPT + RAG', tags: ['Python', 'GPT API'], progress: 0.65 },
  { id: 5, col: 'done', label: 'Dashboard · Full-stack', title: 'Аналитический дашборд SaaS', desc: 'Realtime-метрики, ролевая система', tags: ['React', 'Charts', 'FastAPI'], progress: 1 },
  { id: 6, col: 'done', label: 'E-commerce · Frontend', title: 'Магазин ювелирных украшений', desc: '3D-просмотр, Stripe, адаптив', tags: ['Next.js', 'Stripe'], progress: 1 },
];

const kanbanFilters = [
  { key: 'all', label: 'All' },
  { key: 'todo', label: 'Todo' },
  { key: 'progress', label: 'In Progress' },
  { key: 'done', label: 'Done' },
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
  const [kanbanFilter, setKanbanFilter] = useState('all');

  const filteredCards = kanbanCards.filter(c =>
    kanbanFilter === 'all' || c.col === kanbanFilter
  );

  const colColor = (col) => {
    if (col === 'todo') return s.colTodo;
    if (col === 'progress') return s.colProgress;
    return s.colDone;
  };

  const colLabel = (col) => {
    if (col === 'todo') return 'TODO';
    if (col === 'progress') return 'NOW';
    return 'DONE';
  };

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
            <RadarChart />
          </div>
        </motion.div>
      </section>

      {/* ===== SKILLS DASHBOARD ===== */}
      <section id="skills" className={s.skills}>
        <SectionHeader tag="01 // SKILLS" num="DASHBOARD_ACTIVE" />
        <h2 className={s.sectionTitle}>Мои навыки</h2>
        <div className={s.skillsGlowLine} />

        <div className={s.skillsLayout}>
          {/* LEFT — Radar + Tech */}
          <div className={s.skillsLeft}>
            <motion.div
              className={s.skillsRadarWrap}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
              custom={0}
              style={{ position: 'relative' }}
            >
              <CornerDecorations />
              <div className={s.skillsRadarHeader}>TACTICAL_RADAR.exe</div>
              <RadarChart />
            </motion.div>

            {/* Tech chips */}
            <motion.div
              className={s.techChips}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
              custom={1}
            >
              {techChips.map(chip => (
                <span key={chip} className={s.techChip} data-cursor-hover>{chip}</span>
              ))}
            </motion.div>

            {/* Progress bars */}
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
                      transition={{ duration: 1, delay: 0.3 }}
                    />
                  </div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* RIGHT — Kanban */}
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

              {/* Kanban header / filters */}
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

              {/* Cards */}
              <div className={s.kanbanBody}>
                <AnimatePresence mode="popLayout">
                  {filteredCards.map((card, i) => (
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
                      {card.progress > 0 && card.progress < 1 && (
                        <div className={s.kanbanProgress}>
                          <div className={s.kanbanProgressTrack}>
                            <div className={s.kanbanProgressFill} style={{ width: `${card.progress * 100}%` }} />
                          </div>
                          <span className={s.kanbanProgressPct}>{Math.round(card.progress * 100)}%</span>
                        </div>
                      )}
                      <div className={s.kanbanCardTags}>
                        {card.tags.map(t => <span key={t} className={s.kanbanTag}>{t}</span>)}
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
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
