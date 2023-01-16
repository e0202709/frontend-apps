import { useTransition } from "react"

const RefreshButton = (({children, onClick}) => {
   const [isPending, startTransition] = useTransition();
   const handleClick =(e) => {
    startTransition(() => {
        onClick(e);

    })
   }
    return <>
    <button onClick={handleClick} disabled={isPending}>
        {children}
        {isPending ? <h3>Pending...</h3>:null}
    </button>
    
    </>
});

export default RefreshButton;