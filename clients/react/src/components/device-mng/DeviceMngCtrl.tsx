import { PropsWithChildren, useEffect } from 'react';
import { Subject, filter, takeUntil } from 'rxjs';

import { useAppContext } from '@/AppContext';
import useInstanceOf from '@/hooks/useInstanceOf';

import { useDeviceMngContext } from './context/useDeviceMngContext';

export default function DeviceMngCtrl(props: PropsWithChildren) {
    const { wsClient } = useAppContext();
    const destroySbj = useInstanceOf(Subject<void>);

    const { storeEmitter, logsEmitter } = useDeviceMngContext();

    useEffect(() => {
        listenWS();
        return () => {
            destroySbj.next();
            destroySbj.complete();
        };
    }, []);

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
        logsEmitter.update(d => {
            d.str = data + '\n';
        });
    }

    function onLog(data: string) {
        logsEmitter.update(d => {
            if (d.str) {
                d.str += '\n' + data
            } else {
                d.str = data
            }
        });
    }

    function onFiles(data: string[]) {
        storeEmitter.update(d => {
            d.files.entries = data;
        });
    }

    return props.children;
}