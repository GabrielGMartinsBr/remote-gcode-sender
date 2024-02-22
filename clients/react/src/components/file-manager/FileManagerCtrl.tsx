import { PropsWithChildren } from 'react';
import FileManagerView from './FileManagerView';
import { mockFiles } from './mockFiles';

interface Props {
}

export default function FileManagerCtrl(props: PropsWithChildren<Props>) {
    const { children } = props;

    return (
        <>
            {children}
        </>
    );
}