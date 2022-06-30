const express = require('express');
const path = require('path');
const app = express();
const productsRouter = require('./routes/products');

app.use(express.static(path.join(__dirname, "../public")));
app.use('/products', productsRouter);

app.set('view engine', 'ejs');

app.get("/", (req, res) => {
    res.render("./products/home")
})

app.get("/productdetail", (req, res) => {
    res.render('./products/productDetail');
})

app.get("/shoppingcart", (req, res) => {
    res.render("./products/carritoCompras");
})

app.get("/login", (req, res) => {
    res.render("./users/login")
})

app.get("/register", (req, res) => {
    res.render("./users/register")
})

app.get("/productcreate", (req, res) => {
    res.render("./products/productCreate")
})

app.get("/productedit", (req, res) => {
    res.render("./products/productEdit")
})

app.listen(process.env.PORT || 3000, () => {
    console.log("Aplicación iniciada y escuchando en el puerto 3000");
})
