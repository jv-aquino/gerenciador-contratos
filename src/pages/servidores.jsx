import { useState, useEffect } from "react";
import supabase from "../lib/supabase";

import './tabela.css';

export default function Servidores() {
  const [tableData, setTableData] = useState([]);
  const [loading, setLoading] = useState(false);

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
        ) : <p>Carregando...</p>}
      </div>
    </>
  );
}