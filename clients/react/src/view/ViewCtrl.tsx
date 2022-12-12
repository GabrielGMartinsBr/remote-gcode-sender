import { useEffect, useState } from 'react'
import { filter } from 'rxjs';
import { DeviceMngPage } from '@/components/device-mng/device-mng';
import { DeviceSelectorPage } from '@/components/device-selector/device-selector';
import { Transition } from '@headlessui/react';
import { useAppContext } from '@/AppContext';

export default function ViewCtrl() {
    const [connected, setConnected] = useState(false);
    const { wsClient } = useAppContext();
    const ctx = useAppContext();

    useEffect(() => {
        if (!wsClient) {
            return;
        }
        wsClient.connect('ws://192.168.1.100:9010');
        return () => {
            wsClient.disconnect();
        }
    }, [])

    useEffect(() => {
        if (!wsClient) {
            return;
        }
        const cmdList = ['serialDeviceStatus'];
        const $ = wsClient.events
            .pipe(
                filter(e => e && cmdList.indexOf(e.cmd) > -1)
            )
            .subscribe(event => {
                switch (event.cmd) {
                    case 'serialDeviceStatus':
                        setConnected(
                            event.data.opened || false
                        )
                }
            });

        return () => {
            $.unsubscribe();
        }
    }, []);

    return (
        <>
            <Transition
                appear show={!connected} as='div'
                enter='ease-out duration-300'
                enterFrom='opacity-0 -translate-y-full'
                enterTo='opacity-100 translate-y-0'
                leave='ease-in duration-150 translate-y-0 absolute inset-0'
                leaveFrom='opacity-100 translate-y-0'
                leaveTo='opacity-0 -translate-y-full'
            >
                <DeviceSelectorPage />
            </Transition>
            <Transition
                appear show={connected} as='div'
                enter='ease-out duration-300'
                enterFrom='opacity-0 translate-y-full'
                enterTo='opacity-100 translate-y-0'
                leave='ease-in duration-150 translate-y-0 absolute inset-0'
                leaveFrom='opacity-100 translate-y-0'
                leaveTo='opacity-0 translate-y-full'
            >
                <DeviceMngPage />
            </Transition>
        </>
    )
}
