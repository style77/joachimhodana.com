import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Icon } from "../../utils/icon";
// import Battery from "../shared/Battery";
import "../search/searchpane.scss";
import "../sidepane/sidepane.scss";
import "../start/startmenu.scss";
import "./calendar.scss"

import "dycalendarjs/js/dycalendar.min.js"


export const Calendar = () => {
    const sidepane = useSelector((state) => state.sidepane);
    const [loaded, setLoad] = useState(false);
  
    const [collapse, setCollapse] = useState("");
  
    const collapseToggler = () => {
      collapse === "" ? setCollapse("collapse-calendar") : setCollapse("");
    };
  
    useEffect(() => {
      if (!loaded) {
        setLoad(true);
        dycalendar.draw({
          target: "#dycalendar",
          type: "month",
          dayformat: "ddd",
          monthformat: "full",
          prevnextbutton: "show",
          highlighttoday: true,
        });
      }
    });
  
    return (
      <div
        className={`calnpane ${collapse} dpShad`}
        data-hide={sidepane.calendarHide}
        style={{ "--prefix": "CALN" }}
      >
        <div className="topBar pl-4 text-sm">
          <div className="date">
            {new Date().toLocaleDateString(undefined, {
              weekday: "long",
              month: "long",
              day: "numeric",
            })}
          </div>
          <div className="collapser p-2 m-4 rounded" onClick={collapseToggler}>
            {collapse === "" ? (
              <Icon fafa="faChevronDown" />
            ) : (
              <Icon fafa="faChevronUp" />
            )}
          </div>
        </div>
        <div id="dycalendar"></div>
      </div>
    );
  };