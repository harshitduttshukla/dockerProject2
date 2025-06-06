import { Dashbord } from './pages/Dashboard'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Signup from './pages/Signup'
import Signin from './pages/Signin'
function App() {
  return <BrowserRouter>
    <Routes>
      <Route path="/" element={<Signup/>} />
      <Route path="/dashboard" element={<Dashbord/>} />
      <Route path="/signup" element={<Signup/>} />
      <Route path="/signin" element={<Signin/>} />
    </Routes>
   </BrowserRouter>
  
}

export default App