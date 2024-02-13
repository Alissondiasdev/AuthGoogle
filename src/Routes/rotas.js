import { Routes, Route} from 'react-router-dom'
import Login from '../pages/login';
import Home from '../pages/home';
import Cadastro from '../pages/cadastro';
import PrivateRoutes from '.';
import { Fragment } from 'react';

const Rotas = () => {
    return ( 
       
        <Routes>
            <Fragment>
            <Route path='/' element={<Login/>}/>
            <Route path='/home' element={<PrivateRoutes/>}>
            <Route path='/home' element={<Home/>}/>
            </Route>
            <Route path='/cadastro' element={<Cadastro/>}/>
            </Fragment>
        </Routes>
        
     );
}
 
export default Rotas;