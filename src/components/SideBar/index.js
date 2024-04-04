import React, { useContext, useState } from 'react';
import {
  ShoppingOutlined,
  HomeOutlined,

  LogoutOutlined, // Importe o ícone de logout
} from '@ant-design/icons';
import { Breadcrumb, Button, Input, Layout, Menu, theme } from 'antd';
import RestaurantMenuOutlinedIcon from '@mui/icons-material/RestaurantMenuOutlined';
import { AuthGoogleContext } from '../../contexts/authProvider';
import ProductCard from '../Card';
import Produtos from '../produtos';
import ComponenteTeste from '../componenteTeste';
import OrderModal from '../modal';

const { Header, Content, Footer, Sider } = Layout;

function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}

const SideBar = ({ displayName, photoURL }) => {
  const { signOut } = useContext(AuthGoogleContext);

  const [open, setOpen] = useState(true);

  const [collapsed, setCollapsed] = useState(false);

  const [activeKey, setActiveKey] = useState('1');

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  // Defina a função de logout dentro do componente
  const handleSignOut = () => {
    signOut();
  };

  const items = [
    {
      key: 'home',
      icon: <HomeOutlined />,
      label: 'Home',
      onClick: () => setActiveKey('home'),
    },
    getItem('Produtos', 'sub1', <RestaurantMenuOutlinedIcon style={{ fontSize: '16px' }} />, [
      getItem('Gerenciar Produtos', '1'),
      getItem('Bebidas', '2'),
      getItem('Pizzas Doces', '3'),
      getItem('Pizzas salgadas', '4'),
    ]),

    getItem('Cadastro', 'sub2', <RestaurantMenuOutlinedIcon style={{ fontSize: '16px' }} />, [
      {
        key: 'Produtos1',
        icon: <ShoppingOutlined />,
        label: 'Produtos1',
        onClick: () => setActiveKey('Produtos1'),
      },
      getItem('Clientes', '2'),
    ]),
    // CHAVES
    {
      key: 'Gerenciar',
      icon: <ShoppingOutlined />,
      label: 'Gerenciar',
      onClick: () => setActiveKey('Gerenciar'),
    },
    {
      key: 'ProductCard',
      icon: <ShoppingOutlined />,
      label: 'Pedidos',
      onClick: () => setActiveKey('ProductCard'),
    },
    {
      key: 'Produtos',
      icon: <ShoppingOutlined />,
      label: 'Produtos',
      onClick: () => setActiveKey('Produtos'),
    },

    {
      key: 'logout',
      icon: <LogoutOutlined />,
      label: 'Sair',
      onClick: handleSignOut,
    },
  ];

  return (
    <>
      <Layout style={{ minHeight: '100vh' }}>
        <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)} >
          <div className="demo-logo-vertical" />
          <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" items={items} />
        </Sider>
        <Layout>
          <Content style={{ margin: '0 16px' }}>
            <div
              style={{
                padding: 24,
                minHeight: 360,
                background: colorBgContainer,
                borderRadius: borderRadiusLG,
              }}
            >
              {activeKey === 'Gerenciar' && <Produtos />}
              {activeKey === 'ProductCard' && <ProductCard />}
              {activeKey === 'Produtos' && <Produtos />}
              <ComponenteTeste />
            </div>
          </Content> 
          <Footer style={{ textAlign: 'center' }}>
          </Footer>
        </Layout>
      </Layout>
    </>
  );
};

export default SideBar;
