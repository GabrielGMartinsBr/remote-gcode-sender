import * as d3 from 'd3';
import { WSC } from 'src/app/wsc/wsc';

export class DeviceTerm {
    static refreshBtn: HTMLElement;
    static logsPre: HTMLElement;
    static sendBtn: HTMLElement;
    static codeInput: HTMLInputElement;
    private static logs: string;

    static init() {
        this.bind();
    }

    static bind() {
        this.logsPre = this.getRef('LogsPre');
        this.refreshBtn = this.getRef('RefreshBtn');
        this.codeInput = this.getRef('CodeInput') as HTMLInputElement;
        this.sendBtn = this.getRef('SendBtn');

        this.refreshBtn.addEventListener('click', this.getLogs.bind(this));
        this.codeInput.addEventListener('keydown', this.onKey.bind(this));
        this.sendBtn.addEventListener('click', this.sendCode.bind(this));
    }

    private static getRef(str): HTMLElement | HTMLInputElement {
        return document.querySelector(`.device-term-view [ref${str}]`);
    }

    static getLogs() {
        WSC.send({ cmd: 'serialGetLog' });
        d3.select(this.refreshBtn).attr('disabled', 'true');
    }

    static updateLogs(data) {
        this.logs = data;
        this.renderLogs();
    }

    static pushLog(data) {
        if (!this.logs) this.logs = data;
        else this.logs += `\n${data}`;
        this.renderLogs();
    }

    static renderLogs() {
        const pre = d3.select(this.logsPre);

        pre.html(this.logs || '');

        pre.transition().duration(3e3).tween('uniquetweenname', scrollTopTween(pre.property('scrollHeight')))

        function scrollTopTween(scrollTop) {
            return function () {
                var i = d3.interpolateNumber(this.scrollTop, scrollTop);
                return function (t) { this.scrollTop = i(t); };
            };
        }

        d3.select(this.refreshBtn).attr('disabled', null);
    }

    static sendCode() {
        const data = this.codeInput.value;
        if (!data) return;
        this.codeInput.value = '';
        WSC.send({ cmd: 'serialSendData', data: data.toUpperCase() + '\n' });
    }

    static onKey(e: KeyboardEvent) {
        if (e && e.keyCode === 13) {
            this.sendCode();
        }
    }

}