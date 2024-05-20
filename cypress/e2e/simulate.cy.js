describe("user-simulation", () => {
  beforeEach(() => {
    cy.viewport(1440, 840);
    cy.intercept("https://54.254.174.201/socket.io/**").as("socketRequests");
    cy.intercept("https://bintu.nanocosmos.de/**").as("streamRequests");
    cy.login("dom", "password123");
  });

  it("should bet on color using amount buttons", () => {
    const index = 1;

    cy.wait(["@socketRequests", "@streamRequests"]).then(() => {
      cy.get(`div[data-betButton="${index}"]`).click();
      cy.get(`div[data-colorIndex="${index}"]`).click();
    });
  });

  it("should bet on color using bet slider", () => {
    const index = 1;
    cy.wait(["@socketRequests", "@streamRequests"]).then(() => {
      cy.get("[data-cy=slider]")
        .invoke("val", 20001)
        .trigger("change")
        .click({ force: true });
      cy.get(`div[data-colorIndex="${index}"]`).click();
    });
  });

  it("should bet on color using keyboard input", () => {
    const index = 1;
    cy.wait(["@socketRequests", "@streamRequests"]).then(() => {
      cy.get("[data-cy=type-bet]").type("1000");
      cy.get(`div[data-colorIndex="${index}"]`).click();
    });
  });

  it("should bet with 2x multiplier", () => {
    const index = 0;
    cy.wait(["@socketRequests", "@streamRequests"]).then(() => {
      cy.get("[data-cy=type-bet]").type("1000");
      cy.get(`div[data-multiplierButton="${index}"]`).click();
      cy.get(`div[data-colorIndex="${index}"]`).click();
    });
  });

  it("should bet to all colors and then clear the bets.", () => {
    const totalColors = 9;
    cy.wait(["@socketRequests", "@streamRequests"]).then(() => {
      for (let i = 0; i < totalColors; i++) {
        cy.get("[data-cy=type-bet]").type("1000");
        cy.get(`div[data-colorIndex="${i}"]`).click();
      }
      cy.get("[data-cy=clear-bets]").click();
    });
  });

  it("should top up credits.", () => {
    cy.wait(["@socketRequests", "@streamRequests"]).then(() => {
      cy.get("[data-cy=addCredits]").click();
      cy.get("[data-topup=topup]").type("1");
      cy.get("[data-paynow=paynow]").click();
    });
  });

  it("should chat.", () => {
    cy.wait(["@socketRequests", "@streamRequests"]).then(() => {
      cy.get("[data-cy=chatInput]").type("test chat");
      cy.get("[data-cy=sendButton]").click();
    });
  });
});
