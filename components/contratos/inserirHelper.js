import supabase from "@/lib/supabase";
import { toast } from "react-toastify";
import toastBase from "@/components/toastBase";

export const adicionarResponsavel = async (responsaveis, setResponsaveis) => {
  const responsavelEmail = document.getElementById('responsavel_email').value;
  const responsavelFuncao = document.getElementById('responsavel_funcao').value;

  if (responsavelEmail && responsavelFuncao) {
    const { data: servidor, error: servidorError } = await supabase
    .from('servidor')
    .select('id,Nome')
    .eq('Email', responsavelEmail).single();
    console.log(servidor)

    if (servidorError) {
      toast.error("Servidor não encontrado", toastBase(4000))
      return;
    }

    setResponsaveis([...responsaveis, { servidor_id: servidor.id, Funcao: responsavelFuncao, contrato_id: null, Nome: servidor.Nome }]);
    
    document.getElementById('responsavel_email').value = '';
    document.getElementById('responsavel_funcao').value = '';

    toast.success("Servidor adicionado", toastBase(3000))
  } else {
    toast.error("Preencha os campos de email e função do responsável", toastBase(4000));
  }
};