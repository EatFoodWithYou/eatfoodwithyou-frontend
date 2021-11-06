describe("user information with login", () => {
	beforeEach(() => {
		cy.visit("http://localhost:8080/login");
		cy.get("#email").type("cypressuser@test.com");
		cy.get("#password").type("12345678");
		cy.get("#submit").click();
		cy.get(".swal-title").contains("Login Success");
		cy.get(".swal-text").contains("Welcome, ");
		cy.get(".swal-button-container button").click();
	});

	it("visit and click foodRecipe", () => {
		cy.visit("http://localhost:8080/user-information");
		cy.get("#foodName").click();
	});

	it("visit and edit last foodRecipe", () => {
		cy.visit("http://localhost:8080/user-information");
		cy.get("div #editFood").last().click();
	});

	it("visit and edit information", () => {
		cy.visit("http://localhost:8080/user-information");
		cy.get("#editInfor").click();
		cy.get("#name").type("1");
		cy.get("#age").clear().type(21);
		cy.get("#submit").click();
	});

	it("visit and delete foodRecipe", () => {
		cy.visit("http://localhost:8080/user-information");
		cy.get("div #deleteFood").last().click();
		cy.get(".swal-button-container button").contains("OK").click();
		cy.wait(1000);
		cy.get(".swal-text").contains("Deleted");
		cy.get(".swal-button-container button").contains("OK").click();
	});

	after(() => {
		cy.get("#openUserMenu").click();
		cy.get("#logout").click();
	});
});
