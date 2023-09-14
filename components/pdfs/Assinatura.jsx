import { format } from 'date-fns';

export default function Assinatura({ fiscal }) {
  return (
    <div className={"self-center flex flex-col justify-center items-center "}>
      <p className="text-[13px] text-zinc-700"><i>Guaratinguetá, {format(new Date(), 'dd/MM/yyyy')}</i></p>
      <div className='pt-[30px] border-b-2 border-zinc-900 w-[270px]'></div>
      <p className="text-[15px] pt-[5px]">Fiscal: {fiscal}</p>
    </div>
  )
}