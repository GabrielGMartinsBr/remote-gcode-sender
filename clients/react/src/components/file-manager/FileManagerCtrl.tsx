import { PropsWithChildren } from 'react';
import { useFileManagerContext } from './context/useFileManagerContext';

export default function FileManagerCtrl(props: PropsWithChildren) {
    const { children } = props;
    const { handlersEmitter, storeEmitter } = useFileManagerContext();

    console.log('[ctrl render]');

    handlersEmitter.update(d => {
        d.onUploadClick = () => {
            console.log('upload clicked!');
            storeEmitter.update(d => {
                d.v++;
            })
        };
    });

    return (
        <>
            {children}
        </>
    );
}