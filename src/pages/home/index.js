import { useContext } from "react"
import React, { useState, useEffect } from 'react';
import firebase from 'firebase/app'; // Importa apenas o módulo do Firebase necessário
import { AuthGoogleContext } from "../../contexts/authProvider"
import 'firebase/firestore'; // Importa módulo do Firestore do Firebase
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import { app } from "../../services/firebaseConfig";
import MainLayout from "../../componentes/main";

export default function Home() {
    const { user, signOut } = useContext(AuthGoogleContext)

    const [clienteData, setClienteData] = useState(null);


    useEffect(() => {
        const fetchClienteData = async () => {
          if (user) {
            try {
              const db = getFirestore(app);
              const docRef = doc(db, 'clientes', user.uid);
              const docSnap = await getDoc(docRef);
              if (docSnap.exists()) {
                setClienteData(docSnap.data());
                
              } else {
                console.log('Nenhum documento encontrado para este usuário.');
              }
            } catch (error) {
              console.error('Erro ao buscar dados do cliente:', error);
            }
          }
        };
    
        fetchClienteData();
      }, [user]);
    


    return (
        <div>
          
           
            

              {user ? (
                  <div>
                    <MainLayout
                      
                     displayName={user.displayName}
                     photoURL={user.photoURL}
                     clienteNome={user.nome}
                     clienteCPF={user.cpf}
                     planoAderido={user.plano_aderido}
                   />
                    
                    
                    <button onClick={() => signOut()}>sair</button>
                    
                    
                   
                  </div>
                ) : (
                  <button >Login com o Google</button>
                )}
            
        </div>
    )
}


