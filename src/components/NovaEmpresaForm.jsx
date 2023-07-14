import PropTypes from 'prop-types';
import { useState } from 'react';

export default function NovaEmpresaForm ({ handleSubmit, cancel, valores, deletarEmpresa }) {
  let values = valores;
  if (!values) {
    values = {};
    values["Nome"] = values["CPF"] = values["Privada"] = values["Pessoa"] =  values["Situação"] = values["id"] = '';
  }
  const [id, setId] = useState(values["id"]);
  const [nome, setNome] = useState(values["Nome"]);
  const [cpf, setCpf] = useState(values["CPF"]);
  const [privada, setPrivada] = useState(String(values["Privada"]));  
  const [pessoa, setPessoa] = useState(values["Pessoa"]);
  const [situacao, setSituacao] = useState(values["Situacao"]);
  const [clicked, setClicked] = useState(false);

  return (
    <div className='visibleForm'>
      <form className="flex flex-col gap-[10px]
      bg-white rounded-md p-5" onSubmit={(e) => {
        e.preventDefault();
        if (clicked) {
          return;
        } setClicked(true);
        handleSubmit(id);
      }}>
          <label htmlFor='Nome_Legal'>
            Nome Legal:
          </label>
          <input type="text" id="Nome_Legal" required value={nome} onChange={(e) => {
            setNome(e.target.value);
          }}/>

          <label htmlFor='CPF'>
            CNPJ/CPF:
          </label>
          <input type="text" id="CPF" required value={cpf} onChange={(e) => {
            setCpf(e.target.value);
          }}/>

          <div className="flex gap-2 pt-[10px]">
            <label htmlFor="Pessoa">
              Pessoa:
            </label>
            <select id="Pessoa" value={pessoa} onChange={(e) => {
              setPessoa(e.target.value);
            }}>
              <option value="Jurídica">Jurídica</option>
              <option value="Física">Física</option>
            </select>
          </div>

          <div className="flex pt-[7px] gap-[10px]">
            <label htmlFor="Privada">
              Empresa Privada?
            </label>
            <select id="Privada" value={privada} onChange={(e) => {
              setPrivada(e.target.value);
            }}> 
              <option value="true">Sim</option>
              <option value="false">Não</option>
            </select>
          </div>

          <div className="flex py-2 gap-2">
            <label htmlFor="Situacao">
              Situação:
            </label>
            <select id="Situacao" value={situacao} onChange={(e) => {
              setSituacao(e.target.value);
            }}>
              <option value="Ativa">Ativa</option>
              <option value="Inativa">Inativa</option>
            </select>
          </div>

          <button type="submit" className="bg-green-500 text-white">
            {(!valores) ? 'Enviar' : 'Salvar'}
          </button>
          <button type="button" className="bg-red-600 text-black"
          onClick={cancel}>Cancelar</button>
      </form>
    </div>
  )
}

NovaEmpresaForm.propTypes = {
  cancel: PropTypes.func,
  handleSubmit: PropTypes.func,
  valores: PropTypes.any
};