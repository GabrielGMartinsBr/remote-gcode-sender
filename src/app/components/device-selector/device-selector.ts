import * as d3 from 'd3';
import { filter } from 'rxjs/operators';

import { WSC } from "src/app/wsc/wsc";
import { BtnsUtils } from "src/app/utils/btns-utils";

const deviceItemTemplate = require('./device-selector-item.pug');

export class DeviceSelector {
    static listWrap: HTMLElement;
    static refreshBtn: HTMLElement;

    static init() {
        this.bind();
    }

    static bind() {
        this.listWrap = this.getRef('ListWrap');
        this.refreshBtn = this.getRef('RefreshBtn');

        this.refreshBtn.addEventListener('click', this.getDevices.bind(this));

        const cmds = ['serialDataDevices'];
        WSC.events
            .pipe(filter(e => e && cmds.indexOf(e.cmd) > -1))
            .subscribe(event => {
                switch (event.cmd) {
                    case 'serialDataDevices':
                        return this.renderDevices(event.data);
                }
            });
    }

    static getDevices(e: Event) {
        WSC.send({ cmd: 'serialGetDevices' });
        d3.select(this.refreshBtn).attr('disabled', 'true');
    }

    private static getRef(str) {
        return document.querySelector(`.device-selector-view [ref${str}]`) as HTMLElement;
    }

    static renderDevices(devices) {
        d3.select(this.listWrap).selectAll('.device-item-wrap').remove();

        d3.select(this.listWrap)
            .selectAll('.device-item-wrap')
            .data(devices)
            .enter()
            .append('div')
            .classed('device-item-wrap', true)
            .html(d => deviceItemTemplate({ item: JSON.stringify(d, null, 4) }))

        d3.select(this.refreshBtn).attr('disabled', null);
    }

}
