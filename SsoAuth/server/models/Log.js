module.exports = (sequelize, DataTypes) => {
  const Log = sequelize.define(
    "Log",
    {
      log: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      timestamps: false,
    }
  );
  return Log;
};
