const localDbActions = {
  collection: (collectionName) => {
    return {
      bulkWrite: (data) => {
        localStorage.setItem(collectionName, JSON.stringify(data));
        window.dispatchEvent(new Event("storage"));
      },
      insertOne: (data) => {
        const collection =
          JSON.parse(localStorage.getItem(collectionName)) || [];
        collection.push(data);
        localStorage.setItem(collectionName, JSON.stringify(collection));
        window.dispatchEvent(new Event("storage"));
      },
      deleteOne: (id) => {
        const collection = JSON.parse(localStorage.getItem(collectionName));
        const index = collection.findIndex((item) => item.id == id);
        collection.splice(index, 1);
        localStorage.setItem(collectionName, JSON.stringify(collection));
        window.dispatchEvent(new Event("storage"));
      },
      updateOne: (note) => {
        const collection = JSON.parse(localStorage.getItem(collectionName));
        const index = collection.findIndex((item) => item.id == note.id);
        collection[index] = { ...collection[index], notes: note.notes };
        console.log("collection", collection);
        localStorage.setItem(collectionName, JSON.stringify(collection));
        window.dispatchEvent(new Event("storage"));
      },
    };
  },
};

function actionGenerator(service, reactor, action) {
  return (...params) => {
    window.dispatchEvent(
      new CustomEvent(`dnt:${action}:start`, { detail: { action } }),
    );

    return service[action](...params)
      .then((result) => {
        reactor.onSuccess({
          action,
          payload: result,
          params,
          db: localDbActions,
        });
        window.dispatchEvent(
          new CustomEvent(`dnt:${action}:success`, { detail: { action } }),
        );
      })
      .catch((error) => {
        reactor.onError({ action, error, params, db: localDbActions });
        window.dispatchEvent(
          new CustomEvent(`dnt:${action}:error`, { detail: { action } }),
        );
      });
  };
}

export const createAction = (service, reactor) => {
  let result = {};

  Object.keys(service).forEach((key) => {
    result[key] = actionGenerator(service, reactor, key);
  });

  return result;
};
