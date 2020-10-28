import * as express from 'express';

export const frontAppRouter = express.Router();

frontAppRouter.get('/', (req, res) => {
    res.json('hi!');
})

frontAppRouter.use('/assets', express.static('dist/app'))

frontAppRouter.get('/test', (req, res) => {
    console.log(req.get('host'));
    const newUrl = ['http://localhost:9000', req.url].join('');
    return res.redirect(newUrl);
})