import { createContext } from 'react';
import { useRefSet3 } from '@/hooks/useRefSet3';
import { useRxEmitter } from '../../../modules/RxEvents/useRxEmitter';

export function useDeviceMngContextValue() {
    const elements = useRefSet3(class {
        container: HTMLDivElement | null = null;
    });
    const storeEmitter = useRxEmitter({
        logs: {
            entries: [] as string[],
            str: ''
        }
    });

    return {
        elements,
        storeEmitter,
    };
}

export type DeviceMngContextValue = ReturnType<typeof useDeviceMngContextValue>;

export const DeviceMngContext = createContext<DeviceMngContextValue | null>(null);