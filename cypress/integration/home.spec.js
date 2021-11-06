describe("Home", () => {
	beforeEach(() => {
		cy.visit("http://localhost:8080");
	});

	it("Refresh Random foodRecipe", () => {
		cy.wait(5000);
		cy.get("#random").click({ force: true });
	});

	it("Search food Recipe by name", () => {
		cy.get("#searchByName").type("กะ");
		cy.get("#searchByNameBt").click();
		cy.get("#searchTitle").contains("กะ");
	});

	it("Search food Recipe by category", () => {
		cy.wait(5000);
		cy.get("nav div input").first().check();
		cy.get("nav button").click();
	});

	it("Go to Food Recipe Detail from random Recipe list", () => {
		cy.wait(5000);
		cy.get("div#randomDiv div").first().click();
	});

	it("Go to Food Recipe Detail from recommend food", () => {
		cy.wait(5000);
		cy.get("div#recomendFood").first().click();
	});
});
