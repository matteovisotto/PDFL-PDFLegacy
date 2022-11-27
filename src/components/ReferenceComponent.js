import {
  EventHandlerService,
  PDFLEvents,
} from "../services/EventHandlerService";
import { mouseOverDelayEvent } from "../services/Utils";
import { DocumentParser } from "../services/DocumentParser/DocumentParser";

/**
 * This class handles user interaction with internal document references
 * @property {object} pdfDocument
 * @property {object} overEventPosition
 */
class ReferenceComponent {
  /**
   * @constructor
   * Subscribes to an event to be notified when links are available in dom
   */
  constructor() {
    this.pdfDoc = null;
    this.overEventPosition = { x: null, y: null };
    EventHandlerService.subscribe(
      PDFLEvents.onLinkLayerRendered,
      this.#onLinkLayerRendered.bind(this)
    );
  }

  /**
   * Set the pdf document
   * @param pdfDoc
   */
  setPdfDoc = (pdfDoc) => {
    this.pdfDoc = pdfDoc;
  };

  /**
   * @private
   * Get the a tags from the DOM and add the event listener both for click and onMouseOver with delay
   */
  #onLinkLayerRendered = () => {
    if (this.pdfDoc === null) {
      throw new Error("PDFDocument object missed");
    }
    const pageHref = document.getElementsByClassName("internalLink");
    for (var i = 0; i < pageHref.length; i++) {
      const aTagElement = pageHref.item(i);
      aTagElement.addEventListener(
        "click",
        this.#onInternalReferenceClick.bind(this)
      );
      mouseOverDelayEvent(
          aTagElement,
        2000,
        this.#onInternalReferenceOver.bind(this)
      ); //Delay the over listener
    }
  };

  /**
   * Function for handling the onClick event of a reference
   * Solve the reference and publish and event to require the page change
   * @param event
   */
  #onInternalReferenceClick = (event) => {
    const self = this;
    event.preventDefault();
    const target = event.target.closest("a");
    if (!target) return;
    const reference = decodeURIComponent(
      target.getAttribute("href").replace("#", "")
    );
    console.log(reference);
    self.#solveReference(reference).then((pageNumber) => {
      EventHandlerService.publish(PDFLEvents.onNewPageRequest, pageNumber);
    });
  };

  /**
   * Function for handling the onMouseOver event of a reference
   * @param event
   */
  #onInternalReferenceOver = (event) => {
    const self = this;
    event.preventDefault();
    this.overEventPosition.x = event.clientX;
    this.overEventPosition.y = event.clientY;
    const target = event.target.closest("a");
    if (!target) return;
    const reference = decodeURIComponent(
      target.getAttribute("href").replace("#", "")
    );
    self.#solveReference(reference).then((pageNumber) => {
      self.#parseReference(reference, pageNumber);
    });
  };

  /**
   * Given ad id the function return a promise with the correct page number of the reference
   * @param refId the reference ID from the dom
   * @returns {Promise<number>}
   */
  #solveReference = async (refId) => {
    const self = this;
    var destinationObject;
    if (refId.includes("num") && refId.includes("gen")) {
      try {
        destinationObject = JSON.parse(refId);
      } catch (e) {
        destinationObject = null;
      }
    } else {
      destinationObject = await self.pdfDoc.getDestination(refId);
    }

    if (destinationObject == null) {
      throw new Error("Unsupported reference type");
    }

    const pageIndex = await self.pdfDoc.getPageIndex(destinationObject[0]);
    return pageIndex + 1;
  };

  /**
   * Call the correct parser and rise ad event to notify that popup content is ready
   * @param reference the reference from the dom
   * @param pageNumber the solved page number
   */
  #parseReference = (reference, pageNumber) => {
    //TODO:- If we have the object is it possible to know the ref type?
    const self = this;
    const referenceType = reference.split(".")[0];
    const parseService = DocumentParser.parserFactory(referenceType, {
      pdfDoc: self.pdfDoc,
      pageNumber: pageNumber,
      reference: reference,
    });

    parseService.getContent().then((result) => {
      EventHandlerService.publish(
        PDFLEvents.onPopupContentReady,
        self.overEventPosition,
        pageNumber,
        result
      );
    });
  };
}

export { ReferenceComponent };
