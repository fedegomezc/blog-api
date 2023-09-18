import mongoose from '../config/mongo.js';
import bcrypt from 'bcrypt';

const usersSchema = new mongoose.Schema({
  firstname: String,
  lastname: String,
  email: { type: String, required: true, index: { unique: true } },
  password: { type: String, required: true, select: false },
  admin: Boolean,
  activo: Boolean,
  blogs: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Blog' }],
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

const blogSchema = new mongoose.Schema({
  title: String,
  description: String,
  image: String,
  activo: Boolean,
}, {timestamps: true});

export const UserModel = mongoose.model('users', usersSchema);
export const BlogModel = mongoose.model('blogs', blogSchema);
