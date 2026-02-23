import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import CornerDecorations from '../../components/CornerDecorations/CornerDecorations';
import s from './Blog.module.css';

const fadeUp = (i = 0) => ({
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { delay: i * 0.06, duration: 0.5 } },
});

const posts = [
  { icon: '⚡', date: '5 FEB 2025', tagClass: 'tagOrange', tag: 'DEVOPS', time: '6 мин', title: 'Деплой FastAPI + React на VPS за 30 минут: мой Docker Compose шаблон', excerpt: 'Делюсь готовым шаблоном docker-compose.yml с Nginx, SSL через Certbot и GitHub Actions. Копируй, настраивай, деплой.' },
  { icon: '🎨', date: '28 JAN 2025', tagClass: 'tagPurple', tag: 'DESIGN', time: '5 мин', title: 'Figma → React без боли: как я организую хендофф между дизайном и кодом', excerpt: 'Когда ты и дизайнер, и разработчик — хендофф это твоя внутренняя договорённость. Рассказываю про Auto Layout, переменные и Tokens Studio.' },
  { icon: '📊', date: '18 JAN 2025', tagClass: 'tagGreen', tag: 'ПРОДУКТ', time: '7 мин', title: 'MVP за 3 недели: как планировать, чтобы не переделывать', excerpt: 'Мой фреймворк оценки задач для быстрых запусков. Как отделить "нужно на MVP" от "хочется", и почему это спасёт тебя от 2 месяцев лишней работы.' },
  { icon: '🔧', date: '10 JAN 2025', tagClass: 'tagCyan', tag: 'BACKEND', time: '9 мин', title: 'FastAPI в продакшне: 8 вещей, которые я делаю в каждом проекте', excerpt: 'Структура проекта, dependency injection, кастомные исключения, логирование, rate limiting, async везде — мой чеклист для нового FastAPI проекта.' },
  { icon: '💡', date: '2 JAN 2025', tagClass: '', tag: 'КАРЬЕРА', time: '4 мин', title: 'Почему я перестал быть "просто разработчиком" и что из этого вышло', excerpt: 'Личная история: как расширение скиллов за пределы кода изменило тип проектов, с которыми я работаю, и сколько я зарабатываю.' },
  { icon: '🚀', date: '20 DEC 2024', tagClass: 'tagOrange', tag: 'DEVOPS', time: '5 мин', title: 'Zero-downtime деплой без Kubernetes: простое решение для небольших проектов', excerpt: 'Kubernetes — это мощно, но для большинства проектов избыточно. Покажу как сделать rolling deploy через Docker + Nginx без оркестрации.' },
  { icon: '⚛️', date: '12 DEC 2024', tagClass: 'tagCyan', tag: 'FRONTEND', time: '6 мин', title: 'State management в 2025: когда Zustand, когда React Query, когда ничего', excerpt: 'Простой фреймворк решений: что использовать для серверного состояния, UI-состояния и глобального стора. С примерами из реальных проектов.' },
];

const topics = [
  { name: 'AI & Инструменты', count: 4 },
  { name: 'Backend / FastAPI', count: 6 },
  { name: 'Frontend / React', count: 5 },
  { name: 'DevOps', count: 4 },
  { name: 'Design / Figma', count: 3 },
  { name: 'Продукт / MVP', count: 4 },
  { name: 'Карьера', count: 2 },
];

export default function Blog() {
  return (
    <main className={s.page}>
      <div className={s.pageHeader}>
        <div className={s.breadcrumb}>
          <Link to="/">~</Link>
          <span className={s.breadcrumbSep}>/</span>
          blog.log
        </div>
        <h1 className={s.pageTitle}>БЛ<span className={s.accent}>ОГ</span></h1>
        <p className={s.pageSubtitle}>Заметки о разработке, продуктах и работе с AI. Без воды — только то, что проверено в реальных проектах.</p>
      </div>

      <div className={s.blogLayout}>
        {/* MAIN */}
        <div>
          {/* FEATURED */}
          <div className={s.featuredPost} data-cursor-hover>
            <CornerDecorations />
            <div className={s.featuredVisual}>
              🤖
              <span className={s.featuredLabel}>FEATURED POST</span>
            </div>
            <div className={s.featuredBody}>
              <div className={s.postMeta}>
                <span className={s.postDate}>12 FEB 2025</span>
                <span className={`${s.postTag} ${s.tagCyan}`}>AI</span>
                <span className={s.postTag}>ПРОЦЕСС</span>
                <span className={s.readTime}>8 мин</span>
              </div>
              <h2 className={s.postTitle}>
                <a href="#">Как я использую AI в реальном рабочем процессе: не хайп, а конкретные паттерны</a>
              </h2>
              <p className={s.postExcerpt}>
                Разбираю 7 конкретных сценариев, где AI реально ускоряет работу — и 3 случая, где он только мешает.
                Покажу на примерах из последних проектов: как я использую Claude для архитектурных решений,
                Cursor для кодинга и Midjourney для прототипов дизайна.
              </p>
              <a href="#" className={s.readMore}>Читать статью</a>
            </div>
          </div>

          {/* POSTS LIST */}
          <div className={s.postsList}>
            {posts.map((post, i) => (
              <motion.div
                key={post.title}
                className={s.postItem}
                data-cursor-hover
                variants={fadeUp(i)}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.1 }}
              >
                <div className={s.postItemIcon}>{post.icon}</div>
                <div>
                  <div className={s.postItemMeta}>
                    <span className={s.postDate}>{post.date}</span>
                    <span className={`${s.postTag} ${post.tagClass ? s[post.tagClass] : ''}`}>{post.tag}</span>
                    <span className={s.readTime}>{post.time}</span>
                  </div>
                  <h3 className={s.postItemTitle}><a href="#">{post.title}</a></h3>
                  <p className={s.postItemExcerpt}>{post.excerpt}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* SIDEBAR */}
        <aside className={s.sidebar}>
          <motion.div className={s.sidebarWidget} variants={fadeUp(0)} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <CornerDecorations corners={['tl', 'tr']} />
            <div className={s.widgetTitle}>// SEARCH</div>
            <div className={s.searchBox}>
              <span className={s.searchIcon}>{'>'}</span>
              <input type="text" className={s.searchInput} placeholder="Искать статьи..." />
            </div>
          </motion.div>

          <motion.div className={s.sidebarWidget} variants={fadeUp(1)} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <CornerDecorations corners={['tl', 'tr']} />
            <div className={s.widgetTitle}>// TOPICS</div>
            <div className={s.topicsList}>
              {topics.map(t => (
                <a key={t.name} href="#" className={s.topicItem}>
                  {t.name} <span className={s.topicCount}>{t.count}</span>
                </a>
              ))}
            </div>
          </motion.div>

          <motion.div className={s.sidebarWidget} variants={fadeUp(2)} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <CornerDecorations corners={['tl', 'tr']} />
            <div className={s.widgetTitle}>// SUBSCRIBE</div>
            <div className={s.subscribeForm}>
              <p className={s.subscribeDesc}>Новые статьи раз в 2 недели. Только полезное, без спама.</p>
              <input type="email" className={s.subscribeInput} placeholder="your@email.com" />
              <button className={s.btnSubscribe}>[ Подписаться ]</button>
            </div>
          </motion.div>

          <motion.div className={s.sidebarWidget} variants={fadeUp(3)} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <CornerDecorations corners={['tl', 'tr']} />
            <div className={s.widgetTitle}>// AUTHOR</div>
            <div className={s.aboutMini}>
              <div className={s.aboutMiniAvatar}>🐱</div>
              <div className={s.aboutMiniName}>KOTOMEN</div>
              <div className={s.aboutMiniRole}>PRODUCT ENGINEER</div>
              <p className={s.aboutMiniBio}>Full-stack разработчик, дизайнер и DevOps в одном лице. Пишу о том, что реально работает в продакшне.</p>
              <Link to="/about" className={s.aboutMiniLink}>Подробнее обо мне</Link>
            </div>
          </motion.div>
        </aside>
      </div>

      {/* CTA */}
      <div className={s.ctaStrip}>
        <CornerDecorations />
        <div className={s.ctaText}>Нравится <span>контент</span>? Давай поработаем.</div>
        <Link to="/#contact" className={s.btnPrimary}>[ Написать мне ]</Link>
      </div>
    </main>
  );
}
