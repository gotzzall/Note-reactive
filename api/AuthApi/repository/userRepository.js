import db from "../config/db.js";

const userRespository = {
  getUser: async () => {
    return db.prepare("SELECT * FROM users").all();
  },
  getOneUserByEmail: async ({ email }) => {
    return db
      .prepare(
        `
      SELECT * FROM users WHERE email = ?  
    `,
      )
      .get(email.toLowerCase());
  },
  getOneUserById: async ({ id }) => {
    return db
      .prepare(
        `
      SELECT * FROM users WHERE id LIKE ?  
    `,
      )
      .get(id);
  },
  addUser: async ({ id, username, email, password }) => {
    const statement = db.prepare(`
      INSERT INTO users (id, username, email, password) 
      VALUES (?, ?, ?, ?)`);
    return statement.run(id, username.toLowerCase(), email, password);
  },
};

export default userRespository;
