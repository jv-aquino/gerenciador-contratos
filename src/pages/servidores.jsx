import { useState, useEffect } from "react";
import supabase from "../lib/supabase";

import Carregando from '../components/Carregando';

import NovoServidor from '../components/NovoServidor';

import './tabela.css';

export default function Servidores() {
  const [tableData, setTableData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [visibleForm, setVisibleForm] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const Nome = document.querySelector("#Nome").value;
    const Email = document.querySelector("#Email").value;
    const CPF = document.querySelector("#CPF").value;
    const Local = document.querySelector("#Local").value;
    const Situacao = document.querySelector("#Situação").value;

    const { data, error } = await supabase
      .from('servidor') 
      .insert([
        { Nome, CPF, Email, "Local_de_Atuação": Local, 'Situação': Situacao }
      ]);

    if (error) {
      console.log(error);
    } else {
      location.reload();
    }
  }

  useEffect(() => {
    supabase.from('servidor').select('*').range(0, 19).then(res => {
      if (res) {
        setTableData(res.data);
        setLoading(true);
      }
    }) 
  }, []);

  return (
    <>
      <h1>Servidores</h1>

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
                return (
                  <td key={index} className={(value === "Ativo") ? 'ativo' : (value === "Inativo") ? 'inativo' : null}>{(value === true) ? 'Sim' : (value === false) ? 'Não' : value}</td>
                )})}
                <td>
                  <button className="alterar"><span className="symbol text-[23px]">edit</span></button>
                </td>
              </tr>
            )})}
          </tbody>
        </table>
        ) : <Carregando />}
      </div>

      <div className="m-auto mt-5 font-medium flex justify-center">
        <button type="button" className="botaoVerde text-[26px]" onClick={() => setVisibleForm(true)}>Novo Servidor</button>
      </div>

      {(visibleForm) ? <NovoServidor handleSubmit={handleSubmit} cancel={() => setVisibleForm(false)} /> : null}
    </>
  );
}