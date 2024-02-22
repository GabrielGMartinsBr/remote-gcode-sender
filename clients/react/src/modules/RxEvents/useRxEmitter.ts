import useRefObject from '@/hooks/useRefObject';
import { RxEmitter } from './RxEmitter';

export function useRxEmitter<T>(initValue: T) {
    const emitter = useRefObject(new RxEmitter<T>(initValue));
    return emitter;
}