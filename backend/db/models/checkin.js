("use strict");
module.exports = (sequelize, DataTypes) => {
  const Checkin = sequelize.define(
    "Checkin",
    {
      description: DataTypes.STRING,
      image: DataTypes.STRING,
      rating: DataTypes.NUMERIC,
      drink_id: DataTypes.INTEGER,
      location_id: DataTypes.INTEGER,
      owner_id: DataTypes.INTEGER,
    },
    {}
  );
  Checkin.associate = function (models) {
    Checkin.belongsTo(models.Drink, { foreignKey: "drink_id" });
    Checkin.belongsTo(models.User, { foreignKey: "owner_id" });
    Checkin.hasMany(models.Comment, {
      foreignKey: "checkin_id",
      onDelete: "cascade",
      hooks: true,
    });
  };
  Checkin.all = async function (Drink, User, Comment) {
    const checkins = await Checkin.findAll({
      include: [Drink, User, { model: Comment, include: User }],
    });
    return checkins;
  };
  Checkin.userCheckins = async function (owner_id) {
    const checkins = await Checkin.findAll({
      where: { owner_id },
    });

    return checkins;
  };
  Checkin.drinkCheckins = async function (drink_id) {
    const checkins = await Checkin.findAll({
      where: { drink_id },
    });

    return checkins;
  };
  Checkin.locationCheckins = async function (location_id) {
    const checkins = await Checkin.findAll({
      where: { location_id },
    });

    return checkins;
  };
  Checkin.update = async function (updateValue, id) {
    let checkin = await Checkin.findByPk(id);
    let updatedCheckin = await checkin.update({ description: updateValue });

    return updatedCheckin;
  };
  Checkin.delete = async function (id) {
    let checkin = await Checkin.findByPk(id);
    await checkin.destroy();
    return checkin;
  };
  Checkin.makeNewCheckin = async function (data, Drink, User) {
    const newCheckin = await Checkin.create(data);
    const newCheckinData = await Checkin.findOne({
      where: { id: newCheckin.id },
      include: [Drink, User],
    });
    return newCheckinData;
  };
  return Checkin;
};
