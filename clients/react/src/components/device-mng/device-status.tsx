import { useAppContext } from '@/AppContext';

export function DeviceStatus() {
    const { wsClient } = useAppContext();

    function disconnect() {
        if (wsClient) {
            wsClient.send({ cmd: 'serialDisconnect' });
        }
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
