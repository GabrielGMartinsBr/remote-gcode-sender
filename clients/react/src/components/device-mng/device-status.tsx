import React from 'react';
import { WSC } from '../../wsc/wsc';

export function DeviceStatus() {

    function disconnect() {
        WSC.send({ cmd: 'serialDisconect' });
    }

    return (
        <div className="device-status base-content-block d-flex align-items-center">

            <div className="connected-device">
                Connected Device: <span className="device-name">Custom Printer</span>
            </div>

            <button type="button" className="ml-auto" onClick={disconnect}>Disconnect</button>
        </div>
    )
}
