import { ChangeEvent, useContext } from "react";
import { CounterContext } from "../components/CounterContext";

type useCounterNumberHookType = {
    count: Number,
    increment: () => void;
    decrement: () => void;
}
export const useCounterNumberHook = ():useCounterNumberHookType =>{
 const{
    state: {count},
    increment,
    decrement,
 } = useContext(CounterContext)

 return {count, increment, decrement}
}
