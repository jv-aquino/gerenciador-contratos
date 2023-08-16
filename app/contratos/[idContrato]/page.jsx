"use client"

import { useState, useEffect, useRef } from "react";
import { useParams } from 'next/navigation'

import supabase from "@/lib/supabase";
import ReactToPrint from "react-to-print";

import Carregando from '@/components/Carregando';

const { parseISO, format } = require('date-fns');

export default function VerContrato() {
  const params = useParams();
  const id = params.idContrato;

  const relatorio = useRef();

  const [loading, setLoading] = useState(true);
  const [contrato, setContrato] = useState({});

  useEffect(() => {
    supabase.from('contrato').select('*').eq('id', id).then(res => {
      if (res) {
        const item = res.data[0];
        item["Vigencia_inicio"] = format(parseISO(item["Vigencia_inicio"]), 'dd/MM/yyyy')
        item["Vigencia_final"] = format(parseISO(item["Vigencia_final"]), 'dd/MM/yyyy')
        item["Dias_Restantes"] = diasRestantes(item["Vigencia_final"]);

        setContrato(item);
        setLoading(false);
      }
    }) 
  }, [id]);
  
  const diasRestantes = (dataFinal) => {
    const oneDay = 24 * 60 * 60 * 1000; // ms em um dia
    const startDate = new Date();
    const endDate = new Date(dataFinal);
    const diffDays = Math.round((endDate - startDate) / oneDay);
    return diffDays;
  };

  return (
  <>  
    {(!loading) ? (
    <>
      <h1>Contrato #{contrato.id}</h1>

      <div className="content flex flex-col relative print-contrato" ref={relatorio}>
      <ReactToPrint
          trigger={() => { return (
          <button className="print-button p-3">
            <span className="symbol text-2xl">print</span>
          </button>
          )
        }}
          content={() => relatorio.current}
        />

        <h2 className="font-semibold text-3xl self-center">{contrato["Objeto"]}</h2>
        <h3 className="font-medium text-2xl italic pr-1.5 text-gray-400 self-center">{contrato["Tipo"]}</h3>

        <p>Processo: {contrato["Processo"]}</p>
        <p>Número do contrato: {contrato["Numero_contrato"]}</p>
        <p>Fim do contrato: {contrato["Vigencia_final"]}</p>
        <p>Unidade: {contrato["Unidade"]}</p>
        <br/>
        <p>Valor: <span className="font-medium">R$ {parseFloat(contrato["Valor"]).toFixed(2).replace('.', ',')}</span></p>
        <p>A ser pago: <span className="font-medium text-red-700">R$ {parseFloat(contrato["Valor"] - contrato["Pago"]).toFixed(2).replace('.', ',')}</span></p>
        <p>Valor Empenhado (Total): <span className="font-medium">R$ {parseFloat(contrato["Valor_Empenhado"] ? contrato["Valor_Empenhado"] : 0).toFixed(2).replace('.', ',')}</span></p>
        <br/>
        <p>Dias até o fim da vigência: <span className={"font-semibold " + ((contrato["Dias_Restantes"] <= 40) ? "text-red-700" : ((contrato["Dias_Restantes"] <= 120) ? "text-amber-600" : ""))}>
            {(contrato["Dias_Restantes"] < 0) ? "Expirado" : contrato["Dias_Restantes"]}
        </span></p>

        {/* menu de responsáveis pelo contrato */}
        <button type="button">Responsáveis</button>
        
        {/* menu de notas fiscais */}
        <button type="button">Notas Fiscais</button>
      </div>
    </>
    ) : <div className="pt-20">
      <Carregando />
    </div>}
  </>
  )
}