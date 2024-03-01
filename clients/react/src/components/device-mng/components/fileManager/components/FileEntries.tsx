import { useDeviceMngContext } from '@/components/device-mng/context/useDeviceMngContext';
import { useRxSubscription } from '@/modules/RxEvents';
import { GCodeFileEntry } from '@/types/Files';
import { useFileManagerContext } from '../context/useFileManagerContext';
import FileEntriesGrid from './FileEntriesGrid';
import FileEntriesList from './FileEntriesList';
import { FilesDisplayMode } from '../types/FilesDisplayMode';

interface Props { }

export default function FileEntries(_props: Props) {
    const { storeEmitter } = useDeviceMngContext();
    const { handlersEmitter, storeEmitter: fmStoreEmitter } = useFileManagerContext();

    const store = useRxSubscription(storeEmitter, { reRenderOnChange: true });
    const fmStore = useRxSubscription(fmStoreEmitter, { reRenderOnChange: true });
    const handlers = useRxSubscription(handlersEmitter, { reRenderOnChange: true });

    const { files } = store.value;
    const { onClickFileEntryPrint } = handlers.value;
    const { filesList } = fmStore.value;

    const handlePrintClick = (entry: GCodeFileEntry) => {
        if (onClickFileEntryPrint) {
            onClickFileEntryPrint(entry);
        }
    };

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
            {filesList.display === FilesDisplayMode.GRID ? (
                <FileEntriesGrid
                    entries={filesList.searchResult}
                    onPrintClick={handlePrintClick}
                />
            ) : null}

            {filesList.display === FilesDisplayMode.LIST ? (
                <FileEntriesList
                    entries={filesList.searchResult}
                    onPrintClick={handlePrintClick}
                />
            ) : null}
        </div>
    );
}