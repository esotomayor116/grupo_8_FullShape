import React from 'react';
import { useState, useEffect} from 'react';

function Tables (props) {
    let products = [];
    let users = [];
    let categories = [];
    if (props.products != undefined && props.users != undefined && props.products.countByCategory != undefined) {
        products = props.products.data;
        users = props.users;
        categories = props.products.countByCategory    
    }
    return (
        <div className='totalsDiv'>
            <div className='totals'><h1>Total de Productos: {products.length}</h1></div>
            <div className='totals'><h1>Total de Usuarios: {users.length}</h1></div>
            <div className='totals'><h1>Total de Categorías: {categories.length}</h1></div>
        </div>

    )
}

export default Tables;