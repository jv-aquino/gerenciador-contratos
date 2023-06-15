import { useState, useEffect } from "react";
import supabase from "../lib/supabase";

export default function Contratos() {
  const [tableData, setTableData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function getTableData() {
      const { data, error } = await supabase.from('contratos').select('*');
      if (error) {
        console.error('Erro:', error);
      } else {
        setTableData(data);
        setLoading(true);
      }
    }

    getTableData();
  }, []);

  return (
    <>
      <h1>Contratos</h1>

      <div>
        {(loading) ? (
        <table>
          <thead>
            <tr>
              {Object.keys(tableData[0]).map((column) => (
                <th key={column}>{column}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {tableData.map((row, index) => (
              <tr key={index}>
                {Object.values(row).map((value, index) => (
                  <td key={index}>{value}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
        ) : <p>Carregando...</p>}
      </div>
    </>
  );
}