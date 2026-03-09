import React, { createContext, useContext, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const ToastContext = createContext();

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const addToast = useCallback((message, type = 'success') => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { id, message, type }]);

    // Auto remove after 3 seconds
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3000);
  }, []);

  return (
    <ToastContext.Provider value={{ addToast }}>
      {children}
      <div style={styles.container}>
        <AnimatePresence>
          {toasts.map((toast) => (
            <motion.div
              key={toast.id}
              initial={{ opacity: 0, y: 50, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
              style={styles.toast}
              className="glass-card"
            >
              <div style={styles.content}>
                <span style={styles.icon}>{toast.type === 'success' ? '✓' : 'ℹ'}</span>
                <span style={styles.message}>{toast.message}</span>
              </div>
              <div style={styles.progressBar} />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
};

export const useToast = () => useContext(ToastContext);

const styles = {
  container: {
    position: 'fixed',
    bottom: '40px',
    right: '40px',
    zIndex: 9999,
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
    pointerEvents: 'none',
  },
  toast: {
    padding: '1.25rem 2rem',
    minWidth: '300px',
    pointerEvents: 'auto',
    position: 'relative',
    overflow: 'hidden',
    border: '1px solid var(--color-accent)',
  },
  content: {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
  },
  icon: {
    color: 'var(--color-accent)',
    fontSize: '1.2rem',
    fontWeight: 'bold',
  },
  message: {
    fontSize: '0.95rem',
    fontWeight: 500,
    letterSpacing: '0.02em',
  },
  progressBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    height: '3px',
    background: 'var(--color-accent)',
    width: '100%',
    animation: 'toastProgress 3s linear forwards',
  }
};

// Add global styles for the progress bar animation
const styleSheet = document.createElement("style");
styleSheet.innerText = `
  @keyframes toastProgress {
    from { width: 100%; }
    to { width: 0%; }
  }
`;
document.head.appendChild(styleSheet);
