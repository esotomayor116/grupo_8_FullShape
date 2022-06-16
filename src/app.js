const express = require('express');
const path = require('path');
const app = express();

app.use(express.static(path.join(__dirname, "../public")));

app.set('view engine', 'ejs');
app.set('views', './views')

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

app.listen(process.env.PORT || 3000, () => {
    console.log("Aplicación iniciada y escuchando en el puerto 3000");
})
