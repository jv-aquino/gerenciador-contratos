import { useState, useEffect } from "react";
import supabase from "../lib/supabase";

import Carregando from '../components/Carregando';

import './tabela.css';

export default function Licitacoes() {
  const [tableData, setTableData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    supabase.from('licitacao').select('*').range(0, 19).then(res => {
      if (res) {
        setTableData(res.data);
        setLoading(true);
      }
    }) 
  }, []);

  return (
    <>
      <h1>Licitações</h1>

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
                  <td key={index}>{(value === true) ? 'Sim' : (value === false) ? 'Não' : value}</td>
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
    </>
  );
}