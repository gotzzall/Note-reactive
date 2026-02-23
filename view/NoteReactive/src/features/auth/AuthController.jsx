import { withReactive } from "../../hocs";
import { AuthComponent } from "./AuthComponent";

export const AuthController = withReactive(AuthComponent, {
  init: ({ actions }) => {},

  queries: () => [],

  monitors: () => [],
});
