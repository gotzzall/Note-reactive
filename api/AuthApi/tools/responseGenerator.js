const responseGenerator = {
  generate: ({ isSuccess = false, message = "", result = "" }) => {
    return { isSuccess, message, result };
  },
};

export default responseGenerator;
