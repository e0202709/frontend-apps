import './App.css'; 
import { useState, useEffect, useMemo, useCallback } from "react"; 
import Fibonacci from './components/Fibonacci';
import UseReducerExample from './components/UseReducerExample';
import NoTransition from './components/UseDeferredValueExample';
import SearchBar from './components/SearchBar';
import FormInput from './components/FormInput';
import Video from './components/Video';
import PreviousPrice from './components/PreviousPrice';


function App() { 
    const [userNumber, setUserNumber] = useState(""); 
    const [randomInput, setRandomInput] = useState(""); 

 
 
    return ( 
        <main className='App'> 
        <PreviousPrice />
            {/* <Fibonacci userNumber={userNumber} setUserNumber={setUserNumber}/>
 
            <label>Random Input:</label> 
            <input 
                type="text" 
                value={randomInput} 
                placeholder="Random Input" 
                onChange={(e) => setRandomInput(e.target.value)} 
            /> 
            <p>{randomInput}</p> 
            <UseReducerExample/> */}
        </main> 
    ); 
} 
 
export default App;