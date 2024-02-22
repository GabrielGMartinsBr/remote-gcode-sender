import { useContext } from 'react';
import { FileManagerContext } from './FileManagerContext';

export function useFileManagerContext() {
    const context = useContext(FileManagerContext);

    if (!context) {
        throw new Error('FileManager context provider not found.');
    }

    return context;
}