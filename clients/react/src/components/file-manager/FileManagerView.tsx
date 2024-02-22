import FileEntries from './components/FileEntries';
import FileUpload from './components/upload/FileUpload';
import UploadArea from './components/upload/UploadArea';
import { GCodeFileEntry } from './types';

interface Props {
    items: GCodeFileEntry[];
}

export default function FileManagerView(props: Props) {
    const { items } = props;

    return (
        <div className={`@tw{
            w-full h-full
            bg-white/10
        }`}>

            <FileUpload />

            <FileEntries
                items={items}
            />

        </div>
    );
}