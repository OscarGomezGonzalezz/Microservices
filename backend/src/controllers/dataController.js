const Data = require("../models/dataModel");

exports.getData = async (req, res) => {
  try {
    const data = await Data.find();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: "Error obteniendo datos" });
  }
};
