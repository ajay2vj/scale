import React, { useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

export default function Modal({
  setShowModal,
  children,
  withPadding = true,
  showModal,
  className = 'md:w-4/12',
  onClose = () => {},
}) {
  useEffect(() => {
    const close = (e) => {
      if (e.keyCode === 27) {
        setShowModal(false);
      }
    };
    window.addEventListener('keydown', close);
    return () => window.removeEventListener('keydown', close);
  }, [setShowModal]);

  function handleKeyPress() {}

  return (
    <AnimatePresence onKey={handleKeyPress}>
      {showModal && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className={`fixed bottom-0 z-10 inset-x-0 ${
            withPadding && 'sm:p-6 p-0'
          } sm:inset-0 sm:flex sm:items-center sm:justify-center z-50`}
          data-testid = "modal-container"
        >
          <div
            onClick={() => {
              onClose();
              setShowModal(false);
            }}
            className="fixed inset-0 transition-opacity"
            data-testid = "closeIcon"
          >
            <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
          </div>

          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            transition={{ duration: 0.2 }}
            className={`bg-white bg-opacity-0 rounded-lg transform transition-all h-auto sm:w-full ${className} ${
              withPadding && 'sm:p-6 p-0'
            }`}
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-headline"
            data-testid="dialog"
          >
            <div
              className={`bg-white rounded-lg shadow-xl transform transition-all h-auto sm:w-full`}
            >
              {children}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
