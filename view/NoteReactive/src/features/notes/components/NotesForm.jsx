import { useState } from "react";

const DEFAULT_DATA = { id: 2, notes: "" };

export const NotesForm = ({ onSubmit, onCancel, dataInit = DEFAULT_DATA }) => {
  const [form, setForm] = useState(dataInit);

  function handleSubmit(e) {
    e.preventDefault();
    onSubmit(form);
    setForm(DEFAULT_DATA);
  }

  function handleCancel() {
    setForm(DEFAULT_DATA);
    onCancel();
  }

  function handleChange({ target }) {
    setForm((currentData) => {
      return { ...currentData, notes: target.value };
    });
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-2">
      <label className="floating-label">
        <span>Note:</span>
        <input
          type="text"
          placeholder="What is your next note...?"
          className="input input-md w-full"
          value={form.notes}
          onChange={handleChange}
        />
      </label>

      <div className="join flex-row-reverse w-full gap-1">
        <button className="btn join-item" type="submit">
          Submit
        </button>
        <button className="btn join-item" type="button" onClick={handleCancel}>
          Cancel
        </button>
      </div>
    </form>
  );
};
