import React from 'react';
import { useState, useEffect} from 'react';
import {Link} from 'react-router-dom';

function LastInput () {
    const [products, setProducts] = useState([]);
    
    useEffect(() => {
        fetch('http://localhost:3000/api/products')
          .then(response => {return response.json()})
            .then(data => {
                setProducts(data.data)
            })
            .catch(error => console.log(error ))
    }, [])
    
    let lastProductName = <p>Cargando...</p>;
    let lastProductImage = <p>Cargando...</p>;
    let lastProductDescription = <p>Cargando...</p>;
    let lastProductDetail = <p>Cargando...</p>

    if (products.length > 0) {
        lastProductName = <h2>{products[products.length-1].productName}</h2>;
        lastProductImage = <img className='imageLP'src={products[products.length-1].productMainImage} alt='productImage'/>;
        lastProductDescription= <p className='descriptionLP'>{products[products.length-1].productDescription}</p>;
        lastProductDetail = <Link to='/lastinput/detail/'><button className='detailLP'>Ver detalle</button></Link>;
    }
    
    return (
        <div className='lastProduct'>
            <div className='boxLP'>
                <h1 className='titleLP'>Último producto ingresado</h1>
                {lastProductName}
                {lastProductImage}
                {lastProductDescription}
                {lastProductDetail}
            </div>
        </div>
    )
}

export default LastInput;