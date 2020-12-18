import './main.scss';

import { WSC } from './wsc/wsc';
import { Framework } from './framework/framework';

function init() {
    WSC.init();

    const framework = new Framework('#app');
    framework.init();
}

document.addEventListener('DOMContentLoaded', () => init())
