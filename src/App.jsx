import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home.jsx'
import Solicitud from './pages/Solicitud.jsx'
import Gracias from './pages/Gracias.jsx'


import './css/App.css'
import './css/Solicitud.css'
import './css/Gracias.css'


function App() {
  return (
    <>
        <Routes>

          <Route path="/" element={ <Home /> } />
          
          <Route path="/solicitud" element= { <Solicitud /> } />

          <Route path="/gracias" element = { <Gracias /> } />
        </Routes>
    </>
  )
}

export default App
