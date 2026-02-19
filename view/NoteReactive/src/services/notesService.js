const  NOTE_URL = "http://localhost:5287"

export const notesService = {
  getNotes: async () => {
    const response = await fetch(`${NOTE_URL}/noteitems`);
    const data = await response.json();
    return data;
  },
  addNote: async (note) => {
    const response = await fetch(`${NOTE_URL}/noteitems`,{
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(note)
    });

    const data = await response.json();
    return data;
  },
  deleteNote: async (id) => {
    await fetch(`${NOTE_URL}/noteitems/${id}`, {
      method: "DELETE"
    })

    return id;
  },
  updateNote: async (note) => {
    await fetch(`${NOTE_URL}/noteitems/${note.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(note)
    })

    return note;
  }
} 