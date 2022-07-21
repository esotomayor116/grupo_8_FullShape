const express = require('express');
const path = require('path');
const app = express();
const productsRouter = require('./routes/products');
const mainRouter =require('./routes/main');
const usersRouter = require('./routes/users');
const methodOverride =  require('method-override');
const session = require('express-session');
const cookies = require('cookie-parser');
const userLoggedCookie = require('./middlewares/userLoggedCookie');


app.use(express.static(path.join(__dirname, "../public")));

app.use(express.json());
app.use(express.urlencoded());
app.use(methodOverride('_method')); 
app.use(session({
    secret: 'usuario en sesión',
    resave: false,
    saveUninitialized: false
}));
app.use(cookies());
app.use(userLoggedCookie);
app.use('/products', productsRouter);
app.use('/', mainRouter);
app.use('/users', usersRouter);

app.set('view engine', 'ejs');

app.get("/register", (req, res) => {
    res.render("./users/register")
})

app.get("/shoppingcart", (req, res) => {
    res.render("./products/carritoCompras", { user: req.session.userLogged })
})

app.listen(process.env.PORT || 3000, () => {
    console.log("Aplicación iniciada y escuchando en el puerto 3000");
})
