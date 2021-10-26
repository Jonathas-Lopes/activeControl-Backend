const mongoose = require('mongoose');
const bcrypt = require('bcrypt');



const Schema = mongoose.Schema;

const UserSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
    // select: false
  },
  name: {
    type: String,
    required: false,
    // select: false
  },
  admin: {
    type: Boolean,
    required: true,
    // select: false
  },
  identity: {
    type: String,
    required: false,
    // select: false
  },
  sector: {
    type: String,
    required: false,
    // select: false
  },
  cart: {
    type: String,
    required: false,
    // select: false
  },
});
UserSchema.pre(
    'save',
    async function(next) {
      const user = this;
      const hash = await bcrypt.hash(this.password, 10);
  
      this.password = hash;
      next();
    }
  );
  UserSchema.methods.isValidPassword = async function(password) {
    const user = this;
    const compare = await bcrypt.compare(password, user.password);
  
    return compare;
  }

const UserModel = mongoose.model('user', UserSchema);

module.exports = UserModel;