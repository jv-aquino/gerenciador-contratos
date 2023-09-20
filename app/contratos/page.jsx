"use client"

import { useState, useEffect } from "react";
import getData from "@/lib/useData";

import Carregando from '@/components/Carregando';
import Paginacao from '@/components/Paginacao';

import ShowEmpresa from "@/components/empresa/ShowEmpresa";

import { parseISO, format } from 'date-fns';

export default function Contratos() {
  const [tableData, setTableData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showEmpresa, setShowEmpresa] = useState(false);
  const [ID, setID] = useState(false);

  const [paginacao, setPaginacao] = useState(5);

  console.log(tableData)

  useEffect(() => {
    getData('contrato', undefined, 'id,Objeto,Processo,Numero_contrato,Vigencia_inicio,Vigencia_final,Empresa,Unidade').then(value => {
      const formattedData = value.map(item => {
        let vigenciaFinal = format(parseISO(item["Vigencia_final"]), 'dd/MM/yyyy')
        if (diasRestantes(vigenciaFinal) < -45) {
          return null
        }
        return {
          ...item,
          "Vigencia_inicio": format(parseISO(item["Vigencia_inicio"]), 'dd/MM/yyyy'),
          "Vigencia_final": vigenciaFinal,
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
        <>
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
              {[...tableData].splice(paginacao - 5, 5).map((row, i) => {
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
          <Paginacao paginacao={paginacao} setPaginacao={setPaginacao} length={tableData.length} />
        </>
        ) : <Carregando />}

        {(showEmpresa) ? <ShowEmpresa id={ID} cancel={() => setShowEmpresa(false)}/> : null}
      </div>

    </>
  );
}