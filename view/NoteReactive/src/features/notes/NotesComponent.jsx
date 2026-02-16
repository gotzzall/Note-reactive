import { Modal } from "../../components/Modal";
import { NotesForm, NotesHeader } from "./components";
import { NotesTable } from "./components";

export const NotesComponent = ({ data, actions, monitors }) => {
  return (
    <div className="p-4">
      {monitors.getNotes ||
      monitors.addNote ||
      monitors.deleteNote ||
      monitors.updateNote ? (
        <span className="loading loading-spinner"></span>
      ) : (
        <>
          <NotesHeader onSubmitNotes={actions.notes.addNote} />
          <NotesTable
            data={data.notes}
            onDelete={actions.notes.deleteNote}
            onEdit={actions.notes.updateNote}
          />
        </>
      )}
    </div>
  );
};
