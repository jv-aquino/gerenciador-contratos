import Image from "next/image";
import LogoUnesp from './logoUnesp.png'

  function BasePdf({ processo }) {
  return ( 
    <div className="flex items-center justify-around gap-1 pt-5 pb-1">
        <Image src="/logoUnesp.png" alt="" width={110} height={60} className="pb-2" />
        <div className="flex flex-col items-center justify-center gap-1.5">
          <h2 className="font-bold text-[1.47rem]">Universidade Estadual Paulista - UNESP</h2>
          <p className="font-semibold text-[1.1rem]">FACULDADE DE ENGENHARIA E CIÊNCIAS</p>
        </div>
        <div className="rounded-sm border-2 border-zinc-800 p-1">
          <p className="text-[15px] leading-snug">Folha:</p>
          <p className="text-[15px] leading-snug">Processo: {processo}</p>
          <p className="text-[15px] leading-snug">Rubrica:</p>
        </div>
      </div>
   );
}

export default BasePdf;