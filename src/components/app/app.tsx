import { useState, useRef, useEffect } from 'react';

import { Container } from '../container';

import { useSnackbar, SnackbarProvider } from '@/contexts/snackbar';
import { useLocalStorage } from '@/hooks/use-local-storage';
import { cn } from '@/helpers/styles';

import styles from './app.module.css';

function AppComponent() {
  const [activeTime, setActiveTime] = useState(0);
  const [totalTime, setTotalTime] = useLocalStorage('nothing-total', 0);
  const [highScore, setHighScore] = useLocalStorage('nothing-high', 0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const showSnackbar = useSnackbar();

  const tick = () => {
    setActiveTime(prevActiveTime => {
      const newActiveTime = prevActiveTime + 1;
      setHighScore(prevHighScore => Math.max(newActiveTime, prevHighScore));
      return newActiveTime;
    });
    setTotalTime(prevTotalTime => prevTotalTime + 1);
  };

  const startTimer = () => {
    if (intervalRef.current === null) {
      intervalRef.current = setInterval(tick, 1000);
    }
  };

  const stopTimer = () => {
    if (intervalRef.current !== null) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  useEffect(() => {
    const handleFocusChange = () => {
      if (document.hasFocus()) {
        startTimer();
      } else {
        stopTimer();
        setActiveTime(0);
      }
    };

    window.addEventListener('focus', handleFocusChange);
    window.addEventListener('blur', handleFocusChange);

    if (document.hasFocus()) {
      startTimer();
    }

    return () => {
      window.removeEventListener('focus', handleFocusChange);
      window.removeEventListener('blur', handleFocusChange);
      stopTimer();
    };
  }, []);

  useEffect(() => {
    const handleUserInteraction = () => {
      showSnackbar('That’s definitely something—let’s try nothing.');

      stopTimer();
      setActiveTime(0);
      startTimer();
    };

    window.addEventListener('scroll', handleUserInteraction);
    window.addEventListener('mousemove', handleUserInteraction);
    window.addEventListener('mousedown', handleUserInteraction);
    window.addEventListener('keypress', handleUserInteraction);
    window.addEventListener('touchstart', handleUserInteraction);

    return () => {
      window.removeEventListener('scroll', handleUserInteraction);
      window.removeEventListener('mousemove', handleUserInteraction);
      window.removeEventListener('mousedown', handleUserInteraction);
      window.removeEventListener('keypress', handleUserInteraction);
      window.removeEventListener('touchstart', handleUserInteraction);
    };
  }, [showSnackbar]);

  const formatTime = (time: number, minLength: number = 3): string => {
    return time.toLocaleString('en-US', {
      minimumIntegerDigits: minLength,
      useGrouping: true,
    });
  };

  return (
    <Container>
      <div className={styles.main}>
        <img alt="Nothing Logo" height={30} src="/logo.svg" width={30} />

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

      <div className={styles.desc}>
        <p>
          Nothing—a timer that tracks your intentional choice to do... nothing.
          No goals to chase, no notifications clamoring for your attention, no
          pressure to fill the silence with productivity. It simply exists,
          quietly counting each second you allow to pass. This is a space where
          inactivity is the point—a digital oasis amidst the chaos of endless
          tasks and to-dos.
        </p>
        <p>
          Yet the essence of Nothing isn&apos;t about fixating on your screen,
          though you&apos;re welcome to if you wish. It&apos;s about setting
          aside your phone or computer, taking a step back from the relentless
          grind, and reconnecting with the world around you. Nothing is more a
          concept than an app—a quiet reflection rather than a tool to be used.
          It stands as a gentle rebellion against the incessant noise of modern
          life, which demands constant action.
        </p>
        <p>
          Stay as long as you like, watch the seconds tick away, or let your
          gaze wander elsewhere. There&apos;s no reward for lingering, just the
          peculiar pleasure of simply being. Sometimes, the most profound act is
          to pause, breathe, and do nothing at all—a reminder that it&apos;s
          perfectly acceptable to embrace stillness and just... be.
        </p>
        <p className={cn(styles.mini, styles.noIndent)}>
          <span className={styles.heading}>The pointless statistics:</span>
          Your Highest: <span>{formatTime(highScore)}</span> second
          {highScore !== 1 && 's'} — Total: <span>{formatTime(totalTime)}</span>{' '}
          second{totalTime !== 1 && 's'}.
        </p>
        <p className={styles.noIndent}>
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
      </div>
    </Container>
  );
}

export function App() {
  return (
    <SnackbarProvider>
      <AppComponent />
    </SnackbarProvider>
  );
}
