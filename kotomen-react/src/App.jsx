import { Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import CustomCursor from './components/CustomCursor/CustomCursor';
import Home from './pages/Home/Home';
import About from './pages/About/About';
import Projects from './pages/Projects/Projects';
import Blog from './pages/Blog/Blog';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

const footerCopy = {
  '/': '© 2025 // ALL SYSTEMS OPERATIONAL',
  '/about': '© 2025 // about.exe — LOADED',
  '/projects': '© 2025 // projects.gallery — 9 LOADED',
  '/blog': '© 2025 // blog.log — 8 POSTS',
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
        <Route path="/blog" element={<Blog />} />
      </Routes>
      <Footer copy={copy} />
    </>
  );
}
