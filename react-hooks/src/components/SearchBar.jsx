import { useDeferredValue, useState, useTransition, useEffect } from "react";

const bigArray = [...Array(30000).keys()];

const SearchBar = () => {
    const [inputValue, setInputValue] = useState("");
    const [list, setList] = useState(bigArray);
    const [isPending, startTransition] = useTransition();
    const deferredInput = useDeferredValue(inputValue);

    const handleInput = (e) => {
        setInputValue(e.target.value);
    };


    useEffect(() => {

        //search the bigArray only when deferredInput changes
        //want the UI to be updated first, BEFORE massive filtering is done

        startTransition(() => {
            console.log('deferred input ', deferredInput);
            const filtered = bigArray.filter((item) => 
                item.toString().includes(deferredInput));
            setList(filtered)
        })
    }, [deferredInput]);

    const content = (
        //change it to a little bit transparent when it isPending
        <section style = {isPending ? {opacity: 0.3} : null}>
            <p>Searching for : {deferredInput || "All"}</p>
            {isPending ? <p>Loading...</p>: null}
            <ul>
                {list.map((item) => (
                    <li key={item}>{item}</li>
                ))}
            </ul>
        </section>
    );
    return (
        <div className = "App">
            <input type="text" value={inputValue} onChange={handleInput}/>
            {content} 
        </div>
    );
};

export default SearchBar;