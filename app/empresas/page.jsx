"use client"

import { useState, useEffect } from "react";
import getData from "@/lib/useData";
import supabase from "@/lib/supabase";

import Carregando from '@/components/Carregando';
import NovaEmpresaForm from '@/components/empresa/NovaEmpresaForm';

import Paginacao from "@/components/Paginacao";

export default function Empresas() {
  const [loading, setLoading] = useState(false);
  const [visibleForm, setVisibleForm] = useState(false);
  const [tableData, setTableData] = useState([]);

  const [paginacao, setPaginacao] = useState(15);

  useEffect(() => {
    getData('empresa').then(value => {
      setTableData(value);
      setLoading(true);
    })
  }, [])
  

  const [alterar, setAlterar] = useState(false);
  const [empresa, setEmpresa] = useState({});

  const deletarEmpresa = async (id) => {  
    const { error } = await supabase
    .from('empresa')
    .delete()
    .eq('id', id);

    if (error) {
      console.log(error)
      alert(error);
    } else {
      window.location.reload(true);
    }
  }

  const handleSubmit = async (id, values) => {
    const { Nome_Legal, Pessoa, CNPJ_ou_CPF, Privada, Situacao, Cidade } = values;
    console.log(values)

    if (!id) {
      const { data, error } = await supabase
        .from('empresa') 
        .insert([
          { Nome_Legal, CNPJ_ou_CPF, Pessoa, "Empresa_Privada?": Privada, 'Situação': Situacao, Cidade }
        ]);

      if (error) {
        console.log(error);
      } else {
        window.location.reload(true)
      }
    } else {
      const { error } = await supabase
        .from('empresa') 
        .update(
          { Nome_Legal, 'CNPJ/CPF': CPF, Pessoa, "Empresa_Privada?": Privada, 'Situação': Situacao, Cidade }
        )
        .eq('id', id);
      if (error) {
        alert(error);
      } else {
        window.location.reload(true)
      }
    }
  }

  return (
    <>
      <h1>Empresas</h1>

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
                  return (index == 2) ? (
                    <td key={index} className="font-semibold alterar">{value}</td>
                  ) :
                  (
                    <td key={index} className={(value === "Ativa") ? 'ativo' : (value === "Inativa") ? 'inativo' : null}>{(value === true) ? 'Sim' : (value === false) ? 'Não' : value}</td>
                  )})}
                  <td>
                    <button className="alterar" onClick={() => {
                      let valores = {
                        "id": Object.values(row)[0],
                        "Nome": Object.values(row)[1],
                        "CPF": Object.values(row)[2],
                        "Pessoa": Object.values(row)[3],
                        "Privada": Object.values(row)[4],
                        "Situacao": Object.values(row)[5]
                      }
                      setEmpresa(valores);
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
        <button type="button" className="botaoVerde text-[26px]" onClick={() => setVisibleForm(true)}>Nova Empresa</button>
      </div>

      {(visibleForm) ? <NovaEmpresaForm handleSubmit={handleSubmit} cancel={() => setVisibleForm(false)} /> : null}

      {(alterar) ? <NovaEmpresaForm handleSubmit={(id) => handleSubmit(id)} cancel={() => setAlterar(false)} valores={empresa} deletarEmpresa={deletarEmpresa}/> : null}
    </>
  );
}