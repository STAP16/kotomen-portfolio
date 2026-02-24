import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import SectionHeader from '../../components/SectionHeader/SectionHeader';
import CornerDecorations from '../../components/CornerDecorations/CornerDecorations';
import aboutImg from '../../assets/About-img.png';
import s from './About.module.css';

const fadeUp = (i = 0) => ({
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { delay: i * 0.08, duration: 0.5 } },
});

const fadeLeft = (i = 0) => ({
  hidden: { opacity: 0, x: -20 },
  visible: { opacity: 1, x: 0, transition: { delay: i * 0.1, duration: 0.5 } },
});

const inViewViewport = { once: true, amount: 0.01 };

/* ===== SVG ICONS ===== */
const IconAISkills = () => (
  <svg width="28" height="28" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="6" y="4" width="20" height="16" rx="3" stroke="currentColor" strokeWidth="1.6"/>
    <circle cx="12" cy="12" r="2" fill="currentColor"/>
    <circle cx="20" cy="12" r="2" fill="currentColor"/>
    <path d="M10 24L12 20H20L22 24" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M14 28H18" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
    <path d="M4 10H6M26 10H28M4 14H6M26 14H28" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" opacity="0.5"/>
  </svg>
);

const IconFrontendAbout = () => (
  <svg width="28" height="28" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 8L5 16L12 24" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M20 8L27 16L20 24" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M18 6L14 26" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" opacity="0.6"/>
  </svg>
);

const IconBackendAbout = () => (
  <svg width="28" height="28" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="5" y="4" width="22" height="7" rx="2" stroke="currentColor" strokeWidth="1.6"/>
    <rect x="5" y="13" width="22" height="7" rx="2" stroke="currentColor" strokeWidth="1.6"/>
    <rect x="5" y="22" width="22" height="7" rx="2" stroke="currentColor" strokeWidth="1.6"/>
    <circle cx="9" cy="7.5" r="1.2" fill="currentColor"/>
    <circle cx="9" cy="16.5" r="1.2" fill="currentColor"/>
    <circle cx="9" cy="25.5" r="1.2" fill="currentColor"/>
    <path d="M14 7.5H23M14 16.5H20M14 25.5H21" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" opacity="0.4"/>
  </svg>
);

const IconDevOpsAbout = () => (
  <svg width="28" height="28" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="16" cy="16" r="11" stroke="currentColor" strokeWidth="1.6"/>
    <path d="M16 5V16L22 22" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M10 3L12 6M22 3L20 6M27 10L24 12M27 22L24 20M5 10L8 12M5 22L8 20" stroke="currentColor" strokeWidth="1" strokeLinecap="round" opacity="0.4"/>
    <circle cx="16" cy="16" r="2" fill="currentColor"/>
  </svg>
);

const IconOnboarding = () => (
  <svg width="28" height="28" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M6 16L14 24L26 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M14 16L18 20" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" opacity="0.3"/>
    <circle cx="26" cy="8" r="3" stroke="currentColor" strokeWidth="1.2" opacity="0.4"/>
  </svg>
);

const IconArchitecture = () => (
  <svg width="28" height="28" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="4" y="22" width="8" height="6" rx="1" stroke="currentColor" strokeWidth="1.4"/>
    <rect x="12" y="22" width="8" height="6" rx="1" stroke="currentColor" strokeWidth="1.4"/>
    <rect x="20" y="22" width="8" height="6" rx="1" stroke="currentColor" strokeWidth="1.4"/>
    <rect x="10" y="4" width="12" height="8" rx="2" stroke="currentColor" strokeWidth="1.6"/>
    <path d="M16 12V18" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
    <path d="M8 18H24" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
    <path d="M8 18V22M16 18V22M24 18V22" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
  </svg>
);

const IconTeamwork = () => (
  <svg width="28" height="28" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="16" cy="10" r="4" stroke="currentColor" strokeWidth="1.6"/>
    <path d="M10 27V25C10 22.24 12.24 20 15 20H17C19.76 20 22 22.24 22 25V27" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
    <circle cx="6" cy="14" r="2.5" stroke="currentColor" strokeWidth="1.2" opacity="0.5"/>
    <path d="M3 25V24C3 22.34 4.34 21 6 21" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" opacity="0.5"/>
    <circle cx="26" cy="14" r="2.5" stroke="currentColor" strokeWidth="1.2" opacity="0.5"/>
    <path d="M29 25V24C29 22.34 27.66 21 26 21" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" opacity="0.5"/>
  </svg>
);

const timeline = [
  {
    year: '2023–2024 // BACKEND & БОЛЬ',
    title: 'Python, телеграм-боты и бессонные ночи',
    desc: <>Начал с классического бэкенда. <strong>5–7 часов на дебаг — норма.</strong> Первые боты на чистом энтузиазме и ошибках. Это было больно, но это дало мне фундамент.</>,
    tags: ['Python', 'Дебаг', 'Telegram Bots'],
  },
  {
    year: '2025 // FULLSTACK',
    title: 'От ботов к веб-приложениям',
    desc: <><strong>React + FastAPI.</strong> От ботов к веб-приложениям. Понял, что сидеть только в бэкенде — слишком узко.</>,
    tags: ['React', 'FastAPI', 'Mini Apps'],
  },
  {
    year: '2026 // ФРОНТЕНД + ДИЗАЙН',
    title: 'Курс по Frontend и первый энд-ту-энд',
    desc: <>Активно генерировал концепции с помощью AI и собирал интерфейсы. Понял, что могу <strong>закрыть проект от идеи до продакшна</strong>.</>,
    tags: ['Figma', 'UI/UX', 'ChatGPT'],
  },
  {
    year: '2026 // ПРИНЯТИЕ AI',
    title: 'Отрицание закончилось',
    desc: <>Долго упирался. Думал: «Я сам, руками». Но глядя на запад и тренды, начал внедрять AI-инструменты. Скорость выросла в разы.<br /><br />На курсе по фронтенду куратор показал, как за 3 часа реализовал систему автоматической проверки заданий. Без AI на это ушли бы дни. В этот момент <strong>всё встало на свои места</strong>.</>,
    tags: ['AI Tools', 'Product Thinking', 'System Design', 'Архитектура'],
  },
  {
    year: '2026–NOW // АРХИТЕКТОР И ЛИД',
    title: 'Архитектор и лид',
    desc: <>Вырос до роли, где важнее не количество строк, а то, как <strong>система живёт и масштабируется</strong>. Веду студенческую лабораторию, где команда обновляется каждые 2–3 месяца — учу, онборжу, выстраиваю процессы. Могу закрыть проект соло, могу повести за собой команду.</>,
    tags: ['Управление', 'Архитектура', 'Менторство'],
  },
];

const stack = [
  { icon: <IconAISkills />, name: 'AI SKILLS', items: ['ChatGPT', 'Midjourney', 'DALL·E', 'Stable Diffusion', 'Prompt Engineering'] },
  { icon: <IconFrontendAbout />, name: 'FRONTEND', items: ['React', 'JavaScript', 'Tailwind CSS', 'GSAP / Framer', 'Vite / Webpack'] },
  { icon: <IconBackendAbout />, name: 'BACKEND', items: ['FastAPI / Python', 'PostgreSQL', 'JWT', 'SQLAlchemy', 'REST API'] },
  { icon: <IconDevOpsAbout />, name: 'DEVOPS', items: ['Docker / Compose', 'Nginx', 'Linux / VPS', 'GitHub Actions', 'Деплой на сервер'] },
];

const personality = [
  { icon: <IconOnboarding />, title: 'Быстрый онбординг', desc: 'Быстро ввожу в контекст новых участников. Умею декомпозировать задачи так, чтобы новичок начал приносить пользу с первого дня.' },
  { icon: <IconArchitecture />, title: 'Понятная архитектура', desc: 'Проектирую архитектуру так, чтобы в ней не путались. Чистый код, понятные абстракции, масштабируемые решения.' },
  { icon: <IconTeamwork />, title: 'Командная работа', desc: 'Работаю плечом к плечу с дизайнерами, разработчиками и продактами. А если надо — просто беру и делаю всё сам.' },
];

export default function About() {
  return (
    <main className={s.page}>
      {/* PAGE HEADER */}
      <div className={s.pageHeader}>
        <div className={s.breadcrumb}>
          <Link to="/">~</Link>
          <span className={s.breadcrumbSep}>/</span>
          about.exe
        </div>
        <h1 className={s.pageTitle}>ОБО<br /><span className={s.accent}>МНЕ</span></h1>
        <p className={s.pageSubtitle}>Инженер, который видит продукт целиком — от пикселя до сервера. Раньше кодил каждую строчку руками. Теперь строю быстрее и умнее.</p>
      </div>

      {/* IDENTITY */}
      <SectionHeader tag="01 // IDENTITY" num="PROFILE_LOADED" />
      <div className={s.identityGrid}>
        <motion.div className={s.identityCard} variants={fadeUp(0)} initial="hidden" whileInView="visible" viewport={inViewViewport}>
          <CornerDecorations />
          <div className={s.avatarWrapper}>
            <img src={aboutImg} alt="Котоман Степан" className={s.avatarPlaceholder} />
          </div>
          <div className={s.identityName}>Котоман Степан</div>
          <div className={s.identityRole}>FULL-STACK PRODUCT ENGINEER</div>
          <div className={s.identityMeta}>
            <div className={s.metaRow}><span className={s.metaLabel}>ЛОКАЦИЯ</span><span className={s.metaValue}>Россия / Remote</span></div>
            <div className={s.metaRow}><span className={s.metaLabel}>ОПЫТ</span><span className={s.metaValue}>4+ года</span></div>
            <div className={s.metaRow}><span className={s.metaLabel}>СТАТУС</span><span className={`${s.metaValue} ${s.green}`}>● AVAILABLE</span></div>
            <div className={s.metaRow}><span className={s.metaLabel}>ПРОЕКТЫ</span><span className={s.metaValue}>20+ запущено</span></div>
            <div className={s.metaRow}><span className={s.metaLabel}>TELEGRAM</span><span className={s.metaValue}>@kotomen</span></div>
          </div>
        </motion.div>

        <motion.div className={s.identityBio} variants={fadeUp(1)} initial="hidden" whileInView="visible" viewport={inViewViewport}>
          <CornerDecorations />
          <div className={s.bioText}>
            Я начинал с Python. И тонул в деталях. 5–7 часов на поиск одной ошибки? Было дело.
            Код писал руками, стек гуглил часами, а сложные задачи выбивали из колеи.
            Это была <strong>школа боли</strong>, которая научила главному — ценить архитектуру и скорость мысли.<br /><br />
            Поняв, что бэкенд — это не всё, ушёл во фулстек. <strong>React + FastAPI</strong> дали возможность
            видеть картинку целиком. Но настоящий прорыв случился, когда я перестал отрицать ИИ.
            Сначала присматривался, тестировал, сомневался. А теперь — использую как <strong>реактивный двигатель</strong>.<br /><br />
            Сегодня я:<br /><br />
            <strong>Проектирую решения.</strong> Рисую дизайн, продумываю логику от первого экрана до сервера.<br /><br />
            <strong>Управляю процессами и людьми.</strong> В колледже основал и веду «Студенческую лабораторию цифровых технологий и ИИ».
            Команда обновляется каждые 2–3 месяца — я онборжу новичков, ставлю задачи, проверяю код
            и слежу, чтобы проект не останавливался ни на день.<br /><br />
            <strong>Собираю продукты, на которые обычно нужна команда.</strong> Могу закрыть проект соло.
            А могу собрать команду и повести её за собой.
          </div>
          <div className={s.bioValues}>
            {['СИСТЕМНОЕ МЫШЛЕНИЕ', 'СКОРОСТЬ РАЗРАБОТКИ', 'CODE QUALITY', 'УПРАВЛЕНИЕ КОМАНДОЙ', 'АВТОНОМНОСТЬ'].map(v => (
              <span key={v} className={s.valueTag}>{v}</span>
            ))}
          </div>
        </motion.div>
      </div>

      {/* TIMELINE */}
      <div className={s.timelineSection}>
        <SectionHeader tag="02 // ROADMAP" num="HISTORY_LOG" />
        <div className={s.timeline}>
          {timeline.map((item, i) => (
            <motion.div
              key={item.year}
              className={s.timelineItem}
              variants={fadeLeft(i)}
              initial="hidden"
              whileInView="visible"
              viewport={inViewViewport}
            >
              <div className={s.timelineDot} />
              <div className={s.timelineYear}>{item.year}</div>
              <div className={s.timelineTitle}>{item.title}</div>
              <div className={s.timelineDesc}>{item.desc}</div>
              <div className={s.timelineTags}>
                {item.tags.map(t => <span key={t} className={s.ttag}>{t}</span>)}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* STACK */}
      <div className={s.stackSection}>
        <SectionHeader tag="03 // TECH STACK" num="MODULES_LOADED" />
        <div className={s.stackCategories}>
          {stack.map((cat, i) => (
            <motion.div
              key={cat.name}
              className={s.stackCat}
              data-cursor-hover
              variants={fadeUp(i)}
              initial="hidden"
              whileInView="visible"
              viewport={inViewViewport}
            >
              <CornerDecorations corners={['tl', 'tr']} />
              <span className={s.stackCatIcon}>{cat.icon}</span>
              <div className={s.stackCatName}>{cat.name}</div>
              <div className={s.stackItems}>
                {cat.items.map(item => <span key={item} className={s.stackItem}>{item}</span>)}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* PERSONALITY */}
      <SectionHeader tag="04 // APPROACH" num="TRAITS_DEFINED" />
      <div className={s.personalityGrid}>
        {personality.map((p, i) => (
          <motion.div
            key={p.title}
            className={s.personalityCard}
            data-cursor-hover
            variants={fadeUp(i)}
            initial="hidden"
            whileInView="visible"
            viewport={inViewViewport}
          >
            <CornerDecorations corners={['tl', 'tr']} />
            <span className={s.personalityIcon}>{p.icon}</span>
            <div className={s.personalityTitle}>{p.title}</div>
            <div className={s.personalityDesc}>{p.desc}</div>
          </motion.div>
        ))}
      </div>

      {/* CTA */}
      <div className={s.ctaStrip} style={{ position: 'relative' }}>
        <CornerDecorations />
        <div className={s.ctaText}>Готов обсудить <span>ваш проект</span>?</div>
        <Link to="/#contact" className={s.btnPrimary}>[ Написать мне ]</Link>
      </div>
    </main>
  );
}
