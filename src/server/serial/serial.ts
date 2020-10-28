import * as SerialPort from 'serialport';
import { WSS, WSSEvent, WSSPack } from '../wss/wss';

export class Serial {

    static init() {
        this.bindWS();
    }

    static async getDevices() {
        const devices = await SerialPort.list();
        // console.log(devices);
        return devices;
        // for (const device of devices) {
        //     if (device && device.manufacturer && /arduino|silicon labs/gi.test(device.manufacturer)) {
        //         return device;
        //     } else console.log(device)
        // }
        // return null;
    }

    static bindWS() {
        WSS.events.subscribe(event => {
            console.log('receive event', event.pack)
            if (event && event.pack && event.pack.cmd && event.sock) {
                return this.handle(event);
            }
            console.warn('invalid event:', event);
        })
    }

    static handle({ pack, sock } = {} as WSSEvent) {
        switch (pack.cmd) {
            case 'serialGetDevices':
                this.sendDevices(sock);
                break;

            default:
                console.warn('unexpected pack', pack);
        }
    }

    private static async sendDevices(sock) {
        const data = await this.getDevices();
        const pack: WSSPack = { cmd: 'serialDataDevices', data };
        WSS.send(pack, sock);
    }

}