import { NotesTable } from "./components/NotesTable";

export const NotesComponent = ({ data, actions, monitors }) => {
  return (
    <>
      <NotesTable data={data.notes} />
      <button className="btn" onClick={actions.notes.getNotes}>
        {monitors.getNotes ? (
          <span className="loading loading-spinner"></span>
        ) : (
          <></>
        )}
        getActions
      </button>
    </>
  );
};
