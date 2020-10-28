import * as express from 'express';
import { WSS } from './wss/wss';
import { Serial } from './serial/serial';
import { paramsRouter } from './routers/params';
import { frontAppRouter } from './routers/front-app-router';

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
        this.server.use('/params', paramsRouter);

        // Start listen
        this.server.listen(PORT, () => console.log(`Web Server has started on port ${PORT}`));
    }

}

const app = new App();

app.init();
