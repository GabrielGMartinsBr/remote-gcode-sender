import { resolve } from 'path';
import * as express from 'express';

export const frontAppRouter = express.Router();

const indexPath = resolve('./dist/app/index.html');
frontAppRouter.get('/', (req, res) => {
    res.sendFile(indexPath);
})

frontAppRouter.use('/assets', express.static('dist/app'))
