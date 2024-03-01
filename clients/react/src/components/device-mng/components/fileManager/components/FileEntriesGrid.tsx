import { GCodeFileEntry } from '@/types/Files';
import FileEntry from './FileEntry';

interface Props {
    entries: GCodeFileEntry[];
    onPrintClick: (entry: GCodeFileEntry) => void;
}

export default function FileEntriesGrid(props: Props) {
    const { entries, onPrintClick } = props;
    return (
        <>
            {entries.map((entry) => (
                <FileEntry
                    key={entry.uid}
                    item={entry}
                    onPrintClick={() => onPrintClick(entry)}
                />
            ))}
        </>
    );
}