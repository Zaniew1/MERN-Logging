import {  useState } from 'react';

export  const LoginComponent = () => {

    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');


    return(
      <>
      <div className='form signInForm'>
      <form>
        <h3>Sign in</h3>
        <input type="text" placeholder="Username"/>
        <input type="password" placeholder="Password"/>
        <button className='formBtn'  >Login</button>
        <a href="#" className="forgot">Forgot Password</a>
      </form>
    </div>


    <form >
        <label className="text-3xl font-bold underline" >Email</label>
        <input type="email" placeholder="Podaj swój email" onChange={(e)=>{setEmail(e.target.value)}} value={email}/>
        <label>Hasło</label>
        <input type="password" placeholder="Podaj swoje hasło" onChange={(e)=>{setPassword(e.target.value)}} value={password}/>
        <button type="submit" className="text-white px-4 sm:px-8 py-2 sm:py-3 bg-sky-700 hover:bg-sky-800" >Wyślij</button>
    </form>
    </>
    );
}