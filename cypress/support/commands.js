import { jwtDecode } from "jwt-decode";
import { setUser } from "../../src/Slice/UserSlice";

Cypress.Commands.add("login", (username, password) => {
  cy.visit("http://localhost:3000/");
  cy.get("#username").type(username);
  cy.get("#password").type(password);
  cy.get("button[type='submit']").click();
});
