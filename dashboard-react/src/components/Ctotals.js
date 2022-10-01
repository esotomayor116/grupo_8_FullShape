import React from 'react';

function Ctotals (props) {
    const products = props.products
    const count = products.countByCategory.map((category, i) => {
        return <li key={category + i}><div className= 'totals2'>
            {category}
        </div> 
        </li>
    })
    return (
        <ul className= 'totalsDiv'>{count}</ul>
    )
}

export default Ctotals;