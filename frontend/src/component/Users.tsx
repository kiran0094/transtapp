import { useEffect, useState } from "react"
import  Button  from "./Button"
import axios from "axios";
import { Link } from "react-router";
import { useDebounce } from "../hooks/useDebounce";

interface user{
    firstName: string,
    lastName: string,
    _id: number;
}

export const Users = () => { 
     const [users, setUsers] = useState<user[]>([]);
     const [Search, setSearch] = useState<string>("");
     const debouncedSearch = useDebounce(Search, 500);

    useEffect(() => {
    const fetchData = async () => {
        
      const res = await axios.get("http://localhost:3000/api/v1/user/bulk?filter="+debouncedSearch,
        {
        headers:{
          authorization:localStorage.getItem("authorization")
        }      
      }
      )  
      if(res.status!=200){
        console.log("error in featching users");
        return;
      }
      setUsers(res.data.user);      
    }
    fetchData()

     }, [debouncedSearch])

    return <>
        <div className="font-bold mt-6 text-lg m-4">
            Users
        </div>
        <div className="my-2 m-4">
            <input onChange={(e)=>setSearch(e.target.value)} type="text" placeholder="Search users..." className="w-full px-2 py-1 border rounded border-slate-200"></input>
        </div>
        <div>
            {users.map(user => <User key={user._id} user={user} />)}
        </div>
    </>
}

function User({ user }: { user: user }) {
    return <div className="flex justify-between m-4">
        <div className="flex">
            <div className="rounded-full h-12 w-12 bg-slate-200 flex justify-center mt-1 mr-2">
                <div className="flex flex-col justify-center h-full text-xl">
                    {user.firstName[0]}
                </div>
            </div>
            <div className="flex flex-col justify-center h-ful">
                <div>
                    {user.firstName} {user.lastName}
                </div>
            </div>
        </div>

        <div className="flex flex-col justify-center h-ful">
             <Button className="px-4">
                <Link to={"/send?id="+user._id+"&name="+user.firstName}>
                send Money
                </Link>
                </Button>
        </div>
    </div>
}