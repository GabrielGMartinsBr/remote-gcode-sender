import { GCodeFileEntry } from '@/types/Files';

export const mockFiles: GCodeFileEntry[] = [
    {
        uid: 'mock-000',
        name: 'FirstLayer',
        lastPrintDate: new Date(2024, 2, 2, 8, 31),
        uploadDate: new Date(2024, 1, 4)
    },
    {
        uid: 'mock-001',
        name: 'Cube',
        lastPrintDate: new Date(2024, 2, 2, 5, 23),
        uploadDate: new Date(2024, 1, 2)
    },
]