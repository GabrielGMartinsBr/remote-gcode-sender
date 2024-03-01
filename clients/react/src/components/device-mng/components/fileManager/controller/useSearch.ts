import { useDeviceMngContext } from '@/components/device-mng/context/useDeviceMngContext';
import { useRxSubscription } from '@/modules/RxEvents';
import { GCodeFileEntry } from '@/types/Files';
import { useFileManagerContext } from '../context/useFileManagerContext';
import { useEffect } from 'react';
import useRefObject from '@/hooks/useRefObject';

export default function useSearch() {
    const { storeEmitter: deviceStoreEmitter } = useDeviceMngContext();
    const { storeEmitter: fmStoreEmitter } = useFileManagerContext();

    const vars = useRefObject({ lastTerms: '' });

    const deviceStore = useRxSubscription(deviceStoreEmitter, { reRenderOnChange: true });

    const { files } = deviceStore.value;

    function updateResult(terms: string) {
        let entries: GCodeFileEntry[];
        if (terms) {
            const termsRe = new RegExp(terms, 'gi');
            entries = files.entries.filter(i => termsRe.test(i.name));
        } else {
            entries = [...deviceStore.value.files.entries];
        }
        fmStoreEmitter.update(d => {
            d.filesList.searchResult = entries;
        });
    }

    useEffect(() => {
        const $ = fmStoreEmitter.observable.subscribe(value => {
            if (value.filesList.searchTerms !== vars.lastTerms) {
                vars.lastTerms = value.filesList.searchTerms;
                updateResult(value.filesList.searchTerms);
            }
        });

        updateResult(fmStoreEmitter.value.filesList.searchTerms);

        return () => $.unsubscribe();
    }, []);
}