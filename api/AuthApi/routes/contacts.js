import express from "express";
import { contactsRepository } from "../repository/index.js";
import responseGenerator from "../tools/responseGenerator.js";
import auth from "../middleware/auth.js";

const BASE_PATH = "/contacts";
const ENTITY_ERROR_BASE = "contact";

export const contactsRouter = express.Router();

contactsRouter.get(`${BASE_PATH}`, async (req, res) => {
  try {
    const result = await contactsRepository.getAll();
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

contactsRouter.get(`${BASE_PATH}/:id`, async (req, res) => {
  try {
    const result = await contactsRepository.getOneById({
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

contactsRouter.post(`${BASE_PATH}`, async (req, res) => {
  try {
    const { name, firstName, lastName, email, phoneNumber, mobilePhone } =
      req.body;

    const result = await contactsRepository.create({
      name,
      firstName,
      lastName,
      email,
      phoneNumber,
      mobilePhone,
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

contactsRouter.put(`${BASE_PATH}/:id`, async (req, res) => {
  try {
    const id = req.params.id;
    const { name, firstName, lastName, email, phoneNumber, mobilePhone } =
      req.body;

    const dataFinded = await contactsRepository.getOneById({ id });

    if (!dataFinded)
      return res.status(404).json(
        responseGenerator.generate({
          isSuccess: false,
          message: `The ${ENTITY_ERROR_BASE} can not be founded`,
        }),
      );

    const changes = await contactsRepository.update({
      id,
      name,
      firstName,
      lastName,
      email,
      phoneNumber,
      mobilePhone,
    });
    if (changes <= 0)
      return res.status(404).json(
        responseGenerator.generate({
          isSuccess: false,
          message: `The ${ENTITY_ERROR_BASE} can not be updated`,
        }),
      );

    const result = await contactsRepository.getOneById({ id });

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

contactsRouter.delete(`${BASE_PATH}/:id`, async (req, res) => {
  try {
    const id = req.params.id;

    const dataFinded = await contactsRepository.getOneById({ id });

    if (!dataFinded)
      return res.status(404).json(
        response.generate({
          isSuccess: false,
          message: `The ${ENTITY_ERROR_BASE} can not be founded`,
        }),
      );

    const changes = await contactsRepository.delete({ id });

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
