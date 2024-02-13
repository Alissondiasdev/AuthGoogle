import React, { createContext, useEffect, useState } from 'react';
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { app } from '../services/firebaseConfig';
import { Navigate } from 'react-router-dom';

const provider = new GoogleAuthProvider();

export const AuthGoogleContext = createContext({});

export default function AuthGoogleProvider({ children }) {
  const auth = getAuth(app);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const loadStoreAuth = () => {

      const sessionToken = sessionStorage.getItem("@AuthFirebase:token")
      const sessionUser = sessionStorage.getItem("@AuthFirebase:user")
      if (sessionToken && sessionUser) {
        setUser(sessionUser)
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
        signOut

      }}
    >
      {children}
    </AuthGoogleContext.Provider>
  );

}
