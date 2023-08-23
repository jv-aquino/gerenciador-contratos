"use client"

import { toast } from "react-toastify";
import toastBase from "@/components/toastBase";

import supabase from "@/lib/supabase";

import SearchEmpresa from "@/components/empresa/SearchEmpresa";
import { adicionarResponsavel } from "@/components/contratos/inserirHelper"

import { useState } from "react";

export default function Inserir() {
  const [modalOpen, setModalOpen] = useState(false);
  const [empresaId, setEmpresaId] = useState('');
  const [responsaveis, setResponsaveis] = useState([]);

  const handleSearchEmpresa = async (searchQuery) => {
    const { data: empresas, error } = await supabase
      .from('empresa')
      .select('id')
      .ilike('Nome_Legal', `%${searchQuery}%`)
      .single();

    if (error) {
      console.error('Erro:', error);
    } else if (empresas) {
      setEmpresaId(empresas.id);
      toast.success("ID da Empresa adicionado", toastBase(3000))
      setModalOpen(false);
    } else {
      toast.error("Empresa não encontrada", toastBase(4000))
    }
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
  
    const formData = new FormData(event.target);
    const Objeto = formData.get('objeto');
    const Processo = formData.get('processo');
    const Numero_contrato = formData.get('numero_contrato');
    const Tipo = formData.get('tipo');
    const Empresa = formData.get('empresa');
    const Unidade = formData.get('unidade');
    const Vigencia_inicio = formData.get('vigencia_inicio');
    const Vigencia_final = formData.get('vigencia_final');
    const Valor = formData.get('valor');
    const Valor_Empenhado = formData.get('valor_empenhado');
  
    const { data, error } = await supabase
      .from('contrato')
      .insert([
        {
          Objeto,
          Processo,
          Numero_contrato,
          Tipo,
          Empresa,
          Unidade,
          Vigencia_inicio,
          Vigencia_final,
          Valor,
          Valor_Empenhado
        }
    ]).select("id");

    const formattedResponsaveis = responsaveis.map((responsavel) => {
      if (responsavel.contrato_id == null) {
        const resp = { ...responsavel, contrato_id: data[0].id };
        delete resp.Nome
        return resp
      }
      return responsavel;
    })

    const { d, e } = await supabase.from('contrato_servidor').insert(formattedResponsaveis);

    if (error || e) {
      console.error('Erro:', error, e);
      toast.error("Erro: verifique as informações inseridas", toastBase(4000))
    } else {
      console.log('Sucesso:', data);
      toast.success("Contrato inserido com sucesso", toastBase(3000))
      window.location.assign("/contratos")
    }
  };
  

  return (
    <>
      <h1>Novo contrato</h1>

      <form onSubmit={handleSubmit}
      className="bg-white rounded-md p-3 m-auto
      flex flex-col items-center gap-2 w-[330px]">
        <label htmlFor="objeto"><span className="required">*</span>Objeto:</label>
        <input type="text" id="objeto" name="objeto" placeholder="Nome do Contrato" required />

        <label htmlFor="processo"><span className="required">*</span>Processo:</label>
        <input type="text" id="processo" name="processo" placeholder="000/2023" required />

        <label htmlFor="numero_contrato"><span className="required">*</span>Número do Contrato:</label>
        <input type="text" id="numero_contrato" name="numero_contrato" placeholder="00/2023" required />

        <div className="select pb-1">
          <label htmlFor="tipo"><span className="required">*</span>Tipo:</label>
          <select id="tipo" name="tipo" required>
            <option value="Licitação">Licitação</option>
            <option value="Dispensa">Dispensa</option>
          </select>
        </div>

        <div className="select pt-0 pb-3">
          <label htmlFor="unidade"><span className="required">*</span>Unidade:</label>
          <select id="unidade" name="unidade" required>
            <option value="Guara/FEG">Guara/FEG</option>
          </select>
        </div>

        <label htmlFor="vigencia_inicio"><span className="required">*</span>Vigência Início:</label>
        <input type="date" id="vigencia_inicio" name="vigencia_inicio" required />

        <label htmlFor="vigencia_final"><span className="required">*</span>Vigência Final:</label>
        <input type="date" id="vigencia_final" name="vigencia_final" required />

        <label htmlFor="valor">Valor:</label>
        <input type="number" id="valor" name="valor" step="0.01" min="0" pattern="^\d+(,\d{1,2})?$" title="Informe um valor válido" placeholder="10000.00" required />
        <label htmlFor="valor_empenhado">Valor Empenhado (Total):</label>
        <input type="number" id="valor_empenhado" name="valor_empenhado" step="0.01" min="0" pattern="^\d+(,\d{1,2})?$" title="Informe um valor válido" placeholder="5000.00" required />

        <button type="button" onClick={() => setModalOpen(true)}>Pesquisar Empresa <span className="symbol">search</span></button>
        <label htmlFor="empresa"><span className="required">*</span>ID da Empresa:</label>
        <input type="text" id="empresa" name="empresa" value={empresaId} onChange={(e) => setEmpresaId(e.target.value)} required />

        {/* Criar opção de adicionar responsáveis*/}
        <h3 className="font-semibold text-xl pt-4">Responsáveis</h3>
        <ul className="list-disc">
          {responsaveis.map((responsavel, index) => (
            <li key={index}>
              ID: {responsavel.servidor_id}, Função: {responsavel.Funcao}
            </li>
          ))}
        </ul>

        <div className="responsavel relative bottom-2 flex flex-col items-center">
          <label htmlFor="responsavel_email">Email do Responsável:</label>
          <input type="email" id="responsavel_email" name="responsavel_email" placeholder="Email do Responsável" />

          <label htmlFor="responsavel_funcao">Função do Responsável:</label>
          <input type="text" id="responsavel_funcao" name="responsavel_funcao" placeholder="Função do Responsável" />
        </div>
        <button type="button" onClick={() => adicionarResponsavel(responsaveis, setResponsaveis)}>Adicionar Responsável</button>

        <input className="bg-light-blue-600 border-0 cursor-pointer text-white p-2 mt-2" type="submit" value="Enviar" />
      </form>

      {(modalOpen) ? <SearchEmpresa setOpen={setModalOpen} handleSearchEmpresa={handleSearchEmpresa} /> : null}
    </>
  )
}