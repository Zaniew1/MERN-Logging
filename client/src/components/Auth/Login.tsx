import {Link, useNavigate } from 'react-router-dom'
import '../../index.css';
import '../../style.css';
import { useState, useContext } from "react";
import {AuthContext, UserDataType} from '../../store/Auth-context'

export  const Login:React.FC = ():JSX.Element => {
    const navigate = useNavigate();
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [error, setError] = useState<string>("")
    const {setloggedIn, setUserData} = useContext(AuthContext);

    function LoginUser(e: React.SyntheticEvent<EventTarget>): void {
      e.preventDefault();
      if(email === ""){
        setError('Email jest wymagany przy zakładaniu konta');
      }
      if(!password.match(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/)){
        setError("Hasło powinno zawierać minimum 8 znaków, 1 dużą literę, 1 małą i jeden znak specjalny");
        return;
      }
      fetch("http://localhost:3001/loginUser", {
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
      .then((result:UserDataType) => {
        if(result.status == 'success'){
          setloggedIn(true);
          setUserData(result)
          navigate('/');
        }
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
        <Link to="/forgetPassword" className="forgot" >Forgot Password</Link>
        <div className={error ? "error" : ""}>{error ? error : ''}</div>
      </form>
    </div>
    );
}