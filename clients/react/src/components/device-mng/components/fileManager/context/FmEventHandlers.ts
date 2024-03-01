import { FileUploadEntry, GCodeFileEntry } from '@/types/Files';

export type FmEventHandlers = {
    onClickBrowser?: () => void;

    onClickUploadListEntryPrint?: (entry: FileUploadEntry) => void;

    onClickFileEntryPrint?: (file: GCodeFileEntry) => void;

    onSetGridDisplayMode?: () => void;
    onSetListDisplayMode?: () => void;

    onSearchInputChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
};