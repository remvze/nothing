import {
  createContext,
  useState,
  useCallback,
  useRef,
  useContext,
} from 'react';
import { AnimatePresence } from 'framer-motion';

import { Snackbar } from '@/components/snackbar';

export const SnackbarContext = createContext<
  (message: string | React.ReactNode, duration?: number) => void
>(() => {});

export const useSnackbar = () => useContext(SnackbarContext);

interface SnackbarProviderProps {
  children: React.ReactNode;
}

export function SnackbarProvider({ children }: SnackbarProviderProps) {
  const [message, setMessage] = useState<string | React.ReactNode>('');
  const [isVisible, setIsVisible] = useState(false);
  const timeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  const show = useCallback(
    (message: string | React.ReactNode, duration = 5000) => {
      setMessage(message);
      setIsVisible(true);

      if (timeout.current) clearTimeout(timeout.current);

      timeout.current = setTimeout(() => {
        setMessage('');
        setIsVisible(false);
      }, duration);
    },
    [],
  );

  return (
    <SnackbarContext.Provider value={show}>
      {children}

      <AnimatePresence>
        {isVisible && <Snackbar message={message} />}
      </AnimatePresence>
    </SnackbarContext.Provider>
  );
}
