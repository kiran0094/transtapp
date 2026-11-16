import {useState, useEffect } from 'react'
import { Appbar } from '../component/Appbar'
import { Users } from '../component/Users'
import axios from 'axios'
import { useNavigate } from 'react-router'
import {Balance}  from '../component/balance'


const Dashboard = () => {

  const [Balanc, setBalanc] = useState<number>(0);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get("http://localhost:3000/api/v1/account/balance",
       {
        headers:{
          authorization:localStorage.getItem("authorization")
        }      
      })


      if (res.status!=200) {
        navigate("/signin")
      }

      setBalanc(Math.round(res.data.balance));
    }

    fetchData()
  }, [])
  
  return (
    <>
    <Appbar/>
    <Balance value={Balanc}/>
    <Users/>
    </>
  )
}

export default Dashboard