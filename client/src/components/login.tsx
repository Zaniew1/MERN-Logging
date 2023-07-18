import {  useState } from 'react';
import '../index.css';
import '../style.css';
export  const Login= () => {

    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [error, setError] = useState<string>("")
    function LoginUser(e: React.SyntheticEvent<EventTarget>): void {
      e.preventDefault();
      if(email === ""){
        setError('Email jest wymagany przy zakładaniu konta');
      }
      if(!password.match(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/)){
        setError("Hasło powinno zawierać minimum 8 znaków, 1 dużą literę, 1 małą i jeden znak specjalny");
        return;
      }
      fetch("http://localhost:3001/LoginUser", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((result) => {
        console.log(result);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }
  function forgetPassword (e: React.SyntheticEvent<EventTarget>): void {
    e.preventDefault();
    if(!email){
      setError('Email jest wymagany przy odzyskiwaniu hasła');
    }
    fetch("http://localhost:3001/forgetPassword", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((result) => {
      console.log(result);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
  }
    return(
      <div className='form signInForm'>
      <form>
        <h3>Sign in</h3>
        <input type="email" placeholder="Email" onChange={(e)=>{setEmail(e.target.value); setError('');}} value={email} required/>
        <input type="password" placeholder="Password" onChange={(e)=>{setPassword(e.target.value); setError('');}} value={password} required/>
        <button className='formBtn' onClick={LoginUser} >Login</button>
        <a href="#" className="forgot" onClick={(e)=>{forgetPassword(e)}}>Forgot Password</a>
        <div className={error ? "error" : ""}>{error ? error : ''}</div>
      </form>
    </div>
    );
}