import { useRxSubscription } from '@/modules/RxEvents';
import FileManager from '../file-manager/FileManager';
import { BasicControls } from './basic-controls';
import { useDeviceMngContext } from './context/useDeviceMngContext';
import { DeviceStatus } from './device-status';
import { DeviceTerm } from './DeviceTerm';
import { FileCtrl } from './file-ctrl';
import { WorkbenchFiles } from './workbench-files';

export default function DeviceMngView() {
    const { storeEmitter } = useDeviceMngContext();

    return (
        <div className='device-mng-page'>
            <div className='base-content-block '>
                <h2 className='text-xl font-semibold'>
                    Device Manager
                </h2>
            </div>
            <DeviceStatus />
            <BasicControls />
            <FileManager />
            <FileCtrl />
            <DeviceTerm />
            <WorkbenchFiles />
        </div>
    );
}