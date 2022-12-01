import useLocalStorage from './useLocalStorage';
import { useCallback, useEffect } from 'react';

type Theme = 'dark' | 'light';
type SetTheme = (theme: Theme) => void;

const themes: Theme[] = ['dark', 'light'];

export default function useTheme(defaultTheme: Theme = 'light'): [Theme, SetTheme] {
    const [theme, setLTheme] = useLocalStorage<Theme>('theme', defaultTheme);

    useEffect(() => {
        if (theme) {
            if (!themes.includes(theme))
                setLTheme(defaultTheme);

            const el = document.querySelector('html')!;
            const dataTheme = el.getAttribute('data-theme') as Theme | null;
            if ((!dataTheme || !themes.includes(dataTheme)) || dataTheme !== theme)
                el.setAttribute('data-theme', theme);
        }
    }, [defaultTheme, setLTheme, theme]);

    const setTheme = useCallback((newTheme: Theme) => {
        if (themes.includes(newTheme) && theme !== newTheme)
            setLTheme(newTheme);
    }, [setLTheme, theme]);

    return [theme, setTheme];
}