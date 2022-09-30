const express = require('express');
const path = require('path');
const app = express();
const productsRouter = require('./routes/products');
const productsApiRouter = require('./routes/api/products');
const mainRouter =require('./routes/main');
const usersRouter = require('./routes/users');
const usersApiRouter = require('./routes/api/users');
const methodOverride =  require('method-override');
const session = require('express-session');
const cookies = require('cookie-parser');
const userLoggedCookie = require('./middlewares/userLoggedCookie');
const cors = require('cors')

app.use(express.static(path.join(__dirname, "../public")));

app.use(express.json());
app.use(express.urlencoded({ extended: false}));
app.use(methodOverride('_method')); 
app.use(session({
    secret: 'usuario en sesión',
    resave: false,
    saveUninitialized: false
}));
app.use(cookies());
app.use(userLoggedCookie);
app.use(cors());
app.use('/', mainRouter);
app.use('/products', productsRouter);
app.use('/api/products', productsApiRouter);
app.use('/users', usersRouter);
app.use('/api/users', usersApiRouter);

app.set('view engine', 'ejs');

app.listen(process.env.PORT || 3000, () => {
    console.log("Aplicación iniciada y escuchando en el puerto 3000");
})
