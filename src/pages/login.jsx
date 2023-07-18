import supabase from "../lib/supabase"
import PropTypes from 'prop-types';

export default function Login({ changePage, setLogged }) {
  const handleLogin = async (e) => {
    e.preventDefault();

    const { user, error } = await supabase.auth.signInWithPassword({
      email: document.querySelector("#email").value,
      password: document.querySelector("#senha").value,
    });

    if (error) {
      alert('Erro:', error);
    } else {
      changePage("início");
      setLogged(true);
    }
  };

  return (
    <>
      <h1>Login</h1>

      <form className="bg-white rounded-md p-4 m-auto
      flex flex-col items-center gap-2" 
      onSubmit={handleLogin}>
        <label htmlFor="email" className="self-start pl-4">Email:</label><input type="email" name="email" id="email" placeholder="exemplo@unesp.br" required/>
        
        <label htmlFor="senha" className="self-start pl-4">Senha:</label><input type="password" name="senha" id="senha" placeholder="Senha123" required/>
      
        <button className="text-xl rounded bg-dark-blue-500 font-semibold mt-2 p-2 px-[10px] w-fit
        hover:text-white" type="submit">Login</button>
      </form>
    </>
  )
}

Login.propTypes = {
  changePage: PropTypes.func,
  setLogged: PropTypes.func,
};