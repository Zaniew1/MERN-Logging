import '../../style.css';
export const UserInfo:React.FC<{name:string, email:string}> = (props):JSX.Element => {
    return (
        <div>
            <p className="home__content__text">{`Witaj  ${props.name}, twój email to: ${props.email} jesteś zalogowany w mojej aplikacji`}</p>
        </div>
    );
} 