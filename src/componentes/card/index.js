import React from 'react';
import { Card, Col, Row } from 'antd';
import OrdersCard from '../ordersCard';

const ProductCard = () => {
  

  return (
    <Row gutter={16}>
      <Col span={8}>
        <Card title="NOVOS PEDIDOS" bordered={false}>
          <OrdersCard />
        </Card>
      </Col>
      <Col span={8}>
        <Card title="PEDIDOS EM PREPARO" bordered={false}>
          Card content
        </Card>
      </Col>
      <Col span={8}>
        <Card title="PEDIDOS EM TRANSPORTE - PRONTO PARA RETIRADA" bordered={true}>
          Card content
        </Card>
      </Col>
    </Row>
  );
};

export default ProductCard;