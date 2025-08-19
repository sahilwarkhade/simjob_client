// src/hooks/useLeaveWarning.js
import { useEffect } from 'react';

export const useBlocker = (
  shouldWarn = true,
  message = `You shouldn't leave. Are you sure you want to leave?` // This message is for older browsers
) => {
  useEffect(() => {
    // The event handler
    const handleBeforeUnload = (event) => {
      if (shouldWarn) {
        // This is the standard way to trigger the browser's confirmation dialog.
        event.preventDefault();
        // Required for legacy browsers.
        event.returnValue = message;
        return message;
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    // Cleanup function: remove the event listener when the component unmounts
    // or when the 'shouldWarn' dependency changes.
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []); // The effect re-runs if 'shouldWarn' changes
};
