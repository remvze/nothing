import { useState, useRef, useEffect, useMemo } from 'react';

import { Container } from '../container';

import { useSnackbar, SnackbarProvider } from '@/contexts/snackbar';

import styles from './nothing.module.css';
import { cn } from '@/helpers/styles';

interface NothingProps {
  seconds?: number;
}

function NothingComponent({ seconds }: NothingProps) {
  const [activeTime, setActiveTime] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const showSnackbar = useSnackbar();
  const [forAmount, setForAmount] = useState(0);
  const isEnded = useRef(false);
  const [isEndedState, setIsEndedState] = useState(false);
  const left = useMemo(() => forAmount - activeTime, [forAmount, activeTime]);

  useEffect(() => {
    if (seconds) {
      setForAmount(seconds);
      return;
    }

    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const forAmountParam = urlParams.get('for');

    if (forAmountParam) {
      const num = Number(forAmountParam);

      if (num > 0) setForAmount(num * 60);
    }
  }, []);

  const tick = () => {
    setActiveTime(prevActiveTime => {
      const newActiveTime = prevActiveTime + 1;

      return newActiveTime;
    });
  };

  const startTimer = () => {
    if (isEnded.current) return;

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
      if (isEnded.current) return;

      if (document.hasFocus()) {
        startTimer();
      } else {
        stopTimer();
        setActiveTime(0);
      }
    };

    window.addEventListener('focus', handleFocusChange);
    window.addEventListener('blur', handleFocusChange);

    if (document.hasFocus() && !isEnded.current) {
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
      if (isEnded.current) return;

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

  useEffect(() => {
    if (forAmount > 0 && left === 0) {
      stopTimer();
      isEnded.current = true;
      setIsEndedState(true);
    }
  }, [forAmount, left]);

  const formatTime = (time: number, minLength: number = 3): string => {
    return time.toLocaleString('en-US', {
      minimumIntegerDigits: minLength,
      useGrouping: true,
    });
  };

  return (
    <div className={styles.wrapper}>
      <Container>
        {!isEndedState ? (
          <div className={cn(styles.nothing, activeTime > 5 && styles.passive)}>
            <p>Greetings, Stranger.</p>
            <p className={styles.bold}>
              Ease your mind.
              <br />
              Settle into silence.
              <br />
              And simply do nothing.
            </p>
            {forAmount <= 0 ? (
              <p>
                You&apos;ve been idle for <span>{formatTime(activeTime)}</span>{' '}
                second
                {activeTime !== 1 && 's'}.
              </p>
            ) : (
              <p>
                Please be idle for <span>{formatTime(left)}</span> second
                {left !== 1 && 's'}.
              </p>
            )}
          </div>
        ) : (
          <p className={styles.congrats}>
            <span>Great job!</span>
            You&apos;ve been idle for {forAmount.toLocaleString()} second
            {forAmount !== 1 && 's'}.<a href="/">Go Back.</a>
          </p>
        )}
      </Container>
    </div>
  );
}

export function Nothing({ seconds }: NothingProps) {
  return (
    <SnackbarProvider>
      <NothingComponent seconds={seconds} />
    </SnackbarProvider>
  );
}
