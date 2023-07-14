import { useState, useEffect } from "react";
import supabase from "../lib/supabase";
import PropTypes from 'prop-types';

import Carregando from '../components/Carregando';

export default function VerContrato({ id }) {
  const [loading, setLoading] = useState(true);
  const [contrato, setContrato] = useState({});

  useEffect(() => {
    supabase.from('contrato').select('*').eq('id', id).then(res => {
      if (res) {
        setContrato(res.data[0]);
        setLoading(false);
      }
    }) 
  }, [id]);

  return (
  <>  
    {(!loading) ? (
    <>
      <h1>Contrato #{contrato.id}</h1>

      <div className="content">
        <h2>{contrato["Objeto"]}</h2>
        
      </div>
    </>
    ) : <Carregando />}
  </>
  )
}

VerContrato.propTypes = {
  id: PropTypes.any
}