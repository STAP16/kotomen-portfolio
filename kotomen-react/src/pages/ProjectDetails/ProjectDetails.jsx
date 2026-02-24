import { Link, useParams } from 'react-router-dom';
import CornerDecorations from '../../components/CornerDecorations/CornerDecorations';
import { getProjectBySlug } from '../../data/projects';
import s from './ProjectDetails.module.css';

const statusText = {
  done: 'Завершен',
  wip: 'В разработке',
  featured: 'CASE OVERVIEW',
};

export default function ProjectDetails() {
  const { slug } = useParams();
  const project = getProjectBySlug(slug);
  const gallery = Array.isArray(project?.gallery) ? project.gallery.slice(0, 3) : [];
  const [mainImg, secondImg, thirdImg] = gallery;
  const isUsableLink = (link) => link && !link.disabled && link.href && link.href !== '#';
  const liveLink = project?.links?.find((link) => /live|preview|case/i.test(link.label) && isUsableLink(link));
  const codeLink = project?.links?.find((link) => /github|code/i.test(link.label) && isUsableLink(link));

  if (!project) {
    return (
      <main className={s.page}>
        <div className={s.empty}>
          <CornerDecorations />
          <h1 className={s.emptyTitle}>Проект не найден</h1>
          <p className={s.emptyText}>Проверьте ссылку или выберите проект из списка.</p>
          <Link to="/projects" className={s.backBtn}>[ Вернуться к проектам ]</Link>
        </div>
      </main>
    );
  }

  return (
    <main className={s.page}>
      <div className={s.breadcrumb}>
        <Link to="/">~</Link>
        <span>/</span>
        <Link to="/projects">projects.gallery</Link>
        <span>/</span>
        {project.slug}
      </div>

      <section className={s.layout}>
        <div className={s.leftCol}>
          <div className={`${s.imageCard} ${s.imageMain}`}>
            <CornerDecorations />
            {mainImg ? (
              <img src={mainImg} alt={`${project.title} preview main`} className={s.image} />
            ) : (
              <div className={s.placeholder}>
                <span className={s.placeholderIcon}>{project.icon}</span>
                <span className={s.placeholderText}>main image</span>
              </div>
            )}
          </div>

          <div className={s.bottomRow}>
            <div className={s.imageCard}>
              {secondImg ? (
                <img src={secondImg} alt={`${project.title} preview second`} className={s.image} />
              ) : (
                <div className={s.placeholder}>
                  <span className={s.placeholderIcon}>{project.icon}</span>
                  <span className={s.placeholderText}>image 2</span>
                </div>
              )}
            </div>
            <div className={s.imageCard}>
              {thirdImg ? (
                <img src={thirdImg} alt={`${project.title} preview third`} className={s.image} />
              ) : (
                <div className={s.placeholder}>
                  <span className={s.placeholderIcon}>{project.icon}</span>
                  <span className={s.placeholderText}>image 3</span>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className={s.rightCol}>
          <div className={s.titleCard}>
            <h1 className={s.title}>{project.title}</h1>
          </div>

          <div className={s.stackCard}>
            <div className={s.stackLabel}>Stack</div>
            <div className={s.tags}>
              {project.tags.map((tag) => (
                <span key={tag} className={s.tag}>{tag}</span>
              ))}
            </div>
          </div>

          <div className={s.descCard}>
            <div className={s.statusLine}>
              <span>{statusText[project.status] || 'Проект'}</span>
              <span>{project.cat}</span>
            </div>
            <p className={s.descText}>{project.desc}</p>
            <p className={s.descText}><strong>Проблема:</strong> {project.problem}</p>
            <p className={s.descText}><strong>Решение:</strong> {project.solution}</p>
            <div className={s.metric}>{project.metric}</div>
            <div className={s.outcomes}>
              {project.outcomes.map((item) => (
                <div key={item} className={s.outcomeItem}>{item}</div>
              ))}
            </div>
            <div className={s.microActions}>
              {liveLink ? (
                <a href={liveLink.href} className={s.microBtn} target="_blank" rel="noreferrer">[ Смотреть live ]</a>
              ) : (
                <span className={`${s.microBtn} ${s.microBtnDisabled}`}>[ Смотреть live ]</span>
              )}
              {codeLink ? (
                <a href={codeLink.href} className={s.microBtn} target="_blank" rel="noreferrer">[ GitHub ]</a>
              ) : (
                <span className={`${s.microBtn} ${s.microBtnDisabled}`}>[ Посмотреть код ]</span>
              )}
            </div>
          </div>
        </div>
      </section>

      <div className={s.actions}>
        <Link to="/projects" className={s.backBtn}>[ Все проекты ]</Link>
      </div>
    </main>
  );
}
