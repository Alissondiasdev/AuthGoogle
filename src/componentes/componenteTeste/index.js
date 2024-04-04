import React from 'react';
import { getFirestore, collection, addDoc } from 'firebase/firestore';
import { app } from '../../services/firebaseConfig';


const db = getFirestore(app);

const enviarDadosParaFirestore = async (flavorCategories) => {
    const db = getFirestore(app);
    
    try {
      // Iterar sobre as categorias de sabor
      for (const category of flavorCategories) {
        // Adicionar categoria à coleção 'categories' no Firestore
        const categoryRef = await addDoc(collection(db, 'flavorCategories'), category);
        console.log("Categoria adicionada com o ID: ", categoryRef.id);
        
        // Iterar sobre os sabores dentro da categoria
        for (const flavor of category.flavors) {
          // Adicionar sabor à coleção 'flavors' no Firestore
          await addDoc(collection(db, 'flavors'), flavor);
          console.log("Sabor adicionado com sucesso!");
        }
      }
      console.log("Todos os dados foram enviados com sucesso para o Firebase Firestore!");
    } catch (error) {
      console.error("Erro ao enviar dados para o Firestore: ", error);
    }
  };

const ComponenteTeste = () => {
    const flavorCategories = [
        {
          "id": 23940,
          "name": "TRADICIONAIS",
          
          "itens": [
            {
              "id": 378541,
              "name": "ALHO FRITO",
              "image": "vkOFWM6G9nXHN7h2VHa4mp1i2L0dkRe8C3tiTerx0BE6scYASE8fXJVPClzfoTKm",
              "pizza_flavor_category_id": 23940,
              "available": 1,
              "description": "Molho especial, mussarela, alho frito, azeitona e orégano",
              
            },
            {
              "id": 378532,
              "name": "BACON & MILHO",
              "image": "ldstjJyVuCf36RKXdOtsIME2ZQ4eiTSxQ2PUBwAawhDS8EWbpyLCeDp3mcx1YqgL",
              "pizza_flavor_category_id": 23940,
              "available": 1,
              "description": "Molho especial, mussarela, bacon, milho, azeitona e orégano",
              
            },
            // Adicione os outros sabores aqui...
          ]
        },
        // Adicione outras categorias aqui...
      ];
    
      // Chamar a função para enviar os dados para o Firestore
      
    
    
      
      
    return (
        <div>
            <button onClick={() => enviarDadosParaFirestore(flavorCategories)}>enviar dados</button>
           
        </div>
    );
};

export default ComponenteTeste;