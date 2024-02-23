import { useEffect, useMemo, useState } from 'react'
import { filter } from 'rxjs';
import DeviceMngPage from '@/components/device-mng/DeviceMng';
import { DeviceSelectorPage } from '@/components/device-selector/device-selector';
import { Transition } from '@headlessui/react';
import { useAppContext } from '@/AppContext';
import HostCtrl from '@/components/host-ctrl/HostCtrl';
import ConnectionBar from '@/components/connection-bar/ConnectionBar';

export default function ViewCtrl() {
    const [connected, setConnected] = useState(false);
    const [attached, setAttached] = useState(false);
    const { wsClient } = useAppContext();

    // useEffect(() => {
    //     if (!wsClient || !host) {
    //         return;
    //     }
    //     const hostUrl = `ws://${host.domain}:${host.wsPort}`
    //     wsClient.connect(hostUrl);
    //     return () => {
    //         wsClient.disconnect();
    //     }
    // }, [])

    useEffect(() => {
        if (!wsClient) {
            return;
        }
        const $ = wsClient.ready.subscribe((isConnected) => {
            setConnected(isConnected);
        });
        return () => {
            $.unsubscribe();
        }
    }, []);

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
                        setAttached(
                            event.data.opened || false
                        )
                }
            });
        return () => {
            $.unsubscribe();
        }
    }, []);

    const isView = useMemo(() => {
        const hostCtrl = !connected;
        const deviceSelector = connected && !attached;
        const deviceMng = connected && attached;
        return {
            hostCtrl,
            deviceSelector,
            deviceMng,
        }
    }, [connected, attached]);

    return (
        <>
            {/* Host Ctrl */}
            <Transition
                appear show={isView.hostCtrl} as='div'
                enter='ease-out duration-300'
                enterFrom='opacity-0 -translate-y-full'
                enterTo='opacity-100 translate-y-0'
                leave='ease-in duration-150 translate-y-0 absolute inset-0'
                leaveFrom='opacity-100 translate-y-0'
                leaveTo='opacity-0 -translate-y-full'
            >
                <HostCtrl />
            </Transition>

            {/* Device Selector */}
            <Transition
                appear show={isView.deviceSelector} as='div'
                enter='ease-out duration-300'
                enterFrom='opacity-0 -translate-y-full'
                enterTo='opacity-100 translate-y-0'
                leave='ease-in duration-150 translate-y-0 absolute inset-0'
                leaveFrom='opacity-100 translate-y-0'
                leaveTo='opacity-0 -translate-y-full'
            >
                <ConnectionBar />
                <DeviceSelectorPage />
            </Transition>

            {/* Device Mng */}
            <Transition
                appear show={isView.deviceMng} as='div'
                enter='ease-out duration-300'
                enterFrom='opacity-0 translate-y-full'
                enterTo='opacity-100 translate-y-0'
                leave='ease-in duration-150 translate-y-0 absolute inset-0'
                leaveFrom='opacity-100 translate-y-0'
                leaveTo='opacity-0 translate-y-full'
            >
                <ConnectionBar />
                <DeviceMngPage />
            </Transition>
        </>
    )
}
