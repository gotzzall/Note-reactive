import { studentsDb } from "../config/index.js";
const TABLE_NAME = "Parents";

export const parentsRepository = {
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
  create: async ({
    firstName,
    lastName,
    email,
    phoneNumber,
    mobilePhone,
    relationshipTypeId,
    studentId,
  }) => {
    const newData = studentsDb
      .prepare(
        `
        INSERT INTO ${TABLE_NAME} (
          firstName,
          lastName,
          email,
          phoneNumber,
          mobilePhone,
          relationshipTypeId,
          studentId
        ) 
        VALUES (?, ?, ?, ?, ?, ?, ?)
      `,
      )
      .run(
        firstName,
        lastName,
        email,
        phoneNumber,
        mobilePhone,
        relationshipTypeId,
        studentId,
      );

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
  update: async ({
    id,
    firstName,
    lastName,
    email,
    phoneNumber,
    mobilePhone,
    relationshipTypeId,
    studentId,
  }) => {
    const change = studentsDb
      .prepare(
        `
        UPDATE ${TABLE_NAME} SET 
          firstName = ?, 
          lastName = ?,
          email = ?,
          phoneNumber = ?,
          mobilePhone = ?,
          relationshipTypeId = ?,
          studentId = ?
        WHERE id like ?`,
      )
      .run(
        firstName,
        lastName,
        email,
        phoneNumber,
        mobilePhone,
        relationshipTypeId,
        studentId,
        id,
      );

    return change.changes;
  },

  getOneByStudentId: async ({ id }) => {
    return studentsDb
      .prepare(
        `
        SELECT * FROM ${TABLE_NAME}
        WHERE studentId = ?
      `,
      )
      .get(id);
  },
};
