import { SerialPort, ReadlineParser, } from 'serialport';
import * as moment from 'moment';
import { PrintQueue } from './print-queue';
import { WSS, WSSPack } from '../wss/wss';

export class SerialMachine {
    port: SerialPort;
    log: string[] = [];

    private connected: boolean;
    private parser: ReadlineParser;
    private queue: PrintQueue;

    constructor(private portInfo) {
        this.port = new SerialPort({ autoOpen: false, baudRate: 115200, path: portInfo.path, });
        // this.port = new SerialPort(portInfo.path, { autoOpen: false, baudRate: 250000 });
        this.parser = new ReadlineParser({ delimiter: '\n' });
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

    disconnect() {
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
        console.log(data);
        if (!this.port.writable) {
            console.warn('serial port is not writable');
            return;
        }
        this.port.write(data);
    }

    startPrint(fileName: string) {
        this.queue.startPrint(fileName);
    }

    private afterInit() {
        this.sendStatus();
    }

    private onData(data) {
        data = `[${moment().format('L LTS')}] ${data}`
        this.log.push(data);
        this.sendLog(data);
    }

    get status() {
        return {
            connected: this.connected,
            opened: this.port.isOpen || false,
            portInfo: this.portInfo
        };
    }

    sendStatus() {
        const pack: WSSPack = { cmd: 'serialDeviceStatus', data: this.status };
        WSS.broadcast(pack);
    }

    private sendLogs() {
        const pack: WSSPack = { cmd: 'serialDataLogs', data: this.log.join('\n') || '' };
        WSS.broadcast(pack);
    }

    private sendLog(log: string) {
        const pack: WSSPack = { cmd: 'serialDataLog', data: log };
        WSS.broadcast(pack);
    }

    executePresetCommand(command: string) {
        console.log(command);
        switch (command) {
            case 'Home':
                this.send(`G28\n`);
                break;
            case 'HomeX':
                this.send(`G28 X\n`);
                break;
            case 'HomeY':
                this.send(`G28 Y\n`);
                break;
            case 'HomeZ':
                this.send(`G28 Z\n`);
                break;
        }
    }

}
