const { getCollection } = require("../db");
const Category = getCollection("category");

const createCategory = async (req, res) => {
  try {
    if (!req.body) {
      return res.status(400).json({
        msg: "Request body is missing",
      });
    }
    const { name, description } = req.body;
    if (!name || !description) {
      return res.status(400).json({
        msg: "Name and description are required",
      });
    }

    const categoryExists = await Category.findOne({ name: name.trim() });
    if (categoryExists) {
      return res.status(409).json({
        msg: "Category with this name already exists",
      });
    }
    // Validate name and description
    if (typeof name !== "string" || typeof description !== "string") {
      return res.status(400).json({
        msg: "Name and description must be strings",
      });
    }
    if (name.trim() === "" || description.trim() === "") {
      return res.status(400).json({
        msg: "Name and description cannot be empty",
      });
    }

    const newCategory = {
      name: name.trim(),
      description: description.trim(),
      createdAt: new Date(),
    };

    const result = await Category.insertOne(newCategory);

    if (result.acknowledged) {
      res.status(201).json({
        msg: "Category created successfully",
        categoryId: result.insertedId,
      });
    } else {
      res.status(500).json({
        msg: "Failed to create category",
      });
    }
  } catch (error) {
    console.error("Error during category creation:", error);
    res.status(500).json({
      msg: "Internal server error",
      details: error.message,
    });
  }
};

module.exports = {
  createCategory,
};
