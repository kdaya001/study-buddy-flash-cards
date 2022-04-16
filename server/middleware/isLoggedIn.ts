const isLoggedIn = (req, res, next) => {
  if (!req.session.user_id) {
      return res.status(401).json({
          message: "Please log in to perform this action",
      });
  }

  next();
};

module.exports = isLoggedIn;