import db from "../config/db.js";

const jwtRepository = {
  addJwt: async ({ user, tokenHash, jti, expiresAt, ip, userAgent }) => {
    const statement = db.prepare(`
        INSERT INTO refreshToken (userId, tokenHash, jti, expiresAt, ip, userAgent)
        VALUES (?, ?, ?, ?, ?, ?);
    `);

    return statement.run(
      user,
      tokenHash,
      jti,
      expiresAt.toISOString(),
      ip,
      userAgent,
    );
  },
  findOneJwt: async ({ tokenHash, jti }) => {
    const statement = db.prepare(`
      SELECT * FROM refreshToken WHERE tokenHash = ? AND jti = ?;
    `);

    return statement.get(tokenHash, jti);
  },
  updateJwt: async ({
    user,
    tokenHash,
    jti,
    expiresAt,
    revokedAt,
    replacedBy,
    createAt,
    ip,
    userAgent,
  }) => {
    const statement = db.prepare(`
      UPDATE refreshToken 
      SET userId = ?, tokenHash = ?, jti = ?, expiresAt = ?, revokedAt = ?, replacedBy = ?, createdAt = ?, ip = ?, userAgent = ?
      WHERE jti = ?
    `);

    const result = statement.run(
      user.id,
      tokenHash,
      jti,
      expiresAt,
      revokedAt,
      replacedBy,
      createAt,
      ip,
      userAgent,
      jti,
    );

    return result.changes;
  },
};

export default jwtRepository;
