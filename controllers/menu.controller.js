const { getCollection } = require("../db");
const Menu = getCollection("menu");

const createMenu = async (req, res) => {
  try {
    if (!req.body) {
      return res.status(400).json({
        msg: "Request body is missing",
      });
    }
    const {
      name,
      description,
      category,
      image_url,
      price,
      isAvailable,
      rating,
      calories,
      protein,
    } = req.body;

    if (
      !name ||
      !description ||
      !category ||
      !image_url ||
      price === undefined ||
      isAvailable === undefined ||
      rating === undefined ||
      calories === undefined ||
      protein === undefined
    ) {
      return res.status(400).json({
        msg: "All fields are required",
      });
    }

    if (
      typeof name !== "string" ||
      typeof description !== "string" ||
      typeof image_url !== "string"
    ) {
      return res.status(400).json({
        msg: "Name, description, and image_url must be strings",
      });
    }

    if (
      name.trim() === "" ||
      description.trim() === "" ||
      image_url.trim() === ""
    ) {
      return res.status(400).json({
        msg: "Name, description, and image_url cannot be empty",
      });
    }

    const newMenu = {
      name: name.trim(),
      description: description.trim(),
      category,
      image_url: image_url.trim(),
      price: Number(price),
      isAvailable: Boolean(isAvailable),
      rating: Number(rating),
      calories: Number(calories),
      protein: parseInt(protein, 10),
      createdAt: new Date(),
    };

    const result = await Menu.insertOne(newMenu);

    if (result.acknowledged) {
      res.status(201).json({
        msg: "Menu created successfully",
        menuId: result.insertedId,
      });
    } else {
      res.status(500).json({
        msg: "Failed to create menu",
      });
    }
  } catch (error) {
    console.error("Error during menu creation:", error);
    res.status(500).json({
      msg: "Internal server error",
      details: error.message,
    });
  }
};

module.exports = {
  createMenu,
};
