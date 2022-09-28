import React from 'react';
import fullShapeLogo from '../assets/images/Shapepng.svg'
import {Link, Route, Switch} from 'react-router-dom';
import LastInput from './LastInput';
import ContentWrapper from './ContentWrapper'
import LastInputDetail from './LastInputDetail';

function NavBar () {
    return (
        <React.Fragment>
        <div className='navDiv'>
            <img className="logo" src={fullShapeLogo} alt="Full Shape"/>
            <Link className='main' to='/'><i className="fa-solid fa-chart-pie"></i><span>Dashboard - FullShape</span></Link>
            <ul className='pages'>
                <li><Link to='/totals'><i className="fa-solid fa-table"></i><span>Tablas</span></Link></li>
                <li><Link to='/categorytotals'><i className="fa-solid fa-clipboard-list"></i><span>Categorias</span></Link></li>
                <li><Link to='/productslist'><i className="fa-solid fa-list"></i><span>Productos</span></Link></li>
                <li><Link to="/lastinput"><i className="fa-solid fa-chart-column"></i><span>Ultimo ingreso</span></Link></li>
            </ul>
        </div>
            <Switch>
                <Route exact path='/'>
                   <ContentWrapper />
                </Route>
                <Route exact path='/lastinput'>
                   <LastInput />
                </Route>
                <Route path='/lastinput/detail'> 
                <LastInputDetail /> 
                </Route>
            </Switch>  
        </React.Fragment>
    )
}

export default NavBar;