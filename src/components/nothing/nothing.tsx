import { useState, useRef, useEffect } from 'react';

import { Container } from '../container';

import { useSnackbar, SnackbarProvider } from '@/contexts/snackbar';

import styles from './nothing.module.css';

function NothingComponent() {
  const [activeTime, setActiveTime] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const showSnackbar = useSnackbar();

  const tick = () => {
    setActiveTime(prevActiveTime => {
      const newActiveTime = prevActiveTime + 1;

      return newActiveTime;
    });
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
    <div className={styles.wrapper}>
      <Container>
        <div className={styles.nothing}>
          <p>Greetings, Stranger.</p>
          <p className={styles.bold}>
            Ease your mind.
            <br />
            Settle into silence.
            <br />
            And simply do nothing.
          </p>
          <p>
            You&apos;ve been idle for <span>{formatTime(activeTime)}</span>{' '}
            second
            {activeTime !== 1 && 's'}.
          </p>
        </div>
      </Container>
    </div>
  );
}

export function Nothing() {
  return (
    <SnackbarProvider>
      <NothingComponent />
    </SnackbarProvider>
  );
}
