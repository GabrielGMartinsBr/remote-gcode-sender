import * as SerialPort from 'serialport';
import { PrintQueue } from './print-queue';

export class SerialMachine {
    port: SerialPort;
    log: string[] = [];

    private connected: boolean;
    private parser: SerialPort.parsers.Readline;
    private queue: PrintQueue;

    constructor(private portInfo: SerialPort.PortInfo) {
        this.port = new SerialPort(portInfo.path, { autoOpen: false, baudRate: 115200 });
        this.parser = new SerialPort.parsers.Readline({ delimiter: '\n' });
        this.port.pipe(this.parser)
        this.parser.addListener('data', this.onData.bind(this));
        this.connected = true;
        this.queue = new PrintQueue(this.port, this.parser);

        this.init();
    }

    private init() {
        if (this.port.isOpen) {
            return;
        }
        this.port.open((error) => {
            console.log('open!', { error })
            if (!error) {
                this.connected = true;
                this.afterInit();
                return;
            }
            this.connected = false;
            console.error(error);
        })
    }

    disconect() {
        if (!this.port.isOpen) {
            return;
        }
        this.connected = false;
        this.port.close(error => {
            if (!error) {
                this.connected = false;
                return;
            }
            console.error(error);
        })
    }

    send(data) {
        if (!this.port.writable) {
            console.warn('serial port is not writable');
            return;
        }
        this.port.write(data);
    }

    startPrint(fileName: string) {
        this.queue.startPrint(fileName);
    }

    private afterInit() { }

    private onData(data) {
        console.log(data);
        this.log.push(data);
    }

    get status() {
        return {
            connected: this.connected,
            opened: this.port.isOpen || false,
            portInfo: this.portInfo
        };
    }

}
