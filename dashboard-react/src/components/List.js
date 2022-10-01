import React from 'react';

function List (props) {
    const products = props.products
    const productsList = products.map(product => {
        
        return <li className='listP'>
           <div>{product.productName}</div> 
        </li>
    })
    return (<ul className='products'>
                {productsList}
            </ul>)
    
    
}

export default List;