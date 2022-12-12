import { AppCtx } from './AppCtxProvider';
import ViewCtrl from './view/ViewCtrl';
import { WSC } from '@/wsc/wsc';

function App() {
  return (
    <>
      <AppCtx.Provider value={{ wsc: WSC }}>
        <ViewCtrl />
      </AppCtx.Provider>
    </>
  )
}

export default App
