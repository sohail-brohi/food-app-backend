const { getCollection } = require("../db");
const Customization = getCollection("customization");

const createCustomization = async (req, res) => {
  try {
    if (!req.body) {
      return res.status(400).json({
        msg: "Request body is missing",
      });
    }
    const { name, type, price } = req.body;

    if (!name) {
      return res.status(400).json({
        msg: "Name are required",
      });
    }

    const customizationExists = await Customization.findOne({
      name: name.trim(),
    });
    if (customizationExists) {
      return res.status(409).json({
        msg: "Customization with this name already exists",
      });
    }

    const newCustomization = {
      name: name.trim(),
      type: type ? type.trim() : "default", // Default type if not provided
      price: price ? parseFloat(price) : 0.0, // Default price if not provided
      createdAt: new Date(),
    };

    const result = await Customization.insertOne(newCustomization);

    if (result.acknowledged) {
      res.status(201).json({
        msg: "Customization created successfully",
        customizationId: result.insertedId,
      });
    } else {
      res.status(500).json({
        msg: "Failed to create customization",
      });
    }
  } catch (error) {
    console.error("Error during customization creation:", error);
    res.status(500).json({
      msg: "Internal server error",
      details: error.message,
    });
  }
};

module.exports = {
  createCustomization,
};
