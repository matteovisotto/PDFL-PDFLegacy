import { getPaperTldrAndAbstract } from "../../services/SemanticScholarService";
import { TLDRAccordionItem } from "./TLDRAccordionItem";
import { AbstractAccordionItem } from "./AbstractAccordionItem";
import { AbstractSummaryAccordionItem } from "./AbstractSummaryAccordionItem";
import { SelectionSummaryAccordionItem } from "./SelectionSummaryAccordionItem";

/**
 * Component responsible for displaying the sidebar for summaries/key
 * @property {Object} components object that holds DOM elements that represent this component, as well as component's context
 * @property {HTMLElement} components.accordionItem accordion item
 * @property {HTMLElement} components.closeBtn button that closes sidepage
 * @property {TLDRAccordionItem} tldrItem the TLDR Accordion Item instance
 * @property {AbstractAccordionItem} abstractItem the Abstract Accordion Item instance
 * @property {AbstractSummaryAccordionItem} abstractSummaryItem the Abstract Summary Accordion Item instance
 * @property {SelectionSummaryAccordionItem} selectionSummaryItem the Selection Summary Accordion Item instance
 */
class SummaryKeyComponent {
  components = {
    sidePageSummary: document.querySelector("#side-page-summary"),
    accordionItem: document.getElementsByClassName("accordion"),
    closeBtn: document.querySelector("#close-btn-summary"),
  };

  /**
   * Creates and initializes new Summary Key Component
   * @constructor
   */
  constructor() {
    this.tldrItem = new TLDRAccordionItem();
    this.abstractItem = new AbstractAccordionItem();
    this.abstractSummaryItem = new AbstractSummaryAccordionItem();
    this.selectionSummaryItem = new SelectionSummaryAccordionItem();
    this.#registerEvents();
  }

  /**
   * Adds event listeners to component's elements.
   * @private
   */
  #registerEvents = () => {
    Array.from(this.components.accordionItem).forEach((accordion) => {
      accordion.addEventListener("click", function () {
        this.classList.toggle("active");
        var panel = this.nextElementSibling;
        if (panel.style.maxHeight) {
          panel.style.maxHeight = null;
        } else {
          panel.style.maxHeight = panel.scrollHeight + "px";
        }
      });
    });
  };

  setPdf = (pdfDoc) => {
    this.tldrItem.setLoading();
    this.abstractItem.setLoading();
    this.abstractSummaryItem.setLoading();
    this.selectionSummaryItem.clear();
    this.#getSemScholarContent(pdfDoc);
  };

  #getSemScholarContent = async (pdfDoc) => {
    const contents = await getPaperTldrAndAbstract(pdfDoc);
    if (!contents) {
      this.tldrItem.setError();
      this.abstractItem.setError();
      this.abstractSummaryItem.setError();
      return;
    }
    if (contents.abstract) {
      this.abstractItem.setText(contents.abstract);
      this.abstractSummaryItem.setAbstract(contents.abstract);
    } else {
      this.abstractItem.setError();
      this.abstractSummaryItem.setError();
    }
    if (contents.tldr) {
      this.tldrItem.setText(contents.tldr);
    } else {
      this.tldrItem.setError();
    }
  };
}

export { SummaryKeyComponent };
