import { PlusIcon } from "@heroicons/react/16/solid";
import { Modal } from "../../../components/Modal";
import { NotesForm } from "./NotesForm";

export const NotesHeader = ({ onSubmitNotes }) => {
  return (
    <div>
      <h1 className="text-4xl font-bold">Notes</h1>
      <div className="flex justify-between items-center">
        <div>Filters</div>
        <Modal
          title={"test"}
          Button={(showModal) => {
            return (
              <button className="btn btn-soft btn-accent " onClick={showModal}>
                <PlusIcon className="size-6" />
              </button>
            );
          }}
        >
          {(closeModal) => (
            <NotesForm onCancel={closeModal} onSubmit={onSubmitNotes} />
          )}
        </Modal>
      </div>
    </div>
  );
};
