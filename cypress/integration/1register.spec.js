describe("register", () => {
	beforeEach(() => {
		cy.visit("http://localhost:8080/register");
	});

	it("submit without input", () => {
		cy.get("#signUp").click();
		cy.get(".swal-title").contains("Register Failed");
		cy.get(".swal-text").contains(
			"Please check that the information you have entered is complete."
		);
		cy.get(".swal-button-container button").click();
	});

	it("register with password and confirm password not match ", () => {
		cy.get("#email").type("cypressuser@test.com");
		cy.get("#password").type("12345678");
		cy.get("#confirmPassword").type("123458");
		cy.get("#firstname").type("cypress");
		cy.get("#lastname").type("test");
		cy.get("#age").clear().type(99);
		cy.get("#gender").select(0);
		cy.get("#signUp").click();
		cy.get(".swal-title").contains("Register Failed");
		cy.get(".swal-text").contains(
			"Your password and confirm password is not match!"
		);
		cy.get(".swal-button-container button").click();
	});

	it("register cypress test user and logout ", () => {
		cy.get("#email").type("cypressuser@test.com");
		cy.get("#password").type("12345678");
		cy.get("#confirmPassword").type("12345678");
		cy.get("#firstname").type("cypress");
		cy.get("#lastname").type("test");
		cy.get("#age").clear().type(99);
		cy.get("#gender").select(0);
		cy.get("#signUp").click();
		cy.get(".swal-title").contains("Register Success");
		cy.get(".swal-text").contains("Welcome");
		cy.get(".swal-button-container button").click();
		cy.get("#openUserMenu").click();
		cy.get("#logout").click();
	});
});
