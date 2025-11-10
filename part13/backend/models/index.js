const Blog = require("./blog");
const User = require("./user");

// Define associations
User.hasMany(Blog);
Blog.belongsTo(User);

const syncModels = async () => {
  try {
    // Sync User first
    await User.sync({ alter: true });

    // Sync Blog - userId is nullable to handle existing data
    await Blog.sync({ alter: true });

    // Delete any existing blogs without userId (they can't be linked to users)
    const deletedCount = await Blog.destroy({
      where: { userId: null },
    });

    if (deletedCount > 0) {
      console.log(`Deleted ${deletedCount} blog(s) without user association.`);
    }
  } catch (error) {
    console.error("Error syncing models:", error.message);
  }
};

syncModels();

module.exports = {
  Blog,
  User,
};
