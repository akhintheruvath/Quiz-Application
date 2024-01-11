import { useEffect, useState } from 'react';

export const Timer = ({ setStop, questionNumber }) => {
  const [timer, setTimer] = useState(60);

  useEffect(() => {
    if(timer == 0) return setStop(true);
    const interval = setInterval(() => setTimer(prev => prev - 1), 1000);
    console.log("interval: ", interval);
    return () => clearInterval(interval);
  })

  useEffect(() => {
    setTimer(60);
  }, [questionNumber])
  return timer;
}