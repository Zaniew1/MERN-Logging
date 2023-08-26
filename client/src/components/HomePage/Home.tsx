import {Link} from 'react-router-dom'
import {UserInfo} from './UserInfo'
import { useContext } from "react";
import {AuthContext} from '../../store/Auth-context'
import '../../style.css';
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
        <div className="home" >
            <header className="home__header">
                <div  className="home__header__logo">Logging App</div>
                <nav className="home__nav">
                    {!loggedIn ? <Link className="home__nav__link" to={"/login"}>Login</Link> : <div className="home__nav__link" onClick={LogoutUser}>Logout</div>}
                </nav>
            </header>
           
            <article className="home__content" >
                <div className="home__content__conatiner">
                    {!loggedIn ? <p className="home__content__text">Nie jesteś zalogowany, zaloguj się aby uzyskać dostęp</p> : <UserInfo name={username} email={email} date={creationDate}/>}
                </div>
            </article >
        </div>
    )
} 