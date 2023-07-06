import { useState, useEffect } from "react";
import supabase from "../lib/supabase";

import Carregando from '../components/Carregando';
import ShowEmpresa from "../components/ShowEmpresa";

import './tabela.css';

export default function Contratos() {
  const [tableData, setTableData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showEmpresa, setShowEmpresa] = useState(false);
  const [ID, setID] = useState(false);

  useEffect(() => {
    supabase.from('contrato').select('*').range(0, 19).then(res => {
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
                return (index == 6 && value) ? (
                  <td key={index}>
                    <button onClick={() => {
                      console.log(value)
                      setID(value);
                      setShowEmpresa(true);
                    }} className="font-semibold text-black">Menu +</button>
                  </td>
                ) 
                : (
                  <td key={index}>{value}</td>
                )})}
              </tr>
            )})}
          </tbody>
        </table>
        ) : <Carregando />}

        {(showEmpresa) ? <ShowEmpresa id={ID} cancel={() => setShowEmpresa(false)}/> : null}
      </div>
    </>
  );
}