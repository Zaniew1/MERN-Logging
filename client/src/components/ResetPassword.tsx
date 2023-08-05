import { useState } from "react";
import {  useNavigate } from "react-router-dom";
import '../index.css';
import '../style.css';
export const ResetPassword = () => {
    const [password, setPassword] = useState<string>('');
    const [passwordConfirm, setPasswordConfirm] = useState<string>('');
    const [error, setError] = useState<string>("")
    const [success, setSuccess] = useState<string>("");
    const navigate = useNavigate();

    function resetPassword (e: React.SyntheticEvent<EventTarget>): void {
        e.preventDefault();
        if(!password || !passwordConfirm){
          setError('Wymagane są hasła do resetu');
          return;
        }
        if(!password.match(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/)){
            setError("Hasło powinno zawierać minimum 8 znaków, 1 dużą literę, 1 małą i jeden znak specjalny");
            return;
          }
        if(password !== passwordConfirm){
            console.log(password, passwordConfirm)
            setError('Hasła nie są jednakowe');
            return;
          }
          console.log(window.location.pathname)
        fetch(`http://localhost:3001${window.location.pathname}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ password, passwordConfirm }),
          
        })
        .then((response) => {
          return response.json();
        })
        .then((result) => {
            console.log(result)
          setSuccess('Udało się zresetować hasło');
          setTimeout(()=>{
            navigate('/');
          }, 500)
          setError('');
        })
        .catch((error) => {
          console.error("Error:", error);
          setError('Coś się nie udało, spróbuj ponownie później')
          setSuccess('');
        });
      }

    return (
        <div className={`wrapper`}>
            <main className="container" >
            <div className='form signInForm'>
                <form>
                    <h3>Enter you new password</h3>
                    <input type="password" placeholder="Password" onChange={(e)=>{setPassword(e.target.value); setError('');setSuccess('');}} value={password} required/>
                    <input type="password" placeholder="Confirm Password" onChange={(e)=>{setPasswordConfirm(e.target.value); setError(''); setSuccess('');}} value={passwordConfirm} required/>
                    <button className='formBtn' onClick={resetPassword} >Reset</button>
                    <div className={error ? "error" : ""}>{error ? error : ''}</div>
                    <div className={success ? "success" : ""}>{success ? success : ''}</div>
                </form>
            </div>
            </main>
        </div>
    )
}