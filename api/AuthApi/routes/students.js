import express from "express";
import { studentsRepository } from "../repository/index.js";
import responseGenerator from "../tools/responseGenerator.js";
import auth from "../middleware/auth.js";

const BASE_PATH = "/students";
const ENTITY_ERROR_BASE = "student";

export const studentsRouter = express.Router();

studentsRouter.get(`${BASE_PATH}`, async (req, res) => {
  try {
    const result = await studentsRepository.getAll();
    return res
      .status(200)
      .json(responseGenerator.generate({ isSuccess: true, result }));
  } catch (err) {
    console.log(`${ENTITY_ERROR_BASE}:GetAll:`, err);
    return res.status(500).json(
      responseGenerator.generate({
        isSuccess: false,
        message: "Server error",
      }),
    );
  }
});

studentsRouter.get(`${BASE_PATH}/:id`, async (req, res) => {
  try {
    const result = await studentsRepository.getOneById({
      id: req.params.id,
    });

    if (!result)
      return res.status(404).json(
        response.generate({
          isSuccess: false,
          message: `The ${ENTITY_ERROR_BASE} can not be founded`,
        }),
      );

    return res
      .status(200)
      .json(responseGenerator.generate({ isSuccess: true, result }));
  } catch (error) {
    console.log(`${ENTITY_ERROR_BASE}GetOneById:`, err);

    return res.status(500).json(
      responseGenerator.generate({
        isSuccess: false,
        message: "Server error",
      }),
    );
  }
});

studentsRouter.post(`${BASE_PATH}`, async (req, res) => {
  try {
    const { schoolId, studentNumber, contactId } = req.body;

    const result = await studentsRepository.create({
      schoolId,
      studentNumber,
      contactId,
    });

    if (!result)
      return res.status(400).json(
        responseGenerator.generate({
          isSuccess: false,
          message: `The ${ENTITY_ERROR_BASE} can not be registered`,
        }),
      );

    return res
      .status(200)
      .json(responseGenerator.generate({ isSuccess: true, result }));
  } catch (err) {
    console.log(`${ENTITY_ERROR_BASE}:Create:`, err);

    return res.status(500).json(
      responseGenerator.generate({
        isSuccess: false,
        message: "Server error",
      }),
    );
  }
});

studentsRouter.put(`${BASE_PATH}/:id`, async (req, res) => {
  try {
    const id = req.params.id;
    const { schoolId, studentNumber, contactId } = req.body;

    const dataFinded = await studentsRepository.getOneById({ id });

    if (!dataFinded)
      return res.status(404).json(
        responseGenerator.generate({
          isSuccess: false,
          message: `The ${ENTITY_ERROR_BASE} can not be founded`,
        }),
      );

    const changes = await studentsRepository.update({
      id,
      schoolId,
      studentNumber,
      contactId,
    });
    if (changes <= 0)
      return res.status(404).json(
        responseGenerator.generate({
          isSuccess: false,
          message: `The ${ENTITY_ERROR_BASE} can not be updated`,
        }),
      );

    const result = await studentsRepository.getOneById({ id });

    return res
      .status(200)
      .json(responseGenerator.generate({ isSuccess: true, result }));
  } catch (err) {
    console.log(`${ENTITY_ERROR_BASE}:Update:`, err);

    return res.status(500).json(
      responseGenerator.generate({
        isSuccess: false,
        message: "Server error",
      }),
    );
  }
});

studentsRouter.delete(`${BASE_PATH}/:id`, async (req, res) => {
  try {
    const id = req.params.id;

    const dataFinded = await studentsRepository.getOneById({ id });

    if (!dataFinded)
      return res.status(404).json(
        response.generate({
          isSuccess: false,
          message: `The ${ENTITY_ERROR_BASE} can not be founded`,
        }),
      );

    const changes = await studentsRepository.delete({ id });

    if (changes <= 0)
      return res.status(400).json(
        responseGenerator.generate({
          isSuccess: false,
          message: `The ${ENTITY_ERROR_BASE} can not be deleted`,
        }),
      );

    return res
      .status(200)
      .json(responseGenerator.generate({ isSuccess: true, result: id }));
  } catch (err) {
    console.log(`${ENTITY_ERROR_BASE}:Delete:`, err);

    return res.status(500).json(
      responseGenerator.generate({
        isSuccess: false,
        message: "Server error",
      }),
    );
  }
});
