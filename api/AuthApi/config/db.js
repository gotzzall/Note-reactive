import Database from "better-sqlite3";

const db = new Database("authDb.db");

db.pragma("foreign_keys = ON");

db.exec(`
  CREATE TABLE IF NOT EXISTS users(
    id TEXT PRIMARY KEY,
    username TEXT NOT NULL UNIQUE,
    email TEXT NOT NULL UNIQUE,
    password TEXT NOT NULL
  );

  CREATE TABLE IF NOT EXISTS refreshToken(
    userId TEXT NOT NULL,
    tokenHash TEXT NOT NULL UNIQUE,
    jti TEXT NOT NULL,
    expiresAt DATE NOT NULL,
    revokedAt DATE,
    replacedBy TEXT,
    createdAt DATE DEFAULT CURRENT_TIMESTAMP,
    ip TEXT,
    userAgent TEXT,

    FOREIGN KEY (userId) REFERENCES users(id)
  );
`);

export default db;
