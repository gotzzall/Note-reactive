import { withAuthReactive } from "../../hocs";
import { AuthComponent } from "./AuthComponent";

export const AuthController = withAuthReactive(AuthComponent, {
  init: ({ actions }) => {},
  queries: () => [],
  monitors: () => ["login"],
});
