import React, { useEffect, useState } from 'react';
import { twMerge } from 'tailwind-merge';

interface CounterProps extends React.HTMLAttributes<HTMLDivElement> {
  from?: number;
}

export const Counter: React.FC<CounterProps> = ({ className, from = 0 }) => {
  const [count, setCount] = useState<number>(from);

  useEffect(() => {
    setCount(from);
  }, [from]);

  return (
    <div className={twMerge('flex items-center gap-4', className)}>
      <button onClick={() => setCount((current) => current + 1)}>
        Add one
      </button>
      <span>{count}</span>
    </div>
  );
};
