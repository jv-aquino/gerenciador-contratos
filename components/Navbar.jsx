"use client"

import Image from 'next/image';
import Link from 'next/link';

import { useState, useEffect } from 'react';

import { toast } from 'react-toastify';
import toastBase from './toastBase';

import supabase from '@/lib/supabase';

export default function Navbar() {
  const [logged, setLogged] = useState(false);
  
  useEffect(() => {
    supabase.auth.getUser().then(res => {
      if (res.data.user) {
        setLogged(true);
      }
    })
  }, []);

  return (
    <nav className="px-8 py-3 bg-dark-blue-500 flex items-center justify-between">
      <Image src="/logo2.png" width={220} height={80} alt="Logo do sistema de contratos. Clique para voltar ao início" className='cursor-pointer' onClick={() => window.location.assign("/")} />

      <ul className='text-white font-medium text-[1.52rem] flex items-center gap-2'>
        <Link href="/">Início</Link>
        {(!logged) ? <Link href="/login">Login</Link> : null}
        {(logged) ? (
        <>
          <div className="dropdown">
            <li>Contratos<span className="symbol">expand_more</span></li>
            <ul>
              <Link href="/contratos">Visualizar</Link>
              <Link href="/contratos/inserir">Novo</Link>
            </ul>
          </div>
          
          <Link href="/licitacoes">Licitações</Link>

          <div className="dropdown">
            <li>Outros<span className="symbol">expand_more</span></li>
            <ul>
              <Link href="/empresas">Empresas</Link>
              <Link href="/servidores">Servidores</Link>
            </ul>
          </div>

          <Link href="/" className="cursor-pointer" onClick={() => {
            supabase.auth.signOut();
            setLogged(false);
            toast.success("Logout efetuado.", toastBase(3000))
          }}><span className="symbol">logout</span></Link> 
        </>
        ) : null}
      </ul>
    </nav>
  )
}