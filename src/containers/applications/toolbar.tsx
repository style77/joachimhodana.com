import { useState } from "react";
import { useDispatch } from "react-redux";
import "../../utils/general.scss";
import { Icon } from "../../utils/icon";

export const ToolBar = (props) => {
    const dispatch = useDispatch();
    const [snap, setSnap] = useState(false);
  
    const openSnap = () => {
      setSnap(true);
    };
  
    const closeSnap = () => {
      setSnap(false);
    };
  
    const toolClick = () => {
      dispatch({
        type: props.app,
        payload: "front",
      });
    };
  
    let posP = [0, 0],
      dimP = [0, 0],
      posM = [0, 0],
      wnapp = {},
      op = 0,
      vec = [0, 0];
  
    const toolDrag = (e) => {
      if (props.size == "full") {
        return
      }

      e = e || window.event;
      e.preventDefault();
      posM = [e.clientY, e.clientX];
      op = e.currentTarget.dataset.op;
  
      if (op == 0) {
        wnapp =
          e.currentTarget.parentElement &&
          e.currentTarget.parentElement.parentElement;
      } else {
        vec = e.currentTarget.dataset.vec.split(",");
        wnapp =
          e.currentTarget.parentElement &&
          e.currentTarget.parentElement.parentElement &&
          e.currentTarget.parentElement.parentElement.parentElement;
      }
  
      if (wnapp) {
        wnapp.classList.add("notrans");
        wnapp.classList.add("z9900");
        posP = [wnapp.offsetTop, wnapp.offsetLeft];
        dimP = [
          parseFloat(getComputedStyle(wnapp).height.replaceAll("px", "")),
          parseFloat(getComputedStyle(wnapp).width.replaceAll("px", "")),
        ];
      }
  
      document.onmouseup = closeDrag;
      document.onmousemove = eleDrag;
    };
  
    const setPos = (pos0, pos1) => {
      wnapp.style.top = pos0 + "px";
      wnapp.style.left = pos1 + "px";
    };
  
    const setDim = (dim0, dim1) => {
      wnapp.style.height = dim0 + "px";
      wnapp.style.width = dim1 + "px";
    };
  
    const eleDrag = (e) => {
      e = e || window.event;
      e.preventDefault();
  
      let pos0 = posP[0] + e.clientY - posM[0],
        pos1 = posP[1] + e.clientX - posM[1],
        dim0 = dimP[0] + vec[0] * (e.clientY - posM[0]),
        dim1 = dimP[1] + vec[1] * (e.clientX - posM[1]);
  
      if (op == 0) setPos(pos0, pos1);
      else {
        dim0 = Math.max(dim0, 320);
        dim1 = Math.max(dim1, 320);
        pos0 = posP[0] + Math.min(vec[0], 0) * (dim0 - dimP[0]);
        pos1 = posP[1] + Math.min(vec[1], 0) * (dim1 - dimP[1]);
        setPos(pos0, pos1);
        setDim(dim0, dim1);
      }
    };
  
    const closeDrag = () => {
      document.onmouseup = null;
      document.onmousemove = null;
  
      wnapp.classList.remove("notrans");
      wnapp.classList.remove("z9900");
  
      // var action = {
      //   type: props.app,
      //   payload: "resize",
      //   dim: {
      //     width: getComputedStyle(wnapp).width,
      //     height: getComputedStyle(wnapp).height,
      //     top: getComputedStyle(wnapp).top,
      //     left: getComputedStyle(wnapp).left,
      //   },
      // };
  
      // dispatch(action);
    };
  
    return (
      <>
        <div
          className="toolbar"
          data-float={props.float != null}
          data-noinvert={props.noinvert != null}
          style={{
            background: props.bg,
          }}
        >
          <div
            className="topInfo flex flex-grow items-center"
            data-float={props.float != null}
            onClick={toolClick}
            onMouseDown={toolDrag}
            data-op="0"
          >
            <Icon src={props.icon} ui width={14} />
            <div
              className="appFullName text-xss"
              data-white={props.invert != null}
            >
              {props.name}
            </div>
          </div>
          <div className="actbtns flex items-center">
            <Icon
              invert={props.invert}
              clicked={true}
              src="minimize"
              ui
              width={12}
              onClick={() => dispatch({type: "MINIMIZE_APPLICATION", payload: props.app.id})}
            />
            <div
              className="snapbox h-full"
              data-hv={snap}
              onMouseOver={openSnap}
              onMouseLeave={closeSnap}
            >
              <Icon
                invert={props.invert}
                clicked={true}
                ui
                width={12}
                src={props.size == "full" ? "maximize" : "maxmin"}
                onClick={() => dispatch({type: "RESIZE_APPLICATION", payload: {
                  id: props.app.id,
                  size: props.size == "full" ? "mini" : "full"
                }})}
              />
            </div>
            <Icon
              className="closeBtn"
              invert={props.invert}
              clicked={true}
              src="close"
              ui
              width={14}
              onClick={() => dispatch({type: "CLOSE_APPLICATION", payload: props.app.id})}
            />
          </div>
        </div>
        <div className="resizecont topone">
          <div className="flex">
            <div
              className="conrsz cursor-nw-resize"
              data-op="1"
              onMouseDown={toolDrag}
              data-vec="-1,-1"
            ></div>
            <div
              className="edgrsz cursor-n-resize wdws"
              data-op="1"
              onMouseDown={toolDrag}
              data-vec="-1,0"
            ></div>
          </div>
        </div>
        <div className="resizecont leftone">
          <div className="h-full">
            <div
              className="edgrsz cursor-w-resize hdws"
              data-op="1"
              onMouseDown={toolDrag}
              data-vec="0,-1"
            ></div>
          </div>
        </div>
        <div className="resizecont rightone">
          <div className="h-full">
            <div
              className="edgrsz cursor-w-resize hdws"
              data-op="1"
              onMouseDown={toolDrag}
              data-vec="0,1"
            ></div>
          </div>
        </div>
        <div className="resizecont bottomone">
          <div className="flex">
            <div
              className="conrsz cursor-ne-resize"
              data-op="1"
              onMouseDown={toolDrag}
              data-vec="1,-1"
            ></div>
            <div
              className="edgrsz cursor-n-resize wdws"
              data-op="1"
              onMouseDown={toolDrag}
              data-vec="1,0"
            ></div>
            <div
              className="conrsz cursor-nw-resize"
              data-op="1"
              onMouseDown={toolDrag}
              data-vec="1,1"
            ></div>
          </div>
        </div>
      </>
    );
  };