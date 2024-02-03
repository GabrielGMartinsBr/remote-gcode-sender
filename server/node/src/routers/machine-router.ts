import express from 'express';
import multer from 'multer';
import { Serial } from '../serial/serial';
import cors from 'cors';

const storage = multer.diskStorage({
    destination: './appData/workbench',
    filename(req, file, cb) {
        cb(null, file.originalname)
    },
});

const upload = multer({
    limits: { fieldSize: 128 * 1024 * 1024 },
    storage: storage
});

export const machineRouter = express.Router();

machineRouter.use(cors({ preflightContinue: true }));

machineRouter.post('/gcode', upload.single('gcode'), (req, res) => {
    if (req.file && req.file.filename && req.file.size) {
        Serial.device.startPrint(req.file.filename);
        res.json({ ok: true });
    } else {
        res.status(400).json({ error: 'invalid file' });
    }
})
