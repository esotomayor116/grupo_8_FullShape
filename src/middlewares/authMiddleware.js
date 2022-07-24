function authMiddleware (req, res ,next) {
    if (req.session.userLogged){
        return res.redirect (`/users/${req.session.userLogged.userId}`);
    }
    next();
}

module.exports = authMiddleware;