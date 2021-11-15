"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "Comments",
      [
        {
          content: "test comment 1",
          owner_id: 2,
          checkin_id: 1,
        },
        {
          content: "test comment 2",
          owner_id: 2,
          checkin_id: 1,
        },
        {
          content: "test comment 3",
          owner_id: 2,
          checkin_id: 1,
        },
        {
          content: "test comment 4",
          owner_id: 2,
          checkin_id: 1,
        },
        {
          content: "test comment 5",
          owner_id: 2,
          checkin_id: 1,
        },
        {
          content: "test comment 1",
          owner_id: 3,
          checkin_id: 2,
        },
        {
          content: "test comment 2",
          owner_id: 2,
          checkin_id: 2,
        },
        {
          content: "test comment 3",
          owner_id: 3,
          checkin_id: 2,
        },
        {
          content: "test comment 4",
          owner_id: 2,
          checkin_id: 2,
        },
        {
          content: "test comment 5",
          owner_id: 2,
          checkin_id: 2,
        },
        {
          content: "test comment 1",
          owner_id: 3,
          checkin_id: 3,
        },
        {
          content: "test comment 2",
          owner_id: 2,
          checkin_id: 3,
        },
        {
          content: "test comment 3",
          owner_id: 2,
          checkin_id: 3,
        },
        {
          content: "test comment 4",
          owner_id: 3,
          checkin_id: 3,
        },
        {
          content: "test comment 5",
          owner_id: 2,
          checkin_id: 3,
        },
        {
          content: "test comment 1",
          owner_id: 3,
          checkin_id: 4,
        },
        {
          content: "test comment 2",
          owner_id: 2,
          checkin_id: 4,
        },
        {
          content: "test comment 3",
          owner_id: 2,
          checkin_id: 4,
        },
        {
          content: "test comment 4",
          owner_id: 3,
          checkin_id: 4,
        },
        {
          content: "test comment 5",
          owner_id: 2,
          checkin_id: 4,
        },
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Comments", null, {});
  },
};
