import { useRef, useState } from 'react';
import { AppContext, AppContextValue } from '@/AppContext';
import ViewCtrl from './view/ViewCtrl';
import { WsClient } from './services/ws-client';
import { ServerHost } from './types/server-host';

function App() {
  const wsClient = useRef(new WsClient());
  const [host, setHost] = useState<ServerHost>({
    name: 'Local Server',
    domain: 'localhost',
    httpPort: 9000,
    wsPort: 9010,
  });

  const contextValue: AppContextValue = {
    wsClient: wsClient.current,
    host,
    setHost,
  };

  return (
    <>
      <AppContext.Provider value={contextValue}>
        <ViewCtrl />
      </AppContext.Provider>
    </>
  )
}

export default App
