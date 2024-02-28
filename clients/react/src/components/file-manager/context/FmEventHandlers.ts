import { FileUploadEntry } from '@/types/Files';

export type FmEventHandlers = {
    onClickBrowser?: () => void;

    onClickUploadListEntryPrint?: (entry: FileUploadEntry) => void;
};