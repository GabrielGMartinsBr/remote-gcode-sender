import { useEffect, useState } from 'react'
import { DeviceMngPage } from './components/device-mng/device-mng'
import { DeviceSelectorPage } from './components/device-selector/device-selector'
import { WSC } from './wsc/wsc';
import { filter } from 'rxjs/operators';

function App() {
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    const cmds = ['serialDeviceStatus'];
    WSC.init();
    const $ = WSC.events
      .pipe(
        filter(e => e && cmds.indexOf(e.cmd) > -1)
      )
      .subscribe(event => {
        switch (event.cmd) {
          case 'serialDeviceStatus':
            setConnected(
              event?.data?.opened || false
            )
        }
      });

    return () => {
      $.unsubscribe();
    }
  }, []);

  return (
    <div className="App">
      {connected ? (
        <DeviceMngPage />
      ) : (
        <DeviceSelectorPage />
      )}
    </div>
  )
}

export default App
