export interface GCodeFileEntry {
    uid: string;
    name: string;
    uploadDate: Date;
    lastPrintDate: Date;
}

export interface FileUploadEntry {
    lastModified: number;
    name: string;
    size: number;
    type: string;
    content: string;
}
