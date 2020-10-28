import './main.scss';

import { AppComponent } from './components/app';
import { WSC } from './wsc/wsc';

function init() {
    WSC.init();

    render();

    AppComponent.init();
}

function render() {
    const appWrap = document.querySelector('#app');
    if (!appWrap) {
        throw 'app wrap not found!';
    }

    appWrap.innerHTML = AppComponent.template();
}

document.addEventListener('DOMContentLoaded', () => init())
