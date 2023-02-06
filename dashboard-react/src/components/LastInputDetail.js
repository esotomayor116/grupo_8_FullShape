import React from 'react';

function LastInputDetail (props) {
    let products = [];

    if (props.products != undefined) {
        products = props.products;
    }

    let lastProductName = <p className="totals2">Cargando...</p>;
    let lastProductImage;
    let lastProductDescription;
    let lastProductCode;
    let lastProductUnitPrice;
    let lastProductStatus;
    let lastProductCategory;
    let lastProductColor;
    let lastProductSize;

    if (products.length > 0) {
        lastProductName = <h2>{products[products.length-1].productName}</h2>
        lastProductImage = <img className='imageLP'src={products[products.length-1].productMainImage} alt='productImage'/>
        lastProductDescription= <p className='descriptionLP'>{products[products.length-1].productDescription}</p>
        lastProductCode = <p className='detail1LP'><span>Código universal: </span> {products[products.length-1].productCode}</p>
        lastProductUnitPrice = <p className='detail1LP'><span>Precio Unitario: </span>${products[products.length-1].productUnitPrice}</p>
        lastProductStatus = <p className='detail1LP'><span>Status: </span>{products[products.length-1].status.statusName}</p>
        lastProductCategory = <p className='detail1LP'><span>Categoría: </span>{products[products.length-1].category.categoryName}</p>
        if (products[products.length-1].colors != null) {
            lastProductColor = <p className='detail1LP'><span>Color: </span>{products[products.length-1].colors.colorName}</p>
        }
        if (products[products.length-1].sizes != null) {
            lastProductSize = <p className='detail1LP'><span>Talla: </span>{products[products.length-1].sizes.sizeName}</p>
        }
    }
    
    return (
        <div className='lastProduct'>
            <div className='boxLP'>
                <h1 className='titleLP'>Último producto ingresado</h1>
                {lastProductName}
                {lastProductImage}
                {lastProductDescription}
                {lastProductCode}
                {lastProductUnitPrice}
                {lastProductStatus}
                {lastProductCategory}
                {lastProductColor}
                {lastProductSize}
            </div>
        </div>
    )
}

export default LastInputDetail;