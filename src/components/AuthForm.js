import { useState } from "react";
import { authService, auth } from "fConfig";

const AuthForm = () => {
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newAccount, setNewAccount] = useState(true);
  const [error, setError] = useState("");

  const onChange = (event) => {

    const {
      target: {name, value},
    } = event;

    if(name === "email") {
      setEmail(value);
    } else if(name === "password") {
      setPassword(value);
    }
  };

  const onSubmit = async (event) => {
    event.preventDefault();

    try {
      let data;
      if(newAccount) {
        data = await auth.createUserWithEmailAndPassword(authService, email, password);
      } 
      else {
        data = await auth.signInWithEmailAndPassword(authService, email, password);
      }
      
    } catch(e) {
      setError(e.message);
    }
  }

  const toggleAccount = () => setNewAccount(prev => !prev);

  return (
    <>
      <form onSubmit={onSubmit} className="container">
        <input type="email" name="email" placeholder="Email" required value={email} onChange={onChange} className="authInput"/>
        <input type="password" name="password" placeholder="Password" required value={password} onChange={onChange} className="authInput"/>
        <input type="submit" value="Log In" value={newAccount ? "Create Account" : "Log In"} className="authInput authSubmit"/>
        {error && <span className="authError">{error}</span>}
      </form>
      <span onClick={toggleAccount} className="authSwitch">
        {newAccount ? "Sign In" : "Create Account"}
      </span>
    </>
  )
}

export default AuthForm;