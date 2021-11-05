describe("foodRecipeDetail with guest", () => {
	// beforeEach(() => {
	//     cy.visit("http://localhost:8080/")
	// })

	it("visit ID 1 with guest", () => {
		cy.visit("http://localhost:8080/recipe/1/information");
		cy.get("#likeDiv")
			.invoke("attr", "style")
			.should("eq", "display: none;");
	});

	it("visit ID 1 with guest and try to commend", () => {
		cy.visit("http://localhost:8080/recipe/1/information");
		cy.get("#commendTextarea").type("อร่อยมากครับ");
		cy.get("#post").click();
		cy.get(".swal-text").contains("Please Login");
		cy.get(".swal-button-container button").click();
	});
});

describe("foodRecipeDetail with login", () => {
	beforeEach(() => {
		cy.visit("http://localhost:8080/login");
		cy.get("#email").type("cypressuser@test.com");
		cy.get("#password").type("12345678");
		cy.get("#submit").click();
		cy.get(".swal-title").contains("Login Success");
		cy.get(".swal-text").contains("Welcome, ");
		cy.get(".swal-button-container button").click();
	});

	it("login and visit ID 1", () => {
		cy.visit("http://localhost:8080/recipe/1/information");
		cy.get("#likeDiv").invoke("attr", "style").should("not.exist");
	});

	it("visit ID 1 commend edit commend and delete that commend", () => {
		cy.visit("http://localhost:8080/recipe/1/information");
		cy.wait(1000);
		cy.get("#commendTextarea").type("อร่อยครับ");
		cy.get("#post").click();
		cy.get(".swal-text").contains("Your comment has been post!");
		cy.get(".swal-button-container button").click();
		cy.get("#commend div div span div#commendText").contains("อร่อยครับ");
		cy.get("#commend div div span #editCommend").last().click();
		cy.get("#editCommendInput").clear().type("อร่อยมากครับ");
		cy.get("#ConfrimEditCommend").click();
		cy.wait(1000);
		cy.get("#commend div div span div#commendText").contains(
			"อร่อยมากครับ"
		);
		cy.get("#commend div div span #deleteCommend").last().click();
		cy.get(".swal-button-container button").contains("OK").click();
		cy.wait(1000);
		cy.get(".swal-text").contains("Your comment has been deleted!");
		cy.get(".swal-button-container button").contains("OK").click();
	});

	it("visit ID 1 like and dislike", () => {
		cy.visit("http://localhost:8080/recipe/1/information");
		cy.get("#likeDiv input").should("not.be.checked");
		cy.get("#likeDiv input").check({ force: true });
		cy.reload();
		cy.get("#likeDiv input").should("be.checked");
		cy.get("#likeDiv input").uncheck({ force: true });
		cy.reload();
		cy.get("#likeDiv input").should("not.be.checked");
	});

	after(() => {
		cy.get("#openUserMenu").click();
		cy.get("#logout").click();
	});
});
