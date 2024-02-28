import { PropsWithChildren } from 'react';
import { FileManagerContext, useFileManagerContextValue } from './FileManagerContext';

export default function FileManagerProvider(props: PropsWithChildren) {
    const value = useFileManagerContextValue();

    return (
        <FileManagerContext.Provider value={value}>
            {props.children}
        </FileManagerContext.Provider>
    );
}