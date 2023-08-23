import '../../style.css';
export const UserInfo:React.FC<{name:string, email:string, date:number}> = (props):JSX.Element => {
    const formattedDate = new Date(props.date).toLocaleString();
    return (
        <div>
            <p className="home__content__text">{`Witaj  ${props.name}, twój email to: ${props.email}. Jesteś zalogowany w mojej aplikacji. Konto zostało stworzone: ${formattedDate}`}</p>
        </div>
    );
} 