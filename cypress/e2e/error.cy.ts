describe("Error message", () => {
  const stadsdelenUrl = "**/stadsdelen";

  const errorResponse = {
    statusCode: 500,
  };

  it("should show error message if something went wrong", () => {
    cy.intercept("GET", stadsdelenUrl, errorResponse).as("getStadsdelen");
    cy.visit("http://localhost:3000/");

    cy.wait("@getStadsdelen").then((sub) => {
      cy.get("h4").contains("Niet gelukt");
      cy.get(".ams-alert--error").should("be.visible");
    });
  });
});
