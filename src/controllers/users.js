import { BlogModel, UserModel } from '../models/users.js';

const profile = async (req, res) => {
  try {
    const user = await UserModel.findOne({_id: req.user.id});
    return res.status(200).json({ msj: "todos los blogs", user });
  } catch (error) {
    return res.status(500).json({ msj: "error inesperado" });
  }
}

const createBlog = async (req, res) => {
  try {
    const newBlog = new BlogModel(req.body);
    const blog = await newBlog.save();
    
    await UserModel.findByIdAndUpdate(req.user.id, { $push: { blogs: blog._id } });

    res.status(201).json({ msj: 'El blog ha sido creado', blog });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al crear el blog' });
  }
}

export default { profile, createBlog };