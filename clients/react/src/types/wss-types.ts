export interface WSSPack { cmd: string; data?: any; }
export interface WSSEvent { pack: WSSPack, sock: WebSocket }