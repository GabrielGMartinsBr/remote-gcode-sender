/* eslint-disable react-hooks/exhaustive-deps */

import React, { useState, useEffect, useRef } from 'react';
import * as d3 from 'd3';

import { WSC } from '../../wsc/wsc';
// import { useLogs } from './device-mng-context';

export function DeviceTerm({ logs }: any) {
    const [cmd, setCmd] = useState('')
    const [cmdHist, setCmdHist] = useState<string[]>([])
    const [cmdHistCursor, setCmdHistCursor] = useState(0)
    const [typingCmd, setTypingCmd] = useState('');
    const preRef = useRef(null);
    // const { logs } = useLogs();

    /*
        Effects
    */

    // On Init
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
        Lifecycles Fns
    */

    function onInit() {
        loadCmdHitory();
    }


    /*
        Send Commands
    */

    function loadCmdHitory() {
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

        if (e && e.keyCode === 13) {
            sendCmd();
        }
    }

    function sendCmd() {
        if (!cmd) return;
        const command = cmd.toUpperCase();
        WSC.send({ cmd: 'serialSendData', data: command + '\n' });
        setCmd('');
        setCmdHistCursor(0);
        pushCmdHistory(command);
    }


    /*
        Logs
    */

    function getLogs() {
        WSC.send({ cmd: 'serialGetLog' });
    }

    function scroll() {
        if (!preRef?.current) {
            return;
        }
        const pre = d3.select(preRef.current);

        pre.transition()
            .duration(4e2)
            .tween('uniquetweenname', scrollTopTween(pre.property('scrollHeight')))

        function scrollTopTween(scrollTop: any) {
            return function () {
                const i = d3.interpolateNumber(this.scrollTop, scrollTop);
                return function (t) { this.scrollTop = i(t); };
            };
        }

    }


    /*
        Renders
    */

    return (
        <div className="device-term base-content-block">
            <h2 className="base-content-block-title">Terminal</h2>

            <div className="device-term-log">
                <pre ref={preRef}>{logs}</pre>
            </div>

            <div className="device-term-input">
                <input
                    type="text"
                    onKeyDown={e => onKey(e)}
                    onChange={e => setCmd(e.target.value)}
                    value={cmd}
                />
                <button
                    type="button"
                    onClick={sendCmd}
                >
                    Send
                </button>
                <button
                    type="button"
                    onClick={getLogs}>
                    Refresh
                </button>
            </div>
        </div>
    )
}