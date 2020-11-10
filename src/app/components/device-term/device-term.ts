import * as d3 from 'd3';
import { WSC } from 'src/app/wsc/wsc';

export class DeviceTerm {
    static refreshBtn: HTMLElement;
    static logsPre: HTMLElement;
    static sendBtn: HTMLElement;
    static codeInput: HTMLInputElement;
    private static logs: string;
    private static cmdHistory: string[] = [];
    private static cmdHistoryCursor: number = 0;

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

        pre.transition().duration(4e2).tween('uniquetweenname', scrollTopTween(pre.property('scrollHeight')))

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
        const command = data.toUpperCase();
        this.cmdHistory.push(command);
        this.cmdHistoryCursor = 0;
        WSC.send({ cmd: 'serialSendData', data: command + '\n' });
    }

    static loadHistory(index) {
        if (this.cmdHistoryCursor === 0) {
            this.codeInput.value = '';
            return;
        }
        if (this.cmdHistory[index]) {
            this.codeInput.value = this.cmdHistory[index];
        }
    }

    static onKey(e: KeyboardEvent) {
        if (e && ['ArrowUp', 'ArrowDown'].indexOf(e.key) > -1) {
            const dir = e.key === 'ArrowUp' ? 1 : -1;
            const l = this.cmdHistory.length;
            this.cmdHistoryCursor = Math.min(
                Math.max(0, this.cmdHistoryCursor + dir),
                l
            );
            const c = l - this.cmdHistoryCursor;
            this.loadHistory(c);
            e.preventDefault();
            e.stopPropagation();
            return;
        }

        if (e && e.keyCode === 13) {
            this.sendCode();
        } else {
            // console.log(e.key)
        }
    }

}