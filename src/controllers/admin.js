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
    console.log(userId);

    await UserModel.findByIdAndUpdate(userId, { activo: false });
    return res.status(200).json({ msj: 'Usuario desactivado' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ msj: 'Error inesperado' });
  }
}

export default { get, disableUser }
