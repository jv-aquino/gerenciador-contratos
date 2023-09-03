import Link from "next/link";

export default function MenuContrato({ onClose, id, openEmpresa, openRenovar }) {
  const path = `/contratos/${id}/`;

  return (
    <>
      <div className="modal">
        <div className="bg-white rounded-md py-3 px-4 relative">
          <h3 className="font-medium text-2xl text-dark-blue-500 pb-1 pr-5">Menu do Contrato #{id}</h3>
          <button type="button" className="absolute top-[7px] right-2 text-[22px] font-semibold" onClick={() => onClose()}><span className="symbol">close</span></button>
          <div className="grid grid-cols-2 pt-1">
            <ul className="font-medium flex flex-col gap-1">
              <li className="cursor-pointer" onClick={() => {
                onClose();
                openRenovar();
                }}>
                Renovar
              </li>

              <Link href={path + 'responsaveis'}>Responsáveis</Link>
              <Link href={path + 'notas'}>Notas Fiscais</Link>

              <li className="cursor-pointer" onClick={() => {
                onClose();
                openEmpresa();
                }}>
                Empresa
              </li>

            </ul>
            <ul className="font-medium flex flex-col gap-1">
              <Link href={path + 'atestadoMedicao'}>Atestado de Medição</Link>
            </ul>
          </div>
        </div>
      </div>
    </>
  )
}