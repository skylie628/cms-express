const jwt = require('jsonwebtoken');

function generateAccessToken(payload = {}) {
  const result = jwt.sign(
    payload,
    process.env.TOKEN_SECRET,
    { expiresIn: '1m' }
  );
  return result;
}

function generateRefreshToken(payload = {}) {
  const result = jwt.sign(
    payload,
    process.env.TOKEN_SECRET,
    { expiresIn: 3600 }
  );
  return result;
}

module.exports = {
  generateAccessToken,
  generateRefreshToken
}