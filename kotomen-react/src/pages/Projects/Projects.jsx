import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import SectionHeader from '../../components/SectionHeader/SectionHeader';
import CornerDecorations from '../../components/CornerDecorations/CornerDecorations';
import s from './Projects.module.css';

const projects = [
  { id: 1, featured: true, category: 'fullstack', icon: '🏆', status: 'featured', statusLabel: 'FEATURED', cat: 'FULL-STACK · SAAS', title: 'Аналитический дашборд для SaaS-платформы', desc: 'Полный цикл: от исследования аудитории до продакшн-деплоя. Realtime-метрики, кастомные отчёты, ролевая система доступа.', metric: '↑ DAU +120% за 2 месяца после запуска', tags: ['React', 'FastAPI', 'PostgreSQL', 'Redis', 'Docker', 'Figma'], links: [{ label: '[ Live →]', href: '#' }, { label: '[ GitHub ]', href: '#' }], role: 'Design · Frontend · Backend · DevOps' },
  { id: 2, category: 'devops', icon: '⚙️', status: 'done', statusLabel: 'DONE', cat: 'DEVOPS · AUTOMATION', title: 'CI/CD пайплайн для команды 8 человек', desc: 'Автоматизация деплоя, тестирования и нотификаций. Ноль downtime при обновлениях.', metric: '↓ Деплой с 2 часов до 7 минут', tags: ['GitHub Actions', 'Docker', 'Nginx'], links: [{ label: '[ Case Study ]', href: '#' }], role: 'DevOps' },
  { id: 3, category: 'frontend design', icon: '💍', status: 'done', statusLabel: 'DONE', cat: 'FRONTEND · E-COMMERCE', title: 'Интернет-магазин ювелирных украшений', desc: 'Полный редизайн и разработка. Анимации, 3D-просмотр украшений, адаптив, Stripe.', metric: '↑ Конверсия +35% после редизайна', tags: ['Next.js', 'Stripe', 'Figma', 'GSAP'], links: [{ label: '[ Live →]', href: '#' }], role: 'Design · Frontend' },
  { id: 4, category: 'backend', icon: '💳', status: 'done', statusLabel: 'DONE', cat: 'BACKEND · FINTECH', title: 'Платёжный API для маркетплейса', desc: 'Асинхронный сервис обработки платежей. Webhooks, retry-логика, полный аудит транзакций.', metric: '99.9% uptime за 6 месяцев работы', tags: ['FastAPI', 'Redis', 'PostgreSQL', 'Docker'], links: [{ label: '[ Case Study ]', href: '#' }], role: 'Backend · DevOps' },
  { id: 5, category: 'fullstack', icon: '📋', status: 'wip', statusLabel: 'IN PROGRESS', cat: 'FULL-STACK · SAAS', title: 'CRM для фриланс-агентства', desc: 'Управление клиентами, проектами и финансами. Канбан, трекинг времени, автоматические счета.', metric: '→ MVP через 3 недели', tags: ['React', 'FastAPI', 'PostgreSQL', 'Figma'], links: [{ label: '[ Preview ]', href: '#' }], role: 'Design · Frontend · Backend' },
  { id: 6, category: 'backend', icon: '🤖', status: 'wip', statusLabel: 'IN PROGRESS', cat: 'BACKEND · AI', title: 'AI-ассистент для онлайн-курсов', desc: 'Telegram-бот, который отвечает на вопросы студентов по материалам курса используя GPT + RAG.', metric: '→ 85% вопросов без участия куратора', tags: ['Python', 'GPT API', 'Telegram', 'RAG'], links: [{ label: '[ GitHub ]', href: '#' }], role: 'Backend · AI' },
  { id: 7, category: 'frontend design', icon: '🏥', status: 'done', statusLabel: 'DONE', cat: 'FRONTEND · HEALTHCARE', title: 'Лендинг для медицинской клиники', desc: 'Дизайн и разработка. Форма записи с интеграцией CRM, оптимизация под SEO и конверсию.', metric: '↑ Заявок +60% vs старого сайта', tags: ['Next.js', 'Figma', 'SEO'], links: [{ label: '[ Live →]', href: '#' }], role: 'Design · Frontend' },
  { id: 8, category: 'fullstack', icon: '🎓', status: 'done', statusLabel: 'DONE', cat: 'FULL-STACK · EDTECH', title: 'Платформа для онлайн-курсов', desc: 'Личные кабинеты, видеоплеер, тесты, прогресс студентов, интеграция оплаты.', metric: '↑ 500+ студентов в первый месяц', tags: ['React', 'FastAPI', 'S3', 'Stripe'], links: [{ label: '[ Live →]', href: '#' }], role: 'Full-Stack · Design' },
  { id: 9, category: 'design', icon: '🎨', status: 'done', statusLabel: 'DONE', cat: 'DESIGN · BRANDING', title: 'Design System для продуктовой команды', desc: 'Компонентная библиотека в Figma + документация. 80+ компонентов, тёмная и светлая темы.', metric: '↓ Время на дизайн новых фич −70%', tags: ['Figma', 'Design Tokens', 'Storybook'], links: [{ label: '[ Figma →]', href: '#' }], role: 'Design' },
];

const filters = [
  { key: 'all', label: '[ ALL ]' },
  { key: 'fullstack', label: '[ FULL-STACK ]' },
  { key: 'frontend', label: '[ FRONTEND ]' },
  { key: 'backend', label: '[ BACKEND ]' },
  { key: 'devops', label: '[ DEVOPS ]' },
  { key: 'design', label: '[ DESIGN ]' },
];

const cardVariant = {
  hidden: { opacity: 0, y: 16 },
  visible: (i) => ({ opacity: 1, y: 0, transition: { delay: i * 0.06, duration: 0.4 } }),
  exit: { opacity: 0, y: 8, transition: { duration: 0.3 } },
};

export default function Projects() {
  const [active, setActive] = useState('all');

  const filtered = projects.filter(p =>
    active === 'all' || p.category.includes(active)
  );

  const statusClass = (status) => {
    if (status === 'done') return s.done;
    if (status === 'wip') return s.wip;
    return s.featuredBadge;
  };

  return (
    <main className={s.page}>
      <div className={s.pageHeader}>
        <div className={s.breadcrumb}>
          <Link to="/">~</Link>
          <span className={s.breadcrumbSep}>/</span>
          projects.gallery
        </div>
        <h1 className={s.pageTitle}>МОИ<br /><span className={s.accent}>ПРОЕКТЫ</span></h1>
        <div className={s.headerRow}>
          <p className={s.pageSubtitle}>Реальные продукты с измеримыми результатами. От идеи до деплоя.</p>
          <div className={s.projectCount}>20+<span>ПРОЕКТОВ ЗАПУЩЕНО</span></div>
        </div>
      </div>

      {/* STATS */}
      <div className={s.statsRow}>
        {[{ num: '12', label: 'FULL-STACK' }, { num: '5', label: 'ТОЛЬКО FRONTEND' }, { num: '4', label: 'API / BACKEND' }, { num: '3', label: 'В ПРОЦЕССЕ' }].map(st => (
          <div key={st.label} className={s.statMini}>
            <div className={s.statMiniNum}>{st.num}</div>
            <div className={s.statMiniLabel}>{st.label}</div>
          </div>
        ))}
      </div>

      {/* FILTERS */}
      <div className={s.filters}>
        {filters.map(f => (
          <button
            key={f.key}
            className={`${s.filterBtn} ${active === f.key ? s.filterBtnActive : ''}`}
            onClick={() => setActive(f.key)}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* GRID */}
      <div className={s.projectsGrid}>
        <AnimatePresence mode="popLayout">
          {filtered.map((p, i) => (
            <motion.div
              key={p.id}
              className={`${s.projectCard} ${p.featured ? s.featured : ''}`}
              data-cursor-hover
              variants={cardVariant}
              initial="hidden"
              animate="visible"
              exit="exit"
              custom={i}
              layout
            >
              <CornerDecorations />
              <div className={s.projectCardVisual}>
                {p.icon}
                <span className={`${s.cardStatus} ${statusClass(p.status)}`}>{p.statusLabel}</span>
              </div>
              <div className={s.projectCardBody}>
                <div className={s.cardCategory}>{p.cat}</div>
                <div className={s.cardTitle}>{p.title}</div>
                <div className={s.cardDesc}>{p.desc}</div>
                <div className={s.cardMetric}>{p.metric}</div>
                <div className={s.cardTags}>
                  {p.tags.map(t => <span key={t} className={s.ctag}>{t}</span>)}
                </div>
                <div className={s.cardFooter}>
                  <div className={s.cardLinks}>
                    {p.links.map(l => <a key={l.label} href={l.href} className={s.cardLink}>{l.label}</a>)}
                  </div>
                  <span className={s.cardRole}>{p.role}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* CTA */}
      <div className={s.ctaStrip}>
        <CornerDecorations />
        <div className={s.ctaText}>Хотите похожий <span>результат</span>?</div>
        <Link to="/#contact" className={s.btnPrimary}>[ Обсудить проект ]</Link>
      </div>
    </main>
  );
}
