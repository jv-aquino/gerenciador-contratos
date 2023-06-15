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
      console.error('Erro:', error);
    } else {
      changePage("início");
      setLogged(true);
    }
  };

  return (
    <>
      <h1>Login</h1>

      <form className="bg-white rounded-md p-3 m-auto
      flex flex-col items-center gap-2" 
      onSubmit={handleLogin}>
        <label htmlFor="email">Email:</label><input type="email" name="email" id="email" />
        
        <label htmlFor="senha">Password:</label><input type="password" name="senha" id="senha"/>
      
        <button className="rounded bg-dark-blue-500 font-semibold p-2 w-fit" type="submit">Login</button>
      </form>
    </>
  )
}

Login.propTypes = {
  changePage: PropTypes.func,
  setLogged: PropTypes.func,
};