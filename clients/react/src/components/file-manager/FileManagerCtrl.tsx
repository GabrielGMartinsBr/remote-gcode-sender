import FileManagerView from './FileManagerView';
import { mockFiles } from './mockFiles';

interface Props {
}

export default function FileManagerCtrl(props: Props) {
    const { } = props;

    return (
        <FileManagerView
            items={mockFiles}
        />
    );
}