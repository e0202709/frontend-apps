import { ChangeEvent, useContext } from "react";
import { CounterContext } from "../components/CounterContext";

type useCounterMessageHookType = {
    message: string,
    handlePayload: (e: ChangeEvent<HTMLInputElement>) => void;
}
export const useCounterMessageHook = ():useCounterMessageHookType =>{
 const{
    state: {message},
    handlePayload
 } = useContext(CounterContext)

 return {message, handlePayload}
}
