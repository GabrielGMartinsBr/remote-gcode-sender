import { useAppContext } from '@/AppContext';

export function BasicControls() {
    const { wsClient } = useAppContext();

    function sendCommand(key: string) {
        if (!wsClient) {
            return;
        }
        const commands = {
            'homeAll': 'G28\n',
            'homeX': 'G28 X\n',
            'homeY': 'G28 Y\n',
            'homeZ': 'G28 Z\n',
            'motorsOn': 'M17\n',
            'motorsOff': 'M84\n',
        } as any;

        const command = commands[key];

        if (!command) {
            console.warn(`Command ${key} not set yet`);
            return;
        }

        wsClient.send({ cmd: 'serialSendData', data: command });
        console.log('command sent:', command);
    }

    return (
        <div className="basic-controls base-content-block">
            <div className="directional-ctrls">
                <div className="ctrls-line">
                    <div className="ctrl-cell">
                        <button
                            className="cm"
                            onClick={() => sendCommand('')}
                            type="button"
                        >
                            10x◤
                        </button>
                    </div>
                    <div className="ctrl-cell">
                        <button
                            className="um"
                            onClick={() => sendCommand('')}
                            type="button"
                        >
                            .1x◤
                        </button>
                    </div>
                    <div className="ctrl-cell">
                        <button
                            className="cm"
                            onClick={() => sendCommand('')}
                            type="button"
                        >
                            10x▲
                        </button>
                    </div>
                    <div className="ctrl-cell">
                        <button
                            className="um"
                            onClick={() => sendCommand('')}
                            type="button"
                        >
                            .1x▲
                        </button>
                    </div>
                    <div className="ctrl-cell">
                        <button
                            className="cm"
                            onClick={() => sendCommand('')}
                            type="button"
                        >
                            10x◥
                        </button>
                    </div>
                </div>
                <div className="ctrls-line">
                    <div className="ctrl-cell">
                        <button
                            className="um"
                            onClick={() => sendCommand('')}
                            type="button"
                        >
                            .1x◀
                        </button>
                    </div>
                    <div className="ctrl-cell">
                        <button
                            className="mm"
                            onClick={() => sendCommand('')}
                            type="button"
                        >
                            ◤
                        </button>
                    </div>
                    <div className="ctrl-cell">
                        <button
                            className="mm"
                            onClick={() => sendCommand('')}
                            type="button"
                        >
                            ▲
                        </button>
                    </div>
                    <div className="ctrl-cell">
                        <button
                            className="mm"
                            onClick={() => sendCommand('')}
                            type="button"
                        >
                            ◥
                        </button>
                    </div>
                    <div className="ctrl-cell">
                        <button
                            className="um"
                            onClick={() => sendCommand('')}
                            type="button"
                        >
                            .1x◥
                        </button>
                    </div>
                </div>
                <div className="ctrls-line">
                    <div className="ctrl-cell">
                        <button
                            className="cm"
                            onClick={() => sendCommand('')}
                            type="button"
                        >
                            10x◀
                        </button>
                    </div>
                    <div className="ctrl-cell">
                        <button
                            className="mm"
                            onClick={() => sendCommand('')}
                            type="button"
                        >
                            ◀
                        </button>
                    </div>
                    <div className="ctrl-cell">
                        <button
                            className="mm"
                            onClick={() => sendCommand('')}
                            type="button"
                        >
                            ◉
                        </button>
                    </div>
                    <div className="ctrl-cell">
                        <button
                            className="mm"
                            onClick={() => sendCommand('')}
                            type="button"
                        >
                            ▶
                        </button>
                    </div>
                    <div className="ctrl-cell">
                        <button
                            className="cm"
                            onClick={() => sendCommand('')}
                            type="button"
                        >
                            10x▶
                        </button>
                    </div>
                </div>
                <div className="ctrls-line">
                    <div className="ctrl-cell">
                        <button
                            className="um"
                            onClick={() => sendCommand('')}
                            type="button"
                        >
                            .1x◣
                        </button>
                    </div>
                    <div className="ctrl-cell">
                        <button
                            className="mm"
                            onClick={() => sendCommand('')}
                            type="button"
                        >
                            ◣
                        </button>
                    </div>
                    <div className="ctrl-cell">
                        <button
                            className="mm"
                            onClick={() => sendCommand('')}
                            type="button"
                        >
                            ▼
                        </button>
                    </div>
                    <div className="ctrl-cell">
                        <button
                            className="mm"
                            onClick={() => sendCommand('')}
                            type="button"
                        >
                            ◢
                        </button>
                    </div>
                    <div className="ctrl-cell">
                        <button
                            className="um"
                            onClick={() => sendCommand('')}
                            type="button"
                        >
                            .1x▶
                        </button>
                    </div>
                </div>
                <div className="ctrls-line">
                    <div className="ctrl-cell">
                        <button
                            className="cm"
                            onClick={() => sendCommand('')}
                            type="button"
                        >
                            10x◣
                        </button>
                    </div>
                    <div className="ctrl-cell">
                        <button
                            className="um"
                            onClick={() => sendCommand('')}
                            type="button"
                        >
                            .1x▼
                        </button>
                    </div>
                    <div className="ctrl-cell">
                        <button
                            className="cm"
                            onClick={() => sendCommand('')}
                            type="button"
                        >
                            10x▼
                        </button>
                    </div>
                    <div className="ctrl-cell">
                        <button
                            className="um"
                            onClick={() => sendCommand('')}
                            type="button"
                        >
                            .1x◢
                        </button>
                    </div>
                    <div className="ctrl-cell">
                        <button
                            className="cm"
                            onClick={() => sendCommand('')}
                            type="button"
                        >
                            10x◢
                        </button>
                    </div>
                </div>
            </div>
            <div className="home-ctrls">
                <button
                    type="button"
                    onClick={() => sendCommand('homeAll')}
                >
                    ☗
                </button>
                <button
                    type="button"
                    onClick={() => sendCommand('homeX')}
                >
                    ☗ X
                </button>
                <button
                    type="button"
                    onClick={() => sendCommand('homeY')}
                >
                    ☗ Y
                </button>
                <button
                    type="button"
                    onClick={() => sendCommand('homeZ')}
                >
                    ☗ Z
                </button>
            </div>
            <div className="utils-btns">
                <button type="button" onClick={() => sendCommand('motorsOn')}>
                    Motors On
                </button>
                <button type="button" onClick={() => sendCommand('motorsOff')}>
                    Motors Off
                </button>
            </div>
        </div>
    )
}