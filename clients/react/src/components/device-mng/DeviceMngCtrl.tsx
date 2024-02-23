import { useAppContext } from '@/AppContext';
import { useEffect, useRef, useState } from 'react';
import { Subject, filter, takeUntil } from 'rxjs';
import { DeviceMngProvider } from './device-mng-context';
import { DeviceStatus } from './device-status';
import { BasicControls } from './basic-controls';
import FileManager from '../file-manager/FileManager';
import { FileCtrl } from './file-ctrl';
import { DeviceTerm } from './device-term';
import { WorkbenchFiles } from './workbench-files';

import './device-mng.scss';
import { useDeviceMngContext } from './context/useDeviceMngContext';

interface Props { }

export default function DeviceMngCtrl(_props: Props) {
    const { wsClient } = useAppContext();
    const { current: destroySbj } = useRef(new Subject<void>());
    const [files, setFiles] = useState<string[]>([]);

    const { storeEmitter } = useDeviceMngContext();

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
        storeEmitter.update(d => {
            d.logs.str = data + '\n';
        });
    }

    function onLog(data: string) {
        storeEmitter.update(d => {
            if (d.logs.str) {
                d.logs.str += '\n' + data
            } else {
                d.logs.str = data
            }
        });
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
                <DeviceTerm />
                <WorkbenchFiles files={files} />
            </div>

        </DeviceMngProvider>
    )
}
