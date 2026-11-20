import axios from "axios";
import { Suspense, useEffect, useRef, useState } from "react";
import { useNavigate, useSearchParams } from "react-router"

export const SendMoney = () => {
   
    const [SearchParams,setSearchParams]=useSearchParams();
    const [Amount, setAmount] = useState<number>()
    const [sucess, setsucess] = useState<string>("")
    const nav=useNavigate();
    
    const id=SearchParams.get("id")
    const name=SearchParams.get("name")


    const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

     useEffect(() => {
       return () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
  };
}, [])
    

    const handleTrancation=async()=>{
              
      const res= await axios.post("http://localhost:3000/api/v1/account/transfer",{        
        to:id,
        amount:Amount,
      },{
        headers:{
          authorization:localStorage.getItem("authorization")
        } 
      })
      if(res.status!=200){
        console.log("error with api")
        return
      }
      setsucess("Amount is succesfully transfered");
      timerRef.current = setTimeout(() => {
      nav("/");
    }, 1000);
      
      


    }

    return <div className="flex justify-center h-screen bg-gray-100">
        <div className="h-full flex flex-col justify-center">
            <div
                className="border h-min text-card-foreground max-w-md p-4 space-y-8 w-96 bg-white shadow-lg rounded-lg"
            >
                <div className="flex flex-col space-y-1.5 p-6 mb-0">
                <h2 className="text-3xl font-bold text-center">Send Money</h2>
                </div>
                <div className="p-6">
                <div className="flex items-center space-x-4 pb-4">
                    <div className="w-12 h-12 rounded-full bg-green-500 flex items-center justify-center">
                    <span className="text-2xl text-white">{name ? (name[0]):'U'}</span>
                    </div>
                    <h3 className="text-2xl font-semibold">{name}</h3>
                </div>
                <div className="space-y-4">
                    <div className="space-y-2">
                    <label
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                        Amount (in Rs)
                    </label>
                    <input
                        type="number"
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                        id="amount"
                        placeholder="Enter amount"
                        onChange={(e) => setAmount(e.target.value === "" ? undefined : Number(e.target.value))}
                    />
                    </div>
                    {sucess && (<div className="bg-green-100 text-green-500 px-5 py-2 text-sm text-center">
                        {sucess}
                        </div>
                        )}
                    <button className="justify-center rounded-md text-sm font-medium ring-offset-background transition-colors h-10 px-4 py-2 w-full bg-green-500 text-white" onClick={handleTrancation}>
                        Initiate Transfer
                    </button>
                </div>
                </div>
        </div>
      </div>
    </div>
}