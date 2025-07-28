const { getCollection } = require("../db");
const MenuCustomization = getCollection("menu_customization");

const createMenuCustomization = async (req, res) => {
  try {
    if (!req.body) {
      return res.status(400).json({
        msg: "Request body is missing",
      });
    }
    const { menu, customization } = req.body;

    if (!menu || !customization) {
      return res.status(400).json({
        msg: "Menu ID and Customization ID are required",
      });
    }

    const newMenuCustomization = {
      menu,
      customization,
      createdAt: new Date(),
    };

    const result = await MenuCustomization.insertOne(newMenuCustomization);

    if (result.acknowledged) {
      res.status(201).json({
        msg: "Menu customization created successfully",
        menuCustomizationId: result.insertedId,
      });
    } else {
      res.status(500).json({
        msg: "Failed to create menu customization",
      });
    }
  } catch (error) {
    console.error("Error during menu customization creation:", error);
    res.status(500).json({
      msg: "Internal server error",
      details: error.message,
    });
  }
};

module.exports = {
  createMenuCustomization,
};
