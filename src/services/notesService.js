import notes from "../db/notes";

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function RandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export const notesService = {
  getNotes: async () => {
    await sleep(RandomInt(1000, 3000));
    return notes;
  }
} 