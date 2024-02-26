import express from 'express';
import { CommandsService } from './commands-service';

export const commandsRouter = express.Router();

commandsRouter.get('/status', (req, res) => {
    const service = CommandsService.getInstance();
    const status = service.status();
    res.json({ status });
});

commandsRouter.post('/send', (req, res) => {
    const { command } = req.body;

    if (!command) {
        res.status(400).json({ message: 'invalid command.' });
        return;
    }

    const service = CommandsService.getInstance();
    const result = service.handleCommand(command);

    res.json({ result });
});

