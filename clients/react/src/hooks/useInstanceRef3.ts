import { useEffect, useRef } from 'react';

type Constructable<T> = new () => T;

export interface InstanceRef3 {
    onInit?(): void;
    onDestroy?(): void;
}

export function useInstanceRef3<T extends InstanceRef3>(
    constructor: Constructable<T>,
    deps?: any
) {
    const ref = useRef<T | null>(null);

    useEffect(() => {
        if (!ref.current) {
            ref.current = new constructor();
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
            ref.current = new constructor();
        }
        return ref.current;;
    }
}
