export const UserInfo = (props:{name:string, email:string}) => {
    return (
        <div>
            <p className="home__content__text">{`Witaj  ${props.name}, twój email to: ${props.email} jesteś zalogowany w mojej aplikacji`}</p>
        </div>
    );
} 