import Navbar from './components/Navbar'
import Footer from './components/Footer'

import Inicio from './pages/inicio'
import Contratos from './pages/contratos'
import Login from './pages/login'

import supabase from './lib/supabase'
import { useEffect, useState } from 'react'

function App() {
  const [page, setPage] = useState('início');
  const [logged, setLogged] = useState(false);

  useEffect(() => {
    supabase.auth.getUser().then(res => {
      if (res.data.user) {
        setLogged(true);
      }
    })
  }, [])
  

  return (
    <>
      <Navbar changePage={setPage} logged={logged} setLogged={setLogged} />
      
      <main>
        {(page == 'início') ? <Inicio /> : null}

        {(page == 'login') ? <Login changePage={setPage} setLogged={setLogged} /> : null}

        {(page == 'contratos') ? <Contratos /> : null}
      </main>

      <Footer />
    </>
  )
}

export default App
