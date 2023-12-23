import React, { useState, useEffect } from 'react';
import { useAppContext } from '@/AppContext';
import { useRefSet3 } from '@/hooks/useRefSet3';

// import { useLogs } from './device-mng-context';

export function DeviceTerm({ logs }: any) {
    const { wsClient } = useAppContext();
    const refs = useRefSet3(class {
        logs: HTMLDivElement | null = null;
    });

    const [cmd, setCmd] = useState('')
    const [cmdHist, setCmdHist] = useState<string[]>([])
    const [cmdHistCursor, setCmdHistCursor] = useState(0)
    const [typingCmd, setTypingCmd] = useState('');
    // const { logs } = useLogs();

    useEffect(() => onInit(), [])

    // Save Command History
    useEffect(() => {
        if (Array.isArray(cmdHist) && cmdHist.length) {
            localStorage.setItem('RemoteGcodeSender-cmdHistory', JSON.stringify(cmdHist));
            setCmdHistCursor(0);
        }
    }, [cmdHist])


    useEffect(() => {
        restoreCmdFromHistory(cmdHistCursor);
    }, [cmdHistCursor])


    useEffect(() => scroll(), [logs])

    /*
        Life Cycles Fns
    */

    function onInit() {
        loadCmdHistory();
    }


    /*
        Send Commands
    */

    function loadCmdHistory() {
        try {
            const str = localStorage.getItem('RemoteGcodeSender-cmdHistory');
            if (str) {
                const data = JSON.parse(str);
                setCmdHist(
                    (Array.isArray(data) ? data : []) as any
                );
            }

        } catch (ex) {
            console.error(ex);
        }
    }

    function pushCmdHistory(command: any) {
        const lastIndex = Math.max(cmdHist.length - 1, 0);
        if (command && cmdHist[lastIndex] !== command) {
            setCmdHist([...cmdHist, command]);
        }
    }

    function restoreCmdFromHistory(cursor: number) {
        if (!cursor) {
            setCmd(typingCmd);
        } else {
            const l = cmdHist.length;
            const index = l - cursor;
            setCmd(cmdHist[index]);
        }
    }

    function onKey(e: React.KeyboardEvent) {
        if (e && ['ArrowUp', 'ArrowDown'].indexOf(e.key) > -1) {
            e.preventDefault();
            e.stopPropagation();

            let nCursor: number;
            if (e.key === 'ArrowUp') {
                nCursor = Math.min(cmdHistCursor + 1, cmdHist.length);
                if (nCursor === 1) {
                    setTypingCmd(cmd);
                }
            }
            else {
                nCursor = Math.max(cmdHistCursor - 1, 0);
            }
            setCmdHistCursor(nCursor);

            return;
        }

        if (e && e.key === 'Enter') {
            sendCmd();
        }
    }

    function sendCmd() {
        if (!wsClient || !cmd) {
            return;
        }
        const command = cmd.toUpperCase();
        wsClient.send({
            cmd: 'serialSendData',
            data: command + '\n'
        });
        setCmd('');
        setCmdHistCursor(0);
        pushCmdHistory(command);
    }


    /*
        Logs
    */

    function getLogs() {
        wsClient?.send({ cmd: 'serialGetLog' });
    }

    function scroll() {
        if (!refs.logs || !logs) {
            return;
        }
        const { scrollHeight, clientHeight } = refs.logs;
        refs.logs.scrollTop = scrollHeight - clientHeight;
    }


    /*
        Renders
    */

    return (
        <div className="base-content-block">
            <h2 className="text-xl mb-3 px-1">
                Terminal
            </h2>

            <div
                ref={refs.setter('logs')}
                className={
                    'h-[320px] overflow-auto ' +
                    'bg-zinc-50 text-zinc-800 p-4'
                }
            >
                <pre>{logs}</pre>
            </div>

            <div className={
                'flex flex-wrap items-stretch'
            }>
                <input
                    className={
                        'flex-1 !text-zinc-900 px-3 uppercase'
                    }
                    type="text"
                    onKeyDown={e => onKey(e)}
                    onChange={e => setCmd(e.target.value)}
                    value={cmd}
                />
                <button
                    className='bg-zinc-100 !text-zinc-600 active:opacity-90'
                    type="button"
                    onClick={sendCmd}
                >
                    Send
                </button>
                <button
                    className='bg-zinc-100 !text-zinc-600 active:opacity-90'
                    type="button"
                    onClick={getLogs}>
                    Refresh
                </button>
            </div>
        </div>
    )
}