import { SerialPort, ReadlineParser } from 'serialport';
import moment from 'moment';

import { FileManager } from '../file-manager';

export class PrintQueue {
    index: number;
    running: boolean;
    complete: boolean;
    private content: string;
    private lines: string[];

    private startTime: Date;

    constructor(private port: SerialPort, private parser: ReadlineParser) {
        this.onSerialData = this.onSerialData.bind(this);
        this.destroy = this.destroy.bind(this);

        parser.addListener('data', this.onSerialData);
        port.addListener('close', this.destroy);
    }

    destroy() {
        this.parser.removeListener('data', this.onSerialData);
        this.port.removeListener('close', this.destroy);
    }

    async loadFile(fileName) {
        this.content = await FileManager.getFile(fileName);
        this.lines = this.content.split('\n');
    }

    async startPrint(fileName: string) {
        await this.loadFile(fileName);
        if (!this.content) {
            return;
        }
        this.index = 0;
        this.complete = false;
        this.running = true;
        this.startTime = new Date();
        this.onStart();
        this.next();
    }

    onSerialData(data: string) {
        if (/^ok/i.test(data.trim())) {
            if (this.running) {
                this.index++;
                this.next();
            }
        }
    }

    private next() {
        if (this.complete || !this.running) {
            return;
        }

        let line = this.lines[this.index];

        // When file finish
        if (line === undefined) {
            this.running = false;
            this.complete = true;
            this.onFinish();
            return;
        }

        if (typeof line !== 'string') {
            console.log(line);
            throw new Error('invalid type of line');
        }

        // Remove comments and trim
        line = line.replace(/;.*$/gi, '').trim();

        if (!line || /^;/.test(line)) {
            this.index++;
            return this.next();
        }

        if (this.port.writable) {
            this.port.write(line + '\n');
        }
    }

    private onStart() {
        const start = moment(this.startTime);
        console.log('Print starts on:', start.format("HH:mm:ss.SSS"));
    }

    private onFinish() {
        const start = moment(this.startTime);
        const end = moment();
        const diff = end.diff(start);
        let duration = moment.utc(diff);
        console.log('Print ends on:', end.format("HH:mm:ss.SSS"));
        console.log('Print finished in:', duration.format("HH:mm:ss.SSS"));
    }

}