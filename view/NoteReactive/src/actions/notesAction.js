import { notesReactor } from "../reactors/notesReactor";
import { createAction } from "../tools";
import { notesService } from "../services";

export const notesAction = createAction(notesService, notesReactor)