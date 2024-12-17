const mongoose = require("mongoose");

mongoose.connect(
  "mongodb+srv://pradeep20020102:<db_password>@cluster00.ghjolwt.mongodb.net/PayTM"
);

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: true,
    minLength: 5,
    maxLength: 30,
    lowercase: true,
    trim: true,
  },
  firstName: {
    type: String,
    required: true,
    maxLength: 30,
    trim: true,
  },
  lastName: {
    type: String,
    required: true,
    maxLength: 30,
    trim: true,
  },
  password: {
    type: String,
    required: true,
    minLength: [6, "password must be minimum 6 words"],
  },
});

const accoutSchema = new mongoose.Schema({
  userId : {
  type: mongoose.Schema.Types.ObjectId,
  ref : 'User',
  required:true
  },
  balance : {
    type: Number,
    required: true,
  }
})
const User = mongoose.model("User", userSchema);
const Account = mongoose.model("Account", accoutSchema);

module.exports = {
  User,
  Account
};
