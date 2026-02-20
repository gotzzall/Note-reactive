import jwt from "jsonwebtoken";
import "dotenv/config"

const jwtGenerator={
  generate: (payload) => {
    return jwt.sign(payload, process.env.JWT_SECRET, {expiresIn: '15min'});
  }
}

export default jwtGenerator;