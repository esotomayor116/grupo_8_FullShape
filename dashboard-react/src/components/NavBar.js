import React from 'react';
import { Link } from 'react-router-dom';
import fullShapeLogo from '../assets/images/Shapepng.svg';

function NavBar () {
  return (
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
  )
}

export default NavBar;
