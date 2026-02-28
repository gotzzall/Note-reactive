import express from "express";
import { relationshipTypesRepository } from "../repository/index.js";
import responseGenerator from "../tools/responseGenerator.js";
import auth from "../middleware/auth.js";

const BASE_PATH = "/relationship_types";
const ENTITY_ERROR_BASE = "relationshipTypes";

export const relationshipTypesRouter = express.Router();

relationshipTypesRouter.get(`${BASE_PATH}`, async (req, res) => {
  try {
    const result = await relationshipTypesRepository.getAll();
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

relationshipTypesRouter.get(`${BASE_PATH}/:id`, async (req, res) => {
  try {
    const result = await relationshipTypesRepository.getOneById({
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

relationshipTypesRouter.post(`${BASE_PATH}`, async (req, res) => {
  try {
    const { relationship } = req.body;

    const result = await relationshipTypesRepository.create({
      relationship,
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

relationshipTypesRouter.put(`${BASE_PATH}/:id`, async (req, res) => {
  try {
    const id = req.params.id;
    const { relationship } = req.body;

    const dataFinded = await relationshipTypesRepository.getOneById({ id });

    if (!dataFinded)
      return res.status(404).json(
        response.generate({
          isSuccess: false,
          message: `The ${ENTITY_ERROR_BASE} can not be founded`,
        }),
      );

    const changes = await relationshipTypesRepository.update({
      id,
      relationship,
    });
    if (changes <= 0)
      return res.status(404).json(
        response.generate({
          isSuccess: false,
          message: `The ${ENTITY_ERROR_BASE} can not be updated`,
        }),
      );

    const result = await relationshipTypesRepository.getOneById({ id });

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

relationshipTypesRouter.delete(`${BASE_PATH}/:id`, async (req, res) => {
  try {
    const id = req.params.id;

    const dataFinded = await relationshipTypesRepository.getOneById({ id });

    if (!dataFinded)
      return res.status(404).json(
        response.generate({
          isSuccess: false,
          message: `The ${ENTITY_ERROR_BASE} can not be founded`,
        }),
      );

    const changes = await relationshipTypesRepository.delete({ id });

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
