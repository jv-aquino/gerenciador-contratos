import PropTypes from 'prop-types';

export default function NovaEmpresaForm ({ handleSubmit, cancel }) {
  return (
    <div className='visibleForm'>
      <form className="flex flex-col gap-[10px]
      bg-white rounded-md p-5" onSubmit={handleSubmit}>
          <label htmlFor='Nome'>
            Nome:
          </label>
          <input type="text" id="Nome"/>

          <label htmlFor='CPF'>
            CPF:
          </label>
          <input type="text" id="CPF"/>

          <label htmlFor='Email'>
            Email:
          </label>
          <input type="email" id="Email"/>

          <label htmlFor="Local">
            Local de Atuação:
          </label>
          <select id="Local">
            <option value="Guaratinguetá/FEG">Guaratinguetá/FEG	</option>
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

NovaEmpresaForm.propTypes = {
  cancel: PropTypes.func,
  handleSubmit: PropTypes.func,
};