import { useState } from "react";
import useData from "@/lib/useData";

import Carregando from '@/components/Carregando';
import ShowEmpresa from "@/components/empresa/ShowEmpresa";

export default function Contratos({ setIdContrato, changePage }) {
  const [tableData, setTableData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showEmpresa, setShowEmpresa] = useState(false);
  const [ID, setID] = useState(false);

  useData('contrato', 20, 'id,Objeto,Processo,Numero_contrato,Vigencia_inicio,Vigencia_final,Empresa,Unidade').then(value => {
    const formattedData = value.map(item => ({
      ...item,
      "Vigencia_inicio": item["Vigencia_inicio"].replace(/-/g, '/'),
      "Vigencia_final": item["Vigencia_final"].replace(/-/g, '/'),
      "Dias_Restantes": diasRestantes(item["Vigencia_final"])
    }));

    setTableData(formattedData);
    setLoading(true);
  })
  
  const diasRestantes = (dataFinal) => {
    const oneDay = 24 * 60 * 60 * 1000; // ms em um dia
    const startDate = new Date();
    const endDate = new Date(dataFinal);
    const diffDays = Math.round((endDate - startDate) / oneDay);
    return diffDays;
  };

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
              <th></th>
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
                      setID(value);
                      setShowEmpresa(true);
                    }} className="empresa">Empresa +</button>
                  </td>
                ) 
                : (index == 8 && value) ? (
                  <td key={index}>
                    <span className={"font-semibold " + ((value <= 30) ? "text-red-700" : ((value <= 90) ? "text-amber-600" : ""))}>
                      {(value < 0) ? "Expirado" : value}
                    </span>
                  </td>
                ) :
                (
                  <td key={index}>{value}</td>
                )})}

                <td className="font-semibold alterar"><button type="button" onClick={() => {
                  setIdContrato(Object.values(row)[0]);
                  changePage("verContrato")
                }}>Menu +</button></td>
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