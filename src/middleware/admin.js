const isAdmin = async (req, res, next) => {
  try {
    
    if (!req.user.admin) return res.status(403).json({ msj: "Acceso denegado" });
    next()
  } catch (error) {
    console.error(error);
    return res.status(500).json({ msj: "error inesperado" });
  }
}

export default isAdmin;