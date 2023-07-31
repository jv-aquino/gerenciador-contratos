import { useState } from 'react';

export default function NovoServidor ({ handleSubmit, cancel, valores, deletarServidor }) {
  let values = valores;
  if (!values) {
    values = {};
    values["Nome"] = values["CPF"] = values["Email"] = values["Local"] =  values["Situação"] = values["id"] = '';
  } 
  const [id, setId] = useState(values["id"]);
  const [nome, setNome] = useState(values["Nome"]);
  const [cpf, setCpf] = useState(values["CPF"]);
  const [email, setEmail] = useState(values["Email"]);
  const [local, setLocal] = useState(values["Local"]);
  const [situacao, setSituacao] = useState(values["Situacao"]);
  const [clicked, setClicked] = useState(false);

  return (
    <div className='visibleForm'>
      <form className="flex flex-col gap-[10px]
      bg-white rounded-md py-4 px-5" onSubmit={(e) => {
        e.preventDefault();
        if (clicked) {
          return;
        } setClicked(true);
        handleSubmit(id);
      }}>
          <label htmlFor='Nome'>
            Nome:
          </label>
          <input type="text" id="Nome" required value={nome} onChange={(e) => {
            setNome(e.target.value);
          }}/>

          <label htmlFor='CPF'>
            CPF:
          </label>
          <input type="text" id="CPF" required value={cpf} onChange={(e) => {
            setCpf(e.target.value);
          }}/>

          <label htmlFor='Email'>
            Email:
          </label>
          <input type="email" id="Email" required value={email} onChange={(e) => {
            setEmail(e.target.value);
          }}/>

          <label htmlFor="Local">
            Local de Atuação:
          </label>
          <select id="Local" value={local} onChange={(e) => {
            setLocal(e.target.value);
          }}>
            <option value="Guaratinguetá/FEG">Guaratinguetá/FEG	</option>
          </select>

          <div className="flex py-2 gap-2">
            <label htmlFor="Situacao">
              Situação:
            </label>
            <select id="Situacao" value={situacao} onChange={(e) => {
              setSituacao(e.target.value);
            }}>
              <option value="Ativo">Ativo</option>
              <option value="Inativo">Inativo</option>
            </select>
          </div>

          <button type="submit" className="bg-green-500 text-black">
            {(!valores) ? 'Enviar' : 'Salvar'}
          </button>
          {(valores) ? <button type="button" className="bg-dark-blue-500 text-white" onClick={() => {deletarServidor(id)}}>
            Deletar Servidor
          </button> : null}
          <button type="button" className="bg-red-600 text-black"
          onClick={cancel}>Cancelar</button>
      </form>
    </div>
  )
}