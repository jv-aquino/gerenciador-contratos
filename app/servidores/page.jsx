"use client"

import { useState, useEffect } from "react";
import getData from "@/lib/useData";
import supabase from "@/lib/supabase";

import Carregando from '@/components/Carregando';

import NovoServidor from '@/components/NovoServidor';

import Paginacao from "@/components/Paginacao";

export default function Servidores() {
  const [tableData, setTableData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [visibleForm, setVisibleForm] = useState(false);

  const [paginacao, setPaginacao] = useState(15);
  
  useEffect(() => {
    getData('servidor', 20).then(value => {
      setTableData(value);
      setLoading(true);
    })
  }, [])

  const [alterar, setAlterar] = useState(false);
  const [servidor, setServidor] = useState({});

  const deletarServidor = async (id) => {  
    const { error } = await supabase
    .from('servidor')
    .delete()
    .eq('id', id);

    if (error) {
      console.log(error)
      alert(error);
    } else {
      window.location.reload(true);
    }
  }

  const handleSubmit = async (id) => {
    const Nome = document.querySelector("#Nome").value;
    const Email = document.querySelector("#Email").value;
    const CPF = document.querySelector("#CPF").value;
    const Local = document.querySelector("#Local").value;
    const Situacao = document.querySelector("#Situacao").value;

    if (!id) {
      let { data, error } = await supabase
      .from('servidor') 
      .insert([
        { Nome, CPF, Email, "Local_de_Atuação": Local, 'Situação': Situacao }
      ]);
      if (error) {
        alert(error);
      } else {
        window.location.reload(true);
      }
    }
    else {
      let { error } = await supabase
      .from('servidor') 
      .update(
        { Nome, CPF, Email, "Local_de_Atuação": Local, 'Situação': Situacao }
      )
      .eq('id', id);
      if (error) {
        alert(error);
      } else {
        window.location.reload(true);
      }
    }
  }

  return (
    <>
      <h1>Servidores</h1>

      <div>
        {(loading) ? (
        <>
          <table>
            <thead>
              <tr>
                {Object.keys(tableData[0]).map((column) => {
                  return (
                  <th key={column.replace(/_/g, ' ')}>{column.replace(/_/g, ' ')}</th>
                )})}
                <th></th>
              </tr>
            </thead>
            <tbody>
              {[...tableData].splice(paginacao - 15, 15).map((row, index) => {
                return (
                <tr key={index}>
                  {Object.values(row).map((value, index) => {
                  return (index == 3) ? (
                    <td key={index} className="font-semibold alterar">{value}</td>
                  )
                  : (
                    <td key={index} className={(value === "Ativo") ? 'ativo' : (value === "Inativo") ? 'inativo' : null}>{(value === true) ? 'Sim' : (value === false) ? 'Não' : value}</td>
                  )})}
                  <td>
                    <button className="alterar" onClick={() => {
                      let valores = {
                        "id": Object.values(row)[0],
                        "Nome": Object.values(row)[1],
                        "Local": Object.values(row)[2],
                        "CPF": Object.values(row)[3],
                        "Email": Object.values(row)[4],
                        "Situacao": Object.values(row)[5]
                      }
                      setServidor(valores);
                      setAlterar(true);
                    }}><span className="symbol text-[23px]">edit</span></button>
                  </td>
                </tr>
              )})}
            </tbody>
          </table>
          
          <Paginacao paginacao={paginacao} setPaginacao={setPaginacao} length={tableData.length} range={15} />
        </>
        ) : <Carregando />}
      </div>

      <div className="m-auto mt-5 font-medium flex justify-center">
        <button type="button" className="botaoVerde text-[26px]" onClick={() => setVisibleForm(true)}>Novo Servidor</button>
      </div>

      {(visibleForm) ? <NovoServidor handleSubmit={handleSubmit} cancel={() => setVisibleForm(false)} /> : null}

      {(alterar) ? <NovoServidor handleSubmit={(id) => handleSubmit(id)} cancel={() => setAlterar(false)} valores={servidor} deletarServidor={deletarServidor} /> : null}
    </>
  );
}