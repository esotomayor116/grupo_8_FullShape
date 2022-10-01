import React from 'react';
import { useState, useEffect} from 'react';

function Tables (props) {

    const products = props.products.data;
    const users = props.users;
    const categories = props.products.countByCategory

    return (
        <div className='totalsDiv'>
            <div className='totals'><h1>Total de Productos: {products.length}</h1></div>
            <div className='totals'><h1>Total de Usuarios: {users.length}</h1></div>
            <div className='totals'><h1>Total de Categorías: {categories.length}</h1></div>
        </div>

    )
}

export default Tables;