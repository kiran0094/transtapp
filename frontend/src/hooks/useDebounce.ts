import { useEffect, useState } from "react";

export function useDebounce<T>(value:T,time:number){
    const [Debouncevalue, setDebouncevalue] = useState<T>()
    useEffect(() => {
      const timer=setTimeout(() => {
               setDebouncevalue(value)         
      }, time);
    
      return () => {
        clearTimeout(timer)
        
      }
    }, [value,time]) 
    
    return Debouncevalue;
  
    
}