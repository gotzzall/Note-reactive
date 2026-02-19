const COLLECTION_NAME = "notes";

export const notesReactor = {
  onSuccess: ({action, payload, params, db}) => {
    switch(action) {
      case "getNotes":
        db.collection(COLLECTION_NAME).bulkWrite(payload);
        break;
        case "addNote":
          db.collection(COLLECTION_NAME).insertOne(payload);
          break;
        case "deleteNote":
          db.collection(COLLECTION_NAME).deleteOne(payload);
          break;
        case "updateNote":
            db.collection(COLLECTION_NAME).updateOne(payload);
            break;
    }
  },
  onError: ({action, error, params, db}) => {
    console.log(action, error)
  }
}