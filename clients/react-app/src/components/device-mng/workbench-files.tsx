import React, { useState } from 'react';
import { WSC } from '../../wsc/wsc';

export function WorkbenchFiles({ files }) {
    const [selected, setSelected] = useState(null);

    function getFiles() {
        WSC.send({ cmd: 'serialGetFiles' });
    }

    function select(file) {
        setSelected(file);
    }

    function printSelected() {
        if (selected) {
            WSC.send({ cmd: 'serialPrintWorkbenchFile', data: selected });
        }
    }

    function fileItem(file, index) {
        return (
            <div className="file-item" key={index} onClick={() => select(file)}>
                {file}
            </div>
        )
    }

    return (
        <div className="workbench-files base-content-block">
            <h2 className="base-content-block-title">Workbench Files</h2>

            <div className="selected-file">
                <div className="file-info">{selected || 'nenhum selecionado'}</div>
                <div className="file-actions">
                    <button onClick={printSelected}>Print</button>
                    <button onClick={getFiles}>Refresh</button>
                </div>
            </div>

            <div className="files-list">
                {files?.map((i, index) => fileItem(i, index))}
            </div>

        </div>
    )
}