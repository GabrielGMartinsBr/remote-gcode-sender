import './app.scss';

import * as d3 from 'd3';
import { filter } from 'rxjs/operators';

import { WSC } from '../wsc/wsc';
import { DeviceSelector } from './device-selector/device-selector';
import { DeviceSelected } from './device-selected/device-selected';
import { FileCtrl } from './file-ctrl/file-ctrl';
import { DeviceTerm } from './device-term/device-term';
import { MachineBaseCtrls } from './machine-base-ctrls/machine-base-ctrls';
import { WorkbenchFiles } from './workbench-files/workbench-files';

export class AppComponent {
    private static template = require('./app.pug');
    private static wrap: HTMLElement;

    static connected = false;

    private static workbenchFiles: WorkbenchFiles;

    static init(wrap: HTMLElement) {
        console.log('init')
        this.wrap = wrap;
        this.render();

        this.listenWS();

        const machineCtrl = new MachineBaseCtrls();
        this.workbenchFiles = new WorkbenchFiles();
        // console.log({ machineCtrl });
    }

    static listenWS() {
        const cmds = ['serialDataDevices', 'serialDeviceStatus', 'serialDataLogs', 'serialDataLog', 'serialDataFiles'];
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
                    case 'serialDataLog':
                        return DeviceTerm.pushLog(event.data);
                    case 'serialDataFiles':
                        return this.workbenchFiles.setFiles(event.data);
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
        // console.log({ status });

        if (!status) return;

        this.connected = status.opened || false;

        this.render();
        this.childs();

        if (!this.connected) {
            DeviceSelector.getDevices();
        }

    }

    private static render() {
        console.log('render')
        d3.select(this.wrap).html(this.template({
            connected: this.connected
        }))
    }

}