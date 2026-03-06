import { lazy, Suspense, useEffect } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';

const CustomCursor = lazy(() => import('./components/CustomCursor/CustomCursor'));
const Home = lazy(() => import('./pages/Home/Home'));
const About = lazy(() => import('./pages/About/About'));
const Projects = lazy(() => import('./pages/Projects/Projects'));
const ProjectDetails = lazy(() => import('./pages/ProjectDetails/ProjectDetails'));


function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    const syncInViewObservers = () => {
      window.dispatchEvent(new Event('scroll'));
      window.dispatchEvent(new Event('resize'));
    };

    if (hash) {
      const targetId = decodeURIComponent(hash.replace('#', ''));
      const target = document.getElementById(targetId);

      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        requestAnimationFrame(syncInViewObservers);
        return;
      }

      requestAnimationFrame(() => {
        const delayedTarget = document.getElementById(targetId);
        if (delayedTarget) {
          delayedTarget.scrollIntoView({ behavior: 'smooth', block: 'start' });
          requestAnimationFrame(syncInViewObservers);
        }
      });
      return;
    }

    window.scrollTo(0, 0);
    requestAnimationFrame(syncInViewObservers);
  }, [pathname, hash]);

  return null;
}

const footerCopy = {
  '/': '© 2025 // ALL SYSTEMS OPERATIONAL',
  '/about': '© 2025 // about.exe — LOADED',
  '/projects': '© 2025 // projects.gallery — 9 LOADED',
};

export default function App() {
  const location = useLocation();
  const copy = location.pathname.startsWith('/projects/')
    ? '© 2025 // project.case — OPENED'
    : (footerCopy[location.pathname] || footerCopy['/']);

  return (
    <>
      <Suspense fallback={null}>
        <CustomCursor />
      </Suspense>
      <ScrollToTop />
      <Header key={`${location.pathname}${location.hash}`} />
      <Suspense fallback={null}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/projects/:slug" element={<ProjectDetails />} />
        </Routes>
      </Suspense>
      <Footer copy={copy} />
    </>
  );
}
