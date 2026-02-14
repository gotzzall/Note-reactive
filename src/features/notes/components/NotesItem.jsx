import { PencilIcon, TrashIcon } from "@heroicons/react/16/solid";

export const NotesItem = ({ position, note, onEdit, onDelete }) => {
  return (
    <tr>
      <th>{position}</th>
      <td>{note.notes}</td>
      <td className="flex gap-4">
        <button className="btn btn-soft btn-info" onClick={() => onEdit(note)}>
          <PencilIcon className="size-6" />
        </button>
        <button
          className="btn btn-soft btn-error"
          onClick={() => onDelete(note.id)}
        >
          <TrashIcon className="size-6" />
        </button>
      </td>
    </tr>
  );
};
