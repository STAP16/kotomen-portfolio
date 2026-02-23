import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
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

function RadarChart() {
  const canvasRef = useRef(null);
  const animProgress = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const cx = 160, cy = 160, r = 120;
    const skills = [
      { label: 'Frontend', value: 0.9 },
      { label: 'Backend', value: 0.85 },
      { label: 'DevOps', value: 0.7 },
      { label: 'UI/UX', value: 0.8 },
      { label: 'AI Tools', value: 0.9 },
      { label: 'Product', value: 0.75 },
    ];
    const n = skills.length;
    const angleStep = (Math.PI * 2) / n;
    const startAngle = -Math.PI / 2;

    function draw(progress) {
      ctx.clearRect(0, 0, 320, 320);
      for (let ring = 1; ring <= 4; ring++) {
        ctx.beginPath();
        for (let i = 0; i <= n; i++) {
          const angle = startAngle + i * angleStep;
          const rr = (r * ring) / 4;
          const x = cx + rr * Math.cos(angle);
          const y = cy + rr * Math.sin(angle);
          i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
        }
        ctx.strokeStyle = 'rgba(0,229,255,0.1)';
        ctx.lineWidth = 1;
        ctx.stroke();
      }
      skills.forEach((_, i) => {
        const angle = startAngle + i * angleStep;
        ctx.beginPath();
        ctx.moveTo(cx, cy);
        ctx.lineTo(cx + r * Math.cos(angle), cy + r * Math.sin(angle));
        ctx.strokeStyle = 'rgba(0,229,255,0.15)';
        ctx.lineWidth = 1;
        ctx.stroke();
      });
      ctx.beginPath();
      skills.forEach((skill, i) => {
        const angle = startAngle + i * angleStep;
        const val = skill.value * progress;
        const x = cx + r * val * Math.cos(angle);
        const y = cy + r * val * Math.sin(angle);
        i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
      });
      ctx.closePath();
      ctx.fillStyle = 'rgba(0,229,255,0.12)';
      ctx.fill();
      ctx.strokeStyle = 'rgba(0,229,255,0.8)';
      ctx.lineWidth = 1.5;
      ctx.stroke();
      skills.forEach((skill, i) => {
        const angle = startAngle + i * angleStep;
        const val = skill.value * progress;
        const x = cx + r * val * Math.cos(angle);
        const y = cy + r * val * Math.sin(angle);
        ctx.beginPath();
        ctx.arc(x, y, 3, 0, Math.PI * 2);
        ctx.fillStyle = '#00e5ff';
        ctx.fill();
        ctx.shadowColor = '#00e5ff';
        ctx.shadowBlur = 8;
        ctx.fill();
        ctx.shadowBlur = 0;
        const lx = cx + (r + 24) * Math.cos(angle);
        const ly = cy + (r + 24) * Math.sin(angle);
        ctx.font = '10px Share Tech Mono';
        ctx.fillStyle = 'rgba(0,229,255,0.7)';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(skill.label.toUpperCase(), lx, ly);
        const pct = Math.round(skill.value * 100 * progress);
        ctx.font = '8px Share Tech Mono';
        ctx.fillStyle = 'rgba(201,209,217,0.5)';
        ctx.fillText(pct + '%', lx, ly + 12);
      });
    }

    let rafId;
    function animate() {
      if (animProgress.current < 1) {
        animProgress.current += 0.02;
        draw(Math.min(animProgress.current, 1));
        rafId = requestAnimationFrame(animate);
      }
    }

    const observer = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && animProgress.current === 0) {
        setTimeout(animate, 600);
      }
    });
    observer.observe(canvas);

    return () => { observer.disconnect(); cancelAnimationFrame(rafId); };
  }, []);

  return <canvas ref={canvasRef} className={s.radarCanvas} width={320} height={320} />;
}

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

const kanbanCols = [
  {
    title: 'В процессе', color: '#f0883e',
    cards: [
      { label: 'SaaS · Full-stack', title: 'CRM для фриланс-агентства', metric: '→ MVP через 3 недели', tags: ['React', 'FastAPI', 'PostgreSQL'] },
      { label: 'Bot · Telegram', title: 'AI-ассистент для онлайн-курсов', metric: '→ В разработке', tags: ['Python', 'GPT API'] },
    ],
  },
  {
    title: 'Завершено', color: '#39d353',
    cards: [
      { label: 'E-commerce · Frontend', title: 'Интернет-магазин ювелирных украшений', metric: '↑ Конверсия +35%', tags: ['Next.js', 'Stripe', 'Figma'] },
      { label: 'API · Backend', title: 'Платёжный сервис для маркетплейса', metric: '↑ 99.9% uptime', tags: ['FastAPI', 'Redis', 'Docker'] },
    ],
  },
  {
    title: 'Лучшие кейсы', color: '#00e5ff',
    cards: [
      { label: 'Dashboard · Full-stack', title: 'Аналитический дашборд для SaaS', metric: '↑ DAU +120% за 2 месяца', tags: ['React', 'Charts', 'FastAPI'] },
      { label: 'Automation · DevOps', title: 'CI/CD пайплайн для команды 8 человек', metric: '↓ Деплой с 2ч до 7 мин', tags: ['GitHub Actions', 'Docker'] },
    ],
  },
];

const stats = [
  { num: '20+', label: 'Проектов запущено' },
  { num: '3×', label: 'Быстрее команды из трёх человек' },
  { num: '4+', label: 'Года в разработке' },
];

export default function Home() {
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
            <a href="#projects" className={s.btnSecondary}>[ Посмотреть работы ]</a>
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

      {/* ROLES */}
      <section id="roles" className={s.roles}>
        <SectionHeader tag="01 // ROLES" num="MODULE_LOADED" />
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
        <SectionHeader tag="02 // PROCESS" num="WORKFLOW_ACTIVE" />
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

      {/* PROJECTS KANBAN */}
      <section id="projects" className={s.projects}>
        <SectionHeader tag="03 // PROJECTS" num="6_LOADED" />
        <h2 className={s.sectionTitle}>Проекты</h2>
        <div className={s.projectsBoard}>
          <div className={s.boardHeader}>
            {kanbanCols.map(col => (
              <div key={col.title} className={s.boardColTitle}>
                <span className={s.colDot} style={{ background: col.color }} />
                {col.title}
              </div>
            ))}
          </div>
          <div className={s.boardBody}>
            {kanbanCols.map(col => (
              <div key={col.title} className={s.boardCol}>
                {col.cards.map((card, i) => (
                  <motion.div
                    key={card.title}
                    className={s.projectCard}
                    data-cursor-hover
                    variants={cardVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.1 }}
                    custom={i}
                  >
                    <div className={s.projectCardLabel}>{card.label}</div>
                    <div className={s.projectCardTitle}>{card.title}</div>
                    <div className={s.projectCardMetric}>{card.metric}</div>
                    <div className={s.projectTags}>
                      {card.tags.map(t => <span key={t} className={s.ptag}>{t}</span>)}
                    </div>
                  </motion.div>
                ))}
              </div>
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
