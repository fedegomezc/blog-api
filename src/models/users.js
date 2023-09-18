import mongoose from '../config/mongo.js';
import bcrypt from 'bcrypt';

const usersSchema = new mongoose.Schema({
  firstname: String,
  lastname: String,
  email: { type: String, required: true, index: { unique: true } },
  password: { type: String, required: true, select: false },
  admin: Boolean,
  activo: Boolean,
  blogs: [{ type: mongoose.Schema.Types.ObjectId, ref: 'blogs' }],
}, {timestamps: true});

usersSchema.pre('save', async function(next) {
  let user = this;

  const salt = await bcrypt.genSaltSync(parseInt(process.env.SALT_ROUNDS));
  const hashedPassword = await bcrypt.hash(user.password, salt);
  user.password = hashedPassword;
  next();
})

usersSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

usersSchema.set('toJSON', {
  transform: function (doc, ret) {
    delete ret.admin;
    delete ret.activo;
    delete ret.createdAt;
    delete ret.updatedAt;
    delete ret.__v;
  }
})

export const UserModel = mongoose.model('users', usersSchema);
