import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import SectionHeader from '../../components/SectionHeader/SectionHeader';
import CornerDecorations from '../../components/CornerDecorations/CornerDecorations';
import s from './Projects.module.css';

const projects = [
  { id: 1, featured: true, type: 'team', icon: '🏆', status: 'featured', statusLabel: 'FEATURED', cat: 'FULL-STACK · SAAS', title: 'Аналитический дашборд для SaaS-платформы', desc: 'Полный цикл: от исследования аудитории до продакшн-деплоя. Realtime-метрики, кастомные отчёты, ролевая система доступа.', metric: '↑ DAU +120% за 2 месяца после запуска', tags: ['React', 'FastAPI', 'PostgreSQL', 'Redis', 'Docker', 'Figma'], links: [{ label: '[ Live →]', href: '#' }, { label: '[ GitHub ]', href: '#' }], role: 'Frontend · Backend · DevOps' },
  { id: 3, type: 'personal', icon: '💍', status: 'done', statusLabel: 'DONE', cat: 'FRONTEND · E-COMMERCE', title: 'Интернет-магазин ювелирных украшений', desc: 'Полный редизайн и разработка. Анимации, 3D-просмотр украшений, адаптив, Stripe.', metric: '↑ Конверсия +35% после редизайна', tags: ['React', 'Stripe', 'GSAP'], links: [{ label: '[ Live →]', href: '#' }], role: 'Frontend' },
  { id: 4, type: 'team', icon: '💳', status: 'done', statusLabel: 'DONE', cat: 'BACKEND · FINTECH', title: 'Платёжный API для маркетплейса', desc: 'Асинхронный сервис обработки платежей. Webhooks, retry-логика, полный аудит транзакций.', metric: '99.9% uptime за 6 месяцев работы', tags: ['FastAPI', 'Redis', 'PostgreSQL', 'Docker'], links: [{ label: '[ Case Study ]', href: '#' }], role: 'Backend' },
  { id: 5, type: 'team', icon: '📋', status: 'wip', statusLabel: 'IN PROGRESS', cat: 'FULL-STACK · SAAS', title: 'CRM для фриланс-агентства', desc: 'Управление клиентами, проектами и финансами. Канбан, трекинг времени, автоматические счета.', metric: '→ MVP через 3 недели', tags: ['React', 'FastAPI', 'PostgreSQL'], links: [{ label: '[ Preview ]', href: '#' }], role: 'Frontend · Backend' },
  { id: 6, type: 'personal', icon: '🤖', status: 'wip', statusLabel: 'IN PROGRESS', cat: 'BACKEND · AI', title: 'AI-ассистент для онлайн-курсов', desc: 'Telegram-бот, который отвечает на вопросы студентов по материалам курса используя GPT + RAG.', metric: '→ 85% вопросов без участия куратора', tags: ['Python', 'GPT API', 'Telegram', 'RAG'], links: [{ label: '[ GitHub ]', href: '#' }], role: 'Backend · AI' },
  { id: 7, type: 'personal', icon: '🏥', status: 'done', statusLabel: 'DONE', cat: 'FRONTEND · HEALTHCARE', title: 'Лендинг для медицинской клиники', desc: 'Разработка лендинга. Форма записи с интеграцией CRM, оптимизация под SEO и конверсию.', metric: '↑ Заявок +60% vs старого сайта', tags: ['React', 'SEO'], links: [{ label: '[ Live →]', href: '#' }], role: 'Frontend' },
  { id: 8, type: 'team', icon: '🎓', status: 'done', statusLabel: 'DONE', cat: 'FULL-STACK · EDTECH', title: 'Платформа для онлайн-курсов', desc: 'Личные кабинеты, видеоплеер, тесты, прогресс студентов, интеграция оплаты.', metric: '↑ 500+ студентов в первый месяц', tags: ['React', 'FastAPI', 'S3', 'Stripe'], links: [{ label: '[ Live →]', href: '#' }], role: 'Full-Stack' },
];

const filters = [
  { key: 'all', label: '[ Все ]' },
  { key: 'team', label: '[ Командные ]' },
  { key: 'personal', label: '[ Личные ]' },
];

const cardVariant = {
  hidden: { opacity: 0, y: 16 },
  visible: (i) => ({ opacity: 1, y: 0, transition: { delay: i * 0.06, duration: 0.4 } }),
  exit: { opacity: 0, y: 8, transition: { duration: 0.3 } },
};

export default function Projects() {
  const [active, setActive] = useState('all');

  const filtered = projects.filter(p =>
    active === 'all' || p.type === active
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
