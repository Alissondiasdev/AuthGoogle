import { useContext } from "react"
import { AuthGoogleContext } from "../../contexts/authGoogle"

export default function Home() {
    const { user, signOut } = useContext(AuthGoogleContext)
    


    return (
        <div>
            <h1>Bem vindo: {user.displayName}</h1>
            <img src={user.photoURL} alt="foto de perfil do usuario" />

            <button onClick={() => signOut()}>sair</button>
        </div>
    )
}
