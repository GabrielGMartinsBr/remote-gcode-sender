import { useAppContext } from '@/AppContext';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useImmer } from 'use-immer';
import { PrinterCommand } from '@common/commands';
import { toast } from 'react-toastify';

interface Props {
}

const infoEntryStyle = `@tw{
    flex flex-row
    justify-start items-center
    mb-1
}`;

const labelStyle = `@tw{
    mr-2
    text-sm leading-none
    text-white/80
}`;

const valueStyle = `@tw{
    text-base leading-none
}`;


export default function QueueStatus(props: Props) {
    const { host } = useAppContext();
    const [status, statusUpdate] = useImmer({
        index: 0,
        linesNumber: 0,
        running: false,
        complete: false,
        pendingCommand: false,
        paused: false,
        progress: 0
    });

    useEffect(() => {
        fetchStatus();
    }, []);

    async function fetchStatus() {
        if (!host) {
            throw new Error('invalid host');
        }
        const base = `http://${host.domain}:${host.httpPort}`;
        const endpoint = `${base}/commands/status`;
        const res = await axios.get(endpoint);
        if (res.data.status) {
            const values = res.data.status;
            let progress = Math.round((values.index / values.linesNumber) * 100) || 0;
            console.log(res.data.status);
            statusUpdate({
                index: values.index,
                linesNumber: values.linesNumber,
                running: values.running,
                complete: values.complete,
                pendingCommand: values.pendingCommand,
                paused: values.paused,
                progress
            })
        }
    }

    async function sendCommand(command: PrinterCommand) {
        if (!host) {
            throw new Error('invalid host');
        }
        const base = `http://${host.domain}:${host.httpPort}`;
        const endpoint = `${base}/commands/send`;

        const dialog = toast.loading('Sending command...');

        try {
            const res = await axios.post(endpoint, { command });
            if (res.status === 200 && res.data?.result === 'ok') {
                toast.update(dialog, {
                    type: 'success',
                    isLoading: false,
                    render: 'Command sent!',
                    autoClose: 1e3,
                    closeButton: true,
                    closeOnClick: true
                });
                fetchStatus();
                return;
            } else {
                console.warn(res);
            }
        } catch (ex) {
            console.error(ex);
        }
        toast.update(dialog, {
            type: 'error',
            isLoading: false,
            render: 'Ops, something went wrong, check the logs.',
            autoClose: 5e3,
            closeButton: true,
            closeOnClick: true
        });
    }

    function handlePauseClick() {
        sendCommand(PrinterCommand.PAUSE);
    }

    function handleContinueClick() {
        sendCommand(PrinterCommand.CONTINUE);
    }

    return (
        <div>

            <h3
                className={`@tw{
                    text-xl font-medium mb-3
                }`}
            >
                Queue Status
            </h3>

            <div
                className={`@tw{
                    mb-4

                    flex flex-row
                    justify-start items-start
                }`}
            >

                <div
                    className={`@tw{
                        flex-1 w-full
                        bg-white/10
                        px-6 py-6
                        font-medium text-lg
                        tracking-wide
                    }`}
                >
                    <div className={infoEntryStyle}>
                        <div className={labelStyle}>
                            Index:
                        </div>
                        <div className={valueStyle}>
                            {status.index}
                        </div>
                    </div>
                    <div className={infoEntryStyle}>
                        <div className={labelStyle}>
                            Lines Number:
                        </div>
                        <div className={valueStyle}>
                            {status.linesNumber}
                        </div>
                    </div>
                    <div className={infoEntryStyle}>
                        <div className={labelStyle}>
                            Running:
                        </div>
                        <div className={valueStyle}>
                            {JSON.stringify(status.running)}
                        </div>
                    </div>
                    <div className={infoEntryStyle}>
                        <div className={labelStyle}>
                            Pending Command:
                        </div>
                        <div className={valueStyle}>
                            {JSON.stringify(status.pendingCommand)}
                        </div>
                    </div>
                    <div className={infoEntryStyle}>
                        <div className={labelStyle}>
                            Paused:
                        </div>
                        <div className={valueStyle}>
                            {JSON.stringify(status.paused)}
                        </div>
                    </div>
                    <div className={infoEntryStyle}>
                        <div className={labelStyle}>
                            Complete:
                        </div>
                        <div className={valueStyle}>
                            {JSON.stringify(status.complete)}
                        </div>
                    </div>
                    <div className={infoEntryStyle}>
                        <div className={labelStyle}>
                            Progress:
                        </div>
                        <div className={valueStyle}>
                            {status.progress}%
                        </div>
                    </div>
                </div>

                <div
                    className={`@tw{
                        flex-1 w-full max-w-md
                        px-9
                        flex gap-2
                    }`}
                >
                    <button
                        onClick={fetchStatus}
                    >
                        Get Status
                    </button>
                    <button
                        onClick={handlePauseClick}
                    >
                        Pause
                    </button>
                    <button
                        onClick={handleContinueClick}
                    >
                        Continue
                    </button>
                </div>

            </div>
        </div>
    );
}