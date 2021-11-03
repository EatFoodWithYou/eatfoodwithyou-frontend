// login.spec.js created with Cypress
//
// Start writing your Cypress tests below!
// If you're unfamiliar with how Cypress works,
// check out the link below and learn how to write your first test:
// https://on.cypress.io/writing-first-test
describe("Login", () => {
	it("Login Success", () => {
		cy.visit("http://localhost:8080/login");
		cy.get("#email").type("user@test.com");
		cy.get("#password").type("12345678");
		cy.get("#submit").click();
		// cy.get('div.swal-overlay swal-overlay--show-modal')
		cy.get(".swal-title").contains("Login Success");
		cy.get(".swal-text").contains("Welcome, ");
		cy.get(".swal-button-container button").click();
		// expect(cy.get('swal-title'))
	});

	it("Dont input email and password to login", () => {
		cy.visit("http://localhost:8080/login");
		cy.get("#submit").click();
		// cy.wait(5000)
		cy.get(".swal-text").contains("please enter you email or password");
		cy.get(".swal-button-container button").click();
		// expect(cy.get('swal-title'))
	});

	it("Login with wrong password", () => {
		cy.visit("http://localhost:8080/login");
		cy.get("#email").type("user@test.com");
		cy.get("#password").type("123456789");
		cy.get("#submit").click();
		cy.get(".swal-text").contains("Wrong EMAIL OR PASSWORD");
		cy.get(".swal-button-container button").click();
		// cy.get('div.swal-overlay swal-overlay--show-modal')
		// expect(cy.get('swal-title'))
	});

	it("Dont input email to login", () => {
		cy.visit("http://localhost:8080/login");
		cy.get("#email").type("user@test.com");
		cy.get("#submit").click();
		// cy.wait(5000)
		cy.get(".swal-text").contains("please enter you email or password");
		cy.get(".swal-button-container button").click();
		// expect(cy.get('swal-title'))
	});

	it("Dont input password to login", () => {
		cy.visit("http://localhost:8080/login");
		cy.get("#password").type("12345678");
		cy.get("#submit").click();
		// cy.wait(5000)
		cy.get(".swal-text").contains("please enter you email or password");
		cy.get(".swal-button-container button").click();
		// expect(cy.get('swal-title'))
	});
});
