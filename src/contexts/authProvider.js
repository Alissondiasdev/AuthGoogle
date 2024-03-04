import React, { createContext, useEffect, useState } from 'react';
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { app } from '../services/firebaseConfig';
import {  signInWithEmailAndPassword } from "firebase/auth";
import { Navigate, useNavigate } from 'react-router-dom';

const provider = new GoogleAuthProvider();

export const AuthGoogleContext = createContext({});

export default function AuthGoogleProvider({ children }) {
  const auth = getAuth(app);
  const [user, setUser] = useState(null);

  

  

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    const loadStoreAuth = () => {

      const sessionToken = sessionStorage.getItem("@AuthFirebase:token")
      const sessionUser = sessionStorage.getItem("@AuthFirebase:user")
      if (sessionToken && sessionUser) {
        setUser(sessionUser)
       
        console.log(user)
      }

    }
    loadStoreAuth()

  }, [])


 

  const signInGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      const user = result.user;
      console.log(user)
      setUser(user);

      
      sessionStorage.setItem("@AuthFirebase:token", token);
      sessionStorage.setItem("@AuthFirebase:user", JSON.stringify(user));


    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      const email = error.customData.email;
      const credential = GoogleAuthProvider.credentialFromError(error);
    }
  };

  

  const login = () => {

    signInWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    
    const user = userCredential.user;
    setUser(user);
    
    sessionStorage.setItem("@AuthFirebase:user", JSON.stringify(user));
    
    
      

    
    
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
  });
    
  }



  function signOut() {
    sessionStorage.clear();
    setUser(null);
    return <Navigate to="/" />;
  }
  return (

    <AuthGoogleContext.Provider
      value={{
        signed: !!user,
        
        user,
        signInGoogle,
        signOut,
        email,
        setEmail,
        password,
        setPassword,
        login,
        signOut
        

      }}
    >
      {children}
    </AuthGoogleContext.Provider>
  );

}
