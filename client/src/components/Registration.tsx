import {  useState } from 'react';
import '../index.css';
import '../style.css';
export  const Registration = () => {

  const [username, setUsername] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [error, setError] = useState<string>("")
    function createNewUser(e: React.SyntheticEvent<EventTarget>): void {
      console.log(username)
      e.preventDefault();
      if(password !== confirmPassword ){
        setError("Hasła powinne być takie same");
        return;
      }
      if(!password.match(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/)){
        setError("Hasło powinno zawierać minimum 8 znaków, 1 dużą literę, 1 małą i jeden znak specjalny");
        return;
      }
        
        fetch("http://localhost:3001/createNewUser", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username, email, password, confirmPassword }),
        })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then((result) => {
          console.log(result);
        })
        .catch((error) => {
          console.error("Error:", error);
          setError("Błąd serwera, spróbuj później");
        });
    }

    return(
        <div className='form signUpForm'>
            <form>
              <h3>Sign Up</h3>
              <input type="text" placeholder="Username" onChange={(e)=>{setUsername(e.target.value)}} value={username} required/>
              <input type="email" placeholder="Email" onChange={(e)=>{setEmail(e.target.value)}} value={email} required/>
              <input type="password" placeholder="Password" onChange={(e)=>{setPassword(e.target.value); setError('')}} value={password} required/>
              <input type="password" placeholder="Confirm Password" onChange={(e)=>{setConfirmPassword(e.target.value);setError('')}} value={confirmPassword} required/>
              <button onClick={createNewUser} className='formBtn' >Register</button>
              <div className={error ? "error" : ""}>{error ? error : ''}</div>
            </form>
        </div>
    );
}