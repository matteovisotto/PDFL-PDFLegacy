import {
  EventHandlerService,
  PDFLEvents,
} from "../services/EventHandlerService";

class GraphMakerComponent {
  components = {
    graphMakerBtn: document.querySelector("#graph_maker"),
    closeBtn: document.querySelector("#close_btn"),
    fullScreen: document.querySelector("#full_screen"),
    body: document.querySelector("#body"),
  };

  constructor() {
    this.#registerEvents();
  }

  #registerEvents = () => {
    this.components.graphMakerBtn.addEventListener("click", this.#graphMakerOn);
    this.components.closeBtn.addEventListener("click", this.#graphMakerOff);
    this.components.fullScreen.addEventListener("click", this.#showFullScreen);
  };

  /**
   * Callback for zoom in event
   */
  #graphMakerOn = () => {
    document.getElementById("side_nav").style.width = "1000px";
    document.getElementById("main").style.marginRight = "1000px";
  };

  #graphMakerOff = () => {
    document.getElementById("side_nav").style.width = "0";
    document.getElementById("main").style.marginRight = "0";
  };

  #showFullScreen = () => {
    if (body.requestFullscreen) {
      body.requestFullscreen();
    } else if (body.webkitRequestFullscreen) {
      /* Safari */
      body.webkitRequestFullscreen();
    } else if (body.msRequestFullscreen) {
      /* IE11 */
      body.msRequestFullscreen();
    }
  };
}

export { GraphMakerComponent };
