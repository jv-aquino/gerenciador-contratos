import Link from "next/link";

export default function MenuContrato({ onClose, id }) {
  const path = `/contratos/${id}/`;

  return (
    <div className="modal">
      <div className="bg-white rounded-md py-3 px-4 relative">
        <h3 className="font-medium text-2xl text-dark-blue-500 pb-1 pr-5">Menu do Contrato #{id}</h3>
        <button type="button" className="absolute top-[9px] right-2 text-[22px] font-semibold" onClick={() => onClose()}><span className="symbol">close</span></button>
        <div className="grid grid-cols-2">
          <ul className="font-medium flex flex-col gap-1">
            <Link href={path + 'responsaveis'}>Renovar</Link>
            <Link href={path + 'responsaveis'}>Responsáveis</Link>
            <Link href={path + 'notas'}>Notas Fiscais</Link>
            <Link href={path + 'notas'}>Empresa</Link>
          </ul>
        </div>
      </div>
    </div>
  )
}