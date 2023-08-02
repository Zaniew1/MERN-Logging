import { Login } from './/Login';
import { Registration } from './Registration';
import '../index.css';
import '../style.css';
import { useState } from 'react';
export const RegistrationLoginPage = () =>{
const [slider, setSlider] = useState<boolean>(false)

    return (
    <div className={`wrapper ${slider == false ? "" : "slide"}`}>

        <main className="container" >
        <div className="box signin">
          <h2 className="header">Already have an account ?</h2>
          <button className="button" onClick={()=>setSlider(false)}>Sign in</button>
        </div>
        <div className="box  signup">
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