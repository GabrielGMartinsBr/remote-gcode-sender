import { createContext, useContext } from 'react';
import { WsClient } from './services/ws-client';
import { ServerHost } from './types/server-host';

export interface AppContextValue {
    wsClient: WsClient | null;
    host: ServerHost | null;
    setHost: (host: ServerHost) => void;
}

export const AppContext = createContext<AppContextValue>({
    wsClient: null,
    host: null,
    setHost: () => null,
});

export function useAppContext() {
    return useContext(AppContext);
}
