import PropTypes from 'prop-types';

export default function EmpresaForm ({ handleSubmit, cancel }) {
  return (
    <div className='visibleForm'>
      <form className="flex flex-col gap-[10px]
      bg-white rounded-md p-5" onSubmit={handleSubmit}>
          <label htmlFor='Nome_Legal'>
            Nome Legal:
          </label>
          <input type="text" id="Nome_Legal"/>

          <label htmlFor='CPF'>
            CNPJ/CPF:
          </label>
          <input type="text" id="CPF"/>

          <label htmlFor="Pessoa">
            Pessoa:
          </label>
          <select id="Pessoa">
            <option value="Física">Física</option>
            <option value="Jurídica">Jurídica</option>
          </select>
          <label htmlFor="Privada">
            Empresa Privada?
          </label>
          <select id="Privada">
            <option value="TRUE">Sim</option>
            <option value="FALSE">Não</option>
          </select>
          <label htmlFor="Situação">
            Situação:
          </label>
          <select id="Situação">
            <option value="Ativo">Ativo</option>
            <option value="Inativo">Inativo</option>
          </select>
          <button type="submit" className="bg-green-500 text-white font-medium rounded m-auto p-2 w-fit">Enviar</button>
          <button type="button" className="bg-red-600 text-black font-medium rounded m-auto p-2 w-fit"
          onClick={cancel}>Cancelar</button>
      </form>
    </div>
  )
}

EmpresaForm.propTypes = {
  cancel: PropTypes.func,
  handleSubmit: PropTypes.func,
};