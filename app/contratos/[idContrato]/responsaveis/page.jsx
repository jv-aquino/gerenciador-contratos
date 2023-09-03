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
        setFiscais(res.data);
      }
    })
  }, [id])

  return (
    <>
      <h1>Fiscais do Contrato #({id})</h1>

      <div className="content">
        {fiscais.map(fiscal => {
          return (
            <p key={fiscal.contrato_id}>
              <span className={"font-medium " + (fiscal.servidor.Ativo ? "text-green-600" : "text-red-600")}>{fiscal.servidor.Nome}</span> ({fiscal.servidor.Email}): {fiscal.Funcao}
            </p>
          ) 
        })}
        <div className="pt-2 flex items-center justify-center gap-2"><div className="rounded-full p-1.5 w-fit bg-green-600"></div>
        <p className="text-[15px]"> - Ativo(a)</p>
        </div>

        <div className="pb-2 flex items-center justify-center gap-2"><div className="rounded-full p-1.5 w-fit bg-red-600"></div>
        <p className="text-[15px]"> - Inativo(a)</p>
        </div>

        <button type="button" onClick={() => window.history.back()} className="font-semibold"><span className="symbol pr-0.5">reply</span>Voltar</button>
      </div>
    </>
  )
}