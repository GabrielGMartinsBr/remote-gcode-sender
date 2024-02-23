import { useDeviceMngContext } from '@/components/device-mng/context/useDeviceMngContext';
import { GCodeFileEntry } from '../types';
import FileEntry from './FileEntry';
import { useRxSubscription } from '@/modules/RxEvents';

interface Props {
    items: GCodeFileEntry[];
}

export default function FileEntries(props: Props) {
    const { items } = props;
    // const { storeEmitter } = useDeviceMngContext();
    // const store = useRxSubscription(storeEmitter, { reRenderOnChange: true });
    // const { files } = store.value;

    return (
        <div className={`@tw{
            flex flex-row flex-wrap
            justify-start items-start
            gap-4
            
        }`}>
            {items.map((item) => (
                <FileEntry
                    key={item.uid}
                    item={item}
                />
            ))}
        </div>
    );
}