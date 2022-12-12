import { useAppContext } from '@/AppContext'
import { ServerHost } from '@/types/server-host';
import { useEffect, useState } from 'react';

export default function HostCtrl() {
    const { host, setHost, wsClient } = useAppContext();

    const [name, setName] = useState('');
    const [domain, setDomain] = useState('');
    const [httpPort, setHttpPort] = useState('');
    const [wsPort, setWsPort] = useState('');

    useEffect(() => {
        loadHost();
    }, [host]);

    function loadHost() {
        if (host) {
            setName(host.name);
            setDomain(host.domain);
            setHttpPort(host.httpPort.toString());
            setWsPort(host.wsPort.toString());
        }
    }

    function prepareModel() {
        return {
            name,
            domain,
            httpPort: parseInt(httpPort),
            wsPort: parseInt(wsPort),
        };
    }

    function validate(params: ServerHost) {
        return params && params.name &&
            params.domain && params.httpPort && params.wsPort;
    }

    function save(params: ServerHost) {
        setHost(params)
    }

    function connect() {
        const params = prepareModel();
        const isValid = validate(params);
        if (!wsClient || !isValid) {
            return;
        }
        save(params);
        const hostUrl = `ws://${params.domain}:${params.wsPort}`
        wsClient.connect(hostUrl);
    }

    return (
        <>
            <div className="bg-white/10 p-4 mb-4 flex flex-col">
                <div className="bg-white/10 p-4 w-min mx-auto">
                    <h2 className="text-xl font-semibold mb-6">
                        Edit Host Params
                    </h2>

                    <div className="px-2">
                        <label className='flex mb-3'>
                            <span className="block text-lg w-36">
                                Name:
                            </span>
                            <input
                                type="text"
                                className={
                                    'px-4 py-2 bg-white/10 rounded ' +
                                    'focus:outline-0 focus:ring-2 focus:ring-yellow-400'
                                }
                                value={name}
                                onChange={e => setName(e.target.value)}
                            />
                        </label>

                        <label className='flex mb-3'>
                            <span className="block text-lg w-36">
                                Domain:
                            </span>
                            <input
                                type="text"
                                className={
                                    'px-4 py-2 bg-white/10 rounded ' +
                                    'focus:outline-0 focus:ring-2 focus:ring-yellow-400'
                                }
                                value={domain}
                                onChange={e => setDomain(e.target.value)}
                            />
                        </label>

                        <label className='flex mb-3'>
                            <span className="block text-lg w-36">
                                Http Port:
                            </span>
                            <input
                                type="number"
                                className={
                                    'px-4 py-2 bg-white/10 rounded ' +
                                    'focus:outline-0 focus:ring-2 focus:ring-yellow-400'
                                }
                                value={httpPort}
                                onChange={e => setHttpPort(e.target.value)}
                            />
                        </label>

                        <label className='flex mb-3'>
                            <span className="block text-lg w-36">
                                Ws Port:
                            </span>
                            <input
                                type="number"
                                className={
                                    'px-4 py-2 bg-white/10 rounded ' +
                                    'focus:outline-0 focus:ring-2 focus:ring-yellow-400'
                                }
                                value={wsPort}
                                onChange={e => setWsPort(e.target.value)}
                            />
                        </label>
                    </div>

                    <div className="flex justify-end mt-6">
                        {/* <button
                            onClick={reset}
                            className={
                                'px-4 py-2 rounded mr-2 ' +
                                'focus:outline-0 focus:ring-2 focus:ring-yellow-400'
                            }
                        >
                            Reset
                        </button> */}
                        <button
                            onClick={connect}
                            className={
                                'px-4 py-2 rounded ' +
                                'focus:outline-0 focus:ring-2 focus:ring-yellow-400'
                            }
                        >
                            Connect
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}
