import * as express from 'express';
import { frontAppRouter } from './routers/front-app-router';
import { WSS } from './wss/wss';
import { Serial } from './serial/serial';

const PORT = 9000;

class App {
    server = express()

    init() {
        // Start Web Socket Server
        WSS.init();

        // Start Serial Module
        Serial.init();

        // Setup routes
        this.server.use(frontAppRouter);

        // Start listen
        this.server.listen(PORT, () => console.log(`Web Server has started on port ${PORT}`));
    }

}

const app = new App();

app.init();
