"use client"

import { useState } from "react"
import supabase from '@/lib/supabase'
import Link from "next/link"

import { toast } from "react-toastify"
import toastBase from "../toastBase"

export default function PesquisarContrato() {
  const [contratos, setContratos] = useState([]);
  const [categoria, setCategoria] = useState("Empresa");
  const [pesquisa, setPesquisa] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();

    if (categoria == 'Processo') {
      const { data, error } = await supabase
      .from('contrato')
      .select("*")
      .ilike('Processo', `%${pesquisa}%`).single();

      if (!Array.from(data).length) { 
        toast.error("Nenhum contrato encontrado", toastBase(3000))
        setContratos([])
        return 
      }
      toast.success("Contrato(s) encontrado(s)", toastBase(3000))
      setContratos(data?.id ? [data] : data);
    } 
    else if (categoria == 'Fiscal') {
      const res = await supabase
      .from('servidor')
      .select("*")
      .eq('Email', pesquisa).single();
      
      const { data, error } = await supabase.from('contrato_servidor')
      .select("*").eq("servidor_id", res?.data?.id);

      if (!Array.from(data).length) { 
        toast.error("Nenhum contrato encontrado", toastBase(3000))
        setContratos([])
        return 
      }

      toast.success("Contrato(s) encontrado(s)", toastBase(3000))
      setContratos(data);
    } 
    else {
      let res = await supabase
      .from('empresa').select("*").ilike("CNPJ_ou_CPF", `%${pesquisa}%`).single();
      
      const { data, error } = await supabase.from('contrato')
      .select("*").eq("Empresa", res?.data?.id);

      if (!Array.from(data).length) { 
        toast.error("Nenhum contrato encontrado", toastBase(3000))
        setContratos([])
        return 
      }

      toast.success("Contrato(s) encontrado(s)", toastBase(3000))
      setContratos(data);
    }

  }

  return (
    <>
      <form onSubmit={(e) => onSubmit(e)} className="bg-white mx-auto p-5 rounded-md flex flex-col gap-3">
        <div className="select mt-0 justify-center">
          <label htmlFor="coluna" className="mt-0">Tabela:</label>
          <select name="coluna" id="coluna" value={categoria} onChange={(e) => setCategoria(e.target.value)}
          className="self-center text-lg">
            <option value="Empresa">Empresa</option>
            <option value="Fiscal">Fiscal</option>
            <option value="Processo">Processo</option>
          </select>
        </div>
        <label htmlFor="pesquisa" className="mt-0">{((categoria === 'Processo') ? "Processo do contrato" : (categoria === 'Empresa') ? 'CPF/CNPJ da Empresa' : "Email do(a) " + categoria)}:</label>

        <input type={((categoria === 'Fiscal') ? "email" : 'text')} id="pesquisa" className="p-1 text-lg"
         placeholder={((categoria === 'Processo') ? "123/2023" : (categoria === 'Empresa') ? '123.456.789-00' : "fiscal@unesp.br")} 
         required
         value={pesquisa} onChange={(e) => setPesquisa(e.target.value)}/>

        <button type="submit" className="botaoVerde text-xl font-medium pt-1"><span className='symbol pr-0.5'>search</span>Pesquisar</button>
      </form>

      {(contratos.length) ? (
      <div className="mx-auto pt-6 flex flex-col items-center">
        <h2 className="text-3xl font-semibold">Contratos Encontrados</h2>
        <ul className="text-black">
          {contratos.map(contrato => (
          <li key={((contrato.id) ? contrato.id : contrato.contrato_id)}
          className="font-medium text-lg text-dark-blue-500">
            <Link href={"/contratos/" + ((contrato.id) ? contrato.id : contrato.contrato_id)}><span className="symbol">add_circle</span> ID do contrato: {((contrato.id) ? contrato.id : contrato.contrato_id)}</Link>
          </li>))}
        </ul>
      </div>) : null}
    </>
  )
}