import { BrowserRouter, Route, Routes } from "react-router"
import Signin from "./routes/signin"
import Signup from "./routes/signup"
import Dashboard from "./routes/dashboard"
import Send from "./routes/send"




function App() {
  
  return (
    <>
      <BrowserRouter>
      <Routes>
        <Route  path='/signup' element={<Signup/>} />
        <Route  path='/signin' element={<Signin/>} />
        <Route  path='/dashboard' element={<Dashboard/>} />
        <Route  path='/send' element={<Send/>}/>
      </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
