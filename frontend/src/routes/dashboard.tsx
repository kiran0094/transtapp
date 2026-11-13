import { Appbar } from '../component/Appbar'
import { Balance } from '../component/balance'
import { Users } from '../component/Users'

const Dashboard = () => {
  return (
    <>
    <Appbar/>
    <Balance value={5000}/>
    <Users/>

    

    </>
  )
}

export default Dashboard