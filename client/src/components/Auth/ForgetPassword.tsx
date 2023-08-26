import { useState } from "react";
import {useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowTurnUp } from "@fortawesome/free-solid-svg-icons";
export const ForgetPassword:React.FC = ():JSX.Element => {
    const [email, setEmail] = useState<string>('');
    const [error, setError] = useState<string>("")
    const [success, setSuccess] = useState<string>("");

    const navigate = useNavigate();

    function forgetPassword (e: React.SyntheticEvent<EventTarget>): void {
        e.preventDefault();
        if(!email){
          setError('Email jest wymagany przy odzyskiwaniu hasła');
          return;
        }
        fetch("http://localhost:3001/forgetPassword", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email }),
        })
        .then((response) => {
          return response.json();
        })
        .then((result:{status:string, message: string}) => {
          if(result.status != 'fail'){
            setSuccess('Wysłano link resetujący na maila')
          }else{
            setError(result.message)
          }

        })
        .catch((error) => {
          console.error("Error:", error);
          setError('Coś się nie udało, spróbuj ponownie później')
        });
      }
      function goBack(){
        navigate(-1);
      }
    return (
        <div className={`wrapper`}>
            <div className="goBack" onClick={goBack}><FontAwesomeIcon icon={faArrowTurnUp} /></div>
            <main className="container" >
            <div className='form signInForm'>
                <form>
                    <h3 className="text-gray-500 text-lg">Forgot your password? Enter your email and we will send you activation link</h3>
                    <input type="email" placeholder="Email" onChange={(e)=>{setEmail(e.target.value);setSuccess(''); setError('');}} value={email} required/>
                    <button className='formBtn' onClick={forgetPassword} >Send</button>
                    <div className={error ? "error" : ""}>{error ? error : ''}</div>
                    <div className={success ? "success" : ""}>{success ? success : ''}</div>
                </form>
            </div>
            </main>
        </div>
    )
}