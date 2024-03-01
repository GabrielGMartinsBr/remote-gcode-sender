import { PrinterCommand } from '../../../../common/commands';
import { Serial } from '../serial/serial';

export class CommandsService {

    static getInstance() {
        if (!this.instance) {
            this.instance = new CommandsService();
        }
        return this.instance;
    }

    handleCommand(cmd: PrinterCommand) {
        switch (cmd) {
            case PrinterCommand.PAUSE: {
                this.pause();
                break;
            }
            case PrinterCommand.CONTINUE: {
                this.continue();
                break;
            }
        }
        return 'ok';
    }

    status() {
        if (!Serial.device) {
            return { error: 'Device not connected.' };
        }
        const queue = Serial.device.getQueue();
        if (!queue) {
            return { error: 'Queue not defined.' };
        }
        return Serial.device.getStatus();
    }

    pause() {
        Serial.device.getQueue().pause();
    }

    continue() {
        Serial.device.getQueue().unpause();
    }

    private static instance?: CommandsService;

    private constructor() { }

}