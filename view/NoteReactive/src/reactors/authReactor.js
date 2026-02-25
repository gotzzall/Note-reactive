import toast from "react-hot-toast";

export const authReactor = {
  onSuccess: ({ payload, action, db }) => {
    switch (action) {
      case "login":
        if (!payload.isSuccess) {
          window.dispatchEvent(
            new CustomEvent(`dnt:${action}`, {
              detail: { value: false, action },
            }),
          );
          toast.error("User or password is not valid");
          return;
        }

        db.collection("token").bulkWrite(payload.result);

        window.dispatchEvent(
          new CustomEvent(`dnt:${action}`, { detail: { value: true, action } }),
        );
        toast.success("Login success");
        break;

      case "register":
        toast.success("Register success");
        break;
    }
  },
  onError: () => {
    toast.error("Upsss... there is an error, try agin later");
    return;
  },
};
