import React, { useEffect, useState } from 'react';
import { Space, Table, Tag, Button, Input, Select } from 'antd'; // Importe o Button do Ant Design
import { getFirestore, collection, query, getDocs } from "firebase/firestore";
import { app } from '../../services/firebaseConfig';
import CadastroProduto from '../CadastroProduto';

const OPTIONS = ['Apples', 'Nails', 'Bananas', 'Helicopters'];


const db = getFirestore(app);

const Produtos = () => {
  const [produtos, setProdutos] = useState([]);
  const [showNewProductForm, setShowNewProductForm] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);
  const filteredOptions = OPTIONS.filter((o) => !selectedItems.includes(o));

  useEffect(() => {
    async function fetchProdutos() {
      try {
        const produtosQuery = query(collection(db, 'flavorCategories'));
        const produtosSnapshot = await getDocs(produtosQuery);
        const produtosData = [];


        produtosSnapshot.forEach(doc => {
          const data = doc.data();
          const itens = data.itens.map(item => ({
            key: item.id.toString(),
            name: item.name,
            address: '', // Adicione o endereço aqui se necessário
          }));
          produtosData.push(...itens);
        });

        setProdutos(produtosData);
      } catch (error) {
        console.error('Erro ao buscar produtos:', error);
      }
    }

    fetchProdutos();
  }, []);
  const handleNewProductClick = () => {
    setShowNewProductForm(true);
  };

  const columns = [
    {
      title: 'Produto',
      dataIndex: 'name',
      key: 'name',
      render: (text) => <a>{text}</a>,
    },

    {
      title: 'Estoque',
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: 'Preço',
      dataIndex: 'address',
      key: 'address',
    },

    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <a>Editar</a>
          <a>Deletar</a>
        </Space>
      ),
    },
  ];

  if (showNewProductForm) {
    return (
      <CadastroProduto/>
    );
      
      
    
  } else {
    return (
      <>
      
        
    
    <Button onClick={handleNewProductClick} style={{ marginBottom: '15px' }} type="primary">Novo Produto</Button>
    <div>

      <div style={{ display: 'flex', gap: 50 }}>
        <Input placeholder="Buscar" style={{ width: '100%', marginBottom: '15px' }} />
        <Select
          mode="multiple"
          placeholder="Filtre por categoria"
          value={selectedItems}
          onChange={setSelectedItems}
          style={{
            width: '50%',
            height: '70%',
          }}
          options={filteredOptions.map((item) => ({
            value: item,
            label: item,
          }))}
        />


        <Button style={{ marginBottom: '15px' }} type="primary">Buscar</Button>
      </div>



      <Table columns={columns} dataSource={produtos} />
    </div>
  </>

    )
  }


  
};

export default Produtos;
