import { withAuthReactive } from "../../hocs";

export const AuthWrapper = withAuthReactive(
  ({ data, actions, monitors }) => {},
  {
    init: () => {},
    queries: () => [],
    monitors: () => ["refresh"],
  },
);
