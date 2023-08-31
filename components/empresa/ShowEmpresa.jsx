import Carregando from '../Carregando';

import supabase from '@/lib/supabase';
import { useState, useEffect } from 'react';

export default function ShowEmpresa ({ id, cancel }) {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(false);

  useEffect(() => {
    supabase.from('empresa').select('*').eq('id', id).then(res => {
      if (res) {
        setData(res.data[0]);
        setLoading(false);
      }
    }) 
  }, [id]);

  return (
    <div className='visibleForm'>
      <div className="flex flex-col gap-[10px]
      bg-white rounded-md p-5">
          {(!loading) ? 
          <>
            <h2 className='font-semibold text-2xl text-dark-blue-500 m-auto'>{data.Nome_Legal}</h2>
            <p>
              CNPJ/CPF: <span className='font-semibold'>{data['CNPJ_ou_CPF']}</span>
            </p>
            <p>
              Pessoa {data.Pessoa}
            </p>
            <p>
              Empresa {(data['Empresa_Privada?']) ? "Privada" : "Pública"}
            </p>
            <p>
              Cidade: {data?.Cidade}
            </p>
            <p>
              Situação: {(data['Situação'] == 'Ativa') ? 
              <span className='text-green-700 font-semibold'>{data['Situação']}</span> : 
              <span className='text-red-700 font-semibold'>{data['Situação']}</span>}          
            </p>
          </>
            : <Carregando />
          }

          <button type="button" className="bg-red-600 text-white font-medium rounded m-auto p-2 w-fit"
          onClick={cancel}>Fechar</button>
      </div>
    </div>
  )
}