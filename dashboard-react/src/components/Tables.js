import React from 'react';

function Tables (props) {
    let products = [];
    let users = [];
    let categories = [];

    if (props.products != undefined && props.users != undefined) {
        products = props.products.data;
        users = props.users;
        categories = props.products.countByCategory    
    }

    let productsTotal = <div className='totals'><h1>Cargando...</h1></div>;
    let usersTotal = <div className='totals'><h1>Cargando...</h1></div>;
    let categoriesTotal = <div className='totals'><h1>Cargando...</h1></div>;

    if (products.length > 0 && users.length > 0) {
        productsTotal = <div className='totals'><h1>Total de Productos: {products.length}</h1></div>;
        usersTotal = <div className='totals'><h1>Total de Usuarios: {users.length}</h1></div>;
        categoriesTotal = <div className='totals'><h1>Total de Categorias: {categories.length}</h1></div>;
    }

    return (
        <div className="totalsDiv">
            {productsTotal}
            {usersTotal}
            {categoriesTotal}
        </div>
    )
}

export default Tables;