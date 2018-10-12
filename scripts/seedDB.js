const mongoose = require("mongoose");
const db = require("../models");

// This file empties the Refs collection and inserts the refs below

mongoose.connect(
  process.env.MONGODB_URI ||
  "mongodb://localhost/refslist"
);

const refSeed = [
  {
    title: "Tabulator",
    url: "http://tabulator.info",
    private: false,
    date: new Date(Date.now())
  },
  {
    title: "Sequelize Documentation",
    url: "http://docs.sequelizejs.com",
    private: false,
    date: new Date(Date.now())
  },
  {
    title: "How to become a Git expert",
    url: "https://medium.freecodecamp.org/how-to-become-a-git-expert-e7c38bf54826",
    private: true,
    date: new Date(Date.now())
  }
];

db.Ref
  .remove({})
  .then(() => db.Ref.collection.insertMany(refSeed))
  .then(data => {
    console.log(data.result.n + " records inserted!");
    process.exit(0);
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });
