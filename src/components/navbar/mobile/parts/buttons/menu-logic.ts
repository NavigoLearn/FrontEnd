import { useState, useEffect } from 'react';
import { useStore } from '@nanostores/react';
import useStateAndRef from '@src/hooks/useStateAndRef';
import userStatus from '@src/store/user/user-status';
import { setBasePopup } from '@src/components/shared/stores/store-base-popups';

export function useNavbarMenu() {
  const [menuOpen, setMenuOpen, menuOpenRef] = useStateAndRef(false);
  const [currentPath, setCurrentPath] = useState('');

  const { isLogged } = useStore(userStatus);

  useEffect(() => {
    setCurrentPath(window.location.pathname);
    if (menuOpen) {
      document.body.classList.add('h-screen');
      document.body.classList.add('overflow-y-clip');

      return () => {
        document.body.classList.remove('h-screen');
        document.body.classList.add('overflow-y-clip');
      };
    }
    return () => {};
  }, [menuOpen]);

  const handleMenuClick = () => {
    setMenuOpen(!menuOpen);
  };

  return {
    menuOpen,
    handleMenuClick,
    currentPath,
    isLogged,
    menuOpenRef,
    setMenuOpen,
  };
}

export function handleAuthClick() {
  setBasePopup('get-started');
}
