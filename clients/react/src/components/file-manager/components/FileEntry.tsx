import { GoFileCode, GoTrash } from "react-icons/go";
import { PiPrinter, PiEye } from "react-icons/pi";
import { GCodeFileEntry } from '@/types/Files';
import DateText from './DateText';


interface Props {
    item: GCodeFileEntry;
}

export default function FileEntry(props: Props) {
    const { item } = props;

    const buttonStyle = `@tw{
        px-2 py-1.5
        bg-white/10
        cursor-pointer
        text-base
        
        active:opacity-60
        hover:bg-white/30
        transition-[opacity_background]
    }`;

    return (
        <div
            className={`@tw{
                px-6 py-6
                bg-white/10

                flex flex-col
                justify-start items-start
                gap-4
            }`}
        >
            <div className={`@tw{
                flex flex-row
                justify-start items-center
                gap-3
            }`}>
                <div className={`@tw{
                    text-7xl
                }`}>
                    <GoFileCode />
                </div>

                <div className={`@tw{
                    flex flex-col
                    justify-start items-start
                    gap-1
                }`}>
                    <div className={`@tw{
                        text-lg
                    }`}>{item.name}</div>
                    <div className={`@tw{
                        flex flex-row
                        justify-start items-start
                        gap-1
                        text-xs text-white/60
                    }`}>
                        <div>Uploaded At:</div>
                        <div className='font-bold'>
                            <DateText
                                children={item.uploadDate}
                                formatString='Pp'
                            />
                        </div>
                    </div>
                    <div className={`@tw{
                        flex flex-row
                        justify-start items-start
                        gap-1
                        text-xs text-white/60
                    }`}>
                        <div>Last Print:</div>
                        <div className='font-bold'>
                            <DateText
                                children={item.lastPrintDate}
                                formatString='Pp'
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom */}
            <div className={`@tw{
                w-full
                flex flex-row
                justify-end items-stretch
                gap-2
            }`}>
                <button className={buttonStyle}>
                    <GoTrash />
                </button>

                <button className={buttonStyle}>
                    <PiEye />
                </button>

                <button className={buttonStyle}>
                    <PiPrinter />
                </button>
            </div>
        </div>
    );
}