import supabase from "../lib/supabase";

import PropTypes from 'prop-types';

export default function Inserir({ changePage }) {
  const handleSubmit = async (event) => {
    event.preventDefault();
  
    const formData = new FormData(event.target);
    const Objeto = formData.get('objeto');
    const Processo = formData.get('processo');
    const Numero_contrato = formData.get('numero_contrato');
    const Tipo = formData.get('tipo');
    const Nome_empresa = formData.get('nome_empresa');
    const Unidade = formData.get('unidade');
    const vigencia_inicio = formData.get('vigencia_inicio');
    const vigencia_final = formData.get('vigencia_final');
  
    const { data, error } = await supabase
      .from('contratos')
      .insert([
        {
          Objeto,
          Processo,
          Numero_contrato,
          Tipo,
          Nome_empresa,
          Unidade,
          vigencia_inicio,
          vigencia_final
        }
      ]);
  
    if (error) {
      console.error('Erro:', error);
    } else {
      console.log('Sucesso:', data);
      changePage("contratos");
    }
  };
  

  return (
    <>
      <h1>Novo contrato</h1>

      <form onSubmit={handleSubmit}
      className="bg-white rounded-md p-3 m-auto
      flex flex-col items-center gap-2">
        <label htmlFor="objeto"><span className="required">*</span>Objeto:</label>
        <input type="text" id="objeto" name="objeto" required />

        <label htmlFor="processo"><span className="required">*</span>Processo:</label>
        <input type="text" id="processo" name="processo" required />

        <label htmlFor="numero_contrato"><span className="required">*</span>Número do Contrato:</label>
        <input type="text" id="numero_contrato" name="numero_contrato" required />

        <div className="select">
          <label htmlFor="tipo">Tipo:</label>
          <select id="tipo" name="tipo" required>
            <option value="Licitação">Licitação</option>
            <option value="Dispensa">Dispensa</option>
          </select>
        </div>

        <label htmlFor="nome_empresa"><span className="required">*</span>Nome da Empresa:</label>
        <input type="text" id="nome_empresa" name="nome_empresa" required />

        <div className="select">
          <label htmlFor="unidade"><span className="required">*</span>Unidade:</label>
          <select id="unidade" name="unidade" required>
            <option value="GUARA/FEG">GUARA/FEG</option>
          </select>
        </div>

        <label htmlFor="vigencia_inicio"><span className="required">*</span>Vigência Início:</label>
        <input type="date" id="vigencia_inicio" name="vigencia_inicio" required />

        <label htmlFor="vigencia_final"><span className="required">*</span>Vigência Final:</label>
        <input type="date" id="vigencia_final" name="vigencia_final" required />

        <input className="bg-light-blue-600 border-0 cursor-pointer text-white p-2 mt-2" type="submit" value="Enviar" />
      </form>
    </>
  )
}


Inserir.propTypes = {
  changePage: PropTypes.func,
};