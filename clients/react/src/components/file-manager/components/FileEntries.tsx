import { useRxSubscription } from '@/modules/RxEvents';
import { useFileManagerContext } from '../context/useFileManagerContext';
import { GCodeFileEntry } from '../types';
import FileEntry from './FileEntry';

interface Props {
    items: GCodeFileEntry[];
}

export default function FileEntries(props: Props) {
    const { items } = props;
    const { storeEmitter } = useFileManagerContext();
    const store = useRxSubscription(storeEmitter, { reRenderOnChange: true });

    console.log('[FileEntries render]');

    return (
        <div className={`@tw{
            flex flex-row flex-wrap
            justify-start items-start
            gap-4
            
        }`}>
            <div className={`@tw{
                bg-red-300 p-9
            }`}>
                {store.value.v}
            </div>
            {items.map((item) => (
                <FileEntry
                    key={item.uid}
                    item={item}
                />
            ))}
        </div>
    );
}