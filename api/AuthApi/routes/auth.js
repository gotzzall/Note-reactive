import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import userRespository from "../repository/userRepository.js";
import jwtGenerator from "../tools/jwtGenerator.js";

const authRouter = express.Router();


/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Crea un usuario
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Usuario creado y logueado
 */

authRouter.post('/register', async(req, res) => {
  try{
    const {username, email, password} = req.body;

    const existingUser = await userRespository.getOneUserByEmail({email});
    console.log(existingUser)
    if(existingUser) return res.status(400).json({isSuccess: false, message: "User already exist", result: ""});

    const hasedPassword = await bcrypt.hash(password, 10);

    const newUser = await userRespository.addUser({id: crypto.randomUUID(), username, email, password: hasedPassword});

    if(!newUser.lastInsertRowid) return res.status(400).json({isSuccess: false, message: "The user can not be registered", result: ""});
    
    const userRegistered = await userRespository.getOneUserByEmail({email});

    const jwt = jwtGenerator.generate({id: userRegistered, email: email});

    return res.json({isSuccess: true, message: "", result: jwt});
  }catch(err){
    console.log(err)
    res.status(500).json({ message: 'Server error' });
  }
});


/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Loguearse con un usuario
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Usuario logueado
 */
authRouter.post('/login', async(req, res) => {
  try{
    const {email, password} = req.body;

    const user = await userRespository.getOneUserByEmail({email});
    if(!user) return res.status(400).json({isSuccess: false, message: "Invalid credentials1", result: ""});

    const isMatch = await bcrypt.compare(password, user.password);
    if(!isMatch) return res.status(400).json({isSuccess: false, message: "Invalid credentials", result: ""});

    const jwt = jwtGenerator.generate({id: user.id, email: user.email});

    return res.json({isSuccess: true, message: "", result: jwt});
  }catch(err){
    res.status(500).json({ message: 'Server error' });
  }
});


// /**
//  * @swagger
//  * /api/auth/validate:
//  *   get:
//  *     summary: Verificar si el token es válido
//  *     security:
//  *       - bearerAuth: []
//  *     responses:
//  *       200:
//  *         description: Verifica si el el token del usuario es válido
//  */
// authRouter.get('/validate', async(req, res) => {
//   const authHeader = req.headers.authorization || "";
//   const [schema, token] = authHeader.split(" ");

//   if(schema !== 'Bearer' || !token) return res.status(401).json({isSuccess: false, message: "Missing or invalid Authorization header", result: ""});

//   try{
//     const decoder = jwt.verify(token, process.env.JWT_SECRET);
//     res.json({isSuccess: true, message: "the JWT is valid", result: decoder.payload});
//   }catch(err){
//     if(err.username == "TokenExpiredError") return res.status(401).json({isSuccess: false, message: "Access token expired", result: ""});
//     return res.status(401).json({isSuccess: false, message: "Invalid token", result: ""});
//   }
// })

// authRouter.get("/test", (req, res) => {
//   return res.sendStatus(200).send("test ok");
// })

export default authRouter