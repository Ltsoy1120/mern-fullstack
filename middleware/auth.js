// -----------вариант как нас учили-------------
// const User = require("../models/User");
// const auth = async (req,res,next) => {
//     const token = req.get('Authorization');
//     if(!token) {
//         return res.status(401).send({error: 'No token present'});
//     }
//     const user = await User.findOne({token});
//     if(!user) {
//         return res.status(401).send({error: 'Wrong token!'});
//     }
//     req.user = user;
//     next();
// };
// module.exports = auth;

const config = require("config");
const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  if (req.method === "OPTIONS") {
    return next();
  }
  try {
    const token = req.headers.authorization.split(" ")[1];
    if (!token) {
      res.status(401).json({ message: "Нет авторизации" });
    }
    const decoded = jwt.verify(token, config.get("jwtSecret"));
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ message: "Нет авторизации" });
  }
};
