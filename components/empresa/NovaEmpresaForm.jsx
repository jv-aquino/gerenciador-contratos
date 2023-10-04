"use client"
import { useState } from 'react';

export default function NovaEmpresaForm ({ handleSubmit, cancel, valores, deletarEmpresa }) {
  let values = valores;
  if (!values) {
    values = {};
    values["Nome"] = values["CPF"] = values["id"] = values['Cidade'] = '';
    values["Situacao"] = 'Ativa';
    values["Privada"] = 'true';
    values["Pessoa"] = 'Jurídica';
  }

  const [id, setId] = useState(values["id"]);
  const [Nome_Legal, setNome] = useState(values["Nome"]);
  const [cpf, setCpf] = useState(values["CPF"]);
  const [Cidade, setCidade] = useState(values["Cidade"]);
  const [Privada, setPrivada] = useState(String(values["Privada"]));  
  const [Pessoa, setPessoa] = useState(values["Pessoa"]);
  const [Situacao, setSituacao] = useState(values["Situacao"]);

  const [clicked, setClicked] = useState(false);

  return (
    <div className='visibleForm'>
      <form className="flex flex-col gap-[10px]
      bg-white rounded-md py-4 px-5" onSubmit={(e) => {
        e.preventDefault();
        if (clicked) {
          return;
        } setClicked(true);
        handleSubmit(id, { CNPJ_ou_CPF: cpf, Nome_Legal, Situacao, Cidade, Privada, Pessoa });
      }}>
          <label htmlFor='Nome_Legal'>Nome Legal:</label>
          <input type="text" id="Nome_Legal" required  value={Nome_Legal} placeholder='Empresa Ltda.' onChange={(e) => {
            setNome(e.target.value);
          }}/>

          <label htmlFor='CPF'>CNPJ ou CPF:</label>
          <input type="text" id="CPF" required value={cpf} placeholder='12.345.678/0000-99' onChange={(e) => {
            setCpf(e.target.value);
          }}/>

          <label htmlFor='Cidade'>Cidade/Estado:</label>
          <input type="text" id="Cidade" required value={Cidade} placeholder='Lorena/SP' onChange={(e) => {
            setCidade(e.target.value);
          }}/>

          <div className="flex gap-2 pt-[10px]">
            <label htmlFor="Pessoa">Pessoa:</label>
            <select id="Pessoa" value={Pessoa} onChange={(e) => {
              setPessoa(e.target.value);
            }}>
              <option value="Jurídica">Jurídica</option>
              <option value="Física">Física</option>
            </select>
          </div>

          <div className="flex pt-[7px] gap-[10px]">
            <label htmlFor="Privada">Empresa Privada?</label>
            <select id="Privada" value={Privada} onChange={(e) => {
              setPrivada(e.target.value);
            }}> 
              <option value="true">Sim</option>
              <option value="false">Não</option>
            </select>
          </div>

          <div className="flex py-2 gap-2">
            <label htmlFor="Situacao">Situação:</label>
            <select id="Situacao" value={Situacao} onChange={(e) => {
              setSituacao(e.target.value);
            }}>
              <option value="Ativa">Ativa</option>
              <option value="Inativa">Inativa</option>
            </select>
          </div>

          <button type="submit" className="bg-green-500 text-white">
            {(!valores) ? 'Enviar' : 'Salvar'}
          </button>
          {(valores) ? <button type="button" className="bg-dark-blue-500 text-white" onClick={() => {deletarEmpresa(id)}}>
            Deletar Empresa
          </button> : null}
          <button type="button" className="bg-red-600 text-black"
          onClick={cancel}>Cancelar</button>
      </form>
    </div>
  )
}