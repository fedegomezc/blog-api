import mongoose from '../config/mongo.js'

const usersSchema = new mongoose.Schema({
  perfil: { type: String, enum: ['regular', 'administrador'] },
  nombre: String,
  apellido: String,
  email: String,
  password: String,
  activo: Boolean,
  blogs: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Blog' }],
}, {timestamps: true});

const blogSchema = new mongoose.Schema({
  titulo: String,
  descripcion: String,
  imagen: String,
  activo: Boolean,
});

const UserModel = mongoose.model('users', usersSchema);
const BlogModel = mongoose.model('blogs', blogSchema);

export default { BlogModel, UserModel };