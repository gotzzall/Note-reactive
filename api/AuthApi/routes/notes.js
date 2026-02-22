import express from "express";
import notesRepository from "../repository/notesRepository.js";
import responseGenerator from "../tools/responseGenerator.js";

const notesRouter = express.Router();

notesRouter.get("/notes", async (req, res) => {
  try {
    const notes = await notesRepository.getNotes();
    return res.status(200).json(notes);
  } catch (err) {
    console.log(err);
    return res.status(500).json(
      responseGenerator.generate({
        isSuccess: false,
        message: "Server error",
      }),
    );
  }
});

notesRouter.get("/notes/:id", async (req, res) => {
  try {
    const note = await notesRepository.getNoteById({ id: req.params.id });
    return res.status(200).json(note);
  } catch (error) {
    return res.status(500).json(
      responseGenerator.generate({
        isSuccess: false,
        message: "Server error",
      }),
    );
  }
});

notesRouter.post("/notes", async (req, res) => {
  try {
    const { notes } = req.body;

    const newNote = {
      id: crypto.randomUUID(),
      notes,
      createdAt: new Date().toISOString(),
    };
    const noteId = await notesRepository.createNote(newNote);

    if (!noteId)
      return res.status(400).json(
        responseGenerator.generate({
          isSuccess: false,
          message: "The note can not be registered",
        }),
      );

    return res.status(200).json(newNote);
  } catch (err) {
    console.log(err);
    return res.status(500).json(
      responseGenerator.generate({
        isSuccess: false,
        message: "Server error",
      }),
    );
  }
});

notesRouter.put("/notes/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const { notes } = req.body;

    const noteFinded = await notesRepository.getNoteById({ id });

    if (!noteFinded)
      return res.status(404).json(
        response.generate({
          isSuccess: false,
          message: "The note can not be founded",
        }),
      );

    const noteChanges = await notesRepository.updateNote({ id, notes });
    if (noteChanges <= 0)
      return res.status(404).json(
        response.generate({
          isSuccess: false,
          message: "The note can not be updated",
        }),
      );

    const noteUpdated = await notesRepository.getNoteById({ id });

    return res.status(200).json(noteUpdated);
  } catch (err) {
    return res.status(500).json(
      responseGenerator.generate({
        isSuccess: false,
        message: "Server error",
      }),
    );
  }
});

notesRouter.delete("/notes/:id", async (req, res) => {
  try {
    const id = req.params.id;

    const noteFinded = await notesRepository.getNoteById({ id });

    if (!noteFinded)
      return res.status(404).json(
        response.generate({
          isSuccess: false,
          message: "The note can not be founded",
        }),
      );

    const noteDeleted = await notesRepository.deleteNote({ id });

    if (noteDeleted <= 0)
      return res.status(400).json(
        responseGenerator.generate({
          isSuccess: false,
          message: "The note can not be deleted",
        }),
      );

    return res.status(200).json({ id });
  } catch (err) {
    return res.status(500).json(
      responseGenerator.generate({
        isSuccess: false,
        message: "Server error",
      }),
    );
  }
});

export default notesRouter;
