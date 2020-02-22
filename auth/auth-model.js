const bcrypt = require("bcryptjs");

const db = require("../database/dbConfig");

function findById(id) {
  return db("users")
    .where({ id })
    .first("id", "username");
}

async function add(user) {
  const [id] = await db("users").insert(user);

  return findById(id);
}

function findBy(filter) {
  return db("users").select("id", "username", "password");
}
module.exports = {
  findById,
  findBy,
  add
};
