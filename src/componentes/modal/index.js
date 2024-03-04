import React, { useState } from 'react';
import { Button, Modal } from 'antd';




const OrderModal = ({ onOk, visible, onCancel, pedidos, clientes }) => {
  
  if (!clientes) {
    return <div>Cliente inválido</div>;
  }

  return (
    <>



      <Modal
        title="Pedido Online - Aprovar ou Reprovar"
        centered

        open={visible}
        onOk={onOk}
        onCancel={onCancel}
        width={1000}
        okText={'APROVAR PEDIDO'}
        cancelText={'REPROVAR PEDIDO'}
        okButtonProps={{ style: { backgroundColor: '#52c41a', borderColor: '#52c41a' } }}
        cancelButtonProps={{ style: { backgroundColor: '#ff4d4f', borderColor: '#ff4d4f' } }}

      >

        <ul style={{ listStyleType: 'none', display: 'flex', justifyContent: 'space-between' }}>
          <li style={{ border: '1px solid #ccc', padding: '8px', cursor: 'pointer' }} >VISUALIZAÇÃO PEDIDO</li>
          <li style={{ border: '1px solid #ccc', padding: '8px', cursor: 'pointer' }} >HISTÓRICO DE EDIÇÕES</li>
          <li style={{ border: '1px solid #ccc', padding: '8px', cursor: 'pointer' }} >HISTÓRICO DO CLIENTE</li>
        </ul>
        <div style={{ boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)', padding: '20px' }}>
          <div style={{ display: 'flex', justifyContent: "space-between", }}>

            <h2>N° 6145255</h2>
            <h2>Registrado às 16:13:56</h2>
          </div>

          
                
          <div   style={{ display: 'flex', flexDirection: 'column' }}>
            <span>Forma de entrega: Entrega em domicilio</span>
            <span>Cliente: {clientes.nome}</span>
            <span>Telefone:{clientes.telefone} </span>
            <span>Endereço: Av. brasilia, 279 bloco 7 AP 108 centro eusébio</span>
            <span>Email: alissondias120894@gmail.com</span>

          </div>
             
          
                
              


        </div>

        <div style={{ boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)', padding: '20px' }}>
         
            
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>ITEM</span>
                <span>QTD</span>
                <span>TOTAL</span>
              </div>
            
            
              {pedidos && pedidos.map((item, index) => (
                <div key={index} style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ textAlign: 'center', wordWrap: 'break-word', maxWidth: '200px' }}>
                    {item.itens}
                  </span>
                  <span >2</span>
                  <span >R$ 50,00</span>
                </div>
              ))}

            

        </div>
        <div style={{ boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)', padding: '20px', display: "flex", justifyContent: 'space-between' }}>
          <span>taxa de entrega</span>
          <span>5,00</span>
          <span>Desconto</span>
          <span>R$ 38,96</span>
          <span>Total do Pedido</span>
          <span>R$ 16,79</span>


        </div>

        


      </Modal>

    </>
  );
};
export default OrderModal;