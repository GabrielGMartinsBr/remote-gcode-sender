import { FileUploadEntry } from '../types';

export type FmEventHandlers = {
    onClickBrowser?: () => void;

    onClickUploadListEntryPrint?: (entry: FileUploadEntry) => void;
};