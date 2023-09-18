const get = async (req, res) => {
  try {
    return res.status(200).json({ msj: "hola admin"});
  } catch (error) {
    return res.status(500).json({msj: "error inesperado"})
  }
};

export default {get}
