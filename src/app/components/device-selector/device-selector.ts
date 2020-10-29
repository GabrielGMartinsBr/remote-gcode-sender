import * as d3 from 'd3';

import { WSC } from "src/app/wsc/wsc";

const deviceItemTemplate = require('./device-selector-item.pug');

export class DeviceSelector {
    static listWrap: HTMLElement;
    static refreshBtn: HTMLElement;
    static devices: any[]

    static init() {
        this.bind();
    }

    static bind() {
        this.listWrap = this.getRef('ListWrap');
        this.refreshBtn = this.getRef('RefreshBtn');

        this.refreshBtn.addEventListener('click', this.getDevices.bind(this));
    }

    static getDevices() {
        WSC.send({ cmd: 'serialGetDevices' });
        d3.select(this.refreshBtn).attr('disabled', 'true');
    }

    private static getRef(str) {
        return document.querySelector(`.device-selector-view [ref${str}]`) as HTMLElement;
    }

    static updateDevices(devices) {
        console.log('receive devices', devices)
        this.devices = devices;
        this.renderDevices();
    }

    static renderDevices() {
        console.log("rendedering...")
        d3.select(this.listWrap).selectAll('.device-item-wrap').remove();

        if (!Array.isArray(this.devices)) {
            return;
        }

        d3.select(this.listWrap)
            .selectAll('.device-item-wrap')
            .data(this.devices)
            .enter()
            .append(d => {
                const el = d3.create('div')
                    .classed('device-item-wrap', true)
                    .html(deviceItemTemplate({ item: JSON.stringify(d, null, 4) }));

                el.select('button[refConnectBtn]').on('click', () => this.connect(d));
                return el.node();
            })

        d3.select(this.refreshBtn).attr('disabled', null);
    }

    static connect(portInfo) {
        console.log('connect', { portInfo });
        WSC.send({ cmd: 'serialConnectDevice', data: { portInfo } });
    }

}
