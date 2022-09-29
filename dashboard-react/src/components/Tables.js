import React from 'react';
import { useState, useEffect} from 'react';

function Tables (props) {

    const products = props.products.data;
    const users = props.users;
    const categories = props.products.countByCategory

    return (
        <div>
            <h1>{products.length}</h1>
            <h1>{users.length}</h1>
            <h1>{categories.length}</h1>
        </div>

    )
}

export default Tables;