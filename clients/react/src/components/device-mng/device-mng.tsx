import DeviceMngCtrl from './DeviceMngCtrl';
import DeviceMngProvider from './context/DeviceMngProvider';

interface Props { }

export default function DeviceMng(_props: Props) {

    return (
        <DeviceMngProvider>
            <DeviceMngCtrl />
        </DeviceMngProvider>
    );
}