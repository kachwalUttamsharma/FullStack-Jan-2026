const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({
      success: false,
      message: 'Authorization token missing',
    });
  }

  req.user = {
    id: 101,
    name: 'John Doe',
  };

  next();
};

module.exports = authMiddleware;