/* eslint-disable react-hooks/exhaustive-deps */

import React, { useEffect, useRef, useState } from 'react';
import { Subject } from 'rxjs';
import { takeUntil, filter } from 'rxjs/operators';

import { WSC } from '../../wsc/wsc';
import { DeviceMngProvider } from './device-mng-context';
import { DeviceStatus } from './device-status';
import { BasicControls } from './basic-controls';
import { FileCtrl } from './file-ctrl';
import { DeviceTerm } from './device-term';
import { WorkbenchFiles } from './workbench-files';

import './device-mng.scss';

export function DeviceMngPage() {
    const { current: destroySbj } = useRef(new Subject<void>());
    // const { pushLog, logs } = useLogs();
    const [logs, setLogs] = useState('');
    const [files, setFiles] = useState(null);

    useEffect(() => onInit(), []);

    function onInit() {
        console.log('Init DeviceMngPage');
        listenWS();

        return onDestroy;
    }

    function onDestroy() {
        destroySbj.next();
        destroySbj.complete();
    }

    function listenWS() {
        const cmds = ['serialDeviceStatus', 'serialDataLogs', 'serialDataLog', 'serialDataFiles'];
        WSC.events
            .pipe(
                takeUntil(destroySbj),
                filter(e => e && cmds.indexOf(e.cmd) > -1)
            )
            .subscribe(event => {
                // console.log(event);
                switch (event.cmd) {
                    case 'serialDataLogs':
                        return onLogs(event.data);
                    case 'serialDataLog':
                        return onLog(event.data);
                    case 'serialDataFiles':
                        return onFiles(event.data);
                }
            });
    }

    function onLogs(data) {
        setLogs(data + '\n');
    }

    function onLog(data) {
        setLogs(prev => `${prev}${data}\n`);
    }

    function onFiles(data) {
        setFiles(data);
    }

    return (
        <DeviceMngProvider>
            <div className="device-mng-page">

                <div className="base-content-block">
                    <h2>Device MNG!</h2>
                </div>

                <DeviceStatus />
                <BasicControls />
                <FileCtrl />
                <DeviceTerm logs={logs} />
                <WorkbenchFiles files={files} />
            </div>
        </DeviceMngProvider>
    )
}
