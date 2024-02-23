import DeviceMngCtrl from './DeviceMngCtrl';
import DeviceMngView from './DeviceMngView';
import DeviceMngProvider from './context/DeviceMngProvider';

import './device-mng.scss';

interface Props { }

export default function DeviceMng(_props: Props) {

    return (
        <DeviceMngProvider>
            <DeviceMngCtrl>
                <DeviceMngView />
            </DeviceMngCtrl>
        </DeviceMngProvider>
    );
}