export const WelcomeCard = ({name, text}) =>{
    return(
        <div>
            <p>Witaj {name}</p>
            <p>:{text}</p>
            <button>Przejdź do strony</button>
        </div>
    );
}