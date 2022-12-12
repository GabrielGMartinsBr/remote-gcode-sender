import { ReplaySubject, Subject, take } from 'rxjs';
import { WSSPack } from '@/types/wss-types';

export class WsClient {
    private hostUrl?: string;
    private wsc?: WebSocket;

    private eventsSbj = new Subject<WSSPack>();
    private readySbj = new ReplaySubject<void>();

    events = this.eventsSbj.asObservable();
    ready = this.readySbj.asObservable().pipe(take(1));

    get isConnected() {
        return this.wsc?.readyState === WebSocket.OPEN;
    }

    connect(hostUrl: string) {
        if (this.isConnected) {
            throw new Error('client is already connected');
        }
        if (this.wsc) {
            this.wsc.close();
        }
        this.hostUrl = hostUrl;
        this.wsc = new WebSocket(hostUrl);
        this.wsc.addEventListener('open', () => this.onOpen());
        this.wsc.addEventListener('message', e => this.onMessage(e));
    }

    destroy() {
        if (this.wsc) {
            this.wsc.close();
        }
    }

    send({ cmd, data } = {} as { cmd: string, data?: any }) {
        if (!this.wsc || !this.isConnected) {
            console.warn('client is not ready');
            return;
        }
        if (!cmd || typeof cmd !== 'string') {
            console.warn('invalid pack not sent', { cmd, data });
            return;
        }
        const strData = JSON.stringify({ cmd, data });
        this.wsc.send(strData);
    }

    private onOpen() {
        this.send({ cmd: 'serialGetStatus' })
        this.readySbj.next();
        this.readySbj.complete();
        console.log(`connected to ${this.hostUrl}`)
    }

    private onMessage(e: MessageEvent<any>) {
        try {
            const pack = JSON.parse(e.data);
            if (!pack || !pack.cmd) {
                throw 'invalid object content';
            }
            this.handlePack(pack);
        } catch (ex) {
            console.warn('failed to parse pack:', e.data);
        }
    }

    private handlePack(pack: any) {
        if (pack?.cmd !== 'string') {
            return;
        }
        if (pack.cmd === 'disconnect') {
            console.log('TODO: disconnect');
        }
        else {
            this.eventsSbj.next(pack);
        }
    }

}
