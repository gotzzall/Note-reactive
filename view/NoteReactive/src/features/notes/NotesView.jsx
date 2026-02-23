import { withAuth } from "../../hocs";
import { NotesController } from "./NotesController";

export const NotesView = withAuth(NotesController);
