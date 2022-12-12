import { createContext, useContext } from 'react';
import { WsClient } from './services/ws-client';

export interface AppContextValue {
    wsClient: WsClient | null;
}

export const AppContext = createContext<AppContextValue>({
    wsClient: null
});

export function useAppContext() {
    return useContext(AppContext);
}
