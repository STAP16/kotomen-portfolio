import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import CornerDecorations from '../../components/CornerDecorations/CornerDecorations';
import { projects } from '../../data/projects';
import s from './Projects.module.css';

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
  const navigate = useNavigate();

  const filtered = projects.filter(p =>
    active === 'all' || p.type === active
  );

  const statusClass = (status) => {
    if (status === 'done') return s.done;
    if (status === 'wip') return s.wip;
    return s.featuredBadge;
  };

  const isLinkDisabled = (link) => link.disabled || !link.href || link.href === '#';

  const getBannerCover = (project) => (
    project.banner || (Array.isArray(project.gallery) && project.gallery.length > 0 ? project.gallery[0] : null)
  );

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
              onClick={() => navigate(`/projects/${p.slug}`)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  navigate(`/projects/${p.slug}`);
                }
              }}
              role="button"
              tabIndex={0}
              variants={cardVariant}
              initial="hidden"
              animate="visible"
              exit="exit"
              custom={i}
              layout
            >
              <CornerDecorations />
              <div className={s.projectCardVisual}>
                {getBannerCover(p) ? (
                  <img
                    src={getBannerCover(p)}
                    alt={`${p.title} cover`}
                    className={s.projectCoverImage}
                    loading="lazy"
                    onError={(e) => { e.currentTarget.style.display = 'none'; }}
                  />
                ) : null}
                <span className={s.projectIconFallback}>{p.icon}</span>
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
                    {p.links
                      .filter((l) => !isLinkDisabled(l))
                      .map((l) => (
                        <a
                          key={l.label}
                          href={l.href}
                          className={s.cardLink}
                          onClick={(e) => e.stopPropagation()}
                          target="_blank"
                          rel="noreferrer"
                        >
                          {l.label}
                        </a>
                      ))}
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
