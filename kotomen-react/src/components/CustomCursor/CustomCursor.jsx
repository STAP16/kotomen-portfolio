import { useEffect, useRef } from 'react';
import styles from './CustomCursor.module.css';

export default function CustomCursor() {
  const cursorRef = useRef(null);
  const ringRef = useRef(null);
  const mouse = useRef({ x: 0, y: 0 });
  const ringPos = useRef({ x: 0, y: 0 });
  const isHoverState = useRef(false);

  useEffect(() => {
    const supportsFinePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!supportsFinePointer || prefersReducedMotion) return undefined;

    const cursor = cursorRef.current;
    const ring = ringRef.current;
    if (!cursor || !ring) return undefined;

    let rafId = null;

    const onMouseMove = (e) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;
      cursor.style.left = e.clientX - 4 + 'px';
      cursor.style.top = e.clientY - 4 + 'px';
    };

    const animateRing = () => {
      ringPos.current.x += (mouse.current.x - ringPos.current.x - 15) * 0.12;
      ringPos.current.y += (mouse.current.y - ringPos.current.y - 15) * 0.12;
      ring.style.left = ringPos.current.x + 'px';
      ring.style.top = ringPos.current.y + 'px';
      rafId = requestAnimationFrame(animateRing);
    };

    const setHover = () => {
      if (isHoverState.current) return;
      isHoverState.current = true;
      cursor.style.transform = 'scale(2)';
      ring.style.transform = 'scale(1.5)';
      ring.style.opacity = '1';
    };

    const clearHover = () => {
      if (!isHoverState.current) return;
      isHoverState.current = false;
      cursor.style.transform = 'scale(1)';
      ring.style.transform = 'scale(1)';
      ring.style.opacity = '0.5';
    };

    const hoverSelector = 'a, button, [data-cursor-hover]';
    const onMouseOver = (event) => {
      if (event.target instanceof Element && event.target.closest(hoverSelector)) {
        setHover();
      }
    };
    const onMouseOut = (event) => {
      if (!(event.target instanceof Element)) return;
      if (!event.target.closest(hoverSelector)) return;
      if (event.relatedTarget instanceof Element && event.relatedTarget.closest(hoverSelector)) return;
      clearHover();
    };

    const onWindowBlur = () => {
      clearHover();
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseover', onMouseOver);
    document.addEventListener('mouseout', onMouseOut);
    window.addEventListener('blur', onWindowBlur);
    animateRing();

    return () => {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseover', onMouseOver);
      document.removeEventListener('mouseout', onMouseOut);
      window.removeEventListener('blur', onWindowBlur);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <>
      <div className={styles.cursor} ref={cursorRef} />
      <div className={styles.cursorRing} ref={ringRef} />
    </>
  );
}
