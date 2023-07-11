import {  useState } from 'react';

export  const RegistrationComponent = () => {

    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [confirmPassword, setConfirmPassword] = useState<string>('');
    const [username, setUsername] = useState<string>('');
    function createNewUser(e: React.SyntheticEvent<EventTarget>): void {
      e.preventDefault();
    //   console.log("ok");
    //     fetch("http://localhost:3001/createNewUser", {
    //       method: "POST",
    //       headers: {
    //         "Content-Type": "application/json",
    //       },
    //       body: JSON.stringify({ email, password }),
    //     })
    //     .then((response) => {
    //       if (!response.ok) {
    //         throw new Error("Network response was not ok");
    //       }
    //       return response.json();
    //     })
    //     .then((result) => {
    //       console.log(result);
    //     })
    //     .catch((error) => {
    //       console.error("Error:", error);
    //     });
    }

    return(
        <div className='form signUpForm'>
            <form>
              <h3>Sign Up</h3>
              <input type="text" placeholder="Username" onChange={(e)=>{setUsername(e.target.value)}} value={username}/>
              <input type="email" placeholder="Email" onChange={(e)=>{setEmail(e.target.value)}} value={email}/>
              <input type="password" placeholder="Password" onChange={(e)=>{setPassword(e.target.value)}} value={password}/>
              <input type="password" placeholder="Confirm Password" onChange={(e)=>{setConfirmPassword(e.target.value)}} value={confirmPassword}/>
              <button onSubmit={createNewUser} className='formBtn' >Register</button>
              <a href="#" className="forgot">Forgot Password</a>
            </form>
        </div>
    );
}