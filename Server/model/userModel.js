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
  createAt:{
    type: Date,
    default: Date.now
  },
  number: {
    type: String,
    required: true,
  },
  password:{
    type: String,
    required: false
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
    type: Array,
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
