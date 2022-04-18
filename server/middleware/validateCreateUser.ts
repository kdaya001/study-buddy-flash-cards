export const validateCreateUser = (req, res, next) => {
  if (req.body.email === undefined) {
    return res.status(401).json({
      message: 'Name must be provided',
    })
  };

  if (req.body.email.length < 2) {
    return res.status(401).json({
      message: 'Name must be more than 2 characters',
    })
  }

  if (req.body.password.length < 8) {
    return res.status(401).json({
      message: 'Password must be over 8 characters',
    })
  }

  next();
};
