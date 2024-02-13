import React, { useContext } from 'react'
import { AuthGoogleContext } from '../contexts/authGoogle'
import { Navigate, Outlet } from 'react-router-dom'

export default function PrivateRoutes() {

    const {signed} = useContext(AuthGoogleContext)
// condição se o usuário estiver logado eu quero que meus
//componentes filhos das rotas tenha acesso a autenticação
  return signed ? <Outlet/> : <Navigate to="/"/>
  
}
