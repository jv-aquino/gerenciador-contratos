import { useState, useEffect } from "react";
import supabase from "../lib/supabase";

import Carregando from '../components/Carregando';
import NovaEmpresaForm from '../components/NovaEmpresaForm';

import './tabela.css';

export default function Empresas() {
  const [tableData, setTableData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [visibleForm, setVisibleForm] = useState(false);

  useEffect(() => {
    supabase.from('empresa').select('*').range(0, 19).then(res => {
      if (res) {
        setTableData(res.data);
        setLoading(true);
      }
    }) 
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const Nome_Legal = document.querySelector("#Nome_Legal").value;
    const Pessoa = document.querySelector("#Pessoa").value;
    const CPF = document.querySelector("#CPF").value;
    const Privada = document.querySelector("#Privada").value;
    const Situacao = document.querySelector("#Situação").value;

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
            </tr>
          </thead>
          <tbody>
            {tableData.map((row, index) => { 
              return (
              <tr key={index}>
                {Object.values(row).map((value, index) => {
                return (
                  <td key={index}>{(value === true) ? 'Sim' : (value === false) ? 'Não' : value}</td>
                )})}
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
    </>
  );
}