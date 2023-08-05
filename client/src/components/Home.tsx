import {Link} from 'react-router-dom'
import {UserInfo} from './UserInfo'
import {useState} from 'react'
import '../style.css';
export const Home = ()=>{
    const [loggedin, setLoggedin] = useState<boolean>(false);
    const a = true;
    if(!a){
        setLoggedin(true);
    }
    return (
        <div className="home" >
            <header className="home__header">
                <div  className="home__header__logo">Logging App</div>
                <nav className="home__nav">
                    <Link className="home__nav__link" to={"/login"}>Login</Link>
                </nav>
            </header>
           
            <article className="home__content" >
                <div className="home__content__conatiner">
                    {!loggedin ? <p className="home__content__text">Nie jesteś zalogowany, zaloguj się aby uzyskać dostęp</p> : <UserInfo name={'Mateusz'} email={'abw@wp.pl'}/>}
                </div>
            </article >
        </div>
    )
}