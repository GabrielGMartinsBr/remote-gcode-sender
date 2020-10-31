import './app.scss';

import * as d3 from 'd3';
import { filter } from 'rxjs/operators';

import { WSC } from '../wsc/wsc';
import { DeviceSelector } from './device-selector/device-selector';
import { DeviceSelected } from './device-selected/device-selected';
import { FileCtrl } from './file-ctrl/file-ctrl';
import { DeviceTerm } from './device-term/device-term';

export class AppComponent {
    private static template = require('./app.pug');
    private static wrap: HTMLElement;

    static connected = false;

    static init(wrap: HTMLElement) {
        this.wrap = wrap;
        this.render();

        this.listenWS();
    }

    static listenWS() {
        const cmds = ['serialDataDevices', 'serialDeviceStatus', 'serialDataLogs'];
        WSC.events
            .pipe(filter(e => e && cmds.indexOf(e.cmd) > -1))
            .subscribe(event => {
                // console.log(event.data)
                switch (event.cmd) {
                    case 'serialDataDevices':
                        return DeviceSelector.updateDevices(event.data);
                    case 'serialDeviceStatus':
                        return this.onDeviceStatus(event.data);
                    case 'serialDataLogs':
                        return DeviceTerm.updateLogs(event.data);
                }
            });
    }

    private static childs() {
        if (!this.connected) {
            DeviceSelector.init();
        } else {
            DeviceSelected.init();
            FileCtrl.init();
            DeviceTerm.init();
        }
    }

    private static onDeviceStatus(status) {
        console.log({ status });

        if (!status) return;

        this.connected = status.connected || false;

        this.render();
        this.childs();

        if (!this.connected) {
            DeviceSelector.getDevices();
        }

    }


    private static render() {
        d3.select(this.wrap).html(this.template({
            connected: this.connected
        }))
    }



}