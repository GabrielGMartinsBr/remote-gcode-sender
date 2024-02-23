import { FileUploadEntry } from '../types';

export type FmEventHandlers = {
    onUploadClick?: () => void;

    onClickEntryLog?: (entry: FileUploadEntry) => void;
};