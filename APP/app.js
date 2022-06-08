const express = require('express');
const path = require('path');
const app = express();

app.use(express.static("public"));

app.get("/productdetail", (req, res) => {
    res.sendFile(path.join(__dirname, "/views/productDetail.html"));
})

app.get("/login", (req, res) => {
    res.sendFile(path.join(__dirname, "/views/login.html"));
})

app.get("/register", (req, res) => {
    res.sendFile(path.join(__dirname, "/views/register.html"));
})

app.get("/shoppingcart", (req, res) => {
    res.sendFile(path.join(__dirname, "/views/CarritoCompras.html"));
})

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "/views/home.html"));
})

app.listen(3000, () => {
    console.log("Aplicación iniciada y escuchando en el puerto 3000");
})