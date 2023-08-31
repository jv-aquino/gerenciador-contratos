"use client"

import AtestadoMedicao from "@/components/pdfs/atestado-medicao";
import supabase from '@/lib/supabase'
import { useState, useEffect } from "react";

function Medicao({ params }) {
  const [contrato, setContrato] = useState({});

  useEffect(() => {
    supabase.from("contrato").select("*, empresa(*)").eq("id", params.idContrato).single().then(res => {
      setContrato(res.data)
    });
  })

  return ( 
    <>
      <h1>Atestado de Medição</h1>
      <AtestadoMedicao contrato={contrato} />
    </>
   );
}

export default Medicao;