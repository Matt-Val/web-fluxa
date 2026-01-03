import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home.jsx'
import Solicitud from './pages/Solicitud.jsx'
import './css/App.css'
import './css/Solicitud.css'


function App() {
  return (
    <>
        <Routes>

          <Route path="/" element={ <Home /> } />
          
          <Route path="/solicitud" element= { <Solicitud /> } />

          
        </Routes>
    </>
  )
}

export default App
