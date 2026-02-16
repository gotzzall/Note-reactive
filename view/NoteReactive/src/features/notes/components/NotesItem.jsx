import { PencilIcon, TrashIcon } from "@heroicons/react/16/solid";
import { Modal } from "../../../components/Modal";
import { NotesForm } from "./NotesForm";

export const NotesItem = ({ position, note, onEdit, onDelete }) => {
  return (
    <tr>
      <th>{position}</th>
      <td>{note.notes}</td>
      <td className="flex gap-4">
        <Modal
          title={"Edit"}
          Button={(showModal) => {
            return (
              <button className="btn btn-soft btn-info " onClick={showModal}>
                <PencilIcon className="size-6" />
              </button>
            );
          }}
        >
          {(closeModal) => (
            <NotesForm
              onCancel={closeModal}
              onSubmit={onEdit}
              dataInit={note}
            />
          )}
        </Modal>

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
