import FileEntries from '../components/FileEntries';
import FileUpload from '../components/upload/FileUpload';
import FilesTopMenu from './topMenu/FilesTopMenu';

interface Props { }

export default function FileManagerView(_props: Props) {
    return (
        <div className={`@tw{
            w-full h-full
            bg-white/10
            border border-s-yellow-400
        }`}>

            <FileUpload />

            <FilesTopMenu />

            <FileEntries />
        </div>
    );
}