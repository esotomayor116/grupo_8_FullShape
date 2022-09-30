import React from 'react';

function List (props) {
    const products = props.products
    const productsList = products.map(product => {
        
        return <li>
            {product.productName}
        </li>
    })
    return (<ul>
                {productsList}
            </ul>)
    
    
}

export default List;