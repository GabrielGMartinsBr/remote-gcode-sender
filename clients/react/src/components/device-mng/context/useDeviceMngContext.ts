import { useContext } from 'react';
import { DeviceMngContext } from './DeviceMngContext';

export function useDeviceMngContext() {
    const context = useContext(DeviceMngContext);

    if (!context) {
        throw new Error('DeviceMng context provider not found.');
    }

    return context;
}