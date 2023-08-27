import {Link, useNavigate } from 'react-router-dom'
import '../../index.css';
import '../../style.css';
import { useState, useContext } from "react";
import {AuthContext, UserDataType} from '../../store/Auth-context'
import { inputStyle, errorStyle,  buttonStyle, formStyle } from '../../tailwindStyles';
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
        return response.json();
      })
      .then((result:UserDataType) => {
        if(result.status === 'success'){
          setloggedIn(true);
          setUserData(result)
          navigate('/');
        }else{
          setError(result.message);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }
    return(
      <div className={formStyle + " top-0 delay-1000"}>
      <form>
        <h3>Sign in</h3>
        <input  className={inputStyle} type="email" placeholder="Email" onChange={(e)=>{setEmail(e.target.value); setError('');}} value={email} required/>
        <input className={inputStyle} type="password" placeholder="Password" onChange={(e)=>{setPassword(e.target.value); setError('');}} value={password} required/>
        <button className={buttonStyle} onClick={LoginUser} >Login</button>
        <Link to="/forgetPassword" className="underline text-[#333] text-[0.8em] tracking-[0.05px]" >Forgot Password</Link>
        <div className={error ? errorStyle : ""}>{error ? error : ''}</div>
      </form>
    </div>
    );
}