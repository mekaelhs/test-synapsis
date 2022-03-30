import {Schema, model, models} from "mongoose";

const TaskSchema = new Schema({
  title: {
    type: String,
    required: [true, "Title is required"],
    unique: true,
    trim: true,
    maxlength: [10, "title cannot be greater than 10 character"]
  },
  description: {
    type: String,
    required: [true, "Description is required"],
    trim: true,
    maxlength: [10, "description cannot be greater than 10 character"]
  },
  firstName: {
    type: String,
    required: [true, "First Name is required"],
    trim: true,
    maxlength: [10, "first name cannot be greater than 20 character"]
  },
  lastName: {
    type: String,
    required: [true, "Last Name is required"],
    trim: true,
    maxlength: [10, "last name cannot be greater than 20 character"]
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    trim: true,
    maxlength: [20, "email cannot be greater than 20 character"]
  },
  phone: {
    type: Number,
    required: [true, "Phone is required"],
    unique: true,
    trim: true,
    maxlength: [13, "phone cannot be greater than 13 character"]
  },
  address: {
    type: String,
    required: [true, "Address is required"],
    unique: true,
    trim: true
  }
},
  {
    timestamps: true,
    versionKey: false,
  }
);

export default models.Task || model("Task", TaskSchema)