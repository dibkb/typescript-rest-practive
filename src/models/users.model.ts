import mongoose from "mongoose";
const UserSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  username: { type: String, required: true },
  authentication: {
    password: { type: String, required: true, select: false },
    sessionToken: { type: String, select: false },
  },
});
export const UserModel = mongoose.model("User", UserSchema);
//-------------actions--------------------
export const getUsers = () => UserModel.find();
export const getUserByEmail = async (email: string) =>
  UserModel.findOne({ email });
export const getUserBySessionToken = (session: string) =>
  UserModel.findOne({ "authenticatiom.sessionToken": session });
export const getUserById = (id: string) => UserModel.findById(id);
export const createUser = async (values: Record<string, any>) => {
  new UserModel(values).save().then((user) => user.toObject());
};
export const deleteUserById = (id: string) => UserModel.findByIdAndDelete(id);
export const updateUserById = (id: string, values: Record<string, any>) =>
  UserModel.findByIdAndUpdate(id, values);
