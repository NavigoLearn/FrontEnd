export function handleScroll(
  navmenuRef: React.MutableRefObject<HTMLElement | null>,
  prevScrollY: React.MutableRefObject<number>
) {
  return () => {
    requestAnimationFrame(() => {
      const SCROLL_DOWN_THRESHOLD = 70;
      const SCROLL_UP_THRESHOLD = 10;
      const currentScrollY = window.scrollY;

      if (currentScrollY > prevScrollY.current + SCROLL_DOWN_THRESHOLD) {
        navmenuRef.current?.classList.add('hidden');
        navmenuRef.current?.classList.remove('sticky-navbar');
      } else if (currentScrollY < prevScrollY.current - SCROLL_UP_THRESHOLD) {
        navmenuRef.current?.classList.remove('hidden');
        navmenuRef.current?.classList.add('sticky-navbar');
      }

      prevScrollY.current = currentScrollY;
    });
  };
}
