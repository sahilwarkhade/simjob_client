import { useEffect } from "react";
import { useClock } from "../../context/ClockContext";
import { Clock } from "lucide-react";

const TEST_DURATION_SECONDS = 60 * 60 + 60 * 60;
export const CounterClock = ({
  direction,
  color = "text-green-400",
  type,
  id,
}) => {
  const { seconds, isRunning, startTimer, stopTimer } = useClock();

  useEffect(() => {
    if (direction) {
      startTimer({
        initialTime:
          Number(localStorage.getItem(`${type}-${id}`)) ||
          TEST_DURATION_SECONDS,
        direction: direction,
      });
    } else {
      startTimer();
    }
  }, [startTimer]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };
  return (
    <>
      <div className="flex items-center !space-x-2 bg-gray-700 !px-3 !py-1 rounded">
        <Clock className={"w-4 h-4 " + color} />
        <span
          className={`font-mono text-sm ${
            seconds < 300 ? "text-red-400" : color
          }`}
        >
          {formatTime(seconds)}
        </span>
      </div>
    </>
  );
};
