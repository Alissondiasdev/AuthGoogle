import React from 'react';
import { Form, Input, Button, Row, Col, Select, Upload } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

const CadastroProduto = ({ onFinish }) => {
  const normFile = (e) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };
  return (
    <Form name="form_item_path" layout="vertical" onFinish={onFinish}>
      <Form.Item label="Name">
        <Row gutter={16}>
          <Col span={13}>
            <Form.Item
              name={['user', 'firstName']}
              label="Nome"
              rules={[{ required: true, message: 'Please enter your first name' }]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={5}>
            <Form.Item
              name={['user', 'lastName']}
              label="Código"
              rules={[{ required: true, message: 'Please enter your last name' }]}
            >
              <Input />
            </Form.Item>

          </Col>

          <Col span={5}>
            <Form.Item
              name={['user', 'lastName']}
              label="Código Externo"
              rules={[{ required: true, message: 'Please enter your last name' }]}
            >
              <Input />
            </Form.Item>

          </Col>


        </Row>
        <Form.Item rules={[{ required: true, message: 'Please enter your last name' }]} name={['user', 'introduction']} label="Descrição">
          <Input.TextArea />
        </Form.Item>
        <Row gutter={16}>

          <Col span={5}>
            <Form.Item
              name={['user', 'lastName']}
              label="Categoria"
              rules={[{ required: true, message: 'Please enter your last name' }]}
            >

              <Select >
                <Select.Option value="1">1</Select.Option>
                <Select.Option value="2">2</Select.Option>
                <Select.Option value="3">3</Select.Option>
              </Select>
            </Form.Item>

          </Col>
          <Form.Item label="Carregue a imagem" valuePropName="fileList" getValueFromEvent={normFile}>
          <Upload action="/upload.do" listType="picture-card">
            <button
              style={{
                border: 0,
                background: 'none',
              }}
              type="button"
            >
              <PlusOutlined />
              <div
                style={{
                  marginTop: 8,
                }}
              >
                (500x500)
              </div>
            </button>
          </Upload>
        </Form.Item>

         


        </Row>
      </Form.Item>



      <div style={{display:'flex', gap: 10, justifyContent:'flex-end'}}>
        <Button type="primary" htmlType="submit">
          Cancelar
        </Button>
        <Button type="primary" htmlType="submit">
          Salvar
        </Button>
      </div>
    </Form>
  );
};

export default CadastroProduto;
