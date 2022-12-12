import { useAppContext } from '@/AppContext';

export default function ConnectionBar() {
    const { wsClient, host } = useAppContext();

    function disconnect() {
        if (wsClient) {
            wsClient.disconnect();
        }
    }

    return (
        <>
            <div className="bg-white/10 p-4 mb-4 flex items-center">

                <h2 className="text-xl">
                    Server: <span className="font-semibold">{host!.name}</span>
                </h2>

                <button
                    onClick={disconnect}
                    className="ml-auto"
                >
                    Disconnect
                </button>
            </div>
        </>
    );
}
