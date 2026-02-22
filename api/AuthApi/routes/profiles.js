import express from "express";
import auth from "../middleware/auth.js";
import userRespository from "../repository/userRepository.js";
import responseGenerator from "../tools/responseGenerator.js";

const profilesRouter = express.Router();

profilesRouter.get("/me", auth, async (req, res) => {
  try {
    const user = await userRespository.getOneUserById({ id: req.user.id });

    if (!user) {
      return res
        .status(404)
        .json(responseGenerator.generate({ message: "User not found" }));
    }

    return res.json(
      responseGenerator.generate({
        isSuccess: true,
        result: { id: user.id, username: user.username, email: user.email },
      }),
    );
  } catch (err) {
    return res
      .status(500)
      .json(responseGenerator.generate({ message: "Server error" }));
  }
});

export default profilesRouter;
