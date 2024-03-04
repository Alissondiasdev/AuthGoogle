import React, { useContext, useState } from 'react';
import {
  ShoppingOutlined,  
  HomeOutlined,  
  
  LogoutOutlined, // Importe o ícone de logout
} from '@ant-design/icons';
import { Breadcrumb, Layout, Menu, theme } from 'antd';
import RestaurantMenuOutlinedIcon from '@mui/icons-material/RestaurantMenuOutlined';
import { AuthGoogleContext } from '../../contexts/authProvider';
import ProductCard from '../card';
import ComponenteTeste from '../componenteTeste';




const { Header, Content, Footer, Sider } = Layout;

function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}

const MainLayout = ({ displayName, photoURL }) => {
  const { signOut } = useContext(AuthGoogleContext);

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
    getItem('Produtos', 'sub1', <RestaurantMenuOutlinedIcon style={{ fontSize: '16px' }}   />, [
      getItem('Bebidas', '3'),
      getItem('Pizzas Doces', '4'),
      getItem('Pizzas salgadas', '5'),
    ]),
        
    
    {
      key: 'ProductCard',
      icon: <ShoppingOutlined />,
      label: 'Pedidos',
      onClick: () => setActiveKey('ProductCard'),
    },
    {
      key: 'logout',
      icon: <LogoutOutlined />,
      label: 'Sair',
      onClick: handleSignOut,
    },
  ];

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
        <div className="demo-logo-vertical" />
        <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" items={items} />
      </Sider>
      <Layout>
        <Header style={{ padding: 0, background: colorBgContainer }} />
        <Content style={{ margin: '0 16px' }}>
          <Breadcrumb style={{ margin: '16px 0' }}>
            <Breadcrumb.Item>User</Breadcrumb.Item>
            <Breadcrumb.Item>Bill</Breadcrumb.Item>
          </Breadcrumb>
          <div
            style={{
              padding: 24,
              minHeight: 360,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            Bem vindo!!! {displayName}
            
            <img src={photoURL} alt="foto do usuário" />
            <ComponenteTeste/>
            
            
            
            
            {activeKey === 'ProductCard' && <ProductCard />}
            
          

          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>
         
        </Footer>
      </Layout>
    </Layout>
  );
};

export default MainLayout;
