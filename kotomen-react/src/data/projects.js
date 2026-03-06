import kaizenMain from '../assets/projects/kaizen-mini-app/main.png';
import kaizenBanner from '../assets/projects/kaizen-mini-app/banner.png';
import kaizenSecond from '../assets/projects/kaizen-mini-app/second.png';
import kaizenThird from '../assets/projects/kaizen-mini-app/third.png';
import homeSchedulerMain from '../assets/projects/homescheduler/main.png';
import homeSchedulerBanner from '../assets/projects/homescheduler/banner.png';
import homeSchedulerSecond from '../assets/projects/homescheduler/second.png';
import homeSchedulerThird from '../assets/projects/homescheduler/third.png';
import nevaLabMain from '../assets/projects/neva-lab-site/main.png';
import nevaLabBanner from '../assets/projects/neva-lab-site/banner.png';
import nevaLabSecond from '../assets/projects/neva-lab-site/second.png';
import nevaLabThird from '../assets/projects/neva-lab-site/third.png';

export const projects = [
  {
    id: 11,
    slug: 'neva-lab-site',
    type: 'team',
    icon: '🧪',
    status: 'done',
    statusLabel: 'DONE',
    cat: 'FRONTEND · DIGITAL PLATFORM',
    title: 'Сайт студенческой лаборатории Neva',
    desc: 'Digital-платформа студенческой лаборатории цифровых технологий, где развитие в IT строится через реальные командные проекты.',
    metric: 'Проект запущен',
    tags: ['React', 'UI/UX', 'AI-generated concepts', 'Team workflows'],
    links: [
      { label: '[ Live → ]', href: 'https://nevalabcomm.web.app' },
      { label: '[ GitHub ]', href: '#', disabled: true },
    ],
    role: 'Frontend · Product',
    period: '2026',
    client: 'Neva Lab',
    duration: 'Завершён',
    team: 'Команда лаборатории',
    problem: 'Нужна единая платформа для студентов и новичков, чтобы входить в IT через практику, командные проекты и реальный продуктовый процесс.',
    solution: 'Проектируем и развиваем сайт как точку входа в лабораторию: структура направлений, командные форматы и понятная подача для участников.',
    outcomes: [
      'Сформирован визуальный и продуктовый каркас платформы',
      'Подготовлена структура под развитие командных проектов',
      'Платформа ориентирована на дальнейшее масштабирование',
    ],
    gallery: [
      nevaLabMain,
      nevaLabSecond,
      nevaLabThird,
    ],
    banner: nevaLabBanner,
  },
  {
    id: 10,
    slug: 'homescheduler',
    type: 'personal',
    icon: '🏠',
    status: 'done',
    statusLabel: 'DONE',
    cat: 'FULL-STACK · TELEGRAM MINI APP',
    title: 'HomeScheduler — семейный планировщик задач',
    desc: 'Приватное веб-приложение для управления семейными задачами и бытовыми процессами с запуском прямо внутри Telegram Mini App.',
    metric: 'Используется в реальном сценарии',
    tags: ['React', 'React Router', 'Context API', 'Auth Provider', 'FastAPI', 'REST API', 'Telegram Mini App'],
    links: [{ label: '[ GitHub ]', href: 'https://github.com/STAP16/Homescheduler' }],
    role: 'Frontend · Backend',
    period: '2026',
    client: 'Личный проект',
    duration: 'Завершён',
    team: 'Solo',
    problem: 'Нужен был единый инструмент для прозрачного распределения семейных задач, контроля сроков и статусов без лишних сервисов.',
    solution: 'Собран Telegram Mini App с ролевой моделью (администратор/участник), управлением задачами, сортировкой, контролем просроченных задач и защищённым backend API.',
    outcomes: [
      'Проект завершён и используется в повседневной работе',
      'Реализована многопользовательская модель с разграничением ролей',
      'Подготовлена база для следующих итераций: уведомления, аналитика, календарное планирование',
    ],
    gallery: [
      homeSchedulerMain,
      homeSchedulerSecond,
      homeSchedulerThird,
    ],
    banner: homeSchedulerBanner,
  },
  {
    id: 9,
    slug: 'kaizen-mini-app',
    type: 'personal',
    icon: '🎯',
    status: 'done',
    statusLabel: 'DONE',
    cat: 'FULL-STACK · TELEGRAM MINI APP',
    title: 'Kaizen Mini App — трекер продуктивности',
    desc: 'Приложение для продуктивности через долгосрочные цели, фокус дня и микро-действия. Помогает сохранять фокус и видеть прогресс каждый день.',
    metric: 'MVP за 7 дней',
    tags: ['React', 'CSS', 'FastAPI', 'TanStack Query', 'PostgreSQL', 'Docker', 'Nginx', 'Certbot'],
    links: [{ label: '[ Live → ]', href: 'http://t.me/kaizen_appbot/app' }],
    role: 'Frontend · Backend · Optimization',
    period: '2026',
    client: 'Личный проект',
    duration: '7 дней до MVP',
    team: 'AI agents + solo',
    problem: 'Пользователи теряют фокус в течение дня и не видят реальный прогресс по долгосрочным целям.',
    solution: 'Собран workflow из трех уровней: долгосрочная цель, фокус дня и микро-действия, чтобы переводить намерения в конкретные шаги.',
    outcomes: [
      'Запущена первая версия Telegram Mini App',
      'Рабочий MVP реализован за 7 дней',
      'Сформирована масштабируемая архитектура для развития продукта',
    ],
    gallery: [
      kaizenMain,
      kaizenSecond,
      kaizenThird,
    ],
    banner: kaizenBanner,
  },
];

export function getProjectBySlug(slug) {
  return projects.find((project) => project.slug === slug);
}
