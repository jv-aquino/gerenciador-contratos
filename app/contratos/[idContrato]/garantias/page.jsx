"use client"

import { useState, useEffect } from "react";
import supabase from "@/lib/supabase";

import { parseISO, format } from 'date-fns';

import Carregando from "@/components/Carregando";

import NovaGarantia from '@/components/garantia/NovaGarantia'

import toastBase from "@/components/toastBase";
import { toast } from "react-toastify"

export default function GarantiasPage({ params }) {
  const [tableData, setTableData] = useState([]);
  const [semRes, setSemRes] = useState(true);
  const [loading, setLoading] = useState(true);
  const [garantia, setGarantia] = useState({});
  
  const [visibleForm, setVisibleForm] = useState(false);

  useEffect(() => {
    supabase.from("garantia").select("*").eq("id_contrato", params.idContrato).then(res => {
      if (res.data.length) {
        const formattedData = res.data.map(item => {
          return {
            ...item,
            "Data_de_Vencimento": format(parseISO(item["Data_de_Vencimento"]), 'dd/MM/yyyy'),
          };
        });
        setTableData(formattedData);
        setSemRes(false);
        setLoading(false);
      } else {
        setLoading(false);
      }
    })
  }, []);

  const novaGarantia = async (values) => {
    const { data: d, error } = await supabase.from('garantia').insert(values).select('*');

    if (error) {
      toast.error('Erro ao inserir garantia', toastBase(3000));
    } else {
      toast.success("Garantia inserida", toastBase(3000));
      window.location.reload()
    }
  }

  return (
    <>
      <h1>Garantias do Contrato #{params.idContrato}</h1>

      {visibleForm && <NovaGarantia idContrato={params.idContrato} cancel={() => setVisibleForm(false)} handleSubmit={(values) => novaGarantia(values)}  />}

      <div className="flex justify-center w-full">
        {(!loading && !semRes) ? (
          <table>
            <thead>
              <tr>
                {Object.keys(tableData[0]).map((column, i) => {
                  if (i === 2) { return null }
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
                  if (index === 2) { return null }
                    return (
                      <td key={index}>{String(value)}</td>
                  )})}
                  <td>
                    <button className="alterar" onClick={() => {
                        let valores = {
                          "id": Object.values(row)[0],
                          "id_contrato": Object.values(row)[1],
                          "dados": Object.values(row)[2],
                          "Valor": Object.values(row)[3],
                          "Data_de_Entrada": Object.values(row)[4],
                          "Data_de_Vencimento": Object.values(row)[5],
                        }
                        setGarantia(valores);
                        setAlterar(true);
                      }}><span className="symbol text-[23px]">edit</span>
                    </button>
                  </td>
                </tr>
              )})}
            </tbody>
          </table>
          ) : (semRes && !loading) ? <h2 className="font-semibold text-3xl text-dark-blue-500">Sem Garantias cadastradas</h2> : 
          <Carregando />}
      </div>

      <div className="m-auto mt-5 font-medium flex justify-center">
        <button type="button" className="botaoVerde text-[26px]" onClick={() => setVisibleForm(true)}>Nova Garantia</button>
      </div>
    </>
  )
}