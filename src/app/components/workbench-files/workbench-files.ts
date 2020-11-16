import * as d3 from 'd3';

import { Comp, Ref, On } from "src/app/framework/framework";
import { WSC } from "src/app/wsc/wsc";

@Comp()
export class WorkbenchFiles {
    @Ref('selectedInfo') selectedInfo;
    @Ref('printBtn') printBtn;
    @Ref('refreshBtn') refreshBtn;
    @Ref('fileList') fileList;

    files = [];
    selected: string;

    @On('click', 'printBtn')
    print() {
        if (this.selected) {
            console.log('printing file...');
            WSC.send({ cmd: 'serialPrintWorkbenchFile', data: this.selected });
        }
    }

    @On('click', 'refreshBtn')
    refresh() {
        console.log('get files');
        WSC.send({ cmd: 'serialGetFiles' });
    }

    setFiles(arr: string[]) {
        this.files = Array.isArray(arr) ? arr : [];
        this.renderFiles();
    }

    renderSelected() {
        d3.select(this.selectedInfo)
            .text(this.selected || 'nenhum selecionado')
    }

    renderFiles() {
        const list = d3.select(this.fileList)
            .selectAll('.file-item')
            .data(this.files)
            .text(d => d)

        list.enter()
            .append('div')
            .classed('file-item', true)
            .text(d => d)
            .on('click', (e, d) => this.selectFile(d));

        list.exit().remove();
    }

    selectFile(d) {
        this.selected = d;
        this.renderSelected();
    }

}
