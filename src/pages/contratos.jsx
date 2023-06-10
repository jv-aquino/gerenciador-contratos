import { useState, useEffect } from "react";
import supabase from "../lib/supabase";

export default function Contratos() {
  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    async function getTableData() {
      const { data, error } = await supabase.from('your_table_name').select('*');
      if (error) {
        console.error('Error fetching table data:', error);
      } else {
        setTableData(data);
      }
    }

    getTableData();
  }, []);

  return (
    <div>
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
    </div>
  );
}