import express from "express";
import { router } from "./router";
import cors from 'cors';
import path from "path";

export const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '..', 'FrontEnd')));
app.use(router);
