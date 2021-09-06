const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = function (req, res, next) {
  // Get token form header
  const token = req.header('x-auth-token');

  // check if not token
  if (!token) {
    return res.status(401).json({ msg: 'No token, authorization denied' });
  }

  // verify token
  try {
    const decode = jwt.verify(token, config.get('jwtSecret'));
    req.user = decode.user;
    next();
  } catch (err) {
    console.error(err.message);
    res.status(401).json({ msg: 'Token is not valid' });
  }
};
