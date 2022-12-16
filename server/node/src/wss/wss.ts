import * as WebSocket from 'ws';
import { Subject } from 'rxjs';

const WSS_PORT = 9010;

export interface WSSPack { cmd: string; data?: any; }
export interface WSSEvent { pack: WSSPack, sock: WebSocket }

export class WSS {
    private static started = false;
    static wss: WebSocket.Server;
    private static eventsSbj = new Subject<WSSEvent>();

    static events = WSS.eventsSbj.asObservable();

    static init() {
        if (this.started) return;
        this.started = true;

        this.wss = new WebSocket.Server({ port: WSS_PORT });

        this.wss.addListener('listening', () => {
            console.log(`Web Socket Server is running on port ${WSS_PORT}`);
        })

        this.wss.addListener('connection', sock => {
            console.log('has connection');
            sock.addEventListener('message', event => {
                this.handleData(event.data, sock as any);
            })
        })
    }

    private static handleData(data: string, sock: WebSocket) {
        try {
            const pack = JSON.parse(data);
            if (!pack || !pack.cmd) {
                throw new Error('invalid object content');
            }
            this.handle(pack, sock);
        } catch (ex) {
            console.warn('failed to parse pack:', data);
        }
    }

    private static handle(pack: WSSPack, sock: WebSocket) {
        if (pack.cmd === 'disconnect') {
            console.log('TODO: disconnect');
        }
        else {
            this.eventsSbj.next({ pack, sock });
        }
    }

    static send(pack, sock: WebSocket) {
        if (!this.started || !this.wss) {
            console.warn('server is not ready');
            return;
        }
        if (!pack.cmd || typeof pack.cmd !== 'string') {
            console.warn('invalid pack not sent', pack);
            return;
        }
        if (sock.readyState !== sock.OPEN) {
            console.warn('pack not sent', 'client is not connected', { readyState: sock.readyState });
            return;
        }
        const strData = JSON.stringify(pack);
        sock.send(strData);
    }

    static broadcast(pack: WSSPack) {
        if (!this.started || !this.wss) {
            console.warn('server is not ready');
            return;
        }
        if (!pack.cmd || typeof pack.cmd !== 'string') {
            console.warn('invalid pack not sent', pack);
            return;
        }
        const strData = JSON.stringify(pack);
        this.wss.clients.forEach(function each(client) {
            if (client.readyState === WebSocket.OPEN) {
                client.send(strData);
            }
        });
    }

}