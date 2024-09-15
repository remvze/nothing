import { useRef, useEffect } from 'react';

import { Container } from '../container';

import { useLocalStorage } from '@/hooks/use-local-storage';

import styles from './app.module.css';

export function App() {
  const [activeTime, setActiveTime] = useLocalStorage('nothing-timer', 0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const startTimer = () => {
    if (intervalRef.current === null) {
      intervalRef.current = setInterval(() => {
        setActiveTime(prevTime => prevTime + 1);
      }, 1000);
    }
  };

  const stopTimer = () => {
    if (intervalRef.current !== null) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) {
        stopTimer();
      } else {
        startTimer();
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    if (!document.hidden) {
      startTimer();
    }

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      stopTimer();
    };
  }, []);

  const formatTime = (time: number, minLength: number = 3): string => {
    return time.toLocaleString('en-US', {
      minimumIntegerDigits: minLength,
      useGrouping: true,
    });
  };

  return (
    <Container>
      <div className={styles.main}>
        <p>Greetings, Stranger.</p>
        <p className={styles.bold}>
          Ease your mind.
          <br />
          Settle into silence.
          <br />
          And simply do nothing.
        </p>
        <p>
          You&apos;ve been idle for <span>{formatTime(activeTime)}</span> second
          {activeTime !== 1 && 's'}.
        </p>
      </div>

      <div className={styles.divider} />

      <p className={styles.desc}>
        Nothing. A timer that tracks your choice to do... nothing. No goals to
        chase, no notifications to grab your attention, no pressure to fill the
        silence with productivity. It simply exists, quietly counting each
        second you let slip by. This is a space where inactivity is the point—a
        digital oasis amidst the chaos of endless tasks and to-dos. Stay as long
        as you like, watch the seconds tick away, or let your gaze wander
        elsewhere. There’s no reward for sticking around, just the peculiar
        pleasure of existing in the void. Because sometimes, the most profound
        act is to do absolutely nothing at all.
        <br />
        <br />
        Created by{' '}
        <a href="https://x.com/remvze" rel="noreferrer" target="_blank">
          Maze
        </a>
        .<br />
        Code available on{' '}
        <a
          href="https://github.com/remvze/nothing"
          rel="noreferrer"
          target="_blank"
        >
          GitHub
        </a>
        .
      </p>
    </Container>
  );
}
