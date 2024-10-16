import { useState } from 'react';
import { Container } from '../container';

import styles from './app.module.css';

export function App() {
  const [plan, setPlan] = useState('nothing');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    window.location.href = '/start';
  };

  return (
    <Container>
      <div className={styles.main}>
        <img alt="Nothing Logo" height={30} src="/logo.svg" width={30} />
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
              <option value="breathe">Breathe a little.</option>
            </select>
            {plan === 'something' && <p>Sorry. Here we only do nothing.</p>}
            {plan === 'breathe' && (
              <p>
                Sorry. Wrong website.{' '}
                <a href="https://calmness.mvze.net">Click here</a>.
              </p>
            )}
          </div>

          <div className={styles.field}>
            <label htmlFor="time">For how long?</label>
            <select id="time">
              <option>I don&apos;t know.</option>
            </select>
          </div>

          <button className={styles.button} disabled={plan !== 'nothing'}>
            Start Doing Nothing
          </button>
        </form>
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
