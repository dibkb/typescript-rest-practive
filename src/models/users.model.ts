import mongoose from "mongoose";
const UserSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  username: { type: String, required: true },
  password: { type: String, required: true, select: false },
});
export const UserModel = mongoose.model("User", UserSchema);
//-------------actions--------------------
export const getUsers = async () => UserModel.find();
export const getUserByEmail = (email: string) => UserModel.findOne({ email });
export const getUserById = async (id: string) => UserModel.findById(id);
export const createUser = async (values: Record<string, any>) =>
  new UserModel(values).save().then((res) => res.toObject());
export const deleteUserById = async (id: string) =>
  UserModel.findByIdAndDelete(id);
export const updateUserById = async (id: string, values: Record<string, any>) =>
  UserModel.findByIdAndUpdate(id, values);
