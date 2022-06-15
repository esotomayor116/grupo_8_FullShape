const express = require('express');
const path = require('path');
const app = express();

app.use(express.static("public"));

app.get("/productdetail", (req, res) => {
    res.sendFile(path.join(__dirname, "/views/products/productDetail.html"));
})

app.get("/login", (req, res) => {
    res.sendFile(path.join(__dirname, "/views/users/login.html"));
})

app.get("/register", (req, res) => {
    res.sendFile(path.join(__dirname, "/views/users/register.html"));
})

app.get("/shoppingcart", (req, res) => {
    res.sendFile(path.join(__dirname, "/views/products/carritoCompras.html"));
})

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "/views/products/home.html"));
})

app.listen(process.env.PORT || 3000, () => {
    console.log("Aplicación iniciada y escuchando en el puerto 3000");
})
