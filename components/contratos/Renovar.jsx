"use client"

import { useState, useEffect } from 'react';
import supabase from '@/lib/supabase'

import { toast } from 'react-toastify';
import toastBase from '@/components/toastBase'

import format from 'date-fns/format';

export default function RenovarContrato({ id, dados, cancel }) {
  const [Valor, setValor] =               useState(dados?.Valor ?? 0);
  const [Valor_Empenhado, setEmpenhado] = useState(dados?.Valor_Empenhado ?? 0);
  const [Pago, setPago] =            useState(dados?.Pago ?? 0);
  const [Vigencia_final, setFinal] = useState(format(new Date(dados?.Vigencia_final ?? '01/01/0001'), 'yyyy-MM-dd'));

  const handleSubmit = async () => {
    const { data, error } = await supabase.from("contrato").update({ Valor, Valor_Empenhado, Pago, Vigencia_final }).eq('id', id);

    if (!error) {
      toast.success("Contrato renovado", toastBase(3000));
    } else {
      toast.error("Algo deu errado", toastBase(3000))
    }
  }
  
  return (
    <div className='visibleForm'>
      <form className="flex flex-col gap-[10px]
      bg-white rounded-md py-4 px-5" onSubmit={(e) => {
        e.preventDefault();
        if (clicked) {
          return;
        } setClicked(true);
        handleSubmit(id, { Vigencia_final, Valor, Valor_Empenhado, Pago });
      }}>
          <label htmlFor='Valor'>Valor do Contrato:</label>
          <input type="text" id="Valor" required  value={Valor} onChange={(e) => {
            setValor(e.target.value);
          }}/>
          <label htmlFor='Pago'>Valor Pago:</label>
          <input type="text" id="Pago" required  value={Pago} onChange={(e) => {
            setPago(e.target.value);
          }}/>
          <label htmlFor='Valor_Empenhado'>Valor Empenhado:</label>
          <input type="text" id="Valor_Empenhado" required value={Valor_Empenhado} onChange={(e) => {
            setEmpenhado(e.target.value);
          }}/>

          <label htmlFor="Vigencia_final">Vigência Final:</label>
          <input type="date" id="Vigencia_final" required value={Vigencia_final} onChange={(e) => {
            setFinal(e.target.value);
          }} />

          <button type="submit" className="bg-green-500 text-white">
            Salvar
          </button>
          <button type="button" className="bg-red-600 text-black"
          onClick={cancel}>Cancelar</button>
      </form>
    </div>
  )
}