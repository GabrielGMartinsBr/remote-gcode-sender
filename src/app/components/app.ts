import './app.scss';
import { DeviceSelector } from './device-selector/device-selector';

export class AppComponent {
    static template = require('./app.pug');

    static init() {
        DeviceSelector.init();
    }

}