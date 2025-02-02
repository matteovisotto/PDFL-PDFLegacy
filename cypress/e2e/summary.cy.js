describe("Summary functionalities (TA-20 to TA-22)", () => {
  beforeEach(() => {
    cy.visit("localhost:8080");

    cy.get("input[type=file]")
      .first()
      .selectFile("cypress/fixtures/black bear.pdf", { force: true });

    cy.wait(300);
  });

  it("TA-20: Open summary section", () => {
    cy.get("#end > :nth-child(6)").click();

    cy.get("#side-page-summary").should("be.visible");
  });

  it("TA-21: Open TLDR, Abstract, Abstract summary, Selected text section in the summary layout", () => {
    cy.get("#end > :nth-child(6)").click();

    cy.get("#tldr").click();

    cy.get("#tldr-text").should("be.visible");

    cy.get("#abstract").click();

    cy.get("#abstract-text").should("be.visible");

    cy.get("#summary-abstract").click();

    cy.get("#abstract-summary-text").should("be.visible");

    cy.get("#selected-text-summary").click();

    cy.get("#selection-summary-text").should("be.visible");
  });
});
