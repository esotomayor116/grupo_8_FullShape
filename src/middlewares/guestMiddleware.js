function guestMiddleware (req, res ,next) {
    if (req.session.userLogged){
        return res.redirect ('./users/index');
    }
    next();
}

module.exports = guestMiddleware;