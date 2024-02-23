import { PropsWithChildren } from 'react';
import axios from 'axios';

import { useAppContext } from '@/AppContext';
import useInstanceOf from '@/hooks/useInstanceOf';
import { useFileManagerContext } from '../context/useFileManagerContext';
import { FileBrowser } from './services/FileBrowser';

export default function FileManagerCtrl(props: PropsWithChildren) {
    const { children } = props;
    const { host } = useAppContext();
    const { handlersEmitter, storeEmitter } = useFileManagerContext();
    const fileBrowser = useInstanceOf(FileBrowser);

    console.log('[ctrl render]');

    handlersEmitter.update(d => {
        d.onClickBrowser = () => {
            browserFilesToUpload();
        };

        d.onClickUploadListEntryPrint = entry => {
            // const content = await FileContentReader.readContent(entry.file);
            uploadAndPrint(entry.file);
        }
    });


    async function browserFilesToUpload() {
        const files = await fileBrowser.browserFiles();

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

        fileBrowser.clear();
    }

    async function uploadAndPrint(file: File) {
        storeEmitter.update(d => {
            d.uploadList.uploadResult = null;
            d.uploadList.uploading = true;
        });
        try {
            await sendFileToPrint(file);
            storeEmitter.update(d => {
                d.uploadList.uploadResult = 'success';
                d.uploadList.uploading = false;
            });
        } catch (ex) {
            storeEmitter.update(d => {
                d.uploadList.uploadResult = 'fail';
                d.uploadList.uploading = false;
            });
        }
    }

    async function sendFileToPrint(file: File) {
        if (!host?.domain || !host?.httpPort) {
            console.error(host);
            throw new Error('Invalid host defined.');
        }
        const baseUrl = `http://${host.domain}:${host.httpPort}`;
        const url = `${baseUrl}/machine/gcode`;
        const formData = new FormData();
        formData.append('gcode', file);
        const headers = { 'Content-Type': 'multipart/form-data' };
        const res = await axios.post(
            url, formData, { headers }
        )
        console.log(res);
    }

    return (
        <>
            {children}
        </>
    );
}