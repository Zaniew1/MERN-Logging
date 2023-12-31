import { Login } from './Login';
import { Registration } from './Registration';
import {useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowTurnUp } from "@fortawesome/free-solid-svg-icons";
import '../../index.css';
import '../../style.css';
import { useState } from 'react';
export const RegistrationLoginPage:React.FC = ():JSX.Element =>{
const [slider, setSlider] = useState<boolean>(false);
const navigate = useNavigate();

function goBack(){
  navigate(-1);
}
    return (
    <div className={`wrapper ${slider == false ? "" : "slide"}`}>
        <div className="goBack" onClick={goBack}><FontAwesomeIcon icon={faArrowTurnUp} /></div>
        <main className="container" >
        <div className="box signin">
          <h2 className="header">Already have an account ?</h2>
          <button className="button" onClick={()=>setSlider(false)}>Sign in</button>
        </div>
        <div className="box signup">
          <h2 className="header">Don't have an account ?</h2>
          <button className="button" onClick={()=>setSlider(true)} >Sign up</button>
        </div>
        <div className="formWrapper">
          <Login/>
          <Registration/>
        </div>
      </main>
    </div>
    );
}