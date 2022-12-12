import { useEffect, useState } from 'react';

import { useAppContext } from '@/AppContext';

interface WorkbenchFilesProps {
    files: string[];
}

export function WorkbenchFiles(props: WorkbenchFilesProps) {
    const { wsClient } = useAppContext();
    const { files } = props;

    const [selected, setSelected] = useState<string>();

    useEffect(() => {
        getFiles();
    }, []);

    function getFiles() {
        if (wsClient) {
            wsClient.send({ cmd: 'serialGetFiles' });
        }
    }

    function select(file: string) {
        setSelected(file);
    }

    function printSelected() {
        if (selected && wsClient) {
            wsClient.send({ cmd: 'serialPrintWorkbenchFile', data: selected });
        }
    }

    function fileItem(file: string, index: number) {
        return (
            <div className="file-item" key={index} onClick={() => select(file)}>
                {file}
            </div>
        )
    }

    return (
        <div className="workbench-files base-content-block">
            <h2 className="text-xl mb-3 px-1">
                Workbench Files
            </h2>

            <div className="selected-file">
                <div className="file-info">{selected || 'nenhum selecionado'}</div>
                <div className="file-actions">
                    <button onClick={printSelected}>Print</button>
                    <button onClick={getFiles}>Refresh</button>
                </div>
            </div>

            <div className="files-list">
                {files ? (
                    files.map((i: any, index: number) => fileItem(i, index))
                ) : null}
            </div>
        </div>
    )
}
