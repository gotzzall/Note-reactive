import { NotesItem } from "./NotesItem";

export const NotesTable = ({ data = [], onEdit, onDelete }) => {
  return (
    <div className="overflow-x-auto">
      <table className="table">
        <thead>
          <tr>
            <th>#</th>
            <th>Note</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((note, index) => {
            return (
              <NotesItem
                key={note.id}
                position={index + 1}
                note={note}
                onEdit={onEdit}
                onDelete={onDelete}
              />
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
