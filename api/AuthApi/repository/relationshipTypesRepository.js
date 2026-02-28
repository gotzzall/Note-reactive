import { studentsDb } from "../config/index.js";
const TABLE_NAME = "RelationshipTypes";

export const relationshipTypesRepository = {
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
  create: async ({ relationship }) => {
    const newData = studentsDb
      .prepare(
        `
        INSERT INTO ${TABLE_NAME} (
          relationship
        ) 
        VALUES (?)
      `,
      )
      .run(relationship);

    return newData.lastInsertRowid;
  },
  delete: async ({ id }) => {
    const change = studentsDb
      .prepare(
        `
          DELETE FROM ${TABLE_NAME}
          WHERE id like ?
        `,
      )
      .run(id);
    return change.changes;
  },
  update: async ({ id, relationship }) => {
    const change = studentsDb
      .prepare(
        `
        UPDATE ${TABLE_NAME} SET 
          relationship = ?
        WHERE id like ?`,
      )
      .run(relationship, id);

    return change.changes;
  },
};
