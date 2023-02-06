import NavBar from './components/NavBar';
import { useState, useEffect } from 'react';
import { Switch, Route } from 'react-router-dom';
import LastInput from './components/LastInput';
import LastInputDetail from './components/LastInputDetail';
import Tables from './components/Tables';
import CTotals from './components/CTotals';
import List from './components/List';

function App() {

  const [products, setProducts] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3000/api/products')
      .then(response => { return response.json() })
        .then(data => {
          setProducts(data);
        })
        .catch(error => console.log(error));

    fetch('http://localhost:3000/api/users')
    .then(response => { return response.json() })
      .then(data => {
        setUsers(data);
      })
      .catch(error => console.log(error));
  }, [])

  return (
    <div className="App">
      <NavBar />
    
      <Switch>
        <Route exact path="/">
          <Tables products={products} users={users.data}/>
          <CTotals products={products}/>
          <List products={products.data}/>
          <LastInput products={products.data}/>
        </Route>
        <Route exact path="/lastinput">
          <LastInput products={products.data}/>
        </Route>
        <Route path="/lastinput/detail">
          <LastInputDetail products={products.data}/>
        </Route>
        <Route path="/totals">
          <Tables products={products} users={users.data}/>
        </Route>
        <Route path="/categorytotals">
          <CTotals products={products}/>
        </Route>
        <Route path="/productslist">
          <List products={products.data}/>
        </Route> 
      </Switch>
    </div>
  );
}

export default App;
