import { useState, useEffect, useRef } from 'react';
import { Subject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';
import { useAppContext } from '@/AppContext';

import './device-selector.scss';

export function DeviceSelectorPage() {
    const pageRef = useRef(null);
    const [devices, setDevices] = useState([]);

    const { wsClient } = useAppContext();

    // Mount/Unmount
    useEffect(() => {
        if (!wsClient) {
            return;
        }
        const destroySbj = new Subject<void>();
        const cmdList = ['serialDataDevices'];

        wsClient.events
            .pipe(
                takeUntil(destroySbj),
                filter(e => e && cmdList.indexOf(e.cmd) > -1)
            )
            .subscribe(event => {
                switch (event.cmd) {
                    case 'serialDataDevices':
                        return setDevices(event.data);
                }
            });

        wsClient.ready
            .pipe(takeUntil(destroySbj))
            .subscribe(() => refresh());

        return () => {
            destroySbj.next();
            destroySbj.complete();
        }
    }, [pageRef]);


    function connect(portInfo: any) {
        if (!wsClient) {
            return;
        }
        console.log('connect', { portInfo });
        wsClient.send({
            cmd: 'serialConnectDevice',
            data: { portInfo }
        });
    }

    function refresh() {
        if (wsClient) {
            wsClient.send({ cmd: 'serialGetDevices' });
        }
    }

    // Renders

    function deviceItem(i: any, index: number) {
        return (
            <div key={index} className="device-item">
                <div className="device-info">
                    <pre>{JSON.stringify(i, null, 4)}</pre>
                </div>
                <div className="device-actions">
                    <button onClick={() => connect(i)}>Select</button>
                </div>
            </div>
        )
    }

    return (
        <div className="device-selector-page base-content-block" ref={pageRef}>
            <div className="page-header">
                <h2>Devices List</h2>

                <button className="ml-auto" onClick={refresh}>Refresh</button>
            </div>

            <div className="devices-list">
                {devices.map(deviceItem)}
            </div>
        </div>
    );
}
