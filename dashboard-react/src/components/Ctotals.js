import React from 'react';

function Ctotals (props) {
    const products = props.products
    const count = products.countByCategory.map(category => {
        return <li><div className= 'total'>
            {category}
        </div> 
        </li>
    })
    return (
        <ul>{count}</ul>
    )
}

export default Ctotals;