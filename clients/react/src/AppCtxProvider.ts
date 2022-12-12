import { createContext, useContext } from 'react';
import { WSC } from '@/wsc/wsc';

interface AppCtxValue {
    WSC: typeof WSC;
}

export const AppCtx = createContext<AppCtxValue>({
    WSC: WSC
});

export function useAppContext() {
    return useContext(AppCtx);
}
