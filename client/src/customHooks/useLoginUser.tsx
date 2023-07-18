

import {useState} from 'react';
export const useLoginUser = (e:React.MouseEvent, email: string, password: string) =>  {
    const [error, setError] = useState<string>('');
    if(email === ""){
      setError('Email jest wymagany przy zakładaniu konta');
    }
    if(!password.match(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/)){
      setError("Hasło powinno zawierać minimum 8 znaków, 1 dużą literę, 1 małą i jeden znak specjalny");
      return;
    }
    fetch("http://localhost:3001/LoginUser", {
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
    return error;
}