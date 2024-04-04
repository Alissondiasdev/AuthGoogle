import React, { useEffect } from 'react';
import { message } from 'antd';

const Menssagem = () => {
  useEffect(() => {
    const timer = setTimeout(() => {
      message.success({
        content: 'Pedido Aprovado com Sucesso!',
        duration: 5,
      });
    }, 0); // Definindo um pequeno atraso para garantir que a mensagem seja exibida após a renderização completa do componente
    return () => clearTimeout(timer); // Limpar o timer quando o componente for desmontado
  }, []);

  return null;
};

export default Menssagem;
