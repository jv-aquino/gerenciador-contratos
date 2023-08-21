"use client"

import { useState, useEffect } from "react";
import getData from "@/lib/useData";

import Carregando from '@/components/Carregando';
import ShowEmpresa from "@/components/empresa/ShowEmpresa";

import { parseISO, format } from 'date-fns';

export default function Contratos() {
  const [tableData, setTableData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showEmpresa, setShowEmpresa] = useState(false);
  const [ID, setID] = useState(false);

  useEffect(() => {
    getData('contrato', 20, 'id,Objeto,Processo,Numero_contrato,Vigencia_inicio,Vigencia_final,Empresa,Unidade').then(value => {
      const formattedData = value.map(item => {
        if (diasRestantes(format(parseISO(item["Vigencia_final"]), 'dd/MM/yyyy')) < -45) {
          return null
        }
        return {
          ...item,
          "Vigencia_inicio": format(parseISO(item["Vigencia_inicio"]), 'dd/MM/yyyy'),
          "Vigencia_final": format(parseISO(item["Vigencia_final"]), 'dd/MM/yyyy'),
          "Dias_Restantes": diasRestantes(item["Vigencia_final"])
        };
      });

      setTableData(formattedData);
      setLoading(true);
    })
  }, []);
  
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
                    <span className={"font-semibold " + ((value <= 40) ? "text-red-700" : ((value <= 120) ? "text-amber-600" : ""))}>
                      {(value < 0) ? "Expirado" : value}
                    </span>
                  </td>
                ) :
                (
                  <td key={index}>{value}</td>
                )})}

                <td className="font-semibold alterar"><button type="button" onClick={() => {
                  window.location.assign("/contratos/" + Object.values(row)[0])
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