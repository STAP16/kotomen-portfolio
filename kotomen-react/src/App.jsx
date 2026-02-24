import { Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import CustomCursor from './components/CustomCursor/CustomCursor';
import Home from './pages/Home/Home';
import About from './pages/About/About';
import Projects from './pages/Projects/Projects';


function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const targetId = decodeURIComponent(hash.replace('#', ''));
      const target = document.getElementById(targetId);

      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        return;
      }

      requestAnimationFrame(() => {
        const delayedTarget = document.getElementById(targetId);
        if (delayedTarget) {
          delayedTarget.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      });
      return;
    }

    window.scrollTo(0, 0);
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
  const copy = footerCopy[location.pathname] || footerCopy['/'];

  return (
    <>
      <CustomCursor />
      <ScrollToTop />
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/projects" element={<Projects />} />

      </Routes>
      <Footer copy={copy} />
    </>
  );
}
