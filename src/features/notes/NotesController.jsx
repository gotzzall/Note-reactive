import { withReactive } from "../../hocs";
import { NotesComponent } from "./NotesComponent";

export const NotesController = withReactive(NotesComponent, {
  init: ({ actions }) => {
    actions.notes.getNotes();
  },
  queries: () => [
    {
      collection: "notes",
      name: "notes",
      defaultValue: [],
    },
  ],
  monitors: () => ["getNotes"],
});
