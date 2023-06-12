import './App.css'

import Navbar from './components/Navbar'
import Footer from './components/Footer'

import Inicio from './pages/inicio'
import Contratos from './pages/contratos'
import Login from './pages/login'

import { useState } from 'react'

function App() {
  const [page, setPage] = useState('início');

  return (
    <>
      <Navbar changePage={setPage} />
      
      <main className='bg-white'>
        {(page == 'início') ? <Inicio /> : null}
        {(page == 'login') ? <Login /> : null}
        {(page == 'contratos') ? <Contratos /> : null}
      </main>

      <Footer />
    </>
  )
}

export default App
