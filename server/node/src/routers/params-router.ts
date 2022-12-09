import * as express from 'express';
import { getIp } from "../ip-resolve";

export const paramsRouter = express.Router();

paramsRouter.get('/ip', (req, res) => {
    const ip = getIp();
    res.json({ ip });
})
