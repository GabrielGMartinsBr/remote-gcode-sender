import { GCodeFileEntry } from '@/types/Files';

interface Props {
    entries: GCodeFileEntry[];
    onPrintClick: (entry: GCodeFileEntry) => void;
}

const thStyle = `@tw{
    border border-white/5
    px-2 py-1
    text-left
}`;

const tdStyle = `@tw{
    border border-white/5
    px-2 py-1
}`;

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


export default function FileEntriesList(props: Props) {
    const { entries, onPrintClick } = props;

    return (
        <table
            className={`@tw{
                flex-1 w-full m-3
            }`}
        >

            <thead>
                <tr>
                    <th className={thStyle}>Name</th>
                    <th className={thStyle}>Size</th>
                    <th className={thStyle}>Modified</th>
                    <th className={thStyle}>uploadDate</th>
                    <th className={thStyle}>lastPrintDate</th>
                    <th className={thStyle}>Actions</th>
                </tr>
            </thead>

            <tbody>
                {entries.map(entry => (
                    <tr key={entry.name}>
                        <td className={tdStyle}>
                            {entry.name}
                        </td>
                        <td className={tdStyle}>
                            {entry.size? ((entry.size / 1000).toFixed(1) + ' kb') : 'unknown'}
                        </td>
                        <td className={tdStyle}>
                            {(new Date(entry.modifiedDate)).toLocaleString()}
                        </td>
                        <td className={tdStyle}>
                            {(new Date(entry.uploadDate)).toLocaleString()}
                        </td>
                        <td className={tdStyle}>
                            {(new Date(entry.lastPrintDate)).toLocaleString()}
                        </td>
                        <td className={tdStyle}>
                            <div className={`@tw{
                                flex flex-row
                                justify-start items-start
                                gap-2
                            }`}>
                                <button
                                    className={buttonStyle}
                                    onClick={() => onPrintClick(entry)}
                                >
                                    Print
                                </button>
                            </div>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}