import {
  EventHandlerService,
  PDFLEvents,
} from "../services/EventHandlerService";
import { SidePageComponent } from "./SidePageComponent";
import { ToolbarComponent } from "./ToolbarComponent";
import { ReferenceComponent } from "./ReferenceComponent";
import { PopupComponent } from "./PopupComponent";
import { ReferenceViewComponent } from "./ReferenceViewComponent";
import { KeyboardService } from "../services/KeyboardService";
import * as textRenderService from "../services/TextRenderService";
import { FileUploadComponent } from "./FileUploadComponent";

const pdfjsLib = require("pdfjs-dist");

/**
 * Component representing the PDF reader. Displays the content of PDF document and actions
 * that can be applied to the document in the reader.
 *
 * @property {Object} components object that holds DOM elements that are within component
 * @property {HTMLElement} components.pdfContainer element containing the PDF reader
 * @property {HTMLElement} components.openNew button that takes user to input view page
 * @property {HTMLElement} components.canvas canvas DOM element for pdf.js page
 * @property {import("pdfjs-dist").PageViewport} components.viewport target page viewport for the text layer
 * @property {SidePageComponent} sidePageComponent side component within the reader
 * @property {ToolbarComponent} toolbarComponent toolbar component within the reader
 * @property {PopupComponent} popupComponent popup component within the reader
 * @property {PDFDocumentProxy} pdfDoc PDF document
 * @property {KeyboardService} keyboardService keyboard service
 */
class PdfReaderComponent {
  components = {
    pdfContainer: document.querySelector("#pdf-container"),
    canvas: null,
    viewport: null,
    loader: document.querySelector("#loader"),
  };

  /**
   * Creates and initializes new zoom component. Creates new ToolbarComponent and
   * SidePageComponent objects.
   * @constructor
   */
  constructor() {
    this.keyboardService = new KeyboardService();
    this.toolbarComponent = new ToolbarComponent();
    this.sidePageComponent = new SidePageComponent();
    this.referenceComponent = new ReferenceComponent();
    this.popupComponent = new PopupComponent();
    this.referenceViewComponent = new ReferenceViewComponent();
    this.pdfUploadComponent = new FileUploadComponent();
    this.#registerEvents();
  }

  /**
   * Adds event listeners to component and it's elements.
   * @private
   */
  #registerEvents = () => {
    this.components.pdfContainer.addEventListener(
      "mousemove",
      textRenderService.hideLinks
    );

    new ResizeObserver(() => {
      textRenderService.positionTextLayer(
        this.components.canvas,
        this.components.viewport
      );
    }).observe(this.components.pdfContainer);

    EventHandlerService.subscribe(PDFLEvents.onRenderPage, () => {
      textRenderService.renderPage(
        this.pdfDoc,
        this.components,
        this.toolbarComponent
      );
    });

    EventHandlerService.subscribe(PDFLEvents.onResetReader, () => {
      this.reset();
    });

    EventHandlerService.subscribe(PDFLEvents.onReadNewFile, (pdf) => {
      this.loadPdf(pdf);
    });
  };

  /**
   * Load and render the first page of the given pdf.
   * @param {Uint8Array} pdf data, filename or url of a PDF document
   */
  loadPdf = (pdf) => {
    const self = this;
    pdfjsLib.GlobalWorkerOptions.workerSrc = "/pdf.worker.bundle.js";
    pdfjsLib
      .getDocument(pdf)
      .promise.then((data) => {
        self.pdfDoc = data;
        self.referenceComponent.setPdfDoc(data);
        self.toolbarComponent.setPageCount(data.numPages);
        self.sidePageComponent.setPDF(data);

        self.referenceViewComponent.setPdfDoc(data);

        textRenderService.renderPage(
          self.pdfDoc,
          self.components,
          self.toolbarComponent
        );
      })
      .catch((err) => {
        console.log(err.message); // TODO: handle error in some way
      });
    this.components.loader.classList.add("hidden");
  };

  /**
   * Sets current page of pagination component to 1 and current zoom level
   * of zoom component to 1.
   */
  reset = () => {
    this.sidePageComponent.hideSidePage();
    this.toolbarComponent.reset();
  };
}

export { PdfReaderComponent };
