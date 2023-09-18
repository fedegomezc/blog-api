import { UserModel } from '../models/users.js';
import jwt from 'jsonwebtoken';

const register = async (req, res) => {
  try {
    let { firstname, lastname, email, password } = req.body
    const newUser = new UserModel({
      firstname, 
      lastname, 
      email, 
      password, 
      admin: false, 
      activo: true 
    });
    // la contraseña se hashea antes de crear el modelo (pre-save)
    const user = await newUser.save()

    const userResponse = {
      _id: user._id,
      firstname: user.firstname,
      lastname: user.lastname,
      email: user.email
    }
    return res.status(201).json({ msj: "El usuario ha sido agregado", user: userResponse });
  } catch (error) {
    console.log(error)
    return res.status(500).json({ msj: "error inesperado" })
  }
};

const login = async (req, res) => {
  try {
    let { email, password } = req.body

    const user = await UserModel.findOne({ email }).select('_id email password admin')
    if (!user) return res.status(401).json({ msj: "Credenciales inválidas" });

    let logged = await user.comparePassword(password)
    if (!logged) return res.status(401).json({ msj: "Credenciales inválidas" });

    const token = jwt.sign(
      { id: user._id },
      process.env.TOKEN_SECRET)

    return res.status(200).json({ msj: "login exitoso", token });

  } catch (error) {
    console.error(error)
    return res.status(500).json({ msj: "error inesperado" })
  }
};

export default { login, register }
