import { ReplaySubject, Subject } from 'rxjs';
import { WSSPack } from '@/types/wss-types';

export class WsClient {
    private hostUrl?: string;
    private wsc?: WebSocket;

    private eventsSbj = new Subject<WSSPack>();
    private readySbj = new ReplaySubject<boolean>();

    events = this.eventsSbj.asObservable();
    ready = this.readySbj.asObservable();

    constructor() {
        this.onOpen = this.onOpen.bind(this);
        this.onClose = this.onClose.bind(this);
    }

    get isConnected() {
        return this.wsc?.readyState === WebSocket.OPEN;
    }

    connect(hostUrl: string) {
        if (this.isConnected) {
            throw new Error('client is already connected');
        }
        this.hostUrl = hostUrl;
        this.wsc = new WebSocket(hostUrl);
        this.wsc.addEventListener('open', this.onOpen);
        this.wsc.addEventListener('close', this.onClose);
        this.wsc.addEventListener('message', e => this.onMessage(e));
    }

    disconnect() {
        if (!this.wsc) {
            return;
        }
        const wsc = this.wsc;
        if (this.isConnected) {
            wsc.close();
        } else {
            this.cancelConnection(wsc);
        }
    }

    send({ cmd, data } = {} as { cmd: string, data?: any }) {
        if (!this.wsc || !this.isConnected) {
            console.warn('client is not ready', cmd, data);
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
        this.readySbj.next(this.isConnected);
        console.log(`connected to ${this.hostUrl}`)
    }

    private onClose(e: CloseEvent) {
        console.log(e.code);
        this.readySbj.next(this.isConnected);
    }

    private cancelConnection(wsc: WebSocket) {
        wsc.removeEventListener('open', this.onOpen);
        wsc.removeEventListener('close', this.onClose);
        wsc.addEventListener('open', () => {
            wsc.close();
            console.log('connection canceled!')
        });
    }

    private onMessage(e: MessageEvent<any>) {
        try {
            const pack = JSON.parse(e.data);
            if (!pack || typeof pack.cmd !== 'string') {
                throw 'invalid object content';
            }
            this.handlePack(pack);
        } catch (ex) {
            console.warn(ex);
        }
    }

    private handlePack(pack: { cmd: string, data: any }) {
        if (pack.cmd === 'disconnect') {
            console.log('TODO: disconnect');
        }
        else {
            this.eventsSbj.next(pack);
        }
    }

}
