import express from "express";
import loginController from "./controllers/loginController";

export const router = express.Router();

router.get('/usuarios', loginController.getAllUser);

router.get('/usuario/:userId', loginController.getUser);

router.post('/usuario', loginController.postUser);

router.post('/login', loginController.getLogin);