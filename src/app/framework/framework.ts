// Utils

const camelToSnakeCase = str => str.replace(/[A-Z]/g, letter => `-${letter.toLowerCase()}`).replace(/^-/, '');


// Types

interface CompOpts {
    selector?: string
}

const toBindArr: { target, elKey, methodKey, eventType }[] = []
let bindedArr: { element, method, eventType }[] = []

// 

function bindListeners() {
    bindedArr = [];
    for (const i of toBindArr) {
        // console.log(i);
        if (!i || !i.target || !i.elKey || !i.methodKey || !i.eventType) {
            continue;
        }
        const element = i.target[i.elKey];
        const method = i.target[i.methodKey];
        const type = i.eventType;
        if (!(element instanceof Element) || typeof method !== 'function' || typeof type !== 'string') {
            // console.log('NOT', !(element instanceof Element))
            continue;
        }
        // console.log(i.target);
        element.addEventListener(type, method.bind(i.target));
        bindedArr.push({ eventType: type, method, element })
    }
}

function unbindListeners() {
    for (const i of bindedArr) {
        i.element.removeEventListener(i.eventType, i.method);
    }
}

// function main() {
//     function init() {
//         setTimeout(() => {
//             bindListeners();
//         }, 1e3)
//     }

//     document.addEventListener('DOMContentLoaded', () => init())
// }

// main();



// Decorators

export function Comp({ selector } = {} as CompOpts) {

    return function (constructor: Function) {
        selector = selector || constructor.name;
        selector = camelToSnakeCase(selector);

        Object.defineProperty(constructor.prototype, '$_selector_$', {
            get: () => selector,
            enumerable: true
        });
    }
}

export function Ref(name) {
    // console.log('Ref Decor')
    return <T>(target: T, key: keyof T) => {
        // console.log('Ref Decor 2')

        function get() {
            const selector = target['$_selector_$'];
            const q = `.${selector} [ref='${name}']`;
            console.log(selector);
            return document.querySelector(q)
        }

        Object.defineProperty(target, key, {
            get: get,
            enumerable: true
        });
    };
}

export function On(value: string, elKey) {
    return <T>(target: T, key: keyof T) => {
        toBindArr.push({ elKey, eventType: value, methodKey: key, target })
        // console.log(target['tlBtn'])
    };
}


// Run


import { AppComponent } from '../components/app';
import { observeDOM } from './matation';

export class Framework {
    private wrap: HTMLElement

    constructor(private wrapQuery: string) { }

    init() {
        console.log('init')

        // document.addEventListener('DOMContentLoaded', this.onLoad.bind(this));
        this.onLoad();
    }

    private onLoad() {
        console.log('load')
        if (!this.wrapQuery || typeof this.wrapQuery !== 'string') {
            throw 'invalid wrap query';
        }
        this.wrap = document.querySelector(this.wrapQuery);
        if (!(this.wrap instanceof HTMLElement)) {
            throw 'app wrap not found!';
        }

        AppComponent.init(this.wrap);

        observeDOM(this.wrap, function (m) {
            // var addedNodes = [], removedNodes = [];
            // m.forEach(record => record.addedNodes.length & addedNodes.push(...record.addedNodes))
            // m.forEach(record => record.removedNodes.length & removedNodes.push(...record.removedNodes))
            // // console.clear();
            // console.log('Added:', addedNodes, 'Removed:', removedNodes);
            bindListeners();
            console.log('mutations')
            
        });
    }

}