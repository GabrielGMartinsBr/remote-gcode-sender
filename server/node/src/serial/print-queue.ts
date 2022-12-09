import { SerialPort, ReadlineParser } from 'serialport';

import { FileManager } from '../file-manager';

export class PrintQueue {
    index: number;
    running: boolean;
    complete: boolean;
    private content: string;
    private lines: string[];

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
        this.next();
    }

    onSerialData(data: string) {
        console.log('[PRINT SERIAL]:', data);
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
        }

        if (typeof line !== 'string') {
            console.log(line);
            throw 'invalid type of line';
        }

        // Remove comments and trim
        line = line.replace(/;.*$/gi, '').trim();

        if (!line || /^;/.test(line)) {
            this.index++;
            return this.next();
        }

        if (this.port.writable) {
            this.port.write(line + '\n');
            console.log('sending', line);
        }
    }

}