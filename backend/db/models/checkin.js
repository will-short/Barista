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
  };
  Checkin.all = async function (Drink) {
    const checkins = await Checkin.findAll({ include: Drink });

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
  return Checkin;
};
