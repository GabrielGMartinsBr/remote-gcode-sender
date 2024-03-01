import { useRxSubscription } from '@/modules/RxEvents';
import { FaSearch } from 'react-icons/fa';
import { useFileManagerContext } from '../../context/useFileManagerContext';

interface Props {
}

export default function SearchField(props: Props) {
    const { } = props;
    const { storeEmitter, handlersEmitter } = useFileManagerContext();
    const { filesList } = useRxSubscription(storeEmitter, { reRenderOnChange: true }).value;
    const { onSearchInputChange } = useRxSubscription(handlersEmitter, { reRenderOnChange: true }).value;

    return (
        <div
            className={`@tw{
                group
                w-full max-w-md

                border-[1.5px] border-white/10
                rounded
                focus-within:border-white/60

                flex flex-row

                h-12
            }`}
        >
            <input
                className={`@tw{
                    block w-full

                    bg-transparent
                    px-2

                    outline-none

                    font-medium text-lg
                }`}
                type='text'
                placeholder='Search file'
                spellCheck={false}
                value={filesList.searchTerms}
                onChange={onSearchInputChange}
            />

            <button
                className={`@tw{
                    block

                    group-focus-within:bg-white/20
                }`}
            >
                <FaSearch />
            </button>
        </div>
    );
}