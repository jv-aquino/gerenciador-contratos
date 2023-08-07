import supabase from '@/lib/supabase';
import Image from 'next/image';
import { toast } from 'react-toastify';
import toastBase from './toastBase';

export default function Navbar({ changePage, logged, setLogged }) {
  return (
    <nav className="px-8 py-3 bg-dark-blue-500 flex items-center justify-between">
      <Image src="/logo2.png" width={220} height={80} alt="Logo do sistema de contratos. Clique para voltar ao início" className='cursor-pointer'  onClick={() => changePage('início')} />

      <ul className='text-white font-medium text-[1.52rem] flex items-center gap-2'>
        <li onClick={() => changePage('início')}>Início</li>
        {(!logged) ? <li onClick={() => changePage('login')}>Login</li> : null}
        {(logged) ? (
        <>
          <div className="dropdown">
            <li>Contratos<span className="symbol">expand_more</span></li>
            <ul>
              <li onClick={() => changePage('contratos')}>Visualizar</li>
              <li onClick={() => changePage('inserir')}>Novo</li>
            </ul>
          </div>
          
          <li onClick={() => changePage('licitacoes')}>Licitações</li>

          <div className="dropdown">
            <li>Outros<span className="symbol">expand_more</span></li>
            <ul>
              <li onClick={() => changePage('empresas')}>Empresas</li>
              <li onClick={() => changePage('servidores')}>Servidores</li>
            </ul>
          </div>

          <li className="cursor-pointer" onClick={() => {
            supabase.auth.signOut();
            setLogged(false);
            toast.success("Logout efetuado.", toastBase(3000))
            changePage('início');
          }}><span className="symbol">logout</span></li> 
        </>
        ) : null}
      </ul>
    </nav>
  )
}