import { studentsDb } from "../config/index.js";
const TABLE_NAME = "Students";

export const studentsRepository = {
  getAll: async () => {
    return studentsDb
      .prepare(
        `
        SELECT * FROM ${TABLE_NAME}
      `,
      )
      .all();
  },
  getOneById: async ({ id }) => {
    return studentsDb
      .prepare(
        `
        SELECT * FROM ${TABLE_NAME}
        WHERE id = ?
      `,
      )
      .get(id);
  },
  create: async ({ schoolId, studentNumber, contactId }) => {
    const newData = studentsDb
      .prepare(
        `
        INSERT INTO ${TABLE_NAME} (
          schoolId, 
          studentNumber, 
          contactId
        ) 
        VALUES (?, ?, ?)
      `,
      )
      .run(schoolId, studentNumber, contactId);

    return newData.lastInsertRowid;
  },
  delete: async ({ id }) => {
    const change = studentsDb
      .prepare(
        `
          DELETE FROM ${TABLE_NAME}
          WHERE id = ?
        `,
      )
      .run(id);
    return change.changes;
  },
  update: async ({ id, schoolId, studentNumber, contactId }) => {
    const change = studentsDb
      .prepare(
        `
        UPDATE ${TABLE_NAME} SET 
          schoolId = ?, 
          studentNumber = ?, 
          contactId = ?
        WHERE id = ?`,
      )
      .run(schoolId, studentNumber, contactId, id);

    return change.changes;
  },
};
