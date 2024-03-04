
import React, { useState } from 'react';
import { app } from '../../services/firebaseConfig';
import { getFirestore, collection, query, where, getDocs, addDoc } from "firebase/firestore";

const db = getFirestore(app);
const ComponenteTeste = () => {
  const idCliente = "9ds8rZgDDVl9QePTVWps";

// Suponha que você tenha informações sobre o pedido
const novoPedido = {
  itens: ["Hamburgues", "coca lata", "batata frita"],
  status: "pendente",
  total: 50.00,
  data_pedido: new Date()
};



const [nomeCliente, setNomeCliente] = useState('laura rocha');
const [pedidos, setPedidos] = useState([]);

const handleBuscarPedidos = async () => {
    try {
        const clienteQuery = query(collection(db, 'clientes'), where('nome', '==', nomeCliente));
        const clienteSnapshot = await getDocs(clienteQuery);
        
        
  
        if (!clienteSnapshot.empty) {
          const clienteDoc = clienteSnapshot.docs[0];
          const idCliente = clienteDoc.id;
          const nomeCliente = clienteDoc.data().nome;
          console.log('Cliente:', nomeCliente);
          
          
          
  
          const pedidosQuery = query(collection(db, 'pedidos'), where('id_cliente', '==', idCliente));
          
          const pedidosSnapshot = await getDocs(pedidosQuery);
         
          
          const pedidosData = pedidosSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
          console.log('Pedidos do Cliente:', pedidosData);
          
          setPedidos(pedidosData);
         
          
        } else {
          setPedidos([]);
        }
      } catch (error) {
        console.error('Erro ao buscar pedidos:', error);
      }
    };

// Adicione o novo pedido ao Firestore
const addPedido = async () => {
  try {
    const docRef = await addDoc(collection(db, "pedidos"), {
      id_cliente: idCliente,
      ...novoPedido
    });
    console.log("Pedido adicionado com ID: ", docRef.id);
  } catch (error) {
    console.error("Erro ao adicionar pedido: ", error);
  }
};


  return (
    <div>
      <button onClick={addPedido}>testar</button>
      <button onClick={handleBuscarPedidos}>Buscar pedidos</button>
      
    </div>
  );
};


export default ComponenteTeste;
