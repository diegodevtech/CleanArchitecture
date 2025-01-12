import Product from "../entity/product"
import ProductService from "./product.service";

describe("Product service unit tests", () => {
    it("should the price of all products", () => {
        const prod1 = new Product("123", "Prod 1", 10);
        const prod2 = new Product("1234", "Prod 2", 20);
        const prods = [prod1, prod2];

        ProductService.increasePrice(prods, 100)
        expect(prod1.price).toBe(20)
        expect(prod2.price).toBe(40);
    })
})