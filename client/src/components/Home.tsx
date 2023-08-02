import {Link} from 'react-router-dom'
import '../style.css';
export const Home = ()=>{
    return (
        <div className="home" >
            <header className="home__header">
                <div  className="home__header__logo">Logo</div>
                <nav className="home__nav">
                    <Link className="home__nav__link" to={"/login"}>Login/Register</Link>
                </nav>
            </header>
           
            <article className="home__content" >

            </article >
        </div>
    )
}