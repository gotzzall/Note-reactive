import db from "../config/db.js";

const jwtRepository = {
  addJwt: async ({ user, tokenHash, jti, expiresAt, ip, userAgent }) => {
    const statement = db.prepare(`
        INSERT INTO refreshToken (userId, tokenHash, jti, expiresAt, ip, userAgent)
        VALUES (?, ?, ?, ?, ?, ?);
    `);

    return statement.run(user, tokenHash, jti, expiresAt, ip, userAgent);
  },
};

export default jwtRepository;
