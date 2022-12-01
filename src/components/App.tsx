import { useEffect, useState } from 'react';

import { getCurrentClass } from '../classes';
import useTheme from '../hooks/useTheme';
import Table from './Table';

export default function App() {
  const [theme, setTheme] = useTheme();
  const [lesson, setLesson] = useState(getCurrentClass());
  const [date, setDate] = useState(
    new Date().toLocaleString('es-ES', {
      hour12: true,
      dateStyle: 'full',
      timeStyle: 'medium',
    })
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setDate(
        new Date().toLocaleString('es-ES', {
          hour12: true,
          dateStyle: 'full',
          timeStyle: 'medium',
        })
      );
    }, 1e3);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setLesson(getCurrentClass());
    }, 30e3);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="main">
      <h1 className="title">Courses</h1>
      {lesson ? (
        <div className="now">
          <h3 className="name">Right now — {lesson.name}</h3>
          <ul>
            <li>
              <a
                className="link"
                href={lesson.url}
                target="_blank"
                rel="noreferrer"
              >
                {lesson.url}
              </a>
            </li>
            <li>
              <b>From:</b> {lesson.from}
            </li>
            <li>
              <b>Until:</b> {lesson.to}
            </li>
          </ul>
        </div>
      ) : null}

      <Table />

      <p className="hour">{date}</p>

      <div
        className="theme"
        onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
      >
        <p>{theme === 'light' ? '🌙' : '🌞'}</p>
      </div>
    </div>
  );
}
