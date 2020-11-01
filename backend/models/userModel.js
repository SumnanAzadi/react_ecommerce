import mongoose from "mongoose";
import { stringify } from "querystring";
import bcrypt from "bcryptjs";

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    isAdmin: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  {
    timestamps: true, //for created_at and updated_at field
  }
);

userSchema.methods.matchPassword = async function (enteredPassword) {
  //compare with the current user password with given password(enteredPassword)
  return await bcrypt.compare(enteredPassword, this.password);
};

userSchema.pre("save", async function (next) {
  //if the password is not entered or modified then move on, if entered or modified then do the hash
  //this is part of mongoose
  if (!this.isModified("password")) {
    next();
  }
  //Rules : Generate a salt and hash the password on separate function calls
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

const User = mongoose.model("User", userSchema);

export default User;
