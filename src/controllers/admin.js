import { BlogModel } from '../models/blogs.js';
import { UserModel } from '../models/users.js';

const get = async (req, res) => {
  try {
    return res.status(200).json({ msj: "hola admin" });
  } catch (error) {
    return res.status(500).json({ msj: "error inesperado" })
  }
};

const disableUser = async (req, res) => {
  try {
    const { userId } = req.params;

    await UserModel.findByIdAndUpdate(userId, { activo: false });
    return res.status(200).json({ msj: 'Usuario desactivado' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ msj: 'Error inesperado' });
  }
}

const disableBlog = async (req, res) => {
  try {
    const { blogId } = req.params;

    await BlogModel.findByIdAndUpdate(blogId, { activo: false });
    return res.status(200).json({ msj: 'Blog desactivado' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ msj: 'Error inesperado' });
  }
}

export default { get, disableUser, disableBlog }
