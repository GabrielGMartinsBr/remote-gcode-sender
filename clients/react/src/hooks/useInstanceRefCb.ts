import { useEffect, useRef } from 'react';

export interface InstanceRefCb {
    onInit?(): void;
    onDestroy?(): void;
}


export function useInstanceRefCb<T extends InstanceRefCb>(
    cb: () => T,
    deps?: any
) {
    const ref = useRef<T | null>(null);

    useEffect(() => {
        if (!ref.current) {
            ref.current = cb();
        }
        if (ref.current.onInit) {
            ref.current.onInit();
        }
        return () => {
            if (ref.current) {
                if (ref.current.onDestroy) {
                    ref.current.onDestroy();
                }
                ref.current = null;
            }
        };
    }, deps);

    return () => {
        if (!ref.current) {
            ref.current = cb();
        }
        return ref.current;;
    }
}
