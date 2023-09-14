import BasePdf from "./Base";
import { useRef, useState, useEffect } from "react";
import { format, parseISO } from "date-fns";

import ReactToPrint from "react-to-print";
import Assinatura from "./Assinatura";

function AtestadoMedicao({ contrato }) {
  const atestado = useRef();
  const [dados, setDados] = useState({});
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setDados({ Local: 'Guara/FEG', ReferenciaInicio: '1111-11-11', ReferenciaFinal: '1111-11-11', DataConferencia: '1111-11-11', Recebimento: '1111-11-11' });
    setMounted(true);
  }, [])

  if (!mounted) {
    return null;
  }

  return ( 
    <>
      <form className="bg-white rounded-md p-3 m-auto flex flex-col items-center gap-2 w-[330px]" onSubmit={(e) => e.preventDefault()}>
        <label htmlFor="objetivo"><span className="required">*</span>Objetivo:</label>
        <input type="text" id="objetivo" name="objetivo" placeholder="Atestar X" required onChange={(e) => {
           setDados(prev => ({...prev, Objetivo: e.target.value}));
        }} />

        <label htmlFor="unidade"><span className="required">*</span>Local de Entrega:</label>
        <select id="unidade" name="unidade" required  onChange={(e) => {
           setDados(prev => ({...prev, Local: e.target.value}));
        }}>
          <option value="Guara/FEG">Guara/FEG</option>
        </select>

        <label htmlFor="referencia_inicio"><span className="required">*</span>Referência Início:</label>
        <input type="date" id="referencia_inicio" name="referencia_inicio" required onChange={(e) => {
           setDados(prev => ({...prev, ReferenciaInicio: e.target.value}));
        }} />

        <label htmlFor="referencia_final"><span className="required">*</span>Referência Final:</label>
        <input type="date" id="referencia_final" name="referencia_final" required onChange={(e) => {
           setDados(prev => ({...prev, ReferenciaFinal: e.target.value}));
        }} />

        <label htmlFor="valor"><span className="required">*</span>Valor de cobrança:</label>
        <input type="number" id="valor" name="valor" step="0.01" min="0" pattern="^\d+(,\d{1,2})?$" title="Informe um valor válido" placeholder="1000.00" required onChange={(e) => {
           setDados(prev => ({...prev, Valor: e.target.value}));
        }} />

        <label htmlFor="recebimento"><span className="required">*</span>Data de Recebimento:</label>
        <input type="date" id="recebimento" name="recebimento" required onChange={(e) => {
           setDados(prev => ({...prev, Recebimento: e.target.value}));
        }} />
        
        <div className="gap-2 flex">
          <label htmlFor="conferencia"><span className="required">*</span>Conferência?</label>
          <input type="checkbox" id="conferencia" name="conferencia" className="scale-125 relative top-1" onChange={(e) => {
              setDados(prev => ({...prev, Conferencia: e.target.checked}));
          }} />
        </div>

        {dados?.Conferencia ? (
          <>
            <label htmlFor="dataconferencia"><span className="required">*</span>Data de Conferência:</label>
            <input type="date" id="dataconferencia" name="dataconferencia" required onChange={(e) => {
               setDados(prev => ({...prev, DataConferencia: e.target.value}));
            }} />
          </>
        ) : null}

      </form>

      <ReactToPrint
        trigger={() => { return (
          <button className="botaoVerde mx-auto font-semibold text-[21px] my-2 flex items-center justify-center gap-2" type="submit">Imprimir Atestado <span className="symbol text-[22px] py-0.5">print</span></button>
        )
        }}
        content={() => atestado.current}
      />

      <main className="pdf px-[18px] relative" ref={atestado}>
        <BasePdf processo={contrato?.Processo} />
        <h2 className="font-bold self-center py-3 text-xl">Medição (Recebimento e Conferência) do Processo {contrato?.Processo}</h2>

        <div className="dados pt-2">
          <p><span>Processo:</span> {contrato?.Processo}</p>
          <p><span>Contratada:</span> {contrato?.empresa?.Nome_Legal}</p>
          <p><span>CNPJ/CPF:</span> {contrato?.empresa?.CNPJ_ou_CPF}</p>
          <p><span>Cidade:</span> {contrato?.empresa?.Cidade}</p>
          <p><span>Contrato:</span> {contrato?.Numero_contrato} - {contrato?.Unidade}</p>
          <p><span>Objeto:</span> {contrato?.Objeto}</p>
        </div>

        <div className="dados pt-16">
          <p><span>Período de Referência:</span> {format(parseISO(dados?.ReferenciaInicio), 'dd/MM/yyyy')} a {format(parseISO(dados?.ReferenciaFinal), 'dd/MM/yyyy')}</p>
          <p><span>Local de Entrega/Execução:</span> {dados?.Local}</p>
          <p><span>Data de Recebimento:</span> {format(parseISO(dados?.Recebimento), 'dd/MM/yyyy')} <span className="ml-24">Houve Conferência?</span> {dados?.Conferencia ? 'Sim' : 'Não'}</p>
          {dados?.Conferencia ? <p><span>Data de Conferência:</span>{format(parseISO(dados?.DataConferencia), 'dd/MM/yyyy')}</p> : null}
          <p><span>Objetivo da Medição:</span> {dados?.Objetivo}</p>
          <p><span>Execução do Contrato de Acordo com Cronograma:</span> Sim</p>
          <p className="pt-3"><span>Valor da Cobrança:</span> {dados?.Valor}</p>
        </div>
        
        <p className="text-[15px] leading-tight pt-16 pb-6 mb-20"><span className="font-semibold">Manifestação do Fiscal:</span><br />
          Na data de entrega, acima informada, foi recebido o objeto do referido contrato.<br/>
          Na data de conferência, acima informada, foi conferido (medido) o objeto, estando o mesmo em conformidade com as
          cláusulas do contrato em questão.
        </p>
        
        <Assinatura fiscal={"Teste"} />
      </main>
    </>
   );
}

export default AtestadoMedicao;