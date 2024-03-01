import { FaTh, FaThList } from 'react-icons/fa';
import TopMenuButton from './TopMenuButton';
import { useFileManagerContext } from '../../context/useFileManagerContext';
import { useRxSubscription } from '@/modules/RxEvents';
import { FilesDisplayMode } from '../../types/FilesDisplayMode';


export default function EntriesDisplayMode() {
    const { storeEmitter, handlersEmitter } = useFileManagerContext();

    const store = useRxSubscription(storeEmitter, { reRenderOnChange: true });
    const handlers = useRxSubscription(handlersEmitter, { reRenderOnChange: true });

    const { filesList } = store.value;

    return (
        <div
            className={`@tw{
                bg-black/10 rounded-md

                flex flex-row
                justify-start items-stretch

                gap-2 px-2 py-2

            }`}
        >
            <TopMenuButton
                inactiveStyle='opacity-50'
                isActive={filesList.display === FilesDisplayMode.GRID}
                onClick={handlers.value.onSetGridDisplayMode}
            >
                <FaTh />
            </TopMenuButton>
            <TopMenuButton
                inactiveStyle='opacity-50'
                isActive={filesList.display === FilesDisplayMode.LIST}
                onClick={handlers.value.onSetListDisplayMode}
            >
                <FaThList />
            </TopMenuButton>
        </div>
    );
}