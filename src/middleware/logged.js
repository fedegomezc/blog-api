import jwt from 'jsonwebtoken';
import 'dotenv/config';

const logged = async (req, res, next) => {
  try {
    const bearerToken = req.header('authorization');
    if (!bearerToken) return res.status(401).json({ msj: "Credenciales inválidas" });

    const token = bearerToken.split(' ')[1];
    const user = await decodedToken(token);

    if (!user.id) return res.status(401).json({ msj: "Credenciales inválidas2" });

    req.user = user;
    next()
  } catch (error) {
    if (!user) return res.status(500).json({ msj: "Error inesperado" });
  }
}

const decodedToken = async (token) => {
  try {
    return jwt.verify(token, process.env.TOKEN_SECRET, (err, data) => {
      return err ? err : data;
    })
  } catch (error) {
    throw error
  }
}

export default logged;