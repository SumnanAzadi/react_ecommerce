import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";

const protect = asyncHandler(async (req, res, next) => {
  let token;

  if (
    //JWT token starts with "Bearer"
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1]; //bearer is the 0 index and token is in 1 index

      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      //decoded token will contain id[user ID],iat,exp

      req.user = await User.findById(decoded.id).select("-password");
      //fetch the user by user id and we will exclude user password

      next();
    } catch (error) {
      console.error(error);
      res.status(401);
      throw new Error("Not authorized, token failed");
    }
  }

  if (!token) {
    res.status(401);
    throw new Error("Not authorized, no token");
  }
});

export { protect };
