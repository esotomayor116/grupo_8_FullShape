function guestMiddleware (req, res, next) {
    if (req.session.userLogged) {
      user = req.session.userLogged
      return res.redirect(`/users/${user.userId}`);
    }
  
    next();
  }
  
  module.exports = guestMiddleware;