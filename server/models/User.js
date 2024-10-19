import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    email_address: { type: String, required: true },
    name: { type: String, required: false },
    user_name: { type: String, required: false },
    password: { type: String, required: true },
    entries: { type: [String], required: false },
}); 

const UserModel = mongoose.model('User', UserSchema);

export default UserModel;
