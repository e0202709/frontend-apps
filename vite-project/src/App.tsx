import Heading from "./components/Heading";
import Section from "./components/Section";
import { Counter } from "./components/Counter";
import CounterWithCallbacks from "./components/CounterWithCallbacks";
import { useState } from "react";
import List from "./components/List";
import MoreHooks from "./components/BasicHooks";
import CountUseReducer from "./components/CounterUseReducer";
import CounterWithContext from "./components/CounterWithContext"

import { CounterProvider, initState } from "./components/CounterContext";

function App() {
  const [count, setCount] = useState(100);

  const increment = (): void => {
    setCount((prev: number): number => prev + 1);
  };

  const decrement = (): void => {
    setCount((prev: number): number => prev - 1);
  };
  return (
    <>
    
      <Heading title={"Happy New Year!"} />
      <Section>Lorem ipsum...</Section>
      <Counter />
      <CounterWithCallbacks increment={increment} decrement={decrement}>
        {" "}
        Alternate count value is {count} <MoreHooks />
      </CounterWithCallbacks>

      <List
        items={["Bird", "Cat", "Dog"]}
        render={(item: string) => <span className="gold">{item}</span>}
      ></List>

      <CountUseReducer>
        {(num: number) => <>Current count with useReducer: {num}</>}
      </CountUseReducer>
      <CounterProvider count={initState.count} message={initState.message}>
        <CounterWithContext>
          {(num:Number) => <>Current Count with useContext : {num}</>}
        </CounterWithContext>
     </CounterProvider>
    </>
  );
}

export default App;
