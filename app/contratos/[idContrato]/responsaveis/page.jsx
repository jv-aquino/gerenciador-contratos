"use client"

import { useParams } from "next/navigation"
import Link from 'next/link'
import { useState, useEffect } from "react";

import supabase from "@/lib/supabase"

export default function Responsaveis() {
  const params = useParams()
  const id = params.idContrato;

  const [fiscais, setFiscais] = useState([])

  useEffect(() => {
    supabase.from("contrato_servidor").select("*, servidor(*)").eq("contrato_id", id).then(res => {
      if (res.data) {
        console.log(res.data)
        setFiscais(res.data);
      }
    })
  }, [id])

  return (
    <>
      <h1>Fiscais do Contrato #({id})</h1>

      <div className="content">
        {fiscais.map(fiscal => {
          console.log(fiscal);
          return (
            <p key={fiscal.contrato_id}>
              <span className={"font-medium " + (fiscal.servidor.Ativo ? "text-green-600" : "text-red-600")}>{fiscal.servidor.Nome}</span> ({fiscal.servidor.Email}): {fiscal.Funcao}
            </p>
          )
        })}
        <p>
          <span className="rounded-full p-2 h-fit w-fit bg-green-600"></span> - Ativo(a)
          <span className="rounded-full p-2 h-fit w-fit bg-red-600"></span> - Inativo(a)
        </p>
        <button type="button" onClick={() => window.history.back()}>Voltar</button>
      </div>
    </>
  )
}