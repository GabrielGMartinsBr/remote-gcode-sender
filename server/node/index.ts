import * as express from 'express';
import * as moment from 'moment'

import * as dotenv from 'dotenv';
import { FileManager } from './file-manager';
import { WSS } from './wss/wss';
import { Serial } from './serial/serial';
import { paramsRouter } from './routers/params-router';
import { frontAppRouter } from './routers/front-app-router';
import { machineRouter } from './routers/machine-router';

const PORT = 9000;

moment.locale('pt-BR');

class App {
    server = express()

    async init() {
        dotenv.config();

        try {
            await FileManager.setupDirs();
        } catch (ex) {
            console.error(ex);
            return;
        }

        // Start Web Socket Server
        WSS.init();

        // Start Serial Module
        Serial.init();

        // Setup routes
        this.server.use(frontAppRouter);
        this.server.use('/params', paramsRouter);
        this.server.use('/machine', machineRouter)

        // Start listen
        this.server.listen(PORT, () => console.log(`Web Server has started on port ${PORT}`));
    }

}

const app = new App();

app.init();
