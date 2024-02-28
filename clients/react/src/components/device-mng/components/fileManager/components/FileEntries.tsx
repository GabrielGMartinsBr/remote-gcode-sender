import { useDeviceMngContext } from '@/components/device-mng/context/useDeviceMngContext';
import { useRxSubscription } from '@/modules/RxEvents';
import { useFileManagerContext } from '../context/useFileManagerContext';
import FileEntry from './FileEntry';

interface Props { }

export default function FileEntries(_props: Props) {
    const { storeEmitter } = useDeviceMngContext();
    const { handlersEmitter } = useFileManagerContext();
    const store = useRxSubscription(storeEmitter, { reRenderOnChange: true });
    const handlers = useRxSubscription(handlersEmitter, { reRenderOnChange: true });
    const { files } = store.value;
    const { onClickFileEntryPrint } = handlers.value;

    return (
        <div className={`@tw{
            flex flex-row flex-wrap
            justify-start items-start
            gap-4
            max-h-[50vh]
            overflow-auto
            scrollbar-thin
            scrollbar-thumb-zinc-600
        }`}>
            {files.entries.map((item) => (
                <FileEntry
                    key={item.uid}
                    item={item}
                    onPrintClick={() => {
                        if (onClickFileEntryPrint) {
                            onClickFileEntryPrint(item);
                        }
                    }}
                />
            ))}
        </div>
    );
}