"use strict";
const faker = require("faker");
const bcrypt = require("bcryptjs");

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "Users",
      [
        {
          name: "test test",
          email: "demo@user.io",
          username: "Demo-lition",
          hashed_password: bcrypt.hashSync("password"),
        },
        {
          name: "test1 test1",
          email: faker.internet.email(),
          username: "FakeUser1",
          hashed_password: bcrypt.hashSync(faker.internet.password()),
        },
        {
          name: "test2 test2",
          email: faker.internet.email(),
          username: "FakeUser2",
          hashed_password: bcrypt.hashSync(faker.internet.password()),
        },
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(
      "Users",
      {
        username: { [Op.in]: ["Demo-lition", "FakeUser1", "FakeUser2"] },
      },
      {}
    );
  },
};
