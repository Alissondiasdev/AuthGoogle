
import { Card } from 'antd';
import ElectricMopedIcon from '@mui/icons-material/ElectricMoped';
import ZoomInIcon from '@mui/icons-material/ElectricMoped';
import ModeIcon from '@mui/icons-material/ElectricMoped';


import { getFirestore, collection, query, where, getDocs, addDoc } from "firebase/firestore";
import OrderModal from '../modal';
import {  useState, useEffect } from 'react';
import { app } from '../../services/firebaseConfig';


const db = getFirestore(app);


const OrdersCard = () => {
  

const [open, setOpen] = useState(false);
const [clientes, setClientes] = useState([]);
const [pedidoSelecionado, setPedidoSelecionado] = useState([{}]);
const [clienteSelecionado, setClienteSelecionado] = useState(null);



/*const handleBuscarPedidos = async () => {
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
  };*/

  async function fetchClientes(idCliente) {
    try {
      const clientesQuery = query(collection(db, 'clientes'), );
      const clientesSnapshot = await getDocs(clientesQuery);
      const clientesData = clientesSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setClientes(clientesData);
      
    } catch (error) {
      console.error('Erro ao buscar clientes:', error);
    }
  }

  const handleOpenModal = async (idCliente , clienteData) => {
    try {
      const pedidosQuery = query(collection(db, 'pedidos'), where('id_cliente', '==', idCliente));
      const pedidosSnapshot = await getDocs(pedidosQuery);
      const pedidosData = pedidosSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

      setClienteSelecionado(clienteData);
      setPedidoSelecionado(pedidosData);
      console.log(clienteSelecionado)
      
      
    } catch (error) {
      console.error('Erro ao buscar pedidos:', error);
    }
  };


  
 
  useEffect(() => {
    fetchClientes(); // Busca os clientes ao montar o componente
  }, []);

  

 
  

  return (
    <>
    {clientes.map(cliente => (
      
      <Card key={cliente.id}  onClick={() => { handleOpenModal(cliente.id, cliente); setOpen(!open); }}>
          {pedidoSelecionado && (
        <OrderModal
          visible={open}
          onOk={() => setOpen(false)}
          onCancel={() => setOpen(false)}
          pedidos={pedidoSelecionado}
         
          clientes={clienteSelecionado}
        />
      )}
          
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center', width: 150, justifyContent: 'space-between' }}>
              <ElectricMopedIcon />
              <p>16:30</p>
              <p>{cliente.nome}</p>
            </div>
            <div>
              <ZoomInIcon />
              <ModeIcon />
            </div>
          </div>
        </Card>
      ))}
      
        
      
     
    </>
  );
};

export default OrdersCard;
