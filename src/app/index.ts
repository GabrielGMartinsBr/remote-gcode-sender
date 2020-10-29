import './main.scss';

import { AppComponent } from './components/app';
import { WSC } from './wsc/wsc';

function init() {
    WSC.init();

    render();

}

function render() {
    const appWrap = document.querySelector('#app') as HTMLElement;
    if (!appWrap) {
        throw 'app wrap not found!';
    }

    AppComponent.init(appWrap);
}

document.addEventListener('DOMContentLoaded', () => init())
