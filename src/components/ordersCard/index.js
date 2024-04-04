import React, { useState } from 'react';
import { Card, Col, Row } from 'antd';
import ElectricMopedIcon from '@mui/icons-material/ElectricMoped';
import TwoWheelerIcon from '@mui/icons-material/TwoWheeler';
import ModeIcon from '@mui/icons-material/ElectricMoped';
import ZoomInIcon from '@mui/icons-material/ZoomIn';
import EditIcon from '@mui/icons-material/Edit';

import OrderModal from '../modal';



const OrdersCard = ({ data }) => {


  const [pedidoSelecionado, setPedidoSelecionado] = useState([{}]);



  const [open, setOpen] = useState(false);
  console.log(open)




  const aprovarPedido = (data) => {
    setPedidoSelecionado(data);
  }



  return (
    <>
      <Card style={{ cursor: 'pointer' }} key={data.id} onClick={() => { aprovarPedido(data); setOpen(!open) }}>

        <OrderModal data={data} visible={open} onOk={() => setOpen(false)} onCancel={() => setOpen(false)} />

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <TwoWheelerIcon style={{ marginRight: '10px' }}/>
            <p style={{ marginRight: '10px' }}>{data.num_pedido}</p> {/* Adicionando espaço entre os ícones e o texto */}
            <p>{data.nome_cliente}</p>
          </div>
          <div>
            <ZoomInIcon />
            <EditIcon />

          </div>
        </div>
      </Card>

    </>
  );
};
export default OrdersCard;

