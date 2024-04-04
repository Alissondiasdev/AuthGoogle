import React from 'react';
import { Card, Col, Row, Skeleton } from 'antd';
import OrdersCard from '../ordersCard';

import ElectricMopedIcon from '@mui/icons-material/ElectricMoped';
import ZoomInIcon from '@mui/icons-material/ElectricMoped';
import ModeIcon from '@mui/icons-material/ElectricMoped';


import { getFirestore, collection, query,  getDocs,  } from "firebase/firestore";

import { useState, useEffect } from 'react';
import { app } from '../../services/firebaseConfig';
import PreparoOrderCard from '../preparoOrderCard';

const db = getFirestore(app);

const ProductCard = () => {

  const [loading, setLoading] = useState(true);
  const [pedidos, setPedidos] = useState([]);
  const [pedidoSelecionado, setPedidoSelecionado] = useState([{}]);
  const [clienteSelecionado, setClienteSelecionado] = useState(null);

  const listaPendente = pedidos.filter((pedidos) => pedidos.status === 'pendente');
  const listaPreparando = pedidos.filter((pedidos) => pedidos.status === 'Pedido em Preparo');
  const listaFinalizado = pedidos.filter((pedidos) => pedidos.status === 'Pedido Pronto');




  async function fetchPedidos() {
    try {
      const pedidosQuery = query(collection(db, 'pedidos'),);
      const pedidosSnapshot = await getDocs(pedidosQuery);
      const pedidosData = pedidosSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setPedidos(pedidosData);
      setLoading(false);


      console.log(pedidosData);

    } catch (error) {
      console.error('Erro ao buscar clientes:', error);
    }
  }
  
  /*key={pedidos.id} onClick={() => { handleOpenModal(pedidos.id, pedidos); setOpen(!open); }}*/


  useEffect(() => {
    fetchPedidos(); // Busca os clientes ao montar o componente
  }, []);



  return (
    <Row gutter={16}>
      <Col span={8}>
        <Card title="NOVOS PEDIDOS" bordered={false}>
          {loading ? (
            <Skeleton />
          ) : (
            listaPendente.map((item) => (
              <OrdersCard data={item} />
            ))
          )}
        </Card>
      </Col>
      <Col span={8}>
        <Card title="PEDIDOS EM PREPARO" bordered={false}>
          {loading ? (
            <Skeleton />
          ) : (
            listaPreparando.map((item) => (
              <PreparoOrderCard data={item} />
            ))
          )}
        </Card>
      </Col>
      <Col span={8}>
        <Card title="PEDIDOS EM TRANSPORTE - PRONTO PARA RETIRADA" bordered={true}>
        {loading ? (
            <Skeleton />
          ) : (
            listaFinalizado.map((item) => (
              <PreparoOrderCard data={item} />
            ))
          )}
        </Card>
      </Col>
    </Row>
  );
};

export default ProductCard;