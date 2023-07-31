"use client"

import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

import Inicio from '@/paginas/inicio'
import Login from '@/paginas/login'

import Contratos from '@/paginas/contratos'
import Inserir from '@/paginas/inserirContrato'
import VerContrato from '@/paginas/verContrato'

import Licitacoes from '@/paginas/licitacoes'

import Empresas from '@/paginas/empresas';
import Servidores from '@/paginas/servidores';

import supabase from '@/lib/supabase'
import { useEffect, useState } from 'react';

export default function Home() {
  const [page, setPage] = useState('início');
  const [logged, setLogged] = useState(false);

  const [idContrato, setIdContrato] = useState(0);

  useEffect(() => {
    supabase.auth.getUser().then(res => {
      if (res.data.user) {
        setLogged(true);
      }
    })
  }, []);

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
