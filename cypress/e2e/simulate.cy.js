describe("user-simulation", () => {
  beforeEach(() => {
    cy.viewport(1440, 840);
    cy.intercept("https://54.254.174.201/socket.io/**").as("socketRequests");
    cy.intercept("https://bintu.nanocosmos.de/**").as("streamRequests");
    cy.login("dom", "password123");
  });

  it("should bet on color using amount buttons", () => {
    const buttonText = "10";
    const index = 1;

    cy.wait(["@socketRequests", "@streamRequests"]).then(() => {
      cy.contains("div", buttonText).click();
      cy.get(`div[data-index="${index}"]`).click();
    });
  });

  it("should bet on color using bet slider", () => {
    const index = 1;
    cy.wait(["@socketRequests", "@streamRequests"]).then(() => {
      cy.get("[data-cy=slider]")
        .invoke("val", 20001)
        .trigger("change")
        .click({ force: true });
      cy.get(`div[data-index="${index}"]`).click();
    });
  });

  it("should bet on color using keyboard input", () => {
    const index = 1;
    cy.wait(["@socketRequests", "@streamRequests"]).then(() => {
      cy.get("[data-cy=type-bet]").type("1000");
      cy.get(`div[data-index="${index}"]`).click();
    });
  });
});
