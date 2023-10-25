import { useEffect } from 'react';
import useLocalStorage from './use-local-storage';

const useTheme = () => {
  const [theme, setTheme] = useLocalStorage('theme', 'light');

  useEffect(() => {
    const className = 'dark';
    const bodyClass = window.document.body.classList;

    theme === 'dark' ? bodyClass.add(className) : bodyClass.remove(className);
  }, [theme]);

  return [theme, setTheme];
};

export default useTheme;
