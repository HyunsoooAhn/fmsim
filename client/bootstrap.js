import { APPEND_APP_TOOL } from "@things-factory/apptool-base";
import {
  appendViewpart,
  updateViewpart,
  toggleOverlay,
  TOOL_POSITION,
  VIEWPART_POSITION,
  VIEWPART_LEVEL,
} from "@things-factory/layout-base";
import { store, navigate, UPDATE_BASE_URL } from "@things-factory/shell";
import { ADD_MORENDA } from "@things-factory/more-base";

import { html } from "lit-html";

import "./viewparts/menu-tools";
import "./apptools/favorite-tool";

export default function bootstrap() {
  store.dispatch({
    type: UPDATE_BASE_URL,
  });

  /* append viewpart anchor to asidebar */
  appendViewpart({
    name: "viewpart-info",
    viewpart: {
      show: false,
      hovering: "edge",
      backdrop: true,
    },
    position: VIEWPART_POSITION.ASIDEBAR,
  });

  store.dispatch({
    type: ADD_MORENDA,
    morenda: {
      icon: html` <mwc-icon>help</mwc-icon> `,
      name: html` <i18n-msg msgid="text.help"></i18n-msg> `,
      action: () => {
        navigate("help");
      },
    },
  });

  /* append top-menu to layout */
  var width;

  appendViewpart({
    name: "board-topmenu",
    viewpart: {
      show: true,
      template: html` <menu-tools></menu-tools> `,
    },
    // position: VIEWPART_POSITION.NAVBAR,
    position: VIEWPART_POSITION.HEADERBAR,
  });

  store.subscribe(async () => {
    var state = store.getState();

    if (state.layout.width == width) {
      return;
    }

    width = state.layout.width;

    updateViewpart("board-topmenu", {
      position:
        width == "WIDE"
          ? VIEWPART_POSITION.HEADERBAR
          : VIEWPART_POSITION.FOOTERBAR,
      level: VIEWPART_LEVEL.TOPMOST,
    });
  });

  /* append favorite tool to app-tools */
  var acceptedPages = ["board-viewer"];

  store.dispatch({
    type: APPEND_APP_TOOL,
    tool: {
      template: html`
        <favorite-tool .acceptedPages=${acceptedPages}></favorite-tool>
      `,
      position: TOOL_POSITION.REAR,
    },
  });
}
