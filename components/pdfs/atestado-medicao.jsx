import BasePdf from "./Base";
import { useRef } from "react";

import ReactToPrint from "react-to-print";
import Assinatura from "./Assinatura";

function AtestadoMedicao({ contrato, dados }) {
  const atestado = useRef();

  return ( 
    <>
      <ReactToPrint
        trigger={() => { return (
          <button className="botaoVerde mx-auto font-semibold text-2xl flex items-center justify-center gap-2" type="button">Imprimir Atestado <span className="symbol text-2xl py-1">print</span></button>
        )
        }}
        content={() => atestado.current}
      />


      <main className="px-[18px] pdf" ref={atestado}>
        <BasePdf processo={contrato?.Processo} />
        <h2 className="font-bold self-center py-3 text-xl">Medição (Recebimento e Conferência) do Processo {contrato?.Processo}</h2>

        <div className="dados">
          <p><span>Processo:</span> {contrato?.Processo}</p>
          <p><span>Contratada:</span> {contrato?.empresa?.Nome_Legal}</p>
          <p><span>CNPJ/CPF:</span> {contrato?.empresa?.CNPJ_ou_CPF}</p>
          <p><span>Cidade:</span> {contrato?.empresa?.Cidade}</p>
          <p><span>Contrato:</span> {contrato?.Numero_contrato} - {contrato?.Unidade}</p>
          <p><span>Objeto:</span> {contrato?.Objeto}</p>
        </div>

        <div className="dados">
          <p><span>Período de Referência:</span> {dados?.Referencia}</p>
          <p><span>Local de Entrega/Execução:</span> {dados?.Local}</p>
          <p><span>Data de Recebimento:</span> {dados?.Recebimento} <span className="ml-auto">Data de Conferência:</span> {dados?.Conferencia}</p>
          <p></p>
          <p><span>Objetivo da Medição:</span> {dados?.Objetivo}</p>
          <p><span>Execução do Contrato de Acordo com Cronograma:</span> {dados?.DeAcordo}</p>
          <p><span>Valor da Cobrança:</span> {dados?.Valor}</p>
        </div>
        
        <p className="text-[15px] leading-tight py-2"><span className="font-semibold">Manifestação do Fiscal:</span><br />
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