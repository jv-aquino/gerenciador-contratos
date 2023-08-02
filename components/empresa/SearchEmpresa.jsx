import { useState } from 'react'

export default function SearchEmpresa({ setOpen, handleSearchEmpresa}) {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="modal">
      <div className='bg-white p-2'>
        <form onSubmit={(e) => {
          e.preventDefault()
          handleSearchEmpresa(searchQuery)
        }} className='noShadow'>
          <label htmlFor="search-empresa">Buscar Empresa:</label>
          <input
            type="text"
            id="search-empresa"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder='Nome Legal'
            required
          />
          <input type="submit" value="Buscar" />
        </form>

        <button type="button" className="bg-red-600 text-white font-medium rounded m-auto p-2 w-fit"
        onClick={() => {setOpen(false)}}>Fechar</button>
      </div>
    </div>
  )
}