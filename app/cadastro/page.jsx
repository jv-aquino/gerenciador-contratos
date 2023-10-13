"use client"

import supabase from "@/lib/supabase"
import { toast } from 'react-toastify';
import toastBase from '@/components/toastBase'

export default function Cadastro() {
  const handleCadastro = async (e) => {
    e.preventDefault();
    const { data: { user: u }} = await supabase.auth.getUser();

    if (!u) {
      window.location.assign('/');
      return;
    }    

    const { user, error } = await supabase.auth.signUp({
      email: document.querySelector("#email").value,
      password: document.querySelector("#senha").value,
    });

    if (error) {
      toast.error('Erro', toastBase(4000));
    } 
    else {
      toast.success('Usuário Cadastro, verifique o email!', toastBase(3000));

      setTimeout(() => window.location.assign("/"), 1500);
    }
  };

  return (
    <>
      <h1>Cadastro</h1>

      <form className="bg-white rounded-md p-4 m-auto
      flex flex-col items-center gap-2" 
      onSubmit={(e) => handleCadastro(e)}>
        <label htmlFor="email" className="self-start pl-4">Email:</label><input type="email" name="email" id="email" placeholder="exemplo@unesp.br" required/>
        
        <label htmlFor="senha" className="self-start pl-4">Senha:</label><input type="password" name="senha" id="senha" placeholder="Senha123" required/>
      
        <button className="text-xl rounded bg-dark-blue-500 font-semibold mt-2 p-2 px-[10px] w-fit
        hover:text-white" type="submit">Cadastro</button>
      </form>
    </>
  )
}