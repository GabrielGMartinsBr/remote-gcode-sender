import * as d3 from 'd3';
import { WSC } from 'src/app/wsc/wsc';

export class DeviceSelected {
    static disconectBtn: HTMLElement;

    static init() {
        this.bind();
    }

    static bind() {
        this.disconectBtn = this.getRef('DisconectBtn');

        this.disconectBtn.addEventListener('click', this.disconect.bind(this));
    }

    private static getRef(str): HTMLElement | HTMLInputElement {
        return document.querySelector(`.device-selected-view [ref${str}]`);
    }

    static disconect() {
        WSC.send({ cmd: 'serialDisconect' });
        d3.select(this.disconectBtn).attr('disabled', 'true');
    }

}