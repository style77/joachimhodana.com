import { MouseEventHandler } from "react";
import { ErrorBoundary } from "react-error-boundary";
import Background from "./containers/background/background";
import Taskbar from "./components/taskbar";
import { SidePane } from "./components/sidepane";
import { Calendar } from "./components/calendar";


function ErrorFallback({ error, resetErrorBoundary }: { error: Error, resetErrorBoundary: MouseEventHandler<HTMLButtonElement> }) {
  return (
    <div>
      <meta charSet="UTF-8" />
      <title>404 - Page</title>
      <script src="https://win11.blueedge.me/script.js"></script>
      <link rel="stylesheet" href="https://win11.blueedge.me/style.css" />
      <div id="page">
        <div id="container">
          <h1>:(</h1>
          <h2>
            Your PC ran into a problem and needs to restart. We're just
            collecting some error info, and then we'll restart for you.
          </h2>
          <h2>
            <span id="percentage">0</span>% complete
          </h2>
          <div id="details">
            <div id="qr">
              <div id="image">
                <img src="https://win11.blueedge.me/img/qr.png" alt="QR Code" />
              </div>
            </div>
            <div id="stopcode">
              <h4>
                For more information about this issue and possible fixes, visit
                <br />{" "}
                <a href="https://github.com/style77/joachimhodana.com/issues">
                  https://github.com/blueedgetechno/win11React/issues
                </a>{" "}
              </h4>
              <h5>
                If you call a support person, give them this info:
                <br />
                Stop Code: {error.message}
              </h5>
              <button onClick={resetErrorBoundary}>Try again</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function App() {
  return (
    <div className="App">
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <div className="appwrap">
          <Background />
          <div className="desktop" data-menu="desk">
            <SidePane />
            <Calendar />
          </div>
          <Taskbar />
        </div>
      </ErrorBoundary>
    </div>
  )
}

export default App
