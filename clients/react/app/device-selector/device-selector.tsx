/* eslint-disable react-hooks/exhaustive-deps*/

import React, { useState, useEffect, useRef } from 'react';
import { Subject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';

import './device-selector.scss';
import { WSC } from '../wsc/wsc';

export function DeviceSelectorPage() {
    const pageRef = useRef(null);
    const [devices, setDevices] = useState([]);
    const destroySbj = new Subject<void>();

    // Mount/Unmount
    useEffect(() => {
        listenWS();
        WSC.ready.subscribe(() => refresh());
        return () => destroy();
    }, [pageRef]);

    // Destroy
    function destroy() {
        destroySbj.next();
        destroySbj.complete();
    }

    // Regresh devices
    function refresh() {
        WSC.send({ cmd: 'serialGetDevices' });
    }

    // Websocket

    function listenWS() {
        const cmds = ['serialDataDevices'];
        WSC.events
            .pipe(
                takeUntil(destroySbj),
                filter(e => e && cmds.indexOf(e.cmd) > -1)
            )
            .subscribe(event => {
                switch (event.cmd) {
                    case 'serialDataDevices':
                        return setDevices(event.data);
                }
            });
    }

    function connect(portInfo) {
        console.log('connect', { portInfo });
        WSC.send({ cmd: 'serialConnectDevice', data: { portInfo } });
    }

    // Renders

    function deviceItem(i, index) {
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
