import {
  createContext,
  useContext,
  useState,
  useEffect,
  useRef,
  useCallback,
} from "react";

const ClockContext = createContext({
  seconds: 0,
  isRunning: false,
  startTimer: () => {},
  stopTimer: () => {},
  resetTimer: () => {},
});

export const useClock = () => {
  const context = useContext(ClockContext);
  if (!context) {
    throw new Error("useClock must be used within a ClockProvider");
  }
  return context;
};

export const ClockContextProvider = ({ timerId, children }) => {
  const [seconds, setSeconds] = useState(
    () => Number(localStorage.getItem(`${timerId}`)) || 0
  );
  const [isRunning, setIsRunning] = useState(
    () => localStorage.getItem(`${timerId}-running`) == "true"
  );

  const directionRef = useRef("forward");
  const timerIdRef = useRef(null);

  useEffect(() => {
    if (isRunning) {
      timerIdRef.current = setInterval(() => {
        if (directionRef.current === "forward") {
          setSeconds((prevSeconds) => prevSeconds + 1);
        } else {
          setSeconds((prevSeconds) => {
            if (prevSeconds > 0) {
              return prevSeconds - 1;
            } else {
              setIsRunning(false);
              localStorage.removeItem(`${timerId}-running`);
              localStorage.removeItem(`${timerId}`);
              return 0;
            }
          });
        }
      }, 1000);
    }

    return () => {
      if (timerIdRef.current) {
        clearInterval(timerIdRef.current);
      }
    };
  }, [isRunning]);

  useEffect(() => {
    return () => {
      localStorage.setItem(`${timerId}`, seconds);
      localStorage.setItem(`${timerId}-running`, isRunning);
    };
  }, [seconds, isRunning]);

  const startTimer = useCallback((config = {}) => {
    const { initialTime = 0, direction = "forward" } = config;
    setSeconds(initialTime);
    directionRef.current = direction;
    setIsRunning(true);
  }, []);

  const stopTimer = useCallback(() => {
    setIsRunning(false);
  }, []);

  const resetTimer = useCallback(
    (config = {}) => {
      stopTimer();
      const { initialTime = 0 } = config;
      setSeconds(initialTime);
    },
    [stopTimer]
  );

  // The value provided to consuming components
  const value = { seconds, isRunning, startTimer, stopTimer, resetTimer };

  return (
    <ClockContext.Provider value={value}>{children}</ClockContext.Provider>
  );
};
