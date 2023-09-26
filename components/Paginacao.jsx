function Paginacao({ paginacao, setPaginacao, length, range}) {
  return ( 
    <div className="m-auto pt-3 flex justify-center gap-2">
      <button type="button" onClick={() => {
        if (paginacao <= range) { return }
        setPaginacao((prev) => prev - range);
      }} className={"paginacao " + ((paginacao <= range) ? 'desativado' : '')}>
        Anterior
      </button>
      <button type="button" onClick={() => {
        if (paginacao > length) { return }
        setPaginacao((prev) => prev + range);
      }} className={"paginacao " + ((paginacao > length) ? 'desativado' : '')} >
        Próximo
      </button>
    </div>
   );
}

export default Paginacao;