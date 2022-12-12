import { useRef, useState } from 'react';
import axios from 'axios';
import { useAppContext } from '@/AppContext';

export function FileCtrl() {
    const inputRef = useRef<HTMLInputElement>(null);
    const [fileContent, setFileContent] = useState('');
    const { host } = useAppContext();

    async function onInputFile() {
        if (!inputRef.current) return;
        const file = inputRef.current.files?.[0];
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
        const file = inputRef.current?.files?.[0];
        if (!file) return;
        uploadFile(file);
    }

    function readFile(file: any): Promise<string> {
        if (!file) return Promise.reject(null);
        return new Promise((res, rej) => {
            const fr = new FileReader();
            fr.addEventListener('error', error => rej(error));
            fr.addEventListener('loadend', () => res(fr.result as string));
            fr.readAsText(file);
        })
    }

    async function uploadFile(file: any) {
        if (!host) {
            return;
        }
        const baseUrl = `http://${host.domain}:${host.httpPort}`;
        const url = `${baseUrl}/machine/gcode`;
        const formData = new FormData();
        formData.append('gcode', file);
        const headers = { 'Content-Type': 'multipart/form-data' };
        try {
            const res = await axios.post(
                url, formData, { headers }
            )
            console.log(res);
        } catch (ex) {
            console.warn(ex);
        }
    }

    return (
        <div className="base-content-block">
            <h2 className="text-xl mb-3 px-1">
                Send File
            </h2>

            <div className={
                'bg-white/10 flex flex-wrap items-center p-4 mb-4'
            }>
                <input
                    ref={inputRef}
                    type="file"
                    multiple={false}
                    accept=".gcode,.txt"
                    onInput={onInputFile}
                />
                <button
                    className="ml-auto text-base font-semibold px-2.5 py-1"
                    onClick={print}
                >
                    Print
                </button>
            </div>

            <div className="">
                <textarea
                    className={
                        'bg-white/10 text-white w-full p-4 min-h-[300px] ' +
                        'uppercase border-0'
                    }
                    defaultValue={fileContent}
                    readOnly
                    onChange={e => setFileContent(e.target.value)}
                />
            </div>
        </div>
    )
}
