import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthGoogleContext } from "../../contexts/authGoogle";
import GoogleButton from 'react-google-button'

export default function Login() {

  const { signInGoogle, signed } = useContext(AuthGoogleContext);

  async function handleLoginFromGoogle() {
    await signInGoogle();
  }
  if (!signed) {
    return <div>
      
      <GoogleButton
      label="Logar com sua conta Google"
      onClick={() => { handleLoginFromGoogle() }}
    />
      
    </div> 
    
  } else {
    return <Navigate to="/Home" />;
  }
};