import Database from "better-sqlite3";

export const studentsDb = new Database("studentsDb.db");

studentsDb.pragma("foreign_keys = ON");

studentsDb.exec(`
  CREATE TABLE IF NOT EXISTS Contacts(
    id INTEGER,
    name TEXT NOT NULL,
    firstName TEXT NOT NULL,
    lastName TEXT NOT NULL,
    email TEXT NOT NULL,
    phoneNumber TEXT NOT NULL,
    mobilePhone TEXT NOT NULL,
    
    CONSTRAINT PK_Contacts
      PRIMARY KEY (id)
  );

    CREATE TABLE IF NOT EXISTS Students(
    id INTEGER,
    schoolId INTEGER,
    studentNumber TEXT NOT NULL,
    contactId INTEGER NOT NULL,
    
    CONSTRAINT PK_Students
      PRIMARY KEY (id),
    
    CONSTRAINT Fk_Students_ContactId
      FOREIGN KEY (contactId)
      REFERENCES Contacts(id)
  );

  CREATE TABLE IF NOT EXISTS RelationshipTypes(
    id INTEGER,
    relationship TEXT NOT NULL,
    
    CONSTRAINT PK_RelationshipTypes
      PRIMARY KEY (id)
  );

  CREATE TABLE IF NOT EXISTS Parents(
    id INTEGER,
    firstName TEXT NOT NULL,
    lastName TEXT NOT NULL,
    email TEXT NOT NULL,
    phoneNumber TEXT NOT NULL,
    mobilePhone TEXT NOT NULL,
    relationshipTypeId INTEGER NOT NULL,
    studentId INTEGER NOT NULL,
    
    CONSTRAINT PK_Parents
      PRIMARY KEY (id),
    
    CONSTRAINT Fk_Parents_RelationshipTypeId
      FOREIGN KEY (relationshipTypeId)
      REFERENCES RelationshipTypes(id),

    CONSTRAINT Fk_Students_StudentId
      FOREIGN KEY (studentId)
      REFERENCES Students(id)
  );

`);
