import { Subject, ReplaySubject } from 'rxjs';
import { take } from 'rxjs/operators';
import { WSSPack } from '../types/wss-types';

export class WSC {
    static started = false;
    private static wsc: WebSocket;
    private static eventsSbj = new Subject<WSSPack>();
    private static readySbj = new ReplaySubject<void>();

    static events = WSC.eventsSbj.asObservable();
    static ready = WSC.readySbj.asObservable().pipe(take(1));

    static async init() {
        if (this.started) return;
        this.started = true;

        const ip = await this.getIp() || 'localhost';

        this.wsc = new WebSocket(`ws://${ip}:9010`);

        this.wsc.addEventListener('open', () => {
            this.send({ cmd: 'serialGetStatus' })
            this.readySbj.next();
            this.readySbj.complete();
            console.log(`connected to ws://${ip}:9010`)
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
            console.warn(
                'pack not sent',
                'client is not connected',
                { readyState: this.wsc.readyState }
            );
            return;
        }
        const strData = JSON.stringify({ cmd, data });
        this.wsc.send(strData);
    }

    private static async getIp() {
        return '192.168.1.100'
    }
}
