describe("Navigation", () => {
  const stadsdelenUrl = "**/stadsdelen";
  const wijkenUrl = "**/wijken/?ligtInStadsdeel.identificatie=*";
  const buurtenUrl = "**/buurten/?ligtInWijk.identificatie=*";

  it("should navigate to the Buurten page", () => {
    cy.intercept("GET", stadsdelenUrl).as("getStadsdelen");
    cy.intercept("GET", wijkenUrl).as("getWijken");
    cy.intercept("GET", buurtenUrl).as("getBuurten");

    cy.visit("http://localhost:3000/");

    cy.wait("@getStadsdelen").then((val) => {
      cy.get('a[href*="/wijken/03630000000018"]').click();
    });

    cy.url().should("include", "/wijken/03630000000018");

    cy.wait("@getWijken").then((val) => {
      cy.get("h4").contains("Wijken in stadsdeel Centrum");
      cy.get('a[href*="/buurten/03630970000009"]').click();
    });

    cy.wait("@getBuurten").then((val) => {
      cy.get("h4").contains("Buurten in de wijk Jordaan");
    });
  });
});
