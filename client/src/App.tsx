import { LoginComponent } from './components/login';
import { RegistrationComponent } from './components/registration';
import './index.css';
import './style.css';
import { useState } from 'react';
function App() {

const [slider, setSlider] = useState<boolean>(false)
  return (
    <body className={`body ${slider == false ? "" : "slide"}`}>
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


            {/* LOGOWANIE */}
          <div className='form signInForm'>
            <form>
              <h3>Sign in</h3>
              <input type="text" placeholder="Username"/>
              <input type="password" placeholder="Password"/>
              <button className='formBtn' >Login</button>
              <a href="#" className="forgot">Forgot Password</a>
            </form>
          </div>
        <LoginComponent/>
          {/* REJESTRACJA */}
          {/* <div className='form signUpForm'>
            <form>
              <h3>Sign Up</h3>
              <input type="text" placeholder="Username"/>
              <input type="email" placeholder="Email"/>
              <input type="password" placeholder="Password"/>
              <input type="password" placeholder="Confirm Password"/>
              <button className='formBtn' >Register</button>
              <a href="#" className="forgot">Forgot Password</a>
            </form>
          </div> */}
          <RegistrationComponent/>
        </div>
      </main>
    </body>
  )
}

export default App
