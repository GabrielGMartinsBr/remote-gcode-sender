import FileManagerProvider from './context/FileManagerProvider';
import FileManagerCtrl from './controller';
import FileManagerView from './FileManagerView';
import { mockFiles } from './mockFiles';

interface Props {
}

export default function FileManager(props: Props) {
    const { } = props;

    return (
        <FileManagerProvider>
            <FileManagerCtrl>
                <FileManagerView
                    items={mockFiles}
                />
            </FileManagerCtrl>
        </FileManagerProvider>
    );
}