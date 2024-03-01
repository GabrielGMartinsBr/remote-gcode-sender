export interface GCodeFileEntry {
    uid: string;
    name: string;
    size: number;
    modifiedDate: Date;
    uploadDate: Date;
    lastPrintDate: Date;
}

export interface FileUploadEntry {
    lastModified: number;
    name: string;
    size: number;
    type: string;
    content: string;
    file: File;
}
