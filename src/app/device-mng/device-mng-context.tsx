import React, { createContext, useState, useContext, useRef } from 'react';

interface DeviceMng {
    logs: string[];
    setLogs?: React.Dispatch<React.SetStateAction<string[]>>;
}

const DeviceMngContext = createContext<DeviceMng>({
    logs: []
});

export function DeviceMngProvider({ children }) {
    const [logs, setLogs] = useState([] as string[]);

    return (
        <DeviceMngContext.Provider value={{ logs, setLogs }}>
            {children}
        </DeviceMngContext.Provider>
    )
}

export function useLogs() {
    const context = useContext(DeviceMngContext);
    const { logs, setLogs } = context;
    // const logsRef = useRef(setLogs);

    function pushLog(log) {
        if (typeof setLogs !== 'function') {
            console.warn('set logs not accessible');
            return;
        }
        setLogs([...logs, log]);
    }

    return { logs, setLogs, pushLog };
}