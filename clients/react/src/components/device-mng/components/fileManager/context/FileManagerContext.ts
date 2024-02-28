import { createContext } from 'react';
import { useRefSet3 } from '@/hooks/useRefSet3';
import { FileUploadEntry } from '@/types/Files';
import { useRxEmitter } from '../../../../../modules/RxEvents/useRxEmitter';
import { FmEventHandlers } from './FmEventHandlers';

export function useFileManagerContextValue() {
    const elements = useRefSet3(class {
        container: HTMLDivElement | null = null;
    });
    const handlersEmitter = useRxEmitter<FmEventHandlers>({});
    const storeEmitter = useRxEmitter({
        uploadList: {
            entries: [] as FileUploadEntry[],
            uploading: false,
            uploadResult: null as 'success' | 'fail' | null,
        }
    });

    return {
        elements,
        handlersEmitter,
        storeEmitter,
    };
}

export type FileManagerContextValue = ReturnType<typeof useFileManagerContextValue>;

export const FileManagerContext = createContext<FileManagerContextValue | null>(null);