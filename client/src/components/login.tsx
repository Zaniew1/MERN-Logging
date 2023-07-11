import {  useState } from 'react';
import '../style.css';
export  const Login= () => {

    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');


    return(
      <div className='form signInForm'>
      <form>
        <h3>Sign in</h3>
        <input type="email" placeholder="Email" onChange={(e)=>{setEmail(e.target.value)}} value={email}/>
        <input type="password" placeholder="Password" onChange={(e)=>{setPassword(e.target.value)}} value={password}/>
        <button className='formBtn'  >Login</button>
        <a href="#" className="forgot">Forgot Password</a>
      </form>
    </div>
    );
}