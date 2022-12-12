import { SerialPort } from 'serialport';
import { WSS, WSSEvent, WSSPack } from '../wss/wss';
import { SerialMachine } from './serial-machine';
import { FileManager } from '../file-manager';

export class Serial {
    static device: SerialMachine;

    static init() {
        this.bindWS();
    }

    static async getDevices() {
        const devices = await SerialPort.list();
        return devices.filter(i => i && i.path && i.productId);
    }

    static bindWS() {
        WSS.events.subscribe(event => {
            // console.log('receive event', event.pack)
            if (event && event.pack && event.pack.cmd && event.sock) {
                return this.handle(event);
            }
            console.warn('invalid event:', event);
        })
    }

    static handle({ pack, sock } = {} as WSSEvent) {
        switch (pack.cmd) {
            case 'serialDisconnect':
                this.device.disconnect();
                this.sendDeviceStatus(sock);
                break;

            case 'serialGetStatus':
                this.sendDeviceStatus(sock);
                break;

            case 'serialGetDevices':
                this.sendDevices(sock);
                break;

            case 'serialConnectDevice':
                if (pack.data && pack.data.portInfo) {
                    this.connectDevice(pack.data.portInfo, sock);
                    break;
                }

            case 'serialSendData':
                if (typeof pack.data === 'string') {
                    this.device.send(pack.data);
                    break;
                }

            case 'serialGetLog':
                this.sendLogs(sock);
                break;

            case 'printStart':
                if (pack.data && pack.data.fileName && typeof pack.data.fileName === 'string') {
                    this.device.startPrint(pack.data.fileName);
                    break;
                }
                break;

            case 'serialGetFiles':
                this.sendFiles(sock);
                break;

            case 'serialSendPresetCommand':
                if (pack.data && typeof pack.data === 'string') {
                    this.device.executePresetCommand(pack.data);
                    break;
                }
            case 'serialPrintWorkbenchFile':
                if (pack.data && typeof pack.data === 'string') {
                    this.printWorkbenchFile(pack.data);
                }
                break;

            default:
                console.warn('unexpected pack', pack);
        }
    }

    private static sendDeviceStatus(sock) {
        const status = this.device && this.device.status || { connected: false };
        if (status) {
            const pack: WSSPack = { cmd: 'serialDeviceStatus', data: status };
            WSS.send(pack, sock);
        }
    }

    private static async sendDevices(sock) {
        const data = await this.getDevices();
        const pack: WSSPack = { cmd: 'serialDataDevices', data };
        WSS.send(pack, sock);
    }

    private static async connectDevice(portInfo, sock) {
        if (!portInfo || !portInfo.path) {
            console.warn('invalid portInfo', portInfo);
            return;
        }
        this.device = new SerialMachine(portInfo);
        this.sendDeviceStatus(sock);
    }

    private static sendLogs(sock) {
        const pack: WSSPack = { cmd: 'serialDataLogs', data: this.device.log.join('\n') || '' };
        WSS.send(pack, sock);
    }

    private static async sendFiles(sock) {
        const files = await FileManager.workbenchFiles();
        const pack: WSSPack = { cmd: 'serialDataFiles', data: files || [] };
        WSS.send(pack, sock);
    }

    private static async printWorkbenchFile(fileName) {
        this.device.startPrint(fileName);
    }

}
