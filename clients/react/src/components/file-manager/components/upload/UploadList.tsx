import { useRxSubscription } from '@/modules/RxEvents';
import { useFileManagerContext } from '../../context/useFileManagerContext';

interface Props { }

const thStyle = `@tw{
    text-left
}`

const buttonStyle = `@tw{
    px-4 py-2
    bg-white/10
    cursor-pointer
    text-base text-white

    rounded-md
    
    active:opacity-60
    hover:bg-white/30
    transition-[opacity_background]
}`;

export default function UploadList(_props: Props) {
    const { storeEmitter, handlersEmitter } = useFileManagerContext();
    const store = useRxSubscription(storeEmitter, { reRenderOnChange: true });
    const handlers = useRxSubscription(handlersEmitter, { reRenderOnChange: true });
    const { uploadList } = store.value;
    const { onClickEntryLog } = handlers.value;

    return (
        <table
            className={`@tw{
                flex-1 w-full
                border border-blue-500/30
            }`}
        >

            <thead>
                <tr>
                    <th className={thStyle}>Name</th>
                    <th className={thStyle}>Size</th>
                    <th className={thStyle}>Modified</th>
                    <th className={thStyle}>Actions</th>
                </tr>
            </thead>

            <tbody>
                {uploadList.entries.map(i => (
                    <tr key={i.name}>
                        <td>{i.name}</td>
                        <td>
                            {(i.size / 1000).toFixed(1)} kb
                        </td>
                        <td>
                            {(new Date(i.lastModified)).toLocaleString()}
                        </td>
                        <td >
                            <div className={`@tw{
                                flex flex-row
                                justify-start items-start
                                gap-2
                            }`}>
                                <button
                                    className={buttonStyle}
                                >
                                    Upload
                                </button>
                                <button
                                    className={buttonStyle}
                                    onClick={onClickEntryLog ? (() => onClickEntryLog(i)) : undefined}
                                >
                                    Log
                                </button>
                            </div>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}