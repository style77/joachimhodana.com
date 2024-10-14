import { MouseEventHandler, useEffect, useState } from "react";
import { ErrorBoundary } from "react-error-boundary";
import Background from "./containers/background/background";
import Taskbar from "./components/taskbar";
import { SidePane } from "./components/sidepane";
import { Calendar } from "./components/calendar";
import { Desktop } from "./components/desktop";

import * as Applications from "./containers/applications";
import { useDispatch, useSelector } from "react-redux";
import { Application } from "./utils/defaults";
import { RootState } from "./reducers";
import { BandPane } from "./components/bandpane";


function ErrorFallback({ error, resetErrorBoundary }: { error: Error, resetErrorBoundary: MouseEventHandler<HTMLButtonElement> }) {
  const [loading, setLoading] = useState<number>(0);

  useEffect(() => {
    const speed = 1000;

    const interval = setInterval(() => {
      setLoading((loading) => {
        if (loading < 99) {
          return loading + 1;
        } else {
          clearInterval(interval);
          return loading;
        }
      });
    }, speed);

    return () => clearInterval(interval);
  }, []);

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
            <span id="percentage">{loading}</span>% complete
          </h2>
          <div id="details">
            <div id="qr">
              <div id="image w-full h-full">
                <img src="https://win11.blueedge.me/img/qr.png" alt="QR Code" />
              </div>
            </div>
            <div id="stopcode">
              <h4>
                For more information about this issue and possible fixes, visit
                <br />{" "}
                <a href="https://github.com/style77/joachimhodana.com/issues">
                  https://github.com/style77/joachimhodana.com/issues
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

type SelectionBox = {
  startX: number;
  startY: number;
  endX: number;
  endY: number;
}

interface ApplicationComponents {
  [key: string]: React.ComponentType<any>; // eslint-disable-line
}

const MIN_OPACITY = 0.30;

function App() {

  const applicationsState = useSelector((state: RootState) => state.applications);
  const sidepaneState = useSelector((state: RootState) => state.sidepane);

  const [selecting, setSelecting] = useState(false);
  const [selectionBox, setSelectionBox] = useState<SelectionBox | null>(null);

  const dispatch = useDispatch();

  useEffect(() => {
    const handleMouseUpDocument = () => {
      if (selecting) {
        setSelecting(false);
      }
    };

    const handleMouseMoveDocument = (e: MouseEvent) => {
      if (selectionBox && selecting) {
        const { clientX, clientY } = e;
        setSelectionBox((prevBox) => ({
          ...prevBox!,
          endX: clientX,
          endY: clientY,
        }));
      }
    };

    document.addEventListener('mouseup', handleMouseUpDocument);
    document.addEventListener('mousemove', handleMouseMoveDocument);

    return () => {
      document.removeEventListener('mouseup', handleMouseUpDocument);
      document.removeEventListener('mousemove', handleMouseMoveDocument);
    };
  }, [selecting, selectionBox]);

  const handleMouseDown = (e: MouseEvent) => {
    setSelecting(true);
    const { clientX, clientY } = e;
    setSelectionBox({
      startX: clientX,
      startY: clientY,
      endX: clientX,
      endY: clientY,
    });
  };

  const handleMouseUp = () => {
    setSelecting(false);
  };

  return (
    <div className="App">
      <div className="absolute inset-0 bg-black z-50 pointer-events-none"
        style={{
          // set opacity reverse to  sidepane.brightness (0-1), min value is 0.15
          opacity: 1 - ((sidepaneState.brightness as number) / 100) - MIN_OPACITY,
        }}
      ></div>
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <div className="appwrap">
          <Background />
          <div className="desktop" data-menu="desk"
            onMouseDown={(e) => handleMouseDown(e.nativeEvent)}
            onMouseUp={handleMouseUp}
          >
            {selecting && selectionBox && !applicationsState.activeApplication && (
              <div
                className="selectionBox"
                style={{
                  left: Math.min(selectionBox.startX, selectionBox.endX),
                  top: Math.min(selectionBox.startY, selectionBox.endY),
                  width: Math.abs(selectionBox.endX - selectionBox.startX),
                  height: Math.abs(selectionBox.endY - selectionBox.startY),
                }}
              />
            )}
            <Desktop />
            {applicationsState.applications.map((key: Application, idx: number) => {
              const componentName = key.name.replace(/ /g, '');
              const WinApp = (Applications as ApplicationComponents)[componentName];

              if (WinApp) {
                return <WinApp key={idx} />;
              } else {
                console.error(`App ${key.name} not found. It's probably not implemented yet.`);
                dispatch({
                  type: "CLOSE_APPLICATION",
                  payload: key.id
                });
                return null;
              }
            })}
            <SidePane />
            <BandPane />
            <Calendar />
          </div>
          <Taskbar />
        </div>
      </ErrorBoundary>
    </div>
  )
}

export default App
