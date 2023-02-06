import React from 'react';
import {Link} from 'react-router-dom';


function LastInput (props) {
    let products = [];
    if (props.products != undefined) {
        products = props.products;
    }
    let lastProductName;
    let lastProductImage;
    let lastProductDescription;
    let lastProductDetail;

    if (products.length > 0) {
        lastProductName = <h2>{products[products.length-1].productName}</h2>;
        lastProductImage = <img className='imageLP'src={products[products.length-1].productMainImage} alt='productImage'/>;
        lastProductDescription= <p className='descriptionLP'>{products[products.length-1].productDescription}</p>;
        lastProductDetail = <Link to='/lastinput/detail/'><button className='detailLP'>Ver detalle</button></Link>;
    }
    
    return (
        <>
            {products.length > 0 &&  <div className='lastProduct'>
                <div className='boxLP'>
                    <h1 className='titleLP'>Último producto ingresado</h1>
                    {lastProductName}
                    {lastProductImage}
                    {lastProductDescription}
                    {lastProductDetail}
                </div>
            </div>}
           {products.length == 0 &&
            <ul className="totalsDiv">
                <li className="totals2">Cargando...</li>
            </ul>
           }
        </>
    )
}

export default LastInput;