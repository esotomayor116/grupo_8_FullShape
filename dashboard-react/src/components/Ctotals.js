import React from 'react';

function Ctotals (props) {
    let products;
    let count = <li className="totals2">
        Cargando...
    </li>
    if (props.products != undefined) {
        products = props.products
        if (products.countByCategory) {
            count = products.countByCategory.map((category, i) => {
                return <li key={category + i}><div className= 'totals2'>
                    {category}
                </div> 
                </li>
            })
        } 
    }
    return (
        <ul className="totalsDiv">{count}</ul>
    )
}

export default Ctotals;