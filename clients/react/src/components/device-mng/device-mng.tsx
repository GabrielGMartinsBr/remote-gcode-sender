import { useEffect, useRef, useState } from 'react';
import { Subject } from 'rxjs';
import { takeUntil, filter } from 'rxjs/operators';

import { DeviceMngProvider } from './device-mng-context';
import { DeviceStatus } from './device-status';
import { BasicControls } from './basic-controls';
import { FileCtrl } from './file-ctrl';
import { DeviceTerm } from './device-term';
import { WorkbenchFiles } from './workbench-files';

import './device-mng.scss';
import { useAppContext } from '@/AppContext';
import FileManager from '../file-manager/FileManager';

export function DeviceMngPage() {
    const { wsClient } = useAppContext();
    const { current: destroySbj } = useRef(new Subject<void>());
    const [logs, setLogs] = useState('');
    const [files, setFiles] = useState<string[]>([]);

    useEffect(() => onInit(), []);

    function onInit() {
        console.log('DeviceMngPage mounted');
        listenWS();

        return onDestroy;
    }

    function onDestroy() {
        destroySbj.next();
        destroySbj.complete();
    }

    function listenWS() {
        if (!wsClient) {
            return;
        }
        const cmdList = [
            'serialDeviceStatus',
            'serialDataLogs',
            'serialDataLog',
            'serialDataFiles'
        ];
        wsClient.events
            .pipe(
                takeUntil(destroySbj),
                filter(e => e && cmdList.indexOf(e.cmd) > -1)
            )
            .subscribe(event => {
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

    function onLogs(data: string) {
        setLogs(data + '\n');
    }

    function onLog(data: string) {
        setLogs(prev => `${prev}${data}\n`);
    }

    function onFiles(data: string[]) {
        setFiles(data);
    }

    return (
        <DeviceMngProvider>
            <div className="device-mng-page">

                <div className="base-content-block ">
                    <h2 className='text-xl font-semibold'>
                        Device Manager
                    </h2>
                </div>
                <DeviceStatus />
                <BasicControls />
                <FileManager />
                <FileCtrl />
                <DeviceTerm logs={logs} />
                <WorkbenchFiles files={files} />
            </div>

        </DeviceMngProvider>
    )
}
