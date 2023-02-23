import { Schema, model } from "mongoose";

const UserSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      min: 2,
      max: 100,
    },
    password: {
      type: String,
      required: true,
      min: 5,
    },
    email: {
      type: String,
      required: true,
      max: 50,
      unique: true,
    },
    birthday: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      required: true,
    },
    img: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

UserSchema.methods.toJSON = function () {
  const { __v, _id, ...user } = this.toObject();
  user.uid = _id;
  return user;
};

export default model("User", UserSchema);
