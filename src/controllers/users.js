import { UserModel } from '../models/users.js';

const getBlogs = async (req, res) => {
  try {
    const blogs = await UserModel.find({_id: req.user.id});
    return res.status(200).json({ msj: "todos los blogs", blogs: blogs });
  } catch (error) {
    return res.status(500).json({ msj: "error inesperado" });
  }
}

export default { getBlogs };