import React from 'react';

function List (props) {

  let products = [];

  if (props.products != undefined) {
    products = props.products;
  }

  let productsList = <li className="totals2">
    Cargando...
  </li>

  if (products.length > 0) {
    productsList = products.map((product, i) => {
      return <li className="listP" key={product + i}>
        <div>{i+1}. {product.productName}</div>
      </li>
    })
  }

  return(<ul className={products.length > 0 ? "products" : "totalsDiv"}>
    {productsList}
  </ul>)
}

export default List;