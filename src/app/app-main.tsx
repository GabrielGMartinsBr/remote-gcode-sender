import React from "react";
import ReactDOM from "react-dom";
import { Subject } from "rxjs";
import { takeUntil, filter } from "rxjs/operators";

import { WSC } from "./wsc/wsc";
import { DeviceSelectorPage } from "./device-selector/device-selector";
import { DeviceMngPage } from './device-mng/device-mng';

import './main.scss';

interface AppState {
    connected: boolean
}

class AppMain extends React.Component<any, AppState> {
    destroySbj = new Subject<void>();

    constructor(props) {
        super(props);

        this.state = {
            connected: false
        }
    }

    componentDidMount() {
        WSC.init();
        this.listenWS();
    }

    componentWillUnmount() {
        this.destroySbj.next();
        this.destroySbj.complete();
    }

    listenWS() {
        const cmds = ['serialDeviceStatus'];
        WSC.events
            .pipe(
                takeUntil(this.destroySbj),
                filter(e => e && cmds.indexOf(e.cmd) > -1)
            )
            .subscribe(event => {
                switch (event.cmd) {
                    case 'serialDeviceStatus':
                        return this.onStatus(event.data);
                }
            });
    }

    onStatus(status) {
        this.setState({
            connected: status.opened || false
        })
    }

    render() {
        return (
            <div>
                {this.state.connected ?
                    <DeviceMngPage /> : <DeviceSelectorPage />}
            </div>
        )
    }
}

ReactDOM.render(
    <AppMain />,
    document.getElementById("app")
);
