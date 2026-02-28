import Database from "better-sqlite3";

export const notesDb = new Database("notesDb.db");

notesDb.exec(`
  CREATE TABLE IF NOT EXISTS notes (
    id TEXT PRIMARY KEY,
    notes TEXT NOT NULL,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL
  );
`);
