import { useState } from 'react';
import { Container } from '../container';

import styles from './app.module.css';
import { cn } from '@/helpers/styles';

export function App() {
  const [plan, setPlan] = useState('nothing');
  const [forAmount, setForAmount] = useState(0);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (forAmount > 0) window.location.href = `/start?for=${forAmount}`;
    else window.location.href = '/start';
  };

  const presets = [1, 2, 3, 4, 5, 10, 15, 20, 25, 30];

  return (
    <Container>
      <div className={cn(styles.overlay, styles.top)} />
      <div className={cn(styles.overlay, styles.bottom)} />

      <div className={styles.main}>
        <div className={styles.hero}>
          <img alt="Nothing Logo" height={30} src="/logo.svg" width={30} />
          <h2>Nothing</h2>
          <h1>... simply do nothing.</h1>
        </div>

        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.field}>
            <label htmlFor="plan">What is your plan?</label>
            <select
              id="plan"
              value={plan}
              onChange={e => setPlan(e.target.value)}
            >
              <option value="nothing">Do absolutely nothing.</option>
              <option value="something">Do something.</option>
            </select>

            {plan === 'something' && <p>Sorry. Here we only do nothing.</p>}
          </div>

          <div className={styles.field}>
            <label htmlFor="time">For how long?</label>
            <select
              id="time"
              value={forAmount}
              onChange={e => setForAmount(Number(e.target.value))}
            >
              <option value={0}>I don&apos;t know.</option>

              {new Array(120).fill(null).map((_, index) => (
                <option key={index + 1} value={index + 1}>
                  {(index + 1).toLocaleString()} minute{index + 1 !== 1 && 's'}
                </option>
              ))}

              <option value={9999}>9,999 minutes</option>
            </select>

            {forAmount === 9999 && <p>Almost one week of nothing!</p>}
          </div>

          <button className={styles.button} disabled={plan !== 'nothing'}>
            Start Doing Nothing
          </button>
        </form>
      </div>

      <div className={styles.divider} />

      <div className={styles.desc}>
        <h2>The Art of Doing Nothing.</h2>
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

      <div className={styles.divider} />

      <div className={styles.presets}>
        <h3>Presets</h3>
        <p>Do nothing for ...</p>
        <div className={styles.wrapper}>
          {presets.map(preset => (
            <a className={styles.preset} href={`/start/${preset}`} key={preset}>
              {preset} Minute{preset !== 1 && 's'}
            </a>
          ))}
        </div>
      </div>
    </Container>
  );
}
