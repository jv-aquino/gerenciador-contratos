function Paginacao({ paginacao, setPaginacao, length}) {
  return ( 
    <div className="m-auto pt-3 flex justify-center gap-2">
      <button type="button" onClick={() => {
        if (paginacao <= 5) { return }
        setPaginacao((prev) => prev - 5);
      }} className={"paginacao " + ((paginacao <= 5) ? 'desativado' : '')}>
        Anterior
      </button>
      <button type="button" onClick={() => {
        if (paginacao > length) { return }
        setPaginacao((prev) => prev + 5);
      }} className={"paginacao " + ((paginacao > length) ? 'desativado' : '')} >
        Próximo
      </button>
    </div>
   );
}

export default Paginacao;