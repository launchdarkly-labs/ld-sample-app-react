import { useFlags, withLDProvider } from "launchdarkly-react-client-sdk";
import { v4 as uuid } from 'uuid'
import { osName, isMobile } from 'react-device-detect'
import './App.css';

function App() {
  const { testFlag } = useFlags();
  return (
    <div className="App">
      <header className="App-header">
        <div>Hello World!</div>
        <div>The flag is {testFlag ? <span>true</span> : <span>false</span>}</div>
      </header>
    </div>
  );
}

export default withLDProvider({
  clientSideID: process.env.REACT_APP_LD_CLIENT_KEY,
  context: {
    kind: "multi",
    "user":
    {
      key: uuid(),
      name: "anonymous",
    },
    "device":
    {
      key: uuid(),
      operating_system: osName,
      mobile_device: isMobile
    },
    "location": {
      key: uuid(),
      timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      country: "US"
    },
    "environment": {
      key: uuid(),
      name: "Development"
    }
  },
})(App);
