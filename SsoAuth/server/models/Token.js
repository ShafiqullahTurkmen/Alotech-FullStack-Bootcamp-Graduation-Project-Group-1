module.exports = (sequelize, DataTypes) => {
  const Token = sequelize.define(
    "Token",
    {
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      token: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      session: {
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
      user_ip: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      source_url: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      timestamps: false,
    }
  );

  Token.createToken = async (
    user_id,
    token,
    session,
    expires,
    createdAt,
    time_to_live,
    user_ip,
    source_url
  ) => {
    const tokenInstance = await Token.create({
      user_id,
      token,
      session,
      expires,
      createdAt,
      time_to_live,
      user_ip,
      source_url,
    });
    return tokenInstance;
  };

  Token.deleteToken = async (token) => {
    const tokenInstance = await Token.destroy({
      where: { token: token },
    });
  };

  return Token;
};
