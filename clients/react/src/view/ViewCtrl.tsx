import { useEffect, useState } from 'react'
import { filter } from 'rxjs';
import { DeviceMngPage } from '@/components/device-mng/device-mng';
import { DeviceSelectorPage } from '@/components/device-selector/device-selector';
import { Transition } from '@headlessui/react';
import { WSC } from '../wsc/wsc';

export default function ViewCtrl() {
    const [connected, setConnected] = useState(false);


    useEffect(() => {
        const cmdList = ['serialDeviceStatus'];
        WSC.init();
        const $ = WSC.events
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
