import mongoose from '../config/mongo.js';

const blogsSchema = new mongoose.Schema({
  title: String,
  description: String,
  image: String,
  activo: Boolean,
}, { timestamps: true });

blogsSchema.set('toJSON', {
  transform: function (doc, ret) {
    if (!ret.activo) {
      return { 
        id: ret._id,
        msj: 'Esta publicación está desactivada por el administrador' };
    } else {
      delete ret.activo;
      delete ret.createdAt;
      delete ret.updatedAt;
      delete ret.__v;
    }
  }
})

export const BlogModel = mongoose.model('blogs', blogsSchema);
