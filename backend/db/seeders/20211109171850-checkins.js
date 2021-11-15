"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("Checkins", [
      {
        description: "having a blast drinking this!",
        image:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQDbV7dwYXT2s-j-9pCdRFYth46lYnT_T9E3Q&usqp=CAU",
        rating: 4.5,
        drink_id: 2,
        owner_id: 2,
        location: "starbucks",
      },
      {
        description: "Wow this looks amazing",
        image:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSGTVpCuEpHsZwCM15YRUFC0ljb2fR4-oInXQ&usqp=CAU",
        rating: 3,
        drink_id: 5,
        owner_id: 2,
        location: "dennys",
      },
      {
        description: "having a great time!",
        image:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSAdTPKl6Fm2xIxZHojm8gHiss6djZ6RISyxg&usqp=CAU",
        rating: 5,
        drink_id: 2,
        owner_id: 3,
        location: "coffe shop",
      },
      {
        description: "yummm",
        image:
          "https://kdvr.com/wp-content/uploads/sites/11/2021/07/GettyImages-1191285127.jpg?w=2121&h=1414&crop=1",
        rating: 4.5,
        drink_id: 2,
        owner_id: 3,
      },
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Checkins", null, {});
  },
};
