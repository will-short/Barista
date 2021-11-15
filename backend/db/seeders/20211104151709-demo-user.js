"use strict";
const faker = require("faker");
const bcrypt = require("bcryptjs");

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "Users",
      [
        {
          name: "Demo user",
          email: "demo@user.io",
          username: "Demo-lition",
          hashed_password: bcrypt.hashSync("password"),
          location: "Chicago",
          profile_image:
            "https://res.cloudinary.com/dc9htgupc/image/upload/c_fill,h_200,w_200/v1636578728/pmp8vba5hxtvgowpymnn.png",
        },
        {
          name: "fake user1",
          email: faker.internet.email(),
          username: "FakeUser1",
          hashed_password: bcrypt.hashSync(faker.internet.password()),
          location: "St louis",
          profile_image:
            "https://res.cloudinary.com/dc9htgupc/image/upload/c_fill,h_200,w_200/v1636971690/wmj2qlrfbre2mnnadrm0.jpg",
        },
        {
          name: "fake user2",
          email: faker.internet.email(),
          username: "FakeUser2",
          hashed_password: bcrypt.hashSync(faker.internet.password()),
          location: "Indianapolis",
          profile_image:
            "https://res.cloudinary.com/dc9htgupc/image/upload/c_fill,h_200,w_200/v1636971707/n2wqldnvylbhtvxkljbm.jpg",
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
