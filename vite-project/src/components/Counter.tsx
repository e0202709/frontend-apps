import { useState, useCallback, MouseEvent, KeyboardEvent } from "react";

interface User {
  id: number;
  username: string;
}

export const Counter = () => {
  const [count, setCount] = useState<number>(1);
  const [users, setUsers] = useState<User[] | null>(null);

  const increment = (): void => {
    setCount((prev: number): number => prev + 1);
  };

  const decrement = (): void => {
    setCount((prev: number): number => prev - 1);
  };

  const addTwo = useCallback(
    (e: MouseEvent<HTMLButtonElement> | KeyboardEvent<HTMLButtonElement>) => {
      setCount((prev: number): number => prev + 2);
    },
    []
  );

  return (
    <>
      <h1>Count is {count}</h1>
      <button onClick={increment}>+</button>
      <button onClick={decrement}>-</button>
      <button onClick ={addTwo}>Add Two</button>
    </>
  );
};
