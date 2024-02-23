import { PropsWithChildren } from 'react';
import useInstanceOf from '@/hooks/useInstanceOf';
import { useFileManagerContext } from '../context/useFileManagerContext';
import { FileUploader } from './FileUploader';
import { FileContentReader } from './services/FileContentReader';

export default function FileManagerCtrl(props: PropsWithChildren) {
    const { children } = props;
    const { handlersEmitter, storeEmitter } = useFileManagerContext();
    const fileUploader = useInstanceOf(FileUploader);

    console.log('[ctrl render]');

    handlersEmitter.update(d => {
        d.onUploadClick = () => {
            // console.log('upload clicked!');
            // storeEmitter.update(d => {
            //     d.v++;
            // });
            browserFilesToUpload();
        };

        d.onClickEntryLog = async entry => {
            console.log('Log:', entry.file);
            const content = await FileContentReader.readContent(entry.file);
            console.log(content);
        }
    });


    async function browserFilesToUpload() {
        const files = await fileUploader.browserFiles();

        if (!files) {
            return;
        }

        const entries: File[] = [];
        for (let i = 0; i < files.length; i++) {
            entries.push(files[i]);
        }
        
        storeEmitter.update(d => {
            d.uploadList.entries = entries.map(i => ({
                name: i.name,
                size: i.size,
                type: i.type,
                lastModified: i.lastModified,
                content: '',
                file: i
            }));
        });

        fileUploader.clear();
    }

    return (
        <>
            {children}
        </>
    );
}