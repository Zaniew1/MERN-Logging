import { useState } from "react";
import {useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowTurnUp } from "@fortawesome/free-solid-svg-icons";

import { inputStyle, buttonStyle, errorStyle, successStyle, goBackStyle, containerStyle, formStyle } from "../../tailwindStyles";
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
            setSuccess('Wysłano link resetujący na maila');
            setTimeout(()=>{
              navigate('/');
            }, 500)
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
        <div className='min-h-screen flex justify-center items-center bg-myBlue transition-[0.3s]'>
            <div className={goBackStyle} onClick={goBack}><FontAwesomeIcon icon={faArrowTurnUp} /></div>
            <main className={containerStyle} >
            <div className={formStyle + "top-0 delay-1000"} >
                <form>
                    <h3 className="text-gray-500 text-lg">Forgot your password? Enter your email and we will send you activation link</h3>
                    <input className={inputStyle} type="email" placeholder="Email" onChange={(e)=>{setEmail(e.target.value);setSuccess(''); setError('');}} value={email} required/>
                    <button className={buttonStyle} onClick={forgetPassword} >Send</button>
                    <div className={error ? errorStyle : ""}>{error ? error : ''}</div>
                    <div className={success ? successStyle : ""}>{success ? success : ''}</div>
                </form>
            </div>
            </main>
        </div>
    )
}