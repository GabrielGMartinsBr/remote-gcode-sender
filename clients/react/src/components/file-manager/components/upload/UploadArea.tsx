import { FaCloudUploadAlt } from 'react-icons/fa';
import { useFileManagerContext } from '../../context/useFileManagerContext';
import { useRxSubscription } from '@/modules/RxEvents';

interface Props { }

export default function UploadArea(_props: Props) {
    const { handlersEmitter } = useFileManagerContext();
    const handlers = useRxSubscription(handlersEmitter, { reRenderOnChange: true });

    console.log('[UploadArea render]');

    return (
        <div className={`@tw{
            w-full max-w-sm
            border border-white/10
            
            flex flex-col
            justify-start items-center
            mx-0 p-0 gap-4
        }`}>
            <div className={`@tw{
                w-full

                border-4 border-dashed
                border-white/30 rounded-xl
                bg-white/5

                flex flex-col
                justify-center items-center
                gap-3 py-9
            }`}>

                <div className={`@tw{
                    text-6xl
                }`}>
                    <FaCloudUploadAlt />
                </div>

                <div className={`@tw{
                    text-xl leading-none             
                }`}>
                    Drag files to upload
                </div>

                <div className={`@tw{
                    text-lg leading-none
                }`}>
                    or
                </div>


                <button
                    className={`@tw{
                        border rounded-2xl
                        bg-transparent
                        px-6 py-1.5
                        font-normal
                        text-sm
                    }`}
                    onClick={handlers.value.onUploadClick}
                >
                    Browser Files
                </button>

            </div>

        </div>
    );
}