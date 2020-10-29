import * as SerialPort from 'serialport';

export class SerialMachine {
    port: SerialPort;
    log: string = '';

    private connected: boolean;
    private parser: SerialPort.parsers.Readline;

    constructor(private portInfo: SerialPort.PortInfo) {
        this.port = new SerialPort(portInfo.path, { autoOpen: false, baudRate: 115200 });
        this.parser = new SerialPort.parsers.Readline({ delimiter: '\n' });
        this.port.pipe(this.parser)
        this.parser.addListener('data', this.onData.bind(this));

        this.init();
    }

    private init() {
        this.port.open((error) => {
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

    private afterInit() { }

    private onData(data) {
        console.log(data);
        if (data) this.log += data;
    }

    get status() {
        return {
            connected: true,
            opened: this.connected || false,
            portInfo: this.portInfo
        };
    }

}
