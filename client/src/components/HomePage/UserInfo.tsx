import '../../index.css';
export const UserInfo:React.FC<{name:string, email:string, date:number}> = (props):JSX.Element => {
    const formattedDate = new Date(props.date).toLocaleString();
    return (
        <div>
            <p className="mx-[40px] my-[20px] text-3xl text-black ">{`Witaj  ${props.name}, twój email to: ${props.email}. Jesteś zalogowany w mojej aplikacji. Konto zostało stworzone: ${formattedDate}`}</p>
        </div>
    );
} 