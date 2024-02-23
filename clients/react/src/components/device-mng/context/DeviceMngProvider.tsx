import { PropsWithChildren } from 'react';
import { DeviceMngContext, useDeviceMngContextValue } from './DeviceMngContext';

export default function DeviceMngProvider(props: PropsWithChildren) {
    const value = useDeviceMngContextValue();

    return (
        <DeviceMngContext.Provider value={value}>
            {props.children}
        </DeviceMngContext.Provider>
    );
}