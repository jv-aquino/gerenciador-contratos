import { useState, useEffect } from "react";
import supabase from "../lib/supabase";

import Carregando from '../components/Carregando';

import './tabela.css';

export default function Contratos() {
  const [tableData, setTableData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    supabase.from('contratos').select('*').range(0, 19).then(res => {
      if (res) {
        setTableData(res.data);
        setLoading(true);
      }
    }) 
  }, []);

  return (
    <>
      <h1>Contratos</h1>

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
            {tableData.map((row, i) => { 
              return (
              <tr key={i}>
                {Object.values(row).map((value, index) => {
                (index == 6) ? null : null;
                return (
                  <td key={index}>{value}</td>
                )})}
              </tr>
            )})}
          </tbody>
        </table>
        ) : <Carregando />}
      </div>
    </>
  );
}