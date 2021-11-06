describe("Add FoodRecipe with guest", () => {
	beforeEach(() => {
		cy.visit("http://localhost:8080/recipe/add");
	});

	it("visit addNew FoodRecipe", () => {
		cy.get(".swal-title").contains("You are not logged in.");
		cy.get(".swal-text").contains("Please login and go to this page again");
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

	it("add New FoodRecipe fill some input", () => {
		cy.visit("http://localhost:8080/recipe/add");
		cy.get("#Name").type("แกงกะหรี่ทงคัตสึ");
		cy.get("#detail").type("หมูทงคัตสึทำเองค่า แต่แกงกะหรี่มีตัวช่วย");
		cy.get("#ingredientName").type("เนื้อหมู");
		cy.get("#ingredientQuantity").type(500);
		cy.get("#ingredientUnit").type("กรัม");
		cy.get("#addIngredient").click();
		cy.get("#ingredientQuantity").last().type(2);
		cy.get("#addProcess").click();
		cy.get("#process")
			.last()
			.type("นำหมูที่หมักไว้ ชุบแป้ง ชุบไข่ ชุบเกล็ดขนมปัง");
		cy.get("#category").select(0);
		cy.get("#categorySelect").click();
		cy.get("#addRecipe").click();
		cy.get(".swal-title").contains("Add new Food Recipe Failed");
		cy.get(".swal-text").contains(
			"Please check that the information you have entered is complete."
		);
		cy.get(".swal-button-container button").click();
	});

	it("add New FoodRecipe fill all input", () => {
		cy.visit("http://localhost:8080/recipe/add");
		cy.get("#Name").type("แกงกะหรี่ทงคัตสึ");
		cy.get("#detail").type("หมูทงคัตสึทำเองค่า แต่แกงกะหรี่มีตัวช่วย");
		cy.get("#ingredientName").type("เนื้อหมู");
		cy.get("#ingredientQuantity").type(500);
		cy.get("#ingredientUnit").type("กรัม");
		cy.get("#ingredientQuantity").last().type(2);
		cy.get("#ingredientUnit").last().type("ถ้วย");
		cy.get("#process").type("หมักหมูด้วยคนอร์ปรุงรสซอสขวดไว้");
		cy.get("#category").select(0);
		cy.get("#categorySelect").click();
		cy.get("#addRecipe").click();
		cy.get(".swal-title").contains("Add new Food Recipe Success");
		cy.get(".swal-text").contains("แกงกะหรี่ทงคัตสึ");
		cy.get(".swal-button-container button").click();
	});

	after(() => {
		cy.get("#openUserMenu").click();
		cy.get("#logout").click();
	});
});
