/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import supabase from "../lib/supabase";
import PropTypes from 'prop-types';

import Carregando from '../components/Carregando';
import NovaEmpresaForm from '../components/NovaEmpresaForm';

import './tabela.css';

export default function Empresas({ changePage }) {
  const [tableData, setTableData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [visibleForm, setVisibleForm] = useState(false);

  const [alterar, setAlterar] = useState(false);
  const [empresa, setEmpresa] = useState({});

  useEffect(() => {
    supabase.from('empresa').select('*').range(0, 19).then(res => {
      if (res) {
        setTableData(res.data);
        setLoading(true);
      }
    }) 
  }, []);

  const deletarEmpresa = async (id) => {  
    const { error } = await supabase
    .from('empresa')
    .delete()
    .eq('id', id);

    if (error) {
      console.log(error)
      alert(error);
    } else {
      changePage("início");
      setTimeout(() => {changePage("empresas")}, 1);
    }
  }

  const handleSubmit = async (id) => {
    const Nome_Legal = document.querySelector("#Nome_Legal").value;
    const Pessoa = document.querySelector("#Pessoa").value;
    const CPF = document.querySelector("#CPF").value;
    const Privada = document.querySelector("#Privada").value;
    const Situacao = document.querySelector("#Situacao").value;

    if (!id) {
      const { data, error } = await supabase
        .from('empresa') 
        .insert([
          { Nome_Legal, 'CNPJ/CPF': CPF, Pessoa, "Empresa_Privada?": Privada, 'Situação': Situacao }
        ]);

      if (error) {
        console.log(error);
      } else {
        location.reload();
      }
    } else {
      const { error } = await supabase
        .from('empresa') 
        .update(
          { Nome_Legal, 'CNPJ/CPF': CPF, Pessoa, "Empresa_Privada?": Privada, 'Situação': Situacao }
        )
        .eq('id', id);
      if (error) {
        alert(error);
      } else {
        location.reload();
      }
    }
  }

  return (
    <>
      <h1>Empresas</h1>

      <div>
        {(loading) ? (
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
            {tableData.map((row, index) => { 
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

Empresas.propTypes = {
  changePage: PropTypes.func,
}