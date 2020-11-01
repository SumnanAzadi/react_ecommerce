import jwt from "jsonwebtoken";

const generateToken = (id) => {
  //id will add to payload as the token
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

export default generateToken;
