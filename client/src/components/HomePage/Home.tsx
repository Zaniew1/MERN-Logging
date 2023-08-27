import {Link} from 'react-router-dom'
import {UserInfo} from './UserInfo'
import { useContext } from "react";
import {AuthContext} from '../../store/Auth-context'
import '../../index.css';
export const Home:React.FC = ():JSX.Element=>{
    const {loggedIn, userData, setloggedIn, setUserData} = useContext(AuthContext);
    const {username, email, creationDate} = userData.data.user ;
    const userDataEmpty = {
        status:'',
        token: '',
        data:{
          user:{
            _id:'',
            username:'',
            email:'',
            creationDate:0
          }
        }
    }
    function LogoutUser(e: React.SyntheticEvent<EventTarget>): void {
        e.preventDefault();
        fetch("http://localhost:3001/logoutUser", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({email}),
        })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then(() => {
          setloggedIn(false);
          setUserData(userDataEmpty);
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }


    return (
        <div className="w-screen min-h-screen " >
            <header className="h-[10vh] flex justify-between items-center w-full bg-myBlue">
                <div  className="flex justify-center items-center w-1/3 ml-[40px] h-full text-2xl text-white font-black">Logging App</div>
                <nav className=" w-1/4 text-center">
                    {!loggedIn ? <Link className="transition ease-in-out duration-300  text-white text-xl p-[20px] cursor-pointer hover:text-myRed" to={"/login"}>Login</Link> : <div className="transition ease-in-out duration-300 mr-[80px] text-white text-xl p-[20px] cursor-pointer" onClick={LogoutUser}>Logout</div>}
                </nav>
            </header>
           
            <article className="flex justify-center items-center bg-myLightBlue h-[90vh] w-full" >
                <div className="flex justify-center items-center w-full h-full">
                    {!loggedIn ? <p className="mx-[40px] my-[20px] text-3xl text-black">Nie jesteś zalogowany, zaloguj się aby uzyskać dostęp</p> : <UserInfo name={username} email={email} date={creationDate}/>}
                </div>
            </article >
        </div>
    )
} 