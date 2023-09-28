import { useState, useEffect } from 'react';

export default function NovaNota ({ idContrato, handleSubmit, cancel, valores, deletarNota }) {
  let values = null;
  if (!values) {
    values = {}; 
    values["Valor"] = values["id"] = values["Data_de_Vencimento"] = values["Data_de_Entrada"] = '';
    values['dados'] = {};
    values["id_contrato"] = idContrato;
  }

  useEffect(() => {
    values = valores;
  }, [valores]);
  
  const [id, setId] = useState(values["id"]);
  const [Data_de_Vencimento, setVencimento] = useState(values["Data_de_Vencimento"]);
  const [Data_de_Entrada, setEntrada] = useState(values["Data_de_Entrada"]);
  const [Numero, setNumero] = useState(values["Numero"]);
  const [Valor, setValor] = useState(values["Valor"]);
  const [dados, setDados] = useState(values["dados"]);
  
  
  const [clicked, setClicked] = useState(false);

  return (  
    <div className='visibleForm'>
      <form className="flex flex-col gap-[10px]
      bg-white rounded-md py-4 px-5" onSubmit={(e) => {
        e.preventDefault();
        if (clicked) {
          return;
        } 
        handleSubmit({ id_contrato: Number(idContrato), Data_de_Entrada, Data_de_Vencimento, Valor, dados });
      }}>
          <label htmlFor="Entrada">Data de Entrada:</label>
          <input type="date" id="Entrada" required value={Data_de_Entrada} onChange={(e) => {
            setEntrada(e.target.value);
          }}/>

          <label htmlFor="Vencimento">Data de Vencimento:</label>
          <input type="date" id="Vencimento" required value={Data_de_Vencimento} onChange={(e) => {
            setVencimento(e.target.value);
          }}/>
          
          <label htmlFor="Valor">Valor:</label>
          <input type="number" id="Valor" step="0.01" min="0" pattern="^\d+(,\d{1,2})?$" title="Informe um valor válido" placeholder="1000.00" required value={Valor} onChange={(e) => {
            setValor(e.target.value);
          }}/>

          <button type="submit" className="bg-green-500 text-white">
            Enviar
          </button>
          <button type="button" className="bg-red-600 text-black"
          onClick={cancel}>Cancelar</button>
      </form>
    </div>
  )
}