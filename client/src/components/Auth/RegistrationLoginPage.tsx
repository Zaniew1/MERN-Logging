import { Login } from './Login';
import { Registration } from './Registration';
import {useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowTurnUp } from "@fortawesome/free-solid-svg-icons";
import '../../index.css';
import { headerStyle, boxStyle, wrapperStyle, goBackStyle, containerStyle, buttonContainerStyle } from '../../tailwindStyles';
import { useState } from 'react';
export const RegistrationLoginPage:React.FC = ():JSX.Element =>{
const [slider, setSlider] = useState<boolean>(false);
const navigate = useNavigate();

function goBack(){
  navigate(-1);
}
    return (
    <div className={wrapperStyle + `${!slider ? "" : "bg-myRed"}`}>
        <div className={goBackStyle} onClick={goBack}><FontAwesomeIcon icon={faArrowTurnUp} /></div>
        <main className={containerStyle} >
        <div className={boxStyle + "signin"}>
          <h2 className={headerStyle}>Already have an account ?</h2>
          <button className={buttonContainerStyle} onClick={()=>setSlider(false)}>Sign in</button>
        </div>
        <div className={boxStyle + "signup"}>
          <h2 className={headerStyle}>Don't have an account ?</h2>
          <button className={buttonContainerStyle} onClick={()=>setSlider(true)} >Sign up</button>
        </div>
        <div className="absolute left-[50px] w-[350px] h-[480px] bg-white z-[100] shadow-myShadow duration-500 delay-200 overflow-hidden">
          <Login/>
          <Registration/>
        </div>
      </main>
    </div>
    );
}