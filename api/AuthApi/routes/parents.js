import express from "express";
import { parentsRepository } from "../repository/index.js";
import responseGenerator from "../tools/responseGenerator.js";
import auth from "../middleware/auth.js";

const BASE_PATH = "/parents";
const ENTITY_ERROR_BASE = "parent";

export const parentsRouter = express.Router();

parentsRouter.get(`${BASE_PATH}`, async (req, res) => {
  try {
    const result = await parentsRepository.getAll();
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

parentsRouter.get(`${BASE_PATH}/:id`, async (req, res) => {
  try {
    const result = await parentsRepository.getOneById({
      id: req.params.id,
    });

    if (!result)
      return res.status(404).json(
        responseGenerator.generate({
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

parentsRouter.post(`${BASE_PATH}`, async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      phoneNumber,
      mobilePhone,
      relationshipTypeId,
      studentId,
    } = req.body;

    const result = await parentsRepository.create({
      firstName,
      lastName,
      email,
      phoneNumber,
      mobilePhone,
      relationshipTypeId,
      studentId,
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

parentsRouter.put(`${BASE_PATH}/:id`, async (req, res) => {
  try {
    const id = req.params.id;
    const {
      firstName,
      lastName,
      email,
      phoneNumber,
      mobilePhone,
      relationshipTypeId,
      studentId,
    } = req.body;

    const dataFinded = await parentsRepository.getOneById({ id });

    if (!dataFinded)
      return res.status(404).json(
        responseGenerator.generate({
          isSuccess: false,
          message: `The ${ENTITY_ERROR_BASE} can not be founded`,
        }),
      );

    const changes = await parentsRepository.update({
      id,
      firstName,
      lastName,
      email,
      phoneNumber,
      mobilePhone,
      relationshipTypeId,
      studentId,
    });
    if (changes <= 0)
      return res.status(404).json(
        response.generate({
          isSuccess: false,
          message: `The ${ENTITY_ERROR_BASE} can not be updated`,
        }),
      );

    const result = await parentsRepository.getOneById({ id });

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

parentsRouter.delete(`${BASE_PATH}/:id`, async (req, res) => {
  try {
    const id = req.params.id;

    const dataFinded = await parentsRepository.getOneById({ id });

    if (!dataFinded)
      return res.status(404).json(
        response.generate({
          isSuccess: false,
          message: `The ${ENTITY_ERROR_BASE} can not be founded`,
        }),
      );

    const changes = await parentsRepository.delete({ id });

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
