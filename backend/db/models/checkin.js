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
  };
  Checkin.all = async function (Drink, User) {
    const checkins = await Checkin.findAll({
      include: [Drink, User],
      order: [["createdAt", "DESC"]],
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
  Checkin.update = async function (id, updateValue) {
    let checkin = await Checkin.findByPk(id);
    await Project.update(updateValue, { where: { id } });

    return checkin;
  };
  Checkin.delete = async function (id) {
    let checkin = await Checkin.findByPk(id);
    await checkin.destroy();
  };
  Checkin.makeNewCheckin = async function (data) {
    const newCheckin = await Checkin.create(data);

    return newCheckin;
  };
  return Checkin;
};
