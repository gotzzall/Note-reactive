import { authReactor } from "../reactors/authReactor";
import { authServices } from "../services/authServices";
import { createAction } from "../tools";

export const authAction = createAction(authServices, authReactor);
