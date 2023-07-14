import Navbar from './components/Navbar'
import Footer from './components/Footer'

import Inicio from './pages/inicio'
import Login from './pages/login'

import Contratos from './pages/contratos'
import Inserir from './pages/inserirContrato'
import VerContrato from './pages/verContrato'

import Licitacoes from './pages/licitacoes'

import Empresas from './pages/empresas';
import Servidores from './pages/servidores';

import supabase from './lib/supabase'
import { useEffect, useState } from 'react';

function App() {
  const [page, setPage] = useState('início');
  const [logged, setLogged] = useState(false);

  const [idContrato, setIdContrato] = useState(0);

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

        {(page == 'contratos') ? <Contratos setIdContrato={setIdContrato} changePage={setPage} /> : null}
        {(page == 'inserir') ? <Inserir changePage={setPage}/> : null}
        {(page == 'verContrato') ? <VerContrato id={idContrato} /> : null}

        {(page == 'licitacoes') ? <Licitacoes /> : null}

        {(page == 'empresas') ? <Empresas changePage={setPage}/> : null}
        {(page == 'servidores') ? <Servidores changePage={setPage}/> : null}
      </main>

      <Footer />
    </>
  )
}

export default App
