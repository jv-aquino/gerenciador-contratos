import PropTypes from 'prop-types';

import supabase from '../lib/supabase';

import Logo from "../assets/logo2.png";
import "./Navbar.css";

export default function Navbar({ changePage, logged, setLogged }) {
  return (
    <nav className="px-8 py-3 bg-dark-blue-500 flex items-center justify-between">
      <img src={Logo} width={220} height={80} alt="Logo do sistema de contratos. Clique para voltar ao início" className='cursor-pointer'  onClick={() => changePage('início')} />
      
      <ul className='text-white font-medium text-[1.55rem] flex items-center gap-2'>
        <li onClick={() => changePage('início')}>Início</li>
        {(!logged) ? <li onClick={() => changePage('login')}>Login</li> : null}
        {(logged) ? (
          <li onClick={() => changePage('contratos')}>Contratos</li>
        ) : null}

        {(logged) ? <li className="cursor-pointer" onClick={() => {
            supabase.auth.signOut();
            setLogged(false);
          }}><span className="symbol">logout</span></li> : null}
      </ul>
    </nav>
  )
}

Navbar.propTypes = {
  changePage: PropTypes.func,
  logged: PropTypes.any,
  setLogged: PropTypes.func,
};