import React from 'react';

function List (props) {
    let productsList;
    if (props.products != undefined) {
        const products = props.products
    productsList = products.map(product => {
        
        return <li className='listP'>
           <div>{product.productName}</div> 
        </li>
        })
    }
    
    return (<ul className='products'>
                {productsList}
            </ul>)
    
    
}

export default List;