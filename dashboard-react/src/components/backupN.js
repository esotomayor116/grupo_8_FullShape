import React from 'react';
import fullShapeLogo from '../assets/images/Shapepng.svg'
import {Link, Route, Switch} from 'react-router-dom';
import LastInput from './LastInput';
import ContentWrapper from './ContentWrapper'
import LastInputDetail from './LastInputDetail';
import Tables from './Tables'
import {useState, useEffect} from 'react';

function NavBar () {

const [products, setProducts] = useState([]);
const [users, setUsers] = useState([]);
    
    useEffect(() => {
        fetch('http://localhost:3000/api/products')
        .then(response => {return response.json()})
            .then(data => {
                setProducts(data)
            })
            .catch(error => console.log(error ))

        fetch('http://localhost:3000/api/users')
        .then(response => {return response.json()})
            .then(data => {
                setUsers(data.data)
            })
            .catch(error => console.log(error ))

    }, [])

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
                   <LastInput products = {products.data}/>
                </Route>
                <Route path='/lastinput/detail'> 
                <LastInputDetail products = {products.data}/> 
                </Route>
                <Route path='/totals'> 
                <Tables products = {products} users = {users}/> 
                </Route>
                <Route path='/totals'> 
                <Tables products = {products} users = {users}/> 
                </Route>
            </Switch>  
        </React.Fragment>
    )
}

export default NavBar;
