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

  User.createUser = (
    username,
    user_name,
    user_surname,
    user_password,
    user_email,
    user_type
  ) => {
    const userInstance = User.create({
      username,
      user_name,
      user_surname,
      user_password,
      user_email,
      user_type
    });
    return userInstance;
  };

  return User;
};