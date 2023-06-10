import { useState } from 'react';
import supabase from '../lib/supabase'

import Logo from "../assets/logo2.png";
import "./Navbar.css";

export default function Navbar() {
  const [logged, setLogged] = useState(false);

  return (
    <nav className="px-9 py-4 bg-dark-blue-700 flex items-center justify-between">
      <img src={Logo} width={220} height={80} alt="" />
      
      <ul className='text-white font-semibold text-2xl flex gap-1.5'>
        <li>Início</li>
        {(!logged) ? <li>Login</li> : null}
      </ul>
    </nav>
  )
}