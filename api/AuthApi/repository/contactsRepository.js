import { studentsDb } from "../config/index.js";
const TABLE_NAME = "Contacts";

export const contactsRepository = {
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
    name,
    firstName,
    lastName,
    email,
    phoneNumber,
    mobilePhone,
  }) => {
    const newData = studentsDb
      .prepare(
        `
        INSERT INTO ${TABLE_NAME} (
          name,
          firstName,
          lastName,
          email,
          phoneNumber,
          mobilePhone
        ) 
        VALUES (?, ?, ?, ?, ?, ?)
      `,
      )
      .run(name, firstName, lastName, email, phoneNumber, mobilePhone);

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
  update: async ({
    id,
    name,
    firstName,
    lastName,
    email,
    phoneNumber,
    mobilePhone,
  }) => {
    console.log(name, firstName, lastName, email, phoneNumber, mobilePhone, id);
    const change = studentsDb
      .prepare(
        `
        UPDATE ${TABLE_NAME} SET 
          name = ?, 
          firstName = ?, 
          lastName = ?,
          email = ?,
          phoneNumber = ?,
          mobilePhone = ?
        WHERE id = ?`,
      )
      .run(name, firstName, lastName, email, phoneNumber, mobilePhone, id);

    return change.changes;
  },
};
