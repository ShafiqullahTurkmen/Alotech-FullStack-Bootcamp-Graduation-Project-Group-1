module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define("User", {
    username : {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    user_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    user_surname: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    user_password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    user_email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    user_type: {
      type: DataTypes.ENUM({
        values: ['admin', 'user'],
      })
    },
  },{
    timestamps: false,
  });

  return User;
}