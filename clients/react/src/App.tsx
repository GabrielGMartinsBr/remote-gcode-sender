import { useRef } from 'react';
import { AppContext, AppContextValue } from '@/AppContext';
import ViewCtrl from './view/ViewCtrl';
import { WsClient } from './services/ws-client';

function App() {
  const wsClient = useRef(new WsClient());
  const contextValue: AppContextValue = {
    wsClient: wsClient.current
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
