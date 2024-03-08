import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  number: {
    type: String,
    required: true,
  },
  gender:{
    type: String,
    required: true
  },
  designation: {
    type: String,
    required: true,
  },
  course: {
    type: String,
    required: true
  },
  is_Admin: {
    type: Boolean,
    required: true,
    default: false,
  },
  image: {
    type: String,
    default: "",
  },
});

export const User = mongoose.model('User', userSchema);
