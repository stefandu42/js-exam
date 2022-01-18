//A VOIR SI JE GARDE

const jwt = require("jsonwebtoken");
const jwtSecret = "ilovemypizza!";

const { Users } = require("../model/users");
const userModel = new Users();

const authorize = (req, res, next) => {
  let token = req.get("authorization");
  if (!token) return res.status(401).end();

  try {
    const decoded = jwt.verify(token, jwtSecret);
    const userFound = userModel.getOneByUsername(decoded.username);

    if (!userFound) return res.status(403).end();


    req.user = userFound;
    next(); 
  } catch (err) {
    console.error("authorize: ", err);
    return res.status(403).end();
  }
};


module.exports = { authorize }; 
