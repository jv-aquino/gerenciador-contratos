import supabase from "../lib/supabase"

export default function Inserir() {

  return (
    <>
      <h1>Novo contrato</h1>

      <form className="bg-white rounded-md p-3 m-auto
      flex flex-col items-center gap-2">
        <label htmlFor="objeto">Objeto:</label>
        <input type="text" id="objeto" name="objeto" />

        <label htmlFor="processo">Processo:</label>
        <input type="text" id="processo" name="processo" />

        <label htmlFor="numero_contrato">Número do Contrato:</label>
        <input type="text" id="numero_contrato" name="numero_contrato" />

        <label htmlFor="tipo">Tipo:</label>
        <input type="text" id="tipo" name="tipo" />

        <label htmlFor="nome_empresa">Nome da Empresa:</label>
        <input type="text" id="nome_empresa" name="nome_empresa" />

        <label htmlFor="unidade">Unidade:</label>
        <select id="unidade" name="unidade">
          <option value="GUARA/FEG">GUARA/FEG</option>
        </select>

        <label htmlFor="vigencia_inicio">Vigência Início:</label>
        <input type="date" id="vigencia_inicio" name="vigencia_inicio" />

        <label htmlFor="vigencia_final">Vigência Final:</label>
        <input type="date" id="vigencia_final" name="vigencia_final" />

        <input type="submit" value="Enviar" />
      </form>
    </>
  )
}