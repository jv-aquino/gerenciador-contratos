import PropTypes from 'prop-types';

import Logo from "../assets/logo2.png";
import "./Navbar.css";

export default function Navbar({ changePage, logged, setLogged }) {
  return (
    <nav className="px-8 py-3 bg-dark-blue-700 flex items-center justify-between">
      <img src={Logo} width={220} height={80} alt="" />
      
      <ul className='text-white font-semibold text-[1.55rem] flex gap-1.5'>
        <li onClick={() => changePage('início')}>Início</li>
        {(!logged) ? <li onClick={() => changePage('login')}>Login</li> : null}
        {(logged) ? (
          <li onClick={() => changePage('contratos')}>Contratos</li>
        ) : null}
      </ul>
    </nav>
  )
}

Navbar.propTypes = {
  changePage: PropTypes.func,
  logged: PropTypes.any,
  setLogged: PropTypes.func,
};