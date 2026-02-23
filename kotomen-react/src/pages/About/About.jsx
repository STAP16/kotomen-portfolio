import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import SectionHeader from '../../components/SectionHeader/SectionHeader';
import CornerDecorations from '../../components/CornerDecorations/CornerDecorations';
import s from './About.module.css';

const fadeUp = (i = 0) => ({
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { delay: i * 0.08, duration: 0.5 } },
});

const fadeLeft = (i = 0) => ({
  hidden: { opacity: 0, x: -20 },
  visible: { opacity: 1, x: 0, transition: { delay: i * 0.1, duration: 0.5 } },
});

const timeline = [
  { year: '2020 // INIT', title: 'Первый код. Первая боль.', desc: <>Начал изучать программирование с нуля. <strong>HTML, CSS, Python</strong> — всё руками, без шорткатов. Понял, что разработка — это не про код, а про решение задач.</>, tags: ['HTML/CSS', 'Python', 'Git'] },
  { year: '2021 // LEVEL_UP', title: 'Frontend → Backend → Full-stack', desc: <>Освоил <strong>React и FastAPI</strong>. Первые реальные проекты для клиентов. Понял, что узкая специализация — это ограничение, а не преимущество.</>, tags: ['React', 'FastAPI', 'PostgreSQL', 'Docker'] },
  { year: '2022 // EXPANSION', title: 'Дизайн + DevOps = новый уровень', desc: <>Добавил <strong>Figma и UI/UX</strong> в арсенал. Начал разворачивать инфраструктуру самостоятельно. Первый раз закрыл проект от дизайн-макета до продакшн-деплоя в одиночку.</>, tags: ['Figma', 'Nginx', 'CI/CD', 'Linux'] },
  { year: '2023 // ACCELERATE', title: 'AI как мультипликатор силы', desc: <>Начал системно использовать AI-инструменты в рабочем процессе. Скорость выросла в <strong>3–4 раза</strong> без потери качества. Стал думать о себе как о <strong>продакт-инженере</strong>, а не просто разработчике.</>, tags: ['AI Tools', 'Product Thinking', 'System Design'] },
  { year: '2024–NOW // PRODUCTION', title: '20+ проектов. Один в поле воин.', desc: <>Беру проекты, на которые обычно нужна команда из 3–4 человек. <strong>От идеи до деплоя</strong> — дизайн, фронтенд, бэкенд, инфраструктура. Работаю с основателями стартапов и продуктовыми командами.</>, tags: ['Full-Stack', 'Startup MVP', 'SaaS', 'Consulting'] },
];

const stack = [
  { icon: '🎨', name: 'DESIGN', items: ['Figma', 'FigJam', 'Prototyping', 'Design Systems', 'User Research'] },
  { icon: '⚡', name: 'FRONTEND', items: ['React / Next.js', 'TypeScript', 'Tailwind CSS', 'GSAP / Framer', 'Vite / Webpack'] },
  { icon: '🔧', name: 'BACKEND', items: ['FastAPI / Python', 'PostgreSQL', 'Redis', 'SQLAlchemy', 'REST / WebSocket'] },
  { icon: '🚀', name: 'DEVOPS', items: ['Docker / Compose', 'GitHub Actions', 'Nginx', 'Linux / VPS', 'CI/CD Pipelines'] },
];

const personality = [
  { icon: '🧩', title: 'Системное мышление', desc: 'Вижу продукт как систему, а не набор задач. Каждое решение принимаю с пониманием, как оно влияет на архитектуру, UX и бизнес-метрики.' },
  { icon: '⚡', title: 'Скорость без потери качества', desc: 'AI-инструменты позволяют мне двигаться быстро, но я никогда не жертвую архитектурой ради скорости. MVP — это не "кое-как", а "ровно то, что нужно".' },
  { icon: '🎯', title: 'Ориентация на результат', desc: 'Мне важен не процесс, а запущенный продукт с реальными пользователями. Принимаю решения исходя из бизнес-целей, а не технических предпочтений.' },
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
        <motion.div className={s.identityCard} variants={fadeUp(0)} initial="hidden" whileInView="visible" viewport={{ once: true }}>
          <CornerDecorations />
          <div className={s.avatarWrapper}>
            <div className={s.avatarPlaceholder}>🐱</div>
          </div>
          <div className={s.identityName}>KOTOMEN</div>
          <div className={s.identityRole}>FULL-STACK PRODUCT ENGINEER</div>
          <div className={s.identityMeta}>
            <div className={s.metaRow}><span className={s.metaLabel}>ЛОКАЦИЯ</span><span className={s.metaValue}>Россия / Remote</span></div>
            <div className={s.metaRow}><span className={s.metaLabel}>ОПЫТ</span><span className={s.metaValue}>4+ года</span></div>
            <div className={s.metaRow}><span className={s.metaLabel}>СТАТУС</span><span className={`${s.metaValue} ${s.green}`}>● AVAILABLE</span></div>
            <div className={s.metaRow}><span className={s.metaLabel}>ПРОЕКТЫ</span><span className={s.metaValue}>20+ запущено</span></div>
            <div className={s.metaRow}><span className={s.metaLabel}>TELEGRAM</span><span className={s.metaValue}>@kotomen</span></div>
          </div>
        </motion.div>

        <motion.div className={s.identityBio} variants={fadeUp(1)} initial="hidden" whileInView="visible" viewport={{ once: true }}>
          <CornerDecorations />
          <div className={s.bioQuote}>
            Раньше каждая строчка кода — руками.<br />
            Теперь я <em>дирижирую оркестром инструментов</em>,<br />
            а не играю на одном инструменте.
          </div>
          <div className={s.bioText}>
            Я начинал как классический разработчик — изучал алгоритмы, писал код вручную, разбирался в каждой детали.
            Это дало мне <strong>понимание того, как всё работает изнутри</strong>.<br /><br />
            Со временем я перестал быть просто "программистом" и стал <strong>product engineer</strong> —
            человеком, который думает о продукте целиком. Дизайн, фронтенд, бэкенд, деплой —
            я умею делать это всё и понимаю, как эти части влияют друг на друга.<br /><br />
            AI-инструменты не заменили мою экспертизу — они её <strong>усилили</strong>.
            Я строю быстрее, но качество и понимание никуда не делись.
          </div>
          <div className={s.bioValues}>
            {['СИСТЕМНОЕ МЫШЛЕНИЕ', 'СКОРОСТЬ ИТЕРАЦИЙ', 'CODE QUALITY', 'PRODUCT SENSE', 'АВТОНОМНОСТЬ'].map(v => (
              <span key={v} className={s.valueTag}>{v}</span>
            ))}
          </div>
        </motion.div>
      </div>

      {/* TIMELINE */}
      <div className={s.timelineSection}>
        <SectionHeader tag="02 // EVOLUTION" num="HISTORY_LOG" />
        <div className={s.timeline}>
          {timeline.map((item, i) => (
            <motion.div
              key={item.year}
              className={s.timelineItem}
              variants={fadeLeft(i)}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
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
              viewport={{ once: true, amount: 0.1 }}
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
            viewport={{ once: true, amount: 0.1 }}
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
