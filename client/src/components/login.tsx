import {  useState } from 'react';

export  const LoginComponent = () => {

    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    function createNewUser(e: React.SyntheticEvent<EventTarget>): void {
      e.preventDefault();
      console.log("ok");
        fetch("http://localhost:3001/createNewUser", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
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
        });
    }

    return(

    <form onSubmit={createNewUser}>
        <label className="text-3xl font-bold underline" >Email</label>
        <input type="email" placeholder="Podaj swój email" onChange={(e)=>{setEmail(e.target.value)}} value={email}/>
        <label>Hasło</label>
        <input type="password" placeholder="Podaj swoje hasło" onChange={(e)=>{setPassword(e.target.value)}} value={password}/>
        <button type="submit" className="text-white px-4 sm:px-8 py-2 sm:py-3 bg-sky-700 hover:bg-sky-800" >Wyślij</button>
    </form>
    );
}