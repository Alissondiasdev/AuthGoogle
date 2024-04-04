import React from 'react';
import { Card } from 'antd';
import TwoWheelerIcon from '@mui/icons-material/TwoWheeler';
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import CreateIcon from '@mui/icons-material/Create';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { doc, updateDoc, getFirestore  } from "firebase/firestore";

import { FiMoreVertical } from "react-icons/fi";
import { app } from '../../services/firebaseConfig';

const db = getFirestore(app);

const PreparoOrderCard = ({ data }) => {

    const handleClickTaskIcon = async (dataId) => {
        try {
            const washingtonRef = doc(db, 'pedidos', dataId);
            await updateDoc(washingtonRef, { status: 'Pedido Pronto' });
            console.log('Pedido pronto com sucesso!');
          } catch (error) {
            console.error('Erro ao aprovar o pedido:', error);
          }
        
      };
    return (
        <Card key={data.id}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>

                <TwoWheelerIcon />


                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>

                    <span>{data.num_pedido}</span>
                    <span>11:49</span>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>

                    <span>{data.nome_cliente}</span>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <LocationOnIcon />
                        <span>centro</span>

                    </div>
                </div>

                <div style={{display:'flex'}}>
                    <TaskAltIcon  style={{ color: 'green', cursor:'pointer' }} onClick={()=>handleClickTaskIcon(data.id)} />
                    <CreateIcon style={{  cursor:'pointer' }}/>
                    <FiMoreVertical style={{  cursor:'pointer', fontSize: '24px' }}/>


                </div>



            </div>
        </Card>
    );
};

export default PreparoOrderCard;