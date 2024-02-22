import { BehaviorSubject, Observable, debounceTime, distinctUntilChanged } from 'rxjs';
import { produce } from 'immer';

export class RxEmitter<T> {
    private subject: BehaviorSubject<T>;
    readonly observable: Observable<T>;

    constructor(initValue: T) {
        this.subject = new BehaviorSubject(initValue);
        this.observable = this.createObservable();
    }

    get value() {
        return this.subject.value;
    }

    set value(v: T) {
        if (v !== this.value) {
            this.subject.next(v);
        }
    }

    update(cb: (draft: T) => void) {
        const nextValue = produce(this.value, cb);
        if (this.value !== nextValue) {
            this.value = nextValue;
        }
    }

    private createObservable() {
        return this.subject.asObservable().pipe(
            debounceTime(33),
            distinctUntilChanged()
        );
    }
}