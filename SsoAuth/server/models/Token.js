module.exports = (sequelize, DataTypes) => {
  const Token = sequelize.define("Token", {
    token : {
      type: DataTypes.STRING,
      allowNull: false,
    },
    expires: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    time_to_live: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    ip: {
      type: DataTypes.STRING,
      allowNull: false,
    }
  },{
    timestamps: false,
  });

  return Token;
}