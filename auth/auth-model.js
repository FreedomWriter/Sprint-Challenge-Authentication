const bcrypt = require("bcryptjs");

const db = require("../database/dbConfig");

function findById(id) {
  return db("users")
    .where({ id })
    .first("id", "username");
}

async function add(user) {
  user.password = await bcrypt.hashSync(user.password, 10);
  const [id] = await db("users").insert(user);

  return findById(id);
}

module.exports = {
  find,
  findById,
  add
};
