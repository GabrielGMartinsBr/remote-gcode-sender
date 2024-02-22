import { useEffect, useState } from 'react';
import useRefObject from '@/hooks/useRefObject';
import { RxEmitter } from './RxEmitter';

interface Options {
    reRenderOnChange?: boolean;
}

export function useRxSubscription<T>(emitter: RxEmitter<T>, opts: Options = {}) {
    const [, vUpdate] = useState(0);
    const ref = useRefObject({
        value: emitter.value,
        v: 0,
    });

    useEffect(() => {
        const $ = emitter.observable.subscribe(value => {
            console.log('subs', value, value === ref.value);
            if (value === ref.value) {
                return;
            }
            ref.value = value;
            ref.v++;
            if (opts.reRenderOnChange) {
                requestAnimationFrame(() => {
                    vUpdate(() => ref.v);
                });
            }
        });

        return () => {
            $.unsubscribe();
        };
    }, []);

    return ref;
}
