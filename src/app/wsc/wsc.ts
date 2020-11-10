import { Subject } from 'rxjs';
import { WSSPack } from 'src/server/wss/wss';
import axios from 'axios';

export class WSC {
    private static started = false;
    private static wsc: WebSocket;
    private static eventsSbj = new Subject<WSSPack>();

    static events = WSC.eventsSbj.asObservable();

    static async init() {
        if (this.started) return;
        this.started = true;

        const ip = await this.getIp() || 'localhost';

        this.wsc = new WebSocket(`ws://${ip}:9010`);

        this.wsc.addEventListener('open', () => {
            // console.log('opened');
            this.send({ cmd: 'test' })
            this.send({ cmd: 'serialGetStatus' })
        })

        this.wsc.addEventListener('message', event => {
            this.handleData(event.data);
        })
    }

    private static handleData(data: string) {
        try {
            const pack = JSON.parse(data);
            if (!pack || !pack.cmd) {
                throw 'invalid object content';
            }
            this.handle(pack);
        } catch (ex) {
            console.warn('failed to parse pack:', data);
        }
    }

    private static handle(pack: { cmd: string, data: any }) {
        // console.log('receive', pack);
        if (pack.cmd === 'disconect') {
            console.log('TODO: disconect');
        }
        else {
            this.eventsSbj.next(pack);
        }
    }

    static send({ cmd, data } = {} as { cmd: string, data?: any }) {
        if (!this.started || !this.wsc) {
            console.warn('client is not ready');
            return;
        }
        if (!cmd || typeof cmd !== 'string') {
            console.warn('invalid pack not sent', { cmd, data });
            return;
        }
        if (this.wsc.readyState !== this.wsc.OPEN) {
            console.warn('pack not sent', 'client is not connected', { readyState: this.wsc.readyState });
            return;
        }
        const strData = JSON.stringify({ cmd, data });
        this.wsc.send(strData);
    }

    private static async getIp() {
        const res = await axios.get('/params/ip');
        return res && res.data && res.data.ip || null;
    }
}