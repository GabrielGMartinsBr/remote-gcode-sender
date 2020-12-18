import React, { useRef, useState } from 'react';
import axios from 'axios';

export function FileCtrl() {
    const inputRef = useRef<HTMLInputElement>(null);
    const [fileContent, setFileContent] = useState('');

    async function onInputFile() {
        const file = inputRef?.current?.files[0];
        if (!file) return;
        try {
            const data = await readFile(file);
            setFileContent(data);
        }
        catch (ex) {
            console.warn('Load input file content failed', ex);
        }
    }

    function print() {
        const file = inputRef?.current?.files[0];
        if (!file) return;
        uploadFile(file);
    }

    function readFile(file): Promise<string> {
        if (!file) return null;
        return new Promise((res, rej) => {
            const fr = new FileReader();
            fr.addEventListener('error', error => rej(error));
            fr.addEventListener('loadend', () => res(fr.result as string));
            fr.readAsText(file);
        })
    }

    async function uploadFile(file) {
        const formData = new FormData();
        formData.append('gcode', file);
        const headers = { 'Content-Type': 'multipart/form-data' };
        const res = await axios.post('/machine/gcode', formData, { headers })
        console.log(res);
    }

    return (
        <div className="file-ctrl base-content-block">
            <h2 className="base-content-block-title">Send File</h2>

            <div className="file-controls">
                <input ref={inputRef} type="file" multiple={false} accept=".gcode,.txt" onInput={onInputFile} />
                <button className="ml-auto" onClick={print}>Print</button>
            </div>

            <div className="gcode-text-preview">
                <textarea defaultValue={fileContent} readOnly onChange={e => setFileContent(e.target.value)}></textarea>
            </div>
        </div>
    )
}
