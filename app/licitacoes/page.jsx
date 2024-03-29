"use client"

import { useState, useEffect } from "react";
import getData from "@/lib/useData";

import Carregando from '@/components/Carregando';

import Paginacao from "@/components/Paginacao";

export default function Licitacoes() {
  const [loading, setLoading] = useState(false);
  const [tableData, setTableData] = useState([]);

  const [paginacao, setPaginacao] = useState(15);

  useEffect(() => {
    getData('licitacao').then(value => {
      setTableData(value);
      setLoading(true);
    })
  }, [])

  return (
    <>
      <h1>Licitações</h1>

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
              {[...tableData].splice(paginacao - 15, 15).map((row, index) => { 
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
          <Paginacao paginacao={paginacao} setPaginacao={setPaginacao} length={tableData.length} range={15} />
        </>
        ) : <Carregando />}
      </div>
    </>
  );
}